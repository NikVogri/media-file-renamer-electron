import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';

import { useDispatch, useSelector } from 'react-redux';
import { FileManager } from '../../lib/FileManager';
import { fetchAdditionalFileData } from '../../redux/actions/fileActionsCreator';
import { isVideo } from '../../lib/fileHelpers';

import styles from './FileListItem.module.scss';
import { RootState } from '../../redux/store';
import WarningDescription from '../WarningDescription/WarningDescription';

interface FileListItemProps {
  file: FileManager;
  showEdited: boolean;
  index: number;
  filesCount: number;
}

const videoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    className={styles.contentIcon}
  >
    <g className="nc-icon-wrapper" fill="#1C81F3">
      <path d="M36 8l4 8h-6l-4-8h-4l4 8h-6l-4-8h-4l4 8h-6l-4-8H8c-2.21 0-3.98 1.79-3.98 4L4 36c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V8h-8z" />
    </g>
  </svg>
);

const subtitleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
    className={styles.contentIcon}
  >
    <g className="nc-icon-wrapper" fill="#1C81F3">
      <path d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM8 24h8v4H8v-4zm20 12H8v-4h20v4zm12 0h-8v-4h8v4zm0-8H20v-4h20v4z" />
    </g>
  </svg>
);

const FileListItem: React.FC<FileListItemProps> = ({
  file,
  index,
  showEdited,
}) => {
  const dispatch = useDispatch();
  const currentlyMovingFile = useSelector(
    (state: RootState) => state.ui.currentlyMovingFile
  );

  const fileIsVideo = isVideo(file.type);
  const fileIsMissingData = file.missingData.length > 0;
  const fileIsCurrentlyMoving = currentlyMovingFile?.id === file.id;
  const fileIsAlreadyMoved =
    !fileIsCurrentlyMoving && currentlyMovingFile?.index > index;

  const handleFetchData = () => dispatch(fetchAdditionalFileData(file));

  return (
    <li className={`${styles.file_list_item} ${styles.missing_data}`}>
      {fileIsVideo ? videoIcon : subtitleIcon}

      <div className={styles.info}>
        <p>
          {!showEdited ? file.path.build() : file.newPath.build()}
          {path.sep}
        </p>
        <h4>{!showEdited ? file.name : file.newName}</h4>
      </div>

      {fileIsMissingData && (
        <WarningDescription
          missingData={file.missingData}
          onHandleFetchData={handleFetchData}
        />
      )}

      {fileIsCurrentlyMoving && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 31 31"
          className={`${styles.statusIcon} ${styles.statusIcon_moving}`}
        >
          <g>
            <path d="M17.28 2.34v1c0 0.65 0.44 1.21 1.06 1.39 4.65 1.3 8.06 5.56 8.06 10.63 0 6.1-4.94 11.04-11.04 11.04-6.1 0-11.04-4.94-11.04-11.04 0-5.07 3.41-9.33 8.06-10.63 0.62-0.17 1.06-0.74 1.06-1.39v-1c0-0.94-0.89-1.63-1.8-1.39-6.44 1.66-11.19 7.52-11.16 14.49 0.04 8.22 6.69 14.82 14.91 14.8 8.2-0.02 14.85-6.67 14.85-14.88 0-6.94-4.75-12.77-11.17-14.41-0.91-0.23-1.79 0.46-1.79 1.39z" />
          </g>
        </svg>
      )}
      {fileIsAlreadyMoved && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 31 31"
          className={`${styles.statusIcon} ${styles.statusIcon_moved}`}
        >
          <g>
            <path d="M30.24 15.36c0 8.22-6.66 14.88-14.88 14.88s-14.88-6.66-14.88-14.88 6.66-14.88 14.88-14.88 14.88 6.66 14.88 14.88z m-16.6 7.88l11.04-11.04c0.37-0.37 0.37-0.98 0-1.36l-1.36-1.36c-0.37-0.37-0.98-0.37-1.36 0l-9 9.01-4.2-4.21c-0.37-0.37-0.98-0.37-1.36 0l-1.36 1.36c-0.37 0.37-0.37 0.98 0 1.36l6.24 6.24c0.37 0.37 0.98 0.37 1.36 0z" />
          </g>
        </svg>
      )}
    </li>
  );
};

FileListItem.propTypes = {
  file: PropTypes.any.isRequired,
  showEdited: PropTypes.bool.isRequired,
};

export default FileListItem;
