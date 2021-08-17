import path from 'path';

export class Path {
  private disk: string;

  private directories: string[];

  constructor(fullPath: string) {
    const [disk, ...directories] = fullPath.replaceAll('\\', '/').split('/'); // TODO: check if this works on linux & macos
    directories.pop(); // remove actual filename

    this.disk = disk;
    this.directories = directories;
  }

  public build() {
    return path.join(this.disk, ...this.directories);
  }
}
