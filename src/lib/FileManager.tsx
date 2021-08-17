import fs from 'fs-extra';
import ptt from 'parse-torrent-title';
import { MAPPABLE_STRINGS } from '../config';
import { Path } from './Path';

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
    const { name, path } = file;

    this.name = name;
    this.newName = name;

    this.size = file.size;

    this.path = new Path(path);
    this.newPath = new Path(path);

    const filenameData = this.parseFileName(file.name);
    this.filenameData = filenameData;

    this.type = file.type;
  }

  public renameAndMove() {
    const oldPath = `${this.path.build()}${this.name}`;
    const newPath = `${this.newPath.build()}${this.newName}`;

    fs.renameSync(oldPath, newPath); // TODO: check implementation
  }

  public applyTemplate(template: string) {
    let filledTemplate = template;

    MAPPABLE_STRINGS.forEach((mappableStr: string) => {
      filledTemplate = this.applyValueToTemplate(mappableStr, filledTemplate);
    });

    this.edited = true;
    console.log(filledTemplate);
    this.newName = filledTemplate.split('/').pop() as string;
    this.newPath = new Path(filledTemplate);
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
