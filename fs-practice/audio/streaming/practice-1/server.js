// npm packages
import * as express from 'express';
import * as multer from 'multer';
import { MongoClient, ObjectID, GridFSBucket } from 'mongodb';

// node native
import { Readable } from 'stream';

// config
import { config } from './config';

const routes = express.Router();

const app = express();
app.use('/audio', routes);

let db;
MongoClient.connect(config.mogodbHost, (err, database) => {
  if (err) {
    console.log(`MongoDB Connection Error Failed. ${err.message}`);
    process.exit(1);
  }
  db = database;
});

// TODO: GET audio/trackId using GridFSBucket
// TODO: POST audio/ upload using multer and GridFSBucket

app.listen(3750, () => console.log('Express server is now running on http://localhost:3750'));
