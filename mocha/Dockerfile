FROM library/node

# Install with npm globally
RUN npm install --global mocha

# Define the working directory
WORKDIR '/test'

# Run mocha
RUN './node_modules/mocha/bin/mocha'