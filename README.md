# The Developers Website - Fake API

This API was made for "The Developers Website" Project. With this API, anyone can Sign up and Login in the application. If you are logged in, you can also add or remove comments on a dev page.
I used Express and Typescript to construct it, Zod to validation and serialization, Prisma ORM to work with the data and Json Web Token to encrypt data.

Each User contains:
|key|type|
|---|-----|
|id|number|
|name|string|
|email|string|
|password|string|
|createdAt|date|
|updatedAt|date|
|comments|Comment[]|

Each comment contains:
|key|type|
|--|---|
|id|number|
|content|string|
|createdAt|date|
|updatedAt|date|
|userId|Int|
|devId|Int|

# Routes - Users
|type|address|description|
|-|-|-|
|GET|/api/users/:id|get user|
|GET|/api/users|get all users|
|POST|/api/users/register|signup route|
|POST|/api/users/login|login route|
|DELETE|/api/users/:id|delete user route|
|PATCH|/api/users/:id|update user route|

# Routes - Products
|type|address|description|
|-|-|-|
|POST|/api/devs/:devId/comments|create a comment route|
|GET|/api//devs/:devId/comments|list all comments for a certain dev route|
|DELETE|/api/comments/:commentId|delete comment route|

# Requests and responses

### GET/api/users/:id 
#### Response template (STATUS CODE 200)
```
{
	"id": 6,
	"name": "John Doe",
	"email": "johndoe@mail.com",
	"createdAt": "2025-04-15T13:09:46.957Z"
}
```
#### Possible error (STATUS CODE 404)
```
{
	"message": "User not found"
}
```
### GET/api/users 
#### Response template (STATUS CODE 200)
```
[
	{
		"id": 6,
		"name": "John Doe",
		"email": "johndoe@mail.com",
		"createdAt": "2025-04-15T13:09:46.957Z"
	}
]
```
### POST/api/users/register
#### Request template
```
{
  "name": "John Doe",
	"email": "johndoe@mail.com",
	"password": "senha123"
}
```
#### Response template (STATUS CODE 201)
```
{
	"id": 6,
	"name": "John Doe",
	"email": "johndoe@mail.com",
	"createdAt": "2025-04-15T13:09:46.957Z"
}
```
#### Possible error (STATUS CODE 403)
```
{
	"issues": [
		{
			"code": "invalid_type",
			"expected": "string",
			"received": "number",
			"path": [
				"name"
			],
			"message": "Expected string, received number"
		}
	],
	"name": "ZodError"
}
```
#### Possible error (STATUS CODE 404)
```
{
	"message": "User already exists"
}
```

### POST/api/users/login
#### Request template
```
{
	"email": "johndoe@mail.com",
	"password": "senha123"
}
```
#### Response template (STATUS CODE 200)
```
{
	"acessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNzQ0NzI0OTY3fQ.STIf0P8L2G_MPQu0kQvfWhcXJJql7Ul_Qh0rvcrTaq4",
	"user": {
		"id": 6,
		"name": "John Doe",
		"email": "johndoe@mail.com",
		"createdAt": "2025-04-15T13:09:46.957Z"
	}
}
```
#### Possible error (STATUS CODE 404)
```
{
	"message": "User not found"
}
```
#### Possible error (STATUS CODE 404)
```
{
	"Error: Email or password invalid"
}
```
### PATCH /api/users/:id
#### Request template
```
{
  "name": "New name"
}
```
#### Response template (STATUS CODE 200)
```
{
	"id": 6,
	"name": "New name",
	"email": "johndoe@mail.com",
	"createdAt": "2025-04-15T13:09:46.957Z"
}
```
#### Possible error (STATUS CODE 404)
```
{
	"message": "User not found"
}
```
#### Possible error (STATUS CODE 403)
```
{
	"message": "Token is required"
}
```

### DELETE /api/users/:id
#### Request template

There's no response body.

#### Possible error (STATUS CODE 404)
```
{
	"message": "User not found"
}
```
#### Possible error (STATUS CODE 403)
```
{
	"message": "Token is required"
}
```

### POST /api/devs/:devId/comments
#### Request template
```
	{
  "content": "A comment"
}

```
#### Response template (STATUS CODE 201)
```
{
	"id": 7,
	"content": "comentario 2",
	"createdAt": "2025-04-15T12:32:14.444Z",
	"updatedAt": "2025-04-15T12:32:14.444Z",
	"userId": 5,
	"devId": 1
}
```
#### Possible error (STATUS CODE 403)
```
{
	"message": "Token is required"
}
```
#### Possible error (STATUS CODE 403)
```
{
	"message": "Invalid token"
}
```
### GET/api/devs/:devId/comments
#### Response template (STATUS CODE 200)
```
[
	{
		"id": 8,
		"content": "A comment",
		"createdAt": "2025-04-15T13:57:08.447Z",
		"updatedAt": "2025-04-15T13:57:08.447Z",
		"userId": 6,
		"devId": 1,
		"user": {
			"id": 6,
			"name": "New name",
			"email": "johndoe@mail.com"
		}
	}
]
```


### DELETE/api/devs/:devId/comments/:commentId
There's no response body.

#### Possible error (STATUS CODE 404)
```
{
	"message": "Comment not found"
}
```
#### Possible error (STATUS CODE 403)
```
{
	"message": "Token is required"
}
```
