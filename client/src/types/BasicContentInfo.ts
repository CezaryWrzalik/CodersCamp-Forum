import Reaction from '../types/Reaction';
export default interface BasicContentInfo {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  reactions: Reaction[];
}
