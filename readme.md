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
### Api n-pints For Testing
# singup 
  -http://localhost:3000/api/v1/auth/signup - post method
    
  - payload - {
    "data": {
        "email": "admin@gmail.com",
        "fullname": "test",
        "password": "123456"
    }
}

# singin
  -http://localhost:3000/api/v1/auth/signin - post method

  - payload - {
    "data": {
        "email": "admin@gmail.com",
        "password": "123456"
    }
}

# User SignIn 
- http://localhost:3000/api/v1/auth/u/signin  - post method.

- payload - {
    "data": {
        "email": "testuser@gmail.com",
        "password": "123456",
        "accountid":"7728151249"
    }
}

# access token 
 - http://localhost:3000/api/v1/auth/accesstoken - post method
 - payload - {
    "data": {
        "securitycode": "8407c6d4-962c-4e2c-b757-d2fe6cca5e92"
    }
}
# refresh 
  - http://localhost:3000/api/v1/auth/refresh - post method

# User or Menager create 
 - http://localhost:3000/api/v1/user/create - post method , bearer token

 - payload - {
    "data": {
        "email": "testuser@gmail.com",
        "password": "123456",
        "fullname": "testuser",
        "userid": "testuser"
    }
}

# User List 
 - http://localhost:3000/api/v1/user/list?offset=0&pagesize=5 - get method,bearer token

# Permission Create 
 - http://localhost:3000/api/v1/permission/create  - post method , bearer token

 - payload - {
    "data": {
        "permissionname": "users",
        "permissions": [
            "UserCreae",
            "UserList"
        ]
    }
}

#  Permission List
- http://localhost:3000/api/v1/permission/list  - get method , bearer token

# Assign Permission 
 - http://localhost:3000/api/v1/user/assignpermissions - post method , bearer token

 - payload - {
    "data": {
        "permission": "users",
        "userid": "testuser"
    }
}

# Task Create 
 - http://localhost:3000/api/v1/task/create - post method , bearer token

 - payload - {
    "data": {
        "title": "commit error",
        "description": "******",
        "status": "**",
        "priority": true
    }
}

# Task List 
 - http://localhost:3000/api/v1/task/list?offset=0&pagesize=5 - get method ,bearer token

# Task Assign 
 - http://localhost:3000/api/v1/task/assign - post method ,bearer token

 - payload - {
    "data":{
    "id":"_id",
    "userid:"testuser"
    }
 }

# Project Create
 - http://localhost:3000/api/v1/project/create - post method ,bearer token

 - payload - {
    "data": {
        "organization": "*****",
        "projectname": "*****",
        "signInSuccessUrl": "http/**.com",
        "signUpSuccessUrl": "http/**success.com",
        "signInErrorUrl": "http/**success.com",
        "signUpErrorUrl": "http/**success.com"
    }
}


 # Project List
 - http://localhost:3000/api/v1/project/list - get method ,bearer token