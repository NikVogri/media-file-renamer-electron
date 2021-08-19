import { Action } from 'redux';

const initState = {};

const settingsReducer = (state = initState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default settingsReducer;
