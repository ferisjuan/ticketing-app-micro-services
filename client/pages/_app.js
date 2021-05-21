import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'

const AppComponent = ({ Component, pageProps, currentUser }) => {
	console.log(currentUser)
	return (
		<div className=''>
			<h1>Header {currentUser?.email}</h1>
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

	console.log(pageProps)

	return {
		pageProps,
		...data,
	}
}

export default AppComponent
