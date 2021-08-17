import path from 'path';

export const pathDelimiter = (stringPath: string): string =>
  stringPath.replaceAll('/', path.delimiter);
