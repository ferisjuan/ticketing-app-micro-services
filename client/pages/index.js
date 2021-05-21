import buildClient from '../api/build-client'
import AppComponent from './_app'

const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>You are signed in</h1>
	) : (
		<h1>You are not signed in</h1>
	)
}

// context = {req, res}
LandingPage.getInitialProps = async context => {
	// wont run if there is a getInitialProps on AppComponent
	const client = buildClient(context)
	const { data } = await client.get('/api/users/currentuser')

	return data
}

export default LandingPage
