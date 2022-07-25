import { Router } from 'express'
import * as userController from '../controllers/userController.js'
import * as authController from '../controllers/authController.js'
const router = Router()

//! Default user operations

router.use(authController.isAuth)

router.post('/create-day/:date', userController.createDay)
router.put('/create-default-day-template', userController.createDefaultDayTemplate)
router.get('/get-days', userController.getDays)
router.get('/get-default-day-template', userController.getDefaultDayTemplate)
router.get('/get-days-by-date', userController.filterDaysByDate)
router.get('/get-day/:id', userController.getDayById)
router.patch('/modify-day/:id', userController.modifyDayById)
router.delete('/delete-day/:id', userController.deleteDayById)

export { router as userRouter }
