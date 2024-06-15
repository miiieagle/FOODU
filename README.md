# Eatry Server-Side Application

## Project Description

This project is a server-side application for an eatery, built using Node.js. The application focuses on user authentication and provides endpoints for retrieving the eatery's menu and processing orders.

## Features

- **User Authentication**: Register and login functionality using email and password.
- **Menu Retrieval**: Endpoint to get the eatery's menu including dish names, descriptions, and prices.
- **Order Processing**: Endpoint to place orders by accepting dish IDs and quantities, and returning a confirmation message.
- **OTP Verification**: Send OTP to email for user verification.
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

3. Create a `.env` file in the root directory and add the following environment variables:
    ```plaintext
    # MongoDB connection string
    MONGO_URI=mongodb://localhost:27017/eatry

    # JWT Secret key
    JWT_SECRET=your_jwt_secret_key

    # Server port
    PORT=5000

    # Email configuration for nodemailer
    EMAIL_HOST=smtp.example.com
    EMAIL_PORT=587
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password

    # API Version
    API_VERSION=v1
    ```

4. Start the server:
    ```sh
    npm start
    ```

### API Endpoints

#### Authentication

- **Register**: `POST /api/v1/auth/register`
    - Request body: `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }`
    - Response: `{ "message": "User registered, OTP sent to email" }`

- **Verify OTP**: `POST /api/v1/auth/verify-otp`
    - Request body: `{ "email": "john@example.com", "otp": "123456" }`
    - Response: `{ "token": "jwt_token" }`

- **Login**: `POST /api/v1/auth/login`
    - Request body: `{ "email": "john@example.com", "password": "password123" }`
    - Response: `{ "token": "jwt_token" }`

#### Menu

- **Get Menu**: `GET /api/v1/menu`
    - Response: `[{ "name": "Pizza", "description": "Delicious cheese pizza", "price": 9.99 }, ...]`

#### Orders

- **Place Order**: `POST /api/v1/orders`
    - Headers: `{ "Authorization": "Bearer jwt_token" }`
    - Request body: `{ "items": [{ "dishId": "60f8a6b8c2a1e4b3d8f1b58c", "quantity": 2 }, ...] }`
    - Response: `{ "message": "Order placed successfully", "order": { "userId": "60f8a6b8c2a1e4b3d8f1b58c", "items": [{ "dishId": "60f8a6b8c2a1e4b3d8f1b58c", "quantity": 2 }], "totalPrice": 19.98, "createdAt": "2021-07-21T14:42:34.951Z" } }`

### Running Tests

- Use Postman to test the API endpoints.

### License

This project is licensed under the MIT License.

### Acknowledgments

- Special thanks to the creators of Node.js, Express, MongoDB, and all other libraries used in this project.
