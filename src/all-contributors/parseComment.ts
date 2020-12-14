import { ParsedContribution } from './Contribution'
import { parseContribution } from './parseContributions'

const CONTRIBUTION_REGEX = /@all-contributors (?:please )?add @(?<name>.*?) for (?<whatFor>.*?)(?:[.\n]|$)/gm

export function parseComment(comment: string): ParsedContribution[] {
  const matches = getAllMatches(CONTRIBUTION_REGEX, comment) as [string, string][]

  const parsedContributions = matches.map(
    ([user, contributionList]): ParsedContribution => {
      const contributions = parseContributionList(contributionList)

      return {
        who: user,
        forWhat: contributions.parsed,
        unrecognized: contributions.unrecognized,
      }
    },
  )

  return parsedContributions
}

export function parseContributionList(contributionList: string): { parsed: string[]; unrecognized: string[] } {
  const contributions = contributionList.split(/[, ]/)

  const parsed: string[] = []
  const unrecognized: string[] = []

  for (const _rawContribution of contributions) {
    const rawContribution = _rawContribution.trim()
    // this can easily happen while splitting string, just ignore these
    if (rawContribution === '') {
      continue
    }

    const contribution = parseContribution(rawContribution)

    if (!contribution) {
      unrecognized.push(rawContribution)
    } else {
      parsed.push(contribution)
    }
  }

  return { parsed, unrecognized }
}

function getAllMatches(regex: any, string: string): any[] {
  const results = []
  let tmp
  while ((tmp = regex.exec(string)) != null) {
    results.push(tmp.slice(1))
  }
  return results
}
