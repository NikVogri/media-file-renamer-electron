import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { FileManager } from '../../lib/FileManager';
import FileListItem from '../FileListItem/FileListItem';

import styles from './RenameResult.module.scss';

const RenameResult: React.FC = () => {
  const { files } = useContext(GlobalContext);

  return (
    <div className={styles.rename_result}>
      <div>
        <ul>
          {files
            .filter((file: FileManager) => file.edited)
            .map((file: FileManager) => (
              <FileListItem key={file.newName} file={file} showEdited />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RenameResult;
