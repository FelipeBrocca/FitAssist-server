import User from '../database/models/User.js'
import bcrypt from 'bcrypt'

export const userControllers = {
    getUsers: async (req, res) => {
        try {
            const users = await User.find().select('-passwordHash');

            res.status(200).json(users)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    getUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-passwordHash');

            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    newUser: async (req, res) => {
        try {
            const {
                name,
                isCoach,
                environment,
                password,
                email,
                createdAt
            } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).send({ message: 'Email ya registrado' })
            }

            const newUser = new User({
                name,
                isCoach,
                environment,
                email,
                passwordHash: bcrypt.hashSync(password, 10),
                createdAt
            });

            await newUser.save();

            res.status(201).json(newUser);
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    updateUser: async (req, res) => {
        try {
            const userUpd = {
                ...req.body
            }

            const updateUser = await User.findByIdAndUpdate(req.params.id,
                userUpd, {
                new: true
            })
            res.status(201).json(updateUser)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const userRemove = await User.findById(req.params.id);

            await User.deleteOne({ _id: userRemove._id })

            res.status(204).send()
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    }
}