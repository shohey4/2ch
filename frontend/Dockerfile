FROM node:18-alpine

# PATH 追記
# ENV PATH="/frontend/node_modules/.bin:$PATH"

WORKDIR /frontend
COPY package.json yarn.lock* ./

RUN yarn install

COPY . .

EXPOSE 5173
