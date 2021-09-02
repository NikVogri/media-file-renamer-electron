import { AnyAction } from 'redux';
import * as types from '../../constants/actionTypes';
import { BasicSettings, ContentType } from '../../lib/tsDefinitions';

export const setFoundDrives = (drives: string[]): AnyAction => {
  return {
    type: types.SET_LOCAL_DRIVES,
    payload: drives,
  };
};

export const setBasicSettings = (settings: BasicSettings): AnyAction => {
  return {
    type: types.SET_BASIC_SETTINGS,
    payload: settings,
  };
};

export const setSelectedDrive = (
  drive: string,
  contentType: ContentType
): AnyAction => {
  return {
    type:
      contentType === ContentType.tv
        ? types.SET_TV_SELECTED_DRIVE
        : types.SET_MOVIE_SELECTED_DRIVE,
    payload: drive,
  };
};
