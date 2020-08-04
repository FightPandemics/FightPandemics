FROM node:latest

# Install dependencies
RUN npm install --global mocha chai

# Define the working directory
WORKDIR '/test'

# Include package.json
COPY package.json ./

# Include test files
COPY ./test/test.js /test/

# Run tests
RUN mocha /test