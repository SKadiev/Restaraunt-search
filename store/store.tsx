import { configureStore } from '@reduxjs/toolkit';
import resultFilterSlice from './resultFilter/resultFilterSlice';

export const store = configureStore({
	reducer: {
		resultFilter: resultFilterSlice
	}
});

export type RootResultFilterState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
