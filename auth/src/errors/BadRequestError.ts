import { CustomError } from './CustomError'

export class BadRequestError extends CustomError {
	statusCode = 403

	constructor(public message: string) {
		super(message)

		Object.setPrototypeOf(this, BadRequestError.prototype)
	}

	serializeErrors() {
		return [{ message: this.message }]
	}
}
