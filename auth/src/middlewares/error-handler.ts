import { NextFunction, Request, Response } from 'express'

import { DatabaseConnectionError, RequestValidationError } from '../errors'

export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof RequestValidationError) {
		return res.status(err.statusCode).send({
			errors: err.serializeErrors(),
		})
	}

	if (err instanceof DatabaseConnectionError) {
		return res.status(err.statusCode).send({
			errors: err.serializeErrors(),
		})
	}

	res.status(400).send({ errors: [{ message: 'Something went wrong' }] })

	next()
}
