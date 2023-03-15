import { baseQuery } from '@/lib/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export interface Item {
	id: number;
	title: string;
	description?: string;
	price: number;
	category: string;
	image: string;
}

type ItemsResponse = {
	docs: Item[];
	totalPages: number;
};

type PaginationQuery = {
	page?: number;
	q?: string;
};

export const itemApi = createApi({
	reducerPath: 'itemsApi',
	baseQuery,
	tagTypes: ['Items'],
	endpoints: build => ({
		getItems: build.query<ItemsResponse, PaginationQuery>({
			query: paginationQuery => ({
				url: `api/items`,
				params: paginationQuery,
			}),
			providesTags: result =>
				result
					? [
							...result.docs.map(({ id }) => ({ type: 'Items', id } as const)),
							{ type: 'Items', id: 'LIST' },
					  ]
					: [{ type: 'Items', id: 'LIST' }],
		}),
		getItemById: build.query<Item, number>({
			query: id => `api/items/${id}`,
			providesTags: (result, error, id) => [{ type: 'Items', id }],
		}),
		getItemByTitle: build.query<Item, string>({
			query: title => `api/items/${title}`,
			providesTags: (result, error, id) => [{ type: 'Items', id }],
		}),
		getFlag: build.query<{ flag: string }, string | undefined>({
			query: secret => ({
				url: `api/flag`,
				params: { secret },
			}),
			providesTags: (result, error, id) => [{ type: 'Items', id }],
		}),
	}),
});

export const {
	useGetItemByIdQuery,
	useGetItemByTitleQuery,
	useGetItemsQuery,
	useGetFlagQuery,
	usePrefetch,
} = itemApi;
