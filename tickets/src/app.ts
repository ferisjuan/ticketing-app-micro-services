import express from 'express'
import 'express-async-errors'

import { currentUser, NotFoundError } from '@jferistickets/common'
import { errorHandler } from '@jferistickets/common'

import cookieSession from 'cookie-session'
import { createTicketRouter } from './routes/new'
import { showTicketsRouter } from './routes/show'
import { indexTicketRouter } from './routes'
import { updateTicketsRouter } from './routes/update'

const app = express()

// express is aware is behind proxy from nginx
app.set('trust proxy', true)
app.use(express.json())
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	})
)
app.use(currentUser)

// Routes
app.use(createTicketRouter)
app.use(indexTicketRouter)
app.use(showTicketsRouter)
app.use(updateTicketsRouter)

app.all('*', async () => {
	throw new NotFoundError()
})

// Middlewares
app.use(errorHandler)

export { app }
