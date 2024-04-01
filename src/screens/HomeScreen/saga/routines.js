import { createRoutine } from 'redux-saga-routines';

export const getLinhVucRoutine = createRoutine('posts/getLinhVuc');

export const getLatestPostsRoutine = createRoutine('posts/getLatestPosts');

export const getHottestPostsRoutine = createRoutine('posts/getHottestPosts');
