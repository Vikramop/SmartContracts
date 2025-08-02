# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies first for caching
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Expose port (match backend server)
EXPOSE 5000

# Start backend server
CMD ["node", "app.js"]
