const express = require('express');
const router = express.Router();

//Llamado a los middlewares

//Llamado a los controladores
const controller = require('../controllers/Usuario.js');

//Agregar un usuario
router.post('/',
    controller.agregarUsuario
);

//Obtener usuario por nombre
router.get('/:nombre',
    controller.obtenerUsuario
);

//Obtener todos los usuarios
router.get('/',
    controller.obtenerUsuarios
);

//Actualizar un usuario
router.put('/:id',
    controller.actualizarUsuario
);

//Dar de baja a un usuario
router.put('/baja/:id',
    controller.bajaUsuario
);

//Actualizar Contraseña de un usuario
router.put('/password/:id',
    controller.actualizarPassword
);

//Verificar un usuario
router.post('/verificar',
    controller.verificarUsuario
);

module.exports = router;