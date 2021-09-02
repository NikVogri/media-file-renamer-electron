import fs from 'fs-extra';
import path from 'path';
import ptt from 'parse-torrent-title';
import { v4 as uuid } from 'uuid';
import { Path } from './Path';

import { MAPPABLE_STRINGS } from '../config';
import { ContentType, FileData } from './tsDefinitions';

export class FileManager {
  public id: string;

  public name: string;

  public newName: string;

  public type: string;

  public path: Path;

  public newPath: Path;

  public data: FileData;

  public edited = false;

  public size: number;

  public contentType: ContentType;

  public missingData: string[] = [];

  constructor(file: File) {
    const { name, path: filePath } = file;

    this.name = name;
    this.newName = name;

    this.size = file.size;

    this.path = new Path(filePath);
    this.newPath = new Path(filePath);

    const data = this.parseFileName(file.name) as FileData;
    this.data = data;

    this.type = file.type;

    this.contentType = this.determiteContentType(data);

    this.id = uuid();
  }

  public async renameAndMove() {
    const oldPath = `${this.path.build()}${path.sep}${this.name}`;
    const newPath = `${this.newPath.build()}${path.sep}${this.newName}`;

    await fs.move(oldPath, newPath);
  }

  public applyTemplate(template: string) {
    let filledTemplate = template as string | null;
    this.missingData = [];

    for (let i = 0; i < MAPPABLE_STRINGS.length; i++) {
      const ms = MAPPABLE_STRINGS[i];
      filledTemplate = this.applyValueToTemplate(ms, filledTemplate as string);

      if (!filledTemplate) break; // this happens when some of the requested data is missing
    }

    if (filledTemplate) {
      const originalExtension = this.name.split('.').pop() as string;
      const newFilenameWithoutExtension = filledTemplate
        .split('/')
        .pop() as string;
      this.newName = `${newFilenameWithoutExtension}.${originalExtension}`;
      this.newPath = new Path(filledTemplate);
      this.edited = true;
    }
  }

  private parseFileName = (name: string) => {
    return ptt.parse(name);
  };

  private determiteContentType = (data: FileData) => {
    return data.season || data.episode ? ContentType.tv : ContentType.movie;
  };

  private applyValueToTemplate(
    mappableStr: string,
    template: string
  ): string | null {
    if (!template.includes(mappableStr)) return template;
    const key = mappableStr.replace('{', '').replace('}', '') as keyof FileData;

    if (!this.data[key]) {
      this.missingData.push(key);
      return null;
    }

    return template.replaceAll(mappableStr, this.data[key] as any);
  }
}
