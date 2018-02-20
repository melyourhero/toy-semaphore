# Toy Semaphore

A tiny implementation of semaphore that actually works, for learning.

## Usage

`git clone git@github.com:melyourhero/toy-semaphore.git`

`cd toy-semaphore`

`npm i`

`npm start`

Then try to connect to server, using several curl connections

This example simply restrict permission to critical section for two user at time.
```typescript
const semaphore = new Semaphore(2);

http.createServer(async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const string = await semaphore.acquire((): Promise<string> =>
        new Promise((resolve) => setTimeout(() => resolve('Example string'), 5000)));

    res.end(string)
});
```

For testing:

`npm run test`

