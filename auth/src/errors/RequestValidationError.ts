import { ValidationError } from 'express-validator'

export class RequestValidationError extends Error {
	statusCode = 400
	constructor(private errors: ValidationError[]) {
		super()

		// Beacause we are extending a language base class (built in)
		Object.setPrototypeOf(this, RequestValidationError.prototype)
	}

	serializeErrors() {
		return this.errors.map(error => ({
			message: error.msg,
			field: error.param,
		}))
	}
}
