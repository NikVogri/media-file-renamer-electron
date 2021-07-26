import React from 'react';

import styles from './RenameControlls.module.scss';

import ArrowRight from '../../../assets/icons/arrow_right.svg';
import Settings from '../../../assets/icons/settings_icon.svg';

interface RenameControllsProps {}

const RenameControlls: React.FC<RenameControllsProps> = ({}) => {
  return (
    <div className={styles.rename_controlls}>
      <img src={ArrowRight} alt="Start converting" />
      <img src={Settings} alt="Show settings" />
    </div>
  );
};

export default RenameControlls;
