import { GithubContext, Octokit } from './octokit'

const ALL_POSSIBLE_PERMISSIONS = ['none', 'read', 'write', 'admin'] as const
type AllPossiblePermissionsType = typeof ALL_POSSIBLE_PERMISSIONS[number]

export async function checkPermissions(
  octokit: Octokit,
  ctx: GithubContext,
  username: string,
): Promise<AllPossiblePermissionsType> {
  const response = await octokit.repos.getCollaboratorPermissionLevel({
    ...ctx.repo,
    username,
  })

  return response.data.permission as any // @todo replace with explicit validation like with zod
}
