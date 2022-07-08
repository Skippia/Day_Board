import { catchAsync } from '../utils/catchAsync.js'
import createError from 'http-errors'
import * as AuthService from '../services/AuthService.js'
import { User } from '../models/User.js'

const signUp = catchAsync((req, res, next) => {
  const { email } = req.body

  return AuthService.signUp({ email, authData: req.body }).then((data) =>
    res.status(201).json({ status: 'success', message: 'The user has been created!', data })
  )
})

const logIn = catchAsync((req, res) => {
  const { email, password } = req.body

  return AuthService.logIn({ email, password }).then(({ token, user }) => {
    res.cookie('jwt', token, {
      // httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
    })
    
    const userToClient = User.toClient(user)

    return res.status(200).json({ data: userToClient, status: 'success', message: 'You have been logged in!' })
  })
})

const logOut = (req, res) => {
  res.clearCookie('jwt')
  return res.status(200).json({ status: 200, message: 'You have been logged out!' })
}

const isAuth = catchAsync(async (req, res, next) => {
  const token = req?.cookies?.jwt

  const decoded = await AuthService.isAuth(token)

  res.locals.decoded = decoded

  next()
})

const protectByRoles = (...roles) => {
  return catchAsync(function (req, res, next) {
    return new Promise((resolve, reject) => {
      const { userRole } = res.locals.decoded
      if (roles && !roles.includes(userRole)) {
        return reject(createError(405, "Error role. You don't have permission to given operation!"))
      }
      resolve(next())
    })
  })
}

export { signUp, logIn, logOut, isAuth, protectByRoles }
