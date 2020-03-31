
//11 - 12 // mes -1
//11 - 11 // 0
//11 - 10 // 1

//01 -12 =  - 11 //dia
//12 - 12 = 0 
//13 - 12 = 1
module.exports = {
    age: function (timestamp){

        const today = new Date() // dd/mm/yy de hoje
        const birthDate = new Date(timestamp) // data aniversario da pessoa

    //2020 - 1990 // ano 30
    let age = today.getFullYear() - birthDate.getFullYear();
    // let age = today.getUTCFullYear() - birthDate.getFullYear()

    const month = today.getUTCMonth() - birthDate.getMonth()

    today.getDate()
    birthDate.getDate()
    // mes
    //11 - 12 // mes -1
    //11 - 11 // 0
    if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
        age = age - 1
    }

    return age
},


    graduation: (grau)=>{
    
        if (grau == "medio"){
        return    grau = "Ensino Médio Completo"
        }if (grau == "superior" ){
            return grau = "Ensino superior Completo"
        } if (grau){
            return grau 
        }
       
        return graduation
} ,

date: (timestamp)=>{
    const date = new Date(timestamp)

    //YYYY
    const year = date.getUTCFullYear()

    //mm
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)

    //dd
    const day = `0${date.getUTCDay()}`.slice(-2)
   
    return `${year}-${month}-${day}`
}


}


