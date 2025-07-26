document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const bookListContainer = document.getElementById('bookList'); // Cible le main pour la recherche sur les pages de secteur

    if (!searchInput || !bookListContainer) {
        // Ne fait rien si l'un des éléments n'est pas présent (par exemple sur la page d'accueil sans liste de livres à filtrer)
        return;
    }

    searchInput.addEventListener('keyup', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const bookCards = bookListContainer.querySelectorAll('.book-card');

        bookCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
