/**
 * Bibliothèque Économique - Main JavaScript
 * Gère la navigation, la recherche et les interactions
 */

class LibraryApp {
    constructor() {
        // Éléments DOM
        this.domElements = {
            hamburger: document.querySelector('.hamburger'),
            nav: document.querySelector('.main-nav'),
            overlay: document.querySelector('.overlay'),
            searchInput: document.getElementById('searchInput'),
            searchButton: document.getElementById('searchButton'),
            booksContainer: document.getElementById('booksContainer'),
            noResults: document.getElementById('noResults'),
            currentYear: document.getElementById('current-year'),
            footerYear: document.getElementById('footer-year')
        };

        // Données des livres (pourrait être chargé via API)
        this.booksData = [
            {
                id: 1,
                title: "Principes d'économie",
                author: "Gregory Mankiw",
                year: 2019,
                category: "Général",
                cover: "images/mankiw.jpg",
                pdf: "pdfs/mankiw.pdf",
                featured: true
            },
            {
                id: 2,
                title: "Économie du développement",
                author: "Philippe Hugon",
                year: 2015,
                category: "Développement",
                cover: "images/hugon.jpg",
                pdf: "pdfs/hugon.pdf",
                featured: true
            }
            // Ajouter d'autres livres ici...
        ];

        // Initialisation
        this.init();
    }

    init() {
        // Initialisation des écouteurs d'événements
        this.setupEventListeners();

        // Charger les livres en vedette
        this.loadFeaturedBooks();

        // Mettre à jour l'année du copyright
        this.updateCopyrightYear();

        // Améliorer l'accessibilité
        this.enhanceAccessibility();
    }

    setupEventListeners() {
        // Menu mobile
        this.domElements.hamburger.addEventListener('click', () => this.toggleMobileMenu());

        // Overlay pour fermer le menu
        this.domElements.overlay.addEventListener('click', () => this.closeMobileMenu());

        // Recherche
        if (this.domElements.searchInput) {
            this.domElements.searchInput.addEventListener('input', () => this.handleSearch());
            this.domElements.searchButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSearch();
            });
        }

        // Fermer le menu lors du clic sur un lien
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });
    }

    toggleMobileMenu() {
        this.domElements.hamburger.classList.toggle('is-active');
        this.domElements.nav.classList.toggle('active');
        this.domElements.overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');

        // Gestion de l'accessibilité
        const isExpanded = this.domElements.nav.classList.contains('active');
        this.domElements.hamburger.setAttribute('aria-expanded', isExpanded);
    }

    closeMobileMenu() {
        this.domElements.hamburger.classList.remove('is-active');
        this.domElements.nav.classList.remove('active');
        this.domElements.overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
        this.domElements.hamburger.setAttribute('aria-expanded', 'false');
    }

    handleSearch() {
        const searchTerm = this.domElements.searchInput.value.toLowerCase().trim();
        const bookCards = document.querySelectorAll('.book-card');
        let hasResults = false;

        bookCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const author = card.getAttribute('data-author').toLowerCase();
            const category = card.getAttribute('data-category').toLowerCase();

            if (title.includes(searchTerm) || author.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
                hasResults = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Afficher/masquer le message "Aucun résultat"
        if (this.domElements.noResults) {
            this.domElements.noResults.style.display = hasResults || searchTerm.length === 0 ? 'none' : 'block';
        }
    }

    loadFeaturedBooks() {
        if (!this.domElements.booksContainer) return;

        // Filtrer les livres en vedette
        const featuredBooks = this.booksData.filter(book => book.featured);

        // Générer le HTML des livres
        let booksHTML = '';
        featuredBooks.forEach(book => {
            booksHTML += this.generateBookCardHTML(book);
        });

        // Injecter dans le DOM
        this.domElements.booksContainer.innerHTML = booksHTML;

        // Activer le lazy loading pour les images
        this.setupLazyLoading();
    }

    generateBookCardHTML(book) {
        return `
            <div class="book-card" data-title="${book.title}" data-author="${book.author}" data-category="${book.category}">
                <img src="${book.cover}" alt="Couverture de ${book.title}" class="book-cover" loading="lazy">
                <div class="book-details">
                    <h3 class="book-title">${book.title}</h3>
                    <p class="book-meta book-author">${book.author}</p>
                    <p class="book-meta book-year">${book.year}</p>
                    <div class="book-actions">
                        <a href="${book.pdf}" class="button primary-button" download>
                            <i class="fas fa-download"></i> Télécharger
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    updateCopyrightYear() {
        const year = new Date().getFullYear();
        if (this.domElements.currentYear) {
            this.domElements.currentYear.textContent = year;
        }
        if (this.domElements.footerYear) {
            this.domElements.footerYear.textContent = year;
        }
    }

    enhanceAccessibility() {
        // Ajouter aria-current à la page active
        const currentPage = window.location.pathname.split('/').pop();
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPage = link.getAttribute('href');
            if (currentPage === linkPage) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });

        // Gérer le focus pour l'accessibilité
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('user-is-tabbing');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('user-is-tabbing');
        });
    }
}

// Initialiser l'application lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const app = new LibraryApp();
});

// Service Worker pour le mode hors ligne (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('ServiceWorker registration successful');
        }).catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
