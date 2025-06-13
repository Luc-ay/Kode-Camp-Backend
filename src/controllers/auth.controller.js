import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import {
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
} from '../utils/customeError.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils/token.js'

// Register new User
export const userRegister = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      gender,
      maritalStatus,
      employmentStatus,
      education,
    } = req.body

    if (
      !username ||
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !gender ||
      !maritalStatus ||
      !employmentStatus ||
      !education
    ) {
      throw new ForbiddenError('All Fields are required')
    }

    const user = await User.findOne(email)
    if (user) {
      throw new ConflictError('User already Exist')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      firstName,
      lastName,
      phoneNumber,
      gender,
      maritalStatus,
      employmentStatus,
      education,
    })

    await newUser.save()

    res.status(201).json({
      Message: 'User Created Successfully',
      newUser,
    })
  } catch (error) {
    throw new InternalServerError()
  }
}

// User Login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      throw new ForbiddenError('All fields are required')
    }

    const user = await User.findOne({ email })
    if (!user) {
      throw new ConflictError('Invalid Credential')
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      throw new ConflictError('Invalid Credential')
    }

    user.password = null

    // Generate Token for verification
    generateToken(user._id, res)

    res.status(200).json({
      Message: 'User Login Successful',
      user,
    })
  } catch (error) {
    throw new InternalServerError()
  }
}
