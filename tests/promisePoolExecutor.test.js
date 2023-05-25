const PromisePoolExecutor = require('../utils/promisePoolExecutor')

describe('PromisePoolExecutor', () => {
  test('正しい並行性と間隔でプロミスを実行する', async () => {
    const minInterval = 100
    const poolExecutor = new PromisePoolExecutor({ maxConcurrency: 3, minInterval })

    // 同時呼び出しの数を追跡する配列
    const concurrencyTracker = []

    // プロミスを返すテスト用の関数
    const process = jest.fn().mockImplementation(() => {
      return new Promise(resolve => setTimeout(() => {
        concurrencyTracker.push(--poolExecutor.currentConcurrency)
        resolve()
      }, 100))
    })

    // 5つのプロセスを開始
    const processesNum = 5
    for (let i = 0; i < processesNum; i++) {
      poolExecutor.execute(process)
      concurrencyTracker.push(poolExecutor.currentConcurrency)
    }

    // すべてのプロセスが完了するまで待つ
    while (poolExecutor.currentConcurrency > 0 || poolExecutor.queue.length > 0) {
      await new Promise(resolve => setTimeout(resolve, minInterval))
    }

    // process関数が5回呼び出されたことを確認
    expect(process).toHaveBeenCalledTimes(processesNum)

    // 最大同時実行数を超えていないことを確認
    const maxConcurrency = Math.max(...concurrencyTracker)
    expect(maxConcurrency).toBeLessThanOrEqual(poolExecutor.maxConcurrency)
  })
})
