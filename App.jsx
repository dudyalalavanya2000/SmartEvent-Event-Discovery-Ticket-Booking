
import { Navigate, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import ProtectedRoute from "./components/ProtectedRoute"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import EventDetails from "./pages/EventDetails"
import BookingConfirmation from "./pages/BookingConfirmation"
import BookingHistory from "./pages/BookingHistory"
import Tickets from "./pages/Tickets"
import Notifications from "./pages/Notifications"
import VerifyTicket from "./pages/VerifyTicket"

function App() {
  return (
    <Routes>
      {/* =========================
          PUBLIC ROUTES
      ========================== */}

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* =========================
          PROTECTED ROUTES
      ========================== */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Home />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/events/:eventId"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <EventDetails />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking-confirmation/:bookingId"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <BookingConfirmation />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <BookingHistory />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Tickets />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/verify-ticket"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <VerifyTicket />
            </>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Notifications />
            </>
          </ProtectedRoute>
        }
      />

      {/* =========================
          FALLBACK ROUTE
      ========================== */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}

export default App
