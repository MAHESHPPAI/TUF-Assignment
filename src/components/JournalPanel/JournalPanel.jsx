import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useCalendar } from '../../context/CalendarProvider';
import { useJournal } from '../../hooks/useJournal';
import styles from './JournalPanel.module.css';

const EASE_QUINT = [0.87, 0, 0.13, 1];

export const JournalPanel = () => {
  const { selectedStart, selectedEnd } = useCalendar();
  const [note, setNote] = useJournal(selectedStart, selectedEnd);

  const getHeading = () => {
    if (!selectedStart) return 'Select a date';
    if (selectedStart && !selectedEnd) return format(selectedStart, 'MMM do, yyyy');
    return `${format(selectedStart, 'MMM do')} — ${format(selectedEnd, 'MMM do, yyyy')}`;
  };

  const isActive = !!selectedStart;

  return (
    <div className={styles.panelContainer}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <div className={styles.accentBar} />
          <h3 className={styles.title}>Notes</h3>
        </div>
        
        <span
          key={getHeading()}
          className={styles.dateRange}
        >
          {getHeading()}
        </span>
      </div>

      {/* ── Input Area ── */}
      <div className={`${styles.inputWrapper} ${isActive ? styles.active : ''}`}>
        
        {/* ── Noise Overlay ── */}
        <div className={styles.noiseOverlay} />

          {!isActive && (
            <div
              className={styles.overlayMessage}
            >
              <div className={styles.emptyStateIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span>Select a date or range to add a note</span>
            </div>
          )}

        <textarea
          className={`${styles.textArea} custom-scrollbar`}
          placeholder="Begin writing..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={!isActive}
        />

        {/* Decorative ruled lines */}
        <div className={styles.rulerLines}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.line} />
          ))}
        </div>
      </div>

      {/* ── Character count ── */}
      {isActive && note.length > 0 && (
        <div
          className={styles.charCount}
        >
          {note.length} chars
        </div>
      )}
    </div>
  );
};
