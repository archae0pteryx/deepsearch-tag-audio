const { MIN_PHRASE_THREASHOLD } = process.env

const tokensToTuple = tokens => tokens.map(({ start_time, text }) => [start_time, text])


const convertTokensToWordTimeObject = (tokens) => {
	const transcriptArrayOfTuples = tokensToTuple(tokens)
  // add space at end for final check for last word
  transcriptArrayOfTuples.push([null, ' '])
	const output = {}
	let buildWord = []
	let buildWordStartTime = 0

  for (let i = 0; i < transcriptArrayOfTuples.length; i++) {
		const [time, letter] = transcriptArrayOfTuples[i]
		if (letter !== ' ') {
			if (buildWord.length === 0) {
				buildWordStartTime = time
			}
			buildWord.push(letter)
		} else {
			output[buildWord.join('')] = buildWordStartTime
			buildWordStartTime = 0
			buildWord = []
		}
	}
	return output
}

const findStartTimeForPhrase = (wordTimeMap, phrase) => {
	const results = []
	let resultTime = 0
	const phraseArr = phrase.split(' ')

	let count = 0

	Object.entries(wordTimeMap).forEach(([word, time]) => {
		if (word === phraseArr[count]) {
			if (count === 0) {
				resultTime = time
			}
			results.push(phraseArr[count])
			count++
		}
	})
	console.log({ results })
	return resultTime
}

module.exports = {
  tokensToTuple,
  convertTokensToWordTimeObject,
	findStartTimeForPhrase
}
