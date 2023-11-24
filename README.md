# L2_ASSIGNMENT2

## Installation

1.  **_Clone the repository:_**

```typescript
git clone https://github.com/Sakhawat0pu/L2_Assignment2.git
```

2. **_Navigate to the project directory:_**

```typescript
cd L2_Assignment2
```

3. **_Install dependencies:_**

```typescript
npm install
```

## Configuration

**_Create a `.env` file in the project root:_**

```typescript
NODE_ENV=development
PORT=8080
DB_URI= // user your MongoDB uri
BCRYPT_SALT_ROUND=  // Use any number as salt
```

## Running the Application

```typescript
npm run start:dev
// or
npm run start:prod
```

`The server will start on http://localhost:8080/`

## API Endpoints

1. **Create User**

   - _Endpoint_: **POST /api/users**
   - _URL_: `http://localhost:8080/api/users`
   - _Request Body_: JSON payload with user details
   - _Example_:

   ```typescript
    {
        "userId": 14,
        "username": "david_wills",
        "password": "SecretPass456!",
        "fullName": {
            "firstName": "David",
            "lastName": "Williams"
        },
        "age": 27,
        "email": "david.williams@example.com",
        "isActive": true,
        "hobbies": ["Gaming", "Traveling"],
        "address": {
            "street": "202 Elm St",
            "city": "Cityville",
            "country": "Countryland"
            }
    }
   ```

2. **Get All Users**

   - _Endpoint_: **GET /api/users**
   - _URL_: `http://localhost:8080/api/users`

3. **Get Single User By ID**

   - _Endpoint_: **GET /api/users/:userId**
   - _URL_: `http://localhost:8080/api/users/6`

4. **Update User Information**

   - _Endpoint_: **PUT /api/users/:userId**
   - _URL_: `http://localhost:8080/api/users/5`
   - _Request Body_: JSON payload with updated user details
   - _Example_:

   ```typescript
    {
        "hobbies": ["Gaming", "Traveling", "Fishing"],
        "address": {
            "street": "202 Elm St",
            "city": "Cityville",
            "country": "Countryland"
            }
    }
   ```

5. **Delete A User By ID**

   - _Endpoint_: **DELETE /api/users/:userId**
   - _URL_: `http://localhost:8080/api/users/5`

6. **Add New Product in Order**

   - _Endpoint_: **PUT /api/users/:userId/orders**
   - _URL_: `http://localhost:8080/api/users/5/orders`
   - _Request Body_: JSON payload with updater order
   - _Example_:

   ```typescript
    {
        "productName": "Apple M1 pro",
        "price": 2799,
        "quantity": 2,
    }
   ```

7. **Get all orders for a specific user**

   - _Endpoint_: `GET api/users/:userId/orders`
   - _URL_: `http://localhost:8080/api/users/4/orders`

8. **Calculate Total Price of Orders for a Specific User**
   - _Endpoint_: `GET api/users/:userId/orders/total-price`
   - _URL_: `http://localhost:8080/api/users/:userId/orders/total-price`
