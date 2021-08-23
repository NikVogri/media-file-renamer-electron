import { FileManager } from '../../lib/FileManager';
import { MovingFile, MovingStep } from '../../lib/tsDefinitions';

export interface FileState {
  files: FileManager[];
  movingStep: MovingStep;
  moveErrorMessage: null | string;
  currentlyMovingFile: null | MovingFile;
}

export const initState: FileState = {
  files: [],
  movingStep: MovingStep.none,
  moveErrorMessage: null,
  currentlyMovingFile: null,
};
