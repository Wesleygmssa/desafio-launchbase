const express = require('express');
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')
const routes = express.Router();



//rotas

//teachers
routes.get('/', (req, res) => {// redirect da página inicial

    return res.redirect('/teachers')
});

routes.get('/teachers', teachers.index)
routes.get('/teachers/create', teachers.create)
routes.post("/teachers", teachers.post)// salvando dados
routes.get('/teachers/:id',teachers.show)// exibindo dados
routes.get('/teachers/:id/edit', teachers.edit) // editando dados
routes.put('/teachers', teachers.put) // atualizando dados
routes.delete("/teachers", teachers.delete) //deletando 


//students
routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.post("/students", students.post)// salvando dados
routes.get('/students/:id', students.show)// exibindo dados
routes.get('/students/:id/edit', students.edit) // editando dados
routes.put('/students', students.put) // atualizando dados
routes.delete("/students", students.delete) //deletando 


module.exports = routes; // importando rotas