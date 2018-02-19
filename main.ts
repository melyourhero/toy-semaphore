import http, { IncomingMessage, ServerResponse} from 'http';

import Semaphore from './lib';

const semaphore = new Semaphore(2);

const DELAY = 5000;

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const string = await semaphore.acquire((): Promise<string> =>
        new Promise((resolve) => setTimeout(() => resolve('Example string'), DELAY)));

    res.end(string)
});

server.listen(8000);

process.on('SIGINT', (): void => {
  console.log('Gracefully shutting down from SIGINT (Ctrl-C)');

  server.close((): void => {
    console.log('We closed!');

    process.exit();
  });
});
