"use strict"
const referencia = {
    retornarColuna(inputTarget) {
        const col = inputTarget.parentElement.dataset.col;
        const colOutput = document.querySelector(".reference__output--coluna");
        colOutput.value = col;
    },
    retornarLinha(inputTarget) {
        const inputTargetParent = inputTarget.parentElement;
        const inputTargetAndSibling = inputTargetParent.children;
        const inputTargetGrandParent = inputTargetParent.parentElement;
        const indicadores = inputTargetGrandParent.querySelectorAll(".ficha__col-de-indicadores span");
        const linhaOutput = document.querySelector(".reference__output--indicador");
        let inputTargetIndex = 0;
        for (const i in inputTargetAndSibling) {
            if(inputTargetAndSibling[i] === inputTarget) {
                inputTargetIndex = i;
            }
        }
        let inputTargetHasAttrDataStock = inputTarget.dataset.stock;
        if(inputTargetHasAttrDataStock) {
            linhaOutput.value = inputTarget.dataset.stock;
        } else {
            linhaOutput.value = indicadores[inputTargetIndex].innerText;
        }
    },
    retornarVazio() {
        const outputs = document.querySelectorAll(".reference__output");
        for (const output of outputs) output.value = "";
    }
}
function events() {
    const inputsCelulares = document.querySelectorAll("[data-totaleixoy], .stock-de-atpu");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("focus", () => {;
            referencia.retornarColuna(inputCelular);
            referencia.retornarLinha(inputCelular);
        });
    });
    inputsCelulares.forEach( inputCelular => inputCelular.addEventListener("focusout", referencia.retornarVazio));
}
window.onload = events;