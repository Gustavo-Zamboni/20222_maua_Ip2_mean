require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cliente = require('./models/cliente');

app.use(bodyParser.json());
app.use(cors())

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_DATABASE,
  MONGODB_ADDRESS
} = process.env

mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.${MONGODB_ADDRESS}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`)
.then(()=>{
  console.log("Conexão Ok")
}).catch(()=>{
  console.log("Conexão N OK")
});

app.post('/api/clientes', (req, res, next) => {
  const cliente = new Cliente({
    nome:req.body.nome,
    fone:req.body.fone,
    email:req.body.email,
  })
  cliente.save();
  console.log(cliente);
  res.status(201).json({mensagem: 'Cliente inserido'});
});

app.get('/api/clientes', (req, res) => {
  Cliente.find().then((documents) => {
    console.log(documents)
    res.json({
      mensagem: "Tudo OK",
      clientes: documents
    })
  })
});

app.delete('/api/clientes/:id', (req,res) => {
  Cliente.deleteOne({_id: req.params.id}).then(resultado => {
    console.log(resultado)
    res.status(200).json({mensagem: "Cliente Removido!"})
  })
})

module.exports = app;
