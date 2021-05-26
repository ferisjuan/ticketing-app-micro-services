import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'

it('returns 404 if the provided id does not exist', async () => {
	const id = new mongoose.Types.ObjectId().toHexString()

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'asdljh',
			price: 20,
		})
		.set('Cookie', global.signin())
		.expect(404)
})

it('returns 401 if the user is not authenticated', async () => {
	const id = new mongoose.Types.ObjectId().toHexString()

	const response = await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'asdljh',
			price: 20,
		})
		.expect(401)
})

it('returns 401 if the user does not own the ticket', async () => {
	// create a ticket
	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', global.signin())
		.send({ title: 'alskdj', price: 20 })

	await request(app)
		.put(`/api/tickets/${response.body.id}`)
		.set('Cookie', global.signin()) // pretend I am another user
		.send({
			title: 'qwoiuye',
			price: 30,
		})
		.expect(401)
})

it('returns 400 if user does not provide an invalid title or price', async () => {
	const cookie = global.signin()

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({ title: 'alskdj', price: 20 })

	const id = response.body.id

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: '',
			price: 20,
		})
		.set('Cookie', cookie)
		.expect(400)

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			price: 20,
		})
		.set('Cookie', cookie)
		.expect(400)

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'asdljh',
			price: -1,
		})
		.set('Cookie', cookie)
		.expect(400)

	await request(app)
		.put(`/api/tickets/${id}`)
		.send({
			title: 'asdljh',
		})
		.set('Cookie', cookie)
		.expect(400)
})

it('does update the ticket', async () => {
	const cookie = global.signin()

	const response = await request(app)
		.post('/api/tickets')
		.set('Cookie', cookie)
		.send({ title: 'alskdj', price: 20 })

	const id = response.body.id
	const title = 'U2'
	const price = 30

	await request(app)
		.put(`/api/tickets/${id}`)
		.set('Cookie', cookie)
		.send({
			title,
			price,
		})
		.expect(200)

	const ticketResponse = await request(app).get(`/api/tickets/${id}`).send()

	expect(ticketResponse.body.title).toEqual(title)
	expect(ticketResponse.body.price).toEqual(price)
})
