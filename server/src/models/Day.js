import mongoose from 'mongoose'

const { Schema, model } = mongoose


const schemaDay = new Schema({
  listTasks: {
    type: [String],
    required: [true, 'lisITask is required field'],
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
  date: {
    type: Date,
    default: Date.now()
  },
  completedTasks: {
    type: [{
      _id: false,
      taskContent: {
        type: String,
        required: true
      },
      timeTask: {
        type: String,
        required: true
      }
    }],
    required: [true, 'completedTasks is required field'],
  },
})

schemaDay.statics.toClient = function (day) {
  const { _id, listTasks, listTimes, userId, date, completedTasks} = day._doc
  return {
    _id,
    listTasks,
    listTimes,
    userId,
    date,
    completedTasks
  }
}

const modelDay = model('Day', schemaDay)

export { modelDay as Day }
