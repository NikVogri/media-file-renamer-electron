import { AnyAction } from 'redux';
import { initState } from '../state/fileState';
import * as types from '../../constants/actionTypes';

const fileReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_FILES:
      return {
        ...state,
        files: [...state.files, ...action.payload],
      };
    case types.CLEAR_FILES:
      return {
        ...state,
        files: [],
        filesWithMissingData: [],
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
    case types.SET_FETCHING_FOR_FILE:
      return {
        ...state,
        fetchingForFile: action.payload,
      };
    case types.SET_FETCH_RESULTS:
      return {
        ...state,
        fetchResults: [...action.payload],
      };
    default:
      return state;
  }
};

export default fileReducer;
