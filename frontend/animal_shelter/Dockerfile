FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose dev port
EXPOSE 3000

# Run dev server
CMD ["npm", "start"]


