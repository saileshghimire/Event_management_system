import express, { Express} from 'express';

const app = express();

app.use(express.json());



const PORT = "3000" as string;

app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
  });