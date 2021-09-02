import { AnyAction } from 'redux';
import { initState } from '../state/fileState';
import * as types from '../../constants/actionTypes';
import { FileManager } from '../../lib/FileManager';

const fileReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_FILES:
      return {
        ...state,
        files: [...state.files, ...action.payload],
      };
    case types.SET_MOVING_STEP:
      return {
        ...state,
        movingStep: action.payload,
      };
    case types.CLEAR_FILES:
      return {
        ...state,
        files: [],
        filesWithMissingData: [],
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
    case types.SET_TEMPLATED_FILES:
      return {
        ...state,
        files: [...action.payload],
      };
    case types.SET_FILES_WITH_MISSING_DATA:
      return {
        ...state,
        filesWithMissingData: [...action.payload],
      };
    case types.SET_FETCH_RESULTS:
      return {
        ...state,
        fetchResults: [...action.payload],
      };
    case types.SET_FETCHING_FOR_FILE:
      return {
        ...state,
        fetchingForFile: action.payload,
      };
    default:
      return state;
  }
};

export default fileReducer;
