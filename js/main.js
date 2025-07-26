document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    // bookList est le conteneur principal des cartes de livres sur les pages de secteur et d'accueil
    const bookListContainer = document.getElementById('bookList') || document.getElementById('featured-books');
    const noResultsMessage = document.getElementById('noResults');

    if (searchInput && bookListContainer) {
        // Cache toutes les cartes de livres au démarrage si elles sont cachées par JS
        // Ou, on peut juste les laisser visibles et ne cacher que si une recherche est lancée
        
        searchInput.addEventListener('keyup', (event) => {
            const searchTerm = event.target.value.toLowerCase().trim();
            // Cible toutes les cartes de livres dans le conteneur pertinent (bookList ou featured-books)
            const bookCards = bookListContainer.querySelectorAll('.book-card');
            let resultsFound = false;

            bookCards.forEach(card => {
                // Récupère les données des attributs data-*
                const title = card.getAttribute('data-title').toLowerCase();
                const author = card.getAttribute('data-author') ? card.getAttribute('data-author').toLowerCase() : '';
                const category = card.getAttribute('data-category') ? card.getAttribute('data-category').toLowerCase() : '';

                // La recherche est effectuée sur le titre, l'auteur et la catégorie
                if (title.includes(searchTerm) || author.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'flex'; // Affiche la carte (flex car la carte est un flexbox)
                    resultsFound = true;
                } else {
                    card.style.display = 'none'; // Cache la carte
                }
            });

            // Affiche ou masque le message "Aucun résultat"
            if (noResultsMessage) { // S'assure que l'élément existe sur la page
                if (resultsFound || searchTerm === '') {
                    noResultsMessage.style.display = 'none';
                } else {
                    noResultsMessage.style.display = 'flex'; // Affiche le message
                }
            }
        });
    }

    // Gestion de la classe 'active' pour la navigation (optionnel, mais sympa)
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentPath = window.location.pathname.split('/').pop(); // ex: "microeconomie.html"

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
        } else if (currentPath === '' && linkHref === 'index.html') { // Cas spécial pour index.html si l'URL est la racine
             link.classList.add('active');
        }
    });
});
