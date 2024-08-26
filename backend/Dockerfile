FROM node:20.12.0-alpine3.19

WORKDIR /backend

COPY package*.json ./

# Install dependencies
RUN npm install
# Can you add a script to the global package.json that does this?
RUN npx prisma generate

# Can you filter the build down to just one app?
RUN npx tsc -b


CMD ["npm", "run", "dev"]