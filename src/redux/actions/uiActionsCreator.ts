import { AnyAction } from 'redux';
import * as types from '../../constants/actionTypes';

export const toggleShowUserContentSelectionModal = (): AnyAction => {
  return {
    type: types.TOGGLE_SHOW_MEDIA_LIST_PROMPT,
  };
};
