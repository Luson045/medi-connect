import React, { useEffect, useState } from 'react';

import '../styles/ScrollProgressIndicator.css';

function ScrollProgressIndicator() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      console.log();

      setScrollPosition(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <div className="progressBar"></div>
      <div
        className="progressIndicator"
        style={{ width: `${scrollPosition}%` }}
      ></div>
    </>
  );
}

export default ScrollProgressIndicator;
