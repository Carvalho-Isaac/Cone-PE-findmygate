const empresas = [
    {
        "empresa": "Mercado Livre",
        "bloco": "G1",
        "imagem": "assets/mercado-livre.png"
    },
    {
        "empresa": "Friboi",
        "bloco": "G3",
        "imagem": "assets/friboi.png"
    },
    {
        "empresa": "Dellys",
        "bloco": "G3",
        "imagem": "assets/dellys.avif"
    },
    {
        "empresa": "Seara",
        "bloco": "G3",
        "imagem": "assets/seara.png"
    },
    {
        "empresa": "Red Bull",
        "bloco": "G1",
        "imagem": "assets/red-bull.png"
    },
    {
        "empresa": "Bosch",
        "bloco": "G1",
        "imagem": "assets/bosch.png"
    },
    {
        "empresa": "Petlove",
        "bloco": "G1",
        "imagem": "assets/petlove.webp"
    },
    {
        "empresa": "Magneti Marelli",
        "bloco": "G3",
        "imagem": "assets/magneti-marelli.png"
    },
    {
        "empresa": "Wartsila",
        "bloco": "G1",
        "imagem": "assets/wartsila.webp"
    },
    {
        "empresa": "Autometal",
        "bloco": "G3",
        "imagem": "assets/autometal.png"
    },
    {
        "empresa": "Dominalog",
        "bloco": "G1",
        "imagem": "assets/dominalog.png"
    },
    {
        "empresa": "AGV",
        "bloco": "G1",
        "imagem": "assets/agv.png"
    },
    {
        "empresa": "Mobly",
        "bloco": "G1",
        "imagem": "assets/mobly.png"
    },
    {
        "empresa": "Fobras",
        "bloco": "G1",
        "imagem": "assets/fobras.png"
    }
];

const content = document.querySelector(".tab-empresas ul");
const inputSearch = document.getElementById("txtBusca");

let itens = empresas;

inputSearch.oninput = () => {
    content.innerHTML = "";

    itens
        .filter(item => 
            item.empresa.toLowerCase().includes(inputSearch.value.toLowerCase())
        )
        .forEach(item => addHTML(item));
};

function addHTML(item) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.bloco === "G1" ? "bloco_g1.html" : item.bloco === "G3" ? "bloco_g3.html" : "bloco_g4.html";
    a.className = 'content';
    
    const img = document.createElement('img');
    img.src = item.imagem;
    img.alt = item.empresa;

    a.appendChild(img);
    li.className = 'empresas';
    li.appendChild(a);
    content.appendChild(li);
}

// Exibir todas as empresas inicialmente
itens.forEach(addHTML);
