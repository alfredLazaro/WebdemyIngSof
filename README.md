Utilizar Node js Version: 14.18.1
    https://nodejs.org/es/

Utilizar Express:
    https://expressjs.com/es/starter/installing.html 

Verificar que los modulos estan correctamente agregando al proyecto segun el "package.json"
En caso de errores por falta de modulos probar instalando las dependencias que se encuentran en este
archivo.
    npm install <nombre-dependecia> 

En todo caso instalar nodemon para correr los scripts.
    npm i nodemon

Para la base de datos debe ejecutar el codigo SQL, que se encuentra en la carpeta /database/db.sql
Esta trae la estructura de la BD y algunos ejemplos (ACTUALIZADA).

    https://expressjs.com/es/guide/database-integration.html#mysql 

Para que la aplicacion funcione correctamente, la base de datos debe estar conectada al momento.
En caso de tener problemas con la conexion revisar el archivo de credenciales /config/keys.js

Para ejecutar el proyecto, se debe ejecutar el comando en una terminal dentro del proyecto:
    npm run dev
