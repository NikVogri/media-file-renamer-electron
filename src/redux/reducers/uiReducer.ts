import { AnyAction } from 'redux';
import initState from '../state/uiState';
import * as types from '../../constants/actionTypes';

const uiReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case types.TOGGLE_SHOW_MEDIA_LIST_PROMPT:
      return {
        ...state,
        showContentListPrompt: !state.showContentListPrompt,
      };
    case types.SET_FILE_MOVE_ERROR_MESSAGE:
      return {
        ...state,
        moveErrorMessage: action.payload,
      };
    case types.SET_CURRENTLY_MOVING_FILE:
      return {
        ...state,
        currentlyMovingFile: { ...action.payload },
      };
    case types.CLEAR_CURRENTLY_MOVING_FILE:
      return {
        ...state,
        currentlyMovingFile: null,
      };
    case types.SET_MOVING_STEP:
      return {
        ...state,
        movingStep: action.payload,
      };
    default:
      return state;
  }
};

export default uiReducer;
