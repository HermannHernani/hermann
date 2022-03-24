import {Router} from 'express'
import authMiddleware from './app/middlewares/auth'
import UserController from './app/controllers/UserController'
import ProfessionalController from './app/controllers/ProfessionalController'
import UnityController from './app/controllers/UnityController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import PacienteController from './app/controllers/PacienteController'
import multer from 'multer'
import VinculacaoController from './app/controllers/VinculacaoController'
import CargoController from './app/controllers/CargoController'
import multerConfig from './config/multer'

const upload= multer (multerConfig)
const routes= Router()

routes.post('/login',SessionController.store);
routes.get('/professionals',ProfessionalController.show);
routes.post('/users',UserController.store);
routes.use(authMiddleware);
routes.post('/files',upload.single('file'),FileController.store);
routes.get('/files/:id',FileController.index);
routes.put('/user/:id',UserController.update);
routes.get('/user/:id',UserController.index);
routes.get('/unitys',UnityController.show);
routes.get('/cargos', CargoController.show);
routes.post('/relaciona',CargoController.store);

routes.get('/profissional', ProfessionalController.show)

routes.get('/vinculacao/:id', VinculacaoController.show);
//routes.get('/vinculacao_inativos/:id', VinculacaoController.inativos);
//routes.get('/vinculacao_ativos/:id', VinculacaoController.ativos);


routes.delete('/logout', authMiddleware, async (req, res) => {
    return res.json({message:"User logged out."});
  });
routes.get('/pacientes/:id',PacienteController.show);
export default routes