import axios from 'axios'

export default ({ req }) => {
	const configCreate =
		typeof window === 'undefined'
			? {
					// we are on the server
					baseURL:
						'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
					headers: req.headers,
			  }
			: {
					// We must be on the browser
					baseURL: '/',
			  }

	return axios.create(configCreate)
}
