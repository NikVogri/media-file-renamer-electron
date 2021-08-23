import { AnyAction } from 'redux';
import * as types from '../../constants/actionTypes';

export const setFoundDrives = (drives: string[]): AnyAction => {
  return {
    type: types.SET_LOCAL_DRIVES,
    payload: drives,
  };
};

export const setSelectedDrive = (drive: string): AnyAction => {
  return {
    type: types.SET_SELECTED_DRIVE,
    payload: drive,
  };
};

export const setPathTemplate = (template: string): AnyAction => {
  return {
    type: types.SET_PATH_TEMPLATE,
    payload: template,
  };
};
