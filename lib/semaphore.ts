import log4js from 'log4js';

import { getConfig } from '../config';

const config = getConfig();
log4js.configure(config.logger);
const logger = log4js.getLogger('semaphore');

class Semaphore {
    private permits: number;
    private counter: number;
    private queue: Array<Function>;

    constructor(permits: number = 1) {
        this.permits = permits;
        this.counter = 0;
        this.queue = [];
    }

    private processQueue(): void {
        if (this.counter < 0) {
            logger.error('Counter is less that zero');
            throw new Error('Release method called too many times');
        }

        this.counter--;

        if (this.queue.length === 0) {
            logger.debug('Queue is empty');
            return;
        }

        const nextFunc = this.queue.shift();

        if (nextFunc) {
            this.counter++;
            setImmediate(nextFunc);
        }
    }

    private release (): Promise<() => void> {
        return new Promise<() => void>((resolve) => {
            const nextFunc = () => resolve(this.processQueue.bind(this));

            if (this.counter < this.permits) {
                this.counter++;
                setImmediate(nextFunc);
            } else {
                this.queue.push(nextFunc);
            }
        });
    }

    public async acquire <T> (fn: () => Promise<T>) {
        const release = await this.release();

        try {
            const result = await fn();
            release();
            return result;
        } catch (error) {
            logger.error(`Error found during release method call ${error}`);
            release();
            throw error;
        }
    }
}

export default Semaphore;