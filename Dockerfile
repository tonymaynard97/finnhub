FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY  package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

EXPOSE 5000
CMD ["yarn", "start"]