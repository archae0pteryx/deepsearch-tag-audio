FROM python:3.7

ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /app

ADD . /app

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update 
RUN apt install -y ffmpeg sox nodejs yarn
RUN python -m pip install --upgrade pip
RUN pip install deepspeech
