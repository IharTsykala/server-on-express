const express = require("express")
const routerUsers = require("./users/router-users")
const routerPets = require("./pets/router-pets")
const routerAlbums = require("./albums/router-albums")
const routerUpload = require("./upload/router-upload")
const routerPhotos = require("./photos/router-photos")
const routerSubscriptions = require("./subscriptions/router-subscriptions")
const routerFriends = require("./friends/router-friends")
const routerDialogs = require("./dialogs/router-dialogs")
const routerMessages = require("./messages/router-messages")
const MessageController = require("./messages/controller-messages")

const message_controller = new MessageController()
const mongoose = require("mongoose")
require("dotenv").config()
const cors = require("cors")

mongoose.connect(process.env.BD, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

const app = require("express")()
const server = require("http").Server(app)
const io = require("socket.io")(server)

const port = process.env.PORT || 8080

app.use(express.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  next()
})

app.use(cors())

app.get("/", (req, res) => {
  res.end(`<div>
              <h1>This server was to link with the Heroku</h1>
              <a href="#">About</a>
          </div>`)
})

app.use("/users", routerUsers)
app.use("/pets", routerPets)
app.use("/albums", routerAlbums)
app.use("/photos", routerPhotos)
app.use("/subscriptions", routerSubscriptions)
app.use("/friends", routerFriends)
app.use("/dialogs", routerDialogs)
app.use("/messages", routerMessages)
app.use(express.static(`${__dirname}/public`), routerUpload)

app.listen(port, () => {
  console.log(`server on port ${port}`)
})

io.on("connection", (socket) => {
  let idRoom
  socket.on("join", (data) => {
    idRoom = data._id
    socket.join(idRoom)
  })
  socket.on("messageDialog", async (data) => {
    const message = await message_controller.addMessage(data)
    io.to(idRoom).emit("receiveMessageDialog", message)
  })
  socket.on("end", () => {
    socket.leave(idRoom)
  })
})

const serverPort = process.env.PORTSOCKET || 8000
io.listen(serverPort)
