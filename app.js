const express = require("express")
const routerUsers = require("./users/router-users")
const routerPets = require("./pets/router-pets")
const routerAlbums = require("./albums/router-albums")
const routerUpload = require("./upload/router-upload")
const routerPhotos = require("./photos/router-photos")
const routerSubscriptions = require("./subscriptions/router-subscriptions")
const routerFriends = require("./friends/router-friends")
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")

mongoose.connect(process.env.BD, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const app = express()
const port = process.env.PORT || 8080
app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(cors())

app.use("/users", routerUsers)
app.use("/pets", routerPets)
app.use("/albums", routerAlbums)
app.use("/photos", routerPhotos)
app.use("/subscriptions", routerSubscriptions)
app.use("/friends", routerFriends)

app.use(express.static(__dirname + "/public"), routerUpload)

app.listen(port, () => {
  console.log("server on port " + port)
})
