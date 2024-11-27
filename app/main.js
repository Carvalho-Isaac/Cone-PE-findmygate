// const empresas = [
//     {
//         "empresa": "Mercado Livre",
//         "bloco": "G1",
//         "imagem": "assets/mercado-livre.png"
//     },
//     {
//         "empresa": "Friboi",
//         "bloco": "G4",
//         "imagem": "assets/friboi.png"
//     },
//     {
//         "empresa": "Dellys",
//         "bloco": "G4",
//         "imagem": "assets/dellys.avif"
//     },
//     {
//         "empresa": "Seara",
//         "bloco": "G4",
//         "imagem": "assets/seara.png"
//     },
//     {
//         "empresa": "Red Bull",
//         "bloco": "G6",
//         "imagem": "assets/red-bull.png"
//     },
//     {
//         "empresa": "Bosch",
//         "bloco": "G6",
//         "imagem": "assets/bosch.png"
//     },
//     {
//         "empresa": "Petlove",
//         "bloco": "G5",
//         "imagem": "assets/petlove.webp"
//     },
//     {
//         "empresa": "Magneti Marelli",
//         "bloco": "G3",
//         "imagem": "assets/magneti-marelli.png"
//     },
//     {
//         "empresa": "Wartsila",
//         "bloco": "G5",
//         "imagem": "assets/wartsila.webp"
//     },
//     {
//         "empresa": "Autometal",
//         "bloco": "G3",
//         "imagem": "assets/autometal.png"
//     },
//     {
//         "empresa": "Dominalog",
//         "bloco": "G4",
//         "imagem": "assets/dominalog.png"
//     },
//     {
//         "empresa": "AGV",
//         "bloco": "G7",
//         "imagem": "assets/agv.png"
//     },
//     {
//         "empresa": "Mobly",
//         "bloco": "G7",
//         "imagem": "assets/mobly.png"
//     },
//     {
//         "empresa": "Fobras",
//         "bloco": "G6",
//         "imagem": "assets/fobras.png"
//     }
// ];

const content = document.querySelector(".tab-empresas ul");
const inputSearch = document.getElementById("txtBusca");

let empresas = []; // Inicializa como array vazio
let itens = []; // Inicializa como array vazio

// Função para carregar os dados do JSON
async function carregarDados() {
    try {
        const resposta = await fetch('./app/empresas.json');
        empresas = await resposta.json();
        itens = empresas; // Atualiza `itens` com os dados carregados
        renderItems(itens); // Renderiza os itens ao carregar os dados
    } catch (erro) {
        console.error("Erro ao carregar o JSON:", erro);
    }
}

// Filtragem dos resultados ao digitar
inputSearch.oninput = () => {
    const filtro = inputSearch.value.toLowerCase();
    const itensFiltrados = itens.filter(item =>
        item.empresa.toLowerCase().includes(filtro)
    );
    renderItems(itensFiltrados);
};

// Função para adicionar um item ao DOM
function addHTML(item) {
    const li = document.createElement('li');
    li.className = 'empresas';

    const a = document.createElement('a');
    a.href =
        item.bloco === "MM1-CF1" ? "plataforma_G1.html":
        item.bloco === "MM1-CF2" ? "plataforma_G1.html":
        item.bloco === "MM2-G1" ? "plataforma_G1.html":
        item.bloco === "MM1-G2" ? "plataforma_G1.html":
        item.bloco === "PP2-G2" ? "plataforma_G1.html":
        item.bloco === "MM1-G3" ? "plataforma_G1.html":
        item.bloco === "PP2-G3" ? "plataforma_G1.html":
        item.bloco === "PP4-G3" ? "plataforma_G1.html":
        item.bloco === "MM2-G3" ? "plataforma_G1.html":
        item.bloco === "PP2-G3-G4" ? "plataforma_G1.html":
        item.bloco === "MM1-G4" ? "plataforma_G1.html":
        item.bloco === "PP2-G4" ? "plataforma_G1.html":
        item.bloco === "MM1-G5" ? "plataforma_G1.html":
        item.bloco === "PP2-G5-G6" ? "plataforma_G1.html":
        item.bloco === "MM1-G6" ? "plataforma-MM1-G6.html":
        item.bloco === "MM1-G7" ? "plataforma_G1.html":
        item.bloco === "MM1-G8" ? "plataforma_G1.html":
        item.bloco === "MM1-G9" ? "plataforma_G1.html":
        item.bloco === "MM1-G10" ? "plataforma_G1.html":
        item.bloco === "MM1-G11" ? "plataforma_G1.html":
        // item.bloco === "MM1-G6" ? "plataforma_G1.html":
        item.bloco === "MM2-PA" ? "plataforma_G1.html":
                            "plataforma_G7.html";
    a.className = 'content';

    const img = document.createElement('img');
    img.src = item.imagem;
    img.alt = item.empresa;

    img.onerror = () => {
        const span = document.createElement('span');
        span.textContent = item.empresa;
        span.className = 'fallback-span'; // Classe para estilização, se necessário
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
}

// Carrega os dados ao inicializar
carregarDados();

// ----------------  CONTAGEM DE EMPRESAS QUE FALTAM A LOGO ----------------

// Função para contar e listar os spans
function logSpans() {
    const spans = document.querySelectorAll('span');
    console.log(`Quantidade de spans: ${spans.length}`);
    const spanContents = Array.from(spans).map(span => span.textContent);
    console.log('Conteúdo dos spans:', spanContents);
}

// Configura um MutationObserver para monitorar mudanças no DOM
const observer = new MutationObserver((mutationsList, observer) => {
    // Executa apenas na primeira alteração e depois para o observer
    logSpans();
    observer.disconnect(); // Para o observer após a primeira execução
});

// Inicia o observer observando o corpo da página
observer.observe(document.body, { childList: true, subtree: true });

// Executa a função inicial após uma pequena espera para garantir que o DOM já tenha sido manipulado
setTimeout(() => {
    logSpans();
    observer.disconnect(); // Para o observer caso o timeout ocorra antes de qualquer alteração
}, 1000);
