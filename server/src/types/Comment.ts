import { Document } from 'mongoose'
import { IReaction } from './Reaction'

export interface Comment extends Document {
  author: string
  content: string
  reactions: [IReaction]
}
