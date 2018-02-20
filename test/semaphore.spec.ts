import { Expect, AsyncTest, TestFixture } from 'alsatian';

import Semaphore from './../lib';

const delay = (milliseconds: number): Promise<void> =>
    new Promise<void>((res) => setTimeout(res, milliseconds));

@TestFixture("Semaphore implementation")
export class SemaphoreUtil {

    @AsyncTest('limits concurrency and auto release critical sections')
    public async cocurrency() {
        const semaphore = new Semaphore(2);
        let running = 0;
        let runnable = 0;
        let task = async () => {
            Expect(running <= 1).toBe(true);
            running++;

            await delay(20);

            Expect(running <= 2).toBe(true);

            running--;
            runnable++;
        };
        await Promise.all([1, 2, 3].map(() => semaphore.acquire(task)));

        Expect(runnable).toBe(3);
    }
}