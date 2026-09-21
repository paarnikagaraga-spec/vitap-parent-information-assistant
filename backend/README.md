# VIT-AP Parent Information Assistant - Backend

This folder contains the backend and database implementation for the
VIT-AP Parent Information Assistant project.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite
- JWT Authentication
- bcryptjs
- Express Rate Limit

## Backend Responsibilities

The backend provides secure APIs for:

- Parent registration and login
- Parent authentication using JWT
- Parent-Student authorization
- Student profile
- Credits
- Curriculum
- Attendance
- Mentor details
- Timetable
- Academic calendar
- Examination schedule
- Marks
- Grade history
- Payment history
- Payment receipt details
- Payment method
- Hostel details

## Database

The project uses SQLite with Prisma ORM.

Main database entities include:

- Parent
- Student
- ParentStudent
- Credit
- Curriculum
- Attendance
- Mentor
- Timetable
- AcademicCalendar
- Exam
- Mark
- Grade
- Payment
- Hostel
- AuditLog

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- JWT token expiration
- Parent-Student authorization
- Input validation
- API rate limiting
- Audit logging
- Protected student APIs
- Secure payment receipt response
- Environment variables for sensitive configuration

## Running the Backend

Install dependencies:

```bash
npm install
