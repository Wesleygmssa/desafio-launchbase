const fs = require('fs') //trabalha com arquivos dos sistemas
const data = require('../data.json')
const crypto = require('crypto');
const { age, graduation, date } = require('../utils');
const Intl = require('intl');





exports.index = (req, res) => {


    return res.render('students/index', { students: data.students })
}

exports.create = (req, res) => {

    return res.render('students/create')
}

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (key of keys) { // verificação dos campos do no formulario.
        if (req.body[key] == "") {
            return res.send('Please, fill all fields')
        }
    }

    let { avatar_url, name, birth, grau, typeaula, services } = req.body // desestruturação do objeto

    birth = Date.parse(birth) //modificando
    const created_at = Date.now() // criando
    const id = Number(data.students.length + 1)
    const random = crypto.randomBytes(4).toString('HEX'); //outra forma de gerar id randomico.

    data.students.push({ // inserindo dados no array data.json
        id,
        avatar_url,
        name,
        birth,
        grau,
        typeaula,
        services,
        created_at,
        random

    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("write file error!")

        return res.redirect('/students')
    })



}

exports.show = (req, res) => {
    const { id } = req.params

    const foundstudents = data.students.find((students) => {
        return students.id == id
    })

    if (!foundstudents) {
        return res.send("Teachers not found")
    }

    const student = {
        ...foundstudents,//tudo que tem no foundTeacher, OBS: pode sobrer escrever o que está dentro.
        age: age(foundstudents.birth), // criando agora não tinha dentro do foundTeacher,
        services: foundstudents.services.split(","), // tarsnformando em array
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundstudents.created_at)
    }



    return res.render("students/show", { student })// passando do data.json
}

exports.edit = (req, res) => {
    const { id } = req.params

    const foundstudent = data.students.find((students) => {
        return students.id == id
    })

    if (!foundstudent) {
        return res.send("Teachers not found")
    }

    const student = {
        ...foundstudent,
        birth: date(foundstudent.birth)
    }

    return res.render('students/edit', { student })
}

exports.put = function (req, res) {

    const { id } = req.body
    let index = 0

    const foundstudent = data.students.find(function (student, foundIndex) {
        if (student.id == id) {
            index = foundIndex
            return true
        }
    })


    if (!foundstudent) return res.send('student not found!')

    const student = {
        ...foundstudent, //dados antigos
        ...req.body,        //dados atualizado
        birth: Date.parse(req.body.birth), // formato timestamp
        id: Number(req.body.id)
    }

    data.students[index] = student // identificado a posição e atualizando

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send(" write error!")

        return res.redirect(`/student/${id}`, { student })
    })
}

exports.delete = function (req, res) {
    const { id } = req.body

    const filterstudents = data.students.filter(function (student) {
        return student.id != id
    })

    data.students = filterstudents

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

        if (err) return res.send("write file error")

        return res.redirect('/students')

    })

}


























