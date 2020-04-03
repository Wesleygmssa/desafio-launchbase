const currentPage = location.pathname // pegando local da página

const menuItems = document.querySelectorAll(" nav a")// pegando os likns nav

for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href")) ){
        item.classList.add("active")
    }
}


const formDelete = document.querySelector(".form-delete")

formDelete.addEventListener("submit", (event)=>{
    const confirmation = confirm("Deseja Deletar?") //confirmação
    if(!confirmation){
      event.preventDefault() // cancela o padrão de enviar o formulario
  }
})
