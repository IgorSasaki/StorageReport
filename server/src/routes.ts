import express, { json } from 'express';
import UserController from './Controller/userController';

const routes = express.Router();
const userController = new UserController();

routes.get('/users', userController.index);
routes.post('/users', userController.create);
routes.put('/changePassword', userController.update);
routes.post('/session', userController.session);

export default routes;