
# NextBus-Backend

This is the backend service for **NextBus**, built with **Node.js, Express, and MongoDB**.
It provides authentication APIs (`/register`, `/login`) and can be tested using **Postman**.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/UdhyaKumarKMIT/NextBus-Backend.git
cd NextBus-Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The server will start at:
👉 `http://localhost:5000`

---

## 🛠 Environment Setup

Make sure you have **MongoDB running locally** (default URI `mongodb://127.0.0.1:27017/auth_demo`).


---
Perfect! I can create a **complete API documentation** for your project that you can directly put in your GitHub README. I’ll list all endpoints, HTTP methods, request bodies, and responses. I’ll assume your APIs are modularized as `/auth` (authentication) and `/book` (bus booking/search).

---

# **NextBus API **

Base URL: `http://localhost:5000`

---

## **1️⃣ Authentication APIs (`/auth`)**

### **Register**

* **Endpoint:** `POST /auth/register`
* **Request Body (JSON):**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

* **Response (Success):**

```json
{
  "message": "User registered successfully"
}
```

* **Errors:**

  * Passwords do not match → 400
  * Username or email already exists → 400

---

### **Login**

* **Endpoint:** `POST /auth/login`
* **Request Body (JSON):**

```json
{
  "username": "john_doe",
  "password": "password123"
}
```

> You can use either `username` or `email` in the `username` field.

* **Response (Success):**

```json
{
  "message": "Login successful"
}
```

* **Errors:**

  * User not found → 401
  * Invalid password → 401

---

### **Forgot Password**

* **Endpoint:** `POST /auth/forgot-password`
* **Request Body (JSON):**

```json
{
  "email": "john@example.com"
}
```

* **Response (Success):**

```json
{
  "message": "Reset code sent to email"
}
```

* **Errors:**

  * User not found → 404

> Sends a 6-digit reset code to the user’s email (valid for 10 minutes).

---

### **Reset Password**

* **Endpoint:** `POST /auth/reset-password`
* **Request Body (JSON):**

```json
{
  "email": "john@example.com",
  "code": "123456",
  "newPassword": "newpassword123"
}
```

* **Response (Success):**

```json
{
  "message": "Password reset successful"
}
```

* **Errors:**

  * Invalid or expired reset code → 400
  * User not found → 404

---

## **2️⃣ Bus Booking APIs (`/book`)**

> Replace `/book` with your router path if different.

### **Search Buses**

* **Endpoint:** `POST /book/search_bus`
* **Request Body (JSON):**

```json
{
  "source": "Tabaram",
  "destination": "Trichy",
  "date": "2025-09-21"
}
```

* **Response (Success):**

```json
{
  "buses": [
    {
      "busId": "BUS123",
      "name": "Express Line",
      "departure": "08:00 AM",
      "arrival": "12:00 PM",
      "availableSeats": 20,
      "fare": 250
    },
    {
      "busId": "BUS456",
      "name": "Rapid Travels",
      "departure": "09:30 AM",
      "arrival": "01:30 PM",
      "availableSeats": 15,
      "fare": 280
    }
  ]
}
```

* **Errors:**

  * No buses found → 404

---
