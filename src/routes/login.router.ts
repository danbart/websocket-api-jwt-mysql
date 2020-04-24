import { Router, Request, Response } from 'express';

// clases
import { Usuario } from '../models/usuario';

export const routerLogin = Router();

routerLogin.post('/register', (req: Request, res: Response) => {
    
    const body = req.body;

    const usuario = new Usuario();

    usuario.user_email = req.body.email

});

// router.get('/', verificaToken, (req: Request, res: Response) => {
    
//     const query = `SELECT * FROM test_user`;

//     MySql.ejecutarQuery(query, (err: any, usuarios: Object[]) => {
//         if ( err ) {
//             res.status(400).json({
//                 ok: false,
//                 error: err
//             });
//         } else {
//             res.json({
//                 ok: true,
//                 usuarios
//             })
//         }
//     });
// });