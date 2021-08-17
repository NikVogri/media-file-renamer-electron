import React from 'react';

import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import MovingOverlay from '../../components/MovingOverlay/MovingOverlay';
import RenameControlls from '../../components/RenameControlls/RenameControlls';
import RenameItems from '../../components/RenameItems/RenameItems';
import RenameResult from '../../components/RenameResult/RenameResult';

import styles from './Rename.module.scss';

const Rename: React.FC = () => {
  return (
    <main className={styles.renamer}>
      <LeftNavbar currentlyActive="renamer" />
      <div className={styles.core}>
        <h1>Rename</h1>
        <div className={styles.flex}>
          <RenameItems />
          <RenameControlls />
          <RenameResult />
        </div>
      </div>
    </main>
  );
};

export default Rename;
