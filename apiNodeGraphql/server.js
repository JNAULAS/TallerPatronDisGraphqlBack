// Atiende peticiones del cliente
const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql')
const mongoose = require('mongoose');
const { json } = require('express')
mongoose.connect('mongodb+srv://juangnssudamericano:ycntwg3bUtHrQikT@cluster0.2rah27u.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a mongo')
})

const clienteSchema = new mongoose.Schema({
    nombre: String,
    telefono: String,
});

const ClienteModel = mongoose.model('Cliente', clienteSchema);

// Definicion de Graphql
let schemaDB = buildSchema(`
type Cliente{
    id: Int,
    nombre: String,
    telefono: String
}
type Query {
    clientes: [Cliente]
    cliente(id: Int):Cliente
} 
type Mutation {
    addCliente(nombre: String, telefono: String):Cliente
}
`)

// D

let counter = 1
let root = {
    clientes: async ({}) => {
        const listaClientes = await ClienteModel.find();
        return listaClientes
    },
    addCliente: async (data) => {
        try {
            const newCliente = new ClienteModel({
                nombre: data.nombre,
                telefono: data.telefono,
            });

            const savedCliente = await newCliente.save();

            return savedCliente;
        } catch (error) {
            throw new Error('Error adding the client: ' + error.message);
        }
    }
}

let app = express()
app.use('/graphql', graphqlHTTP({
    schema: schemaDB,// Nombre creado
    rootValue: root,
    graphiql: true
}))

let puerto = 4002
app.listen(puerto, () => {
    console.log(`Server started at http://localhost:${puerto}`)
})