import React, { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Icon } from '../../lib/tsDefinitions';

import styles from './LeftNavbar.module.scss';

import LeftNavIcon from '../LeftNavIcon/LeftNavIcon';

const LeftNavbar: React.FC<LeftNavbarProps> = () => {
  const [show, setShow] = useState(false);

  const { pathname } = useLocation();

  console.log(pathname);

  const handleHover = () => {
    setShow(true);
  };

  const handleLeave = () => {
    setShow(false);
  };

  return (
    <nav
      className={`${styles.left_navbar} ${show ? styles.show : ''}`}
      onMouseOver={handleHover}
      onMouseLeave={handleLeave}
      onFocus={handleHover}
    >
      <h1>Re-namer</h1>
      <ul>
        <li className={pathname === '/' ? styles.active : ''}>
          <Link to="/">
            <LeftNavIcon active={pathname === '/'} icon={Icon.rename} />
            Rename
          </Link>
        </li>
        <li className={pathname === '/settings' ? styles.active : ''}>
          <Link to="/settings">
            <LeftNavIcon
              active={pathname === '/settings'}
              icon={Icon.settings}
            />
            Settings
          </Link>
        </li>
      </ul>

      <div className={styles.disclaimer}>
        <p>Version: 0.0.2</p>
      </div>
    </nav>
  );
};

export default LeftNavbar;
