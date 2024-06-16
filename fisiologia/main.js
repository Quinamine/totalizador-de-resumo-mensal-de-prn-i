"use strict"

const backup = {
    saveGridInputs() {
        const inputsCelulares = document.querySelectorAll("[data-totaleixoy], .stock-de-atpu");

        for (let i = 0; i < inputsCelulares.length; i++) {
            
            inputsCelulares[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, inputsCelulares[i].value);
            });
            inputsCelulares[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
        
    },
    
    saveExtraInputs() {
        const inputsNaoCelulares = document.querySelectorAll(".input-nao-celular");
        inputsNaoCelulares.forEach( extraInput => {
            extraInput.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${extraInput.id}`, extraInput.value));
            extraInput.value = localStorage.getItem(`${keyPrefix}-${extraInput.id}`);
        });
    }
}

const totalizador = {
    filtrarEtotalizarCelulas(inputTarget) {
   
        //subtotal eixo y
        let classNameDosOperandos = inputTarget.dataset.subtotaleixoy;
        inputTarget.classList.add(`${classNameDosOperandos}`);

        let operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
        let celulaDeSaida = document.querySelector(`.${inputTarget.dataset.subtotaleixoyoutput}`);
        celulaDeSaida.value = this.somar(operandos);  

        //total eixo y
        classNameDosOperandos = inputTarget.dataset.totaleixoy;
        inputTarget.classList.add(`${classNameDosOperandos}`);

        operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
        celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaleixoyoutput}`);
        celulaDeSaida.value = this.somar(operandos);  

        if(inputTarget.dataset.subtotaleixox) {
            classNameDosOperandos = inputTarget.dataset.subtotaleixox;
            inputTarget.classList.add(`${classNameDosOperandos}`);

            //subtotal eixo x
            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.subtotaleixoxoutput}`);
            celulaDeSaida.value = this.somar(operandos); 
        }

        if(inputTarget.dataset.totaleixox) {
            classNameDosOperandos = inputTarget.dataset.totaleixox;
            inputTarget.classList.add(`${classNameDosOperandos}`);

            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totaleixoxoutput}`);
            celulaDeSaida.value = this.somar(operandos); 
        }

        if(inputTarget.dataset.totalgeral) {
            classNameDosOperandos = inputTarget.dataset.totalgeral;
            inputTarget.classList.add(`${classNameDosOperandos}`);

            operandos = document.querySelectorAll(`.${classNameDosOperandos}`);
            celulaDeSaida = document.querySelector(`.${inputTarget.dataset.totalgeraloutput}`);
            celulaDeSaida.value = this.somar(operandos); 
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

        if(inputTarget.dataset.totalquetransitam) {
            let classDosOperandos = inputTarget.dataset.totalquetransitam;
            let totalOutput = document.querySelector(`.${inputTarget.dataset.totalquetransitamoutput}`);
            totalOutput.value = this.totalizarPacientesQueTransitam(classDosOperandos)
        }

        if(inputTarget.dataset.subtotalquetransitam) {
            let classDosOperandos = inputTarget.dataset.subtotalquetransitam;
            let totalOutput = document.querySelector(`.${inputTarget.dataset.subtotalquetransitamoutput}`);
            totalOutput.value = this.totalizarPacientesQueTransitam(classDosOperandos)
        }

        if(inputTarget.dataset.totalgeralquetransitam) {
            let classDosOperandos = inputTarget.dataset.totalgeralquetransitam;
            let totalOutput = document.querySelector(`.${inputTarget.dataset.totalgeralquetransitamoutput}`);
            totalOutput.value = this.totalizarPacientesQueTransitam(classDosOperandos)
        }

    },

    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    },

    totalizarPacientesQueTransitam(classDosOperandos) {
        // la+lb-menos-lc
        let classDeOperandoA = classDosOperandos.split("+")[0];
        let operandoA = document.querySelector(`.${classDeOperandoA}`);

        let classDeOperandoB = classDosOperandos.split("+")[1].split("-menos-")[0];
        let operandoB = document.querySelector(`.${classDeOperandoB}`);

        let classDeOperandoC = classDosOperandos.split("+")[1].split("-menos-")[1];
        let operandoC = document.querySelector(`.${classDeOperandoC}`);

        let total = Number(operandoA.value) + Number(operandoB.value) - Number(operandoC.value);
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
    const inputsCelulares = document.querySelectorAll("[data-totaleixoy]");
    inputsCelulares.forEach( inputCelular => {
        inputCelular.addEventListener("input", () => {
            totalizador.filtrarEtotalizarCelulas(inputCelular);
        });
        inputCelular.value !== "" && totalizador.filtrarEtotalizarCelulas(inputCelular);
    });
}

window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




