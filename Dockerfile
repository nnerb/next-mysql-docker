# Dockerfile
FROM node:18
RUN useradd -ms /bin/sh -u 1001 app
# Set working directory

WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm install

COPY --chown=app:app . /app

# Give execution permission to the script
RUN chmod +x ./wait-for-it.sh

# Expose the port
EXPOSE 3000

# Start the app
CMD ["sh", "-c", "./wait-for-it.sh mysql-db:3306 -- npx prisma db push --accept-data-loss && npm run dev"]
