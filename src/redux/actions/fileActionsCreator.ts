import path from 'path';

import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { FileManager } from '../../lib/FileManager';
import { extractReadableErrorMessage } from '../../lib/moveErrorHandler';
import {
  ContentType,
  EpisodeAdditionalData,
  FetchedData,
  MovieAdditionalData,
  MovingStep,
  TVAdditionalData,
} from '../../lib/tsDefinitions';
import { RootState } from '../store';

import * as types from '../../constants/actionTypes';
import { getFilesWithMissingData } from '../../lib/getFilesWithMissingData';
import { GetApi } from '../../lib/api/GetApi';
import { toggleShowUserContentSelectionModal } from './uiActionsCreator';

export const addFiles = (
  files: File[]
): ThunkAction<void, RootState, unknown, AnyAction> => async (
  dispatch,
  getState
) => {
  const { files: allFiles } = getState().file;
  const incomingFiles = (files as File[]).map((f: File) => new FileManager(f));

  const uniqueFiles = incomingFiles.filter(
    (infile: FileManager) =>
      !allFiles.some((f: FileManager) => f.name === infile.name)
  );

  dispatch({
    type: types.SET_FILES,
    payload: uniqueFiles,
  });
};

export const setMovingStep = (nextStep: MovingStep): AnyAction => {
  return {
    type: types.SET_MOVING_STEP,
    payload: nextStep,
  };
};

export const addTemplatedFiles = (
  files: FileManager[],
  clearOlderFiles: boolean
): AnyAction => {
  if (clearOlderFiles) {
    return {
      type: types.SET_TEMPLATED_FILES,
      payload: files,
    };
  }

  return {
    type: types.SET_FILES,
    payload: files,
  };
};

export const applyTemplateToFiles = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => (dispatch, getState) => {
  const { files } = getState().file;
  const {
    movieTemplate,
    tvTemplate,
    movieSelectedDrive,
    tvSelectedDrive,
  } = getState().settings;

  console.log(files);

  const filesWithAppliedTemplate = files.map((f: FileManager) => {
    let filePathTemplate = '';

    if (f.contentType === ContentType.movie) {
      filePathTemplate = `${movieSelectedDrive}${path.sep}${movieTemplate}`;
    } else if (f.contentType === ContentType.tv) {
      filePathTemplate = `${tvSelectedDrive}${path.sep}${tvTemplate}`;
    }

    f.applyTemplate(filePathTemplate);
    return f;
  });

  const filesWithMissingData = getFilesWithMissingData(
    filesWithAppliedTemplate
  );

  if (filesWithMissingData.length > 0) {
    dispatch({
      type: types.SET_FILES_WITH_MISSING_DATA,
      payload: filesWithMissingData,
    });
  }

  dispatch(addTemplatedFiles(filesWithAppliedTemplate, true));
};

export const setMoveErrorStatus = (error: string): AnyAction => {
  return {
    type: types.SET_FILE_MOVE_ERROR_MESSAGE,
    payload: error,
  };
};

const setCurrentlyMovingFile = (
  file: FileManager,
  index: number
): AnyAction => {
  return {
    type: types.SET_CURRENTLY_MOVING_FILE,
    payload: {
      name: file.newName,
      place: index + 1,
    },
  };
};

export const renameAndMoveFiles = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => async (dispatch, getState) => {
  const { files } = getState().file;
  dispatch(setMovingStep(MovingStep.loading));

  try {
    for (let i = 0; i < files.length; i++) {
      dispatch(setCurrentlyMovingFile(files[i], i));
      await files[i].renameAndMove();
    }

    dispatch({ type: types.CLEAR_CURRENTLY_MOVING_FILE });
    dispatch(setMovingStep(MovingStep.success));
  } catch (err) {
    console.log(err);
    dispatch(setMovingStep(MovingStep.fail));
    dispatch(setMoveErrorStatus(extractReadableErrorMessage(err as Error)));
  }
};

export const setFetchResults = (fetchResults: unknown[]): AnyAction => {
  return {
    type: types.SET_FETCH_RESULTS,
    payload: fetchResults,
  };
};

export const setFetchingForFile = (file: FileManager): AnyAction => {
  return {
    type: types.SET_FETCHING_FOR_FILE,
    payload: file,
  };
};

export const fetchAndApplyDataToTV = (
  id: number
): ThunkAction<void, RootState, unknown, AnyAction> => async (
  dispatch,
  getState
) => {
  const { fetchingForFile, files } = getState().file;
  const API = GetApi(getState().settings);
  const allFiles = [...files] as FileManager[];
  const updateFile = allFiles.find(
    (f: FileManager) =>
      f.data.title === fetchingForFile.data.title &&
      f.data.episode === fetchingForFile.data.episode &&
      f.data.season === fetchingForFile.data.season
  );

  // TODO: change the logic so it will update ALL the files (whole season, not just one file at a time)

  if (!updateFile) {
    throw new Error('Update file unavailable');
  }

  const fetchedData = await API.getTVSeasonData(
    id,
    fetchingForFile.data.season
  );

  const updatedFiles = allFiles.map((f: FileManager) => {
    if (f.data.title !== fetchingForFile.data.title) {
      return f;
    }

    const additionalDataForThisFile = fetchedData.find(
      (fd: EpisodeAdditionalData) =>
        fd.episode === f.data.episode && fd.season === f.data.season
    );

    if (!additionalDataForThisFile) {
      return f;
    }

    f.data = { ...f.data, ...additionalDataForThisFile };
    f.missingData = [];

    return f;
  });

  dispatch(addTemplatedFiles(updatedFiles, true));
  dispatch(setFetchResults([]));
};

const findMovieFileToUpdate = (
  allFiles: FileManager[],
  searchedForFile: FileManager
) =>
  allFiles.find(
    (f: FileManager) => f.data.title === searchedForFile.data.title
  );

export const applyDataToMovie = (
  fetchedData: MovieAdditionalData
): ThunkAction<void, RootState, unknown, AnyAction> => async (
  dispatch,
  getState
) => {
  const { fetchingForFile, files } = getState().file;
  const allFiles = [...files] as FileManager[];
  const updateFile = findMovieFileToUpdate(allFiles, fetchingForFile);

  if (!updateFile) {
    throw new Error('Update file unavailable');
  }

  updateFile.data = { ...updateFile.data, ...fetchedData };
  updateFile.missingData = [];

  dispatch(addTemplatedFiles(allFiles, true));
  dispatch(setFetchResults([]));
};

export const addFetchedDataToFile = (
  data: FetchedData
): ThunkAction<void, RootState, unknown, AnyAction> => async (
  dispatch,
  getState
) => {
  const { fetchingForFile } = getState().file;

  try {
    dispatch(toggleShowUserContentSelectionModal());

    if (fetchingForFile.contentType === ContentType.tv) {
      dispatch(fetchAndApplyDataToTV(data.id));
    } else {
      dispatch(applyDataToMovie(data));
    }
  } catch (err) {
    console.log(err);
    // TODO: global application error
  }
};

export const fetchAdditionalFileData = (
  file: FileManager
): ThunkAction<void, RootState, unknown, AnyAction> => async (
  dispatch,
  getState
) => {
  const { title } = file.data;
  const API = GetApi(getState().settings);

  if (!title) {
    return console.log('file title is missing'); // this should never happen
  }

  dispatch(setFetchingForFile(file));

  try {
    let fetchedContent: MovieAdditionalData[] | TVAdditionalData[] = [];

    if (file.contentType === ContentType.tv) {
      fetchedContent = (await API.getTVShowId(title)) as TVAdditionalData[];
    } else if (file.contentType === ContentType.movie) {
      fetchedContent = (await API.getMovieData(title)) as MovieAdditionalData[];
    } else {
      throw new Error('File content type is not supported');
    }

    if (fetchedContent.length === 1) {
      dispatch(addFetchedDataToFile(fetchedContent[0]));
    }

    dispatch(setFetchResults(fetchedContent));
    dispatch(toggleShowUserContentSelectionModal());
  } catch (err) {
    console.log(err);
    // TODO: global application error
  }
};
