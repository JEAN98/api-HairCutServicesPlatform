# 💇‍♂️ HairCut Services Platform API

![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen.svg)
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

A RESTful API built with **Node.js**, **Express**, and **Sequelize** for managing haircut and salon service operations.  
It provides full CRUD functionality for salons, workers, appointments, schedules, and user accounts — forming the backend foundation for a modern haircut booking platform.

---

## 📖 Overview / Introduction

The **HairCut Services Platform API** is designed to manage the data and operations of a barbershop or hair salon ecosystem.  
It allows clients to browse available services, book appointments, and interact with salon workers, while administrators can manage workers, schedules, and reports.

This backend service exposes a clean set of REST endpoints for integrating with web or mobile frontends.  
It includes validation, authentication, and role-based access control using JWT tokens.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/JEAN98/api-HairCutServicesPlatform.git
cd api-HairCutServicesPlatform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the example environment file and update values as needed:

```bash
cp .env-copy .env
```

Then fill in your `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASS=your_password
DB_NAME=haircut_services
JWT_SECRET=your_secret_key
```

### 4. Database Setup

Initialize and seed the PostgreSQL database:

```bash
psql -U <your_user> -d <your_database> -f script.sql
psql -U <your_user> -d <your_database> -f script_data.sql
```

### 5. Run the Server

Start the development server:

```bash
npm run dev
```

Server runs by default on [http://localhost:3000](http://localhost:3000)

---

## ▶️ Usage

You can test endpoints using **Postman** or **cURL**.

**Example: Create a new appointment**

```bash
POST /api/appoiment
Content-Type: application/json

{
  "clientId": 1,
  "workerId": 3,
  "serviceId": 2,
  "date": "2025-11-10",
  "time": "15:30"
}
```

**Example: Login**

```bash
POST /api/session/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

Include your JWT token in subsequent requests:

```
Authorization: Bearer <token>
```

---

## 🧩 Configuration

Located in `src/config/`:
- `db.config.js` — Database connection settings
- `env.js` — Loads environment variables
- `tableAssociation.js` — Defines Sequelize model relations

---

## 🗂️ Folder Structure

```
api-HairCutServicesPlatform/
├── .circleci/                 # CI/CD configuration
├── src/
│   ├── app.js                 # Express app entry point
│   ├── server.js              # Server bootstrap
│   ├── config/                # DB + environment configs
│   ├── controllers/           # Request handlers
│   ├── middleware/            # JWT, error handling, validators
│   ├── models/                # Sequelize models
│   ├── repositories/          # Database access layer
│   ├── routes/                # API endpoints
│   ├── services/              # Business logic
│   ├── utils/                 # Helper utilities
│   └── test/                  # Unit tests (Mocha + Chai)
├── package.json
├── script.sql
├── script_data.sql
└── .env-copy
```

---

## 🛠️ Technologies Used

| Purpose | Technology |
|----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| ORM | Sequelize |
| Database | PostgreSQL |
| Auth | JWT (json-web-token) |
| Validation | Joi, express-validator |
| Testing | Mocha, Chai, chai-http |
| CI/CD | CircleCI |
| Environment | dotenv |
| Date Utils | date-fns, luxon |

---

## 🤝 Contributing

Contributions are welcome!  

1. Fork the repo  
2. Create a new branch (`feature/my-feature`)  
3. Commit and push  
4. Open a Pull Request  

Run all tests before submitting:
```bash
npm test
```

---

## 📜 License

Licensed under the **MIT License**.  
You’re free to use, modify, and distribute under the same terms.

---

## 🌐 Additional Notes

- **Testing:** Implemented with Mocha & Chai (`/src/test/`)
- **CI/CD:** Configured via CircleCI
- **Ready for Deployment:** Easily adaptable for Docker or cloud hosting

---

### 💈 Developed by Jean Carlo Vega Bejarano
> “Building digital tools that streamline real-world services — one haircut at a time.”
