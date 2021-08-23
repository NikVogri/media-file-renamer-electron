const B_TO_M_DEVIDER = 1e6;
const M_TO_G_DEVIDER = 1000;

const byteToMb = (bytes: number): number =>
  Number((bytes / B_TO_M_DEVIDER).toFixed(2));

const mbToGb = (megabytes: number): number =>
  Number((megabytes / M_TO_G_DEVIDER).toFixed(2));

export const convertBytesToHigherUnit = (size: number) => {
  const sizeInMb = byteToMb(size);

  if (sizeInMb < M_TO_G_DEVIDER) {
    return `${sizeInMb} Mb`;
  }

  const sizeInGb = mbToGb(sizeInMb);
  return `${sizeInGb} Gb`;
};
