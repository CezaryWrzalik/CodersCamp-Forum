import { Schema, model } from 'mongoose'
import Hashtag from '../types/Hashtag'
import { Post } from './Post'


const hashtagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        default: 0
    }
})

export const Hashtag = model<Hashtag>('Hashtag', hashtagSchema)
