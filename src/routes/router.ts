import { Router, Request, Response } from 'express';
import Server from '../server/server';
import { usuariosConectados } from '../sockets/socket';
import MySql from '../mysql/mysql';
import { verificaToken } from '../middlewares/autentication';


const router = Router();

// ================= get / =======================
router.get('/', verificaToken, (req: Request, res: Response) => {
    
    const query = `
    SELECT * FROM test_user`;

    MySql.ejecutarQuery(query, (err: any, usuarios: Object[]) => {
        if ( err ) {
            res.status(400).json({
                ok: false,
                error: err
            });
        } else {
            res.json({
                ok: true,
                usuarios
            })
        }
    });
});

router.get('/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta Bien!!'
    })
});

router.post('/mensajes', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const payload = { cuerpo, de };

    const server = Server.instance;
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    })
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