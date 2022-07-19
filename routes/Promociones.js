const express = require('express');
const router = express.Router();


//Llamado a los middlewares
const middlewares = require('../middlewares/Promociones');

//Llamado a los controladores
const controller = require('../controllers/Promociones');

//Vista de las Promociones
router.get('/',
    controller.traerPromociones,
    controller.vistaPromociones
);


//Paginacion de las promociones

//Busqueda de las promociones

//Creacion de la promocion

//Actualizacion de la promocion

//Eliminacion de la promocion


module.exports = router;