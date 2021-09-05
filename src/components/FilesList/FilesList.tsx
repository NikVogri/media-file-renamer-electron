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
          {files.map((file: FileManager, index: number) => (
            <FileListItem
              key={file.id}
              file={file}
              index={index}
              filesCount={files.length}
              showEdited
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilesList;
