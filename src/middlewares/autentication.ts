import jwt from 'jsonwebtoken';
import { SEED } from '../global/environment';

// =====================
// Verificar Token
// =====================

//request, respuesta y next que indica que el programa continue

export const verificaToken = ( req, res, next) =>{

    // obtiene token
    const token = req.get('Authorization');

    jwt.verify(token, SEED, (err, decoded) =>{
        if(err) {
            return res.status(401).json({
                ok: false,
                err:  {
                    message: 'Token no Valido'
                }
            })
        }

        req.usuario = decoded.usuario;
        next();
    });
}
