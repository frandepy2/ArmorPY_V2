const con  = require('../database/connection');

class Cliente{
    constructor (datos = {}){
        const {
            id,
            nombre,
            apellido,
            ci,
            deuda,
            activo
        }=datos;

        this.id = id ? id : '';
        this.nombre = nombre ? nombre : '';
        this.apellido = apellido ? apellido : '';
        this.ci = ci ? ci : '';
        this.deuda = deuda ? deuda : '';
        this.activo = activo ? activo : '';
    }

    getCliente(){
        return {
            id: this.id,
            nombre: this.nombre,
            apellido: this.apellido,
            ci: this.ci,
            deuda: this.deuda,
            activo: this.activo
        }
    }

    //Agregar un cliente a la base de datos
    agregarCliente(){
        const query = `INSERT INTO cliente (cliente_nombre, cliente_apellido, cliente_ci) VALUES ('${this.nombre}', '${this.apellido}', '${this.ci}')`;
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    }

    //Actualizar un cliente
    actualizarCliente(){
        const query = `UPDATE cliente SET cliente_nombre = '${this.nombre}', cliente_apellido = '${this.apellido}', cliente_ci = '${this.ci}' WHERE cliente_id = ${this.id}`;
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("1 record updated");
        }
        );
    }

    //Eliminar un cliente
    eliminarCliente(id){
        const query = `DELETE FROM cliente WHERE cliente_id = '${id}'`;
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("1 record deleted");
        }
        );
    }
}

module.exports = Cliente;