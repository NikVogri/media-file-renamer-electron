import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import RenameControlls from '../../components/RenameControlls/RenameControlls';

import styles from './Rename.module.scss';
import { FileManager } from '../../lib/FileManager';
import FilesList from '../../components/FilesList/FilesList';
import FileDropzone from '../../components/FileDropzone/FileDropzone';
import FilesListWithDropzone from '../../components/FilesListWithDropzone/FilesListWithDropzone';

const Rename: React.FC = () => {
  const movingStep = useSelector((state: RootState) => state.file.movingStep);
  const files = useSelector((state: RootState) => state.file.files);
  const moveErrorMessage = useSelector(
    (state: RootState) => state.file.moveErrorMessage
  );

  let render;

  if (!files.length) {
    render = (
      <div className={styles.dropFiles}>
        <FileDropzone />
      </div>
    );
  }

  if (files.length) {
    render = (
      <div className={styles.convertFiles}>
        <FilesListWithDropzone
          files={files.filter((f: FileManager) => !f.edited)}
        />
        <RenameControlls />
        <FilesList files={files.filter((f: FileManager) => f.edited)} />
      </div>
    );
  }

  // if (movingStep > 0) {
  //   return (
  //     <main className={styles.renamer}>
  //       <MovingStepScreen
  //         movingStep={movingStep}
  //         failReason={moveErrorMessage}
  //       />
  //     </main>
  //   );
  // }

  return <div className={styles.renamer}>{render}</div>;
};

export default Rename;
