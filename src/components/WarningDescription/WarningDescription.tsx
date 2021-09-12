import React from 'react';

import styles from './WarningDescription.module.scss';

interface WarningDescriptionProps {
  onHandleFetchData: () => void;
  missingData: string[];
}

const WarningDescription: React.FC<WarningDescriptionProps> = ({
  onHandleFetchData,
  missingData,
}) => {
  return (
    <div className={styles.warning}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          className={styles.errorIcon}
        >
          <g>
            <path d="M18 3C9.72 3 3 9.72 3 18s6.72 15 15 15c8.28 0 15-6.72 15-15S26.28 3 18 3zm1 22h-2v-2h2v2zm0-5h-2v-9h2v9z" />
          </g>
        </svg>
      </div>
      <div className={styles.hoverErrorDescription}>
        <p>File is missing the following data:</p>
        <ul>
          {missingData.map((md: string) => (
            <li key={md + Math.random()}>{md}</li>
          ))}
        </ul>

        <button type="button" onClick={onHandleFetchData}>
          Fetch data (online)
        </button>
      </div>
    </div>
  );
};

export default WarningDescription;
