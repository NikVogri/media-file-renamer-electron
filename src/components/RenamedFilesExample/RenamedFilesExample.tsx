import React from 'react';
import { useSelector } from 'react-redux';
import { FileManager } from '../../lib/FileManager';
import { RootState } from '../../redux/store';
import FileListItem from '../FileListItem/FileListItem';

import styles from './RenamedFilesExample.module.scss';

const RenamedFilesExample: React.FC = () => {
  const editedFiles = useSelector((state: RootState) => {
    return state.file.files.filter((file: FileManager) => file.edited);
  });

  return (
    <div className={styles.rename_result}>
      <div>
        <ul>
          {editedFiles.map((file: FileManager) => (
            <FileListItem key={file.newName} file={file} showEdited />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RenamedFilesExample;
