exports.verificarBusqueda = (req, res, next) => {
    const busqueda = req.body.nombre;
    if (busqueda !== '') {
        next();
    } else {
        res.redirect('/productos');
    }
}

exports.verificarPagina = (req, res, next) => {
    const page = req.params.page;
    
    var Numberpage = parseInt(page);
    
    //Validar que la pagina sea un numero
    if (isNaN(Numberpage)) {
        res.redirect('/productos');
    }else{
        //Convertir numberpage a string
        req.params.page = Numberpage.toString();
        next();
    }

}