import React from 'react';
import CheckmarkIcon from '../../../assets/icons/checkmark.svg';

import styles from './FileMoveSuccess.module.scss';

interface FileMoveSuccessProps {
  closeOverlay: () => void;
  movedFilesCount: number;
}

const FileMoveSuccess: React.FC<FileMoveSuccessProps> = ({
  closeOverlay,
  movedFilesCount,
}) => {
  return (
    <div className={styles.backdrop}>
      <img src={CheckmarkIcon} alt="Success" className={styles.icon} />
      <p>Successfully renamed {movedFilesCount} files</p>
      <button type="button" onClick={closeOverlay}>
        Close
      </button>
    </div>
  );
};

export default FileMoveSuccess;
