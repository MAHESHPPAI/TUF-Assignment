import React, { createContext, useContext, useState, useCallback } from 'react';
import { isBefore, isSameDay, startOfMonth, addMonths, subMonths } from 'date-fns';
import { themeData } from '../config/themeData';

const CalendarContext = createContext(null);

export const CalendarProvider = ({ children }) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [theme, setTheme] = useState('light'); // Default to light mode

  const activeMonthIndex = currentMonth.getMonth();
  const activeTheme = themeData[activeMonthIndex];

  // Preload adjacent images for zero-jank crossfades
  React.useEffect(() => {
    const nextIndex = (activeMonthIndex + 1) % 12;
    const prevIndex = (activeMonthIndex - 1 + 12) % 12;
    const imgNext = new Image();
    imgNext.src = themeData[nextIndex].imgSrc;
    const imgPrev = new Image();
    imgPrev.src = themeData[prevIndex].imgSrc;
  }, [activeMonthIndex]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const nextMonth = useCallback(() => setCurrentMonth(prev => addMonths(prev, 1)), []);
  const prevMonth = useCallback(() => setCurrentMonth(prev => subMonths(prev, 1)), []);

  const selectDate = useCallback((date) => {
    if (!selectedStart || (selectedStart && selectedEnd)) {
      setSelectedStart(date);
      setSelectedEnd(null);
    } else {
      if (isSameDay(date, selectedStart)) {
        setSelectedStart(null);
        setSelectedEnd(null);
      } else if (isBefore(date, selectedStart)) {
        setSelectedEnd(selectedStart);
        setSelectedStart(date);
      } else {
        setSelectedEnd(date);
      }
    }
  }, [selectedStart, selectedEnd]);

  const clearSelection = useCallback(() => {
    setSelectedStart(null);
    setSelectedEnd(null);
    setHoveredDate(null);
  }, []);

  const value = {
    currentMonth,
    nextMonth,
    prevMonth,
    selectedStart,
    selectedEnd,
    hoveredDate,
    setHoveredDate,
    selectDate,
    setCurrentMonth,
    clearSelection,
    theme,
    toggleTheme,
    activeTheme,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};