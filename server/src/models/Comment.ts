import Joi from 'joi'
import { model, Schema } from 'mongoose'
import { Comment as CommentType } from '../types/Comment'
import { Reaction } from '../types/Reaction'

const commentSchema: Schema = new Schema(
  {
    author: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: true,
    },
    post: {
      ref: 'Post',
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      minLength: 1,
      maxLength: 500,
      required: true,
    },
    reactions: {
      type: [Reaction],
      required: true,
      default: [],
    },
  },
  { timestamps: true },
)

export function validateNewComment(comment: object): Joi.ValidationResult {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/
  const schema = Joi.object({
    post: Joi.string().regex(objectIdPattern).required(),
    content: Joi.string()
      .min(1)
      .max(500)
      .required(),
  })
  return schema.validate(comment)
}

export function validateEditedComment(comment: object): Joi.ValidationResult {
  const schema = Joi.object({
    content: Joi.string()
      .min(1)
      .max(500)
      .required(),
  })
  return schema.validate(comment)
}

export function validateReaction(comment: object): Joi.ValidationResult {
  const schema = Joi.object({
    reactionName: Joi.string()
      .min(3)
      .max(50)
      .required(),
  })
  return schema.validate(comment)
}

export const Comment = model<CommentType>('Comment', commentSchema)
