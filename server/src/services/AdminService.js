import { User } from '../models/User.js'
import createError from 'http-errors'


const getAllUsers = () => User.find()

export {  getAllUsers }
