import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const schemaUser = new Schema({
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        )
      },
      message: (v) => 'v' + 'is not a valid email',
    },
    required: [true, 'Email is required field'],
  },
  name: {
    type: String,
    required: [true, 'Name is required field'],
  },
  password: {
    type: String,
    required: [true, 'Password is required field'],
  },
  gender: {
    type: String,
    enum: ['MALE', 'FEMALE'],
    default: 'MALE',
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER',
  },
})

schemaUser.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

schemaUser.statics.toClient = function (user) {
  const { _id, email, name, role, gender } = user._doc
  return {
    _id,
    email,
    name,
    role,
    gender,
  }
}
const modelUser = model('User', schemaUser)

export { modelUser as User }
