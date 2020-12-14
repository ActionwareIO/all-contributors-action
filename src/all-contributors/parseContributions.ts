import { assert } from 'ts-essentials'

const getTypes = require('all-contributors-cli/dist/util/contribution-types.js')

const allValidContributionTypes = Object.keys(getTypes({}))

const synonyms = {
  docs: 'doc',
} as Record<string, string>

export function parseContribution(contribution: string): string | undefined {
  if (allValidContributionTypes.includes(contribution)) {
    return contribution
  }
  if (synonyms[contribution]) {
    const synonym = synonyms[contribution]
    assert(allValidContributionTypes.includes(synonym), `Synonym ${synonym} is not a valid contribution type!`)

    return synonym
  }

  return undefined
}
