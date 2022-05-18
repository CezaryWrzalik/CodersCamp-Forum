import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';

export type AppThunk = ThunkAction<void, PostState, unknown, Action<string>>;

interface Reaction {
  userId: string;
  reactionName: string;
}

export interface Post {
  hashtags: string[];
  comments: string[];
  _id: string;
  commentsCount: number;
  title: string;
  content: string;
  imageUrl: string;
  author: string;
  reactions: Reaction[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostState {
  posts: Post[];
  loading: boolean;
  errors: string;
}

const initialState: PostState = {
  posts: [
    // {
    //   hashtags: ['zdrowie'],
    //   comments: ['zdrowie'],
    //   _id: '231143',
    //   commentsCount: 1,
    //   title: 'testowy post',
    //   content: 'content dsfsfs',
    //   imageUrl: 'img url',
    //   author: 'jarek',
    //   reactions: [{ userId: '234234', reactionName: 'like' }],
    //   createdAt: 'date',
    //   updatedAt: 'date',
    //   __v: 0,
    // },
  ],
  loading: false,
  errors: '',
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setErrors: (state, { payload }: PayloadAction<string>) => {
      state.errors = payload;
    },

    setPosts: (state, { payload }: PayloadAction<Post[]>) => {
      state.posts = payload;
    },
  },
});

export const { setLoading, setErrors, setPosts } = postSlice.actions;

export default postSlice.reducer;

export const postsSelector = (state: { posts: PostState }) => state.posts;

//  more than 130 characters... ONLY FOR TESTS
const token1 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDNmYjNmZDRiZmE4ZjJmYjAzNGIwZmUiLCJpYXQi';
const token2 = 'OjE2MTQ3ODc2MzJ9.gmWyX7a2vwtZ526eLTUFF3RRRHI2yMDdHEddj4eQ6mQ';
const token = token1 + token2;

export const getPosts = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  await axios
    .get(`http://localhost:4000/posts`, {
      headers: {
        'x-auth-token': token,
      },
    })
    .then((res) => {
      dispatch(setLoading(false));
      dispatch(setPosts(res.data));
    })
    .catch((err) => {
      dispatch(setErrors(err));
      dispatch(setLoading(false));
    });
};
