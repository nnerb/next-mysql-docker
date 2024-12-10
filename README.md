# Dockerized Next.js CRUD Todo App

This project is a CRUD Todo App built with modern web technologies, designed to be scalable and maintainable. The app is Dockerized for seamless deployment and uses MySQL for data persistence.

## Tools and Libraries

- **Next.js**: React framework with server-side rendering and API routes.
- **Docker**: Containerization platform used to package and run applications in isolated environments. It ensures consistency across multiple environments and helps with scalable deployments.
- **React Query**: For efficient server state management and API integration.
- **Prisma**: ORM for database modeling and type-safe queries.
- **MySQL**: Relational database for structured data storage.
- **TailwindCSS**: A utility-first CSS framework for styling.
- **TypeScript**: Enhances code reliability with strong typing.

## Features

- **CRUD Operations**: Add, view, edit, and delete tasks.
- **Responsive UI**: Built with TailwindCSS for a clean and adaptable interface.
- **State Management**: Uses React Query for efficient fetching and mutation of data.
- **Database Integration**: MySQL and Prisma for a reliable database solution.
- **Dockerized Deployment**: The app is containerized with Docker for easy deployment.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Docker
- Node.js (v16 or newer)
- npm, yarn, or pnpm (any package manager)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install the project dependencies:

```bash
npm install
# or
yarn install
```

3. Create the .env file:
Create a .env file in the root of the project and add the following environment variables (you can use .env.example as a reference):
# .env
```ini
MYSQL_ROOT_PASSWORD=your_mysql_root_password
MYSQL_DATABASE_NAME=your_db_name_here
DATABASE_URL=mysql://root:${MYSQL_ROOT_PASSWORD}@mysql:3306/${MYSQL_DATABASE_NAME}
```
4. Build and run the Docker container:

```bash
docker-compose up --build 
```

5. Open your app in your browser:
Open [http://localhost:3000](http://localhost:300) to see the app in action.

## Additional Resources

To learn more about the tools and libraries used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/) - Learn about Vite's features and APIs.
- [React Documentation](https://reactjs.org/) - Official documentation for React.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Explore Tailwind CSS and its utility-first approach to styling.
- [TypeScript Documentation](https://www.typescriptlang.org/) - Learn about type safety.
- [React Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview) -  Official documentation for React Query (TanStack Query). 


Happy coding!🎉🎉🎉