import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernproject'
// Use connect method to connect to the server
// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true },(err, db)=>{
//   console.log("Connected successfully to mongodb server")
//   db.close()
// })

// Connection URL
mongoose.Promise = global.Promise
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
/*.then(()=> {console.log ("S?UCCESS")},error => {
  console.log (error);
})*/

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`)
  })

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})
