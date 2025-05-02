import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import eventsRoutes from './routes/events';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', eventsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
