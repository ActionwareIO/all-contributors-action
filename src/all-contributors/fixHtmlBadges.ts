/**
 * By default all-contributors won't fix html style badges. This function should do it either way.
 * @returns updated readmeContent
 */
export function fixHtmlBadges(contributorsNo: number, readmeContent: string): string {
  const updatedReadme = readmeContent.replace(
    HTML_BADGE_REGEX,
    `src="https://img.shields.io/badge/all_contributors-${contributorsNo.toString()}-orange.svg?style=flat-square"`,
  )

  return updatedReadme
}

const HTML_BADGE_REGEX = /src="https:\/\/img.shields.io\/badge\/all_contributors-([0-9]*?)-orange.svg\?style=flat-square"/gi
