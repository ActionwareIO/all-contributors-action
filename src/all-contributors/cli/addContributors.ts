import { ParsedContribution } from '../Contribution'

const addUser = require('all-contributors-cli/dist/contributors/add.js')
const { getUserInfo } = require('all-contributors-cli/dist/repo')
const {
  configFile: { writeContributors, readConfig },
} = require('all-contributors-cli/dist/util/index.js')

export async function addContributions(configFilePath: string, contributions: ParsedContribution[]): Promise<void> {
  const ctx = readConfig(configFilePath)

  // adds contributors to ctx
  for (const c of contributions) {
    ctx.contributors = await addUser(ctx, c.who, c.forWhat, getUserInfo)
  }
  await writeContributors(configFilePath, ctx.contributors)
}
