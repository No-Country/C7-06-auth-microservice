# C7-06-auth-microservice

Servidor de autenticación provisional

## User Endpoints:

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

- https://c7-06-authentication.up.railway.app/api/users/

### GET: Get user by ID

- https://c7-06-authentication.up.railway.app/api/users/:id

### PUT: Update User Info

Requires an authenticated user

- https://c7-06-authentication.up.railway.app/api/users/:id/update

Body with data to update:

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

### DELETE: Delete user

Requires an authenticated user

- https://c7-06-authentication.up.railway.app/api/users/:id/delete

<hr>

## Pet Endpoints:

### POST: Create Pet

- https://c7-06-authentication.up.railway.app/api/pets/create

Body:

```json
{
  "age": 1,
  "animal_type": "dog",
  "description": "Un perrito muy jugueton y divertido",
  "gender": "macho",
  "pure_race": false,
  "race": "Caniche",
  "size": "Pequeño",
  "vaccinations_up_to_date": true,
  "name": "Pepe",
  "weight": 3.5
}
```

### GET: Get All Pets

- https://c7-06-authentication.up.railway.app/api/pets/

### GET: Get Pet By ID

- https://c7-06-authentication.up.railway.app/api/pets/:id

### PUT: Update Pet Info

- https://c7-06-authentication.up.railway.app/api/pets/:id/update

Body with data to update:

```json
{
  "age": 1,
  "animal_type": "dog",
  "description": "Un perrito muy jugueton y divertido",
  "gender": "macho",
  "pure_race": false,
  "race": "Caniche",
  "size": "Pequeño",
  "vaccinations_up_to_date": true,
  "name": "Pepe",
  "weight": 3.5
}
```

### DELETE: Delete Pet

- https://c7-06-authentication.up.railway.app/api/pets/:id/delete
