import { ReactNode } from 'react';
import Header from './Header';
import { createStyles } from '@mantine/core';
import Spotlight from './Spotlight';
import Banner from './Banner';

const useStyles = createStyles(theme => ({
	inner: {
		maxWidth: theme.breakpoints.xl,
		margin: 'auto',
	},

	container: {
		padding: theme.spacing.md,
		[theme.fn.smallerThan('sm')]: {
			padding: 0,
			paddingBottom: theme.spacing.md,
		},
	},
}));

export default function Layout({ children }: { children: ReactNode }) {
	const { classes } = useStyles();

	return (
		<>
			<Banner />
			<Spotlight>
				<Header />
				<main className={classes.container}>
					<div className={classes.inner}>{children}</div>
				</main>
			</Spotlight>
		</>
	);
}
