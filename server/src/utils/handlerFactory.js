import { catchAsync } from '../utils/catchAsync.js'
import createError from 'http-errors'

//* {a : 1, b : 2} => [{a : 1}, {b : 2}]
const transformObject = (target) =>
  Object.keys(target).reduce((acc, cur) => {
    return [...acc, { [cur]: target[cur] }]
  }, [])

const getAll = ({ model, pathId, filterConfig, isAdmin = true }) =>
  catchAsync(async (req, res, next) => {
    let findOptions = {}
    // console.log('query', req.query);

    if (filterConfig) {
      filterConfig.forEach(curFilter => {
        const args = curFilter.paramsFilter.reduce((acc, cur) =>
          ({ ...acc, [cur.name]: req[cur.type][cur.field] }), {})

        args.searchParam = curFilter.searchParam

        findOptions = { ...findOptions, ...curFilter.filterFn(args) }
      })
    }

    if (pathId) {
      const { field, type } = pathId
      findOptions[field] = req[type][field]
    }
    //* If it's not an admin so narrow the search
    if (!isAdmin) {
      const userId = res.locals?.decoded?.userId
      findOptions = { ...findOptions, userId }
    }

    // console.log('findOptions', findOptions);
    

    const data = await model.find(findOptions)

    return res.status(200).json({ status: 'success', data })
  })

const getOne = ({ model, pathId, isAdmin = true }) =>
  catchAsync(async (req, res, next) => {
    const { field, type } = pathId
    const id = req[type][field]
    let findOptions = { _id: id }

    //* If it's not an admin so narrow the search
    if (!isAdmin) {
      const userId = res.locals?.decoded?.userId
      findOptions = { ...findOptions, userId }
    }
    const transformedFindOptions = transformObject(findOptions)

    const data = await model.findOne({ $and: transformedFindOptions })

    return res.status(200).json({ status: 'success', data })
  })

const updateOne = ({ model, pathId, message, isAdmin = true }) =>
  catchAsync(async (req, res, next) => {
    const { newData } = req.body
    const { field, type } = pathId
    const id = req[type][field]
    let findOptions = { _id: id }

    //* If it's not an admin so narrow the search
    if (!isAdmin) {
      const userId = res.locals?.decoded?.userId
      findOptions = { ...findOptions, userId }
    }
    const transformedFindOptions = transformObject(findOptions)

    const data = await model.updateOne(
      { $and: transformedFindOptions },
      {
        $set: newData,
      }
    )

    if (!data.acknowledged) {
      return next(new createError(400, `Error format input data`))
    }

    return res.status(200).json({ status: 'success', message, data: newData })
  })

const deleteOne = ({ model, pathId, message, isAdmin = true }) =>
  catchAsync(async (req, res, next) => {
    const { field, type } = pathId
    const id = req[type][field]
    let findOptions = { _id: id }

    //* If it's not an admin so narrow the search
    if (!isAdmin) {
      const userId = res.locals?.decoded?.userId
      findOptions = { ...findOptions, userId }
    }

    const transformedFindOptions = transformObject(findOptions)

    const data = await model.findOneAndDelete({ $and: transformedFindOptions })

    if (!data) {
      return next(new createError(400, `You try to delete element that doesn't exist!`))
    }

    return res.status(200).json({ status: 'success', message, data })
  })

const createOne = ({ model, pathMergeData, message, isAdmin = true }) =>
  catchAsync(async (req, res, next) => {
    const newData = req.body
    let resultData = { ...newData }

    if (pathMergeData) {
      const { type, field } = pathMergeData
      const mergeData = req[type][field]
      // console.log('date: ', mergeData)
      resultData = { ...resultData, [field]: mergeData }
      // console.log('result data: ', resultData)
    }

    if (!isAdmin) {
      const userId = res.locals?.decoded?.userId
      resultData = { ...resultData, userId }
    }

    const data = await model.create({ ...resultData })

    return res.status(200).json({ status: 'success', message, data })
  })

export { getAll, getOne, updateOne, deleteOne, createOne }
