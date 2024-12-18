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

inputSearch.oninput = () => {
    let filtro = inputSearch.value.toLowerCase();
    
    filtro = filtro.replace(/\s+/g, '-');
    filtro = filtro.replace(/\./g, '');
    filtro = filtro.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const itensFiltrados = itens.filter(item =>
        item.empresa.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(filtro) ||  // Pesquisa no nome da empresa
        item.bloco.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(filtro) ||   // Pesquisa no bloco
        item.portaria.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(filtro)
    );
    
    renderItems(itensFiltrados);
};

// Função para adicionar um item ao DOM
function addHTML(item) {
    const li = document.createElement('li');
    li.className = 'empresas';

    const a = document.createElement('a');
    a.href =
    item.bloco === "MM1-CF1" ? "index.html?mapa=false" :
    item.bloco === "MM1-CF2" ? "index.html?mapa=false" :
    item.bloco === "MM2-G1" ? "plataforma-MM2-G1.html?direct=false" :
    item.bloco === "MM1-G2" ? "plataforma-MM1-G2.html?direct=false" :
    item.bloco === "PP2-G2" ? "index.html?mapa=false" :
    item.bloco === "MM1-G3" ? "plataforma-MM1-G3.html?direct=false" :
    item.bloco === "PP2-G3" ? "index.html?mapa=false" :
    item.bloco === "PP4-G3" ? "index.html?mapa=false" :
    item.bloco === "MM2-G3" ? "plataforma-MM2-G3.html?direct=false" :
    item.bloco === "PP2-G3-G4" ? "index.html?mapa=false" :
    item.bloco === "MM1-G4" ? "plataforma-MM1-G4.html?direct=false" :
    item.bloco === "PP2-G4" ? "index.html?mapa=false" :
    item.bloco === "MM1-G5" ? "plataforma-MM1-G5.html?direct=false" :
    item.bloco === "PP2-G5-G6" ? "index.html?mapa=false" :
    item.bloco === "MM1-G6" ? "plataforma-MM1-G6.html?direct=false" :
    item.bloco === "MM1-G7" ? "plataforma-MM1-G7.html?direct=false" :
    item.bloco === "MM1-G8" ? "plataforma-MM1-G8.html?direct=false" :
    item.bloco === "MM1-G9" ? "plataforma-MM1-G9.html?direct=false" :
    item.bloco === "MM1-G10" ? "index.html?mapa=false" :
    item.bloco === "MM1-G11" ? "index.html?mapa=false" :
    item.bloco === "MM2-PA" ? "index.html?mapa=false" :
                                "index.html?mapa=false"; // Caso padrão para incluir o parâmetro
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
    const spanContents = Array.from(spans).map(span => span.textContent);
    console.log('Lista de empresas sem logo:', spanContents);
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



function logEmpresasSemMapa() {
    // Lista de blocos associados a "index.html?mapa=false"
    const blocosSemMapa = [
        "MM1-CF1", "MM1-CF2", "PP2-G2", "PP2-G3", "PP4-G3", "PP2-G3-G4", 
        "PP2-G4", "PP2-G5-G6", "MM1-G10", "MM1-G11", "MM2-PA"
    ];

    // Filtra as empresas sem mapa
    const empresasSemMapa = itens.filter(item => blocosSemMapa.includes(item.bloco));
    
    // Cria uma lista com os nomes e blocos das empresas
    const detalhesEmpresas = empresasSemMapa.map(item => `${item.bloco} : ${item.empresa}`);

    // Exibe a contagem e a lista no console
    console.log('Lista de empresas sem mapa:', detalhesEmpresas);
}

// Chama a função após carregar os dados
carregarDados().then(() => logEmpresasSemMapa());
