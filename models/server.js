const express = require('express');
const cors = require('cors');


const {dbConnection} = require('../database/config');

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    
    

    this.paths = {
      authcreateuser: '/api/authcreateuser',
      auth: '/api/auth',
      usuarios: '/api/usuarios',
      roles: '/api/roles',
      incidencias: '/api/incidencias',
      resincidencias: '/api/resincidencias',
      usuariosroles: '/api/usuariosroles'
    }

    // Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }


  middlewares() {

    // CORS
    this.app.use(cors());


    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio Público
    this.app.use(express.static('public'));

  }

  routes() {

    this.app.use(this.paths.authcreateuser, require('../routes/authcreateuser'));
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.roles, require('../routes/roles'));
    this.app.use(this.paths.incidencias, require('../routes/incidencias'));
    this.app.use(this.paths.resincidencias, require('../routes/resincidencias'));
    this.app.use(this.paths.usuariosroles, require('../routes/usuariosroles'));


    this.app.use(this.paths.usuarios, require('../routes/usuarios'));


  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port);
    });
  }

}


module.exports = Server;
