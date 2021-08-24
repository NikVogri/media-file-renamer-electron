import React from 'react';
import LeftNavbar from '../LeftNavbar/LeftNavbar';

import styles from './Layout.module.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <main className={styles.layout}>
      <LeftNavbar />
      <div className={styles.layoutContent}>{children}</div>
    </main>
  );
};

export default Layout;
