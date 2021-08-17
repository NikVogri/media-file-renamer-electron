import React, { useCallback, useContext } from 'react';

import { useDropzone } from 'react-dropzone';
import { FileType } from '../../lib/FileType';

import styles from './Dropdown.module.scss';
import { GlobalContext } from '../../contexts/GlobalContext';

const Dropdown: React.FC = () => {
  const { addFiles } = useContext(GlobalContext);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter((file: File) =>
        FileType.isValid(file)
      );

      addFiles(filteredFiles);
    },
    [addFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} />

      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag n drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Dropdown;
