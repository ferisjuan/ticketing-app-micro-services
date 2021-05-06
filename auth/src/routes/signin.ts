import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { ValidateRequest } from '../middlewares'

const router = express.Router()

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Invalid email or password'),
		body('password').trim().notEmpty().withMessage('Invalid email or password'),
	],
	ValidateRequest,
	async (req: Request, res: Response) => {}
)

export { router as signinRouter }
