import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { isSupportedFile } from '../../lib/fileHelpers';
import { addFiles } from '../../redux/actions/fileActionsCreator';

import dropItemsIcon from '../../../assets/icons/drop-items.svg';

import styles from './FileDropzone.module.scss';

const Dropdown: React.FC = () => {
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const supportedFiles = acceptedFiles.filter(isSupportedFile) as File[];
      dispatch(addFiles(supportedFiles));
    },
    [dispatch]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <div>active</div>
      ) : (
        <div className={styles.dropzoneCenter}>
          <img src={dropItemsIcon} alt="Drop files or folders" />
          <p>
            <strong>Drag & drop</strong> files or folders here
          </p>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
