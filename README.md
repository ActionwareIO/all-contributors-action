<div>
  <h2 align="center">⚠️ ⚠️ ⚠️ No Longer Maintained ⚠️ ⚠️ ⚠️</h3>
  <p align="center"><b>Please note:</b> This repository is currently unmaintained. The repository is here and you can use it as an example, or in Actions. However please be aware that 
we are not going to be updating issues or pull requests on this repository. Please feel free to fork this repository and maintain it yourself.</p>

  <p align="center">To reflect this state we’ve marked this repository as Archived.</p>
  </p>
</div>
<hr/>

<p align="center">
  <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/busts-in-silhouette_1f465.png" width="120" alt="@all-contributors action">
  <h3 align="center">All contributors action</h3>
  <p align="center">GitHub Action reacting on comments and pushing new <a href="https://allcontributors.org/">@all-contributors</a> contributors directly to the repo</p>
  <p align="center">
    <img alt="Build status" src="https://github.com/actionwareio/all-contributors-action/workflows/CI/badge.svg">
    <a href="/package.json"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square"></a>
    <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square">
  </p>
</p>

## What does it do?

On comments like:

```
@all-contributors please add @octocat for design
```

It will automatically update **@all-contributors** list and push changes to the default branch.

## Why is it better than @all-contributors-bot?

- 🤖 It's as reliable as GitHub Actions
- 💪 It's frictionless - it will automatically push changes to the default branch. Forget PRs (and their conflicts)
- 🧹 It's tidier - it supports `.all-contributorsrc` placed in `.github` directory

## Usage

**.github/workflows/all-contributors.yml**:

```yml
name: all-contributors

on:
  issue_comment:
    types: [created]

jobs:
  all-contributors:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1

      - uses: ActionwareIO/all-contributors-action@action
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Any issue comment like:

```
@all-contributors please add @octocat for code, design
```

Will trigger the action. We support few different forms of comments, check out our
[test](https://github.com/actionwareio/all-contributors-action/blob/master/test/all-contributors/parseComment.test.ts)
for more.

## ✨ Contributors

We welcome all kinds of contributions!

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/krzkaczor"><img src="https://avatars2.githubusercontent.com/u/1814312?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Kris Kaczor</b></sub></a><br /><a href="https://github.com/actionwareio/all-contributors-bot/commits?author=krzkaczor" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

Kris Kaczor MIT
