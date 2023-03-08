const { json } = require('body-parser');
const express = require('express')
const cors = require('cors')
const cron = require('node-cron');
const axios = require('axios');

const app = express()

const FtpRoutes = require('./src/routes/tudopharmaRoute');

app.use(cors())
app.use(json());


const port = 3001


app.use('/tudofarma/',FtpRoutes);


async function callPedidos() {
    try {
        const response = await axios.get('http://localhost:3001/tudofarma/novos-pedidos');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
async function callRetorno() {
    try {
        const response = await axios.get('http://localhost:3001/tudofarma/retornos');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
async function callNotas() {
    try {
        const response = await axios.get('http://localhost:3001/tudofarma/notas');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

cron.schedule('* 3 * * * *', () => {
    callPedidos();
    callRetorno();
    callNotas();
});

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))