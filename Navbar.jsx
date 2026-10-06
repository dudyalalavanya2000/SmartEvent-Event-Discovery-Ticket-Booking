
import { Link, useNavigate } from "react-router-dom"
import NotificationDropdown from "./NotificationDropdown"

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <nav className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-blue-600"
        >
          🎟️ SmartEvent
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            Events
          </Link>

          <Link
            to="/bookings"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            My Bookings
          </Link>

          <Link
            to="/tickets"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            My Tickets
          </Link>

          {/* Verify Ticket */}
          <Link
            to="/verify-ticket"
            className="text-sm font-medium text-slate-700 transition hover:text-blue-600"
          >
            Verify Ticket
          </Link>

          {/* Notifications */}
          <NotificationDropdown />

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

