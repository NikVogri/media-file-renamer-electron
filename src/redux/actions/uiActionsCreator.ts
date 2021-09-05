import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as types from '../../constants/actionTypes';
import { FileManager } from '../../lib/FileManager';
import { MovingStep } from '../../lib/tsDefinitions';
import { RootState } from '../store';

export const toggleShowUserContentSelectionModal = (): AnyAction => {
  return {
    type: types.TOGGLE_SHOW_MEDIA_LIST_PROMPT,
  };
};

export const setClearItems = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => async (dispatch) => {
  dispatch({ type: types.CLEAR_FILES });
  dispatch({ type: types.CLEAR_CURRENTLY_MOVING_FILE });
};

export const setMoveErrorStatus = (error: string): AnyAction => {
  return {
    type: types.SET_FILE_MOVE_ERROR_MESSAGE,
    payload: error,
  };
};

export const setCurrentlyMovingFile = (
  file: FileManager | null,
  index: number
): AnyAction => {
  return {
    type: types.SET_CURRENTLY_MOVING_FILE,
    payload: {
      name: file?.newName,
      id: file?.id,
      index,
    },
  };
};

export const setMovingStep = (nextStep: MovingStep): AnyAction => {
  return {
    type: types.SET_MOVING_STEP,
    payload: nextStep,
  };
};
