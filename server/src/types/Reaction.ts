import { Schema } from 'mongoose'

export const Reaction = new Schema({
  userId: String,
  reactionName: String,
})

export interface IReaction {
  userId: String,
  reactionName: String,
}