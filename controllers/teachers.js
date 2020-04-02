const fs = require('fs') //trabalha com arquivos dos sistemas
const data = require('../data.json')
const crypto = require('crypto');
const { age, graduation, date} = require('../utils');
const Intl = require('intl');





exports.index = (req ,res) =>{

        
    return res.render('teachers/index',{teachers: data.teachers})
}

exports.create = (req, res) => {

    return res.render('teachers/create')
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
     const id = Number(data.teachers.length +1)
     const random = crypto.randomBytes(4).toString('HEX'); //outra forma de gerar id randomico.

    data.teachers.push({ // inserindo dados no array data.json
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

    fs.writeFile("data.json", JSON.stringify(data,null,2), (err)=>{
     if(err) return res.send("write file error!")

     return res.redirect('/teachers')
 })



}

exports.show = (req, res) =>{
    const {id} = req.params

    const foundTeacher = data.teachers.find((teachers)=>{
        return teachers.id == id
    })

    if (!foundTeacher) {
        return res.send("Teachers not found")
    }
    
    const teacher = {
        ...foundTeacher,//tudo que tem no foundTeacher, OBS: pode sobrer escrever o que está dentro.
        age: age(foundTeacher.birth), // criando agora não tinha dentro do foundTeacher
        grau: graduation(foundTeacher.grau),
        services: foundTeacher.services.split(","), // tarsnformando em array
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
    }
    

   
    return res.render("teachers/show", { teacher})// passando do data.json
}

exports.edit = (req ,res)=>{
    const { id } = req.params

    const foundteacher = data.teachers.find((teachers) => {
        return teachers.id == id
    })

    if (!foundteacher) {
        return res.send("Teachers not found")
    }

    const teacher = {
        ...foundteacher,
        birth: date(foundteacher.birth)
    }

    return res.render('teachers/edit', { teacher})
}

exports.put = function (req, res) {

    const { id } = req.body
    let index = 0

    const foundteacher = data.teachers.find(function (teacher, foundIndex) {
        if (teacher.id == id) {
            index = foundIndex
            return true
        }
    })


    if (!foundteacher) return res.send('teacher not found!')

    const teacher = {
        ...foundteacher, //dados antigos
        ...req.body,        //dados atualizado
        birth: Date.parse(req.body.birth), // formato timestamp
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher // identificado a posição e atualizando

    fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send(" write error!")

        return res.redirect(`/teacher/${id}`, { teacher })
    })
}

exports.delete = function (req, res) {
    const { id } = req.body

    const filterteachers = data.teachers.filter(function (teacher) {
        return teacher.id != id
    })

    data.teachers = filterteachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {

        if (err) return res.send("write file error")

        return res.redirect('/teachers')

    })

}






























// exports.delete = (req , res) =>{
//     const { id } = req.body

//     const filteredTeachers = data.teachers.filter((teacher)=>{
//         if( teacher.id != id){
//             return true
//         }
//     })

//     data.teacher = filteredTeachers

//   fs.watchFile("data.json", JSON.stringify(data, null, 2), (err)=>{
//     if(err){
//         return res.send("write file error");

//     }

//     return res.redirect('/teachers')
//   })
// }


//indentificar o erro depois
// exports.put = (req ,res) =>{
    

//     const { id } = req.body
//     let index = 0

//     const foundTeacher = data.teachers.find((teacher, faundIndex) => {
//         if( id == teacher.id){
//             index = faundIndex // adicionando a posição encontrada. find tbm usando como estrutura de repetição
//             return true
//         }
//     })

//     if (!foundTeacher) {
//         return res.send("Teachers not found")
//     }

//     const teacher ={
//         ...foundTeacher,
//         ...req.body,
//         birth: Date.parse(birth)
//     }


//     //agora saber a posição do objeto

//     data.teachers[index] = teacher// encontrado a posição o professor e substituido pelo novo.


//     fs.watchFile("data.json", JSON.stringify(data, null, 2), (err)=>{
//         if(err){
//             return res.send("Write error")
//         }

//         return res.redirect(`/teachers/${id}`)
//     })
// }