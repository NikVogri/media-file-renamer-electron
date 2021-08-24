import React from 'react';
import { FileManager } from '../../lib/FileManager';

import styles from './FilesList.module.scss';

import FileListItem from '../FileListItem/FileListItem';

interface RenamedFilesExampleProps {
  files: FileManager[];
}

const FilesList: React.FC<RenamedFilesExampleProps> = ({ files }) => {
  return (
    <div className={styles.filesList}>
      <div>
        <ul>
          {files.map((file: FileManager) => (
            <FileListItem key={file.newName} file={file} showEdited />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilesList;
