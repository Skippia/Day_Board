import { Router } from 'express'
import * as authController from '../controllers/authController.js'
import * as adminController from '../controllers/adminController.js'
const router = Router()

//! Admin operations

router.use(authController.isAuth, authController.protectByRoles('ADMIN'))

router.get('/get-all-users', adminController.getAllUsers)
router.get('/get-all-days', adminController.getAllDays)
router.get('/get-days/:userId', adminController.getDaysByUserId)
router.get('/get-day/:dayId', adminController.getDayById)
router.patch('/modify-day/:id', adminController.modifyDayById)
router.delete('/delete-day/:id', adminController.deleteDayById)
router.post('/create-day/:userId', adminController.createDay)

export { router as adminRouter }
