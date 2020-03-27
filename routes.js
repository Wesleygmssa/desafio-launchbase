const express = require('express');
const routes = express.Router();



//rotas
routes.get('/', (req, res) => {

    return res.redirect('/teachers')
});

routes.get('/teachers', (req, res) => {

    return res.render('teachers/index')
})

routes.get('/teachers/create', (req, res) => {

    return res.render('teachers/create')
})


routes.get('/students', (req, res) => {

    return res.render('students/index')
})

module.exports = routes;