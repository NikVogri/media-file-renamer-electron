import { AnyAction } from 'redux';
import initState from '../state/settingsState';
import * as types from '../../constants/actionTypes';

const settingsReducer = (state = initState, action: AnyAction) => {
  switch (action.type) {
    case types.SET_LOCAL_DRIVES:
      return {
        ...state,
        foundDrives: action.payload,
        movieSelectedDrive: state.movieSelectedDrive
          ? state.movieSelectedDrive
          : action.payload[0],
        tvSelectedDrive: state.tvSelectedDrive
          ? state.tvSelectedDrive
          : action.payload[0],
      };
    case types.SET_BASIC_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };
    case types.SET_MOVIE_PATH_TEMPLATE:
      return {
        ...state,
        movieTemplate: action.payload,
      };
    case types.SET_TV_PATH_TEMPLATE:
      return {
        ...state,
        tvTemplate: action.payload,
      };
    case types.SET_TMDB_API_KEY:
      return {
        ...state,
        tmdbApiKey: action.payload,
      };
    case types.SET_TV_SELECTED_DRIVE:
      return {
        ...state,
        tvSelectedDrive: action.payload,
      };
    case types.SET_MOVIE_SELECTED_DRIVE:
      return {
        ...state,
        movieSelectedDrive: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
