import ItemCard from '@/components/ItemCard';
import { useGetItemsQuery, usePrefetch } from '@/services/items';
import { createStyles, Pagination, SimpleGrid, Stack } from '@mantine/core';
import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';

const useStyles = createStyles(theme => ({
	grid: {
		[theme.fn.smallerThan('sm')]: {
			gap: 0,
		},
	},

	pagination: {
		justifyContent: 'flex-end',
		[theme.fn.smallerThan('sm')]: {
			justifyContent: 'center',
		},
	},

	stack: {
		[theme.fn.smallerThan('sm')]: {
			marginTop: '-1px',
		},
	},
}));

export default function Home() {
	const { classes } = useStyles();

	const [page, setPage] = useState(1);

	const { data, isFetching, isLoading } = useGetItemsQuery({
		page,
	});

	const prefetchPage = usePrefetch('getItems');

	const prefetchNext = useCallback(() => {
		prefetchPage({ page: page + 1 });
	}, [prefetchPage, page]);

	useEffect(() => {
		if (page !== data?.totalPages) {
			prefetchNext();
		}
	}, [data, page, prefetchNext]);

	if (isLoading) return <div>Загрузка...</div>;
	if (!data) return <div>Отсутствуют данные</div>;

	return (
		<>
			<Head>
				<title>Главная — Интернет-Магазин</title>
			</Head>
			<Stack className={classes.stack}>
				<SimpleGrid
					cols={4}
					spacing="md"
					breakpoints={[
						{ maxWidth: 'md', cols: 3, spacing: 'sm' },
						{ maxWidth: 'sm', cols: 2 },
					]}
					className={classes.grid}
				>
					{data.docs.map(item => (
						<div key={item.id}>
							<ItemCard item={item} />
						</div>
					))}
				</SimpleGrid>
				<Pagination
					onChange={setPage}
					className={classes.pagination}
					total={data?.totalPages}
					disabled={isLoading || isFetching}
				/>
			</Stack>
		</>
	);
}
