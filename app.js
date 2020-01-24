const express = require("express")
const routerUsers = require("./users/router-users")
const routerPets = require("./pets/router-pets")
const routerUpload = require("./upload/router-upload")
const mongoose = require("mongoose")
require('dotenv').config()

mongoose.connect(process.env.BD, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const app = express()
const port = process.env.PORT || 8080
app.use(express.json())
app.use("/users", routerUsers)
app.use("/pets", routerPets)
app.use(express.static(__dirname + "/public"), routerUpload)

app.listen(port, () => {
  console.log("server on port " + port)
})
