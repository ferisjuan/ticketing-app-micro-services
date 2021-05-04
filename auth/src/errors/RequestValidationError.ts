import { ValidationError } from 'express-validator'

export class RequestValidationError extends Error {
	constructor(public errors: ValidationError[]) {
		super()

		// Beacause we are extending a language base class (built in)
		Object.setPrototypeOf(this, RequestValidationError.prototype)
	}
}
