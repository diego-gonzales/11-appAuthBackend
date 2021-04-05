import express from 'express';
import expressvalidator from 'express-validator';

import { getRenewToken, postLoginUser, postNewUser } from '../controllers/auth.controller.js';
import { validateMyFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';



const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/new', [
    expressvalidator.check('name', 'Name Required').not().isEmpty(),
    expressvalidator.check('email', 'Email Requerid').isEmail(),
    expressvalidator.check('password', 'Password Required').isLength({ min: 6}),
    validateMyFields
], postNewUser);

// Ruta para loguear un usuario
router.post('/', [
    expressvalidator.check('email', 'Email Invalid').isEmail(),
    expressvalidator.check('password', 'Password Invalid').isLength({ min: 6}),
    validateMyFields
], postLoginUser);

// // Ruta para validar y renovar el token (aqui usamos un middleware personalizado)
router.get('/renew', validateJWT, getRenewToken);


export default router;