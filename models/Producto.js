const con  = require('../database/connection');
class Producto{
    constructor (datos = {}){
        const {
            id,
            nombre,
            precio,
            descripcion,
            imagen
        }=datos;

        this.id = id ? id : '';
        this.nombre = nombre ? nombre : '';
        this.precio = precio ? precio : '';
        this.descripcion = descripcion ? descripcion : '';
        this.imagen = imagen ? imagen : '';
    }

    getProducto(){
        return {
            id: this.id,
            nombre: this.nombre,
            precio: this.precio,
            descripcion: this.descripcion,
            imagen: this.imagen
        }
    }

    //Agregar un producto nuevo a la base de datos
    agregarProducto(){
        const query = `INSERT INTO producto (producto_nombre, producto_precio, producto_descripcion) VALUES ('${this.nombre}', '${this.precio}', '${this.descripcion}')`;
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }

    //Actualizar un producto existente
    actualizarProducto(){
        const query = `UPDATE producto SET producto_nombre = '${this.nombre}', producto_precio = '${this.precio}', producto_descripcion = '${this.descripcion}' WHERE producto_id = '${this.id}'`;
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("1 record updated");
        });
    }
}

module.exports = Producto;