import React from 'react';

import { useSelector } from 'react-redux';
import { FileManager } from '../../lib/FileManager';
import { RootState } from '../../redux/store';

import Dropdown from '../FileDropzone/FileDropzone';
import FileListItem from '../FileListItem/FileListItem';

import styles from './SelectedFilesList.module.scss';

const SelectedFilesList: React.FC = () => {
  const files = useSelector((state: RootState) => state.file.files);

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

export default SelectedFilesList;
