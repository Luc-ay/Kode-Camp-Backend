import express from 'express'
import { userLogin, userRegister } from '../controllers/auth.controller.js'

const router = express.Router()

// routes
router.post('/register', userRegister)
router.post('/login', userLogin)

export default router
