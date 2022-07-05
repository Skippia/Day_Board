import mongoose from 'mongoose'
import { User } from './User.js'

const { Schema, model } = mongoose

const schemaDay = new Schema({
  listTasks: {
    type: [String],
    required: [true, 'listTask is required field'],
  },
  listTimes: {
    type: [String],
    required: [true, 'listTime is required field'],
  },
  data: {
    type: Map,
    of: String,
    required: [true, 'data is required field'],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'day must have own master'],
  },
})

const modelDay = model('Day', schemaDay)

export { modelDay as Day }
