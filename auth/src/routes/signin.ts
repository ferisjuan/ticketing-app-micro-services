import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { ValidateRequest } from '../middlewares'
import { BadRequestError } from '../errors'

import { User } from '../models'
import { PasswordManager } from '../services'

const router = express.Router()

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Invalid email or password'),
		body('password').trim().notEmpty().withMessage('Invalid email or password'),
	],
	ValidateRequest,
	async (req: Request, res: Response) => {
		const { email, password } = req.body

		const existingUser = await User.findOne({ email })

		if (!existingUser) throw new BadRequestError('Invalid credentials')

		const passwordsMatch = await PasswordManager.compare(
			existingUser.password,
			password
		)

		if (!passwordsMatch) throw new BadRequestError('Invalid credentials')

		const userJwt = jwt.sign(
			{
				id: existingUser.id,
				email: existingUser.email,
			},
			process.env.JWT_KEY!
		)

		// Store it on session
		req.session = { jwt: userJwt }

		res.status(200).send(existingUser)
	}
)

export { router as signinRouter }
