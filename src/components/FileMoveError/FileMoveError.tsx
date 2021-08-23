import React from 'react';
import FailureIcon from '../../../assets/icons/failure.svg';

import styles from './FileMoveError.module.scss';

interface FileMoveErrorProps {
  failReason: string;
  closeOverlay: () => void;
}

const FileMoveError: React.FC<FileMoveErrorProps> = ({
  failReason,
  closeOverlay,
}) => {
  return (
    <div className={styles.backdrop}>
      <img src={FailureIcon} alt="Failure" className={styles.icon} />
      <p>Moving failed</p>
      <p>{failReason}</p>
      <button type="button" onClick={closeOverlay}>
        Close
      </button>
    </div>
  );
};

export default FileMoveError;
