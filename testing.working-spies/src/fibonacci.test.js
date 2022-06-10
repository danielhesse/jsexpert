const Fibonacci = require('./fibonacci')
const sinon = require('sinon')
const assert = require('assert')

  // Fibonacci: Fibonacci Sequence
  ;
(async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)

    /**
     * Generators return iterators, (.next)
     * There are 3 ways to read the data
     * Using the functions .next, for await and rest/spread
     */
    for await (const i of fibonacci.execute(3)) { }

    // The algorithm starts from zero
    const expectedCallCount = 4
    assert.deepStrictEqual(spy.callCount, expectedCallCount)
  }

  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(fibonacci, fibonacci.execute.name)
    const [...results] = fibonacci.execute(5)

    /**
     * First call  | [0] input = 5, current = 0, next = 1
     * Second call | [1] input = 4, current = 1, next = 1
     * Third call  | [2] input = 3, current = 1, next = 2
     * Fourth call | [3] input = 2, current = 2, next = 3
     * Fifth call  | [4] input = 1, current = 3, next = 5
     * Sixth call  | [5] input = 0 -> STOP!
     */

    const { args } = spy.getCall(2)
    const expectedResult = [0, 1, 1, 2, 3]
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2
    })

    assert.deepStrictEqual(args, expectedParams)
    assert.deepStrictEqual(results, expectedResult)
  }
})()
