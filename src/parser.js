
const tokensToTuple = tokens => tokens.map(({ start_time, text }) => [start_time, text])


const convertTokensToWordTimeObject = (tokens) => {
	const transcriptArrayOfTuples = tokensToTuple(tokens)
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


module.exports = {
  tokensToTuple,
  convertTokensToWordTimeObject
}
