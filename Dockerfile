# Use the official Node.js 20-alpine image as a base
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .
COPY .env .env

# Build the Next.js application
RUN npm run build


# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
