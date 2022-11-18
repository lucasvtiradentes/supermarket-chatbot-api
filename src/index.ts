import express from 'express'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config();

const port = process.env.PORT || 3000;
const server = express();

server.use(express.json());
server.use(routes);

server.listen(port, async function () {
  console.log(`server running on port ${port}`);
});
