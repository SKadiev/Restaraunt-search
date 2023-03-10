import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
	filter500: boolean;
	filter5000: boolean;
	filter25000: boolean;
}

const initialState: CounterState = {
	filter500: true,
	filter5000: false,
	filter25000: false
};

export const resultFilterSlice = createSlice({
	name: 'resultFilter',
	initialState,
	reducers: {
		check500: (state, action: PayloadAction<boolean>) => {
			state.filter500 = action.payload;
		},

		check5000: (state, action: PayloadAction<boolean>) => {
			state.filter5000 = action.payload;
		},
		check25000: (state, action: PayloadAction<boolean>) => {
			state.filter25000 = action.payload;
		}
	}
});

export const { check25000, check500, check5000 } = resultFilterSlice.actions;

export default resultFilterSlice.reducer;
