class PromisePoolExecutor {
  constructor({ maxConcurrency, minInterval }) {
    this.maxConcurrency = maxConcurrency;
    this.minInterval = minInterval;
    this.currentConcurrency = 0;
    this.queue = [];
  }

  async execute(process) {
    return new Promise((resolve, reject) => {
      const task = async () => {
        try {
          this.currentConcurrency++;
          const result = await process();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          setTimeout(() => {
            this.currentConcurrency--;
            this.next();
          }, this.minInterval)
        }
      };

      if (this.currentConcurrency < this.maxConcurrency) {
        task();
      } else {
        this.queue.push(task)
      }
    });
  }

  next() {
    if (this.queue.length > 0) {
      const task = this.queue.shift();
      task();
    }
  }
}

module.exports = PromisePoolExecutor
