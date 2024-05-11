"use strict"

const backup = {
    saveGridInputs() {
        const gridInputs = document.querySelectorAll("[data-totaleixoy]");

        for (let i = 0; i < gridInputs.length; i++) {
            
            gridInputs[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, gridInputs[i].value);
            });
            gridInputs[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
        
    },
    
    saveExtraInputs() {
        const extraInputs = document.querySelectorAll(".input-nao-celular");
        extraInputs.forEach( extraInput => {
            extraInput.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${extraInput.id}`, extraInput.value));
            extraInput.value = localStorage.getItem(`${keyPrefix}-${extraInput.id}`);
        });
    }
}

const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
        inputTarget.classList.add(`${inputTarget.dataset.subtotaleixoy}`);
        inputTarget.classList.add(`${inputTarget.dataset.totaleixoy}`);

        //subtotal eixo y
        const subtotalEixoy = document.querySelectorAll(`.${inputTarget.dataset.subtotaleixoy}`);
        const subtotalEixoyOutput = document.querySelector(`.${inputTarget.dataset.subtotaleixoyoutput}`);
        subtotalEixoyOutput.value = this.somar(subtotalEixoy);  

        //total eixo y
        const totalEixoy = document.querySelectorAll(`.${inputTarget.dataset.totaleixoy}`);
        const totalEixoyOutput = document.querySelector(`.${inputTarget.dataset.totaleixoyoutput}`);
        totalEixoyOutput.value = this.somar(totalEixoy);  

        if(inputTarget.dataset.subtotaleixox) {
            inputTarget.classList.add(`${inputTarget.dataset.subtotaleixox}`);
            //subtotal eixo x
            const subsubtotalEixox = document.querySelectorAll(`.${inputTarget.dataset.subtotaleixox}`);
            const subsubtotalEixoxOutput = document.querySelector(`.${inputTarget.dataset.subtotaleixoxoutput}`);
            subsubtotalEixoxOutput.value = this.somar(subsubtotalEixox); 
        }

        if(inputTarget.dataset.totaleixox) {
            inputTarget.classList.add(`${inputTarget.dataset.totaleixox}`);
            const totalEixox = document.querySelectorAll(`.${inputTarget.dataset.totaleixox}`);
            const totalEixoxOutput = document.querySelector(`.${inputTarget.dataset.totaleixoxoutput}`);
            totalEixoxOutput.value = this.somar(totalEixox); 
        }

        if(inputTarget.dataset.totalgeral) {
            inputTarget.classList.add(`${inputTarget.dataset.totalgeral}`);
            const totalGeral = document.querySelectorAll(`.${inputTarget.dataset.totalgeral}`);
            const totalGeralOutput = document.querySelector(`.${inputTarget.dataset.totalgeraloutput}`);
            totalGeralOutput.value = this.somar(totalGeral); 
        }

        if(inputTarget.dataset.proporcaodesaidasc1) {
            let proporcaoDeSaidasC1 = inputTarget.dataset.proporcaodesaidasc1;
            let proporcaoDeSaidasC1Output = document.querySelector(`.${inputTarget.dataset.proporcaodesaidasc1output}`);      
            proporcaoDeSaidasC1Output.value = this.calcularProporcaoDeSaida(proporcaoDeSaidasC1);

            let proporcaoDeSaidasC2 = inputTarget.dataset.proporcaodesaidasc2;
            let proporcaoDeSaidasC2Output = document.querySelector(`.${inputTarget.dataset.proporcaodesaidasc2output}`);      
            proporcaoDeSaidasC2Output.value = this.calcularProporcaoDeSaida(proporcaoDeSaidasC2);

            let proporcaoDeSaidasC3 = inputTarget.dataset.proporcaodesaidasc3;
            let proporcaoDeSaidasC3Output = document.querySelector(`.${inputTarget.dataset.proporcaodesaidasc3output}`);      
            proporcaoDeSaidasC3Output.value = this.calcularProporcaoDeSaida(proporcaoDeSaidasC3);

            let proporcaoDeSaidasC4 = inputTarget.dataset.proporcaodesaidasc4;
            let proporcaoDeSaidasC4Output = document.querySelector(`.${inputTarget.dataset.proporcaodesaidasc4output}`);      
            proporcaoDeSaidasC4Output.value = this.calcularProporcaoDeSaida(proporcaoDeSaidasC4);

            let proporcaoDeSaidasC5 = inputTarget.dataset.proporcaodesaidasc5;
            let proporcaoDeSaidasC5Output = document.querySelector(`.${inputTarget.dataset.proporcaodesaidasc5output}`);      
            proporcaoDeSaidasC5Output.value = this.calcularProporcaoDeSaida(proporcaoDeSaidasC5);
        }

        // total de pacientesquetransitam
        let subtotalAmaisBmenosC = inputTarget.dataset.subtotalquetransitam;
        const subtotalQueTransitamOutput = document.querySelector(`.${inputTarget.dataset.subtotalquetransitamoutput}`);
        subtotalQueTransitamOutput.value = this.totalizarPacientesQueTransitam(subtotalAmaisBmenosC);

       let totalAmaisBmenosC = inputTarget.dataset.totalquetransitam;
        const totalDeTransicoesOutput = document.querySelector(`.${inputTarget.dataset.totalquetransitamoutput}`);
        totalDeTransicoesOutput.value = this.totalizarPacientesQueTransitam(totalAmaisBmenosC); 

        let totalGeralAmaisBmenosC = inputTarget.dataset.totalgeralquetransitam;
        const totalGeralQuetransitamOutput = document.querySelector(`.${inputTarget.dataset.totalgeralquetransitamoutput}`);
        totalGeralQuetransitamOutput.value = this.totalizarPacientesQueTransitam(totalGeralAmaisBmenosC);
    },

    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    },

    totalizarPacientesQueTransitam(aMaisBmenosC) {
        // la+lb-menos-lc

        let bmenosC = aMaisBmenosC.split("+")[1];
        let classeDeA = aMaisBmenosC.split("+")[0];
        let classeDeB = bmenosC.split("-menos-")[0];
        let classeDeC = bmenosC.split("-menos-")[1];
        
        const a = document.querySelector(`.${classeDeA}`);
        const b = document.querySelector(`.${classeDeB}`);
        const c = document.querySelector(`.${classeDeC}`);
        
        let total = Number(a.value) + Number(b.value) - Number(c.value);
        return total;
       
    },

    calcularProporcaoDeSaida(saidaDivisaoTotalDeSaidas) {
        let classeDesaida = saidaDivisaoTotalDeSaidas.split("-divisao-")[0];
        let classeDetotalDeSaidas = saidaDivisaoTotalDeSaidas.split("-divisao-")[1];

        let saida = document.querySelector(`.${classeDesaida}`);
        let totalDeSaidas = document.querySelector(`.${classeDetotalDeSaidas}`);

        let proporcaoDeSaidas = saida.value / totalDeSaidas.value * 100;

        if(isNaN(proporcaoDeSaidas)) proporcaoDeSaidas = 0;

        if(parseInt(proporcaoDeSaidas) !== parseFloat(proporcaoDeSaidas)) {
            proporcaoDeSaidas = proporcaoDeSaidas.toFixed(1)
        }

        return proporcaoDeSaidas + "%";
    }
}


function escutarEventos() {
    const gridInputs = document.querySelectorAll("[data-totaleixoy]");
    gridInputs.forEach( gi => {
        gi.addEventListener("input", () => {
            totalizador.filtrarEtotalizarCelulas(gi);
        });
        gi.value !== "" && totalizador.filtrarEtotalizarCelulas(gi);
    });
}

window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




