import express from 'express'
import 'express-async-errors'

import { NotFoundError } from '@jferistickets/common'
import { errorHandler } from '@jferistickets/common'

import cookieSession from 'cookie-session'

import {
	currentUserRouter,
	signinRouter,
	signoutRouter,
	signupRouter,
} from './routes'

const app = express()
app.set('trust proxy', true) // express is aware is behind proxy from nginx

app.use(express.json())
app.use(
	cookieSession({
		signed: false,
		secure: process.env.NODE_ENV !== 'test',
	})
)

// Routes
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.all('*', async () => {
	throw new NotFoundError()
})

// Middlewares
app.use(errorHandler)

export { app }
