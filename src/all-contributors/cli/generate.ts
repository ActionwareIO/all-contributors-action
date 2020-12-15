import { dirname, join } from 'path'

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
      return markdown.write(filePath, newFileContent)
    }),
  )
}
