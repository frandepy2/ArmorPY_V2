const Producto = require('../models/Producto');
const con = require('../database/connection');

exports.vistaProductos = (req, res) => {
    res.render('Productos', {
        titulo: 'Productos',
        productos: req.productos,
        pagina : req.page,
        cantpaginas : req.cantpaginas
    });
}

//Crear el mismo mecanismo de paginacion
exports.buscarProductos = (req, res,next) => {
    let busqueda = req.body.nombre;

    const productos = [];

    try{
        const query = `select * from producto WHERE producto_nombre LIKE '%${busqueda}%' OR producto_descripcion LIKE '%${busqueda}%'`;
        con.query(query, function (err, result) {
            if (err) throw err;
            result.forEach(element => {
                productos.push(element);
            }
            );
            req.productos = productos;
            next();
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
            ok: false,
            err
        });
    }
}


exports.traerProductos = (req, res,next) => {
    const productos = [];

    const page  = req.params.page ? req.params.page : 1;

    const min = (page - 1)*5;
    const max = 6;


    try {
        const query = `select * from producto as p LIMIT ${min},${max}`;
        con.query(query, function (err, result) {
            if (err) throw err;
            result.forEach(element => {
                productos.push(element);
            });
            req.productos = productos;
            req.page = page;
            req.cantpaginas = productos.length;
            next();
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: "Error al obtener productos",
            error
        });

        next();
    }
}

//Crear un producto
exports.crearProducto = (req, res) => {

    console.log(req.body);

    const producto = new Producto(req.body);

    producto.agregarProducto();

    res.redirect('/productos');

}

//Actualizar un producto
exports.actualizarProducto = (req, res) => {
    
    const producto = new Producto(req.body);

    producto.actualizarProducto();

    res.redirect('/productos');

}

//Eliminar un producto
exports.eliminarProducto = (req, res) => {
    const id = req.params.id;

    const query = `DELETE FROM producto WHERE producto_id = '${id}'`;

    con.query(query, function (err, result) {
        if (err) throw err;
        console.log("1 record deleted");
    });

    res.redirect('/productos');
}