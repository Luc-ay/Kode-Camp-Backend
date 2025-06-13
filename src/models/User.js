import { timeStamp } from 'console'
import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
      enum: ['Single', 'Married'],
    },
    employmentStatus: {
      type: String,
      required: true,
      enum: ['Student', 'Unemployed', 'Self-Employed', 'Employed'],
    },
    education: {
      type: String,
      required: true,
      enum: ['High School', 'Undergraduate', 'Postgraduate', 'Masters', 'PhD'],
    },
  },
  { timeStamp: true }
)

const User = mongoose.model('User', userSchema)

export default User
