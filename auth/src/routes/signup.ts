import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models'

import { BadRequestError, RequestValidationError } from '../errors'

const router = express.Router()

router.post(
	'/api/users/signup',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.isLength({ min: 4, max: 20 })
			.withMessage('Password must be between 4 and 20 characters'),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			throw new RequestValidationError(errors.array())
		}

		const { email, password } = req.body
		const existingUser = await User.findOne({ email })

		if (existingUser) {
			throw new BadRequestError('Email in use') // in PROD send another message
		}

		const user = User.build({ email, password })
		await user.save()

		// Generate JWT
		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			'asdf'
		)

		// Store it on session
		req.session = { jwt: userJwt }

		res.status(201).send(user)
	}
)

export { router as signupRouter }
