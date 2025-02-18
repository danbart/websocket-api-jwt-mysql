import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { Usuarios } from '../classes/usuarios';
import { Usuario } from '../models/usuario';

export const usuariosConectados = new Usuarios();

export const conectarCliente = ( cliente: Socket, io:socketIO.Server ) => {
    // const usuario = new Usuario( cliente.id );
    // usuariosConectados.agregar( usuario );
    
}

export const desconectar = (cliente: Socket, io: socketIO.Server ) => {
    
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        console.log(usuariosConectados.borrarUsuario(cliente.id));
        io.emit('usuarios-activos', usuariosConectados.getLista());
    })
}

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload );

    })

}

// Configurar Usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server ) => {
    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {

        // usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre} Configurado`
        });
    } )
}

// Obtener Usuarios
export const obtenerUsuarios = (cliente: Socket,  io: socketIO.Server ) => {

    cliente.on('obtener-usuarios', () => {
        // Mandamos la información a la persona que lo esta solicitando
        // io.to( cliente.id ).emit('usuarios-activos', usuariosConectados.getLista());
    })

}