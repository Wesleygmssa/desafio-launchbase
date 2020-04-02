
//11 - 12 // mes -1
//11 - 11 // 0
//11 - 10 // 1

//01 -12 =  - 11 //dia
//12 - 12 = 0 
//13 - 12 = 1
module.exports = {
    //654739200000
    age: function (timestamp) {
        const today = new Date() // dd/mm/yy de hoje
        const birthDate = new Date(timestamp) // data aniversario da pessoa

        //2019 - 1990 = 30
        let age = today.getUTCFullYear() - birthDate.getFullYear()
        // Mês
        const month = today.getUTCMonth() - birthDate.getMonth()

        today.getUTCDate() // dia atual
        birthDate.getUTCDate() // dia do aniversario

        if (month < 0 || month == 0 && today.getUTCDate() <= birthDate.getUTCDate()) {
            age = age - 1
        }

        return age
    },



    graduation: (grau)=>{
    
        if (grau == "medio"){
        return    grau = "Ensino Médio Completo"
        }if (grau == "superior" ){
            return grau = "Ensino superior Completo"
        } if (grau == "mestrado"){
            return grau = "Mestrado completo"
        } if (grau == "doutorado") {
            return grau = "Doutorado completo"
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


