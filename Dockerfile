# Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

# Copy the rest of the files, including wait-for-it.sh
COPY . .

# Give execution permission to the script
RUN chmod +x ./wait-for-it.sh

# Expose the port
EXPOSE 3000

# Start the app
CMD ["sh", "-c", "./wait-for-it.sh mysql-db:3306 -- npx prisma db push && npm run dev"]
