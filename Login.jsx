import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import api from "../services/api"


function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)


  const handleLogin = async (event) => {
    event.preventDefault()

    if (!email || !password) {
      toast.error("Please enter email and password")
      return
    }

    setLoading(true)

    try {
      const formData = new URLSearchParams()

      formData.append("username", email)
      formData.append("password", password)

      const response = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      const token = response.data.access_token

      localStorage.setItem(
        "access_token",
        token
      )

      toast.success("Login successful!")

      navigate("/")
    } catch (error) {
      const message =
        error.response?.data?.detail ||
        "Login failed. Please check your credentials."

      toast.error(message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-blue-600">
            SmartEvent
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back
          </p>

        </div>


        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          <div>

            <label className="mb-2 block font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            />

          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        <p className="mt-6 text-center text-slate-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  )
}

export default Login