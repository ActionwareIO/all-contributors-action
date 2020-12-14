import { expect } from 'earljs'

import { getCommentBody, getCommentId } from '../../src/github/getters'

const event = require('../fixtures/validEvent.json')

describe('getContextBody', () => {
  it('works', () => {
    expect(getCommentBody(event)).toEqual('@all-contributors please add @octocat for doc')
  })
})

describe('getCommentId', () => {
  it('works', () => {
    expect(getCommentId(event)).toEqual(740144426)
  })
})
