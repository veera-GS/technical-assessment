# Task Management Backend API

## Project Overview

This project is a **Task Management Backend API** built using **Node.js, TypeScript, Express, and MongoDB**.
The system is designed for a **single organization** and focuses on **authentication, authorization, and clean backend design**.

The main objective of this assignment is to demonstrate:

* Secure JWT-based authentication
* Role-Based Access Control (RBAC)
* Clean and scalable architecture
* Proper API structure and documentation

Partial implementation is intentional, as correctness and clarity are prioritized over feature quantity.

---

## Tech Stack

* **Node.js**
* **TypeScript**
* **Express.js**
* **MongoDB**
* **JWT (Access & Refresh Tokens)**
* **bcrypt**
* **Git**

---

## Architecture Decisions & Trade-offs

### Architecture Pattern

The application follows a **layered architecture** to ensure clean separation of concerns:

### Why This Approach?

* Keeps code modular and maintainable
* Improves readability and testability
* Makes future enhancements easier

### Trade-offs

* Slightly more boilerplate compared to monolithic design
* Better scalability and long-term maintainability

---

## Authentication & Authorization

### JWT Strategy

The system uses **JWT-based authentication** with:

* **Access Token** – Short-lived token used to access protected APIs
* **Refresh Token** – Used to generate new access tokens without re-login

### Token Flow

1. User signs in
2. Access token and refresh token are issued
3. Access token is sent via `Authorization: Bearer <token>`
4. Refresh token endpoint generates a new access token when expired

---

##  RBAC Strategy Explanation

### Supported Roles

* **ADMIN**

  * Full access
  * Can manage users, permissions, tasks, and projects

* **MANAGER**

  * Can manage tasks and projects
  * Cannot manage users

* **USER**

  * Can view and update tasks assigned to them

### RBAC Implementation

RBAC is implemented using:

* JWT payload role validation
* Authorization middleware
* Permission-based access checks

### Why This Strategy?

* Centralized authorization logic
* Easy to extend
* Clean separation from business logic

---

## 🗄️ Database Schema Explanation (MongoDB)

### Users Collection

```json
{
  "email": "string",
  "password": "hashed string",
  "fullname": "string",
  "userid": "string",
  "createdAt": "date"
}
```
### UserPermissions Collection

```json
{
  "permissionname":"string[]"
  "userid": "string",
  "createdAt": "date"
}
```

### Permissions Collection

```json
{
  "permissionname": "users",
  "permissions": ["UserCreate", "UserList"]
}
```

### Tasks Collection

```json
{
  "title": "string",
  "description": "string",
  "status": "TODO | IN_PROGRESS | DONE",
  "priority": true,
  "assignedTo": "userid",
  "createdAt": "date"
}
```

### Projects Collection

```json
{
  "organization": "string",
  "projectname": "string",
  "signInSuccessUrl": "string",
  "signUpSuccessUrl": "string",
  "signInErrorUrl":"string",
  "signUpErrorUrl":"string"
  "createdAt": "date"
}
```

---

## 📄 Pagination Strategy Explanation

### Implemented Pagination

The API uses **offset-based pagination**:

```
GET /list?offset=0&pagesize=5
```

### Why Offset Pagination?

* Easy to implement and understand
* Suitable for small to medium datasets
* Works well for current application needs

### Trade-off

* Not optimal for very large datasets
* Cursor-based pagination can be added later

---

## API Endpoints for Testing

### Authentication APIs

**Admin Signup**

```
POST /api/v1/auth/signup
```

**Admin Signin**

```
POST /api/v1/auth/signin
```

**User Signin**

```
POST /api/v1/auth/u/signin
```

**Generate Access Token**

```
POST /api/v1/auth/accesstoken
```

**Refresh Token**

```
POST /api/v1/auth/refresh
```

---

### User & Permission Management

**Create User / Manager**

```
POST /api/v1/user/create
```

**User List**

```
GET /api/v1/user/list?offset=0&pagesize=5
```

**Create Permission**

```
POST /api/v1/permission/create
```

**Assign Permission**

```
POST /api/v1/user/assignpermissions
```

---

### Task Management

**Create Task**

```
POST /api/v1/task/create
```

**Task List**

```
GET /api/v1/task/list?offset=0&pagesize=5
```

**Assign Task**

```
POST /api/v1/task/assign
```

---

### Project Management

**Create Project**

```
POST /api/v1/project/create
```

---

## How to Run the Project

```bash
git clone https://github.com/veera-GS/technical-assessment.git
cd technical-assessment
npm install
npm run dev
```

---

## Final Notes

This project demonstrates:

* Secure backend API design
* JWT authentication with RBAC
* Clean architecture and modular code
* Practical MongoDB schema design

Partial completion aligns with assessment guidelines, focusing on clarity and correctness.
