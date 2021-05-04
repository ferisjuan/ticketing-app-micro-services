import { CustomError } from './CustomError'

export class DatabaseConnectionError extends CustomError {
	statusCode = 500
	reason = 'Database error'

	constructor() {
		super('Error connectin to database')

		Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
	}

	serializeErrors() {
		return [{ message: this.reason }]
	}
}
