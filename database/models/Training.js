import mongoose from "mongoose";

const trainingSchema = mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    date: {
        day: {
            type: Date,
            required: true
        },
        hour: {
            type: String,
            required: true
        }
    },
    assistance: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    price: { type: Number, required: true },
    active: { type: Boolean, default: true }
})

const Training = mongoose.model('Training', trainingSchema);

export default Training;