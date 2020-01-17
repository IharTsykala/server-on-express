const express = require("express")
const router = require("./users/router")
const animalsRouter = require("./animals/router")
const mongoose = require("mongoose")

mongoose.connect("MONGO_DB=mongodb://127.0.0.1:27017/users2", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

const app = express()
const port = process.env.PORT || 8080
app.use(express.json())
app.use("/users", router)
app.use("/animals", animalsRouter)

app.listen(port, () => {
  console.log("server on port " + port)
})
