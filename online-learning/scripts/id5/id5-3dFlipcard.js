// Random Flip Cards
document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });