import { MovingFile, MovingStep } from '../../lib/tsDefinitions';

export interface UIState {
  showContentListPrompt: boolean;
  movingStep: MovingStep;
  moveErrorMessage: null | string;
  currentlyMovingFile: null | MovingFile;
}

const initState: UIState = {
  showContentListPrompt: false,
  movingStep: MovingStep.none,
  moveErrorMessage: null,
  currentlyMovingFile: null,
};

export default initState;
