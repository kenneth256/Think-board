import mongoose from 'mongoose'
import 'dotenv/config';

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("successfully connected to DB!")
    } catch (error) {
        console.log(error)
    }
}

const noteSchema = new mongoose.Schema({
    title: String,
    note: String
}, {
    timestamps: true
})


export const Note = mongoose.model("Note", noteSchema);