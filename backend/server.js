const express = require("express")
const bcrypt = require("bcryptjs")
const mongoose = require("mongoose")
require("dotenv").config()
const User = require("./models/User.js")
const cors = require("cors")
const app = express()
const jwt = require("jsonwebtoken")
mongoose.connect(process.env.MONGO_URI)
const cookieParser = require("cookie-parser")

app.use(express.json())

app.use(
  cors({
    credentials: true,
    origin: true,
  })
)

app.use(cookieParser())

app.get("/test", (req, res) => {
  res.json("ok")
})

const bcryptSalt = bcrypt.genSaltSync(8)
const jwtsecret = "54ghyut4fdf"

//register
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  try {
    const newuser = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(newuser)
  } catch (e) {
    res.status(422).json(e)
  }
})
//login
app.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const existeduser = await User.findOne({
      email,
    })
    if (existeduser) {
      const passok = bcrypt.compareSync(password, existeduser.password)
      if (passok) {
        jwt.sign(
          {
            email: existeduser.email,
            id: existeduser._id,
            name: existeduser._id,
          },
          jwtsecret,
          {},
          (err, token) => {
            if (err) throw err
            res.cookie("token", token).json(existeduser)
          }
        )
      } else res.status(422).json("password not ok")
    } else {
      res.status(422).json("not found")
    }
  } catch (e) {
    res.status(422).json(e)
  }
})
//profile
app.get("/profile", async (req, res) => {
  const { token } = req.cookies
  if (token) {
    jwt.verify(token, jwtsecret, {}, async (err, userData) => {
      if (err) throw err
      console.log(userData)
      const { name, email, _id } = await User.findById(userData.id)
      res.json({ name, email, _id })
    })
  } else res.json(null)
})

//logout
app.post("/logout", async (req, res) => {
  res.cookie("token", "").json(true)
})

app.listen(81, () => console.log("listening 81"))
