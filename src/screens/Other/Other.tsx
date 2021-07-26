import React from 'react';

import LeftNavbar from '../../components/LeftNavbar/LeftNavbar';

import styles from './Other.module.scss';

const Other: React.FC = () => {
  return (
    <main className={styles.other}>
      <LeftNavbar currentlyActive="other" />
      <h1>other page</h1>
    </main>
  );
};

export default Other;
