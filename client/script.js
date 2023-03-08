//import axios from "./axios";
// const axios = require('./axios');

var btnPedido = document.getElementById('#btn-pedidos')


const urlTeste = 'http://localhost:3001/tudofarma/teste'
const urlPedidos = 'http://localhost:3001/tudofarma/novos-pedidos'
const urlRetorno = 'http://localhost:3001/tudofarma/retornos'
const urlNotas = 'http://localhost:3001/tudofarma/notas'

function getUser(){
    axios.get(urlTeste)
    .then(response =>{
        console.log(response)
    })
    .catch(error => console.log(error))
}

function novoPedido(){
    axios.get(urlPedidos)
    .then(response =>{
        console.log(response)
    })
    .catch(error => console.log(error))
}

function Retorno(){
    axios.get(urlRetorno)
    .then(response =>{
        console.log(response)
    })
    .catch(error => console.log(error))
}
function Notas(){
    axios.get(urlNotas)
    .then(response =>{
        console.log(response)
    })
    .catch(error => console.log(error))
}


//getUser()