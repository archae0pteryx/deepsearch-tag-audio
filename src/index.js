require('dotenv').config()
const MemoryStream = require('memory-stream')
const DeepSpeech = require('deepspeech')
const Duplex = require('stream').Duplex
const Sox = require('sox-stream')
const Wav = require('node-wav')
const fs = require('fs-extra')

const { writeData } = require('./utils')
const { convertTokensToWordTimeObject } = require('./parser')
const { MOCK_TRANSCRIPT } = require('./mocks')

const { MODEL_DIR, AUDIO_DIR, WAV_FILE, OUT_DIR, MODEL_PATH, SCORER_PATH } =
  process.env

function bufferToStream(buffer) {
  let stream = new Duplex()
  stream.push(buffer)
  stream.push(null)
  return stream
}

function run() {
  const model = new DeepSpeech.Model(MODEL_PATH)
  const desiredSampleRate = model.sampleRate()

  model.enableExternalScorer(SCORER_PATH)

  const buffer = fs.readFileSync(WAV_FILE)
  const result = Wav.decode(buffer)

  if (result.sampleRate < desiredSampleRate) {
    const e = `org sample rate ${result.sampleRate} is lower than ${desiredSampleRate}`
    console.error(e)
    process.exit()
  }

  const audioStream = new MemoryStream()
  bufferToStream(buffer)
    .pipe(
      Sox({
        global: {
          'no-dither': true,
        },
        output: {
          bits: 16,
          rate: desiredSampleRate,
          channels: 1,
          encoding: 'signed-integer',
          endian: 'little',
          compression: 0.0,
          type: 'raw',
        },
      })
    )
    .pipe(audioStream)

  audioStream.on('finish', () => {
    const audioBuffer = audioStream.toBuffer()

    const audioLength = (audioBuffer.length / 2) * (1 / desiredSampleRate)
    console.log('[+] audio length', audioLength)
    console.log('[+] starting str to txt')
    const stringToText = model.stt(audioBuffer)
    console.log('[+] getting metadata')
    const { transcripts } = model.sttWithMetadata(audioBuffer)

    // writeData(stringToText, transcripts)
  })
}

const obj = convertTokensToWordTimeObject(MOCK_TRANSCRIPT[0].tokens)
console.log(obj)
// run()
