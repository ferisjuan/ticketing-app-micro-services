import request from 'supertest'
import { app } from '../../app'

it('Should await a 201 on successful signup', async () => {
	await global.signin()
})

it('Should await a 400 on invalid email', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'asdfesdfg',
			password: 'password',
		})
		.expect(400)
})

it('Should await a 400 on invalid password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'p',
		})
		.expect(400)
})

it('Should await a 400 on with missing email and password', async () => {
	await request(app).post('/api/users/signup').send({}).expect(400)
})

it('Should await a 400 on with missing email or password', async () => {
	await request(app)
		.post('/api/users/signup')
		.send({ email: 'test@test.com' })
		.expect(400)

	await request(app)
		.post('/api/users/signup')
		.send({ password: 'password' })
		.expect(400)
})

it('Should disallow duplicate emails', async () => {
	await global.signin()

	await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(400)
})

it('Should set a cookie after successful signup', async () => {
	const response = await request(app)
		.post('/api/users/signup')
		.send({
			email: 'test@test.com',
			password: 'password',
		})
		.expect(201)

	expect(response.get('Set-Cookie')).toBeDefined()
})
