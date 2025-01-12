const video = document.querySelector('video');
video.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 's') || (e.ctrlKey && e.key === 'u')) {
      e.preventDefault();
    }
  });

const botao = document.getElementById("qr-generate");
const containerQR = document.getElementById("overlay-qr");

botao.addEventListener("click", () => {
  if (containerQR.style.display === "none" || containerQR.style.display === ""){
    containerQR.style.display = "block";
  } else{
    containerQR.style.display = "none";
  };
})

document.addEventListener('DOMContentLoaded', () => {
  const meuVideo = document.querySelector('.videos'); // Seleciona o vídeo
  const overlayQR = document.querySelector('#overlay-qr'); // Seleciona o overlay

  function ajustarLarguraOverlay() {
    // Captura a largura renderizada do vídeo
    const larguraRenderizada = meuVideo.getBoundingClientRect().width;
    
    // Define a largura no overlay
    overlayQR.style.width = `${larguraRenderizada}px`;
  }

  // Ajusta após o carregamento completo da página
  window.addEventListener('load', ajustarLarguraOverlay);

  // Atualiza a largura em caso de redimensionamento
  window.addEventListener('resize', ajustarLarguraOverlay);
});;

document.getElementById("qr-generate").addEventListener("click", function () {
  this.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  const overlayQR = document.getElementById("overlay-qr");
  const botao = document.getElementById("qr-generate");

  // Verifica se o clique foi fora do overlay e do botão
  if (
    !overlayQR.contains(event.target) && // Clique fora do overlay
    !botao.contains(event.target) // Clique fora do botão
  ) {
    overlayQR.style.display = "none"; // Esconde o overlay
    botao.classList.remove("active"); // Remove o estado ativo do botão
  }
});
