import mongoose, { mongo } from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    isCoach: {
        type: Boolean,
        default: false,
        required: true
    },
    environment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Environment'
    }],
    passwordHash: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', userSchema);

export default User;