import React, { useEffect, useState } from 'react';

const LoadingDots: React.FC = () => {
  const [loadingDots, setLoadingDots] = useState('.');

  const updateDots = () => {
    setLoadingDots((oldDots) => {
      const dotsCount = oldDots.length + 1;
      return dotsCount > 3 ? '.' : oldDots.concat('.');
    });
  };

  useEffect(() => {
    const dotsInterval = setInterval(updateDots, 750);
    return () => clearInterval(dotsInterval);
  }, []);

  return <span>{loadingDots}</span>;
};

export default LoadingDots;
