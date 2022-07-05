import * as handlerFactory from '../utils/handlerFactory.js'
import { Day } from '../models/Day.js'
import { User } from '../models/User.js'

const getAllUsers = handlerFactory.getAll({ model: User })

const getAllDays = handlerFactory.getAll({ model: Day })

const getDaysByUserId = handlerFactory.getAll({
  model: Day,
  pathId: {
    type: 'params',
    field: 'userId',
  },
})

const getDayById = handlerFactory.getOne({
  model: Day,
  pathId: { type: 'params', field: 'id' },
})

const modifyDayById = handlerFactory.updateOne({
  model: Day,
  pathId: { type: 'params', field: 'id' },
  message: 'The day has been modified!',
})

const deleteDayById = handlerFactory.deleteOne({
  model: Day,
  pathId: { type: 'params', field: 'id' },
  message: 'The day has been deleted!',
})

const createDay = handlerFactory.createOne({
  model: Day,
  pathMergeData: { type: 'params', field: 'userId' },
  message: 'The new day has been created!',
})

export { getAllUsers, getAllDays, getDaysByUserId, getDayById, modifyDayById, deleteDayById, createDay }
