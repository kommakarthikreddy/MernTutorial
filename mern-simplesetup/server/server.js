import path from 'path'
import express from 'express'
import { MongoClient } from 'mongodb'
import config from './../config/config'
import template from './../template'
//comment out before building for production
import devBundle from './devBundle'
import app from './express'
import mongoose from 'mongoose'

app.listen(config.port, function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})

mongoose.connect(config.mongoUri, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));