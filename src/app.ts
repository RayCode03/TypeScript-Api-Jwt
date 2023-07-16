import express, {Application} from 'express';
import authRoutes from './routes/auth';

import morgan from 'morgan';

const app: Application = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api', authRoutes)


export default app;






