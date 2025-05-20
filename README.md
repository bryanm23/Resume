# Resume Website

A personal resume website built with React.js frontend, Spring Boot backend, PostgreSQL database, and RabbitMQ message broker.

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