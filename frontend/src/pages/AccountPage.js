import React, { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Link, Navigate, useParams } from "react-router-dom"
import axios from "axios"

function AccountPage() {
  const [redirect, setRedirect] = useState("")
  let { subpage } = useParams()
  if (subpage === undefined) {
    subpage = "profile"
  }
  const { user, ready, setUser } = useContext(UserContext)

  function linkClasses(type = null) {
    let classes = "py-2 px-6"
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full"
    }
    return classes
  }

  async function logout() {
    await axios.post("/logout", {})
    setRedirect("/")
    setUser(null)
  }

  if (redirect) {
    return <Navigate to={redirect}></Navigate>
  }

  if (!ready) {
    return "Loading.."
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"}></Navigate>
  }

  return (
    <div>
      <nav className="w-full flex justify-center m-8 gap-2">
        <Link className={linkClasses("profile")} to={"/account/profile"}>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email}) <br />{" "}
          <button onClick={logout} className="mt-5 primary max-w-sm">
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default AccountPage
