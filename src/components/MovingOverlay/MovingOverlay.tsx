import React, { useEffect, useState } from 'react';

import styles from './MovingOverlay.module.scss';

import Spinner from '../../../assets/icons/circle-notch.svg';

const MovingOverlay: React.FC = () => {
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

  return (
    <div className={styles.backdrop}>
      <img src={Spinner} alt="Spinner" />
      <p>Moving files{loadingDots}</p>
    </div>
  );
};

export default MovingOverlay;
