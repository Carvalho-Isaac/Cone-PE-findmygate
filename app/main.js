const content = document.querySelector(".tab-empresas ul");
const inputSearch = document.getElementById("txtBusca");

let empresas = [];
let itens = [];

const blocosPagina1 = ["MM1", "MM2", "ADM"];
const blocosPagina2 = ["PP2", "PP4"];

// Obtém o nome do arquivo HTML atual
let paginaAtual = window.location.pathname.split("/").pop(); 

// Se a URL termina com "/", assume "index.html"
if (paginaAtual === "" || paginaAtual === "/") {
    paginaAtual = "index.html";
}

// Define os blocos permitidos com base no nome do arquivo
let blocosPermitidos = [];

if (paginaAtual === "plt1.html") {
    blocosPermitidos = blocosPagina1;
} else if (paginaAtual === "plt2.html") {
    blocosPermitidos = blocosPagina2;
}

// Função para carregar os dados do JSON
async function carregarDados() {
    try {
        const resposta = await fetch('./app/empresas.json');
        empresas = await resposta.json();

        // Filtra os itens com base nos blocos permitidos
        itens = empresas.filter(item => blocosPermitidos.includes(item.bloco));

        renderItems(itens);
    } catch (erro) {
        console.error("Erro ao carregar o JSON:", erro);
    }
}

inputSearch.oninput = () => {
    let filtro = inputSearch.value.toLowerCase();

    // Remove espaços, pontos e acentos
    filtro = filtro.replace(/\s+/g, '-').replace(/\./g, '');
    filtro = filtro.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const regex = new RegExp(filtro.replace(/-/g, '[- ]'), 'i'); // Permite hífen ou espaço

    const itensFiltrados = itens.filter(item => {
        const nomeEmpresa = item.empresa.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const pesquisa = item.pesquisa
            ? item.pesquisa.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            : ""; // Verifica se `pesquisa` existe e, se não, usa string vazia.
        const bloco = item.bloco.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const plataforma = item.plataforma.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const portaria = item.portaria
            ? item.portaria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            : ""; // Verifica se `portaria` existe e, se não, usa string vazia.
        const blocoPlataforma = `${bloco}-${plataforma}`;

        return (
            regex.test(nomeEmpresa) || // Pesquisa no nome da empresa
            regex.test(pesquisa) || // Pesquisa na pesquisa
            regex.test(bloco) || // Pesquisa no bloco
            regex.test(plataforma) || // Pesquisa na plataforma
            regex.test(portaria) || // Pesquisa na portaria
            regex.test(blocoPlataforma) // Pesquisa no bloco e plataforma combinados
        );
    });

    // Aqui você pode atualizar a interface com os itens filtrados
    renderItems(itensFiltrados);
};

// Função para adicionar um item ao DOM

// function addHTML(item) {
//     const li = document.createElement('li');
//     li.className = 'empresas';

//     const a = document.createElement('a');

//     // URLs baseadas no bloco e plataforma
//     const urls = {
//         "ADM-CNDM": "ADM-CNDM.html",
//         "ADM-CONE": "ADM-CONE.html",
//         "ADM-RSTR": "ADM-RSTR.html",
//         "MM1-G2": "MM1-G2.html",
//         "MM1-G3": "MM1-G3.html",
//         "MM1-G4": "MM1-G4.html",
//         "MM1-G5": "MM1-G5.html",
//         "MM1-G6": "MM1-G6.html",
//         "MM1-G7": "MM1-G7.html",
//         "MM1-G8": "MM1-G8.html",
//         "MM1-G9": "MM1-G9.html",
//         "MM1-G11": "MM1-G11.html",
//         "MM2-G1": "MM2-G1.html",
//         "MM2-G3": "MM2-G3.html",
//         "PP2-G2": "PP2-G2.html",
//         "PP2-G3": "PP2-G3.html",
//         "PP2-G4": "PP2-G4.html",
//         "PP2-G5": "PP2-G5.html",
//         "PP2-G5/G6": "PP2-G5-G6.html",
//         "PP2-G6": "PP2-G6.html"
//     };

//     const blocoPlataforma = `${item.bloco}-${item.plataforma}`;
//     const baseUrl = urls[blocoPlataforma] || "index.html?mapa=false";

//     // Adiciona os parâmetros `direct=false` e `imagem`
//     const url = new URL(baseUrl, window.location.origin);
//     url.searchParams.append('direct', 'false');
//     if (item.imagem) {
//         url.searchParams.append('logo', item.logo);
//     }

//     a.href = url.toString();
//     a.className = 'content';

//     const img = document.createElement('img');
//     img.src = item.imagem;
//     img.alt = item.empresa;

//     // Fallback para quando a imagem não carrega
//     img.onerror = () => {
//         const span = document.createElement('span');
//         span.textContent = item.empresa;
//         span.className = 'fallback-span';
//         a.innerHTML = ""; // Limpa o conteúdo atual
//         a.appendChild(span); // Adiciona o span
//     };

//     a.appendChild(img);
//     li.appendChild(a);
//     content.appendChild(li);
// }

function addHTML(item) {
    const li = document.createElement('li');
    li.className = 'empresas';

    const a = document.createElement('a');

    // URLs baseadas no bloco e plataforma
    const urls = {
        "ADM-CNDM": "ADM-CNDM.html",
        "ADM-CONE": "ADM-CONE.html",
        "ADM-RSTR": "ADM-RSTR.html",
        "MM1-G2": "MM1-G2.html",
        "MM1-G3": "MM1-G3.html",
        "MM1-G4": "MM1-G4.html",
        "MM1-G5": "MM1-G5.html",
        "MM1-G6": "MM1-G6.html",
        "MM1-G7": "MM1-G7.html",
        "MM1-G8": "MM1-G8.html",
        "MM1-G9": "MM1-G9.html",
        "MM1-G11": "MM1-G11.html",
        "MM2-PA": "MM2-PA.html",
        "MM2-G1": "MM2-G1.html",
        "MM2-G3": "MM2-G3.html",
        "PP2-TRR": "PP2-TRR.html",
        "PP2-RSTR": "PP2-RSTR.html",
        "PP2-G2": "PP2-G2.html",
        "PP2-G3": "PP2-G3.html",
        "PP2-G3-G4": "PP2-G3-G4.html",
        "PP2-G4": "PP2-G4.html",
        "PP2-G5": "PP2-G5.html",
        "PP2-G5/G6": "PP2-G5-G6.html",
        "PP2-G6": "PP2-G6.html"
    };

    const blocoPlataforma = `${item.bloco}-${item.plataforma}`;

    // Obtém a página de origem salva no localStorage
    let paginaOrigem = localStorage.getItem('paginaOrigem');

    // Se a página de origem não foi salva corretamente, define um padrão com base no bloco
    if (!paginaOrigem) {
        paginaOrigem = ["PP2", "PP4"].includes(item.bloco) ? "plt2.html" : "plt1.html";
    }

    // Define a URL base: se houver um destino específico, usa ele, senão volta para a origem
    let baseUrl = urls[blocoPlataforma] || paginaOrigem; 

    // Adiciona parâmetros na URL
    const url = new URL(window.location.origin + "/" + baseUrl);
    url.searchParams.append('direct', 'false');
    url.searchParams.append('mapa', 'false');

    if (item.imagem) {
        url.searchParams.append('logo', item.logo);
    }

    a.href = url.toString();
    a.className = 'content';

    const img = document.createElement('img');
    img.src = item.imagem;
    img.alt = item.empresa;

    // Fallback para quando a imagem não carrega
    img.onerror = () => {
        const span = document.createElement('span');
        span.textContent = item.empresa;
        span.className = 'fallback-span';
        a.innerHTML = ""; // Limpa o conteúdo atual
        a.appendChild(span); // Adiciona o span
    };

    a.appendChild(img);
    li.appendChild(a);
    content.appendChild(li);
}

// Função para renderizar os itens
function renderItems(items) {
    content.innerHTML = ""; // Limpa a lista antes de renderizar
    items.forEach(addHTML); // Adiciona cada item

    setTimeout(() => {
        logSpans(); // Garante a contagem de spans após renderização
    }, 100); // Timeout para esperar o DOM atualizar
}

// ---------------- CONTAGEM DE EMPRESAS QUE FALTAM A LOGO ----------------
function logSpans() {
    const spans = document.querySelectorAll('.fallback-span'); // Seleciona spans gerados
    const spanContents = Array.from(spans).map(span => span.textContent);
    console.log('Lista de empresas sem logo:', spanContents);
}

// ---------------- LISTA DE EMPRESAS SEM MAPA ----------------
function logEmpresasSemMapa() {
    const blocosSemMapa = [
        "MM1-CF1", "MM1-G7-G11" ,"MM1-CF2", "MM1-G10"
    ];

    const empresasSemMapa = itens.filter(item =>
        blocosSemMapa.includes(`${item.bloco}-${item.plataforma}`) // Verifica bloco + plataforma
    );

    const detalhesEmpresas = empresasSemMapa.map(item => `${item.bloco}-${item.plataforma}: ${item.empresa}`);
    console.log('Lista de empresas sem mapa:', detalhesEmpresas);
}

// Carrega os dados ao inicializar
carregarDados();
