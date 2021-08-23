import React from 'react';
import { MovingFile } from '../../lib/tsDefinitions';

import LoadingDots from '../LoadingDots/LoadingDots';
import Spinner from '../../../assets/icons/circle-notch.svg';

import styles from './FileMoveLoading.module.scss';

interface FileMoveLoadingProps {
  currentlyMovingFile?: MovingFile;
  movingFilesCount: number;
}

const FileMoveLoading: React.FC<FileMoveLoadingProps> = ({
  currentlyMovingFile,
  movingFilesCount,
}) => {
  return (
    <div className={styles.backdrop}>
      <img
        src={Spinner}
        alt="Spinner"
        className={`${styles.spin} ${styles.icon}`}
      />
      <p>
        <small>This might take a few minutes, depending on the file size</small>
      </p>
      <p>
        Moving files <LoadingDots />
      </p>
      <div className={styles.movingDescription}>
        <p>
          {currentlyMovingFile?.place}/{movingFilesCount}
        </p>
        <p>{currentlyMovingFile?.name}</p>
      </div>
    </div>
  );
};

export default FileMoveLoading;
