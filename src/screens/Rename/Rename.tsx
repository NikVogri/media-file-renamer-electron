import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import MovingOverlay from '../../components/MovingOverlay/MovingOverlay';
import RenameControlls from '../../components/RenameControlls/RenameControlls';
import SelectedFilesList from '../../components/SelectedFilesList/SelectedFilesList';
import RenamedFilesExample from '../../components/RenamedFilesExample/RenamedFilesExample';

import styles from './Rename.module.scss';

const Rename: React.FC = () => {
  const movingStep = useSelector((state: RootState) => state.file.movingStep);
  const moveErrorMessage = useSelector(
    (state: RootState) => state.file.moveErrorMessage
  );

  if (movingStep > 0) {
    return (
      <main className={styles.renamer}>
        <MovingOverlay movingStep={movingStep} failReason={moveErrorMessage} />
      </main>
    );
  }

  return (
    <main className={styles.renamer}>
      <LeftNavbar currentlyActive="renamer" />
      <div className={styles.core}>
        <h1>Rename</h1>
        <div className={styles.flex}>
          <SelectedFilesList />
          <RenameControlls />
          <RenamedFilesExample />
        </div>
      </div>
    </main>
  );
};

export default Rename;
