# Test Forum Backend

Test Forum Backend is a sample backend project using Express.js + Prisma + MySQL (Docker Compose)
to create API for a forum-like project.

## Installation
At the root of the project
1. Create new .env file using .env.example as a template.
2. Run "docker-compose up" to create and run a local MySQL DB container.
3. Run "npm i" to install node modules for the project.
4. Run "npm run prisma:push && npm run prisma:seed" to setup tables and seed data for DB

## Starting the project
1. Run MySQL DB docker container
2. Run "npm run start:watch"
