import { NextFunction, Request, Response } from 'express'

import { DatabaseConnectionError, RequestValidationError } from '../errors'

export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof RequestValidationError) {
		const formatedErrors = err.errors.map(error => ({
			message: error.msg,
			field: error.param,
		}))

		return res.status(400).send({ errors: formatedErrors })
	}

	if (err instanceof DatabaseConnectionError) {
		const formatedErrors = [{ message: err.reason }]
		return res.status(500).send({ errors: formatedErrors })
	}

	res.status(400).send({ errors: [{ message: 'Something went wrong' }] })

	next()
}
