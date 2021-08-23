import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MovingStep } from '../../lib/tsDefinitions';
import { RootState } from '../../redux/store';
import { setMovingStep } from '../../redux/actions/fileActionsCreator';
import { FileManager } from '../../lib/FileManager';
import * as types from '../../constants/actionTypes';

import FileMoveLoading from '../FileMoveLoading/FileMoveLoading';
import FileMoveError from '../FileMoveError/FileMoveError';
import FileMoveSuccess from '../FileMoveSuccess/FileMoveSuccess';

const MovingStepScreen: React.FC = () => {
  const dispatch = useDispatch();

  const { files, failReason, movingStep, currentlyMovingFile } = useSelector(
    (state: RootState) => ({
      files: state.file.files,
      failReason: state.file.moveErrorMessage,
      movingStep: state.file.movingStep,
      currentlyMovingFile: state.file.currentlyMovingFile,
    })
  );

  const handleSuccessCloseOverlay = () => {
    dispatch({ type: types.CLEAR_FILES });
    dispatch(setMovingStep(MovingStep.none));
  };

  switch (movingStep) {
    case MovingStep.loading:
      return (
        <FileMoveLoading
          currentlyMovingFile={currentlyMovingFile}
          movingFilesCount={files ? files.length : 0}
        />
      );
    case MovingStep.success:
      return (
        <FileMoveSuccess
          closeOverlay={() => handleSuccessCloseOverlay()}
          movedFilesCount={files.filter((f: FileManager) => f.edited).length}
        />
      );
    case MovingStep.fail:
      return (
        <FileMoveError
          closeOverlay={() => dispatch(setMovingStep(MovingStep.none))}
          failReason={failReason}
        />
      );
    default:
      return <></>;
  }
};

export default MovingStepScreen;
