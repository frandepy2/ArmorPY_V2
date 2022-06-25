const Usuario = require("../models/Usuario");
const con  = require("../database/connection");

const bcrypt = require("bcrypt");

//Verificar contraseña encriptada
function verificarContrasenaEncriptada(contrasena, contrasena2){
    return bcrypt.compareSync(contrasena, contrasena2);
}

//Agregar un usuario a la base de datos
exports.agregarUsuario = (req, res) => {
    const usuario = new Usuario(req.body);

    try {
        usuario.agregarUsuario();
        res.status(200).json({
            ok: true,
            mensaje: "Usuario agregado correctamente"
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: "Error al agregar usuario",
            error
        });
    }
};

//Obtener un usuario por Nombre
exports.obtenerUsuario = (req, res) => {
    const nombre = req.params.nombre;

    try {
        const query = `SELECT * FROM usuario WHERE usuario_nombre = '${nombre}'`;
        con.query(query, function (err, result) {
            if (err) throw err;
            res.status(200).json({
                ok: true,
                usuario : result[0]
            });
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: "Error al obtener usuario",
            error
        });
    }
}

//Obtener todos los usuarios
exports.obtenerUsuarios = (req, res) => {
    try {
        const query = `SELECT * FROM usuario`;
        con.query(query, function (err, result) {
            if (err) throw err;
            res.status(200).json({
                ok: true,
                usuarios : result
            });
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: "Error al obtener usuarios",
            error
        });
    }
}

//Actualizar datos de los usuarios
exports.actualizarUsuario = (req, res) => {
    req.body.id = req.params.id;
    const usuario = new Usuario(req.body);

    try {
        usuario.actualizarUsuario();
        res.status(200).json({
            ok: true,
            mensaje: "Usuario actualizado correctamente"
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: "Error al actualizar usuario",
            error
        });
    }
}

//Dar de baja a un usuario
exports.bajaUsuario = (req, res) => {
    req.body.id = req.params.id;
    const usuario = new Usuario(req.body);

    try {
        usuario.bajaUsuario();
        res.status(200).json({
            ok: true,
            mensaje: "Usuario dado de baja correctamente"
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: "Error al dar de baja usuario",
            error
        });
    }
}

//Actualizar contraseña de un usuario
exports.actualizarPassword = (req, res) => {
    req.body.id = req.params.id;
    const usuario = new Usuario(req.body);

    try {
        usuario.actualizarPassword();
        res.status(200).json({
            ok: true,
            mensaje: "Contraseña actualizada correctamente"
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: "Error al actualizar contraseña",
            error
        });
    }
}

function verificarContrasena(contrasena, contrasena2){
    if(contrasena === contrasena2){
        return true;
    }else{
        return false;
    }
}

//Verificar usuario
exports.verificarUsuario = (req, res) => {
    
    const nombre = req.body.nombre;

    try{
        const query = `SELECT * FROM usuario WHERE usuario_nombre = '${nombre}'`;
        con.query(query, function (err, result) {
            if (err) throw err;
            
            var contrasena1 = req.body.password;
            var contrasena2 = result[0].usuario_password;

            var resultado = verificarContrasenaEncriptada(contrasena1, contrasena2);
            
            if(resultado){
                res.status(200).json({
                    ok: true,
                    mensaje: "Usuario verificado correctamente"
                });
            }else{
                res.status(400).json({
                    ok: false,
                    mensaje: "Contraseña incorrecta"
                });
            }
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: "Error al verificar usuario",
            error
        });
    }
}