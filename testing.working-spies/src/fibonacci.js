// Recursive algorithm - Fibonacci Sequence
class Fibonacci {

  // *execute = JavaScript Generator
  *execute(input, current = 0, next = 1) {
    // console.count('execute!')

    if (input === 0) {
      return 0
    }

    /**
     * yield é exclusivo dos Generators
     * É usado para retornar um valor, porém como se estivessemos retornando os
     * valores sob demanda - conforme precisar.
     */
    yield current

    /** De a forma abaixo e delega uma execução ao invés de retornar o valor. */
    yield* this.execute(input - 1, next, current + next)
  }
}

module.exports = Fibonacci
