FROM node:latest

# Install mocha
RUN npm install --global mocha

# Install dependencies
RUN npm install --save-dev should request supertest chai

# Define the working directory
WORKDIR '/test'

# Include package.json
ADD package.json ./

# Include mocha tests
ADD ./test/sample /test/sample
ADD ./test/01-auth /test/01-auth

# Run all mocha tests
RUN mocha /test/*