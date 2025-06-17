arg version=22-alpine3.20

from node:${version}

workdir /project

copy package.json package.json

run npm install

copy . .