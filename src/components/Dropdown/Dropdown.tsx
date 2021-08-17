import React, { useCallback, useContext } from 'react';

import { useDropzone } from 'react-dropzone';
import { FileType } from '../../lib/FileType';
import dropItemsIcon from '../../../assets/icons/drop-items.svg';

import styles from './Dropdown.module.scss';
import { GlobalContext } from '../../contexts/GlobalContext';

const Dropdown: React.FC = () => {
  const { addFiles } = useContext(GlobalContext);

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
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
