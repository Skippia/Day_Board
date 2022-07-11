import * as handlerFactory from '../utils/handlerFactory.js'
import { Day } from '../models/Day.js'
import { filterBetween } from '../utils/filterBetween.js'

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
  pathMergeData: { type: 'params', field: 'dateDay' },
  isAdmin: false,
})

const filterDaysByDate = handlerFactory.getAll({
  model: Day,
  message: 'Days to accord with setted dates!',
  filterConfig: [{
    filterFn: filterBetween,
    searchParam: 'dateDay',
    paramsFilter: [
      { type: 'query', field: 'startDate', name: 'start' },
      { type: 'query', field: 'endDate', name: 'end' }
    ]
  }],
  isAdmin: false,
})


export { getDays, getDayById, modifyDayById, deleteDayById, createDay, filterDaysByDate }


