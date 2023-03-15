import ItemView from '@/components/ItemView';
import { useGetItemByTitleQuery } from '@/services/items';
import { Stack } from '@mantine/core';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Slug = () => {
	const router = useRouter();
	const { slug } = router.query;

	const { data, isLoading } = useGetItemByTitleQuery(slug as string);

	if (isLoading) return <div>Loading...</div>;
	if (!data) return <div>Missing data!</div>;

	return (
		<>
			<Head>
				<title>
					{data.title} | {data.category}
				</title>
			</Head>
			<Stack>
				<ItemView item={data} />
			</Stack>
		</>
	);
};

export default Slug;
