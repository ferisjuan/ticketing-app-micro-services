import express from 'express'

const router = express.Router()

router.post('/api/users/signup', (req, res) => {
	res.send('Hi Juan!')
})

export { router as signupRouter }
