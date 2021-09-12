import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import RenameControlls from '../../components/RenameControlls/RenameControlls';

import styles from './Rename.module.scss';
import { FileManager } from '../../lib/FileManager';
import FilesList from '../../components/FilesList/FilesList';
import FileDropzone from '../../components/FileDropzone/FileDropzone';
import MiniDropzone from '../../components/MiniDropzone/MiniDropzone';
import { MovingStep } from '../../lib/tsDefinitions';

const Rename: React.FC = () => {
  const files = useSelector((state: RootState) => state.file.files);
  const step = useSelector((state: RootState) => state.ui.movingStep);

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
      <div className={styles.convert}>
        <div className={styles.configRename}>
          <FilesList files={files.filter((f: FileManager) => !f.edited)} />
          <RenameControlls />
          <FilesList files={files.filter((f: FileManager) => f.edited)} />
        </div>

        <MiniDropzone disabled={step === MovingStep.loading} />
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
