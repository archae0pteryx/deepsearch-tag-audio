# Deepsearch tagging

## Development

audio needs to be in wav format and sample rate matched with model
use `.env` to point to the things


with docker
```bash
docker-compose build
yarn shell
```

locally:

```bash
yarn install
yarn setup # OSX: This installs deps, sample models, and audio. takes a while
```

Notes:
- https://deepspeech.readthedocs.io/en/r0.9/TRAINING.html
- https://ffmpeg.org/ffmpeg.html

