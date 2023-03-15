import {
	SpotlightAction,
	SpotlightActionProps,
	SpotlightProvider,
} from '@mantine/spotlight';
import { ReactNode, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useGetItemsQuery } from '@/services/items';
import { useRouter } from 'next/router';
import {
	Center,
	createStyles,
	Group,
	UnstyledButton,
	Text,
} from '@mantine/core';
import Image from 'next/image';
var debounce = require('lodash.debounce');

const useStyles = createStyles(theme => ({
	action: {
		position: 'relative',
		display: 'block',
		width: '100%',
		padding: `4px`,
		borderRadius: theme.radius.sm,
		...theme.fn.hover({
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[4]
					: theme.colors.gray[1],
		}),
		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[4]
					: theme.colors.gray[1],
		},
	},
}));

function CustomAction({
	action,
	styles,
	classNames,
	hovered,
	onTrigger,
	...others
}: SpotlightActionProps) {
	const { classes } = useStyles(undefined, {
		styles,
		classNames,
		name: 'Spotlight',
	});

	return (
		<UnstyledButton
			className={classes.action}
			tabIndex={-1}
			onMouseDown={event => event.preventDefault()}
			onClick={onTrigger}
			{...others}
		>
			<Group noWrap>
				{action.image && (
					<Center style={{ borderRadius: '4px', overflow: 'hidden' }}>
						<Image
							src={action.image}
							alt={action.title}
							width={50}
							height={50}
						/>
					</Center>
				)}

				<div style={{ flex: 1 }}>
					<Text size="md">{action.title}</Text>

					{action.description && (
						<Text color="dimmed" size="xs" lineClamp={1}>
							{action.description}
						</Text>
					)}
				</div>
			</Group>
		</UnstyledButton>
	);
}

const Spotlight = ({ children }: { children: ReactNode }) => {
	const router = useRouter();

	const [q, setQ] = useState<string | undefined>(undefined);

	// @ts-ignore
	const debouncedSetQuery = debounce(value => {
		setQ(value);
	}, 500);

	const { data, isFetching, isLoading } = useGetItemsQuery({
		page: 1,
		...(q && { q }),
	});

	const actions = (query: string): SpotlightAction[] => {
		debouncedSetQuery(query);

		if (query && data) {
			return data.docs.map(({ title, description, image }) => ({
				title,
				description,
				// onTrigger: () => {},
				onTrigger: () =>
					router.push(`${title.toLowerCase().replaceAll(' ', '-')}`),
				image,
			}));
		} else {
			return [];
		}
	};

	return (
		<SpotlightProvider
			actions={actions}
			searchIcon={<FiSearch size={18} />}
			searchPlaceholder="Поиск..."
			nothingFoundMessage="Результатов не найдено..."
			shortcut="mod + k"
			limit={6}
			actionComponent={CustomAction}
		>
			{children}
		</SpotlightProvider>
	);
};

export default Spotlight;
