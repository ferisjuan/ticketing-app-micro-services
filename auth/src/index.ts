import express from 'express'
import { errorHandler } from './middlewares'
import {
	currentUserRouter,
	signinRouter,
	signoutRouter,
	signupRouter,
} from './routes'

const app = express()
app.use(express.json())

// Routes
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

// Middlewares
app.use(errorHandler)

app.listen(3000, () => {
	console.log('Listening on port 3000')
})
