FROM node:18-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies with clean npm cache and specific platform
RUN npm cache clean --force && \
    npm install --platform=linux --arch=x64

# Copy only necessary files
COPY public/ public/
COPY src/ src/
COPY tsconfig.json .
COPY tailwind.config.js .
COPY postcss.config.js .

# Set environment variables
ENV NODE_ENV=development
ENV WDS_SOCKET_PORT=0
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

EXPOSE 3000

# Start the app with the correct environment
CMD ["sh", "-c", "WATCHPACK_POLLING=true npm start"] 