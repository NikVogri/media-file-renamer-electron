import React from 'react';
import SettingsExamples from '../../components/SettingsExamples/SettingsExamples';

import SettingsForm from '../../components/SettingsForm/SettingsForm';

import styles from './Settings.module.scss';

const Settings: React.FC = () => {
  return (
    <main className={styles.settings}>
      <div className={styles.core}>
        <h1>Settings</h1>
        <SettingsForm />

        <SettingsExamples />
      </div>
    </main>
  );
};

export default Settings;
