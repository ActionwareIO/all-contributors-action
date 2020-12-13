import nock from 'nock'
import { basename, dirname, extname, join } from 'path'

/**
 * When used all external HTTP calls need to be mocked by nock
 */
export function nockTest(test: Function) {
  return async function (this: Mocha.Context) {
    const name = this.test!.fullTitle()
    const testFilePath = this.test!.file!

    const nockPath = getNockDirPath(testFilePath)

    nock.back.fixtures = nockPath
    nock.back.setMode('record')
    const { nockDone } = await nock.back(`${name}.json`)

    // Allow localhost connections but block everything else
    nock.disableNetConnect()
    nock.enableNetConnect((h) => {
      return ['localhost', '127.0.0.1'].includes(h.split(':')[0])
    })

    try {
      await test()
    } finally {
      // either way we update nocks
      nockDone()
      nock.restore()
    }
  }
}

function getNockDirPath(testFilePath: string): string {
  const testFileName = basename(testFilePath, extname(testFilePath))

  const fullNockDirPath = join(dirname(testFilePath), '__nocks__', testFileName)

  return fullNockDirPath
}
