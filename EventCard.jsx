import { Link } from "react-router-dom"


function EventCard({ event }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">

      {event.banner_image ? (
        <img
          src={event.banner_image}
          alt={event.title}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="flex h-48 items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <span className="text-5xl">🎫</span>
        </div>
      )}

      <div className="p-5">

        <div className="mb-3 flex items-center justify-between">

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {event.category}
          </span>

          <span className="font-bold text-green-600">
            ₹{event.ticket_price}
          </span>

        </div>

        <h2 className="text-xl font-bold text-slate-800">
          {event.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {event.description}
        </p>

        <div className="mt-4 space-y-2 text-sm text-slate-500">

          <p>📍 {event.location}</p>

          <p>
            📅{" "}
            {new Date(event.event_date).toLocaleString()}
          </p>

          <p>
            🎟️ {event.available_tickets} tickets available
          </p>

        </div>

        <Link
          to={`/events/${event.id}`}
          className="mt-5 block rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          View Event
        </Link>

      </div>

    </div>
  )
}


export default EventCard