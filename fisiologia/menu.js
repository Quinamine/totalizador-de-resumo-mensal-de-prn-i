"use strict"
const menu = {
    realcarTotaisSe(condicao) {
        const totais = document.querySelectorAll("[readonly], .ficha__rodape__col-de-proporcoes output");
        for (const t of totais) {
            if(condicao) {
                t.classList.add("input--realcar-totais");
                localStorage.setItem(`${keyPrefix}-realcarTotais`, true);
            } else {
                t.classList.remove("input--realcar-totais");
                localStorage.removeItem(`${keyPrefix}-realcarTotais`);
            }
        }
    },
    irParaLinha() {
        return {
            dialogBox: document.querySelector(".dialog-box-ir-para"),
            inputNumLinha: document.querySelector(".dialog-box-ir-para__input-linha"),
            numerosDeLinha: document.querySelectorAll(".ficha__col-nums-de-linhas span"),
            abrirDialogBox() { 
                menu.irParaLinha().dialogBox.classList.add("--open");
                menu.irParaLinha().inputNumLinha.value = "";
                menu.irParaLinha().inputNumLinha.focus();
            },
            fecharDialogBox() {
                menu.irParaLinha().dialogBox.classList.remove("--open");
                menu.irParaLinha().removeLnHighlight();
            },
            goToLn(numLinha) {
                if(numLinha < 1 || numLinha > 63) {
                    const lnNoFound = "Sem correspondência."
                    alertarSobre(lnNoFound);
                    this.removeLnHighlight();
                } else {
                    numLinha = Number(numLinha) - 1;
                    this.highlightLnFound(this.numerosDeLinha[numLinha]);
                    if(window.innerWidth > 1304) {
                        numLinha -= 3;
                    }
                    numLinha > 3 ? this.numerosDeLinha[numLinha].scrollIntoView() 
                    : document.body.scrollIntoView();
                }
            },
            highlightLnFound(lnFound) {
                this.removeLnHighlight();
                lnFound.classList.add("--highlight");
            },
            removeLnHighlight() {
                for(const num of this.numerosDeLinha) {
                    num.classList.remove("--highlight");
                }
            }
        }
    },
    esvaziarFicha() {
        return {  
            dialogBox: document.querySelector(".dialog-box-esvaziar-ficha"),
            abrirDialogBox() { 
                const inputsDaFicha = document.querySelectorAll(".ficha input");
                const campoDeObs = document.querySelector(".obs__input");
                let inputFilled = 0;
                campoDeObs.textContent.length > 0 && (inputFilled = 1);
                for(const input of inputsDaFicha) {
                    input.value.length > 0 && inputFilled++;
                }
                if(inputFilled === 0) {
                    const noInputFilledMsg = "Neste momento, a ficha encontra-se vazia."
                    alertarSobre(noInputFilledMsg);
                    return false;
                } 
                menu.esvaziarFicha().dialogBox.classList.add("--open");
                desfoqueDoFundo("desfocar");
            },
            fecharDialogBox() {
                menu.esvaziarFicha().dialogBox.classList.remove("--open");
                desfoqueDoFundo("focar");
            },
            confirmar() {
                const inputsCelulares  = document.querySelectorAll("[data-totaleixoy], [readonly], .stock-de-atpu, .ficha__rodape output");
                const checkboxesParaInputsNaoCelulares = document.querySelectorAll("[data-for]");
                for (let i = 0; i < inputsCelulares.length; i++) {
                    inputsCelulares[i].value = "";
                    localStorage.removeItem(`${keyPrefix}-input${i}`);
                }
                for (const cb of checkboxesParaInputsNaoCelulares) {                    
                    if(cb.checked) {
                        let idDeInputNaoCelular = cb.dataset.for
                        let inputNaoCelular = document.getElementById(`${idDeInputNaoCelular}`);
                        inputNaoCelular.value = "";
                        if(inputNaoCelular.matches("#input-obs")) {
                            inputNaoCelular.textContent = "";
                        }
                        localStorage.removeItem(`${keyPrefix}-${inputNaoCelular.id}`);
                    }
                }
                menu.esvaziarFicha().fecharDialogBox();
                removerDestaqueDeRedCells();
            }
        }
    },
    imprimirFicha() {
        const comentarios = document.querySelector(".obs__input");
        comentarios.textContent === "" ? comentarios.parentElement.classList.add("--no-print") : comentarios.parentElement.classList.remove("--no-print");
        let inputsCelulares = document.querySelectorAll("[data-totaleixoy]");
        let icPreenchidas = 0;
        let totalizadoPor;
        for(const ic of inputsCelulares) {
            ic.value.length > 0 && icPreenchidas++;
        }
        if(icPreenchidas > 0) {totalizadoPor = "Totalizado por computador. "} 
        else {totalizadoPor = "";}
        const urlOutput = document.querySelector(".ficha__url-pub");
        let url = location.href;
        if(window.location.protocol == "file:") {
            url = url.split("/totalizador-de-")[1];
            url = `https://quinamine.github.io/totalizador-de-${url}`;
        }
        const title = document.title;
        urlOutput.innerHTML = `${totalizadoPor}${title} disponível em: <span class="ficha__url-pub__link">${url}</span>`;
        window.print();
    },
    abrirArtigo(artigo) {
        const artigoSobre = document.querySelector(".artigo--sobre");
        const artigoAjuda = document.querySelector(".artigo--ajuda");
        const body = document.querySelector("body");
        artigo === "sobre" ? artigoSobre.classList.add("--open") 
        : artigoAjuda.classList.add("--open");
        body.classList.add("--overflow-h");
        desfoqueDoFundo("desfocar");
    },
    fecharArtigo(artigo) {
        const artigoSobre = document.querySelector(".artigo--sobre");
        const artigoAjuda = document.querySelector(".artigo--ajuda");
        const body = document.querySelector("body");
        artigo === "sobre" && artigoSobre.classList.remove("--open");
        if(artigo === "ajuda") {
            const details = document.getElementsByTagName("details");
            for (const d of details) {
                d.removeAttribute("open");
            }
            artigoAjuda.classList.remove("--open");
        }
        body.classList.remove("--overflow-h");
        desfoqueDoFundo("focar");
    }
}
function eventos() {
    // REALCAR TOTAIS
    const checkboxRealcarTotais = document.getElementById("checkbox-realcar-totais");
    const cRt = checkboxRealcarTotais;
    cRt.addEventListener("change", () => cRt.checked ? menu.realcarTotaisSe(1) : menu.realcarTotaisSe(0));
    // Realcar totais no load do windows 
    if(localStorage.getItem(`${keyPrefix}-realcarTotais`)) {
        checkboxRealcarTotais.setAttribute("checked", "checked");
        menu.realcarTotaisSe(1);
    }
    // IR PARA LINHA
    const btnAbrirIrPara = document.querySelector(".header__menu__btn--ir-para");
    btnAbrirIrPara.addEventListener("click", menu.irParaLinha().abrirDialogBox);
    const btnFecharIrPara = document.querySelector(".dialog-box-ir-para__btn--fechar");
    btnFecharIrPara.addEventListener("click", menu.irParaLinha().fecharDialogBox);
    const inputNumLinha = document.querySelector(".dialog-box-ir-para__input-linha");
    inputNumLinha.addEventListener("input", () => {
        inputNumLinha.value !== "" ? menu.irParaLinha().goToLn(inputNumLinha.value) 
        : menu.irParaLinha().removeLnHighlight();
    });
    // Fechar dialog-boxes-default
    const btnsFecharDialogBox = document.querySelectorAll(".dialog-box-default__btn");
    btnsFecharDialogBox.forEach( btn => {
        btn.addEventListener("click", () => {
            let btnParent = btn.parentElement;
            btnParent.parentElement.classList.remove("--open");
            clearInterval(btnAutoCloseLoop);
        });
    });
    // ESVAZIAR FICHA 
    const btnEsvaziarFicha = document.querySelector(".header__menu__btn--esvaziar-ficha");
    btnEsvaziarFicha.addEventListener("click", menu.esvaziarFicha().abrirDialogBox);
    const btnCancelar = document.querySelector(".dialog-box-esvaziar-ficha__btn--cancelar");
    btnCancelar.addEventListener("click", menu.esvaziarFicha().fecharDialogBox);
    const btnConfirmar = document.querySelector(".dialog-box-esvaziar-ficha__btn--confirmar");
    btnConfirmar.addEventListener("click", menu.esvaziarFicha().confirmar);
    // IMPRIMIR 
    const btnImprimir = document.querySelector(".header__menu__btn--imprimir");
    btnImprimir.addEventListener("click", menu.imprimirFicha);
    // Artigos
    const btnAbrirSobre = document.querySelector(".header__menu__btn--sobre");
    btnAbrirSobre.addEventListener("click", () => menu.abrirArtigo("sobre"));
    const btnFecharSobre = document.querySelector(".artigo__btn-x--fechar-sobre")
    btnFecharSobre.addEventListener("click", () => menu.fecharArtigo("sobre"));
    window.addEventListener("resize", () => {
        const artigoSobre = document.querySelector(".artigo--sobre");
        const itsMobile = window.innerWidth < 1024;
        const articleIsOpen = artigoSobre.matches(".--open");
        const body = document.querySelector("body");
        if(itsMobile && articleIsOpen) {
            desfoqueDoFundo("focar");
            location.href = `index.html#${artigoSobre.id}`;
            body.classList.remove("--overflow-h");
        } else if(!itsMobile && articleIsOpen) {
            desfoqueDoFundo("desfocar");
            body.classList.add("--overflow-h");
        }       
    });
    const btnAbrirAjuda = document.querySelector(".header__menu__btn--ajuda");
    btnAbrirAjuda.addEventListener("click", () => menu.abrirArtigo("ajuda"));
    const btnFecharAjuda = document.querySelector(".artigo__btn-x--fechar-ajuda")
    btnFecharAjuda.addEventListener("click", () => {
        menu.fecharArtigo("ajuda");
        removerBordaDoMovitoDeRedCells();
    });
    // PARTILHAR 
    const data = {
        title: "Totalizador de Resumo Mensal de PRN I",
        text: "Totaliza automaticamente o resumo mensal de tratamento de desnutrição em ambulatório para crianças dos 6 meses aos 14 anos com base nos dados inseridos pelo usuário. Foi desenvolvido de acordo com o modelo da respectiva ficha de resumo mensal actualmente vigente no Serviço Nacional de Saúde em Moçambique.",
        url: "https://quinamine.github.io/totalizador-de-resumo-mensal-de-prn-i/index.html"
    }
    const btnPartilhar = document.querySelector(".main__btn-fixed--share");
    btnPartilhar.addEventListener("click", () => {
        try {
            navigator.share(data).then(()=>console.log("Totalizador partilhado com sucesso."))
            .catch(e=> console.log(`Não foi possivel partilhar o totalizador devido ao erro: ${e}.`))
        } catch (e) {
            console.log("O seu navegador não tem suporte ao método 'navigator.share()'.")
        }
    });
}
window.addEventListener("load", eventos);
window.addEventListener("keydown", event => {
    // CONTROL = 17 && p = 80
    if(event.ctrlKey && event.keyCode === 80) {
        event.preventDefault();
        menu.imprimirFicha();
    }
});
