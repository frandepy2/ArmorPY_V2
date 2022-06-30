const express = require('express');
const router  = express.Router();

//Llamodo a los midlewares
const midlewares = require('../middlewares/Cliente');

//Llamado a los controladores
const controller = require('../controllers/Cliente');


//Vista de cliente
router.get('/',
    controller.traerClientes,
    controller.vistaClientes
);

//Paginacion de los cliente
router.get('/:page',
    midlewares.verificarPagina,
    controller.traerClientes,
    controller.vistaClientes
);

//Busqueda de los clientes
router.post('/buscar',
    midlewares.verificarBusqueda,
    controller.buscarClientes,
    controller.vistaClientes
);

//Creacion de un cliente
router.post('/create',
    controller.crearCliente
);

//Actualizacion de un cliente
router.post('/update',
    controller.actualizarCliente
);

//Eliminacion de un cliente
router.get('/delete/:id',
    controller.eliminarCliente
);


module.exports = router;