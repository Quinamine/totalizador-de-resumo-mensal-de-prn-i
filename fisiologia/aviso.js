window.addEventListener("load", () => {
    const btnCloseAviso = document.querySelector(".btn-fechar-aviso");
    btnCloseAviso.addEventListener("click", () => {
        btnCloseAviso.parentElement.classList.remove("--open");
    })
})