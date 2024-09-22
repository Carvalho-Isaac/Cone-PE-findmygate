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
        "bloco": "G4",
        "imagem": "assets/dellys.avif"
    },
    {
        "empresa": "Seara",
        "bloco": "G1",
        "imagem": "assets/seara.png"
    },
    {
        "empresa": "Red Bull",
        "bloco": "G3",
        "imagem": "assets/red-bull.png"
    },
    {
        "empresa": "Bosch",
        "bloco": "G4",
        "imagem": "assets/bosch.png"
    },
    {
        "empresa": "Petlove",
        "bloco": "G3",
        "imagem": "assets/petlove.webp"
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
