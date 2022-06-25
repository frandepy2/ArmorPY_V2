const jwt = require('jsonwebtoken');

const con = require('../database/connection');

const bcrypt = require("bcrypt");

exports.loguearUsuario = (req,res)=>{

    const user = {};

    user.nombre = req.body.nombre;
    user.password = req.body.password;

    //Verificar que el usuario exista en la base de datos 
    try {
        const query = `SELECT * FROM usuario WHERE usuario_nombre = '${user.nombre}'`
        
        con.query(query,(err,result)=>{
            if (err) throw err;
            var contrasena2 = result[0].usuario_password;
            const verifica = bcrypt.compareSync(user.password, contrasena2);

            //Verificamos que el usuario sea un usuario activo
            if (verifica && verifica && result[0].usuario_activo === 1){
                const token = jwt.sign({
                    nombre: user.nombre,
                    rol: result[0].usuario_rol
                },'mi_secreto');

                res.status(200).json(
                    {
                        ok : true,
                        token
                    }
                )
            }else{
                res.status(400).json({
                    ok: false,
                    mensaje: "Contraseña incorrecta o el usuario no está activo"
                });
            }
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: "Error al loguear usuario",
            error
        });
    }
}