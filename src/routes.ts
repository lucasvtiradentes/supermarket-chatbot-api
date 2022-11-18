import express from 'express'
import authenticateToken from './middlewares/authenticateToken'
import addMessage from './controllers/addMessage'
import addToken from './controllers/addToken'

const routes = express.Router();
routes.post('/message/add', authenticateToken, addMessage);
routes.post('/token/add', addToken);
routes.get('/', (req, res) => res.send("OK"));

export default routes;
