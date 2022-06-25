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

router.post('/buscar',
    middlewares.verificarBusqueda,
    controller.buscarProductos,
    controller.vistaProductos
);


router.post('/create',
    controller.crearProducto
);

router.post('/update',
    controller.actualizarProducto
);

router.get('/delete/:id',
    controller.eliminarProducto
);

module.exports = router;