import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { isSupportedFile } from '../../lib/fileHelpers';
import { FileManager } from '../../lib/FileManager';
import { addFiles } from '../../redux/actions/fileActionsCreator';
import FilesList from '../FilesList/FilesList';

import styles from './FilesListWithDropzone.module.scss';

interface FileListWithDropzoneProps {
  files: FileManager[];
}

const FilesListWithDropzone: React.FC<FileListWithDropzoneProps> = ({
  files,
}) => {
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
    <div className={styles.filesListWithDropzone}>
      <FilesList files={files} />
      <div className={styles.addAdditional} {...getRootProps()}>
        <input {...getInputProps()} />

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
              <title>ic_add_circle_48px</title>
              <g>
                <path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm10 22h-8v8h-4v-8h-8v-4h8v-8h4v8h8v4z" />
              </g>
            </svg>
            <span>Add additional files</span>
          </>
        )}
      </div>
    </div>
  );
};

export default FilesListWithDropzone;
