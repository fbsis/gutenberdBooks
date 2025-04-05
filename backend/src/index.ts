import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';
import { swaggerDocument } from './swagger';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Book routes
app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
}); 