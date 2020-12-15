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
    // adding already existing contribution trigger some weird bug so we avoid doing so
    const alreadyExistingUser = ctx.contributors.find((u: any) => u.login === c.who)
    const allContributions = alreadyExistingUser
      ? c.forWhat.filter((c) => !alreadyExistingUser.contributions.includes(c))
      : c.forWhat

    ctx.contributors = await addUser(ctx, c.who, allContributions, getUserInfo)
  }
  await writeContributors(configFilePath, ctx.contributors)
}
