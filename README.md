# Personal Resume Website

A modern, responsive personal resume website built with React and Tailwind CSS.

## Features

- Responsive design
- Modern UI with Tailwind CSS
- TypeScript for type safety
- Easy to customize and maintain

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/bryanm23/Investor.git
cd Investor
```

2. Install dependencies:
```bash
cd frontend
npm install
```

3. Start the development server:
```bash
npm start
```

The site will be available at `http://localhost:3000`.

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `build` directory.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite

## License

This project is licensed under the MIT License.

## Technology Stack

- Frontend: React.js with TypeScript
- Backend: Spring Boot 3.x
- Database: PostgreSQL
- Message Broker: RabbitMQ
- Containerization: Docker

## Prerequisites

- Docker
- Docker Compose

## Getting Started

1. Clone the repository
2. Navigate to the project root directory
3. Run the following command to start all services:

```bash
docker-compose up --build
```

## Accessing the Services

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- RabbitMQ Management Console: http://localhost:15672 (guest/guest)
- PostgreSQL: localhost:5432

## Project Structure

```
.
├── frontend/          # React.js frontend application
├── backend/           # Spring Boot backend application
├── docker-compose.yml # Docker compose configuration
└── README.md         # Project documentation
```

## Development

### Frontend Development

```bash
cd frontend
npm install
npm start
```

### Backend Development

```bash
cd backend
mvn spring-boot:run
```

## Message Queues

The application uses two main queues:
- resume.update: For handling resume updates
- resume.notification: For handling notifications

## Database

The PostgreSQL database is automatically created when running the Docker containers. The database name is `resume_db` with default credentials (username: postgres, password: postgres). 