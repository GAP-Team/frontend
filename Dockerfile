# Use Node.js LTS as the base image
FROM node:20-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Start a new stage from Node.js LTS to keep the image small
FROM node:20-alpine

# Set the working directory in the new stage
WORKDIR /app

# Copy package.json and package-lock.json for the dependencies needed at runtime
COPY package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy the built Next.js app from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Expose the port the app runs on
EXPOSE 3000

# Define the command to start the Next.js app
CMD ["npm", "start"]