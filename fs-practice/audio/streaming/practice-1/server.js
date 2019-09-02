// Npm packages
const express      = require('express');
const multer       = require('multer');

const { 
  MongoClient, 
  ObjectID, 
  GridFSBucket }   = require('mongodb');

// Node native
const { Readable } = require('stream');

// Config
const config       = require('./config');

// Express initialization
const routes       = express.Router();
const app          = express();

app.use('/audio', routes);

// Mongo initialization
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

app.post('/', (req, res) => {
  const storage = multer.memoryStorage();
  const upload = multer({
    storage, 
    limits: { 
      fields: 1, 
      fileSize: 6000000, 
      files: 1, 
      parts: 2 }
  });

  upload.single('track')(req, res, (err) => {
    
    // Error handling
    if (err) {
      return res.status(400).json({ message: 'Unable to upload the payload provided.'})
    }  else if (!req.body.name) {
      return res.status(400).json({ message: 'No track name in request body' });
    }

    const trackName           = req.body.name;

    // Convert buffer into readable stream

    const readableTrackStream = new Readable();
    
    readableTrackStream.push(req.file.buffer);
    
    // Ends Readable stream data
    readableTrackStream.push(null);

    const bucket = new GridFSBucket(db, {
      bucketName: 'tracks'
    });

    const uploadStream = bucket.openUploadStream(trackName);

    readableTrackStream.pipe(uploadStream);

    uploadStream.on('error', () => {
      return res.status(500).json({ message: "Error uploading file" });
    });

    uploadStream.on('finish', () => {
      return res.status(201).json({ message: `File uploaded successfully, stored under Mongo ObjectID: ${uploadStream.id}`});
    })
    });

});

app.listen(3750, () => console.log('Express server is now running on http://localhost:3750'));
