const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes')

const server = express();

server.use(express.urlencoded({extended:true}))//responsavel funcionamento o body
server.use(express.static('public'));
server.use(routes);

server.set("view engine" ,'njk')
nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache: true
})

//servidor
server.listen("5000", ()=>{ // colocando servidor online
    console.log('server is running')
})