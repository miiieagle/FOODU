# FOODU

FOODU is a food ordering application where users can browse the menu, place orders, and receive OTP verification for account security. Admin users have the ability to manage the menu items.

## Features

- User registration with OTP verification
- User login with OTP
- JWT-based authentication
- Role-based access control (Admin and User roles)
- Admin can manage menu items (add, update, delete)
- Users can browse menu items and place orders

## Technologies Used

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)
- Bcrypt
- Nodemailer
- dotenv
- Joi
- body-parser
- OTP Generator
- Winston
- Cors

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

- Node.js (v14.x or later)
- MongoDB (local or Atlas)
- npm (v6.x or later)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/miiieagle/FOODU.git
    cd FOODU
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env.dev` file in the root directory and add the following environment variables:

    ```env
    PORT=5000
    JWT_SECRET=your_jwt_secret
    MONGODB_URI=your_mongodb_url
    EMAIL_USER=your_email@example.com
    EMAIL_PASS=your_email_password
    VERSION=v1
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
        "name": "Mark Johnson",
        "email": "mark@example.com",
        "password": "password123"
      }
      ```

- **Verify OTP**
    - URL: `/api/v1/auth/verify-otp`
    - Method: `POST`
    - Body:
      ```json
      {
        "email": "mark@example.com",
        "otp": "123456"
      }
      ```

- **Login Request OTP**
    - URL: `/api/v1/auth/login-request-otp`
    - Method: `POST`
    - Body:
      ```json
      {
        "email": "mark@example.com",
        "password": "password123"
      }
      ```

- **Verify Login OTP**
    - URL: `/api/v1/auth/verify-login-otp`
    - Method: `POST`
    - Body:
      ```json
      {
        "email": "mark@example.com",
        "otp": "123456"
      }
      ```

- **Promote to Admin**
    - URL: `/api/v1/auth/promote-to-admin`
    - Method: `POST`
    - Body:
      ```json
      {
        "email": "mark@example.com"
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


### Running Tests

- Use Postman to test the API endpoints.

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
```
## License

This project is licensed under the MIT License.

## Acknowledgments

- Special thanks to the creators of Node.js, Express, MongoDB, and all other libraries used in this project.
