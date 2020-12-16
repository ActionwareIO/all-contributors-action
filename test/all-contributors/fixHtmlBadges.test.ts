import { expect } from 'earljs'

import { fixHtmlBadges } from '../../src/all-contributors/fixHtmlBadges'

describe('fixHtmlBadges', () => {
  it('fixes badge', () => {
    const input = `<p align="center">
    <p align="center">
      <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square">
    </p>
  </p>`

    const output = fixHtmlBadges(5, input)

    expect(output).toEqual(`<p align="center">
    <p align="center">
      <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square">
    </p>
  </p>`)
  })

  it('fixes badges', () => {
    const input = `<p align="center">
    <p align="center">
      <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square">
      <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square">
    </p>
  </p>`

    const output = fixHtmlBadges(5, input)

    expect(output).toEqual(`<p align="center">
    <p align="center">
      <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square">
      <img alt="All contributors" src="https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square">
    </p>
  </p>`)
  })

  it(`doesn't change anything if no badge`, () => {
    const input = `# regular boring readme
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

    ## really boring

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/krzkaczor"><img src="https://avatars2.githubusercontent.com/u/1814312?v=4" width="100px;" alt="Kris Kaczor"/><br /><sub><b>Kris Kaczor</b></sub></a><br /><a href="https://github.com/krzkaczor/gha-playground/commits?author=krzkaczor" title="Code">💻</a> <a href="https://github.com/krzkaczor/gha-playground/commits?author=krzkaczor" title="Documentation">📖</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
    `

    const output = fixHtmlBadges(5, input)

    expect(output).toEqual(input)
  })
})
