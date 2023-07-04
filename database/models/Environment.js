import mongoose from "mongoose";

const environmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mainPlace: {
        type: String
    },
    mainHours: {
        type: Object
    },
    mainDays: {
        type: Array
    },
    coach: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    trainings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Training',
    }],
    rating: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Environment = mongoose.model('Environment', environmentSchema);

export default Environment; 