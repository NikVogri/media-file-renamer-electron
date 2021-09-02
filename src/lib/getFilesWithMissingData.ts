import { FileManager } from './FileManager';

export const getFilesWithMissingData = (files: FileManager[]): FileManager[] =>
  files.filter((f: FileManager) => f.missingData.length > 0);
