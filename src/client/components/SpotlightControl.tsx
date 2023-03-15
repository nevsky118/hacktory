import {
	Group,
	UnstyledButton,
	Text,
	ActionIcon,
	createStyles,
} from '@mantine/core';
import { useSpotlight } from '@mantine/spotlight';
import { FiSearch } from 'react-icons/fi';

const useStyles = createStyles(theme => ({
	search: {
		height: '34px',
		padding: '0px 5px 0px 12px',
		borderRadius: theme.radius.md,
		border: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[0],
		},
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	icon: {
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[2]
				: theme.colors.dark[1],
	},

	kbd: {
		padding: '4px 7px',
		lineHeight: 1,
		fontSize: '11px',
		fontWeight: 700,
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[7]
				: theme.colors.gray[0],
		borderRadius: theme.radius.sm,
		border: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
		}`,
	},

	searchIcon: {
		[theme.fn.largerThan('sm')]: {
			display: 'none',
		},
	},
}));

const SpotlightControl = () => {
	const { classes } = useStyles();

	const spotlight = useSpotlight();

	return (
		<>
			<UnstyledButton
				onClick={() => spotlight.openSpotlight()}
				className={classes.search}
			>
				<Group spacing={10}>
					<FiSearch className={classes.icon} size={14} />

					<Text fz="sm" color="dimmed" pr={80}>
						Поиск
					</Text>

					<Text className={classes.kbd}>Ctrl + K</Text>
				</Group>
			</UnstyledButton>
			<ActionIcon
				className={classes.searchIcon}
				onClick={() => spotlight.openSpotlight()}
				size={34}
				radius="sm"
				variant="default"
			>
				<FiSearch />
			</ActionIcon>
		</>
	);
};

export default SpotlightControl;
