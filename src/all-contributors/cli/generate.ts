import { readFileSync, writeFileSync } from 'fs-extra'
import { dirname, join } from 'path'

import { fixHtmlBadges } from '../fixHtmlBadges'

const {
  configFile: { readConfig },
  markdown,
} = require('all-contributors-cli/dist/util/index.js')

const generate = require('all-contributors-cli/dist/generate')

export function generateContributorsListIntoMarkdown({ configPath }: { configPath: string }) {
  const config = readConfig(configPath)

  return Promise.all(
    config.files.map(async (file: string) => {
      const filePath = join(dirname(configPath), file)

      const fileContent = await markdown.read(filePath)
      const newFileContent = generate(config, config.contributors, fileContent)
      await markdown.write(filePath, newFileContent)

      // re-read whole file contents I am worried that markdown does something funny with the input and it's simply easier this way
      const fileContents = readFileSync(filePath, 'utf-8')
      const finalFileContents = fixHtmlBadges(config.contributors.length, fileContents)
      writeFileSync(filePath, finalFileContents)
    }),
  )
}
