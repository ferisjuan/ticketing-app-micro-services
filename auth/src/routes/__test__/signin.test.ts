import request from 'supertest'

import { app } from '../../app'

it('I should sign in ', async () => {
	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(403)
})

it('Should fail when an incorrect password is suplied', async () => {
	await global.signin()

	await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'asdfwer',
		})
		.expect(403)
})

it('Should respond with a cookie when given valid credentials', async () => {
	await global.signin()

	const response = await request(app)
		.post('/api/users/signin')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(200)

	expect(response.get('Set-Cookie')).toBeDefined()
})
