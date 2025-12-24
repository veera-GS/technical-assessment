# Technical Assessment – Backend Application
📌 Project Overview

This project is a role-based backend application built as part of a technical assessment.
It demonstrates clean architecture, JWT-based authentication, Role-Based Access Control (RBAC), pagination, and API documentation using Swagger.

# The system supports:

- User authentication & authorization
- Role and permission management
- Project and task management
- Secure access using RBAC
- Scalable API design

# Architecture Decisions & Trade-offs
- Architecture Style
- The application follows a Layered Architecture:
- Controller → Service → Repository → Database

### Key Layers

# Controller Layer

- Handles HTTP requests and responses
- Performs request validation

# Service Layer

- Contains business logic
- Decouples controllers from data access

# Repository / Model Layer

- Handles database operations using MongoDB models
- Middleware Layer
- Authentication (JWT)
- Authorization (RBAC)
- Error handling

### Why This Architecture?

# Pros

- Separation of concerns
- Easy to maintain and test
- Scales well as features grow
- Clear responsibility per layer

# Trade-offs
- Slightly more boilerplate code
- More files compared to monolithic approach
- Initial setup takes longer, but pays off long-term

# Database Schema Explanation (MongoDB)

MongoDB is used due to its schema flexibility, horizontal scalability, and JSON-like document structure, which fits RBAC and task management well.
---

# Admin Schema - login collection name
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  accountid:string
}

# User Schema - loginUsers collection name
{
  _id: ObjectId,
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  accountid:string
}


# Purpose

- Stores user credentials
- Supports multiple roles per user


---
# Permission Schema - Permissions collection name
{
  _id: ObjectId,
  permissionname: string,          // e.g., CREATE_TASK, VIEW_USER
  permissions: Array<string>
}


# Purpose

- Fine-grained access control

- Reusable across roles
---

# Project Schema
{
  _id: ObjectId,
  name: string,
  description: string,
  createdBy: ObjectId,
  signinSuccessUrl : string,
  signinErrorUrl:string,
  signUpSuccessUrl:string,
  signUpErrorUrl:string

}
---
# Task Schema
{
  _id: ObjectId,
  title: string,
  description: string,
  projectId: ObjectId,
  assignedTo: ObjectId,
  status: string
}
---
###  RBAC (Role-Based Access Control) Strategy
RBAC Model Used

- User → Roles → Permissions

- How It Works

- User logs in

- JWT token is issued containing user ID

- Middleware extracts user roles

- Roles are mapped to permissions

- API access is granted or denied based on permissions


---

### Pagination Strategy Explanation
# Why Pagination?

- Prevents large payloads
- Improves performance
- Reduces memory usage
- Strategy Used
- Limit & Offset Pagination

# API Query Parameters
- ?page=1&limit=10

# Example Logic
- skip = (page - 1) * limit
- limit = limit

# Response Format
{
  "data": [...],
  "page": 1,
  "limit": 10,
  "totalRecords": 100,
  "totalPages": 10
}

---
