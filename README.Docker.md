# Docker Setup for Next.js with Prisma and MySQL

This document guides you through the process of setting up the Docker environment for running your **Next.js** application with **Prisma** as the ORM (Object-Relational Mapper) and a **MySQL** database.

## Prerequisites

Ensure the following are installed:

- **Docker**: [Download Docker](https://www.docker.com/products/docker-desktop)
- **Docker Compose**: Comes bundled with Docker Desktop, or can be installed separately.

## Setting Up the Docker Environment

### 1. Clone the Repository

If you haven't already, clone your project repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Configuration Files
Ensure you have the following configuration files in the root of your project:

- Dockerfile: Defines how the Next.js app is built
- compose.yaml: Defines the services (Next.js, MySQL) for Docker Compose.

#### Database Configuration for Dockerized Application

This document explains the differences between two common database connection configurations used in a Dockerized environment for MySQL.

##### 1. Using `localhost:3307` (External Docker Network)
```ini
DATABASE_URL=mysql://root:${MYSQL_ROOT_PASSWORD}@localhost:3307/${MYSQL_DATABASE_NAME}
```
- Description: This configuration connects to the MySQL database running in Docker via the host machine (your local system) on port 3307.
- Use Case: This is used when the application is running outside Docker or when you need to connect to MySQL from a local tool like a database client.
- Important: This requires Docker to expose the MySQL container's internal port 3306 to the host machine's port 3307 via Docker port mapping (e.g., 3307:3306 in the docker-compose.yml).

##### 2. Using `mysqlhost:3306` (Internal Docker Network)
```ini
DATABASE_URL=mysql://root:${MYSQL_ROOT_PASSWORD}@mysql:3306/${MYSQL_DATABASE_NAME}
```
- Description: This configuration connects to the MySQL database using the internal Docker network. The mysql here refers to the service name defined in the docker-compose.yml file.
- Use Case: This is used when both the application and MySQL are running inside Docker in the same Docker network. The mysql service name acts as the hostname to connect to MySQL.
- Important: This does not require port mapping because Docker’s internal network allows communication between services using service names (e.g., mysql), which Docker resolves to the corresponding container.


### 3. Build and run the Docker container:
```bash
docker compose up
```
This command does the following:

1. Builds the Docker images based on the Dockerfile.
2. Starts the containers for the Next.js app and MySQL database.

### 4. Verify the Containers are Running

To check if the containers are up and running, use:

```bash
docker ps
```
You should see both the Next.js and MySQL containers listed.

### 5. Access the Application
Once the containers are running, open your browser and navigate to:

Open [http://localhost:3000](http://localhost:3000) to see the app in action.

### 6. Interact with the MySQL Database
To access MySQL, you can connect using a MySQL client or through the Docker container.

Access via Command Line
To connect to the MySQL container, use:
```bash
docker exec -it <mysql-container-name> mysql -u root -p
```
Access via Prisma Studio

If you are using Prisma for database management, you can use Prisma Studio to interact with your MySQL database through a GUI. First, make sure your Docker container is running, and then use the following command:

```bash
npx prisma studio
```
This will open Prisma Studio in your browser, allowing you to manage the database visually, view records, update data, and perform other database operations.

### 7. Stopping the Containers
To stop the containers, run:
```bash
docker compose down
```

To remove the containers and the associated volumes (e.g., MySQL data), run:
```bash
docker compose down -v
```

### 8. Troubleshooting
- Error: Port already in use: If you encounter this issue, ensure no other services are using the default MySQL or Next.js ports (3000 and 3306). You can change the ports in docker-compose.yml if needed.

- Database connection issues: Make sure the MySQL container is up and running before interacting with it.

- Prisma Studio not opening: If npx prisma studio does not open, ensure your containers are running and Prisma is properly configured in your project.

## Additional Resources

To learn more about the tools and libraries used in this project, check out the following resources:

- [Docker Documentation](https://www.docker.com/) - Official Documentation for Docker.
- [Prisma](https://www.prisma.io/) - Official documentation for Prisma

Happy coding!🎉🎉🎉