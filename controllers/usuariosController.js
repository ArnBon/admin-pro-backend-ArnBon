const { response } = require('express');
const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const { generarJWT} = require('../helpers/jwt');

//se hace la consulta
// const getUsuarios = async (req, res) => {

//     const usuarios = await Usuario.find({}, 'nombre email role google')


//     res.json({
//         ok: true,
//         usuarios
         
//     });
// }

const getUsuarios = async (req, res) => {

    const desde = Number (req.query.desde) || 0; 

    const [usuarios, total] = await Promise.all([

        Usuario
           .find({}, 'nombre email role google img')
           .skip(desde)
           .limit(10),                   
           Usuario.countDocuments()
    ]); 
    res.json({
        ok: true,
        usuarios,
        total
         
    });
}
// fin hace la consulta

// se hace el registro de datos
const crearUsuario = async (req, res = response) => {

    const {email, password} = req.body;
    
    // const errores = validationResult(req); clase 113

    // if (!errores.isEmpty) {
    //     return res.status(400).json({
    //         ok: false,
    //         errors:errores.mapped()
    //     });        
    // }


    try {

        const existeEmail = await Usuario.findOne({ email});

        if (existeEmail) {
            return res.status(400).json({
                ok:false,
                msg: "El correo ya esta registrado"
            });            
        }

        const usuario = new Usuario(req.body);
 
 
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        // aqui Guardo usuario
        await usuario.save();

         // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );

    //console.log(req.body);
        res.json({
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: "! No se pudo crear el registro de usuario..."
        });        
    }   
    }


// se actualzian esos datos    
const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id; //con esto recibo el id


    try {

        const usuarioDB = await Usuario.findById( uid ); // esta es la consulta para obtener el id del registro a modificar

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } ); //con esto actualiza al usuario a traves de su id

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

// se borran los datos 
const borrarUsuario = async(req, res = response ) => {

    const uid = req.params.id; //aqui le pasas el id

    try {

        const usuarioDB = await Usuario.findById( uid ); //con esto encuentra el id

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }
         
        // con esto se elimina el usuario
        await Usuario.findByIdAndDelete( uid );

        
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}