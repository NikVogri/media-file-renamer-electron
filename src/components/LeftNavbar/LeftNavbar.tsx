import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './LeftNavbar.module.scss';

interface LeftNavbarProps {
  currentlyActive: string;
}

const LeftNavbar: React.FC<LeftNavbarProps> = ({ currentlyActive }) => {
  return (
    <nav className={styles.left_navbar}>
      <ul>
        <li className={currentlyActive === 'renamer' ? styles.active : ''}>
          <Link to="/">Rename</Link>
        </li>
        <li className={currentlyActive === 'settings' ? styles.active : ''}>
          <Link to="/settings">Settings</Link>
        </li>
        <li>Item 3</li>
      </ul>
    </nav>
  );
};

LeftNavbar.propTypes = {
  currentlyActive: PropTypes.string.isRequired,
};

export default LeftNavbar;
