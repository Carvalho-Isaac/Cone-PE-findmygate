const video = document.querySelector('video');
video.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 's') || (e.ctrlKey && e.key === 'u')) {
      e.preventDefault();
    }
  });
