const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  avatar: {
    type: String
  },

  role: {
    type: String,
    default: "user"
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
})

userSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login })
  if (!user) {
    throw new Error("Unable user")
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error("Unable to login")
  }
  return user
}

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.KeyWord)
  user.tokens = user.tokens.concat({ token })
  user.save()
  return token
}

userSchema.pre("save", async function(next) {
  const user = this
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 7)
  }
  next()
})

userSchema.pre("findOneAndUpdate", async function(next) {
  const user = this
  if (user._update.password.length > 7)
    user._update.password = await bcrypt.hash(user._update.password, 7)
  else delete user._update.password
  next()
})

const User = mongoose.model("Users", userSchema)
module.exports = User
