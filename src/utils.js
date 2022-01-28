const fs = require('fs-extra')

const { OUT_DIR } = process.env

const stringify = (data) => JSON.stringify(data, null, 2) 

const writeData = (stringToText, transcripts) => {
	fs.writeFileSync(`${OUT_DIR}/string.json`, stringify(stringToText))
	fs.writeFileSync(`${OUT_DIR}/transcripts.json`, stringify(transcripts))
}



module.exports = {
  writeData,
  stringify
}
