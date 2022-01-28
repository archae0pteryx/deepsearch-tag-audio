#!/bin/bash
source .env

# Install deepsearch
# pip3 install deepspeech

# install sox
# brew install sox

# get pretrained english models
curl -L https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.pbmm -o $MODEL_DIR/deepspeech-0.9.3-models.pbmm
curl -L https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/deepspeech-0.9.3-models.scorer -o $MODEL_DIR/deepspeech-0.9.3-models.scorer

# Example audio
curl -L https://github.com/mozilla/DeepSpeech/releases/download/v0.9.3/audio-0.9.3.tar.gz -o $AUDIO_DIR/audio-0.9.3.tar.gz
tar xvf $AUDIO_DIR/audio-0.9.3.tar.gz
