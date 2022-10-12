# C7-06-auth-microservice

Servidor de autenticación provisional

## Endpoints:

### POST: Create User

- https://c7-06-authentication.up.railway.app/api/auth/signup

```json
{
  "name": "Peter",
  "surname": "Crouch",
  "email": "peter@test.tld",
  "password": "peter.test"
}
```

### POST: User Login

- https://c7-06-authentication.up.railway.app/api/auth/login

Body:

```json
{
  "email": "user@test.tld",
  "password": "user.test"
}
```

Result:

```json
{
  "message": "Auth successful",
  "id": 1,
  "role": "user",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjY1NTc3NTgyLCJleHAiOjE2NjU2NjM5ODJ9.dIZQlC1ORZn9_PjbAN-LnW2IIamjz__Ojqvp-hqVVNo"
}
```

### GET: Get all users

- /api/users

### GET: Get user by ID

- /api/users/:id

### PUT: Update User Info

- /api/users/:id/update

Body:

```json
{
  "name": "Peter",
  "surname": "Crouch",
  "email": "peter@test.tld",
  "password": "peter.test",
  "address": "Ciudad Real, calle 23b",
  "description": "Soy una persona amante de las mascotas",
  "phone_number": "72635236"
}
```
