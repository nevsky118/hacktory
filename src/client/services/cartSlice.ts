import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from './items';

export const SIZES = [
	6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15,
];

export type CartItem = Item & {
	cartId: string;
	size: number;
};

interface Coupon {
	id: number;
	value: string;
	discount: number;
}

interface CartState {
	items: CartItem[];
	size: number;
	total: number;
	coupon: Coupon | null;
}

const initialState: CartState = {
	items: [],
	size: 0,
	total: 0,
	coupon: null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			state.items.push(action.payload);
			state.total += action.payload.price;

			state.size = state.items.length;
		},
		removeFromCart: (state, action: PayloadAction<CartItem>) => {
			state.items = state.items.filter(i => i.cartId !== action.payload.cartId);
			state.total -= action.payload.price;

			state.size = state.items.length;
		},
		emptyCart: state => {
			state.items = [];
			state.total = 0;
			state.size = 0;
			state.coupon = null;
		},
		setCoupon: (state, action: PayloadAction<Coupon>) => {
			state.coupon = action.payload;
		},
	},
});

export const { addToCart, removeFromCart, setCoupon, emptyCart } =
	cartSlice.actions;

export default cartSlice.reducer;
