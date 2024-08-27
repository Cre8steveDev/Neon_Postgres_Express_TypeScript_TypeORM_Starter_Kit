import { DB } from './data-source';

/**
 * Connects to the database and initializes the data source.
 *
 * This function attempts to establish a connection to the database and initialize the data source.
 * If successful, it logs a success message to the console. If an error occurs, it logs the error and exits the process.
 *
 * @async
 * @returns {Promise<void>}
 */
const ConnectDatabase = async (): Promise<void> => {
  try {
    const status = await DB.initialize();
    console.log('Data Source has been initialized!');
  } catch (error) {
    console.error('Error during Data Source initialization:', error);
    process.exit(1);
  }
};

export default ConnectDatabase;
