import mongoose from 'mongoose'
import { Password } from '../services'

// What it takes to create a user (an instance of a user)
interface UserAttrs {
	email: string
	password: string
}

// Describes the properties a User Model Has
interface UserModel extends mongoose.Model<any> {
	build(attrs: UserAttrs): UserDoc
}

// Describes the properties that a User Document Has
interface UserDoc extends mongoose.Document {
	email: string
	password: string
}

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
})

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'))
		this.set('password', hashed)
	}

	done()
})

userSchema.statics.build = (attrs: UserAttrs) => {
	return new User(attrs)
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }
