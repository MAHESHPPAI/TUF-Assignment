import React, { useCallback } from 'react';
import { useMotionValue, motion } from 'framer-motion';
import { useCalendar, CalendarProvider } from './context/CalendarProvider';
import { CalendarHero } from './components/CalendarHero/CalendarHero';
import { CalendarGrid } from './components/CalendarGrid/CalendarGrid';
import { JournalPanel } from './components/JournalPanel/JournalPanel';
import styles from './App.module.css';

function App() {
  // ── Global mouse tracking for parallax ──
  // Normalized to -0.5 → 0.5 across the entire viewport
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - rect.left) / rect.width - 0.5);
    mouseY.set((clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  return (
    <CalendarProvider mouseX={mouseX} mouseY={mouseY}>
      <DynamicLayout handleMouseMove={handleMouseMove} />
    </CalendarProvider>
  );
}

function DynamicLayout({ handleMouseMove }) {
  const { activeTheme } = useCalendar();

  return (
    <motion.main
      className={styles.appLayout}
      onMouseMove={handleMouseMove}
      animate={{
        "--color-accent": activeTheme.palette.base,
        "--color-accent-hover": activeTheme.palette.hover,
        "--color-accent-light": activeTheme.palette.light,
        "--color-accent-medium": activeTheme.palette.medium,
        "--color-accent-glow": activeTheme.palette.glow,
      }}
      transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
    >
      <section className={styles.heroSection}>
          <CalendarHero />
        </section>

        <section className={`${styles.interactiveSection} custom-scrollbar`}>
          <div className={styles.gridWrapper}>
            <CalendarGrid />
          </div>
          <div className={styles.journalWrapper}>
          <JournalPanel />
        </div>
      </section>
    </motion.main>
  );
}

export default App;
