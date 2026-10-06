# SmartEvent – Event Discovery & Ticket Booking System

SmartEvent is a full-stack web application for discovering events, booking tickets, generating QR-based digital tickets, receiving event notifications, and verifying tickets.

The application is built using **FastAPI, React, SQLAlchemy, SQLite, JWT authentication, and QR Code generation**.

---

## 📌 Project Overview

SmartEvent provides an end-to-end event booking experience:

* User registration and login
* JWT-based authentication
* Protected user profile and booking routes
* Event discovery
* Event search
* Category filtering
* Event details
* Ticket booking
* Ticket availability validation
* Booking history
* QR code ticket generation
* Digital ticket viewing
* Ticket download
* Ticket verification
* Booking notifications
* Event reminder notifications
* Responsive React frontend

---

# 🚀 Features

## 1. User Authentication

* User registration
* User login
* Password hashing using bcrypt
* JWT access token authentication
* Protected routes
* Current user profile endpoint
* Token stored securely in browser local storage
* Automatic authorization header using Axios interceptor

### Authentication APIs

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/users/me
```

---

## 2. Event Discovery

Users can browse available events and search/filter events.

### Event Information

Each event contains:

* Event ID
* Title
* Description
* Category
* Location
* Event date
* Ticket price
* Banner image
* Total tickets
* Available tickets
* Created date

### Supported Categories

```text
Music
Tech
Sports
Business
```

### Event APIs

```text
GET  /api/v1/events/
GET  /api/v1/events/{event_id}
POST /api/v1/events/
```

### Search and Filtering

Events can be filtered using:

```text
?search=python
?category=Tech
```

Example:

```text
GET /api/v1/events/?search=python
GET /api/v1/events/?category=Tech
```

---

# 🎟️ 3. Ticket Booking

Users can book tickets for available events.

The system automatically:

* Validates the event
* Checks ticket availability
* Validates ticket quantity
* Calculates total price
* Creates the booking
* Reduces available ticket count
* Creates a booking notification

### Booking Status

```text
PENDING
CONFIRMED
CANCELLED
```

### Booking APIs

```text
POST /api/v1/bookings/
GET  /api/v1/bookings/my-bookings
GET  /api/v1/bookings/{booking_id}
```

---

# 📱 4. QR Code Tickets

After a confirmed booking, SmartEvent generates a unique digital ticket.

Each ticket contains:

* Ticket ID
* Booking ID
* Unique ticket code
* Event name
* Event category
* Event location
* Event date
* Ticket price
* Ticket quantity
* Total amount
* QR code

QR codes are generated using the Python `qrcode` library.

Generated QR files are stored in:

```text
backend/generated_qr_codes/
```

### Ticket APIs

```text
POST /api/v1/tickets/booking/{booking_id}
GET  /api/v1/tickets/my-tickets
GET  /api/v1/tickets/{ticket_id}
GET  /api/v1/tickets/verify/{ticket_code}
```

---

# ✅ 5. Ticket Verification

SmartEvent provides ticket verification using the unique ticket code.

Users can enter a ticket code from the **Verify Ticket** page.

For a valid ticket, the system displays:

* Verification status
* Ticket code
* Ticket ID
* Booking ID
* Booking status
* Ticket quantity
* Total price
* Event name
* Event category
* Event location
* Event date
* Ticket price

Invalid or non-existing ticket codes are rejected.

Example:

```text
GET /api/v1/tickets/verify/TICKET-XXXXXXXXXXXX
```

Successful verification returns:

```json
{
  "valid": true,
  "message": "Ticket verified successfully."
}
```

---

# 🔔 6. Notifications

SmartEvent provides notifications for booking and event-related activities.

Notification types:

```text
EVENT
BOOKING
SYSTEM
```

Users can:

* View notifications
* View unread notification count
* Mark notifications as read
* Receive booking notifications
* Receive upcoming event reminders

### Notification APIs

```text
GET   /api/v1/notifications/
GET   /api/v1/notifications/unread-count
PATCH /api/v1/notifications/{notification_id}/read
```

---

# ⏰ 7. Event Reminder Notifications

The application checks upcoming booked events and generates reminder notifications.

The reminder system prevents duplicate reminder notifications for the same booking/event.

Example notification:

```text
Upcoming Event Reminder

Your event "SmartEvent Reminder Test" is coming up soon.
```

---

# 💻 Frontend

The frontend is developed using:

* React
* Vite
* React Router
* Axios
* Tailwind CSS
* React Toastify

## Frontend Pages

```text
Register
Login
Home
Event Details
Booking Confirmation
Booking History
Tickets
Verify Ticket
Notifications
```

## Frontend Components

```text
Navbar
EventCard
TicketCard
NotificationDropdown
ProtectedRoute
```

---

# 🛠️ Technology Stack

## Backend

| Technology  | Purpose             |
| ----------- | ------------------- |
| Python      | Backend programming |
| FastAPI     | REST API framework  |
| SQLAlchemy  | ORM                 |
| SQLite      | Database            |
| Pydantic    | Data validation     |
| JWT         | Authentication      |
| bcrypt      | Password hashing    |
| python-jose | JWT handling        |
| qrcode      | QR code generation  |
| Uvicorn     | ASGI server         |

## Frontend

| Technology     | Purpose             |
| -------------- | ------------------- |
| React          | UI development      |
| Vite           | Frontend build tool |
| React Router   | Routing             |
| Axios          | API communication   |
| Tailwind CSS   | Styling             |
| React Toastify | Notifications       |

---

# 📁 Project Structure

```text
SmartEvent/
│
├── backend/
│   │
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── dependencies.py
│   │   │
│   │   ├── auth/
│   │   │   ├── __init__.py
│   │   │   └── security.py
│   │   │
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   ├── events.py
│   │   │   ├── bookings.py
│   │   │   ├── tickets.py
│   │   │   └── notifications.py
│   │   │
│   │   └── services/
│   │       └── qr_service.py
│   │
│   ├── generated_qr_codes/
│   ├── tests/
│   ├── .env
│   ├── smartevent.db
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── README.md
└── .gitignore
```

---

# ⚙️ Backend Setup

## 1. Navigate to backend

```powershell
cd C:\Users\jeeva\OneDrive\Desktop\SmartEvent\backend
```

## 2. Create virtual environment

```powershell
python -m venv venv
```

## 3. Install dependencies

```powershell
pip install fastapi uvicorn sqlalchemy "pydantic[email]" python-dotenv "python-jose[cryptography]" bcrypt passlib[bcrypt] python-multipart pytest httpx "qrcode[pil]"
```

## 4. Configure environment variables

Create:

```text
backend/.env
```

Example:

```env
DATABASE_URL=sqlite:///./smartevent.db
SECRET_KEY=smartevent-secret-key-change-this-later
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

## 5. Start backend

```powershell
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Backend runs at:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

# ⚛️ Frontend Setup

## 1. Navigate to frontend

```powershell
cd C:\Users\jeeva\OneDrive\Desktop\SmartEvent\frontend
```

## 2. Install dependencies

```powershell
npm install
```

## 3. Start frontend

```powershell
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 🔐 Authentication Flow

```text
Register
   ↓
Login
   ↓
JWT Access Token
   ↓
Token stored in localStorage
   ↓
Axios attaches Bearer token
   ↓
Protected API access
```

---

# 🎫 Booking Flow

```text
Login
   ↓
Browse Events
   ↓
Select Event
   ↓
Choose Ticket Quantity
   ↓
Book Ticket
   ↓
Availability Validation
   ↓
Booking Created
   ↓
QR Ticket Generated
   ↓
Ticket Available
   ↓
Ticket Verification
```

---

# 🔔 Notification Flow

```text
Booking
   ↓
Booking Notification
   ↓
Notification Bell
   ↓
Unread Count
   ↓
Notifications Page
   ↓
Mark as Read
```

Upcoming booked events can also generate event reminder notifications.

---

# 🧪 Testing Performed

The complete application was manually tested end-to-end.

### Authentication

* Registration tested
* Login tested
* JWT authentication tested
* Protected routes tested

### Events

* Event listing tested
* Search tested
* Category filtering tested
* Event details tested

### Booking

* Ticket booking tested
* Quantity selection tested
* Total price calculation tested
* Ticket availability tested
* Booking history tested

### Tickets

* QR code generation tested
* Ticket display tested
* Ticket download tested
* Ticket code verification tested
* Invalid ticket verification tested

### Notifications

* Booking notification tested
* Notification bell tested
* Unread count tested
* Mark as read tested
* Event reminder tested

### Frontend

* Navigation tested
* Protected routes tested
* Responsive UI tested
* Toast notifications tested
* Duplicate navbar issue resolved

---

# 🛡️ Security

The application includes:

* JWT authentication
* Password hashing
* Protected API endpoints
* Token-based authorization
* Pydantic validation
* Booking ownership validation
* Environment-based secret configuration
* Error handling
* Ticket verification

---

# 📌 Sample Test Account

```text
Email:
lavanya@gmail.com

Password:
Lavanya@123
```

---

# 📌 Sample Events

### Python & AI Tech Summit

```text
Category: Tech
Location: Bangalore
Ticket Price: ₹499
```

### Bollywood Music Night

```text
Category: Music
Location: Hyderabad
Ticket Price: ₹899
```

---

# 📌 API Documentation

FastAPI automatically provides interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

Alternative ReDoc documentation:

```text
http://127.0.0.1:8000/redoc
```

---

# 🎯 Project Outcome

SmartEvent successfully implements a complete event discovery and ticket booking workflow using a modern full-stack architecture.

The system supports:

**Authentication → Event Discovery → Booking → QR Ticket → Notifications → Ticket Verification**

All major Phase 1 requirements have been implemented and tested successfully.

---

# 👩‍💻 Developer

**Lavanya D**

Full-Stack Python Developer

Project: **SmartEvent – Event Discovery & Ticket Booking System**
