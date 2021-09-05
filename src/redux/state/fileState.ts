import { FileManager } from '../../lib/FileManager';

export interface FileState {
  files: FileManager[];
  filesWithMissingData: FileManager[];
  fetchResults: unknown[];
  fetchingForFile: FileManager | null;
}

export const initState: FileState = {
  files: [],
  filesWithMissingData: [],
  fetchResults: [],
  fetchingForFile: null,
};
