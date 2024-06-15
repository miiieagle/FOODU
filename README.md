# Eatry Server-Side Application

## Project Description

This project is a server-side application for an eatery, built using Node.js. The application focuses on user authentication and provides endpoints for retrieving the eatery's menu, posting new menu items, and processing orders.

## Features

- **User Authentication**: Register, login, and OTP verification functionality.
- **Menu Retrieval**: Endpoint to get the eatery's menu including dish names, descriptions, and prices.
- **Menu Management**: Endpoint to post new menu items.
- **Order Processing**: Endpoint to place orders by accepting dish IDs and quantities, and returning a confirmation message.
- **API Testing and Documentation**: API endpoints tested and documented using Postman.

## Technologies Used

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt
- Nodemailer
- dotenv
- Joi
- Cors
- OTP Generator
- Winston

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/eatry-server.git
    cd eatry-server
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env.dev` file in the root directory and add the following environment variables:
    ```plaintext
    PORT=5000
    VERSION=v1
    PASSMAILER=your_passmailer
    USER=your_email_user
    SERVICE=your_email_service
    JWT_SECRET=your_jwt_secret_key
    MONGODB_URI=mongodb://localhost:27017/eatry
    ```

4. Start the server:
    ```sh
    node app.js
    ```

### API Endpoints

#### Authentication

- **Register**: `POST /api/v1/auth/register`
    - Request body: `{ "name": "Mark Johnson", "email": "mark@example.com", "password": "password123" }`
    - Response: `{ "message": "User registered, OTP sent to email" }`

- **Verify OTP**: `POST /api/v1/auth/verify-otp`
    - Request body: `{ "email": "mark@example.com", "otp": "123456" }`
    - Response: `{ "token": "jwt_token" }`

- **Login**: `POST /api/v1/auth/login`
    - Request body: `{ "email": "mark@example.com", "password": "password123" }`
    - Response: `{ "token": "jwt_token" }`

#### Menu

- **Get Menu**: `GET /api/v1/menu`
    - Response: `[{ "name": "Pizza", "description": "Delicious cheese pizza", "price": 9.99 }, ...]`

- **Post Menu**: `POST /api/v1/menu`
    - Headers: 
        - `Authorization: Bearer <token>`
    - Request body: `{ "name": "Pizza", "description": "Delicious cheese pizza", "price": 9.99 }`
    - Response: `{ "_id": "60c72b1f4f1a2c001c9d6a2b", "name": "Pizza", "description": "Delicious cheese pizza", "price": 9.99, "__v": 0 }`

#### Orders

- **Place Order**: `POST /api/v1/orders`
    - Headers: 
        - `Authorization: Bearer <token>`
    - Request body: `{ "items": [{ "dishId": "60f8a6b8c2a1e4b3d8f1b58c", "quantity": 2 }, ...] }`
    - Response: `{ "message": "Order placed successfully", "order": { "userId": "60f8a6b8c2a1e4b3d8f1b58c", "items": [{ "dishId": "60f8a6b8c2a1e4b3d8f1b58c", "quantity": 2 }], "totalPrice": 19.98, "createdAt": "2021-07-21T14:42:34.951Z" } }`

### Running Tests

- Use Postman to test the API endpoints.

### License

This project is licensed under the MIT License.

### Acknowledgments

- Special thanks to the creators of Node.js, Express, MongoDB, and all other libraries used in this project.
