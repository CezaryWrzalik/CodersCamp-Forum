import { Request,Response, Router } from 'express'
import { auth } from '../middleware/auth'
import {
  Comment,
  validateEditedComment,
  validateNewComment,
  validateReaction,
} from '../models/Comment'
import { Post } from '../models/Post'
import { AuthenticatedRequest } from '../types/AuthenticatedRequest'

export const commentsReducer = Router()

// commentsReducer.get('/:id', async (req: AuthenticatedRequest, res: Response) => {
//   const { id } = req.params
//   await Comment.findById(id)
//     .then((comment) => {
//       if (comment) {
//         res.status(200).send(comment)
//       } else {
//         res.status(404).send(`Comment with ${id} not found!`)
//       }
//     })
//     .catch((err) => {
//       res.status(404).send(err.toString())
//     })
// })
commentsReducer.get('/:postId', async (req: Request, res: Response) => {
  const { postId } = req.params
  await Comment.find({post:postId})
    .then((comments) => {
      if (comments) {
        res.status(200).send(comments)
      } else {
        res.status(404).send(`Post with ${postId} not found!`)
      }
    })
    .catch((err) => {
      res.status(404).send(err.toString())
    })
})

commentsReducer.post('/', auth, async (req: AuthenticatedRequest, res: Response) => {
  const { error } = validateNewComment(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const post = await Post.findById(req.body.post)
  if (!post) {
    return res.status(400).send('Invalid post ID.')
  }

  const comment = new Comment({
    post: req.body.post,
    author: req.user?._id,
    content: req.body.content,
  })
  await comment.save()
  await Post.findByIdAndUpdate(req.body.post,{$inc:{commentsCount:1}})

  res.status(200).send(comment)
})

commentsReducer.put('/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  const { error } = validateEditedComment(req.body)
  if (error) {
    return res.status(400).send(error.details[0].message)
  }

  const comment = await Comment.findByIdAndUpdate(
    req.params.id,
    {
      content: req.body.content,
    },
    { new: true },
  )

  if (!comment) return res.status(404).send('The comment with the given ID was not found.')

  res.send(comment)
})

commentsReducer.delete('/:id', auth, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params
  const comment = await Comment.findById(id)
  if (!comment) {
    // If there is no comment with given id return 404
    return res.status(404).send('User not found.')
  }
  await comment.delete()
  res.status(200).send(comment)
})

commentsReducer.post(
  '/:id/reactions/:name',
  auth,
  async (req: AuthenticatedRequest, res: Response) => {
    const { error } = validateReaction(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const comment = await Comment.findById(req.params.id)
    if (!comment) {
      return res.status(404).send(`Comment with ${req.params.id} not found!`)
    }
    const findReactionIndex = (userID: string, reactionName: string): number | null => {
      for (let index = 0; index < comment.reactions.length; index++) {
        const reaction = comment.reactions[index]
        if (reaction.userId === userID && reaction.reactionName === reactionName) {
          return index
        }
      }
      return null
    }
    const indexOfReaction = findReactionIndex(req.user!._id, req.params.name)
    if (indexOfReaction) {
      return res.status(400).send('Given reaction already exist!')
    }

    comment.reactions.push({
      userId: req.user!._id,
      reactionName: req.params.name,
    })

    await comment.save()

    return res.status(200).send('Reaction added!')

  },
)

commentsReducer.delete(
  '/:id/reactions/:name',
  auth,
  async (req: AuthenticatedRequest, res: Response) => {
    const { error } = validateReaction(req.body)
    if (error) {
      return res.status(400).send(error.details[0].message)
    }

    const comment = await Comment.findById(req.params.id)
    if (!comment) {
      return res.status(404).send(`Comment with ${req.params.id} not found!`)
    }
    const findReactionIndex = (userID: string, reactionName: string): number | null => {
      for (let index = 0; index < comment.reactions.length; index++) {
        const reaction = comment.reactions[index]
        if (reaction.userId === userID && reaction.reactionName === reactionName) {
          return index
        }
      }
      return null
    }
    const indexOfReaction = findReactionIndex(req.user!._id, req.params.name)
    if (!indexOfReaction) {
      return res.status(400).send('Given reaction does not exist!')
    }

    comment.reactions.splice(indexOfReaction, 1)

    await comment.save()

    return res.status(200).send('Reaction added!')

  },
)
