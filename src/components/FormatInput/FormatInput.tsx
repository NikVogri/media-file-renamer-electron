import React from 'react';

import styles from './FormatInput.module.scss';

interface FormatInputProps {
  label: string;
  foundDrives: string[];
  setSelectedDisk: (selectedDisk: string) => void;
  setPathTemplate: (template: string) => void;
  template: string;
  selectedDrive: string;
}

const FormatInput: React.FC<FormatInputProps> = ({
  label,
  foundDrives,
  setPathTemplate,
  setSelectedDisk,
  template,
  selectedDrive,
}) => {
  return (
    <div className={styles.formatInput}>
      <span className={styles.label}>{label}</span>
      {foundDrives.length > 0 && (
        <select
          name="disk"
          className={styles.diskSelect}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSelectedDisk(e.target.value)
          }
          defaultValue={selectedDrive}
        >
          {foundDrives.map((drive: string) => (
            <option value={drive} key={drive}>
              {drive}
            </option>
          ))}
        </select>
      )}
      <input
        type="text"
        className={styles.pathInput}
        value={template}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPathTemplate(e.target.value)
        }
      />
    </div>
  );
};

export default FormatInput;
