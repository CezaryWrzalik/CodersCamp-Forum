import { Document } from 'mongoose'

export interface Post extends Document {
  author: string
  title: string
  content: string
  imageUrl: string
  hashtags: string[]
  commentsCount: number
}
