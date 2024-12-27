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