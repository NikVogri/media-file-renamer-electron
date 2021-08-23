import { AnyAction } from 'redux';
import initState from '../state/settingsState';
import * as types from '../../constants/actionTypes';

const settingsReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_LOCAL_DRIVES:
      return {
        ...state,
        foundDrives: action.payload,
      };
    case types.SET_SELECTED_DRIVE:
      return {
        ...state,
        selectedDrive: action.payload,
      };
    case types.SET_PATH_TEMPLATE:
      return {
        ...state,
        template: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
