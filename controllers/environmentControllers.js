import Environment from '../database/models/Environment.js'

export const environmentControllers = {
    getEnvironments: async (req, res) => {
        try {
            const environments = await Environment.find();

            res.status(200).json(environments)
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    getEnvironment: async (req, res) => {
        try {
            const environment = await Environment.findById(req.params.id);

            res.status(200).json(environment);
        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    },
    newEnvironment: async (req, res) => {
        try {
            const {
                name,
                mainPlace,
                coach,
                clients,
                trainings,
                rating,
                createdAt
            } = req.body;

            const newEnvironment = new Environment({
                name,
                mainPlace,
                coach,
                clients,
                trainings,
                rating,
                createdAt
            });

            await newEnvironment.save();

            res.status(201).json(newEnvironment);
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    updateEnvironment: async (req, res) => {
        try {
            const envUpd = {
                ...req.body
            }

            const updateEnvironment = await Environment.findByIdAndUpdate(req.params.id,
                envUpd, {
                new: true
            })
            res.status(201).json(updateEnvironment)
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    },
    deleteEnvironment: async (req, res) => {
        try {
            const envRemove = await Environment.findById(req.params.id);

            await Environment.deleteOne({ _id: envRemove._id })

            res.status(204).send()
        } catch (error) {
            res.status(409).json({
                message: error.message
            })
        }
    }
}