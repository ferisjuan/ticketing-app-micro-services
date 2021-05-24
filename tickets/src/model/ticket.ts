import mongoose, { Document, Model, Schema } from 'mongoose'

interface TicketAttrs {
	userId: string
	price: number
	title: string
}

interface TicketDoc extends Document {
	userId: string
	price: number
	title: string
}

interface TicketModel extends Model<TicketDoc> {
	build(attrs: TicketAttrs): TicketDoc
}

const TicketSchema = new Schema(
	{
		title: {
			type: String, // Refers to the String constructor in JS
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		userId: {
			type: String,
			requires: true,
		},
	},
	{
		// modiify the toJSON so it returns what I need
		toJSON: {
			// ret is the object that will turn into JSON
			transform(doc, ret) {
				ret.id = ret._id
				delete ret._id
			},
		},
	}
)

// this is the way to create new tickets
// this will anotate it
TicketSchema.statics.build = (attrs: TicketAttrs) => {
	return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', TicketSchema)

export { Ticket }
