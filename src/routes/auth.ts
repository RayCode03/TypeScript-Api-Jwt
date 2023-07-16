import { Router } from "express";

import { signup, signin, profile } from "../controllers/auth.controllers";

import { verifyToken } from "../libs/verifyToken";

const router: Router = Router();

// ruta para crear un usuario
router.post('/signup', signup)

// ruta para logear un usuario
router.post('/signin', signin)

// ruta para obtener el perfil de un usuario
router.get('/profile',verifyToken , profile)

export default router;