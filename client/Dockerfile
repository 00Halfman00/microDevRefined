# Use a Node.js base image suitable for development
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install all dependencies, including devDependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# The command to start the Next.js development server
CMD ["npm", "run", "dev"]
