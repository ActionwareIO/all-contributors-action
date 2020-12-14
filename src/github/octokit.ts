import { context, getOctokit as nativeGetOctokit } from '@actions/github'
import { assert } from 'ts-essentials'

export type Octokit = ReturnType<typeof nativeGetOctokit>
export type GithubContext = typeof context

export function getOctokit(): Octokit {
  const ghToken = process.env.INPUT_GITHUB_TOKEN
  assert(ghToken, 'GITHUB_TOKEN not found. Did you forgot to pass it as env?')

  return nativeGetOctokit(ghToken)
}
