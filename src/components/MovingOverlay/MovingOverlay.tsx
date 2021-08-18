import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './MovingOverlay.module.scss';

import Spinner from '../../../assets/icons/circle-notch.svg';
import CheckmarkIcon from '../../../assets/icons/checkmark.svg';
import FailureIcon from '../../../assets/icons/failure.svg';
import { GlobalContext } from '../../contexts/GlobalContext';
import { MovingStep } from '../../lib/tsDefinitions';

interface MovingOverlayInterface {
  type: MovingStep;
  failReason?: string;
  filesMoved?: string[];
}

const MovingOverlay: React.FC<MovingOverlayInterface> = ({
  type,
  failReason,
}) => {
  const { files, clearFiles, setFilesMoveStep } = useContext(GlobalContext);
  const [loadingDots, setLoadingDots] = useState('.');

  const updateDots = () => {
    setLoadingDots((oldDots) => {
      const dotsCount = oldDots.length + 1;
      return dotsCount > 3 ? '.' : oldDots.concat('.');
    });
  };

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout;

    if (type === MovingStep.loading) {
      dotsInterval = setInterval(updateDots, 750);
    }

    return () => clearInterval(dotsInterval);
  }, [type]);

  const handleSuccessCloseOverlay = () => {
    clearFiles();
    setFilesMoveStep(MovingStep.none);
  };

  if (type === MovingStep.loading) {
    return (
      <div className={styles.backdrop}>
        <img
          src={Spinner}
          alt="Spinner"
          className={`${styles.spin} ${styles.icon}`}
        />
        <p>
          <small>
            This might take a few minutes, depending on the file size
          </small>
        </p>
        <p>Moving files{loadingDots}</p>
      </div>
    );
  }

  if (type === MovingStep.success) {
    return (
      <div className={styles.backdrop}>
        <img src={CheckmarkIcon} alt="Success" className={styles.icon} />
        <p>Successfully moved {files.length} files</p>
        <button type="button" onClick={() => handleSuccessCloseOverlay()}>
          Close
        </button>
      </div>
    );
  }

  if (type === MovingStep.fail) {
    return (
      <div className={styles.backdrop}>
        <img src={FailureIcon} alt="Failure" className={styles.icon} />
        <p>Moving failed</p>
        <p>{failReason}</p>
        <button type="button" onClick={() => setFilesMoveStep(MovingStep.none)}>
          Close
        </button>
      </div>
    );
  }

  return <></>;
};

MovingOverlay.propTypes = {
  type: PropTypes.any.isRequired,
  failReason: PropTypes.string,
};

MovingOverlay.defaultProps = {
  failReason: undefined,
};

export default MovingOverlay;
