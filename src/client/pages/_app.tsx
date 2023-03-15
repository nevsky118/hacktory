import '@/styles/globals.css';
import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { getCookie, setCookie } from 'cookies-next';
import {
	MantineProvider,
	ColorScheme,
	ColorSchemeProvider,
} from '@mantine/core';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Spotlight from '@/components/Spotlight';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

let persistor = persistStore(store);

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		props.colorScheme
	);

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme =
			value || (colorScheme === 'dark' ? 'light' : 'dark');
		setColorScheme(nextColorScheme);
		setCookie('mantine-color-scheme', nextColorScheme, {
			maxAge: 60 * 60 * 24 * 30,
		});
	};

	return (
		<>
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					theme={{ colorScheme }}
					withGlobalStyles
					withNormalizeCSS
				>
					<Provider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							<Spotlight>
								<Layout>
									<Component {...pageProps} />
								</Layout>
							</Spotlight>
						</PersistGate>
					</Provider>
				</MantineProvider>
			</ColorSchemeProvider>
		</>
	);
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
	colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});
