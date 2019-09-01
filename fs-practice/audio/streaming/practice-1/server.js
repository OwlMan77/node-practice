// npm packages
const express      = require('express');
const multer       = require('multer');

const { 
  MongoClient, 
  ObjectID, 
  GridFSBucket }   = require('mongodb');

// node native
const { Readable } = require('stream');

// config
const config       = require('./config');

// express intialization
const routes       = express.Router();
const app          = express();

app.use('/audio', routes);

// Mongo intialization
let db;
MongoClient.connect(config.mogodbHost, (err, database) => {
  if (err) {
    console.log(`MongoDB Connection Error Failed. ${err.message}`);
    process.exit(1);
  }
  db = database;
});


// GET route
routes.get('/:trackId', (req, res) => {
    try {
      const trackID = new ObjectID(req.params.trackID);

      res.set('content-type', 'audio/mp3');
      res.set('accept-ranges', 'bytes');
  
      let bucket = new GridFSBucket(db, { bucketName: 'tracks' });
  
      let downloadStream = bucket.openDownloadStream(trackID);
  
      downloadStream.on('data', (chuck) => res.write(chuck));
  
      downloadStream.on('end', () => res.end());
  
      downloadStream.on('error', () => res.sendStatus(404));
    } catch (err) {
      res.status(400).json({ message: 'Invalid ID given as path parameter.' })
    }
});

// TODO: POST audio/ upload using multer and GridFSBucket

app.listen(3750, () => console.log('Express server is now running on http://localhost:3750'));
