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
        if(cel.dataset.subtotaleixoy && cel.dataset.totaleixoy) {
            
            cel.classList.add(`${cel.dataset.subtotaleixoy}`);
            cel.classList.add(`${cel.dataset.totaleixoy}`);
            
          
            let subtotalEixoY = document.querySelectorAll(`.${cel.dataset.subtotaleixoy}`),
            subtotalEixoYOutput = document.querySelector(`.${cel.dataset.subtotaleixoyoutput}`),
            totalEixoY = document.querySelectorAll(`.${cel.dataset.totaleixoy}`),
            totalEixoYOutput = document.querySelector(`.${cel.dataset.totaleixoyoutput}`);

            this.totalizarCelulas(subtotalEixoY, subtotalEixoYOutput);
            this.totalizarCelulas(totalEixoY, totalEixoYOutput);
        }

        if(cel.dataset.totaleixox) {
            
            cel.classList.add(`${cel.dataset.totaleixox}`);
            
            let totalEixoX = document.querySelectorAll(`.${cel.dataset.totaleixox}`),
            totalEixoXOutput = document.querySelector(`.${cel.dataset.totaleixoxoutput}`);
        
            this.totalizarCelulas(totalEixoX, totalEixoXOutput);
        }


        if(cel.dataset.subtotaleixox) {
            cel.classList.add(`${cel.dataset.subtotaleixox}`);

            let subtotalEixoX = document.querySelectorAll(`.${cel.dataset.subtotaleixox}`),
            subtotalEixoXOutput = document.querySelector(`.${cel.dataset.subtotaleixoxoutput}`);

            this.totalizarCelulas(subtotalEixoX, subtotalEixoXOutput);
        }

        
        if(cel.dataset.totalgeral) {
            cel.classList.add(`${cel.dataset.totalgeral}`);

            let totalGeral = document.querySelectorAll(`.${cel.dataset.totalgeral}`),
            totalGeralOutput = document.querySelector(`.${cel.dataset.totalgeraloutput}`);

            this.totalizarCelulas(totalGeral, totalGeralOutput);
        }


        if(cel.dataset.totalquetransitam) {
            let abc = cel.dataset.totalquetransitam.split("-mais-");
            let a = abc[0], b = abc[1], c = abc[2];

            const ah = document.querySelector(`.${a}`);
            const be = document.querySelector(`.${b}`);
            const ce = document.querySelector(`.${c}`);
            const cd = document.querySelector(`.${cel.dataset.totalquetransitamoutput}`);

            cd.value = Number(ah.value) + Number(be.value) - ce.value;
            
        }

        if(cel.dataset.subtotalquetransitam) {
            let abc = cel.dataset.subtotalquetransitam.split("-mais-");
            let a = abc[0], b = abc[1], c = abc[2];

            const ah = document.querySelector(`.${a}`);
            const be = document.querySelector(`.${b}`);
            const ce = document.querySelector(`.${c}`);
            const cd = document.querySelector(`.${cel.dataset.subtotalquetransitamoutput}`);

            cd.value = Number(ah.value) + Number(be.value) - ce.value;
        }


        if(cel.dataset.totalgeralquetransitam) {
            let abc = cel.dataset.totalgeralquetransitam.split("-mais-");
            let a = abc[0], b = abc[1], c = abc[2];

            const ah = document.querySelector(`.${a}`);
            const be = document.querySelector(`.${b}`);
            const ce = document.querySelector(`.${c}`);
            const cd = document.querySelector(`.${cel.dataset.totalgeralquetransitamoutput}`);

            cd.value = Number(ah.value) + Number(be.value) - ce.value;
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
        cel.value != "" && totalizacao.filtrarCelulas(cel); // No Load do Windows
    });
}

window.addEventListener("load", () => {
    if(typeof(Storage) !== "undefined") {
        storage.salvarFicha();
        storage.salvarDadosAdicionais();
    }
    escutarEventos();
});