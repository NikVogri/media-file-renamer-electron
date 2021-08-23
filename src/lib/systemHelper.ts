import child from 'child_process';

export const getConnectedDrives = (): Promise<string[]> =>
  new Promise((resolve, reject) => {
    child.exec('wmic logicaldisk get name', (error, stdout) => {
      if (error) {
        reject(error);
      }

      const connectedDisks = stdout
        .split('\r\r\n')
        .filter((value) => /[A-Za-z]:/.test(value))
        .map((value) => value.trim());

      resolve(connectedDisks);
    });
  });
