"use strict"

const referencia = {
    retornarColuna(inputTarget) {
        const col = inputTarget.parentElement.dataset.col;
        const colOutput = document.querySelector(".reference-row__output--coluna");
        colOutput.value = col;
    },

    retornarLinha(inputTarget) {
        const inputTargetParent = inputTarget.parentElement;
        const inputTargetAndSibling = inputTargetParent.children;
        const inputTargetGrandParent = inputTargetParent.parentElement;
        const indicadores = inputTargetGrandParent.querySelectorAll(".ficha__col-de-indicadores span");
        const linhaOutput = document.querySelector(".reference-row__output--linha");

        

        let inputTargetIndex = 0;
        for (const i in inputTargetAndSibling) {
            if(inputTargetAndSibling[i] === inputTarget) {
                inputTargetIndex = i;
            }
        }

        linhaOutput.value = indicadores[inputTargetIndex].innerText;
    },

    retornarVazio() {
        const outputs = document.querySelectorAll(".reference-row__output");
        for (const o of outputs) o.value = "";
    }
}

function events() {
    const gridInputs = document.querySelectorAll("[data-totaleixox]");
    gridInputs.forEach( gi => {
        gi.addEventListener("focus", () => {;
            referencia.retornarColuna(gi);
            referencia.retornarLinha(gi);
        });
    });

    gridInputs.forEach( gi => gi.addEventListener("focusout", referencia.retornarVazio));
}

window.onload = events;