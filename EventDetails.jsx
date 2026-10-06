import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

import api from "../services/api"
import Navbar from "../components/Navbar"


function EventDetails() {
  const { eventId } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)


  const fetchEvent = async () => {
    try {
      const response = await api.get(
        `/events/${eventId}`
      )

      setEvent(response.data)

    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
        "Unable to load event"
      )
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    fetchEvent()
  }, [eventId])


  const handleBooking = async () => {
    if (!event) {
      return
    }

    if (quantity > event.available_tickets) {
      toast.error("Not enough tickets available")
      return
    }

    setBooking(true)

    try {
      const response = await api.post(
        "/bookings/",
        {
          event_id: event.id,
          ticket_quantity: quantity,
        }
      )

      toast.success(
        "Booking confirmed successfully!"
      )

      navigate(
        `/booking-confirmation/${response.data.id}`
      )

    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
        "Booking failed"
      )
    } finally {
      setBooking(false)
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100">

        <Navbar />

        <div className="py-20 text-center text-lg text-slate-500">
          Loading event...
        </div>

      </div>
    )
  }


  if (!event) {
    return (
      <div className="min-h-screen bg-slate-100">

        <Navbar />

        <div className="py-20 text-center">

          <h2 className="text-2xl font-bold text-slate-700">
            Event not found
          </h2>

        </div>

      </div>
    )
  }


  const totalPrice =
    event.ticket_price * quantity


  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-10">

        <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

          {/* Banner */}

          {event.banner_image ? (

            <img
              src={event.banner_image}
              alt={event.title}
              className="h-80 w-full object-cover"
            />

          ) : (

            <div className="flex h-80 items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">

              <span className="text-8xl">
                🎫
              </span>

            </div>

          )}


          {/* Details */}

          <div className="p-8">

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

              <div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                  {event.category}
                </span>

                <h1 className="mt-4 text-4xl font-bold text-slate-800">
                  {event.title}
                </h1>

              </div>

              <div className="text-3xl font-bold text-green-600">
                ₹{event.ticket_price}
              </div>

            </div>


            <p className="mt-6 leading-7 text-slate-600">
              {event.description}
            </p>


            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Location
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  📍 {event.location}
                </p>
              </div>


              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Event Date
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  📅{" "}
                  {new Date(
                    event.event_date
                  ).toLocaleString()}
                </p>
              </div>


              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Available Tickets
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  🎟️ {event.available_tickets}
                </p>
              </div>


              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">
                  Ticket Price
                </p>

                <p className="mt-1 font-semibold text-green-600">
                  ₹{event.ticket_price}
                </p>
              </div>

            </div>


            {/* Booking */}

            {event.available_tickets > 0 ? (

              <div className="mt-8 rounded-2xl border border-slate-200 p-6">

                <h2 className="text-xl font-bold text-slate-800">
                  Book Your Tickets
                </h2>


                <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end">

                  <div>

                    <label className="mb-2 block font-medium text-slate-700">
                      Number of Tickets
                    </label>

                    <select
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Number(e.target.value)
                        )
                      }
                      className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                    >

                      {Array.from(
                        {
                          length: Math.min(
                            event.available_tickets,
                            10
                          )
                        },
                        (_, index) => index + 1
                      ).map((number) => (

                        <option
                          key={number}
                          value={number}
                        >
                          {number}
                        </option>

                      ))}

                    </select>

                  </div>


                  <div className="flex-1">

                    <p className="text-sm text-slate-500">
                      Total Price
                    </p>

                    <p className="text-2xl font-bold text-green-600">
                      ₹{totalPrice.toFixed(2)}
                    </p>

                  </div>


                  <button
                    onClick={handleBooking}
                    disabled={booking}
                    className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {booking
                      ? "Booking..."
                      : "Book Tickets"}
                  </button>

                </div>

              </div>

            ) : (

              <div className="mt-8 rounded-xl bg-red-50 p-5 text-center font-semibold text-red-600">
                This event is sold out.
              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  )
}


export default EventDetails