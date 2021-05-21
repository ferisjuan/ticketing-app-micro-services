import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div className=''>
			<Header currentUser={currentUser} />
			<Component {...pageProps} />
		</div>
	)
}

// context = { appTree, Component, router, ctx }
AppComponent.getInitialProps = async appContext => {
	const client = buildClient(appContext.ctx)
	const { data } = await client.get('/api/users/currentUser')

	let pageProps = {}
	if (appContext.Component.getInitialProps)
		pageProps = await appContext.Component.getInitialProps(appContext.ctx)

	return {
		pageProps,
		...data,
	}
}

export default AppComponent
