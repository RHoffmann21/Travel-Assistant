import mongoose from 'mongoose';
import logger from 'dts-node-logger';

/**
 * @description This function creates a connection between the application and the mongo database
 * @param {String} mongoUri The connection uri for the mongo database 
 */
export default async function connectDB (mongoUri) {
  if (!mongoUri) {
    logger.error('No mongoUri provided.');
  }
  try {
    await mongoose.connect(mongoUri);
    logger.debug('Now connected to: ', mongoUri);
  } catch (err) {
    logger.error(`Something went wrong while connecting to uri ${mongoUri}. Error: `, err);
  }

  const mongo = mongoose.connection;
  mongo.on('error', error => { logger.error('mongo: ' + error.name); });
  mongo.on('connected', () => { logger.info('mongo: Connected'); });
  mongo.on('disconnected', () => { logger.info('mongo: Disconnected'); });
  mongo.once('open', () => { logger.info('Mongodb Connection Successful'); });
};
