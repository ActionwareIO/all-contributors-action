import { join } from 'path'

const {
  configFile: { readConfig },
  markdown,
} = require('all-contributors-cli/dist/util/index.js')

const generate = require('all-contributors-cli/dist/generate')

export function generateContributorsListIntoMarkdown({ configPath, cwd }: { configPath: string; cwd: string }) {
  const config = readConfig(configPath)

  return Promise.all(
    config.files.map(async (file: string) => {
      var filePath = join(cwd, file)

      const fileContent = await markdown.read(filePath)
      const newFileContent = generate(config, config.contributors, fileContent)
      return markdown.write(filePath, newFileContent)
    }),
  )
}
