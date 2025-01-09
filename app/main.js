const content = document.querySelector(".tab-empresas ul");
const inputSearch = document.getElementById("txtBusca");

let empresas = [];
let itens = [];

// Função para carregar os dados do JSON
async function carregarDados() {
    try {
        const resposta = await fetch('./app/empresas.json');
        empresas = await resposta.json();
        itens = empresas;
        renderItems(itens); // Renderiza os itens e executa logSpans internamente
        logEmpresasSemMapa(); // Lista empresas sem mapa após carregar os dados
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
        const bloco = item.bloco.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const plataforma = item.plataforma.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
        const portaria = item.portaria
            ? item.portaria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
            : ""; // Verifica se `portaria` existe e, se não, usa string vazia.
        const blocoPlataforma = `${bloco}-${plataforma}`;

        return (
            regex.test(nomeEmpresa) || // Pesquisa no nome da empresa
            regex.test(bloco) || // Pesquisa no bloco
            regex.test(plataforma) || // Pesquisa na plataforma
            regex.test(portaria) || // Pesquisa na portaria
            regex.test(blocoPlataforma) // Pesquisa no bloco e plataforma combinados
        );
    });

    renderItems(itensFiltrados);
};

// Função para adicionar um item ao DOM
// function addHTML(item) {
//     const li = document.createElement('li');
//     li.className = 'empresas';

//     const a = document.createElement('a');

//     // URLs baseadas no bloco e plataforma
//     const urls = {
//         "MM1-G2": "MM1-G2.html?direct=false",
//         "MM1-G3": "MM1-G3.html?direct=false",
//         "MM1-G4": "MM1-G4.html?direct=false",
//         "MM1-G5": "MM1-G5.html?direct=false",
//         "MM1-G6": "MM1-G6.html?direct=false",
//         "MM1-G7": "MM1-G7.html?direct=false",
//         "MM1-G8": "MM1-G8.html?direct=false",
//         "MM1-G9": "MM1-G9.html?direct=false",
//         "MM2-G1": "MM2-G1.html?direct=false",
//         "MM2-G3": "MM2-G3.html?direct=false"
//     };

//     const blocoPlataforma = `${item.bloco}-${item.plataforma}`;
//     a.href = urls[blocoPlataforma] || "index.html?mapa=false"; // Caso padrão

//     a.className = 'content';

//     const img = document.createElement('img');
//     img.src = item.imagem;
//     img.alt = item.empresa;

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
        "MM1-G2": "MM1-G2.html",
        "MM1-G3": "MM1-G3.html",
        "MM1-G4": "MM1-G4.html",
        "MM1-G5": "MM1-G5.html",
        "MM1-G6": "MM1-G6.html",
        "MM1-G7": "MM1-G7.html",
        "MM1-G8": "MM1-G8.html",
        "MM1-G9": "MM1-G9.html",
        "MM2-G1": "MM2-G1.html",
        "MM2-G3": "MM2-G3.html"
    };

    const blocoPlataforma = `${item.bloco}-${item.plataforma}`;
    const baseUrl = urls[blocoPlataforma] || "index.html";

    // Adiciona os parâmetros `direct=false` e `imagem`
    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.append('direct', 'false');
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
        "MM1-CF1", "MM1-CF2", "PP2-G2", "PP2-G3", "PP4-G3", "PP2-G3-G4",
        "PP2-G4", "PP2-G5-G6", "MM1-G10", "MM1-G11", "MM2-PA"
    ];

    const empresasSemMapa = itens.filter(item =>
        blocosSemMapa.includes(`${item.bloco}-${item.plataforma}`) // Verifica bloco + plataforma
    );

    const detalhesEmpresas = empresasSemMapa.map(item => `${item.bloco}-${item.plataforma}: ${item.empresa}`);
    console.log('Lista de empresas sem mapa:', detalhesEmpresas);
}

// Carrega os dados ao inicializar
carregarDados();
