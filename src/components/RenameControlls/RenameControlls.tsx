import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FileManager } from '../../lib/FileManager';
import {
  applyTemplateToFiles,
  renameAndMoveFiles,
} from '../../redux/actions/fileActionsCreator';

import styles from './RenameControlls.module.scss';

import ArrowRight from '../../../assets/icons/arrow_right.svg';
import SettingsIcon from '../../../assets/icons/settings_icon.svg';
import Clear from '../../../assets/icons/clear.svg';
import Check from '../../../assets/icons/check.svg';

import * as types from '../../constants/actionTypes';
import { RootState } from '../../redux/store';

const RenameControlls: React.FC = () => {
  const dispatch = useDispatch();
  const files = useSelector(
    (state: RootState) => state.file.files as FileManager[]
  );

  const applyRenameTemplate = () => dispatch(applyTemplateToFiles());
  const handleRenameAndMoveFiles = async () => dispatch(renameAndMoveFiles());
  const handleClearItems = () => dispatch({ type: types.CLEAR_FILES });

  const allFilesWereEdited = files.length > 0 && files.every((f) => f.edited);

  return (
    <>
      <div className={styles.rename_controlls}>
        {!allFilesWereEdited ? (
          <img
            src={ArrowRight}
            alt="Start converting"
            title="Preview"
            onClick={applyRenameTemplate}
          />
        ) : (
          <img
            src={Check}
            alt="Confirm"
            title="Confirm"
            onClick={handleRenameAndMoveFiles}
          />
        )}
        <Link to="/settings">
          <img src={SettingsIcon} alt="Show settings" title="Configure" />
        </Link>
        {files.length > 0 && (
          <img
            src={Clear}
            alt="Clear"
            title="Clear"
            onClick={handleClearItems}
          />
        )}
      </div>
    </>
  );
};

export default RenameControlls;
