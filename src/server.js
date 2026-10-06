import 'dotenv/config';
import dns from 'node:dns';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

dns.setServers(['8.8.8.8', '1.1.1.1']);

await connectMongoDB();

//мідлвер
app.use(logger);
app.use(express.json());
app.use(cors());

// Routes
app.use(notesRoutes);

// 404
app.use(notFoundHandler);

//це в кінці має бути(нотатки для себе)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});