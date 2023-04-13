import React, { useState, useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../UserContext"
function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const { setUser } = useContext(UserContext)

  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        "/login",
        { email, password },
        { withCredentials: true }
      )
      setUser(data)
      setRedirect(true)
    } catch (error) {
      alert("login failed")
    }
  }

  if (redirect) {
    return <Navigate to="/"></Navigate>
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 ">Вход</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <button className="primary">Войти</button>
          <div className="text-center py-2 text-gray-500">
            Не зарегистрированы?{" "}
            <Link className="underline text-black" to="/register">
              Регистрация.
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
