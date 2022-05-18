import { model, Schema } from 'mongoose'
import Joi from 'joi'
import { Post as PostType } from '../types/Post'
import { Reaction } from '../types/Reaction'

const postSchema: Schema = new Schema(
  {
    author: {
      ref: 'User',
      type: Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      minLength: 10,
      maxLength: 100,
      required: true,
    },
    content: {
      type: String,
      minLength: 30,
      maxLength: 10000,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    hashtags: {
      type: [String],
      required: true,
    },
    reactions: {
      type: [Reaction],
    },
    commentsCount: {
      type: Number,
      default: 0

    }
  },
  { timestamps: true },


)

export function validateNewPost(post: object): Joi.ValidationResult {
  const schema = Joi.object({
    // author: Joi.string(),
    title: Joi.string()
      .min(10)
      .max(100)
      .required(),
    content: Joi.string()
      .min(30)
      .max(10000)
      .required(),
    imageUrl: Joi.string(),
    hashtags: Joi.array()
      .items(Joi.string())
      .required(),
  })

  return schema.validate(post)
}

export const Post = model<PostType>('Post', postSchema)

