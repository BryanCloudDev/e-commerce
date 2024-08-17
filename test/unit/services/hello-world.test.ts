import { HelloWorldService } from '../../../src/services'

describe('Hello World', () => {
  let helloWorldService: HelloWorldService

  beforeAll(() => {
    helloWorldService = new HelloWorldService()
  })

  it('should test `hello world`', () => {
    const actual = helloWorldService.helloWorld()

    expect(actual).toBe('Hi there!')
  })
})
