FROM node:16

# Arguments
ARG IS_PRODUCTION

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN if $IS_PRODUCTION ; then npm ci --only=production ; else npm install ; fi
RUN npm i typescript

# Bundle app source
COPY . .

EXPOSE 8080

CMD npm start