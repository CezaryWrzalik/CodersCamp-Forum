import { Document } from 'mongoose'
import { Post } from './Post';
export default interface Hashtag extends Document {
    name: string,
    amount: number,
    posts: string[]
}