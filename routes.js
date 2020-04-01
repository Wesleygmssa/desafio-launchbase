const express = require('express');
const teachers = require('./controllers/teachers')
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

routes.post("/teachers", teachers.post)// salvando dados

routes.get('/teachers/:id',teachers.show)// exibindo dados

routes.get('/teachers/:id/edit', teachers.edit) // editando dados

routes.put('/teachers', teachers.put) // atualizando dados

routes.delete("/teachers", teachers.delete) //deletando 





routes.get('/students', (req, res) => {

    return res.render('students/index')
})

module.exports = routes; // importando rotas