import mongoose from 'mongoose'

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
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'day must have own master'],
  },
  dateDay: {
    type: Date,
    default: Date.now()
  }
})

schemaDay.statics.toClient = function (day) {
  const { _id, listTasks, listTimes, userId, dateDay, } = day._doc
  return {
    _id,
    listTasks,
    listTimes,
    userId,
    dateDay,
  }
}

const modelDay = model('Day', schemaDay)

export { modelDay as Day }
