const fs = require('fs') //trabalha com arquivos dos sistemas
const data = require('./data.json')



exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (key of keys) { // verificação dos campos do no formulario.
        if (req.body[key] == "") {
            return res.send('Please, fill all fields')
        }
    }

    data.teachers.push(req.body)

    fs.writeFile("data.json", JSON.stringify(data,null,2), (err)=>{
     if(err) return res.send("write file error!")

     return res.redirect('/teachers')
 })



}