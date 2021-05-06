import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../errors'

const router = express.Router()

router.get('/api/users/currentuser', (req: Request, res: Response) => {
	if (!req.session?.jwt) return res.send({ currentUser: null })

	try {
		const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)

		res.send({ currentUser: payload })
	} catch (error) {
		res.send({ currentUserRouter: null })
	}
})

export { router as currentUserRouter }
