import request from 'supertest'

import { app } from '../../app'

it('Should clear the cookie after signing out', async () => {
	await global.signin()

	const response = await request(app).post('/api/user/signout').send({})
	expect(200)

	expect(response.get('Set-Cookie')).toBeUndefined()
})
