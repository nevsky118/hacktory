import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
	baseUrl: process.env.SERVER_URL,
	prepareHeaders: headers => headers,
});
