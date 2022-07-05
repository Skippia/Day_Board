import { Router } from 'express'
import * as authController from '../controllers/authController.js'
const router = Router()

//! Authorization

router.post('/sign-up', authController.signUp)
router.post('/log-in', authController.logIn)
router.post('/log-out', authController.logOut)

export { router as authRouter }
