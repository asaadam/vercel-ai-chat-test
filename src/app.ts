import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import session from 'express-session';
import routes from './routes';
import chatRoutes from './routes/chat';
import authRoutes from './routes/auth'
import './database';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mysecretcode',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// Use the routes
app.use('/', routes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth/google', authRoutes);

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

export default app;
