import BasicContentInfo from './BasicContentInfo';
export default interface Post extends BasicContentInfo {
  title: string;
  imageUrl: string;
  hashtags: string[];
  commentsCount: number;
  _v: number;
}
