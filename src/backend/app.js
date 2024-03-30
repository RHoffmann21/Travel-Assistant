import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import connectDB from './lib/connectDB.js';
import router from './routes.js'
import cors from 'cors';


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await connectDB(process.env.MONGO_URI);

app.use('/', router);

app.get('/api', (req, res, next) => {
  return res.send('test');
})

// if (true) {
//   app.use(createProxyMiddleware({
//     target: 'http://react-app:5173',
//     changeOrigin: true,
//     ws: true,
//   }))
// } else {
//   const base = '/opt/src/frontend/dist'
//   app.use(express.static(base))
//   app.use((req, res) => res.sendFile(`${frontend-build}/index.html`))
// }

app.listen(5000, () => {
  console.log('backend started')
})
