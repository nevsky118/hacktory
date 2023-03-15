import {
	Button,
	Card,
	createStyles,
	Divider,
	Group,
	Mark,
	Paper,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import CartItem from '@/components/CartItem';
import { useForm } from '@mantine/form';
import { emptyCart, setCoupon } from '@/services/cartSlice';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useGetFlagQuery } from '@/services/items';

import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';

const useStyles = createStyles(theme => ({
	root: {
		display: 'flex',
		width: '100%',
		padding: '0px',
		[theme.fn.smallerThan('md')]: {
			flexDirection: 'column',
			gap: theme.spacing.md,
		},
		[theme.fn.smallerThan('sm')]: { padding: theme.spacing.md },
	},

	header: {
		display: 'flex',
		alignItems: 'center',
		padding: '0px 10px',
		height: '40px',
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[0],
	},

	aside: {
		flexBasis: '30%',
		height: 'fit-content',
		marginLeft: theme.spacing.md,
		[theme.fn.smallerThan('md')]: {
			marginLeft: 0,
		},
	},

	summary: {
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		borderRadius: '4px',
	},

	checkout: { [theme.fn.smallerThan('md')]: { order: 1 } },

	close: {
		padding: theme.spacing.sm,
		[theme.fn.smallerThan('md')]: {
			padding: 0,
		},
	},

	empty: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 80,
	},

	text: {
		fontSize: theme.spacing.md,
		[theme.fn.smallerThan('sm')]: { fontSize: '14px' },
	},
}));

type formValues = {
	coupon: string;
};

interface CartProps {
	flag: string;
}

const Cart = ({ flag }: CartProps) => {
	const { classes } = useStyles();

	const dispatch = useDispatch();
	const cart = useSelector((state: RootState) => state.cart);

	const [showOrderDetails, setShowOrderDetails] = useState(false);

	const { data, isLoading: isFlagLoading } = useGetFlagQuery(
		cart.coupon?.value,
		{
			skip: cart.coupon?.discount !== 100,
		}
	);

	useEffect(() => {
		window.flag = flag;
	}, []);

	const form = useForm<formValues>({
		initialValues: {
			coupon: cart.coupon?.value || '',
		},
	});

	const handleCouponSubmit = async ({ coupon }: { coupon: string }) => {
		try {
			const response = await fetch(`/api/coupons/${coupon}`);
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			const data = await response.json();
			dispatch(setCoupon(data));
		} catch (error) {
			form.setFieldError(
				'coupon',
				<div
					dangerouslySetInnerHTML={{
						__html: `Промокода ${form.values.coupon} не существует`,
					}}
				/>
			);
		}
	};

	const handleOrderDetails = () => {
		setShowOrderDetails(true);
		dispatch(emptyCart());
	};

	if (showOrderDetails) {
		return <div>Заказ был сформирован.</div>;
	}

	return (
		<>
			<Head>
				<title>Корзина — Интернет-Магазин</title>
			</Head>
			{cart.size === 0 ? (
				<Stack spacing="xl" className={classes.empty}>
					<Title order={2} fw={900} align="center">
						Сложите в корзину нужные товары
					</Title>

					<Text color="dimmed" size="lg" align="center">
						А чтобы их найти, загляните в каталог
					</Text>

					<Button
						component={Link}
						variant="gradient"
						gradient={{ from: 'indigo', to: 'cyan' }}
						size="md"
						w="fit-content"
						href="/"
					>
						На главную
					</Button>
				</Stack>
			) : (
				<div className={classes.root}>
					<Stack style={{ flexBasis: '70%' }}>
						<Paper className={classes.header} withBorder>
							<Title order={4} fw={600}>
								Корзина
							</Title>
						</Paper>
						<div>
							{cart.items.map(item => (
								<CartItem key={item.cartId} item={item} />
							))}
						</div>
					</Stack>
					<Stack className={classes.aside}>
						<Button
							variant="gradient"
							gradient={{ from: 'indigo', to: 'cyan' }}
							size="lg"
							className={classes.checkout}
							style={{ height: '56px' }}
							onClick={handleOrderDetails}
						>
							Перейти к оформлению
						</Button>
						<Card className={classes.summary} p="sm" withBorder>
							{cart.size > 0 && (
								<Text className={classes.text}>
									Всего: {cart.size} {cart.size === 1 ? 'позиция' : 'позиций'}
								</Text>
							)}
							<Divider mb="sm" mt={3} />

							<Stack spacing={10}>
								<Group position="apart">
									<Text className={classes.text}>
										Сумма заказа (без скидки)
									</Text>
									<Text className={classes.text}>{cart.total}₽</Text>
								</Group>

								<Group position="apart">
									<Text className={classes.text}>Доставка</Text>
									<Text className={classes.text}>0₽</Text>
								</Group>

								{cart.coupon && (
									<Group position="apart">
										<Text className={classes.text}>
											Промокод {cart.coupon.value}
										</Text>
										<Text color="red" className={classes.text}>
											-{cart.total * (cart.coupon.discount / 100)}₽
										</Text>
									</Group>
								)}
							</Stack>

							<Group position="apart" my={14}>
								<Text weight={700} fz={20}>
									Итого
								</Text>
								<Text weight={700} fz={20}>
									{cart.coupon
										? cart.total - cart.total * (cart.coupon.discount / 100)
										: cart.total}
									₽
								</Text>
							</Group>
							<form onSubmit={form.onSubmit(handleCouponSubmit)}>
								<TextInput
									size="md"
									rightSection={
										form.values?.coupon && (
											<Button type="submit" variant="light">
												Применить
											</Button>
										)
									}
									placeholder="Промокод"
									rightSectionWidth={120}
									autoComplete="off"
									autoCapitalize="off"
									autoCorrect="off"
									{...form.getInputProps('coupon')}
								/>
							</form>
						</Card>

						{!isFlagLoading && data && (
							<Paper withBorder p="sm">
								<Text>
									FLAG: <Mark>{data.flag}</Mark>
								</Text>
							</Paper>
						)}
					</Stack>
				</div>
			)}
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	const filePath = path.join(process.cwd(), 'flag.txt');
	const flag = fs.readFileSync(filePath, 'utf-8');
	return { props: { flag } };
};

export default Cart;
