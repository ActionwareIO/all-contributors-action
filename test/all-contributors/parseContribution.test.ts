import { expect } from 'earljs'

import { parseContribution } from '../../src/all-contributors/parseContributions'

describe('parseContribution', () => {
  it('works will valid contributions', () => {
    expect(parseContribution('doc')).toEqual('doc')
  })

  it('fixes synonymous contributions', () => {
    expect(parseContribution('docs')).toEqual('doc')
  })

  it('returns undefined for unrecognized contributions', () => {
    expect(parseContribution('something')).toEqual(undefined)
  })
})
