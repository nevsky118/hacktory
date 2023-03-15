import { configureStore } from '@reduxjs/toolkit';
import { itemApi } from './services/items';
import cartReducer from './services/cartSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';

const reducers = combineReducers({
	[itemApi.reducerPath]: itemApi.reducer,
	cart: cartReducer,
});

const persistConfig = {
	key: 'root',
	storage,
	blacklist: [itemApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(itemApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
