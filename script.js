// Menu data
const menuData = {
  starters: [
    { name: 'Huisgemaakte soep van de dag', desc: 'Vers bereid met groenten van het seizoen. Geserveerd met knapperig brood.', price: '€ 7,50', tag: '🌱 Vegetarisch' },
    { name: 'Carpaccio van rundvlees', desc: 'Dun gesneden ossenhaas met rucola, Parmezaan en truffelolie.', price: '€ 13,50', tag: '' },
    { name: 'Gebakken geitenkaas', desc: 'Op een bedje van gemengde sla met honing-mosterd dressing en walnoten.', price: '€ 11,00', tag: '🌱 Vegetarisch' },
    { name: 'Garnalencocktail', desc: 'Verse Noord-Zeegarnalen met huisgemaakte cocktailsaus en limoen.', price: '€ 12,50', tag: '' },
  ],
  mains: [
    { name: 'Entrecôte van de grill', desc: '250g Black Angus entrecôte met seizoensgroenten en handgesneden friet.', price: '€ 27,50', tag: '' },
    { name: 'Zalm met citroenbottersaus', desc: 'Gegrilde Atlantische zalm met risotto, asperges en citroenboter.', price: '€ 22,00', tag: '🐟 Vis' },
    { name: 'Pasta porcini', desc: 'Huisgemaakte pappardelle met wilde paddenstoelen, room en truffelolie.', price: '€ 17,50', tag: '🌱 Vegetarisch' },
    { name: 'Eendenborst', desc: 'Knapperig gebakken eendenborst met rode koolpuree en sinaasappelsaus.', price: '€ 24,50', tag: '' },
  ],
  desserts: [
    { name: 'Crème brûlée', desc: 'Klassieke vanillecrème met gekarameliseerde suikerkorst en vers fruit.', price: '€ 8,50', tag: '🌱 Vegetarisch' },
    { name: 'Chocolade fondant', desc: 'Warm chocolade fondant met vloeibare kern en vanille-ijs.', price: '€ 9,00', tag: '🌱 Vegetarisch' },
    { name: 'Seizoensfruit sorbet', desc: 'Twee bollen huisgemaakt sorbet van seizoensvruchten met muntsiroop.', price: '€ 7,00', tag: '🌱 Vegan' },
    { name: 'Kaasplank', desc: 'Selectie van vier Nederlandse en Franse kazen met vijgenjam en crackers.', price: '€ 13,50', tag: '' },
  ],
  drinks: [
    { name: 'Huiswijn glas', desc: 'Rood, wit of rosé — dagelijks wisselend geselecteerd door onze sommelier.', price: '€ 5,50', tag: '' },
    { name: 'Fles wijn', desc: 'Uitgebreide selectie Europese wijnen — vraag naar onze wijnkaart.', price: 'v.a. € 24', tag: '' },
    { name: 'Ambachtelijk bier', desc: 'Lokale craft bieren op tap en op fles — vraag naar de dagelijks selectie.', price: '€ 4,50', tag: '' },
    { name: 'Mocktail van de week', desc: 'Alcoholvrije huisgemaakte cocktail met verse ingrediënten.', price: '€ 6,00', tag: '🍃 Alcoholvrij' },
  ]
};

// Render menu
function renderMenu(category) {
  const grid = document.getElementById('menuGrid');
  const items = menuData[category];

  grid.innerHTML = items.map(item => `
    <div class="menu-item">
      <div class="menu-item__info">
        <div class="menu-item__name">${item.name}</div>
        <div class="menu-item__desc">${item.desc}</div>
        ${item.tag ? `<span class="menu-item__tag">${item.tag}</span>` : ''}
      </div>
      <div class="menu-item__price">${item.price}</div>
    </div>
  `).join('');

  // Animate items in
  grid.querySelectorAll('.menu-item').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 60);
  });
}

// Tab switching
document.getElementById('menuTabs').addEventListener('click', (e) => {
  if (e.target.classList.contains('menu__tab')) {
    document.querySelectorAll('.menu__tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    renderMenu(e.target.dataset.category);
  }
});

// Initial render
renderMenu('starters');

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 20);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Set minimum date for reservation to today
const datumInput = document.getElementById('datum');
if (datumInput) {
  const today = new Date().toISOString().split('T')[0];
  datumInput.min = today;
}

// Form submission
const form = document.getElementById('reserveringForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Even geduld...';
  btn.disabled = true;

  setTimeout(() => {
    const naam = document.getElementById('naam').value;
    const datum = document.getElementById('datum').value;
    const tijd = document.getElementById('tijd').value;
    const personen = document.getElementById('personen').value;

    form.innerHTML = `
      <div class="form-success">
        <div style="font-size: 56px; margin-bottom: 16px;">🎉</div>
        <h3>Reservering bevestigd!</h3>
        <p>Bedankt ${naam}! Uw tafel voor ${personen} is gereserveerd op ${datum} om ${tijd}.</p>
        <p style="margin-top: 8px; font-size: 13px;">U ontvangt een bevestiging per e-mail. Tot dan!</p>
      </div>
    `;
  }, 1200);
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.kenmerk, .sfeer__item, .reserveren__contact-item, .over__cijfer').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
