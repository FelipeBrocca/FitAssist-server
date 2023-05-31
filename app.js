import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { corsOptions } from './database/config/corsOptions.js';
import { connectDB } from './database/database.js';
import { PORT } from './database/config/config.js';
import { jwtMiddleware } from './middlewares/jwtAuth.js';
import { errorHandler } from './middlewares/errorHandler.js'

const app = express()


app.use(express.json())
app.use(cors(corsOptions))
app.use(jwtMiddleware)
app.use(errorHandler)
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));



import mainRoutes from './routes/root.js'
import userRoutes from './routes/userRoutes.js'
import trainingRoutes from './routes/trainingRoutes.js'
import environmentRoutes from './routes/environmentRoutes.js'
import loginRoutes from './routes/loginRoutes.js'

app.use('/', mainRoutes)
app.use('/users', userRoutes)
app.use('/environments', environmentRoutes)
app.use('/trainings', trainingRoutes)
app.use('/login', loginRoutes)
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.send('404 Not Found!')
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})



connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error(err));