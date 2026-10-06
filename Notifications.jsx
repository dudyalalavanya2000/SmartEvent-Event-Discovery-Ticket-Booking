import { useEffect, useState } from "react"
import { toast } from "react-toastify"

import api from "../services/api"
import Navbar from "../components/Navbar"

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await api.get("/notifications/")

      setNotifications(response.data)
    } catch (error) {
      console.error("Failed to fetch notifications:", error)

      toast.error(
        error.response?.data?.detail ||
          "Failed to load notifications"
      )
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      await api.patch(
        `/notifications/${notificationId}/read`
      )

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                is_read: true,
              }
            : notification
        )
      )

      toast.success("Notification marked as read")
    } catch (error) {
      console.error("Failed to mark notification:", error)

      toast.error(
        error.response?.data?.detail ||
          "Failed to update notification"
      )
    }
  }

  const getNotificationIcon = (type) => {
    if (type === "BOOKING") {
      return "🎟️"
    }

    if (type === "EVENT") {
      return "⏰"
    }

    return "🔔"
  }

  const getNotificationStyle = (type) => {
    if (type === "BOOKING") {
      return "bg-green-50 border-green-200"
    }

    if (type === "EVENT") {
      return "bg-blue-50 border-blue-200"
    }

    return "bg-slate-50 border-slate-200"
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Notifications
          </h1>

          <p className="mt-2 text-slate-600">
            Stay updated with your bookings and upcoming events.
          </p>
        </div>

        {loading && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">
              Loading notifications...
            </p>
          </div>
        )}

        {!loading && notifications.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🔔</div>

            <h2 className="mt-4 text-xl font-semibold text-slate-800">
              No notifications
            </h2>

            <p className="mt-2 text-slate-500">
              You are all caught up!
            </p>
          </div>
        )}

        {!loading && notifications.length > 0 && (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-xl border p-5 shadow-sm transition ${
                  notification.is_read
                    ? "bg-white opacity-75"
                    : getNotificationStyle(
                        notification.type
                      )
                }`}
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                    {getNotificationIcon(
                      notification.type
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-semibold text-slate-900">
                            {notification.title}
                          </h2>

                          {!notification.is_read && (
                            <span className="rounded-full bg-indigo-600 px-2 py-1 text-xs font-semibold text-white">
                              New
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {notification.message}
                        </p>
                      </div>

                      {!notification.is_read && (
                        <button
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                          className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="rounded-full bg-white px-3 py-1 font-medium">
                        {notification.type}
                      </span>

                      <span>
                        {notification.created_at
                          ? new Date(
                              notification.created_at
                            ).toLocaleString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Notifications