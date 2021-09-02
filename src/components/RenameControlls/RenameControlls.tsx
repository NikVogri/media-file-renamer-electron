import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileManager } from '../../lib/FileManager';
import {
  applyTemplateToFiles,
  renameAndMoveFiles,
} from '../../redux/actions/fileActionsCreator';

import styles from './RenameControlls.module.scss';

import * as types from '../../constants/actionTypes';
import { RootState } from '../../redux/store';

const RenameControlls: React.FC = () => {
  const dispatch = useDispatch();
  const files = useSelector(
    (state: RootState) => state.file.files as FileManager[]
  );

  const applyRenameTemplate = () => dispatch(applyTemplateToFiles());
  const handleRenameAndMoveFiles = async () => dispatch(renameAndMoveFiles());
  const handleClearItems = () => dispatch({ type: types.CLEAR_FILES });

  const allFilesWereEdited = files.length > 0 && files.every((f) => f.edited);

  return (
    <div className={styles.renameControlls}>
      {!allFilesWereEdited ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="512"
          height="512"
          className={styles.confirm}
          onClick={applyRenameTemplate}
        >
          <title>Preview</title>
          <g>
            <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z" />
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 31 31"
          width="32"
          height="32"
          className={styles.confirm}
          onClick={handleRenameAndMoveFiles}
        >
          <title>Confirm</title>
          <g>
            <path d="M30.24 15.36c0 8.22-6.66 14.88-14.88 14.88s-14.88-6.66-14.88-14.88 6.66-14.88 14.88-14.88 14.88 6.66 14.88 14.88z m-16.6 7.88l11.04-11.04c0.37-0.37 0.37-0.98 0-1.36l-1.36-1.36c-0.37-0.37-0.98-0.37-1.36 0l-9 9.01-4.2-4.21c-0.37-0.37-0.98-0.37-1.36 0l-1.36 1.36c-0.37 0.37-0.37 0.98 0 1.36l6.24 6.24c0.37 0.37 0.98 0.37 1.36 0z" />
          </g>
        </svg>
      )}
      {files.length > 0 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width="512"
          height="512"
          className={styles.clear}
          onClick={handleClearItems}
        >
          <title>Clear</title>
          <g>
            <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" />
          </g>
        </svg>
      )}
    </div>
  );
};

export default RenameControlls;
