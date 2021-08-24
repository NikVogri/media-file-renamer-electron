import React, { useCallback } from 'react';

import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { isSupportedFile } from '../../lib/fileHelpers';
import { addFiles } from '../../redux/actions/fileActionsCreator';

import dropItemsIcon from '../../../assets/icons/drop-items.svg';

import styles from './FileDropzone.module.scss';

const FileDropzone: React.FC = () => {
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const supportedFiles = acceptedFiles.filter(isSupportedFile) as File[];
      dispatch(addFiles(supportedFiles));
    },
    [dispatch]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} />

      <div className={styles.dropzoneCenter}>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 16 16"
          width="100"
          height="100"
          className={styles.icon}
        >
          <title>Drop items</title>
          <g className="nc-icon-wrapper">
            <path
              className={styles.iconArrow}
              d="M8,12c0.3,0,0.5-0.1,0.7-0.3L14.4,6L13,4.6l-4,4V0H7v8.6l-4-4L1.6,6l5.7,5.7C7.5,11.9,7.7,12,8,12z"
            />{' '}
            <path
              className={styles.iconBase}
              d="M14,14H2v-3H0v4c0,0.6,0.4,1,1,1h14c0.6,0,1-0.4,1-1v-4h-2V14z"
            />
          </g>
        </svg>
        <p>
          <strong>Drag & drop</strong> files or folders here
        </p>
      </div>
    </div>
  );
};

export default FileDropzone;
