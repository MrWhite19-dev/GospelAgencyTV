const initNavbar = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const body = document.body;
  const searchButtons = document.querySelectorAll('.search-toggle');
  const searchLayer = document.createElement('div');
  const pageCatalog = [
    { title: 'Accueil', url: 'index.html', keywords: 'gospel agency tv évangile présentation direct émissions' },
    { title: 'À propos', url: 'about.html', keywords: 'vision mission valeurs équipe histoire' },
    { title: 'TV Live', url: 'live.html', keywords: 'live direct télévision regarder streaming chat' },
    { title: 'Émissions', url: 'programmes.html', keywords: 'programmes émissions témoignages enseignements louange' },
    { title: 'Actualités', url: 'actualites.html', keywords: 'actualités nouveautés événements annonces' },
    { title: 'Galerie', url: 'galerie.html', keywords: 'galerie images photos événements' },
    { title: 'Partenaires', url: 'partenaires.html', keywords: 'partenaires soutien vision collaboration' },
    { title: 'Faire un Don', url: 'don.html', keywords: 'don donation soutenir contribution' },
    { title: 'Contact', url: 'contact.html', keywords: 'contact message adresse téléphone formulaire' }
  ];

  searchLayer.className = 'search-overlay';
  searchLayer.innerHTML = `
    <div class="search-box" role="dialog" aria-modal="true" aria-labelledby="search-title">
      <button class="search-close" aria-label="Fermer la recherche">×</button>
      <h2 id="search-title">Rechercher Gospel Agency TV</h2>
      <form class="site-search-form" role="search">
        <label class="sr-only" for="site-search-input">Votre recherche</label>
        <input id="site-search-input" type="search" placeholder="Tapez un mot clé..." autocomplete="off" required>
        <button class="btn btn-primary" type="submit">Rechercher</button>
      </form>
      <div class="search-results" aria-live="polite"></div>
    </div>
  `;
  document.body.appendChild(searchLayer);

  const searchInput = searchLayer.querySelector('#site-search-input');
  const searchForm = searchLayer.querySelector('.site-search-form');
  const searchResults = searchLayer.querySelector('.search-results');

  const renderResults = (query) => {
    const normalizedQuery = query.trim().toLocaleLowerCase('fr');
    const results = pageCatalog.filter((page) =>
      `${page.title} ${page.keywords}`.toLocaleLowerCase('fr').includes(normalizedQuery)
    );

    searchResults.innerHTML = results.length
      ? `<p>${results.length} résultat${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}.</p><ul>${results.map((page) => `<li><a href="${page.url}">${page.title}</a><span>${page.keywords.split(' ').slice(0, 5).join(' ')}</span></li>`).join('')}</ul>`
      : '<p>Aucun résultat. Essayez un autre mot clé.</p>';
  };

  const closeSearch = () => {
    searchLayer.classList.remove('active');
  };

  searchButtons.forEach((button) => {
    button.addEventListener('click', () => {
      searchLayer.classList.add('active');
      body.classList.remove('menu-open');
      window.requestAnimationFrame(() => searchInput.focus());
    });
  });

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    renderResults(searchInput.value);
  });

  searchLayer.addEventListener('click', (event) => {
    if (event.target === searchLayer) {
      closeSearch();
    }
  });

  const searchClose = searchLayer.querySelector('.search-close');
  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = body.classList.toggle('menu-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });
  }

  document.querySelectorAll('.mobile-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      body.classList.remove('menu-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      body.classList.remove('menu-open');
      closeSearch();
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNavbar, { once: true });
} else {
  initNavbar();
}