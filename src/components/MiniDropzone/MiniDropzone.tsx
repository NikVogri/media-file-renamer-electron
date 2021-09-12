import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { isSupportedFile } from '../../lib/fileHelpers';
import { addFiles } from '../../redux/actions/fileActionsCreator';

import styles from './MiniDropzone.module.scss';

interface MiniDropzoneProps {
  disabled: boolean;
}

const MiniDropzone: React.FC<MiniDropzoneProps> = ({ disabled }) => {
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
    <div className={styles.miniDropzone}>
      <div
        className={`${styles.addAdditional} ${disabled ? styles.disabled : ''}`}
        {...getRootProps()}
      >
        {!disabled && <input {...getInputProps()} />}

        {isDragActive ? (
          <span>Drop files...</span>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <g>
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z" />
              </g>
            </svg>
            <span>Drop additional files</span>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniDropzone;
