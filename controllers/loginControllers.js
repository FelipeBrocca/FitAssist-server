import User from '../database/models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const loginControllers = {
    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email })
            const secretJwt = process.env.JWT_SECRET;

            if (!user) {
                return res.status(400).send('Usuario no registrado')
            }

            if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
                const token = jwt.sign({
                    userId: user._id,
                    isCoach: user.isCoach
                },
                    secretJwt,
                    {
                        expiresIn: '1d',
                    }
                )
                res.status(200).send({ user: user.email, token: token })
            } else {
                res.status(400).send('Contraseña incorrecta');
            }

        } catch (error) {
            res.status(404).json({
                message: error.message
            })
        }
    }
}
