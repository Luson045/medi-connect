import React, { useEffect, useState } from 'react';
import '../../styles/AnimatedCursor.css'; // Import the styles

const AnimatedCursor = () => {
  const [positions, setPositions] = useState([]);

  // Number of circles in the trail
  const numberOfCircles = 10;

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      // Create a new position and add it to the array of positions
      setPositions((prev) => [{ x, y }, ...prev.slice(0, numberOfCircles - 1)]);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="cursor-trail">
      {positions.map((pos, index) => (
        <div
          key={index}
          className="cursor-circle"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: `scale(${(numberOfCircles - index) / numberOfCircles})`,
            opacity: `${(numberOfCircles - index) / numberOfCircles}`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedCursor;
