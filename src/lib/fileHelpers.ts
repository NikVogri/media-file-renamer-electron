import { ALLOWED_FILE_TYPES, ILLEGAL_FILENAME_CHARS } from '../config';

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

export const removeIllegalChars = (str: string): string => {
  let output = str;

  for (const illegalChar of ILLEGAL_FILENAME_CHARS) {
    output = output.replaceAll(illegalChar, '');
  }

  return output;
};
