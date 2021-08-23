import path from 'path';

import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { FileManager } from '../../lib/FileManager';
import { extractReadableErrorMessage } from '../../lib/moveErrorHandler';
import { MovingStep } from '../../lib/tsDefinitions';
import { RootState } from '../store';

import * as types from '../../constants/actionTypes';

export const addFiles = (files: unknown[]): AnyAction => {
  let payload: FileManager[];

  if (files.every((f: unknown) => f instanceof FileManager)) {
    payload = files as FileManager[];
  } else {
    payload = (files as File[]).map((f: File) => new FileManager(f));
  }

  return {
    type: types.SET_FILES,
    payload,
  };
};

export const setMovingStep = (nextStep: MovingStep): AnyAction => {
  return {
    type: types.SET_MOVING_STEP,
    payload: nextStep,
  };
};

export const applyTemplateToFiles = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => (dispatch, getState) => {
  const { files } = getState().file;
  const { template, selectedDrive } = getState().settings;

  const filesWithAppliedTemplate = files.map((f: FileManager) => {
    const filePathTemplate = `${selectedDrive}${path.sep}${template}`;

    f.applyTemplate(filePathTemplate);
    return f;
  });

  dispatch(addFiles(filesWithAppliedTemplate));
};

export const setMoveErrorStatus = (error: string): AnyAction => {
  return {
    type: types.SET_FILE_MOVE_ERROR_MESSAGE,
    payload: error,
  };
};

const setCurrentlyMovingFile = (
  file: FileManager,
  index: number
): AnyAction => {
  return {
    type: types.SET_CURRENTLY_MOVING_FILE,
    payload: {
      name: file.newName,
      place: index + 1,
    },
  };
};

export const renameAndMoveFiles = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => async (dispatch, getState) => {
  const { files } = getState().file;
  dispatch(setMovingStep(MovingStep.loading));

  try {
    for (let i = 0; i < files.length; i++) {
      dispatch(setCurrentlyMovingFile(files[i], i));
      await files[i].renameAndMove();
    }

    dispatch({ type: types.CLEAR_CURRENTLY_MOVING_FILE });
    dispatch(setMovingStep(MovingStep.success));
  } catch (err) {
    console.log(err);
    dispatch(setMovingStep(MovingStep.fail));
    dispatch(setMoveErrorStatus(extractReadableErrorMessage(err)));
  }
};
