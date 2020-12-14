import { existsSync } from 'fs'
import { join } from 'path'
import { assert } from 'ts-essentials'

const filename = '.all-contributorsrc'

const paths = ['.', '.github']

export function findConfig(cwd: string): string | undefined {
  const absolutePaths = paths.map((p) => join(cwd, p, filename))

  const existingConfigs = absolutePaths.filter((p) => existsSync(p))
  assert(existingConfigs.length <= 1, `Found more than one config Oo. Paths: ${JSON.stringify(existingConfigs)}`)

  return existingConfigs[0]
}
