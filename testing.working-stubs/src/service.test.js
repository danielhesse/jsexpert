const Service = require('./service')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'

const mocks = {
  tatooine: require('../mocks/tatooine.json'),
  alderaan: require('../mocks/alderaan.json'),
};

(async () => {
  // {
  //   // This go to interet!
  //   const service = new Service()
  //   const withoutStub = await service.makeRequest(BASE_URL_2)
  //   console.log(JSON.stringify(withoutStub))
  // }

  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub
    .withArgs(BASE_URL_1)
    .resolves(mocks.tatooine)

  stub
    .withArgs(BASE_URL_2)
    .resolves(mocks.alderaan)

  { /** Context/Expression 1 */
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5
    }

    const results = await service.getPlanets(BASE_URL_1)
    deepStrictEqual(results, expected)
  }

  { /** Context/Expression 2 */
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2
    }

    const results = await service.getPlanets(BASE_URL_2)
    deepStrictEqual(results, expected)
  }
})()

// To get the log of an execution and create a file to save the log result
// node src/service.test.js > mocks/tatooine.json
