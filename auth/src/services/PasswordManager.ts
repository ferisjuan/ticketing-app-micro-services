import { randomBytes, scrypt } from 'crypto'
import { promisify } from 'util'

const scryptAcync = promisify(scrypt)

export class PasswordManager {
	static async toHash(password: string) {
		const salt = randomBytes(8).toString('hex')
		const buf = await buffer(password, salt)

		return `${buf.toString('hex')}.${salt}`
	}

	static async compare(storedPassword: string, suppliedPassword: string) {
		const [hashedPassword, salt] = storedPassword.split('.')
		const buf = await buffer(suppliedPassword, salt)

		return buf.toString('hex') === hashedPassword
	}
}

async function buffer(password: string, salt: string) {
	return (await scryptAcync(password, salt, 64)) as Buffer
}
