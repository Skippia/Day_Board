import * as handlerFactory from '../utils/handlerFactory.js'
import { Day } from '../models/Day.js'
import { User } from '../models/User.js'
import { filterBetween } from '../utils/filterBetween.js'
import { catchAsync } from '../utils/catchAsync.js'
import createError from 'http-errors'

const getDays = handlerFactory.getAll({ model: Day, isAdmin: false })

const getDayById = handlerFactory.getOne({
  model: Day,
  pathId: { type: 'params', field: 'id' },
  isAdmin: false,
})

const modifyDayById = handlerFactory.updateOne({
  model: Day,
  pathId: { type: 'params', field: 'id' },
  message: 'The day has been modified!',
  isAdmin: false,
})

const deleteDayById = handlerFactory.deleteOne({
  model: Day,
  pathId: { type: 'params', field: 'id' },
  message: 'The day has been deleted!',
  isAdmin: false,
})

const createDay = handlerFactory.createOne({
  model: Day,
  message: 'The new day has been created!',
  pathMergeData: { type: 'params', field: 'date' },
  isAdmin: false,
})

const filterDaysByDate = handlerFactory.getAll({
  model: Day,
  message: 'Days to accord with setted dates!',
  filterConfig: [{
    filterFn: filterBetween,
    searchParam: 'date',
    paramsFilter: [
      { type: 'query', field: 'startDate', name: 'start' },
      { type: 'query', field: 'endDate', name: 'end' }
    ]
  }],
  isAdmin: false,
})

const createDefaultDayTemplate = catchAsync(async (req, res, next) => {
  const newData = req.body
  const userId = res.locals?.decoded?.userId

  const data = await User.findOneAndUpdate(
    {_id: userId}, 
    { $set: { defaultTemplate : newData} },
    {
      returnNewDocument: true,
      new: true,
      strict: false
    }
  )
  return res.status(200).json({ status: 'success?', data })
})

const getDefaultDayTemplate = catchAsync(async (req, res, next) => {
  const userId = res.locals?.decoded?.userId

  const defaultTemplate = (await User.findOne({
    _id: userId,
  }))?.defaultTemplate


  if (!defaultTemplate) {
    return next(new createError(400, 'No default template found'))
  }

  
  return res.status(200).json({ status: 'success', data: defaultTemplate })
})


export { getDays, getDefaultDayTemplate, getDayById, modifyDayById,
  deleteDayById, createDay, createDefaultDayTemplate, filterDaysByDate }


