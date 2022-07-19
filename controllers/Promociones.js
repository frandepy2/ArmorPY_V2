//const Promocion = require('../controllers/Promociones');
const con = require('../database/connection');

//Vista promociones
exports.vistaPromociones = (req, res) => {

    console.log("llegamos a las vistas")
    console.log(req.promociones);

    res.render('Promociones', {
        titulo: 'Promociones',
        promociones: req.promociones,
        pagina : req.page,
        cantpaginas : req.cantpaginas
    });
}

//Crear el mismo mecanismo de Paginacion

//Buscar Promociones

//Traer Promociones
exports.traerPromociones = (req, res, next) => {
    const promociones = [];

    const page  = req.params.page ? req.params.page : 1;

    const min = (page - 1)*5;
    const max = 6;

    try{
        const query = `select * from promocion as p LIMIT ${min},${max}`;
        con.query(query, function (err, result) {
            if (err) throw err;
            result.forEach(element => {
                promociones.push(element);
            }
            );
            console.log("Cargamos las promociones");

            req.promociones = promociones;
            console.log(req.promociones);
            req.page = page;
            req.cantpaginas = promociones.length;
            next();
        });

    }catch(err){
        console.log(err);
        res.status(400).json({
            ok: false,
            mensaje: "Error al traer las promociones",
            err
        });
        next();
    }

    
}

//Crear promociones

//Actualizar Promociones

//Eliminar Promociones

//Lista de productos con esta promocion TODO : Agregar promociones aplicadas a esta en productos 