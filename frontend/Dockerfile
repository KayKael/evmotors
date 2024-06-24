# Example Dockerfile
FROM node:14

WORKDIR /

COPY package.json ./

# Install dependencies without generating a package-lock.json
RUN npm install --no-package-lock

COPY . .

CMD ["npm", "start"]
