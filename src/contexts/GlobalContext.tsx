import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { FileManager } from '../lib/FileManager';

interface GlobalContextInterface {
  files: FileManager[];
  addFiles: (incomingFiles: File[]) => void;
  setRenameTemplate: Dispatch<SetStateAction<string>>;
  renameTemplate: string;
  convertFiles: () => void;
  clearFiles: () => void;
}

export const GlobalContext = createContext<GlobalContextInterface>({
  files: [],
  addFiles: (incomingFiles: File[]) => {},
  setRenameTemplate: () => {},
  convertFiles: () => {},
  clearFiles: () => {},
  renameTemplate: '',
});

const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [files, setFiles] = useState<FileManager[]>([]);

  const [renameTemplate, setRenameTemplate] = useState<string>('');

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
