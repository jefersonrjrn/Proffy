import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

// Router() é o módulo de roteamento do express
const routes = express.Router();

// Instaciando um objeto da classe ClassesController
const classesController = new ClassesController();

// Instanciando um objeto da classe ConnectionsController
const connectionsController = new ConnectionsController();

// Rota de criação da aula
routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

export default routes;