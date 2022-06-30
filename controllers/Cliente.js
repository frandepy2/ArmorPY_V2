const Cliente = require('../models/Cliente');
const con = require('../database/connection');

exports.vistaClientes = (req, res)=>{
    res.render('Cliente', {
        titulo: 'Clientes',
        clientes: req.clientes,
        pagina : req.page,
        cantpaginas : req.cantpaginas
    });
}


//Crear el mecanismo de busqueda de un cliente
exports.buscarClientes = (req, res,next) => {
    let busqueda = req.body.nombre;
    
    const clientes = [];

    try{
        const query = `select * from cliente WHERE cliente_nombre LIKE '%${busqueda}%' OR cliente_apellido LIKE '%${busqueda}%' OR cliente_ci LIKE '%${busqueda}%'`;
        con.query(query, function (err, result) {
            if (err) throw err;
            result.forEach(element => {
                clientes.push(element);
            }
            );
            req.clientes = clientes;
            next();
        }
        );
    }catch(err){
        console.log(err);
        res.status(400).json({
            ok: false,
            err
        });
    }
}


exports.traerClientes = (req, res,next) => {
    const clientes = [];

    const page = req.params.page ? req.params.page : 1;

    const min  = (page - 1)* 5;
    const max = 6;

    try {
        const query = `select * from cliente as c LIMIT ${min},${max}`;

        con.query(query, function (err, result){
            if (err) throw err;
            result.forEach(element => {
                clientes.push(element);
            });

            req.clientes = clientes;
            req.page = page;
            req.cantpaginas = clientes.length;
            next();
        });

    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: "Error al traer los clientes",
            error
        });

        next();
    }
}

//Crear un cliente
exports.crearCliente = (req, res) => {
    
    console.log(req.body);

    const cliente = new Cliente(req.body);

    cliente.agregarCliente();

    res.redirect('/clientes');
}

//Actualizar un cliente
exports.actualizarCliente = (req, res) => {

    const cliente = new Cliente(req.body);

    cliente.actualizarCliente();

    res.redirect('/clientes');
}

//Eliminar un cliente
exports.eliminarCliente = (req, res) => {
    const id = req.params.id;

    const cliente = new Cliente();

    cliente.eliminarCliente(id);

    res.redirect('/clientes');
}
