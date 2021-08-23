export const extractReadableErrorMessage = (err: Error): string => {
  switch (true) {
    case err.message.includes('ENOSPC'):
      return 'Not enough space left on destination - ENOSPC';

    case err.message.includes('EBUSY'):
      return 'Resource is used by another process or locked - EBUSY';

    case err.message.includes('dest already exists'):
      return 'Destination already exists';

    default:
      console.log(err);
      return 'Unknown error - check the logs for more information';
  }
};
