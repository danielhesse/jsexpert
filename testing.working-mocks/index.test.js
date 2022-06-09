const { error } = require('./src/constants')
const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert');

(async () => {
  { /** Context/Expression 1 */
    const filePath = './mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)

    await rejects(result, rejection)
  }
  { /** Context/Expression 2 */
    const filePath = './mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)

    await rejects(result, rejection)
  }
  { /** Context/Expression 3 */
    const filePath = './mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "id": 123,
        "name": "Daniel Hessel",
        "profession": "Backend Node.js Developer",
        "birthDay": 2001
      },
      {
        "id": 321,
        "name": "Xuxa da Silva",
        "profession": "Javascript Specialist",
        "birthDay": 1942
      },
      {
        "id": 231,
        "name": "Erick Wendel",
        "profession": "Javascript Instructor",
        "birthDay": 1997
      }
    ]

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()
