import "./App.css"
import { Routes, Route } from "react-router-dom"
import IndexPage from "./pages/IndexPage"
import LoginPage from "./pages/LoginPage"
import Layout from "./Layout"
import RegisterPage from "./pages/RegisterPage"
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import AccountPage from "./pages/AccountPage"

axios.defaults.baseURL = "http://localhost:81"
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<IndexPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/account/:subpage?" element={<AccountPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App