FROM node:alpine
LABEL version="1.0"
LABEL description="Learning React with TypeScript, TypeScript, and MongoDB/Mongoose"
LABEL author=["hympert.nguyen@ngc.com"]
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
RUN npm install typescript
COPY . .
EXPOSE 3001
CMD npm run build && node ./dist/index.js 

