import {
	createStyles,
	Header as HeaderComponent,
	Group,
	ActionIcon,
	useMantineColorScheme,
	Indicator,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiSun, FiMoon } from 'react-icons/fi';
import SpotlightControl from './SpotlightControl';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const useStyles = createStyles(theme => ({
	header: {
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
	},

	inner: {
		height: 56,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		maxWidth: theme.breakpoints.xl,
		margin: 'auto',
	},

	block: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},
}));

const Header = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { classes } = useStyles();
	const cartSize = useSelector((state: RootState) => state.cart.size);

	return (
		<HeaderComponent height={56} className={classes.header}>
			<div className={classes.inner}>
				<Link href="/">
					<Image alt="Logo" src="logo.svg" width={34} height={34} />
				</Link>

				<Group>
					<SpotlightControl />
					<Indicator
						label={cartSize}
						showZero={false}
						dot={false}
						inline
						overflowCount={10}
						size={16}
					>
						<ActionIcon
							component={Link}
							href="/cart"
							size={34}
							radius="sm"
							variant="default"
						>
							<FiShoppingCart />
						</ActionIcon>
					</Indicator>

					<ActionIcon
						variant="default"
						onClick={() => toggleColorScheme()}
						size={34}
					>
						{colorScheme === 'dark' ? (
							<FiSun size={16} />
						) : (
							<FiMoon size={16} />
						)}
					</ActionIcon>
				</Group>
			</div>
		</HeaderComponent>
	);
};

export default Header;
