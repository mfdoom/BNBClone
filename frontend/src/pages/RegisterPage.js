import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  async function registerHandler(event) {
    event.preventDefault()
    try {
      await axios.post("/register", { name, email, password })
      alert("Регистрация прошла успешно.")
    } catch {
      alert("Проверьте данные.")
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 ">Регистрация</h1>
        <form className="max-w-md mx-auto" onSubmit={registerHandler}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="off"
          />
          <input
            type="email"
            placeholder="your@email.ru"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="off"
          />
          <button className="primary" type="submit">
            Зарегистрировать
          </button>
          <div className="text-center py-2 text-gray-500">
            Уже есть акканут?{" "}
            <Link className="underline text-black" to="/login">
              Войти.
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
