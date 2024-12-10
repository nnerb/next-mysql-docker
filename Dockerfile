# Base image
FROM node:18

# Add a non-root user
RUN useradd -ms /bin/sh -u 1001 app
USER app

# Set working directory
WORKDIR /app

# Copy package files and set ownership to app user
COPY --chown=app:app package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application files and set ownership
COPY --chown=app:app . .

# Generate Prisma client
RUN npx prisma generate

# Expose the port
EXPOSE 3000

# Start the application
CMD npm run dev
