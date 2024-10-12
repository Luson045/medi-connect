import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Stethoscope,
  Pill,
  Clipboard,
  Hospital,
  PhoneCall,
  Activity,
} from 'lucide-react';

const FloatingIcon = ({
  icon: Icon,
  color,
  size,
  duration,
  delay,
  position,
}) => {
  return (
    <motion.div
      className="absolute"
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <Icon size={size} color={color} />
      </motion.div>
    </motion.div>
  );
};

const FloatingIcons = ({
  count = 12,
  icons = [Heart, Stethoscope, Pill, Clipboard, Hospital, PhoneCall, Activity],
  colors = [
    '#F472B6',
    '#60A5FA',
    '#34D399',
    '#FBBF24',
    '#A78BFA',
    '#F87171',
    ' #34D399',
  ],
  sizes = [40, 50, 60],
  leftMargin = 50,
}) => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const newPositions = [];

    while (newPositions.length < count) {
      // Generate random positions
      const top = Math.random() * 90; // Keep it within 0-90% to avoid going off-screen
      const left = leftMargin + Math.random() * (90 - leftMargin); // Keep it within 0-90% to avoid going off-screen

      // Check for overlap
      const overlap = newPositions.some((pos) => {
        const distance = Math.sqrt(
          Math.pow(pos.top - top, 2) + Math.pow(pos.left - left, 2),
        );
        return distance < 15;
      });

      // If no overlap, add position
      if (!overlap) {
        newPositions.push({ top, left });
      }
    }

    setPositions(newPositions);
  }, [count, leftMargin]);

  return (
    <div className="hidden sm:block">
      {positions.map((position, i) => (
        <FloatingIcon
          key={i}
          icon={icons[i % icons.length]}
          color={colors[i % colors.length]}
          size={sizes[i % sizes.length]}
          duration={Math.random() * 3 + 2}
          delay={Math.random()}
          position={position}
        />
      ))}
    </div>
  );
};

export default FloatingIcons;
