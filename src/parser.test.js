const { tokensToTuple, convertTokensToWordTimeObject } = require('./parser')

const { MOCK_TRANSCRIPT, MOCK_TEXT } = require('./mocks')

const TOKENS = MOCK_TRANSCRIPT[0].tokens

describe('raw transcript response', () => {
  it('converts to array of tuples', () => {
    const startLetterArr = tokensToTuple(TOKENS)
    expect(startLetterArr[0][0]).toBe(0.6800000071525574)
  })

  it('converts to object with key of word val of time', () => {
    const actual = convertTokensToWordTimeObject(TOKENS)
    const len = Object.keys(actual).length
    expect(len).toBe(MOCK_TEXT.split(' ').length)
  })
})
