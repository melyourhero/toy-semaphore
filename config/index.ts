export const getConfig = () => ({
  logger: {
    appenders: {
      console: {
        type: 'stdout',
        layout: {
          type: 'coloured',
        },
      },
    },
    categories: {
      default: {
        appenders: ['console'],
        level: 'info',
      },
      semaphore: {
        appenders: ['console'],
        level: 'all',
      },
    },
  },
});