// Luma Skin: small interactions and GA4 demo event tracking.
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Product exploration clicks: sent as a custom GA4 event named select_item.
  document.querySelectorAll('.product-action').forEach((button) => {
    button.addEventListener('click', () => {
      const itemName = button.dataset.item || 'Unknown product';
      if (typeof gtag === 'function') {
        gtag('event', 'select_item', {
          item_list_name: 'Luma Skin product collection',
          items: [{ item_name: itemName }]
        });
      }
      alert(`You selected ${itemName}. This is a sample product page interaction.`);
    });
  });

  // Category filters on the products page.
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.shop-grid .product-card');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');
      productCards.forEach((card) => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
      });
    });
  });

  // Demonstration form only: validates locally; it does NOT send/store information.
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = document.getElementById('formMessage');
      if (!form.checkValidity()) {
        form.reportValidity();
        message.textContent = 'Please complete all fields with a valid email address.';
        return;
      }
      if (typeof gtag === 'function') {
        gtag('event', 'demo_form_submit', { form_name: 'contact_demo_form' });
      }
      message.textContent = 'Thank you! Your demo form was validated. No information was sent or saved.';
      form.reset();
    });
  }
});
