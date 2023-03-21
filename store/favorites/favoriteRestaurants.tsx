import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RestaurantItem } from '../../components/RestaurantItem';
import { setItemObject as setItemObjectStorage } from '../../asyncStorage/setItemObject';
import { getItemObject } from '../../asyncStorage/getItemObject';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();

let initStateList: RestaurantItem[] | [] = [];

export interface FavoriteRestaurantsState {
	items: RestaurantItem[] | [];
	status: 'loading' | 'succeeded' | 'failed' | 'idle';
	error: string | null;
}

const initialState: FavoriteRestaurantsState = {
	items: initStateList,
	status: 'idle',
	error: null
};

export const loadFavoriteStorage = createAsyncThunk(
	'favoriteRestaurants/loadStorage',
	async () => {
		const response = await getItemObject('favoriteRestaurants');
		console.log(response);
		return response;
	}
);

export const favoriteRestaurantsSlice = createSlice({
	name: 'favoriteRestaurants',
	initialState,
	reducers: {
		toggleFavoriteRestaurant: (
			state,
			action: PayloadAction<RestaurantItem>
		) => {
			let newState = [];
			const isFavorite = state.items.findIndex(
				(restaurant) => restaurant.id === action.payload.id
			);

			if (isFavorite > -1) {
				newState = state.items.filter(
					(restaurant) => restaurant.id !== action.payload.id
				);
			} else {
				newState = [...state.items, action.payload];
			}
			setItemObjectStorage(newState, 'favoriteRestaurants');
			state.items = newState;
		}
	},
	extraReducers(builder) {
		builder
			.addCase(loadFavoriteStorage.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(loadFavoriteStorage.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.posts = state.posts.concat(action.payload);
			})
			.addCase(loadFavoriteStorage.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	}
});
// dispatch(loadFavoriteStorage());
export const { toggleFavoriteRestaurant } = favoriteRestaurantsSlice.actions;

export default favoriteRestaurantsSlice.reducer;
