export interface SettingsState {
  template: string;
  foundDrives: string[];
  selectedDrive: string | null;
}

const initState: SettingsState = {
  template: 'movies/{title}/{title} - {year}',
  foundDrives: [],
  selectedDrive: 'G:',
};

export default initState;
