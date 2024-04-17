import express from 'express';
import connectDB from './lib/connectDB.js';
import router from './routes.js'
import auth from './lib/auth.js';
import session from 'express-session';
import dtsLogger from 'dts-node-logger';
import getMongoDBStore from 'connect-mongodb-session';
const MongoDBStore = getMongoDBStore(session);


const app = express();
app.use(dtsLogger.httpLog())
app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

await connectDB(process.env.MONGO_URI);

app.set('trust proxy', 1)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
  })
}))

auth.initializeService(app);

app.use('/', router);

app.listen(5000, () => {
  dtsLogger.info('backend started')
})
