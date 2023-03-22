import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RestaurantItem } from '../../components/RestaurantItem';
import { setItemObject as setItemObjectStorage } from '../../asyncStorage/setItemObject';

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
		},
		setFavoriteRestaurants: (
			state,
			action: PayloadAction<RestaurantItem[]>
		) => {
			state.items = action.payload;
		}
	}
});

export const { toggleFavoriteRestaurant, setFavoriteRestaurants } =
	favoriteRestaurantsSlice.actions;
export default favoriteRestaurantsSlice.reducer;
