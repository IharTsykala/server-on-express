const express = require("express")
const routerUsers = require("./users/router-users")
const routerPets = require("./pets/router-pets")
const mongoose = require("mongoose")

mongoose.connect("MONGO_DB=mongodb://127.0.0.1:27017/users", {
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

app.listen(port, () => {
  console.log("server on port " + port)
})
