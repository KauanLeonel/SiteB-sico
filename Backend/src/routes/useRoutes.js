import express from 'express'
import createUserController from '../controllers/createUserController.js';
import getUserController from "../controllers/getUserController.js"
import createDocsController from "../controllers/createDocsController.js"
import createAddressController from "../controllers/createAddressController.js"
import { FinalizarCadastroController } from "../controllers/finalizarCadastroController.js";



const router = express.Router();


// USUÁRIO
router.post('/user', createUserController);
router.get('/user', getUserController);

// DOCUMENTOS
router.post('/docs', createDocsController);

// ENDEREÇO
router.post('/address', createAddressController);

// FINALIZAR CADASTRO (cria docs e endereço junto)
router.post('/user/finalizar', new FinalizarCadastroController().handle);

export default router;