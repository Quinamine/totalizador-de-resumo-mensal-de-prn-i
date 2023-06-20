"use strict";

const menu = {

    // ESVAZIAR A FICHA
    esvaziamento() {
        const confirmacao = document.querySelector("div.caixa-de-confirmacao");
        const celulas = document.querySelectorAll("div.ficha input");
        return {
            mostrarCaixaDeConfirmacao: () => {
                let celulasPreenchidas = 0;
                for (const cel of celulas) {
                    cel.value != "" && celulasPreenchidas++;
                }

                if(celulasPreenchidas > 0) {
                    confirmacao.classList.add("on");
                    desfoqueDoFundo.on();
                }
                else {
                    const alerta = document.querySelector("div.caixa-de-alerta.ficha-vazia");
                    alerta.classList.add("on");
                    desfoqueDoFundo.on();
                }
            },

            omitirCaixaDeConfirmacao: () => {
                confirmacao.classList.remove("on");
                desfoqueDoFundo.off();
            },

            limparDados: () => {   

                for (let i = 0; i < celulas.length; i++) {
                    celulas[i].value = "";
                    typeof(Storage) !== "undefined" && localStorage.removeItem(`trmprni-cel${i}`);
                    inputValidation.adicionarOuRemoverFundoVermelho(celulas[i], "-");
                };

                const limpadoresDeDadosAdicionais = document.querySelectorAll("ul.limpadores-de-dados-adicionais input");
                
                limpadoresDeDadosAdicionais.forEach ( limpador => {
                    if(limpador.checked) {
                        const IdDoDadoAdicional = limpador.dataset.for; 
                        const dadoAdicional = document.querySelector(`#${IdDoDadoAdicional}`);
                        dadoAdicional.value = "";
                        typeof(Storage) !== "undefined" && localStorage.removeItem(`trmprni-${IdDoDadoAdicional}`);

                        // Eliminar o negrito deste elemento para o placeholder não ficar muito nítido
                        if(IdDoDadoAdicional === "nota") {
                            dadoAdicional.classList.remove("bold");
                        }
                    }

                    const proporcoesOutput = document.querySelectorAll("footer.da-ficha > div span:nth-child(n+2)");

                    for(const p of proporcoesOutput) {
                        p.textContent = "";
                    }
                }); 
                desfoqueDoFundo.off();  
            }
        }
    },

    // IMPRIMIR 
    imprimirFicha() {
        textArea.value === "" ?
            textArea.parentElement.classList.add("no-print") :
            textArea.parentElement.classList.remove("no-print");

        window.print();
    },

    // SOBRE
    abrirArtigoSobre() {
        document.querySelector("section#sobre").classList.add("on");
        desfoqueDoFundo.on();
    },

    // COOKIES
    abrirArtigoCookies() {
        document.querySelector("section#cookies").classList.add("on");
        desfoqueDoFundo.on();
        if(window.innerWidth < 1024) {
            document.querySelector("body").classList.add("overflow-hidden");
        }
    },

    // SALVAR COMO PDF
    salvarComoPdf() {
        if(window.innerWidth < 1024) {
            this.imprimirFicha();
        } else {
            document.querySelector("section#conversao-pdf").classList.add("on");
            desfoqueDoFundo.on();
        }
    }
}

const desfoqueDoFundo = {
    on() {
        divDesfocante.classList.add("on");
    },

    off() {
        const janelasDesfocantes = document.querySelectorAll("div.caixa-de-confirmacao, div.caixa-de-alerta, div.hamburguer");  
        let janelasAbertas = 0;

        for (const janela of janelasDesfocantes) {
            if(janela.classList.contains("on")) janelasAbertas++;
        }
        if(janelasAbertas > 0) return false;
        divDesfocante.classList.remove("on");
    }
}

// DECLARAÇÃO E INICIALIZAÇÃO DAS VARIÁVEIS
 
let textArea, divDesfocante, readonlyCels;
function init() {
    textArea = document.querySelector("textarea#nota");
    divDesfocante = document.querySelector("div.desfoque");
    readonlyCels = document.querySelectorAll("input[readonly]");
}

// EVENTOS
function eventListeners() {

    // FECHAR CAIXA DE ALERTA
    const btnsFecharAlerta = document.querySelectorAll("div.caixa-de-alerta button");
    for (const btn of btnsFecharAlerta) {
        btn.addEventListener("click", () => {
            btn.parentElement.classList.remove("on");
            desfoqueDoFundo.off();
        })
    }

    // PROTEGER ACESSO À READONLY CELS
    readonlyCels.forEach ( cel => {
        cel.addEventListener("click", () => {
            document.querySelector("div.caixa-de-alerta.restricao-de-acesso-celular").classList.add("on");
                
            desfoqueDoFundo.on();
        })
    });

    // ESVAZIAR FICHA 
    const btnEsvaziar = document.querySelector("button.esvaziar-ficha");
    btnEsvaziar.addEventListener("click", () => menu.esvaziamento().mostrarCaixaDeConfirmacao());

    const btnCancelar = document.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", () =>  menu.esvaziamento().omitirCaixaDeConfirmacao());

    const btnConfirmar = document.querySelector("button.confirmar");
    btnConfirmar.addEventListener("click", () => {
        menu.esvaziamento().limparDados();
        menu.esvaziamento().omitirCaixaDeConfirmacao();
    });

    // IMPRIMIR 
    const btnImprimir = document.querySelector("button.imprimir");
    btnImprimir.addEventListener("click", () => menu.imprimirFicha());

    // ABRIR CONTEÚDO SOBRE
    const btnSobre = document.querySelector("button.abrir-artigo-sobre");
    btnSobre.addEventListener("click", () => menu.abrirArtigoSobre());

    // ABRIR CONTEÚDO SOBRE NO LOAD DO WINDOWS
    if(location.hash === "#sobre") {
        menu.abrirArtigoSobre();
    }

    // ABRIR CONTEÚDO DE COOKIES
    const btnSaibaMaisSobreCookies = document.querySelector("button.abrir-artigo-cookies");
    btnSaibaMaisSobreCookies.addEventListener("click", () => menu.abrirArtigoCookies());

    // FECHAR CONTEÚDO SOBRE E COOKIES
    const btnsFecharArtigo = document.querySelectorAll("button.fechar-artigo");
    btnsFecharArtigo.forEach ( btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.classList.remove("on");
            desfoqueDoFundo.off();
            document.querySelector("body").classList.remove("overflow-hidden");
        })
    });

    // ADICIONAR POSITION STICKY AO H1 DO ARTIGO DE COOKIES
    const artigoCookies = document.querySelector("section#cookies");
    const h1DoArtigoCookies = artigoCookies.querySelector("h1");
    const btnVoltar = artigoCookies.querySelector("button.fechar-artigo");
    
    artigoCookies.addEventListener("scroll", () => {
        let posicaoDoH1 = h1DoArtigoCookies.getBoundingClientRect().top;

        if(posicaoDoH1 <= 0) {
            h1DoArtigoCookies.classList.add("sticky");
            btnVoltar.classList.add("with-h1-sticky");
        } else {
            h1DoArtigoCookies.classList.remove("sticky");
            btnVoltar.classList.remove("with-h1-sticky");
        }
    });

    // SALVAR COMO PDF
    document.querySelector("button.salvar-como-pdf").addEventListener("click", () => menu.salvarComoPdf());

    // PARTILHAR
    let conteudo = {
        title: "Totalizador de Resumo Mensal de PRN I",
        text: "O Totalizador de Resumo Mensal de PRN I é um serviço online gratuito que auxilia na elaboração do resumo mensal de PRN I, através do cálculo automático dos totais a partir dos dados inseridos pelo usuário (Profissional de Saúde).",
        url: "https://www.quinamine.github.io/totalizador-de-resumo-mensal-de-prn-i/index.html"
    }

    const btnPartilhar = document.querySelector("button.partilhar");
    btnPartilhar.addEventListener("click", () => {
        try {
            navigator.share(conteudo)
            .then(() => {
                console.log("Endereço do totalizador partilhado com sucesso.");
            })
            .catch((erro) => {
                console.log(`Não foi possível partilhar devido ao erro: ${erro}.`);
            })
        } catch (erro) {
            console.log("O seu navegador não tem suporte ao método 'navigator.share()'.");
        }
    });
}

// FECHAR CAIXA DE ALERTA PELO ENTER
window.addEventListener("keyup", event => {
    let key = event.key;
    
    if(key.toLowerCase() === "enter") {
        const caixasDeAlerta = document.querySelectorAll("div.caixa-de-alerta");
        caixasDeAlerta.forEach ( caixa =>  {
            if(caixa.matches(".on")) {
                caixa.classList.remove("on");
                srcInput.removeAttribute("readonly"); // Para alerta de 'IR PARA LINHA...'
				srcInput.select(); 
                desfoqueDoFundo.off();
            }
        });
    }
});

window.addEventListener("load", () => {
    init();
    eventListeners();
});


