const currentPage = location.pathname // pegando local da página

const menuItems = document.querySelectorAll(" nav a")// pegando os likns nav

for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href")) ){
        item.classList.add("active")
    }
}