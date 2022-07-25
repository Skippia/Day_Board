import { User } from '../models/User.js'
import createError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretKey = 'secretKeyLormida'

const createToken = ({ userId, userRole }) => {
  return jwt.sign({ userId, userRole }, secretKey, { expiresIn: 60 * 60 * 1000 })
}

const signUp = ({ email, authData }) => {
  return User.findOne({ email }).then((user) => {
    if (user) {
      throw new createError(400, 'User exists!')
    }
    return User.create({ ...authData })
  })
  // })
}

const logIn = ({ email, password }) => {
  return User.findOne({ email })
    .then((user) => {
      return new Promise((resolve, reject) => {
        if (user) {
          resolve(user)
        }
        reject(new createError(400, 'User with given email doesn\t exists'))
      })
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, concurrence) => {
          if (err) {
            return reject(new createError(500, 'Error during comparing passwords'))
          } else if (!concurrence) {
            return reject(new createError(401, 'Incorrect password'))
          }
          const token = createToken({ userId: user._id, userRole: user.role })
          resolve({ user, token })
        })
      })
    })
}

const isAuth = (token) => {
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject(new createError(401, 'Anauthorized user'))
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return reject(new createError(401, 'Error validation JWT!'))
      }
      resolve(decoded)
    })
  })
}

export { signUp, logIn, isAuth }
