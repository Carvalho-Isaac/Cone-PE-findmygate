
async function convertWebPToPNG(logoURL) {
    return new Promise((resolve, reject) => {
        if (!logoURL) {
            resolve(null); // Retorna null se nenhuma URL for fornecida
            return;
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = logoURL;

        img.onload = () => {
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;
            const ctx = tempCanvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const pngURL = tempCanvas.toDataURL("image/png");
            resolve(pngURL);
        };

        img.onerror = () => {
            resolve(null); // Retorna null em caso de erro
        };
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const logoURL = urlParams.get("logo"); // Obter o parâmetro "logo"

    const pageName = window.location.pathname.split("/").pop().split(".")[0]; // Nome da página
    const svgFilePath = `./assets/QRCodes/QR-${pageName}.svg`; // Caminho do SVG correspondente

    let svgText = ""; // Variável global para guardar o SVG

    try {
        const svgResponse = await fetch(svgFilePath);
        if (!svgResponse.ok) throw new Error(`Erro ao carregar SVG. Status: ${svgResponse.status}`);
        svgText = await svgResponse.text();

        const img = new Image();
        const svgDataUrl = "data:image/svg+xml;base64," + btoa(svgText);
        img.src = svgDataUrl;

        const canvas = document.getElementById("canvasQR");
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        img.onload = async () => {
            const rects = new DOMParser()
                .parseFromString(svgText, "image/svg+xml")
                .querySelectorAll("rect");

            const moduleCount = Math.trunc(Math.sqrt(rects.length) + 11); // Número de módulos no QR Code ; O número de modulos é 37 então o + 11 foi uma gambiarra
            const canvasSize = Math.floor(img.width); // Tamanho do Canvas baseado no SVG
            const moduleSize = canvasSize / moduleCount; // Tamanho de cada módulo

            canvas.width = canvas.height = canvasSize;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            if (logoURL && logoURL.trim() !== "") {
                const overlayImageURL = await convertWebPToPNG(logoURL);
                if (overlayImageURL) {
                    const overlayImage = new Image();
                    overlayImage.src = overlayImageURL;

                    overlayImage.onload = () => {
                        const logoSizeInModules = Math.floor(moduleCount * 0.25); // 25% do tamanho]
                        const logoSize = logoSizeInModules * moduleSize;

                        const adjustedLogoSize = logoSize % 2 === 0 ? logoSize : logoSize + moduleSize;

                        const x = Math.round((canvas.width - adjustedLogoSize) / 2);
                        const y = Math.round((canvas.height - adjustedLogoSize) / 2);

                        // Adicionando fundo branco atrás da imagem
                        ctx.fillStyle = "white";
                        // ctx.fillRect(x, y, adjustedLogoSize, adjustedLogoSize);
                        ctx.fillRect(x, y, 72, 72);

                        // ctx.drawImage(overlayImage, x, y, adjustedLogoSize, adjustedLogoSize);
                        ctx.drawImage(overlayImage, x, y, 72, 72);

                        // Atualizar o SVG
                        const parser = new DOMParser();
                        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                        const svgRoot = svgDoc.documentElement;

                        const imageElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
                        imageElement.setAttribute("x", x);
                        imageElement.setAttribute("y", y);
                        imageElement.setAttribute("width", adjustedLogoSize);
                        imageElement.setAttribute("height", adjustedLogoSize);
                        imageElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", overlayImageURL);

                        svgRoot.appendChild(imageElement);
                        svgText = new XMLSerializer().serializeToString(svgDoc);
                    };
                }
            }
        };
    } catch (error) {
        console.error("Erro ao carregar o SVG:", error);
    }

    function downloadCanvasAsSVG() {
        const canvas = document.getElementById('canvasQR');
        const canvasData = canvas.toDataURL('image/png');
    
        // Criação do SVG como string
        const svgString = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">
                <image href="${canvasData}" width="${canvas.width}" height="${canvas.height}" />
            </svg>
        `;
    
        // Criação do Blob e download
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'QRCode.svg';
        link.click();
    }

    const downloadJPEG = () => {
        const canvas = document.getElementById("canvasQR");
        if (!canvas) return;

        const jpegURL = canvas.toDataURL("image/jpeg");
        const downloadLink = document.createElement("a");
        downloadLink.href = jpegURL;
        downloadLink.download = "QRCode.jpeg";
        downloadLink.click();
    };

    document.getElementById('btn-download-svg').addEventListener("click", downloadCanvasAsSVG);
    document.getElementById("btn-download-jpeg").addEventListener("click", downloadJPEG);
});
