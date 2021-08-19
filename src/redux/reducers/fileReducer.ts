import { Action } from 'redux';
import { initState } from '../state/fileState';
import * as types from '../../constants/actionTypes';

const fileReducer = (state = initState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default fileReducer;
