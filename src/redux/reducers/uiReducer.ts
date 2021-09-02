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
    default:
      return state;
  }
};

export default uiReducer;
