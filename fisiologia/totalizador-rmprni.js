"use strict";

const storage  = {
    salvarFicha() {
        for (let i = 0; i < inputCels.length; i++) {
            // Salvar
            inputCels[i].addEventListener("input", () => localStorage.setItem(`trmprni-cel${i}`, `${inputCels[i].value}`));
            // Restaurar
            inputCels[i].value = localStorage.getItem(`trmprni-cel${i}`);
        }
    },

    salvarDadosAdicionais() {
        const dadosAdicionais = document.querySelectorAll("div.container input[type=text], input[type=date], textarea#nota");

        dadosAdicionais.forEach ( dado => {
            dado.addEventListener("input", () => localStorage.setItem(`trmprni-${dado.id}`, `${dado.value}`));
            dado.value = localStorage.getItem(`trmprni-${dado.id}`);

            if(dado.matches("#nota")) {
                let denegrirNota = () => dado.value !== "" ? dado.classList.add("bold") : dado.classList.remove("bold");
                dado.addEventListener("input", () => denegrirNota());
                denegrirNota(); // NO LOAD DO WINDOWS 
            }
        });
    }
}

const totalizacao = {
    filtrarCelulas(cel) {
        if((cel.dataset.subtotaleixoy) && (cel.dataset.totaleixoy)) {
            console.log("hello world")
            cel.classList.add(`${cel.dataset.subtotaleixoy}`);
            cel.classList.add(`${cel.dataset.totaleixoy}`);
            
          
            let subtotaleixoy = document.querySelectorAll(`.${cel.dataset.subtotaleixoy}`),
            subtotaleixoyOutput = document.querySelector(`.${cel.dataset.subtotaleixoyoutput}`),
            totaleixoy = document.querySelectorAll(`.${cel.dataset.totaleixoy}`),
            totaleixoyOutput = document.querySelector(`.${cel.dataset.totaleixoyoutput}`);

            this.totalizarCelulas(subtotaleixoy, subtotaleixoyOutput);
            this.totalizarCelulas(totaleixoy, totaleixoyOutput);
        }

        /*if(cel.dataset.subtotaleixoynaoaplicaveloutput) {
            let subtotaleixoyNaoAplicavelOutput = document.querySelector(`.${cel.dataset.subtotaleixoynaoaplicaveloutput}`);
            subtotaleixoyNaoAplicavelOutput.value = 0;
        }*/
    },

    totalizarCelulas(celulasPorTotalizar, celulaDeSaida) {
        let total = 0;
        for (const cel of celulasPorTotalizar) {
            total+=Number(cel.value);
        }
        celulaDeSaida.value = total;
    }
}

function escutarEventos() {
    // TOTALIZACAO
    inputCels.forEach( cel => {
        cel.addEventListener("input", () => totalizacao.filtrarCelulas(cel)); // T
        /*cel.value != "" && totalizacao.filtrarCelulas(cel); */// No Load do Windows
    });
}

window.addEventListener("load", () => {
    if(typeof(Storage) !== "undefined") {
        storage.salvarFicha();
        storage.salvarDadosAdicionais();
    }
    escutarEventos();
});