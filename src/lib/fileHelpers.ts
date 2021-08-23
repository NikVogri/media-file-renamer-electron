import { ALLOWED_FILE_TYPES } from '../config';

export const isSubtitle = (name: string): boolean => {
  return name.slice(-4) === '.srt';
};

export const isAllowedFileType = (fileType: string): boolean => {
  return ALLOWED_FILE_TYPES.includes(fileType);
};

export const isVideo = (fileType: string): boolean => {
  return fileType.slice(0, 5) === 'video';
};

export const isSupportedFile = (file: File) => {
  return isSubtitle(file.name) || isAllowedFileType(file.type);
};
