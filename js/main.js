document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const bookListContainer = document.getElementById('bookList') || document.getElementById('featured-books');
    const noResultsMessage = document.getElementById('noResults');

    // Nouveaux éléments pour le menu hamburger
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    let overlay = document.querySelector('.overlay'); // Récupère l'overlay s'il existe déjà

    // Créer l'overlay si non existant (utile pour le premier chargement)
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
    }

    // Gestion de l'ouverture/fermeture du menu hamburger
    if (hamburgerMenu && mainNav && overlay) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active'); // Active/désactive l'overlay
            document.body.classList.toggle('no-scroll'); // Empêche le défilement du body
        });

        // Fermer le menu si l'on clique sur l'overlay
        overlay.addEventListener('click', () => {
            if (hamburgerMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });

        // Fermer le menu si un lien de navigation est cliqué (pour les pages de secteur)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Ne ferme le menu que si on est sur mobile (le menu est actif)
                if (hamburgerMenu.classList.contains('active')) {
                    hamburgerMenu.classList.remove('active');
                    mainNav.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // Fonctionnalité de recherche (inchangée)
    if (searchInput && bookListContainer) {
        searchInput.addEventListener('keyup', (event) => {
            const searchTerm = event.target.value.toLowerCase().trim();
            const bookCards = bookListContainer.querySelectorAll('.book-card');
            let resultsFound = false;

            bookCards.forEach(card => {
                const title = card.getAttribute('data-title').toLowerCase();
                const author = card.getAttribute('data-author') ? card.getAttribute('data-author').toLowerCase() : '';
                const category = card.getAttribute('data-category') ? card.getAttribute('data-category').toLowerCase() : '';

                if (title.includes(searchTerm) || author.includes(searchTerm) || category.includes(searchTerm)) {
                    card.style.display = 'flex';
                    resultsFound = true;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noResultsMessage) {
                if (resultsFound || searchTerm === '') {
                    noResultsMessage.style.display = 'none';
                } else {
                    noResultsMessage.style.display = 'flex';
                }
            }
        });
    }

    // Gestion de la classe 'active' pour la navigation (inchangée, mais assurez-vous que les classes dans le HTML sont 'main-nav ul li a')
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPath) {
            link.classList.add('active');
        } else if (currentPath === '' && linkHref === 'index.html') {
             link.classList.add('active');
        }
    });

    // Empêcher le défilement du body quand le menu est ouvert (CSS pour cela est .no-scroll)
    document.body.classList.remove('no-scroll'); // S'assurer que le défilement est réactivé au chargement
});

// CSS pour la classe no-scroll (à ajouter à style.css)
/*
body.no-scroll {
    overflow: hidden;
}
*/
