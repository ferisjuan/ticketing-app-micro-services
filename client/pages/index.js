import buildClient from '../api/buildClient'

const LandingPage = ({ currentUser }) => {
	return currentUser ? <h1>You are sign in</h1> : <h1>You are not sign in</h1>
}

LandingPage.getInitialProps = async context => {
	const client = buildClient(context)
	const { data } = await client.get('/api/users/currentuser')

	return data
}

export default LandingPage
