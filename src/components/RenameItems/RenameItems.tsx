import React, { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';
import { FileManager } from '../../lib/FileManager';
import Dropdown from '../Dropdown/Dropdown';
import FileListItem from '../FileListItem/FileListItem';

import styles from './RenameItems.module.scss';

const RenameItems: React.FC = () => {
  const { files } = useContext(GlobalContext);

  console.log('files count', files.length);

  return (
    <div className={styles.rename_items}>
      {files.length === 0 && <Dropdown />}
      {files.length > 0 && (
        <ul>
          {files.map((file: FileManager) => (
            <FileListItem key={file.name} file={file} showEdited={false} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default RenameItems;
