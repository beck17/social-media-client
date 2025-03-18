import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import AuthProvider from '../providers/auth-provider/AuthProvider'
import { TypeComponentAuthFields } from '@/providers/auth-provider/authPage.types'

import { store } from '@/store/store'

import '@/assets/styles/globals.scss'


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})

export default function App({
															Component,
															pageProps,
														}: AppProps & TypeComponentAuthFields) {
	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<AuthProvider>
					<Component {...pageProps} />
					<Toaster />
				</AuthProvider>
			</Provider>
		</QueryClientProvider>
	)
}
