import express, { Express } from 'express'
import cors from 'cors'
import { errorHandler } from '../middleware/errorHandler'

import { authReducer } from '../routes/auth'
import { postRouter } from '../routes/posts'
import { topHashtagRouter } from '../routes/topHashtags'
import { usersReducer } from '../routes/users'
import { commentsReducer } from '../routes/comments'

// Handle async errors in request pipeline
require('express-async-errors')

export function startupRoutes(app: Express): void {
  app.use(cors())
  app.use(express.json())

  app.use('/auth', authReducer)
  app.use('/users', usersReducer)
  app.use('/posts', postRouter)
  app.use('/topHashtags', topHashtagRouter)
  app.use('/comments', commentsReducer)

  // error handling middleware in request pipeline
  app.use(errorHandler)
}
