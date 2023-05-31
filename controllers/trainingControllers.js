import Training from '../database/models/Training.js'

export const trainingControllers = {
    getTrainings: async (req, res) => {
        try {
            const trainings = await Training.find();

            res.status(200).json(trainings)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    getTraining: async (req, res) => {
        try {
            const training = await Training.findById(req.params.id);

            res.status(200).json(training);
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    newTraining: async (req, res) => {
        try {
            const {
                place,
                date,
                assistance,
                price,
                active
            } = req.body;

            const newTraining = new Training({
                place,
                date,
                assistance,
                price,
                active
            });

            await newTraining.save();

            res.status(201).json(newTraining);
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    updateTraining: async (req, res) => {
        try {
            const trUpd = {
                ...req.body
            }

            const updateTraining = await Training.findByIdAndUpdate(req.params.id,
                trUpd, {
                new: true
            })
            res.status(201).json(updateTraining)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    deleteTraining: async (req, res) => {
        try {
            const trRemove = await Training.findById(req.params.id);

            await Training.deleteOne({ _id: trRemove._id })

            res.status(204).send()
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    }
}