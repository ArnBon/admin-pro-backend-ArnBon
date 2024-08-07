const mongoose = require('mongoose');


/*Esta funcion es la que establece la conexion con la base de datos de mongo*/
const dbConnection = async() => {
    try {
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
}
module.exports = {
    dbConnection
}