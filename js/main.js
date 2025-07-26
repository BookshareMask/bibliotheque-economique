document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const bookListContainer = document.getElementById('bookList') || document.getElementById('featured-books');
    const noResultsMessage = document.getElementById('noResults');

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    let overlay = document.querySelector('.overlay');

    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
    }

    if (hamburgerMenu && mainNav && overlay) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        overlay.addEventListener('click', () => {
            if (hamburgerMenu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });

        // Fermer le menu si un lien de navigation est cliqué
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Cette condition assure que le menu se ferme quand un lien est cliqué
                // peu importe la taille de l'écran, tant que le menu est ouvert.
                if (hamburgerMenu.classList.contains('active')) {
                    hamburgerMenu.classList.remove('active');
                    mainNav.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            });
        });
    }

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

    // Gestion de la classe 'active' pour la navigation
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (currentPath === '' && linkHref === 'index.html') {
             link.classList.add('active');
        } else if (linkHref === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    document.body.classList.remove('no-scroll');
});
