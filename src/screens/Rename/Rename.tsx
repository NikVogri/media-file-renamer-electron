import React from 'react';
import Dropdown from '../../components/Dropdown/Dropdown';

import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';
import RenameControlls from '../../components/RenameControlls/RenameControlls';
import RenameResult from '../../components/RenameResult/RenameResult';

import styles from './Rename.module.scss';

const Rename: React.FC = () => {
  return (
    <main className={styles.renamer}>
      <LeftNavbar currentlyActive="renamer" />
      <div className={styles.core}>
        <h1>Rename</h1>
        <div className={styles.flex}>
          <Dropdown />
          <RenameControlls />
          <RenameResult />
        </div>
      </div>
    </main>
  );
};

export default Rename;
