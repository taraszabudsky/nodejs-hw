import 'dotenv/config';
import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors as celebrateErrors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'; // ← додано імпорт

const app = express();
const PORT = process.env.PORT || 3000;

dns.setServers(['8.8.8.8', '1.1.1.1']);

await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(authRoutes);
app.use(notesRoutes);
app.use(userRoutes);

app.use(notFoundHandler);   // ← спочатку 404
app.use(celebrateErrors()); // ← потім помилки celebrate
app.use(errorHandler);      // ← загальний error handler

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});