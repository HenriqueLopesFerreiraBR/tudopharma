const ftp = require("basic-ftp");
const { json } = require("express");
const fs = require("fs/promises");
const { uploadFrom } = require("basic-ftp/dist/transfer");
const enderecoModel = require('../models/enderecoModel')
const ftpModel = require('../models/ftpModels')

// ESM: import * as ftp from "basic-ftp"

//---------------------------------------PEDIDOS--------------------------------

async function downloadPedido() {
    const folderUni = "./Files/FTP/Tudopharma/PEDIDO/";
    const folderFtp = "/PEDIDO/";

    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        var listaUni = await fs.readdir(folderUni);

        await client.access(enderecoModel.tudofarma);
        var listaFTP = await client.list(folderFtp);

        listaFTP.forEach(async (pedido) => {
            const stringPed = pedido.name;
            const ped = await stringPed.split(".");

            if (!listaUni.includes(pedido.name)) {
                console.log(pedido.name);
                console.log(`arquivo ${pedido.name} copiado`);
                await ftpModel.downloadFileFtp(folderUni, folderFtp, enderecoModel.tudofarma);
            }
        });
    } catch (err) {
        console.log(err);
    }
    client.close();
}

async function moverArquivosPedidos() {
    try {
        const folderUni = "C:/node/Tudofarma/Files/FTP/Tudopharma/PEDIDO/";
        const folderInnMed = `C:/tudoPharma/PEDIDO/`;

        var listaUni = await fs.readdir(folderInnMed);
        var listaBackup = await fs.readdir(folderUni);

        //arrays que armazenam as informações dos arquivos sem a extensão
        var array1 = [];
        var array2 = [];
       
        //ler todos os arquivos da pasta de backup
        //retira a extensão e adiciona no Array1
        listaBackup.forEach( async (pedidoBack) => {
            var pedBack =  pedidoBack.split(".");
            array1.push(pedBack[0]);
        });

        //ler todos os arquivos da pasta de Pedidos no InnMed
        //retira a extensão e adiciona no Array1
        listaUni.forEach(async (pedido) => {
            var ped =  pedido.split(".");
            array2.push(ped[0]);
        });

        //compara os dois arrays e pega apenas os valores diferentes
        var diferente = await array1.filter(value => !array2.includes(value));
        
        diferente.forEach(async (pedido) => {
            try {
                await fs.copyFile(
                    `${folderUni}${pedido}.txt`,
                    `${folderInnMed}${pedido}.txt`
                );
                console.log(pedido + ".txt foi copiado com sucesso");
            } catch (error) {
                console.log("error");
            }
        });
    } catch (error) {
        console.log(error);
    }
}
//------------------------------------retorno---------------------------------------

async function moverArquivosRetornos() {
    const folderReturnInnMed = "C:/tudoPharma/RETORNO/";
    const folderReturnBackup = "C:/node/Tudofarma/Files/FTP/Tudopharma/RETORNO/";

    var listaUni = await fs.readdir(folderReturnInnMed);
    const listaBackup = await fs.readdir(folderReturnBackup);

    //compara os dois arrays e pega apenas os valores diferentes
    var diferente = await listaUni.filter((x) => !listaBackup.includes(x));

    diferente.forEach(async (retorno) => {
        try {
            await fs.copyFile(
                `${folderReturnInnMed}${retorno}`,
                `${folderReturnBackup}${retorno}`
            );
            console.log(retorno + " foi copiado com sucesso");
        } catch (error) {
            console.log("error");
        }
    });

    console.log(diferente);
}

async function enviarArquivosRetorno() {
    const folderReturnBackup =
        "C:/node/Tudofarma/Files/FTP/Tudopharma/RETORNO/";
    const folderFtp = "/RETORNO/";

    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        var listaBackup = await fs.readdir(folderReturnBackup);

        await client.access(enderecoModel.tudofarma);
        var listaFTP = await client.list(folderFtp);

        var array1 = []
        listaFTP.forEach((ret) =>{
            array1.push(ret.name)
        })

        var diferente = await listaBackup.filter(value =>!array1.includes(value));

        diferente.forEach(async (retorno) => {
            try {
                var local = `${folderReturnBackup}${retorno}`;
                var ftp = `${folderFtp}${retorno}`;

                await ftpModel.upload(local, ftp, enderecoModel.tudofarma);
            } catch (error) {
                console.log(error);
            }
         });
    } catch (err) {
        console.log(err);
    }
    client.close();
}

//-----------------------------------NOTA---------------------------------------

async function moverArquivosNota() {
    const folderReturnInnMed = "C:/tudoPharma/NOTA/";
    const folderReturnBackup = "C:/node/Tudofarma/Files/FTP/Tudopharma/NOTA/";

    var listaUni = await fs.readdir(folderReturnInnMed);
    const listaBackup = await fs.readdir(folderReturnBackup);

    //compara os dois arrays e pega apenas os valores diferentes
    var diferente = await listaUni.filter((x) => !listaBackup.includes(x));

    diferente.forEach(async (nota) => {
        try {
            await fs.copyFile(
                `${folderReturnInnMed}${nota}`,
                `${folderReturnBackup}${nota}`
            );
            console.log(nota + " foi copiado com sucesso");
        } catch (nota) {
            console.log("error");
        }
    });
}

async function enviarArquivosNota() {
    const folderReturnBackup = "C:/node/Tudofarma/Files/FTP/Tudopharma/NOTA/";
    const folderFtp = "/NOTA/";

    const client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        var listaBackup = await fs.readdir(folderReturnBackup);

        await client.access(enderecoModel.tudofarma);
        var listaFTP = await client.list(folderFtp);

        var array1 = []
        listaFTP.forEach((ret) =>{
            array1.push(ret.name)
        })

        var diferente = await listaBackup.filter(value =>!array1.includes(value));

        console.log(diferente);
        diferente.forEach(async (nota) => {
            try {
                var local = `${folderReturnBackup}${nota}`;
                var ftp = `${folderFtp}${nota}`;

                await ftpModel.upload(local, ftp, enderecoModel.tudofarma);
            } catch (error) {
                console.log(error);
            }
        });
    } catch (err) {
        console.log(err);
    }
    client.close();
}

module.exports = {

    downloadPedido,
    moverArquivosPedidos,
    moverArquivosRetornos,
    enviarArquivosRetorno,
    moverArquivosNota,
    enviarArquivosNota,
};
