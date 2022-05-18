import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { auth } from '../middleware/auth'
import { User } from '../models/user'
import { AuthenticatedRequest } from '../types/AuthenticatedRequest'

export const usersReducer = express.Router()

usersReducer.get('/me', [auth], async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    // After auth middleware we should have req.user otherwise return error
    return res.status(500).send('Something goes wrong.')
  }

  // Find user with given id
  const user = await User.findById(req.user._id)
  if (!user) {
    // If there is no user with given ID(it is really weird) return not found status
    return res.status(404).send('User not found.')
  }
  return res.status(200).send(user.getProfile())
})

// Get user by Id
usersReducer.get('/:id([a-f\\d]{24}$)', async (req: Request, res: Response) => {
  // Check if id is valid mongoose id
  const userId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send('Invalid user ID provided')
  }
  // Find user
  const user = await User.findById(userId)
  if (!user) {
    return res.status(400).send('Invalid user ID provided')
  }

  return res.status(200).send(user.getProfile())
})
