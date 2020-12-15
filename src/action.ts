import { assert } from 'ts-essentials'

import { addContributions } from './all-contributors/cli/addContributors'
import { findConfig } from './all-contributors/cli/findConfig'
import { generateContributorsListIntoMarkdown } from './all-contributors/cli/generate'
import { parseComment } from './all-contributors/parseComment'
import { pushAllChangesToGit } from './git/pushAllChangesToGit'
import { addOkayReaction } from './github/addOkayReaction'
import { checkPermissions } from './github/checkPermissions'
import { getCommentBody, getCommentId } from './github/getters'
import { GithubContext, Octokit } from './github/octokit'
import { Exec } from './types'

interface ActionCtx {
  ctx: GithubContext
  octokit: Octokit
  cwd: string
  exec: Exec
}

export async function action({ cwd, ctx, octokit, exec }: ActionCtx) {
  const comment = getCommentBody(ctx)
  if (!comment) {
    throw new Error("Comment body couldn't be found. Did you setup action to run on `issue_comment` event?")
  }

  const actorPermissions = await checkPermissions(octokit, ctx, ctx.actor)
  if (actorPermissions !== 'write' && actorPermissions !== 'admin') {
    throw new Error(`${ctx.actor} doesn't have access to run this action`)
  }

  const configPath = findConfig(cwd)
  if (!configPath) {
    throw new Error("Can't find all contributors config file!")
  }

  const contributions = parseComment(comment)
  console.log(`Adding ${contributions.length} new contributions`)
  await addContributions(configPath, contributions)
  await generateContributorsListIntoMarkdown({ configPath })

  await pushAllChangesToGit(exec)

  const commentId = getCommentId(ctx)
  assert(
    commentId !== undefined,
    "Comment body couldn't be found. Did you setup action to run on `issue_comment` event?",
  )
  await addOkayReaction(octokit, ctx, commentId)
}
