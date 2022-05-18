import express from 'express'
import bcrypt from 'bcrypt'
import pick from 'lodash/pick'

import { User, validateNewUser, validateLoginDetails } from '../models/user'

export const authReducer = express.Router()

authReducer.post('/register', async (req, res) => {
  // Check request validity
  const { error } = validateNewUser(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // Check if there is user with given name
  let existingUser = await User.findOne({ userName: req.body.userName })
  if (existingUser) {
    return res.status(400).send('User with given name already exist.')
  }

  // Check if there is user with given email
  existingUser = await User.findOne({ email: req.body.email })
  if (existingUser) {
    return res.status(400).send('User with given email already exist.')
  }

  // Register new user
  const newUser = new User(pick(req.body, ['userName', 'email', 'password']))

  // Hash the password
  const saltRounds = 14
  await bcrypt.hash(newUser.password, saltRounds).then((hash) => {
    newUser.password = hash
  })

  await newUser.save()

  return res.status(201).send(pick(newUser, ['_id', 'userName', 'email']))
})

authReducer.post('/login', async (req, res) => {
  // Check if request is valid
  const { error } = validateLoginDetails(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  // Try find user by email
  let user = await User.findOne({ email: req.body.login })
  if (!user) {
    // If we can not find user by email address try again using user name
    user = await User.findOne({ userName: req.body.login })
    if (!user) {
      return res.status(400).send('Invalid login or password!')
    }
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
  if (!isPasswordValid) {
    return res.status(400).send('Invalid login or password!')
  }

  // User authenticated!
  const authToken = user.generateAuthToken()

  res.setHeader('x-auth-token', authToken)
  res.setHeader('Access-Control-Expose-Headers', 'x-auth-token')

  return res
    .status(200)
    .send(pick(user, ['userName', 'email',]))
})
