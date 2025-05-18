# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy app source code
COPY . .

# Build the Next.js app
RUN npm run build

# Install only production dependencies
RUN npm ci --omit=dev

# Stage 2: Run the application with a minimal image
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next

# Expose the port Next.js will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]