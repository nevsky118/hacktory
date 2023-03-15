import { createStyles, Text } from '@mantine/core';

const useStyles = createStyles(theme => ({
	root: {
		position: 'relative',
		backgroundImage: theme.fn.gradient({ from: 'indigo', to: 'cyan' }),
		color: theme.white,
		padding: theme.spacing.xs,
		paddingRight: theme.spacing.xs,
		paddingTop: '4px',
		paddingBottom: '4px',
	},

	inner: {
		maxWidth: theme.breakpoints.xl,
		margin: 'auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: theme.spacing.xs,
		overflow: 'hidden',
	},
}));

const Banner = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.inner}>
				<Text>
					-10% НА ВСЁ ПО ПРОМОКОДУ <b>GIFT10</b>
				</Text>
			</div>
		</div>
	);
};

export default Banner;
