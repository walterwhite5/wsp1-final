import "dotenv/config"
import logger from "morgan"
import express from "express"
import nunjucks from "nunjucks"
import session from "express-session"
import bcrypt, { hash } from "bcrypt"


const app = express()
const port = 3000

nunjucks.configure("views", {
  autoescape: true,
  express: app,
})

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: true }
}))

app.use(express.static("public"))

app.use(logger("dev"))



app.get("/", (req, res) => {
  if (req.session.views) {
    req.session.views++
  } else {
    req.session.views = 1
  }
  res.render("index.njk",
    { title: "Test", message: "Funkar?", views: req.session.views }
  )
})


app.get("/login", (req,res) => {
})


app.post("/login", (req, res) => {
  console.log(req.body)
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
