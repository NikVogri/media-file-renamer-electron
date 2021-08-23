export enum MovingStep {
  none,
  loading,
  success,
  fail,
}

export interface MovingFile {
  name: string;
  place: number;
}
