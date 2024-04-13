## Advanced Blogging API Documentation
Welcome to the Advanced Blogging API documentation. This API provides advanced features for managing blog posts, tags, and user authentication. Below, you'll find details on the available endpoints, their functionalities, request/response formats, authentication requirements, and usage instructions.

## Authentication
This API implements role-based access control (RBAC) for authentication. There are two roles:

Admin: Admin users have full access to all endpoints, including deleting posts and managing tags.
User: Regular users can only edit their own posts and tags.
Authentication is required for certain endpoints, and the role of the authenticated user determines their access permissions.

## Authentication Endpoints
Login
Endpoint: POST /api/auth/login
Purpose: Authenticate users and generate a JWT token for accessing protected endpoints.
Request Format:json
{
  "email": "user@example.com",
  "password": "password123"
}

Response Format:json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}

## Authentication: Not required.
Register
Endpoint: POST /api/auth/register
Purpose: Register a new user.
Request Format:
json
{
  "email": "newuser@example.com",
  "password": "password123"
}
Response Format:
json
{
  "message": "User registered successfully"
}
Authentication: Not required.

## Blog Posts
Endpoints
Search and Filter Posts
Endpoint: GET /api/posts
Purpose: Search and filter blog posts based on tags, date range, and author.
Request Format: Query parameters:
tags: Comma-separated list of tags to filter posts.
startDate: Start date for filtering posts (YYYY-MM-DD).
endDate: End date for filtering posts (YYYY-MM-DD).
author: Username of the author to filter posts.
Response Format: Array of post objects.
Authentication: Not required.

## Delete Post
Endpoint: DELETE /api/posts/:id
Purpose: Delete a blog post.
Request Format: None.
Response Format: None.
Authentication: Admin or post owner.
Tags
Endpoints
Create Tag
Endpoint: POST /api/tags
Purpose: Create a new tag.
Request Format:
json
Copy code
{
  "name": "newtag"
}
Response Format: Tag object.
Authentication: Admin only.
Update Tag
Endpoint: PUT /api/tags/:id
Purpose: Update an existing tag.
Request Format:
json
Copy code
{
  "name": "updatedtag"
}
Response Format: Updated tag object.

## Authentication: Admin only.
Delete Tag
Endpoint: DELETE /api/tags/:id
Purpose: Delete a tag.
Request Format: None.
Response Format: None.
Authentication: Admin or tag owner.
Usage Instructions
Authentication:

Use the /api/auth/login endpoint to authenticate and obtain a JWT token.
Include the token in the Authorization header for protected endpoints.
Blog Posts:

Use the /api/posts endpoint to search and filter blog posts.
Use the /api/posts/:id endpoint to delete a specific post.
Tags:

Use the /api/tags endpoint to create a new tag.
Use the /api/tags/:id endpoint to update or delete a tag.
