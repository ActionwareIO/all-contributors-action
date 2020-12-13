import { Exec } from '../types'

export async function pushAllChangesToGit(exec: Exec) {
  await exec('git config --global user.email github-actions[bot]@users.noreply.github.com')
  await exec('git config --global user.name github-actions[bot]')
  await exec('git checkout master')

  await exec('git add -A')
  await exec('git commit -m "Add @all-contributors contribution"')

  await exec(
    `git remote add origin-authed https://${process.env.GITHUB_ACTOR}:${process.env.INPUT_GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`,
  )
  await exec('git push origin-authed')
}
