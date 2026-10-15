import 'dotenv/config';
import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

dns.setServers(['8.8.8.8', '1.1.1.1']);

await connectMongoDB();

app.use(logger);
app.use(express.json());
app.use(cors());

app.use(notesRoutes);

app.use(celebrateErrors()); 

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});