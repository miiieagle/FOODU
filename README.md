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
    git clone https://github.com/miiieagle/FOODU.git
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
    
4. Start the Node.js server:

    ```sh
    npm run dev
    ```

### API Endpoints

#### Auth Routes

- **Register User**
    - URL: `/api/v1/auth/register`
    - Method: `POST`
    - Body:
      ```json
      {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123"
      }
      ```

- **Verify OTP**
    - URL: `/api/v1/auth/verify-otp`
    - Method: `POST`
    - Body:
      ```json
      {
        "email": "john@example.com",
        "otp": "123456"
      }
      ```

- **Login Request OTP**
    - URL: `/api/v1/auth/login-request-otp`
    - Method: `POST`
    - Body:
      ```json
      {
        "email": "john@example.com",
        "password": "password123"
      }
      ```

- **Verify Login OTP**
    - URL: `/api/v1/auth/verify-login-otp`
    - Method: `POST`
    - Body:
      ```json
      {
        "email": "john@example.com",
        "otp": "123456"
      }
      ```

- **Promote to Admin**
    - URL: `/api/v1/auth/promote-to-admin`
    - Method: `POST`
    - Body:
      ```json
      {
        "email": "john@example.com"
      }
      ```

#### Menu Routes

- **Get Menu**
    - URL: `/api/v1/menu`
    - Method: `GET`

- **Add Menu Item (Admin only)**
    - URL: `/api/v1/menu`
    - Method: `POST`
    - Headers:
      - `Authorization: Bearer <admin_jwt_token>`
    - Body:
      ```json
      {
        "name": "Pizza",
        "description": "Delicious cheese pizza with fresh ingredients",
        "price": 9.99
      }
      ```

#### Order Routes

- **Place Order**
    - URL: `/api/v1/orders`
    - Method: `POST`
    - Headers:
      - `Authorization: Bearer <user_jwt_token>`
    - Body:
      ```json
      {
        "items": [
          {
            "menuId": "666dcf11f1717d230d3c8868",
            "quantity": 2
          },
          {
            "menuId": "666dcfc3f1717d230d3c886b",
            "quantity": 1
          },
          {
            "menuId": "666dd170f1717d230d3c8871",
            "quantity": 3
          }
        ]
      }
      ```

### Using Postman

#### Register User

1. Open Postman and create a new request.
2. Set the request type to `POST`.
3. Enter the URL: `http://localhost:5000/api/v1/auth/register`.
4. Go to the `Body` tab, select `raw`, and choose `JSON` from the dropdown.
5. Enter the following JSON:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
6. Click `Send`.

#### Verify OTP

1. Open Postman and create a new request.
2. Set the request type to `POST`.
3. Enter the URL: `http://localhost:5000/api/v1/auth/verify-otp`.
4. Go to the `Body` tab, select `raw`, and choose `JSON` from the dropdown.
5. Enter the following JSON:
    ```json
    {
      "email": "john@example.com",
      "otp": "123456"
    }
    ```
6. Click `Send`.

#### Login Request OTP

1. Open Postman and create a new request.
2. Set the request type to `POST`.
3. Enter the URL: `http://localhost:5000/api/v1/auth/login-request-otp`.
4. Go to the `Body` tab, select `raw`, and choose `JSON` from the dropdown.
5. Enter the following JSON:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
6. Click `Send`.

#### Verify Login OTP

1. Open Postman and create a new request.
2. Set the request type to `POST`.
3. Enter the URL: `http://localhost:5000/api/v1/auth/verify-login-otp`.
4. Go to the `Body` tab, select `raw`, and choose `JSON` from the dropdown.
5. Enter the following JSON:
    ```json
    {
      "email": "john@example.com",
      "otp": "123456"
    }
    ```
6. Click `Send`.

#### Promote to Admin

1. Open Postman and create a new request.
2. Set the request type to `POST`.
3. Enter the URL: `http://localhost:5000/api/v1/auth/promote-to-admin`.
4. Go to the `Body` tab, select `raw`, and choose `JSON` from the dropdown.
5. Enter the following JSON:
    ```json
    {
      "email": "john@example.com"
    }
    ```
6. Click `Send`.

#### Add Menu Item (Admin only)

1. Open Postman and create a new request.
2. Set the request type to `POST`.
3. Enter the URL: `http://localhost:5000/api/v1/menu`.
4. Go to the `Headers` tab.
5. Add the following headers:
    - `Authorization: Bearer <admin_jwt_token>`
    - `Content-Type: application/json`
6. Go to the `Body` tab, select `raw`, and choose `JSON` from the dropdown.
7. Enter the following JSON:
    ```json
    {
      "name": "Pizza",
      "description": "Delicious cheese pizza with fresh ingredients",
      "price": 9.99
    }
    ```
8. Click `Send`.

#### Place Order

1. Open Postman and create a new request.
2. Set the request type to `POST`.
3. Enter the URL: `http://localhost:5000/api/v1/orders`.
4. Go to the `Headers` tab.
5. Add the following headers:
    - `Authorization: Bearer <user_jwt_token>`
    - `Content-Type: application/json`
6. Go to the `Body` tab, select `raw`, and choose `JSON` from the dropdown.
7. Enter the following JSON:
    ```json
    {
      "items": [
        {
          "menuId": "666dcf11f1717d230d3c8868",
          "quantity": 2
        },
        {
          "menuId": "666dcfc3f1717d230d3c886b",
          "quantity": 1
        },
        {
          "menuId": "666dd170f1717d230d3c8871",
          "quantity": 3
        }
      ]
    }
    ```
8. Click `Send`.

## Project Structure

```plaintext
eatry-server/
├── config/
│   └── envConfig.js
├── controllers/
│   ├── authController.js
│   ├── menuController.js
│   └── orderController.js
├── middleware/
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│   └── handler.js
├── models/
│   ├── User.js
│   ├── Menu.js
│   └── Order.js
├── routes/
│   ├── authRoutes.js
│   ├── menuRoutes.js
│   └── orderRoutes.js
├── operations/
│   ├── routes.js
│   └── db.js
├── utils/
│   └── email.js
├── statusCodes.js
├── .env.dev
├── app.js
└── package.json

### Running Tests

- Use Postman to test the API endpoints.

### License

This project is licensed under the MIT License.

### Acknowledgments

- Special thanks to the creators of Node.js, Express, MongoDB, and all other libraries used in this project.
