# TallerPatronDisGraphqlBack
Proyecto para desarrollo de patron de diseño de apis Graphql, con uso de la herramienta GraphiQL

## DEPENDENCIAS DELPROYECTO VIA NPM
npm install express 
npm install -g nodemon 

npm i express-graphql


## EJECUCION APLICACION
nodemon server.js 

## URL PAGINA DE PRUEBA
http://localhost:4002/graphql

## JSON DE PRUEBAS
# INSERT
mutation{
addCliente(nombre: "Carlos", telefono:"0985460231"){
_id,
nombre,
telefono}
}
# CONSULTA
{
  clientes {
    _id
    nombre
    telefono
  }
}