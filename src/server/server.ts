import expres from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';

import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    public app: expres.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = expres();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
    }

    public static get instance(){
        // si ya existe una instancia regresa la instancia si no existe regresa una nueva instancia
        // esto para evitar que se cree varias veces el socket, este es el metodo singleton
        return this._instance || ( this._instance = new this() );
    }

    private escucharSockets(){

        console.log('Escuchando Conexiones - sockets');

        this.io.on('connection', cliente => {
            // console.log('Cliente Conectado');

            // conectar cliente
            socket.conectarCliente( cliente, this.io );
            
            //Configurar usuario
            socket.configurarUsuario(cliente, this.io );

            // Mensajes
            socket.mensaje(cliente, this.io );

            // Desconectar
            socket.desconectar(cliente, this.io);

            // Obtener usuarios
            socket.obtenerUsuarios( cliente, this.io );

        })

    }

    start( callback: Function ) {
        this.httpServer.listen( this.port, callback() );
    }


}