const ftp = require("basic-ftp");
const { json } = require("express");
const fs = require("fs/promises");
const { uploadFrom } = require("basic-ftp/dist/transfer");
const enderecoModel = require('../models/enderecoModel')

async function connection() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access(enderecoModel.ache);
        console.log("FTP conectado");
    } catch (err) {
        console.log(err);
    }
    client.close();
}

async function upload(localPath, remotePath, endereco) {
    const client = new ftp.Client();
    try {
        await client.access(endereco);
        await client.uploadFrom(localPath, remotePath);
        console.log(`Arquivo enviado com sucesso para: ${remotePath}`);
    } catch (err) {
        console.error(`Erro ao enviar arquivo: ${err.message}`);
    }
    client.close();
}

async function readFileFtp(path,endereco) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access(endereco);
        var lista = await client.list(path);

        lista.forEach((pedido) => {
            console.log(pedido.name);
        });

    } catch (err) {
        console.log(err);
    }
    client.close();
}
async function downloadFileFtp(localPath, remotePath, endereco) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access(endereco);
        await client.downloadToDir(localPath, remotePath);
        console.log(`O arquivos foram copiados para o servidor`);
    } catch (err) {
        console.log(err);
    }
    client.close();
}
async function uploadFileFtp(localPath, remotePath, endereco) {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access(endereco);
        await client.downloadToDir(localPath, remotePath);
        console.log(`O arquivos foram copiados para o FTP`);
    } catch (err) {
        console.log(err);
    }
    client.close();
}


module.exports = {
    connection,
    downloadFileFtp,
    readFileFtp,
    upload
}