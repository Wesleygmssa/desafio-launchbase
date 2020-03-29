const fs = require('fs') //trabalha com arquivos dos sistemas
const data = require('./data.json')
const crypto = require('crypto');
const { age, graduation} = require('./utils')



exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (key of keys) { // verificação dos campos do no formulario.
        if (req.body[key] == "") {
            return res.send('Please, fill all fields')
        }
    }

    let { avatar_url, name, birth, grau, typeaula, services } = req.body // desestruturação do objeto

     birth = Date.parse(birth) //modificando
     const create_at = Date.now() // criando
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
        create_at,
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
        create_at: new Intl.DateTimeFormat("en-GB").format(foundTeacher.create_at)
    }
    

   
    return res.render("teachers/show", { teacher})// passando do data.json
}