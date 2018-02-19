# Toy Semaphore

A tiny implementation of semaphore that actually works, for learning.

## Usage

`git clone git@github.com:melyourhero/toy-semaphore.git`

```typescript
const semaphore = new Semaphore(2);

http.createServer(async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    const string = await semaphore.acquire((): Promise<string> =>
        new Promise((resolve) => setTimeout(() => resolve('Example string'), 5000)));

    res.end(string)
});
```

This example simply restrict permission to critical section for two user at time.
