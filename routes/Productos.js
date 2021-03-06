const express = require('express');
const router = express.Router();


//Llamado a los middlewares
const middlewares = require('../middlewares/Producto');

//Llamado a los controladores
const controller = require('../controllers/Productos.js');


//Vista de producto
router.get('/',
    controller.traerProductos,
    controller.vistaProductos
);

//Paginacion de un producto
router.get('/:page',
    middlewares.verificarPagina,
    controller.traerProductos,
    controller.vistaProductos
);

//Busqueda de los productos
router.post('/buscar',
    middlewares.verificarBusqueda,
    controller.buscarProductos,
    controller.vistaProductos
);

//Creacion de un producto
router.post('/create',
    controller.crearProducto
);

//Actualizacion de un producto
router.post('/update',
    controller.actualizarProducto
);

//Eliminacion de un producto
router.get('/delete/:id',
    controller.eliminarProducto
);

module.exports = router;