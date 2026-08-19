/* =========================================================
   FLOR DE AÇÚCAR — script.js
========================================================= */
(function () {
  "use strict";

  const WHATSAPP_NUMBER = "5511999999999"; // TODO: troque pelo número real (DDI+DDD+número, só dígitos)

  /* ---------------------------------------------------------
     DADOS DOS PRODUTOS
     (troque livremente: nome, categoria, preço, descrição)
  --------------------------------------------------------- */
  const PRODUCTS = [
    { id: "p1", name: "Red Velvet Clássico", cat: "aniversario", price: 129.9, desc: "Massa aveludada com cream cheese e toque de baunilha.", tag: "Best seller" },
    { id: "p2", name: "Ninho com Nutella", cat: "aniversario", price: 139.9, desc: "Leite ninho cremoso recheado com nutella artesanal." },
    { id: "p3", name: "Naked Cake Frutas Vermelhas", cat: "casamento", price: 219.9, desc: "Camadas rústicas, chantininho e frutas frescas da estação.", tag: "Favorito" },
    { id: "p4", name: "Bolo Nu Dourado", cat: "casamento", price: 259.9, desc: "Acabamento delicado com folhas douradas comestíveis." },
    { id: "p5", name: "Cupcake Baunilha & Morango", cat: "cupcakes", price: 9.9, desc: "Caixa com 6 unidades, cobertura artesanal." },
    { id: "p6", name: "Cupcake Chocolate Belga", cat: "cupcakes", price: 10.9, desc: "Massa amanteigada com ganache de chocolate belga." },
    { id: "p7", name: "Bolo Ursinho Carinhoso", cat: "temáticos", price: 179.9, desc: "Tema infantil modelado à mão, sabor a escolher.", tag: "Novidade" },
    { id: "p8", name: "Bolo Jardim Encantado", cat: "temáticos", price: 199.9, desc: "Flores em pasta americana e folhagens comestíveis." },
    { id: "p9", name: "Vegano de Cenoura", cat: "veganos", price: 119.9, desc: "Sem ingredientes de origem animal, cobertura de chocolate 70%." },
    { id: "p10", name: "Vegano Limão Siciliano", cat: "veganos", price: 124.9, desc: "Leve e cítrico, com calda artesanal de limão." },
    { id: "p11", name: "Chocolate Trufado", cat: "aniversario", price: 149.9, desc: "Três camadas de chocolate meio amargo e trufa cremosa." },
    { id: "p12", name: "Bolo Realeza Rosa & Ouro", cat: "casamento", price: 289.9, desc: "Design elegante com detalhes em dourado comestível.", tag: "Premium" },
  ];

  const TESTIMONIALS = [
    { name: "Marina Alves", text: "O bolo de casamento superou qualquer expectativa. Lindo, delicado e saborosíssimo — todos os convidados pediram o contato!" },
    { name: "Rafael Souza", text: "Pedi o Red Velvet pro aniversário da minha filha e foi surpreendente. Massa fofinha e recheio na medida certa." },
    { name: "Juliana Prado", text: "Atendimento impecável pelo WhatsApp, entrega no horário combinado e o sabor é simplesmente inesquecível." },
    { name: "Bianca Ferreira", text: "O bolo temático ficou exatamente como eu imaginei. Muito cuidado nos detalhes e ingredientes de altíssima qualidade." },
  ];

  /* ---------------------------------------------------------
     ÍCONE SVG genérico usado nos cards (referencia sprite #ico-cake)
  --------------------------------------------------------- */
  function cakeSvg() {
    return `<svg viewBox="0 0 64 64"><use href="#ico-cake"/></svg>`;
  }

  function formatPrice(v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  /* ---------------------------------------------------------
     CARRINHO — estado + persistência local
  --------------------------------------------------------- */
  const CART_KEY = "flordeacucar_cart";
  let cart = loadCart();

  function loadCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  function addToCart(id, originEl) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    renderCart();
    bumpCartIcon();
    showToast("Adicionado ao carrinho 🌸");
    if (originEl) burstSprinkles(originEl);
  }
  function changeQty(id, delta) {
    if (!cart[id]) return;
    cart[id] += delta;
    if (cart[id] <= 0) delete cart[id];
    saveCart();
    renderCart();
  }
  function removeFromCart(id) {
    delete cart[id];
    saveCart();
    renderCart();
  }

  function cartCount() {
    return Object.values(cart).reduce((a, b) => a + b, 0);
  }
  function cartTotal() {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id);
      return p ? sum + p.price * qty : sum;
    }, 0);
  }

  function bumpCartIcon() {
    const el = document.getElementById("cartCount");
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  }

  function renderCart() {
    const itemsEl = document.getElementById("cartItems");
    const emptyMsg = document.getElementById("cartEmptyMsg");
    const totalEl = document.getElementById("cartTotal");
    const countEl = document.getElementById("cartCount");

    const entries = Object.entries(cart);
    countEl.textContent = cartCount();
    totalEl.textContent = formatPrice(cartTotal());

    itemsEl.querySelectorAll(".cart-item").forEach((n) => n.remove());

    if (entries.length === 0) {
      emptyMsg.style.display = "block";
      return;
    }
    emptyMsg.style.display = "none";

    entries.forEach(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) return;
      const item = document.createElement("div");
      item.className = "cart-item";
      item.innerHTML = `
        <div class="ci-media">${cakeSvg()}</div>
        <div class="ci-info">
          <h5>${p.name}</h5>
          <div class="ci-price">${formatPrice(p.price)} un.</div>
          <div class="ci-qty">
            <button data-action="dec" aria-label="Diminuir quantidade">−</button>
            <span>${qty}</span>
            <button data-action="inc" aria-label="Aumentar quantidade">+</button>
          </div>
          <button class="ci-remove" data-action="remove">Remover</button>
        </div>
      `;
      item.querySelector('[data-action="inc"]').addEventListener("click", () => changeQty(id, 1));
      item.querySelector('[data-action="dec"]').addEventListener("click", () => changeQty(id, -1));
      item.querySelector('[data-action="remove"]').addEventListener("click", () => removeFromCart(id));
      itemsEl.appendChild(item);
    });
  }

  /* ---------------------------------------------------------
     CARRINHO — abrir/fechar drawer
  --------------------------------------------------------- */
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");

  function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }
  document.getElementById("cartOpenBtn").addEventListener("click", openCart);
  document.getElementById("cartCloseBtn").addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  /* ---------------------------------------------------------
     CHECKOUT — monta pedido e envia pro WhatsApp
  --------------------------------------------------------- */
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    const entries = Object.entries(cart);
    if (entries.length === 0) {
      showToast("Seu carrinho está vazio 🌸");
      return;
    }
    let msg = "Olá, Flor de Açúcar! Quero fazer o seguinte pedido:%0A%0A";
    entries.forEach(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p) return;
      msg += `• ${qty}x ${p.name} — ${formatPrice(p.price * qty)}%0A`;
    });
    msg += `%0ATotal: ${formatPrice(cartTotal())}%0A%0AAguardo confirmação de data e pagamento, obrigado(a)!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, "_blank", "noopener");
  });

  /* ---------------------------------------------------------
     GRID DE PRODUTOS + FILTRO POR CATEGORIA
  --------------------------------------------------------- */
  const productGrid = document.getElementById("productGrid");

  function renderProductGrid() {
    productGrid.innerHTML = PRODUCTS.map((p) => `
      <div class="product-card" data-cat="${p.cat}">
        <div class="pc-media">
          ${cakeSvg()}
          <span class="pc-cat">${p.cat}</span>
        </div>
        <div class="pc-body">
          <h4>${p.name}</h4>
          <p>${p.desc}</p>
          <div class="pc-footer">
            <span class="pc-price">${formatPrice(p.price)}</span>
            <button class="add-btn" data-id="${p.id}">Adicionar</button>
          </div>
        </div>
      </div>
    `).join("");

    productGrid.querySelectorAll(".add-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        addToCart(btn.dataset.id, btn);
        btn.classList.add("added");
        const original = btn.textContent;
        btn.textContent = "Adicionado ✓";
        setTimeout(() => { btn.textContent = original; btn.classList.remove("added"); }, 1200);
      });
    });
  }

  document.querySelectorAll(".cat-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".cat-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const filter = pill.dataset.filter;
      document.querySelectorAll(".product-card").forEach((card) => {
        card.classList.toggle("hide", filter !== "todos" && card.dataset.cat !== filter);
      });
    });
  });

  /* ---------------------------------------------------------
     CARROSSEL — "Mais pedidos"
  --------------------------------------------------------- */
  const carouselTrack = document.getElementById("carouselTrack");
  const carouselDots = document.getElementById("carouselDots");
  const FEATURED = PRODUCTS.filter((p) => p.tag);

  function renderCarousel() {
    carouselTrack.innerHTML = FEATURED.map((p) => `
      <div class="carousel-card">
        <span class="cc-tag">${p.tag}</span>
        <div class="cc-media">${cakeSvg()}</div>
        <div class="cc-body">
          <h4>${p.name}</h4>
          <p>${p.desc}</p>
          <div class="cc-footer">
            <span class="cc-price">${formatPrice(p.price)}</span>
            <button class="mini-add" data-id="${p.id}" aria-label="Adicionar ao carrinho">+</button>
          </div>
        </div>
      </div>
    `).join("");

    carouselTrack.querySelectorAll(".mini-add").forEach((btn) => {
      btn.addEventListener("click", () => addToCart(btn.dataset.id, btn));
    });

    carouselDots.innerHTML = FEATURED.map((_, i) => `<span class="dot${i === 0 ? " active" : ""}"></span>`).join("");
  }

  function setupCarouselControls() {
    const cardWidth = () => (carouselTrack.querySelector(".carousel-card")?.offsetWidth || 260) + 22;
    document.getElementById("prevBtn").addEventListener("click", () => {
      carouselTrack.scrollBy({ left: -cardWidth(), behavior: "smooth" });
    });
    document.getElementById("nextBtn").addEventListener("click", () => {
      carouselTrack.scrollBy({ left: cardWidth(), behavior: "smooth" });
    });
    carouselTrack.addEventListener("scroll", () => {
      const dots = carouselDots.querySelectorAll(".dot");
      const idx = Math.round(carouselTrack.scrollLeft / cardWidth());
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     DEPOIMENTOS — slider
  --------------------------------------------------------- */
  const testimonialTrack = document.getElementById("testimonialTrack");
  const testimonialDots = document.getElementById("testimonialDots");
  let testimonialIndex = 0;
  let testimonialTimer = null;

  function renderTestimonials() {
    testimonialTrack.innerHTML = TESTIMONIALS.map((t) => `
      <div class="testimonial-card">
        <div class="testimonial-inner">
          <div class="testimonial-stars">★★★★★</div>
          <p class="quote">"${t.text}"</p>
          <div class="testimonial-author">${t.name}</div>
        </div>
      </div>
    `).join("");
    testimonialDots.innerHTML = TESTIMONIALS.map((_, i) => `<span class="dot${i === 0 ? " active" : ""}"></span>`).join("");

    testimonialDots.querySelectorAll(".dot").forEach((dot, i) => {
      dot.addEventListener("click", () => goToTestimonial(i));
    });
  }

  function goToTestimonial(i) {
    testimonialIndex = (i + TESTIMONIALS.length) % TESTIMONIALS.length;
    testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
    testimonialDots.querySelectorAll(".dot").forEach((d, idx) => d.classList.toggle("active", idx === testimonialIndex));
  }

  function startTestimonialAutoplay() {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(() => goToTestimonial(testimonialIndex + 1), 5500);
  }

  /* ---------------------------------------------------------
     TOAST
  --------------------------------------------------------- */
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }

  /* ---------------------------------------------------------
     EFEITO "CHUVA DE CONFEITOS" ao adicionar ao carrinho
  --------------------------------------------------------- */
  const sprinkleColors = ["#C46A80", "#C9A15A", "#F6C9D6", "#8A3A52", "#F2B84B"];
  function burstSprinkles(originEl) {
    const rect = originEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const container = document.getElementById("sprinkleBurst");

    for (let i = 0; i < 14; i++) {
      const piece = document.createElement("span");
      piece.className = "sprinkle-piece";
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 70;
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist - 30;
      piece.style.left = originX + "px";
      piece.style.top = originY + "px";
      piece.style.background = sprinkleColors[i % sprinkleColors.length];
      piece.style.setProperty("--fly-transform", `translate(${x}px, ${y}px) rotate(${Math.random() * 360}deg)`);
      container.appendChild(piece);
      setTimeout(() => piece.remove(), 950);
    }
  }

  /* ---------------------------------------------------------
     PÉTALAS FLUTUANTES NO HERO
  --------------------------------------------------------- */
  function renderPetals() {
    const wrap = document.querySelector(".hero-petals");
    if (!wrap) return;
    const count = window.innerWidth < 700 ? 8 : 16;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");
      petal.style.left = Math.random() * 100 + "%";
      petal.style.animationDuration = 7 + Math.random() * 9 + "s";
      petal.style.animationDelay = Math.random() * 8 + "s";
      petal.style.opacity = 0.3 + Math.random() * 0.4;
      petal.style.width = petal.style.height = 6 + Math.random() * 8 + "px";
      petal.style.background = Math.random() > 0.5 ? "var(--rose)" : "var(--gold)";
      wrap.appendChild(petal);
    }
  }

  /* ---------------------------------------------------------
     HEADER — sombra ao rolar + menu mobile
  --------------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  const hamburger = document.getElementById("hamburgerBtn");
  const mainNav = document.getElementById("mainNav");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mainNav.classList.toggle("open");
  });
  mainNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mainNav.classList.remove("open");
    });
  });

  /* ---------------------------------------------------------
     NEWSLETTER (demo — sem backend real)
  --------------------------------------------------------- */
  document.getElementById("newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    document.getElementById("newsletterMsg").textContent = "Prontinho! Você vai receber nossas novidades. 💌";
    e.target.reset();
  });

  /* ---------------------------------------------------------
     SCROLL REVEAL simples (fade-in ao entrar na tela)
  --------------------------------------------------------- */
  function setupScrollReveal() {
    const targets = document.querySelectorAll(".product-card, .step, .carousel-card");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "slideIn .5s ease both";
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach((t) => io.observe(t));
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();
  renderProductGrid();
  renderCarousel();
  setupCarouselControls();
  renderTestimonials();
  startTestimonialAutoplay();
  renderPetals();
  renderCart();
  setupScrollReveal();
})();
