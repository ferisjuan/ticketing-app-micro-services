import mongoose from 'mongoose'

export const generateMongoId = () => new mongoose.Types.ObjectId().toHexString()
