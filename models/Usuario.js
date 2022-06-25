//Llamada a la coneccion mysql
const con  = require('../database/connection');
const bcrypt = require('bcrypt');

class Usuario{
    constructor (datos = {}){
        const {
            id,
            nombre,
            password,
            rol
        }=datos;

        this.id = id ? id : '';
        this.nombre = nombre ? nombre : '';
        this.password = password ? password : '';
        this.rol = rol ? rol : '';
    }

    getUsuario(){
        return {
            id: this.id,
            nombre: this.nombre,
            password: this.password,
            rol: this.rol
        }
    }

    //Encriptar una Contraseña
    encriptarPassword(password){
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    //Agregar usuario con mysql
    agregarUsuario(){

        //Encriptar Contraseña
        this.password = this.encriptarPassword(this.password);
        
        const query = `INSERT INTO usuario (usuario_nombre, usuario_password, usuario_rol, usuario_activo) VALUES ('${this.nombre}', '${this.password}', '${this.rol}', '1')`;
        
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });

    };

    //Actualizar usuario
    actualizarUsuario(){

        //Encriptar Contraseña
        this.password = this.encriptarPassword(this.password);

        const query = `UPDATE usuario SET usuario_nombre = '${this.nombre}', usuario_password = '${this.password}', usuario_rol = '${this.rol}' WHERE usuario_id = '${this.id}'`;
        console.log(this.id);
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("1 record updated");
        }
        );
    }

    //Dar de baja a un usuario
    bajaUsuario(){
        const query = `UPDATE usuario SET usuario_activo = '0' WHERE usuario_id = '${this.id}'`;
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("1 record updated");
        }
        );
    }

    //Actualizar contraseña
    actualizarPassword(){
        console.log(this.password);
        this.password = this.encriptarPassword(this.password);

        const query = `UPDATE usuario SET usuario_password = '${this.password}' WHERE usuario_id = '${this.id}'`;
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("1 record updated");
        }
        );
    }

    
}

module.exports = Usuario;