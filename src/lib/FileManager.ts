import fs from 'fs-extra';
import path from 'path';
import ptt from 'parse-torrent-title';
import { Path } from './Path';

import { MAPPABLE_STRINGS } from '../config';

export class FileManager {
  public name: string;

  public newName: string;

  public type: string;

  public path: Path;

  public newPath: Path;

  private filenameData: any;

  public edited = false;

  public size: number;

  constructor(file: File) {
    const { name, path: filePath } = file;

    this.name = name;
    this.newName = name;

    this.size = file.size;

    this.path = new Path(filePath);
    this.newPath = new Path(filePath);

    const filenameData = this.parseFileName(file.name);
    this.filenameData = filenameData;

    this.type = file.type;
  }

  public async renameAndMove() {
    const oldPath = `${this.path.build()}${path.sep}${this.name}`;
    const newPath = `${this.newPath.build()}${path.sep}${this.newName}`;

    console.log(oldPath);
    console.log(newPath);

    await fs.move(oldPath, newPath);
    // await fs.remove(oldPath);
    // await fs.rename(oldPath, newPath); // TODO: check implementation
  }

  public applyTemplate(template: string) {
    let filledTemplate = template;

    MAPPABLE_STRINGS.forEach((ms: string) => {
      filledTemplate = this.applyValueToTemplate(ms, filledTemplate);
    });

    const originalExtension = this.name.split('.').pop() as string;
    const newFilenameWithoutExtension = filledTemplate
      .split('/')
      .pop() as string;

    this.newName = `${newFilenameWithoutExtension}.${originalExtension}`;
    this.newPath = new Path(filledTemplate);
    this.edited = true;
  }

  private parseFileName = (name: string) => {
    return ptt.parse(name);
  };

  private applyValueToTemplate(mappableStr: string, template: string): string {
    if (!template.includes(mappableStr)) return template;
    const key = mappableStr.replace('{', '').replace('}', '');

    return template.replaceAll(mappableStr, this.filenameData[key]);
  }
}