import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
  // Connect to the MongoDB database using the URI from the config
  await mongoose.connect(config.db_uri as string);
  app.listen(config.port, () => {
    console.log(`The server is running on ${config.port}`);
  });
}

main();
