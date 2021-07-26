import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';

import styles from './Dropdown.module.scss';

const Dropdown: React.FC = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  console.log(isDragActive);

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
