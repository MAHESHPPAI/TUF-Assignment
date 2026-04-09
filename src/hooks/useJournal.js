import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export function useJournal(selectedStart, selectedEnd) {
  // Determine a unique key based on the selected date range
  const getStorageKey = () => {
    if (!selectedStart) return null;
    const startStr = format(selectedStart, 'yyyy-MM-dd');
    if (selectedEnd) {
      const endStr = format(selectedEnd, 'yyyy-MM-dd');
      return `journal_${startStr}_${endStr}`;
    }
    return `journal_${startStr}`;
  };

  const [note, setNote] = useState('');
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const key = getStorageKey();
    if (key) {
      const savedNote = localStorage.getItem(key);
      setNote(savedNote || '');
      setActiveKey(key);
    } else {
      setNote('');
      setActiveKey(null);
    }
  }, [selectedStart, selectedEnd]);

  useEffect(() => {
    if (activeKey) {
      if (note.trim() === '') {
        localStorage.removeItem(activeKey);
      } else {
        localStorage.setItem(activeKey, note);
      }
    }
  }, [note, activeKey]);

  return [note, setNote];
}
