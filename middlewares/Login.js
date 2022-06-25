const jwt = require('jsonwebtoken');

exports.verificarToken = (req,res,next)=>{
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[0];

        console.log(bearerToken)

        req.token = bearerToken;

        next();
    }else{
        res.status(400).json({
            ok: false,
            mensaje: "Usuario no logueado",
        });
    }
}