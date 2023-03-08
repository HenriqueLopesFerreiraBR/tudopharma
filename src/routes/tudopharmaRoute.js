const express = require("express");
const routes = express.Router();
const tudopharmaController = require("../controller/tudopharmaController");


routes.get("/novos-pedidos", async (req, res) => {
    try {
        const files = await tudopharmaController.downloadPedido();
        const local = await tudopharmaController.moverArquivosPedidos();

        res.status(200).json({ message: "arquivos baixados do FTP e enviados para a pasta do InnMed" });
    } catch (error) {
        res.status(401).json(error);
    }
});

routes.get("/retornos", async (req, res) => {
    try {
        const retorno = await tudopharmaController.moverArquivosRetornos();

        const enviarRet = await tudopharmaController.enviarArquivosRetorno();

        res.status(201).json({ message: "arquivos enviados" });
    } catch (error) {
        res.status(401).json(error);
    }
});

routes.get("/notas", async (req, res) => {
    try {
        const notas = await tudopharmaController.moverArquivosNota();

        const enviarNotas = await tudopharmaController.enviarArquivosNota();

        res.status(201).json({ message: "arquivos enviados" });
    } catch (error) {
        res.status(401).json(error);
    }
});


routes.get("/teste", async (req, res) => {
    try {
          const user = {
            nome:'henrique',
            idade:31,
            cidade:'recife'
          }

        res.status(201).json(user);
    } catch (error) {
        res.status(401).json(error);
    }
});

module.exports = routes;
