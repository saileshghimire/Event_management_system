import express, { Express} from 'express';
import router from './routes';

const app = express();

app.use(express.json());

app.use('/api/v1',router);

const PORT = "3000" as string;

app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
  });