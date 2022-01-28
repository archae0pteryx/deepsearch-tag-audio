const {
  tokensToTuple,
  convertTokensToWordTimeObject,
  findStartTimeForPhrase,
} = require('./parser')

const { MOCK_TRANSCRIPT, MOCK_TEXT } = require('./mocks')

const TOKENS = MOCK_TRANSCRIPT[0].tokens

describe('raw transcript response', () => {
  xit('converts to array of tuples', () => {
    const startLetterArr = tokensToTuple(TOKENS)
    expect(startLetterArr[0][0]).toBe(0.7599999904632568)
  })

  it('converts to object with key of word val of time', () => {
    const actual = convertTokensToWordTimeObject(TOKENS)
    // console.log(actual)
    // const len = Object.keys(actual).length
    // expect(len).toBe(MOCK_TEXT.split(' ').length)
    console.log(actual)
  })
})

describe('matching', () => {
  xit('matches selected phrase with start time', () => {
    const wordTimeMap = convertTokensToWordTimeObject(TOKENS)
    const actual = findStartTimeForPhrase(wordTimeMap, 'proves this more')
    expect(actual).toBe(1.2200000286102295)
  })
})
