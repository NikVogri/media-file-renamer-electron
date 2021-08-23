import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { MovingStep } from '../../lib/tsDefinitions';
import { RootState } from '../../redux/store';
import { setMovingStep } from '../../redux/actions/fileActionsCreator';
import * as types from '../../constants/actionTypes';

import styles from './MovingOverlay.module.scss';

import Spinner from '../../../assets/icons/circle-notch.svg';
import CheckmarkIcon from '../../../assets/icons/checkmark.svg';
import FailureIcon from '../../../assets/icons/failure.svg';

interface MovingOverlayInterface {
  movingStep: MovingStep;
  failReason?: string | null;
  filesMoved?: string[];
}

const MovingOverlay: React.FC<MovingOverlayInterface> = ({
  movingStep,
  failReason,
}) => {
  const [loadingDots, setLoadingDots] = useState('.');
  const files = useSelector((state: RootState) => state.file.files);

  const currentlyMovingFile = useSelector(
    (state: RootState) => state.file.currentlyMovingFile
  );

  const dispatch = useDispatch();

  const updateDots = () => {
    setLoadingDots((oldDots) => {
      const dotsCount = oldDots.length + 1;
      return dotsCount > 3 ? '.' : oldDots.concat('.');
    });
  };

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout;

    if (movingStep === MovingStep.loading) {
      dotsInterval = setInterval(updateDots, 750);
    }

    return () => clearInterval(dotsInterval);
  }, [movingStep]);

  const handleSuccessCloseOverlay = () => {
    dispatch({ type: types.CLEAR_FILES });
    dispatch(setMovingStep(MovingStep.none));
  };

  console.log(currentlyMovingFile);

  if (movingStep === MovingStep.loading) {
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
        <div className={styles.movingDescription}>
          <p>
            {currentlyMovingFile?.place}/{files.length}
          </p>
          <p>{currentlyMovingFile?.name}</p>
        </div>
      </div>
    );
  }

  if (movingStep === MovingStep.success) {
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

  if (movingStep === MovingStep.fail) {
    return (
      <div className={styles.backdrop}>
        <img src={FailureIcon} alt="Failure" className={styles.icon} />
        <p>Moving failed</p>
        <p>{failReason}</p>
        <button
          type="button"
          onClick={() => dispatch(setMovingStep(MovingStep.none))}
        >
          Close
        </button>
      </div>
    );
  }

  return <></>;
};

MovingOverlay.propTypes = {
  movingStep: PropTypes.any.isRequired,
  failReason: PropTypes.string,
};

MovingOverlay.defaultProps = {
  failReason: null,
};

export default MovingOverlay;
