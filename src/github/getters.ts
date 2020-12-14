import { GithubContext } from './octokit'

export function getCommentBody(ctx: GithubContext): string | undefined {
  const body = ctx.payload.comment?.body

  return body
}

export function getCommentId(ctx: GithubContext): number | undefined {
  const id = ctx.payload.comment?.id

  return id
}
