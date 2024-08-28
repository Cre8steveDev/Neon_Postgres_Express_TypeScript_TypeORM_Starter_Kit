import setUpApp from './setUpApp';
import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;

const initializeApp = async () => {
  const app = await setUpApp();

  app.listen(PORT || 3000, () =>
    console.log('Server is running on port: ', PORT)
  );
};

// Call the function
// Initialize entry of App for server
initializeApp();
