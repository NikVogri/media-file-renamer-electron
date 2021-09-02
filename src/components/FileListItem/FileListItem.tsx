import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';

import { useDispatch } from 'react-redux';
import { FileManager } from '../../lib/FileManager';
import { fetchAdditionalFileData } from '../../redux/actions/fileActionsCreator';
import { isVideo } from '../../lib/fileHelpers';

import styles from './FileListItem.module.scss';

interface FileListItemProps {
  file: FileManager;
  showEdited: boolean;
}

const videoIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 48 48"
  >
    <title>ic_movie_creation_48px</title>
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
  >
    <title>ic_subtitles_48px</title>
    <g className="nc-icon-wrapper" fill="#1C81F3">
      <path d="M40 8H8c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h32c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM8 24h8v4H8v-4zm20 12H8v-4h20v4zm12 0h-8v-4h8v4zm0-8H20v-4h20v4z" />
    </g>
  </svg>
);

const FileListItem: React.FC<FileListItemProps> = ({ file, showEdited }) => {
  const dispatch = useDispatch();
  const fileIsVideo = isVideo(file.type);

  const fileIsMissingData = file.missingData.length > 0;

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
        <div className={styles.warning}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={styles.errorIcon}
          >
            <g>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </g>
          </svg>
          <div className={styles.hoverErrorDescription}>
            <p>File is missing the following data:</p>
            <ul>
              {file.missingData.map((md: string) => (
                <li key={md + Math.random()}>{md}</li>
              ))}
            </ul>

            <button type="button" onClick={handleFetchData}>
              Fetch data (online)
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

FileListItem.propTypes = {
  file: PropTypes.any.isRequired,
  showEdited: PropTypes.bool.isRequired,
};

export default FileListItem;
