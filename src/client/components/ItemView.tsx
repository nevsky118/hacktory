import { addToCart, SIZES } from '@/services/cartSlice';
import { Item } from '@/services/items';
import {
	Text,
	Group,
	createStyles,
	Stack,
	Button,
	UnstyledButton,
	SimpleGrid,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
var uuid = require('uuid');

const useStyles = createStyles(theme => {
	const BREAKPOINT = theme.fn.smallerThan('sm');

	return {
		wrapper: {
			display: 'flex',
			[BREAKPOINT]: { flexDirection: 'column' },
		},

		info: {
			paddingLeft: theme.spacing.xl,
			paddingRight: theme.spacing.xl,
			flex: '0 0 450px',
			[BREAKPOINT]: { padding: theme.spacing.md },
		},

		cover: {
			position: 'relative',
			width: '100%',
			minHeight: '667px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#ebeeef',
			overflow: 'hidden',
			borderRadius: '4px',
			[BREAKPOINT]: {
				height: '375px',
				minHeight: 0,
				borderRadius: 0,
			},
		},

		title: {
			fontSize: 30,
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
			[BREAKPOINT]: { fontSize: 24 },
		},

		details: {
			marginBottom: theme.spacing.xl * 1.5,
			[BREAKPOINT]: { marginBottom: theme.spacing.xl },
		},

		description: {
			fontSize: '16px',
			color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		},

		sizes: {
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))',
			borderLeft: `1px solid ${
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[2]
			}`,
		},

		size: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			textAlign: 'center',
			borderRadius: theme.radius.sm,
			height: '40px',
			width: 'fit',
			backgroundColor:
				theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
			transition: 'box-shadow 150ms ease, transform 100ms ease',
			border: `1px solid ${
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[2]
			}`,
			'&:hover': {
				backgroundColor:
					theme.colorScheme === 'dark'
						? theme.colors.dark[6]
						: theme.colors.gray[1],
			},
		},

		activeSize: {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[1],
			color: theme.colorScheme === 'dark' ? theme.white : theme.black,
			fontWeight: 700,
		},
	};
});

const ItemView = ({ item }: { item: Item }) => {
	const dispatch = useDispatch();

	const { classes, cx } = useStyles();

	const form = useForm<{ size: number }>({
		validate: {
			size: v => (Boolean(v) ? null : 'Пожалуйста, выберите ваш размер'),
		},
	});

	const handleSizeSubmit = ({ size }: { size: number }) => {
		dispatch(addToCart({ ...item, size, cartId: uuid.v4() }));
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.cover}>
				<Image
					style={{ objectFit: 'contain' }}
					alt={item.title}
					src={item.image}
					fill
				/>
			</div>

			<div className={classes.info}>
				<Stack className={classes.details} spacing={10}>
					<Text inline weight={700} className={classes.title}>
						{item.title}
					</Text>
					<Group spacing={5} className={classes.description}>
						<Text weight={700}>${item.price}</Text>•<Text>{item.category}</Text>
						<Text mt={20}>{item.description}</Text>
					</Group>
				</Stack>

				<form onSubmit={form.onSubmit(handleSizeSubmit)}>
					<Stack spacing={10}>
						<Text size={16} weight={700}>
							Размер
						</Text>

						<SimpleGrid cols={4} mt="md" spacing={4}>
							{SIZES.map(size => (
								<UnstyledButton
									key={size}
									className={cx(
										classes.size,
										size === form.values?.size && classes.activeSize
									)}
									onClick={() => form.setFieldValue('size', size)}
								>
									<Text size="xs">{size}</Text>
								</UnstyledButton>
							))}
						</SimpleGrid>

						{form.errors?.size && (
							<Text fz={14} c="red">
								{form.errors.size}
							</Text>
						)}

						<Button
							type="submit"
							variant="gradient"
							gradient={{ from: 'indigo', to: 'cyan' }}
							mt={20}
							uppercase
							rightIcon={<FiArrowRight />}
						>
							В корзину
						</Button>
					</Stack>
				</form>
			</div>
		</div>
	);
};

export default ItemView;
