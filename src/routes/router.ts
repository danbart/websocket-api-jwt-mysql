import { Router, Request, Response } from 'express';
import Server from '../server/server';
import { usuariosConectados } from '../sockets/socket';
import { verificaToken } from '../middlewares/autentication';
import { Usuario } from '../models/usuario';
import bcrypt from 'bcrypt';
import { registerValidator } from '../middlewares/validators';
import { validate } from 'express-validation';
import MySql from '../mysql/mysql';
import validator from 'validator';


const router = Router();

// ================= get / =======================
router.get('/usuario/', /*verificaToken,*/ async (req: Request, res: Response) => {
    
        const query =  usuariosConectados.getLista();

        try {
            MySql.ejecutarQuery(query, (err: any, usuarios: Usuario[]) => {
                 if(err) {
                    res.json({
                        ok: false,
                        error: err
                    })
                 } else {
                    res.json({
                        ok: true,
                        user: usuarios
                    })
                 }
             });
         } catch (error) {
             return error.sqlMessage
         }
 

                  
});
// TODO: validar el email
router.post('/usuario/', validate(registerValidator), async (req: Request, res: Response) => {
    
    const body = req.body;

        const user = new Usuario();
        user.user_name=body.name;
        user.user_surname=body.surname;
        user.user_email=body.email;
        user.user_password= bcrypt.hashSync(body.password,10);

        if(!user.user_email == null && !user.user_password == null){
            res.json({
                ok: false,
                mensaje: 'Email y password son requeridas'
            })
        }
        // const server = Server.instance;
        // server.io.emit('mensaje-nuevo', payload);
        const query = usuariosConectados.agregar(user);
        
        
        MySql.ejecutarQuery(query, (err: any, usuario: any) => {
            if(!!usuario){
                res.json({
                    ok: true,
                    User_id: usuario.insertId,
                    mensaje: 'Usuario Registrado correctamente'
                })
            } else {
                res.json({
                    ok: false,
                    mensaje: err.sqlMessage
                })
            }
        });
});

router.get('/usuario/:id', async (req: Request, res: Response) => {

    const id  = req.params.id;

    if(validator.isNumeric(id)){
        const query =  usuariosConectados.getLista(Number(id));
        
        try {
            MySql.ejecutarQuery(query, (err: any, usuarios: Usuario[]) => {
                 if(err) {
                    res.json({
                        ok: false,
                        error: err
                    })
                 } else {
                    res.json({
                        ok: true,
                        user: usuarios
                    })
                 }
             });
         } catch (error) {
             return error.sqlMessage
         }
    } else {
        res.json({
            ok: false,
            error: 'El registro solicitado no existe'
        })
    }


       
});

router.post('/mensajes/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    }

    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    })
})

// Servicios para obtener todos los IDs de los usuarios
router.get('/usuarios', ( req: Request, res: Response ) => {

    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[] ) => {
        
        if ( err ) {
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        })
    })
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', ( req: Request, res: Response ) => { 

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista(),
    })
    
})


export default router;