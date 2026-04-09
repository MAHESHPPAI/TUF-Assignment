import React, { useEffect } from 'react';
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useCalendar } from '../../context/CalendarProvider';
import styles from './CalendarHero.module.css';

export const CalendarHero = () => {
  const { currentMonth, activeTheme } = useCalendar();

  // Initialize raw motion values (normalized 0 to 1 representing screen X/Y)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Bypass React state entirely for 60FPS performance
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Smooth the raw normalized values with physics springs
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25, mass: 0.5 });

  // Map the normalized 0 -> 1 values to translate percentages
  const imgX = useTransform(smoothX, [0, 1], ['3%', '-3%']);
  const imgY = useTransform(smoothY, [0, 1], ['3%', '-3%']);

  const monthLabel = format(currentMonth, 'MMMM');
  const yearLabel = format(currentMonth, 'yyyy');

  return (
    <div className={styles.heroContainer}>
      <motion.div
        className={styles.imageWrapper}
        style={{ x: imgX, y: imgY }}
      >
        <AnimatePresence mode="popLayout">
          <motion.img
            key={activeTheme.imgSrc}
            src={activeTheme.imgSrc}
            alt="Cinematic background"
            className={styles.image}
            loading="eager"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
          />
        </AnimatePresence>
      </motion.div>

      <div className={styles.gradientOverlay} />

      <div className={styles.geometricOverlay}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.svgClip}>
          <path d="M0,100 L0,72 L18,82 L38,65 L55,78 L72,58 L88,70 L100,55 L100,100 Z" fill="var(--color-accent)" />
          <path d="M0,100 L0,85 L25,90 L50,82 L75,88 L100,78 L100,100 Z" fill="var(--color-accent)" opacity="0.6" />
        </svg>
      </div>

      <div className={styles.typographyOverlay}>
        <motion.span
          className={styles.year}
          key={yearLabel}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6, ease: [0.87, 0, 0.13, 1] }}
        >
          {yearLabel}
        </motion.span>
        <motion.h1
          className={styles.month}
          key={monthLabel}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1], delay: 0.05 }}
        >
          {monthLabel}
        </motion.h1>
      </div>

      <div className={styles.gridLines}>
        <div className={styles.gridLineV} />
        <div className={styles.gridLineH} />
      </div>
    </div>
  );
};