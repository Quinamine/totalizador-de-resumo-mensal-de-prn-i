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

        if(inputTarget.dataset.proporcaodesaida6a59mesesc1) {
            let proporcaoDeSaida6a59mesesC1 = inputTarget.dataset.proporcaodesaida6a59mesesc1;
            let proporcaoDeSaida6a59mesesC1Output = document.querySelector(`.${inputTarget.dataset.proporcaodesaida6a59mesesc1output}`);      
            proporcaoDeSaida6a59mesesC1Output.value = this.calcularProporcaoDeSaida(proporcaoDeSaida6a59mesesC1);

            let proporcaoDeSaida6a59mesesC2 = inputTarget.dataset.proporcaodesaida6a59mesesc2;
            let proporcaoDeSaida6a59mesesC2Output = document.querySelector(`.${inputTarget.dataset.proporcaodesaida6a59mesesc2output}`);      
            proporcaoDeSaida6a59mesesC2Output.value = this.calcularProporcaoDeSaida(proporcaoDeSaida6a59mesesC2);

            let proporcaoDeSaida6a59mesesC3 = inputTarget.dataset.proporcaodesaida6a59mesesc3;
            let proporcaoDeSaida6a59mesesC3Output = document.querySelector(`.${inputTarget.dataset.proporcaodesaida6a59mesesc3output}`);      
            proporcaoDeSaida6a59mesesC3Output.value = this.calcularProporcaoDeSaida(proporcaoDeSaida6a59mesesC3);

            let proporcaoDeSaida6a59mesesC4 = inputTarget.dataset.proporcaodesaida6a59mesesc4;
            let proporcaoDeSaida6a59mesesC4Output = document.querySelector(`.${inputTarget.dataset.proporcaodesaida6a59mesesc4output}`);      
            proporcaoDeSaida6a59mesesC4Output.value = this.calcularProporcaoDeSaida(proporcaoDeSaida6a59mesesC4);

            let proporcaoDeSaida6a59mesesC5 = inputTarget.dataset.proporcaodesaida6a59mesesc5;
            let proporcaoDeSaida6a59mesesC5Output = document.querySelector(`.${inputTarget.dataset.proporcaodesaida6a59mesesc5output}`);      
            proporcaoDeSaida6a59mesesC5Output.value = this.calcularProporcaoDeSaida(proporcaoDeSaida6a59mesesC5);
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

        let proporcaoDeSaida = saida.value / totalDeSaidas.value * 100;

        if(isNaN(proporcaoDeSaida)) proporcaoDeSaida = 0;

        if(parseInt(proporcaoDeSaida) !== parseFloat(proporcaoDeSaida)) {
            proporcaoDeSaida = proporcaoDeSaida.toFixed(1)
        }

        return proporcaoDeSaida + "%";
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




