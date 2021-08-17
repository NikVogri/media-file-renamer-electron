import { ALLOWED_FILE_TYPES } from '../config';

export class FileType {
  private static isSubtitle(name: string): boolean {
    return name.slice(-4) === '.srt';
  }

  private static isAllowedFileType(fileType: string): boolean {
    return ALLOWED_FILE_TYPES.includes(fileType);
  }

  static isVideo(fileType: string): boolean {
    return fileType.slice(0, 5) === 'video';
  }

  static isValid(file: File) {
    return (
      FileType.isSubtitle(file.name) || FileType.isAllowedFileType(file.type)
    );
  }
}
