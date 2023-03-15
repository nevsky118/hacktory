import { Item } from '@/services/items';
import { createStyles, Text, Card, AspectRatio, Group } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

const useStyles = createStyles(theme => ({
	card: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		backgroundColor: 'inherit',
		'&:hover': { opacity: '80%' },
		[theme.fn.smallerThan('sm')]: {
			padding: '8px',
		},
	},
	details: {
		width: '100%',
		marginTop: theme.spacing.xs,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},
	image: {
		width: '100%',
		position: 'relative',
		borderRadius: '4px',
		overflow: 'hidden',
	},

	title: {
		flex: 1,
		fontWeight: 500,
		fontSize: 14,
		[theme.fn.smallerThan('sm')]: {
			fontSize: 12,
		},
	},
}));

const ItemCard = ({ item }: { item: Item }) => {
	const { classes } = useStyles();

	return (
		<Card
			key={item.id}
			component={Link}
			href={`/${item.title.toLowerCase().replaceAll(' ', '-')}`}
			className={classes.card}
			radius={0}
			p={0}
		>
			<AspectRatio ratio={1 / 1} className={classes.image}>
				<Image alt={item.title} src={item.image} fill />
			</AspectRatio>
			<div className={classes.details}>
				<Group>
					<Text className={classes.title} lineClamp={1}>
						{item.title}
					</Text>
					<Text fz="xs" color="dimmed" fw="bold">
						${item.price}
					</Text>
				</Group>
				<Text fz="xs" color="dimmed">
					{item.category}
				</Text>
			</div>
		</Card>
	);
};

export default ItemCard;
