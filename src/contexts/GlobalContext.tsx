import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { FileManager } from '../lib/FileManager';
import { MovingStep } from '../lib/tsDefinitions';

interface GlobalContextInterface {
  files: FileManager[];
  addFiles: (incomingFiles: File[]) => void;
  setRenameTemplate: Dispatch<SetStateAction<string>>;
  renameTemplate: string;
  convertFiles: () => void;
  clearFiles: () => void;
  initiateFileMove: () => Promise<void>;
  setFilesMoveStep: Dispatch<SetStateAction<MovingStep>>;
  filesMoveStep: MovingStep;
  setErrorWhileMoving: Dispatch<SetStateAction<string>>;
  errorWhileMoving: string;
  setFoundDisks: Dispatch<SetStateAction<string[]>>;
  foundDisks: string[];
  setSelectedDisk: Dispatch<SetStateAction<string>>;
  selectedDisk: string;
}

export const GlobalContext = createContext<GlobalContextInterface>({
  files: [],
  addFiles: (incomingFiles: File[]) => {},
  setRenameTemplate: () => {},
  convertFiles: () => {},
  clearFiles: () => {},
  initiateFileMove: async () => {},
  renameTemplate: '',
  setFilesMoveStep: () => {},
  filesMoveStep: MovingStep.none,
  setErrorWhileMoving: () => {},
  errorWhileMoving: '',
  setFoundDisks: () => {},
  foundDisks: [],
  setSelectedDisk: () => {},
  selectedDisk: '',
});

const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<FileManager[]>([]);

  const [renameTemplate, setRenameTemplate] = useState<string>('');
  const [errorWhileMoving, setErrorWhileMoving] = useState<string>('');
  const [filesMoveStep, setFilesMoveStep] = useState<MovingStep>(
    MovingStep.none
  );
  const [foundDisks, setFoundDisks] = useState<string[]>([]);
  const [selectedDisk, setSelectedDisk] = useState<string>('');

  console.log('files', files);
  console.log('renameTemplate', renameTemplate);

  const convertFiles = () => {
    setFiles((oldFiles: FileManager[]) => {
      const updatedFiles = oldFiles.map((file: FileManager) => {
        file.applyTemplate(renameTemplate);
        return file;
      }) as FileManager[];

      return updatedFiles;
    });
  };

  const initiateFileMove = async () => {
    for (let i = 0; i < files.length; i++) {
      await files[i].renameAndMove();
    }
  };

  const addFiles = (incomingFiles: File[]) => {
    setFiles((oldFiles: FileManager[]) => [
      ...oldFiles,
      ...incomingFiles.map((file: File) => new FileManager(file)),
    ]);
  };

  const clearFiles = () => {
    setFiles([]);
  };

  return (
    <GlobalContext.Provider
      value={{
        files,
        addFiles,
        convertFiles,
        setRenameTemplate,
        clearFiles,
        renameTemplate,
        initiateFileMove,
        filesMoveStep,
        setFilesMoveStep,
        errorWhileMoving,
        setErrorWhileMoving,
        foundDisks,
        setFoundDisks,
        selectedDisk,
        setSelectedDisk,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default GlobalContextProvider;
