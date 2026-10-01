// ======================================================
// FORMULÁRIO
// ======================================================

const form = document.querySelector("#formCadastro");


// ======================================================
// CAMPOS
// ======================================================

const nomeInput = document.querySelector("#nome");
const cpfInput = document.querySelector("#cpf");
const nascimentoInput = document.querySelector("#nascimento");
const sexoInput = document.querySelector("#sexo");

const emailInput = document.querySelector("#email");
const celularInput = document.querySelector("#celular");

const cepInput = document.querySelector("#cep");
const estadoInput = document.querySelector("#estado");
const cidadeInput = document.querySelector("#cidade");
const cidadesList = document.querySelector("#cidades");

const logradouroInput = document.querySelector("#logradouro");
const numeroInput = document.querySelector("#numero");
const complementoInput = document.querySelector("#complemento");
const bairroInput = document.querySelector("#bairro");

const aceiteInput = document.querySelector("#aceite");


// ======================================================
// ESTADOS BRASILEIROS
// ======================================================

const estados = [
    { sigla: "AC", nome: "Acre" },
    { sigla: "AL", nome: "Alagoas" },
    { sigla: "AP", nome: "Amapá" },
    { sigla: "AM", nome: "Amazonas" },
    { sigla: "BA", nome: "Bahia" },
    { sigla: "CE", nome: "Ceará" },
    { sigla: "DF", nome: "Distrito Federal" },
    { sigla: "ES", nome: "Espírito Santo" },
    { sigla: "GO", nome: "Goiás" },
    { sigla: "MA", nome: "Maranhão" },
    { sigla: "MT", nome: "Mato Grosso" },
    { sigla: "MS", nome: "Mato Grosso do Sul" },
    { sigla: "MG", nome: "Minas Gerais" },
    { sigla: "PA", nome: "Pará" },
    { sigla: "PB", nome: "Paraíba" },
    { sigla: "PR", nome: "Paraná" },
    { sigla: "PE", nome: "Pernambuco" },
    { sigla: "PI", nome: "Piauí" },
    { sigla: "RJ", nome: "Rio de Janeiro" },
    { sigla: "RN", nome: "Rio Grande do Norte" },
    { sigla: "RS", nome: "Rio Grande do Sul" },
    { sigla: "RO", nome: "Rondônia" },
    { sigla: "RR", nome: "Roraima" },
    { sigla: "SC", nome: "Santa Catarina" },
    { sigla: "SP", nome: "São Paulo" },
    { sigla: "SE", nome: "Sergipe" },
    { sigla: "TO", nome: "Tocantins" }
];


// ======================================================
// CARREGAR ESTADOS NO SELECT
// ======================================================

function carregarEstados() {

    estados.forEach(function (estado) {

        const option = document.createElement("option");

        option.value = estado.sigla;

        option.textContent =
            `${estado.sigla} - ${estado.nome}`;

        estadoInput.appendChild(option);
    });
}

carregarEstados();


// ======================================================
// MOSTRAR ERRO
// ======================================================

function mostrarErro(input, mensagem) {

    input.style.borderColor = "#e74c3c";

    let erro = input.nextElementSibling;

    if (
        !erro ||
        !erro.classList.contains("erro")
    ) {

        erro = document.createElement("small");

        erro.classList.add("erro");

        erro.style.color = "#e74c3c";
        erro.style.display = "block";
        erro.style.marginTop = "4px";

        input.parentNode.insertBefore(
            erro,
            input.nextSibling
        );
    }

    erro.textContent = mensagem;
}


// ======================================================
// MOSTRAR SUCESSO
// ======================================================

function mostrarSucesso(input) {

    input.style.borderColor = "#2ecc71";

    const erro = input.nextElementSibling;

    if (
        erro &&
        erro.classList.contains("erro")
    ) {

        erro.remove();
    }
}


// ======================================================
// LIMPAR VALIDAÇÃO
// ======================================================

function limparValidacao(input) {

    input.style.borderColor = "";

    const erro = input.nextElementSibling;

    if (
        erro &&
        erro.classList.contains("erro")
    ) {

        erro.remove();
    }
}


// ======================================================
// NOME
// ======================================================

nomeInput.addEventListener("input", function () {

    const nome = this.value.trim();

    if (nome === "") {

        limparValidacao(this);

        return;
    }

    if (!nome.includes(" ")) {

        mostrarErro(
            this,
            "Digite seu nome completo."
        );

        return;
    }

    mostrarSucesso(this);
});


// ======================================================
// CPF
// ======================================================

cpfInput.addEventListener("input", function () {

    let cpf =
        this.value.replace(/\D/g, "");

    cpf =
        cpf.substring(0, 11);


    // Formatação do CPF

    if (cpf.length > 9) {

        this.value = cpf.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            "$1.$2.$3-$4"
        );

    } else if (cpf.length > 6) {

        this.value = cpf.replace(
            /(\d{3})(\d{3})(\d+)/,
            "$1.$2.$3"
        );

    } else if (cpf.length > 3) {

        this.value = cpf.replace(
            /(\d{3})(\d+)/,
            "$1.$2"
        );

    } else {

        this.value = cpf;
    }


    // Campo vazio

    if (cpf.length === 0) {

        limparValidacao(this);

        return;
    }


    // CPF incompleto

    if (cpf.length < 11) {

        mostrarErro(
            this,
            "CPF incompleto."
        );

        return;
    }


    // CPF inválido

    if (!validarCPF(cpf)) {

        mostrarErro(
            this,
            "CPF inválido."
        );

        return;
    }


    // CPF válido

    mostrarSucesso(this);
});


// ======================================================
// DATA DE NASCIMENTO
// ======================================================

nascimentoInput.addEventListener(
    "change",
    function () {

        if (this.value === "") {

            limparValidacao(this);

            return;
        }


        if (!validarData(this.value)) {

            mostrarErro(
                this,
                "Data de nascimento inválida."
            );

            return;
        }


        mostrarSucesso(this);
    }
);


// ======================================================
// E-MAIL
// ======================================================

emailInput.addEventListener(
    "input",
    function () {

        const email =
            this.value.trim();


        if (email === "") {

            limparValidacao(this);

            return;
        }


        if (!validarEmail(email)) {

            mostrarErro(
                this,
                "Digite um e-mail válido."
            );

            return;
        }


        mostrarSucesso(this);
    }
);


// ======================================================
// CELULAR
// ======================================================

celularInput.addEventListener(
    "input",
    function () {

        let celular =
            this.value.replace(/\D/g, "");

        celular =
            celular.substring(0, 11);


        // Formatação

        if (celular.length > 6) {

            this.value =
                celular.replace(
                    /(\d{2})(\d{5})(\d{1,4})/,
                    "($1) $2-$3"
                );

        } else if (celular.length > 2) {

            this.value =
                celular.replace(
                    /(\d{2})(\d+)/,
                    "($1) $2"
                );

        } else {

            this.value = celular;
        }


        if (celular.length === 0) {

            limparValidacao(this);

            return;
        }


        if (celular.length < 11) {

            mostrarErro(
                this,
                "Celular incompleto."
            );

            return;
        }


        if (!validarCelular(celular)) {

            mostrarErro(
                this,
                "Celular inválido."
            );

            return;
        }


        mostrarSucesso(this);
    }
);


// ======================================================
// CEP
// ======================================================

cepInput.addEventListener(
    "input",
    function () {

        let cep =
            this.value.replace(/\D/g, "");

        cep =
            cep.substring(0, 8);


        // Formatação do CEP

        if (cep.length > 5) {

            this.value =
                cep.replace(
                    /(\d{5})(\d{1,3})/,
                    "$1-$2"
                );

        } else {

            this.value = cep;
        }


        if (cep.length === 0) {

            limparValidacao(this);

            return;
        }


        if (cep.length < 8) {

            mostrarErro(
                this,
                "CEP incompleto."
            );

            return;
        }


        mostrarSucesso(this);
    }
);


// ======================================================
// CONSULTAR CEP QUANDO SAIR DO CAMPO
// ======================================================

cepInput.addEventListener(
    "blur",
    function () {

        const cep =
            this.value.replace(/\D/g, "");


        if (cep.length === 0) {

            limparEndereco();

            return;
        }


        if (cep.length !== 8) {

            mostrarErro(
                this,
                "Digite um CEP válido com 8 dígitos."
            );

            return;
        }


        buscarCEP(cep);
    }
);


// ======================================================
// NÚMERO
// ======================================================

numeroInput.addEventListener(
    "input",
    function () {

        this.value =
            this.value.replace(/\D/g, "");


        if (this.value === "") {

            limparValidacao(this);

            return;
        }


        mostrarSucesso(this);
    }
);


// ======================================================
// ESTADO
// ======================================================

estadoInput.addEventListener(
    "change",
    async function () {

        const uf =
            this.value;


        cidadeInput.value = "";

        cidadesList.innerHTML = "";


        limparValidacao(cidadeInput);


        if (uf === "") {

            limparValidacao(this);

            return;
        }


        mostrarSucesso(this);


        await carregarCidades(uf);
    }
);


// ======================================================
// CIDADE
// ======================================================

cidadeInput.addEventListener(
    "input",
    function () {

        const cidade =
            this.value.trim();


        if (cidade === "") {

            limparValidacao(this);

            return;
        }


        mostrarSucesso(this);
    }
);


// ======================================================
// LOGRADOURO
// ======================================================

logradouroInput.addEventListener(
    "input",
    function () {

        if (this.value.trim() === "") {

            limparValidacao(this);

            return;
        }


        mostrarSucesso(this);
    }
);


// ======================================================
// BAIRRO
// ======================================================

bairroInput.addEventListener(
    "input",
    function () {

        if (this.value.trim() === "") {

            limparValidacao(this);

            return;
        }


        mostrarSucesso(this);
    }
);


// ======================================================
// ACEITE
// ======================================================

aceiteInput.addEventListener(
    "change",
    function () {

        if (this.checked) {

            mostrarSucesso(this);

        } else {

            limparValidacao(this);
        }
    }
);


// ======================================================
// BUSCAR CEP - VIA CEP
// ======================================================

async function buscarCEP(cep) {

    try {

        // Limpa mensagens anteriores

        limparValidacao(cepInput);


        // Mostra temporariamente que está buscando

        logradouroInput.value = "";
        bairroInput.value = "";
        cidadeInput.value = "";


        const resposta =
            await fetch(
                `https://viacep.com.br/ws/${cep}/json/`
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro na consulta do CEP."
            );
        }


        const dados =
            await resposta.json();


        // CEP não encontrado

        if (dados.erro) {

            mostrarErro(
                cepInput,
                "CEP não encontrado."
            );

            limparEndereco();

            return;
        }


        // ==================================================
        // PREENCHER ENDEREÇO
        // ==================================================

        logradouroInput.value =
            dados.logradouro || "";


        bairroInput.value =
            dados.bairro || "";


        cidadeInput.value =
            dados.localidade || "";


        // ==================================================
        // SELECIONAR ESTADO
        // ==================================================

        if (dados.uf) {

            estadoInput.value =
                dados.uf;


            // Carrega as cidades daquele estado

            await carregarCidades(
                dados.uf
            );
        }


        // ==================================================
        // MARCAR CAMPOS COMO VÁLIDOS
        // ==================================================

        mostrarSucesso(cepInput);

        mostrarSucesso(logradouroInput);

        mostrarSucesso(bairroInput);

        mostrarSucesso(cidadeInput);

        mostrarSucesso(estadoInput);


    } catch (erro) {

        console.error(
            "Erro ao consultar CEP:",
            erro
        );


        limparEndereco();


        mostrarErro(
            cepInput,
            "Não foi possível consultar o CEP."
        );
    }
}


// ======================================================
// LIMPAR ENDEREÇO
// ======================================================

function limparEndereco() {

    logradouroInput.value = "";

    bairroInput.value = "";

    cidadeInput.value = "";

    estadoInput.value = "";

    cidadesList.innerHTML = "";


    limparValidacao(
        logradouroInput
    );

    limparValidacao(
        bairroInput
    );

    limparValidacao(
        cidadeInput
    );

    limparValidacao(
        estadoInput
    );
}


// ======================================================
// CARREGAR CIDADES - IBGE
// ======================================================

async function carregarCidades(uf) {

    try {

        cidadesList.innerHTML = "";


        if (!uf) {
            return;
        }


        const resposta =
            await fetch(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
            );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao carregar cidades."
            );
        }


        const cidades =
            await resposta.json();


        cidades.forEach(
            function (cidade) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    cidade.nome;


                cidadesList.appendChild(
                    option
                );
            }
        );


    } catch (erro) {

        console.error(
            "Erro ao carregar cidades:",
            erro
        );


        cidadesList.innerHTML = "";


        alert(
            "Não foi possível carregar as cidades."
        );
    }
}


// ======================================================
// ENVIO DO FORMULÁRIO
// ======================================================

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ==============================================
        // PEGAR VALORES
        // ==============================================

        const nome =
            nomeInput.value.trim();


        const cpf =
            cpfInput.value.replace(
                /\D/g,
                ""
            );


        const nascimento =
            nascimentoInput.value;


        const sexo =
            sexoInput.value;


        const email =
            emailInput.value.trim();


        const celular =
            celularInput.value.replace(
                /\D/g,
                ""
            );


        const cep =
            cepInput.value.replace(
                /\D/g,
                ""
            );


        const estado =
            estadoInput.value;


        const cidade =
            cidadeInput.value.trim();


        const logradouro =
            logradouroInput.value.trim();


        const numero =
            numeroInput.value.trim();


        const bairro =
            bairroInput.value.trim();


        const aceite =
            aceiteInput.checked;


        // ==============================================
        // VALIDAR NOME
        // ==============================================

        if (
            nome === "" ||
            !nome.includes(" ")
        ) {

            alert(
                "Digite seu nome completo."
            );

            nomeInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR CPF
        // ==============================================

        if (!validarCPF(cpf)) {

            alert(
                "Digite um CPF válido."
            );

            cpfInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR DATA
        // ==============================================

        if (!validarData(nascimento)) {

            alert(
                "Digite uma data de nascimento válida."
            );

            nascimentoInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR SEXO
        // ==============================================

        if (sexo === "") {

            alert(
                "Selecione o sexo."
            );

            sexoInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR E-MAIL
        // ==============================================

        if (!validarEmail(email)) {

            alert(
                "Digite um e-mail válido."
            );

            emailInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR CELULAR
        // ==============================================

        if (!validarCelular(celular)) {

            alert(
                "Digite um celular válido com DDD."
            );

            celularInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR CEP
        // ==============================================

        if (cep.length !== 8) {

            alert(
                "Digite um CEP válido."
            );

            cepInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR ESTADO
        // ==============================================

        if (estado === "") {

            alert(
                "Selecione o estado."
            );

            estadoInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR CIDADE
        // ==============================================

        if (cidade === "") {

            alert(
                "Digite a cidade."
            );

            cidadeInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR LOGRADOURO
        // ==============================================

        if (logradouro === "") {

            alert(
                "Digite o logradouro."
            );

            logradouroInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR NÚMERO
        // ==============================================

        if (numero === "") {

            alert(
                "Digite o número."
            );

            numeroInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR BAIRRO
        // ==============================================

        if (bairro === "") {

            alert(
                "Digite o bairro."
            );

            bairroInput.focus();

            return;
        }


        // ==============================================
        // VALIDAR ACEITE
        // ==============================================

        if (!aceite) {

            alert(
                "Você precisa aceitar a declaração."
            );

            aceiteInput.focus();

            return;
        }


        // ==============================================
        // SUCESSO
        // ==============================================

        alert(
            "Cadastro realizado com sucesso!"
        );
    }
);


// ======================================================
// VALIDAR CPF
// ======================================================

function validarCPF(cpf) {

    // CPF precisa ter 11 números

    if (cpf.length !== 11) {
        return false;
    }


    // Impede CPFs como:
    // 00000000000
    // 11111111111
    // 22222222222 etc.

    if (
        /^(\d)\1{10}$/.test(cpf)
    ) {

        return false;
    }


    // ==============================================
    // PRIMEIRO DÍGITO
    // ==============================================

    let soma = 0;


    for (
        let i = 0;
        i < 9;
        i++
    ) {

        soma +=
            Number(cpf[i]) *
            (10 - i);
    }


    let resto =
        (soma * 10) % 11;


    if (resto === 10) {
        resto = 0;
    }


    if (
        resto !==
        Number(cpf[9])
    ) {

        return false;
    }


    // ==============================================
    // SEGUNDO DÍGITO
    // ==============================================

    soma = 0;


    for (
        let i = 0;
        i < 10;
        i++
    ) {

        soma +=
            Number(cpf[i]) *
            (11 - i);
    }


    resto =
        (soma * 10) % 11;


    if (resto === 10) {
        resto = 0;
    }


    return (
        resto ===
        Number(cpf[10])
    );
}


// ======================================================
// VALIDAR DATA
// ======================================================

function validarData(data) {

    if (!data) {
        return false;
    }


    const dataNascimento =
        new Date(
            data + "T00:00:00"
        );


    const hoje =
        new Date();


    hoje.setHours(
        0,
        0,
        0,
        0
    );


    return (
        dataNascimento <= hoje
    );
}


// ======================================================
// VALIDAR E-MAIL
// ======================================================

function validarEmail(email) {

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return regex.test(email);
}


// ======================================================
// VALIDAR CELULAR
// ======================================================

function validarCelular(celular) {

    // Precisa ter 11 números

    if (celular.length !== 11) {
        return false;
    }


    // DDD

    const ddd =
        Number(
            celular.substring(0, 2)
        );


    if (
        ddd < 11 ||
        ddd > 99
    ) {

        return false;
    }


    // Celular brasileiro começa com 9

    if (celular[2] !== "9") {

        return false;
    }


    return true;
}


// ======================================================
// BOTÃO LIMPAR
// ======================================================

form.addEventListener(
    "reset",
    function () {

        // O reset precisa acontecer
        // depois que o navegador limpar os campos

        setTimeout(
            function () {

                const campos =
                    form.querySelectorAll(
                        "input, select"
                    );


                campos.forEach(
                    function (campo) {

                        campo.style.borderColor =
                            "";

                        const erro =
                            campo.nextElementSibling;


                        if (
                            erro &&
                            erro.classList.contains(
                                "erro"
                            )
                        ) {

                            erro.remove();
                        }
                    }
                );


                cidadesList.innerHTML = "";

            },
            0
        );
    }
);
