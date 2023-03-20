import { configureStore } from '@reduxjs/toolkit';
import favoriteRestaurantsSlice from './favorites/favoriteRestaurants';
import resultFilterSlice from './resultFilter/resultFilterSlice';

export const store = configureStore({
	reducer: {
		resultFilter: resultFilterSlice,
		favoriteRestaurants: favoriteRestaurantsSlice
	}
});

export type RootResultState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
