import React from 'react';
import PropTypes from 'prop-types';
import path from 'path';

import styles from './FileListItem.module.scss';

import videoIcon from '../../../assets/icons/video.svg';
import subtitleIcon from '../../../assets/icons/subtitles.svg';
import { FileManager } from '../../lib/FileManager';
import { isVideo } from '../../lib/fileHelpers';

interface FileListItemProps {
  file: FileManager;
  showEdited: boolean;
}

const FileListItem: React.FC<FileListItemProps> = ({ file, showEdited }) => {
  const fileIsVideo = isVideo(file.type);

  return (
    <li className={styles.file_list_item}>
      <img
        src={fileIsVideo ? videoIcon : subtitleIcon}
        alt={fileIsVideo ? 'Video Icon' : 'Subtitle Icon'}
      />

      <div className={styles.info}>
        <p>
          {!showEdited ? file.path.build() : file.newPath.build()}
          {path.sep}
        </p>
        <h4>{!showEdited ? file.name : file.newName}</h4>
      </div>
      {/* <h4>{convertBytesToHigherUnit(file.size)}</h4> */}
    </li>
  );
};

FileListItem.propTypes = {
  file: PropTypes.any.isRequired,
  showEdited: PropTypes.bool.isRequired,
};

export default FileListItem;
