import { CartItem as CartItemType, removeFromCart } from '@/services/cartSlice';
import { CloseButton, createStyles, Text } from '@mantine/core';
import { useDispatch } from 'react-redux';

const useStyles = createStyles(theme => ({
	item: {
		display: 'flex',
		width: '100%',
		'& + &': {
			paddingTop: theme.spacing.sm,
			marginTop: theme.spacing.sm,
			borderTop: `1px solid ${
				theme.colorScheme === 'dark'
					? theme.colors.dark[4]
					: theme.colors.gray[2]
			}`,
		},
		[theme.fn.smallerThan('md')]: {
			border: 0,
		},
	},

	image: {
		position: 'relative',
		width: '240px',
		height: '240px',
		flexShrink: 0,
		overflow: 'hidden',
		borderRadius: theme.spacing.sm,

		[theme.fn.smallerThan('md')]: {
			width: '160px',
			height: '160px',
		},
	},

	itemDetails: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginLeft: theme.spacing.sm,
	},
}));

interface CartItemProps {
	item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
	const { classes } = useStyles();
	const dispatch = useDispatch();

	const handleCartRemove = () => {
		dispatch(removeFromCart(item));
	};

	return (
		<div key={item.id} className={classes.item}>
			<div className={classes.image}>
				<img
					style={{ width: '100%', height: '100%' }}
					alt={item.title}
					src={item.image}
				/>
			</div>

			<div className={classes.itemDetails}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
					<div>
						<Text lineClamp={2}>{item.title}</Text>
						<Text fz="sm" color="dimmed">
							{item.category}
						</Text>
					</div>
					<Text>РАЗМЕР: {item.size}</Text>
				</div>
				<Text fz={16} fw={700}>
					{item.price}₽
				</Text>
			</div>

			<CloseButton
				onClick={handleCartRemove}
				variant="default"
				aria-label="Remove cart item"
				ml="sm"
			/>
		</div>
	);
};

export default CartItem;
