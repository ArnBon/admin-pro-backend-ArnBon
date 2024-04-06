const {response} = require('express');
const {v4: uuidv4} = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen');

const fs = require('fs');
const path = require('path');


//validar tipo
const fileUpload = (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tipoValido = ['hospitales','medicos','usuarios'];
    if(!tipoValido.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg: 'algo anda mal hable conmigo jajajaja (tipo)'
        });
    }
    
    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                    ok:false,
                    msg: 'No existe archivo jajaja'
                });    
            }
            // hasta aqui la clase 136

            //comienza la clase 137
            //procesar la imagen
            const file = req.files.imagen;
            // console.log(file);
            const nombreCortado = file.name.split('.');//generar o estraer la extension del archivo
            const extensionArchivo = nombreCortado[nombreCortado.length -1 ];           
            
            //validar extension
            const extensionesValidas = ['png','jpg','jpeg','gif'];
            if(!extensionesValidas.includes(extensionArchivo)){
                return res.status(400).json({
                    ok: false,
                    msg: 'no es una extensión permitida'
                });                
            }
            
            
            //generar el nombre del archivo
            const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;            
            
            //path para guardar la imagen
            const path = `./uploads/${tipo}/${nombreArchivo}`;
            
            
            //mover la imagen
            file.mv(path, (err) => {
                if(err) {
                    console.log(err);
                    return res.status(500).json({
                        ok: false,
                        msg: 'Error al mover la imagen'
                    });
                }
                //comienza la clase 138
                //actualizar bd
                actualizarImagen(tipo, id, nombreArchivo);
                    res.json({
                    ok:true,
                    msg:'Archivo subido',
                    nombreArchivo
                });
            });
            //hasta aqui la clase 137

        }
        //clase 141
        const retornaImagen = (req, res = response) => {
             const tipo = req.params.tipo;
             const foto = req.params.foto;

             const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
             //imagn por defecto
             if (fs.existsSync(pathImg)) {
                res.sendFile(pathImg)                
             } else {

                 const pathImg = path.join(__dirname, `../uploads/no-img.png`);
                 res.sendFile(pathImg);
             }
        }

        //fin clase 141








module.exports = {
    fileUpload,
    retornaImagen
}