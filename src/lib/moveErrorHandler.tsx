export const fileMoveErrorReadableMessageExtractor = (err: Error): string => {
  switch (true) {
    case err.message.includes('ENOSPC'):
      return 'Not enough space left on destination - ENOSPC';

    case err.message.includes('EBUSY'):
      return 'Resource is used by another process or locked - EBUSY';

    default:
      return 'Unknown error - check the logs for more information';
  }
};
