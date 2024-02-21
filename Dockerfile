# Use Node.js LTS as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 3000
# RUN npm install next@latest
# Start the Next.js app
CMD ["npm","run","dev"]