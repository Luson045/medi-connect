import React, { useEffect, useState } from 'react';
import "../styles/AnimatedCursor.css"; // Import the styles

const AnimatedCursor = () => {
  const [positions, setPositions] = useState([]);
  const [isMobile, setIsMobile] = useState(false); // State to manage mobile detection

  // Number of circles in the trail
  const numberOfCircles = 10;

  useEffect(() => {
    // Function to check if the device is mobile
    const checkMobileDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsMobile(/android|iphone|ipad|ipod/.test(userAgent));
    };

    checkMobileDevice();

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      // Create a new position and add it to the array of positions
      setPositions((prev) => [{ x, y }, ...prev.slice(0, numberOfCircles - 1)]);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', moveCursor);
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      setPositions([]);
    };
  }, [isMobile]);

  useEffect(() => {
    let timer;
    if (!isMobile && positions.length > 0) {
      timer = setTimeout(() => {
        setPositions([]);
      }, 100);
    }

    return () => clearTimeout(timer);
  }, [positions, isMobile]);

  if (isMobile) return null;

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
