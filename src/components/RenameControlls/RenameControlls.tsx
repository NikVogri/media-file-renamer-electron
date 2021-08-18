import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './RenameControlls.module.scss';

import ArrowRight from '../../../assets/icons/arrow_right.svg';
import SettingsIcon from '../../../assets/icons/settings_icon.svg';
import Clear from '../../../assets/icons/clear.svg';
import Check from '../../../assets/icons/check.svg';

import { GlobalContext } from '../../contexts/GlobalContext';
import { FileManager } from '../../lib/FileManager';
import { MovingStep } from '../../lib/tsDefinitions';
import { fileMoveErrorReadableMessageExtractor } from '../../lib/moveErrorHandler';

const RenameControlls: React.FC = () => {
  const {
    convertFiles,
    files,
    clearFiles,
    initiateFileMove,
    setErrorWhileMoving,
    setFilesMoveStep,
  } = useContext(GlobalContext);

  const handleRename = () => convertFiles();
  const handleClearItems = () => clearFiles();
  const handleMove = async () => {
    try {
      setFilesMoveStep(MovingStep.loading);
      await initiateFileMove();
      setFilesMoveStep(MovingStep.success);
    } catch (err) {
      setFilesMoveStep(MovingStep.fail);
      setErrorWhileMoving(fileMoveErrorReadableMessageExtractor(err));
      console.log(err);
    }
  };

  const filesWereEdited = files.every((file: FileManager) => file.edited);

  return (
    <>
      <div className={styles.rename_controlls}>
        {!filesWereEdited ? (
          <img
            src={ArrowRight}
            alt="Start converting"
            title="Preview"
            onClick={handleRename}
          />
        ) : (
          <img src={Check} alt="Confirm" title="Confirm" onClick={handleMove} />
        )}
        <Link to="/settings">
          <img
            src={SettingsIcon}
            alt="Show settings"
            title="Configure translation settings"
          />
        </Link>
        {files.length > 0 && (
          <img src={Clear} alt="Clear items" onClick={handleClearItems} />
        )}
      </div>
    </>
  );
};

export default RenameControlls;
