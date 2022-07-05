import { Router } from 'express'
import * as userController from '../controllers/userController.js'
import * as authController from '../controllers/authController.js'
const router = Router()

//! Default user operations

router.use(authController.isAuth)

router.post('/create-day', userController.createDay)
router.get('/get-days', userController.getDays)
router.get('/get-day/:id', userController.getDayById)
router.patch('/modify-day/:id', userController.modifyDayById)
router.delete('/delete-day/:id', userController.deleteDayById)

export { router as userRouter }
