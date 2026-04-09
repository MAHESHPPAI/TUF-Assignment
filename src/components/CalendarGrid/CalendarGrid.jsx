import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  format, addMonths, subMonths, startOfWeek, addDays,
  startOfMonth, isSameMonth, isSameDay, isWithinInterval,
  isBefore, isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight, Sun, Moon, Volume2, VolumeX } from 'lucide-react';
import { useCalendar } from '../../context/CalendarProvider';
import { useMechanicalAudio } from '../../hooks/useMechanicalAudio';
import styles from './CalendarGrid.module.css';

const EASE = [0.87, 0, 0.13, 1];

function generateDays(month) {
  const days = [];
  let cursor = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  for (let i = 0; i < 42; i++) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}

const gridVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.015, delayChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const cellVariants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: EASE },
  },
  exit: {
    y: 20,
    opacity: 0,
    transition: { duration: 0.2, ease: EASE },
  },
};

export const CalendarGrid = () => {
  const {
    currentMonth, setCurrentMonth,
    selectedStart, selectedEnd, selectDate,
    hoveredDate, setHoveredDate,
    theme, toggleTheme,
  } = useCalendar();

  const { initAudio, playThud, playTick, soundEnabled, toggleSound } = useMechanicalAudio();

  const handleInteract = () => {
    initAudio();
  };

  const handleDateSelection = (date) => {
    handleInteract();
    // Emit 'Thud' on explicit bounds selection
    if (!selectedStart || (selectedStart && selectedEnd)) {
      playThud();
    } else if (selectedStart && !selectedEnd) {
      playThud();
    }
    selectDate(date);
  };

  const handleNext = useCallback(() => { handleInteract(); setCurrentMonth((prev) => addMonths(prev, 1)); }, [setCurrentMonth, initAudio]);
  const handlePrev = useCallback(() => { handleInteract(); setCurrentMonth((prev) => subMonths(prev, 1)); }, [setCurrentMonth, initAudio]);

  const weekDays = useMemo(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    return [...Array(7)].map((_, i) => format(addDays(start, i), 'EEE'));
  }, []);

  const days = useMemo(() => generateDays(currentMonth), [currentMonth]);

  const effectiveEnd = useMemo(() => {
    if (selectedEnd) return selectedEnd;
    if (
      selectedStart && hoveredDate && !selectedEnd &&
      !isBefore(hoveredDate, selectedStart) &&
      !isSameDay(hoveredDate, selectedStart)
    ) {
      return hoveredDate;
    }
    return null;
  }, [selectedStart, selectedEnd, hoveredDate]);

  const hasRange = !!(selectedStart && effectiveEnd);
  const isPreviewMode = !!(selectedStart && !selectedEnd && effectiveEnd);

  // State-bound throttle: Exact matching of tick audio to range shifts
  useEffect(() => {
    if (isPreviewMode) {
      playTick();
    }
  }, [effectiveEnd, isPreviewMode, playTick]);

  return (
    <div className={styles.gridContainer} onClick={handleInteract}>
      <header className={styles.header}>
        <div className={styles.titleBlock}>
          <AnimatePresence mode="wait">
            <motion.h2
              key={format(currentMonth, 'MMMM-yyyy')}
              className={styles.monthTitle}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {format(currentMonth, 'MMMM')}
            </motion.h2>
          </AnimatePresence>
          <span className={styles.yearLabel}>
            {format(currentMonth, 'yyyy')}
          </span>
        </div>

        <div className={styles.navButtons}>
          <button onClick={() => { handleInteract(); toggleSound(); }} className={styles.navBtn} aria-label="Toggle sound">
            {soundEnabled ? <Volume2 size={18} strokeWidth={1.5} /> : <VolumeX size={18} strokeWidth={1.5} />}
          </button>
          <button onClick={() => { handleInteract(); toggleTheme(); }} className={styles.navBtn} aria-label="Toggle dark mode">
            {theme === 'dark' ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>
          <div className={styles.divider} />
          <button onClick={handlePrev} className={styles.navBtn} aria-label="Previous month">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <button onClick={handleNext} className={styles.navBtn} aria-label="Next month">
            <ChevronRight size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div className={styles.weekDays}>
        {weekDays.map((day) => (
          <div key={day} className={styles.weekDayLabel}>{day}</div>
        ))}
      </div>

      <div className={styles.daysWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMonth.toString()}
            className={styles.daysGrid}
            variants={gridVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {days.map((date, i) => {
              const isCurrMonth = isSameMonth(date, currentMonth);
              const colIndex = i % 7;
              const today = isToday(date);

              const isStart = !!(selectedStart && isSameDay(date, selectedStart));
              const isEnd = !!(effectiveEnd && isSameDay(date, effectiveEnd));

              let inRange = false;
              if (hasRange) {
                const s = isBefore(selectedStart, effectiveEnd) ? selectedStart : effectiveEnd;
                const e = isBefore(selectedStart, effectiveEnd) ? effectiveEnd : selectedStart;
                inRange = isWithinInterval(date, { start: s, end: e });
              }

              const isPill = isStart || isEnd || inRange;
              const cellStyle = {};
              
              if (isPill) {
                if (!hasRange && isStart) {
                  cellStyle.borderRadius = '999px';
                } else {
                  const leftEdge = isStart || (inRange && colIndex === 0);
                  const rightEdge = isEnd || (inRange && colIndex === 6);

                  if (leftEdge && rightEdge) cellStyle.borderRadius = '999px';
                  else if (leftEdge) cellStyle.borderRadius = '999px 0 0 999px';
                  else if (rightEdge) cellStyle.borderRadius = '0 999px 999px 0';
                  else cellStyle.borderRadius = '0';
                }
              }

              let extraClass = '';
              if (isPill) {
                if (isPreviewMode && !isStart) {
                  extraClass = styles.previewCell;
                } else {
                  extraClass = styles.pillCell;
                }
              } else if (today) {
                extraClass = styles.todayCell;
              }

              return (
                <motion.button
                  key={date.toString()}
                  variants={cellVariants}
                  className={`${styles.dayCell} ${extraClass} ${!isCurrMonth && !isPill ? styles.outOfRange : ''}`}
                  style={{ ...cellStyle, color: (!isCurrMonth && !isPill && !today) ? 'var(--color-gray-300)' : undefined }}
                  onClick={() => handleDateSelection(date)}
                  onMouseEnter={() => setHoveredDate(date)}
                  onMouseLeave={() => setHoveredDate(null)}
                >
                  <span className={styles.dayNumber}>
                    {format(date, 'd')}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedStart && (
          <motion.div
            className={styles.selectionBadge}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <span className={styles.badgeLabel}>Selected</span>
            <span className={styles.badgeDates}>
              {format(selectedStart, 'MMM d')}
              {selectedEnd && ` — ${format(selectedEnd, 'MMM d')}`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};