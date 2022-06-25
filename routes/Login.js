const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
//Controllers
const controllers = require('../controllers/Login');

//Midlewares
const midlewares = require('../middlewares/Login');

router.get('/',
    midlewares.verificarToken,
    (req,res)=>{
        jwt.verify(req.token,'mi_secreto', (err,data)=>{
            if (err){
                res.status(403).json({
                    ok: false,
                    mensaje : "Token no valido"
                })
            }else{
                res.json({
                    msg : "protegido",
                    data
                })
            }
        });
    }
)

router.post('/',
    controllers.loguearUsuario
)


module.exports = router;