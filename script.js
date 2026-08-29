/* =========================================================
   DOÇURAS DO CÉU — script.js
   Bolos e doces caseiros | Brás de Pina - RJ
   Instagram: @docurasdoceu.bolosedoces
========================================================= */
(function () {
  "use strict";

  // Número da Doçuras do céu. Precisa ser SÓ DÍGITOS (DDI+DDD+número),
  // senão o link do wa.me quebra. Ex: "5521987798912"
  const WHATSAPP_NUMBER = "5521987798912";

  /* ---------------------------------------------------------
     DADOS DOS PRODUTOS — os 6 bolos reais do Instagram
     @docurasdoceu.bolosedoces

     img: caminho da foto do bolo. Salve as fotos reais (exportadas
     do Instagram, sem a moldura do navegador) numa pasta "images/"
     ao lado deste arquivo, usando esses mesmos nomes de arquivo.
     Se a imagem não existir, o card usa um ícone de bolo como
     substituto automático — o site não quebra.

     price: TODO — os preços não apareciam nas legendas do Instagram.
     Troque pelos valores reais de cada bolo.
  --------------------------------------------------------- */
  const PRODUCTS = [
    {
      id: "p1",
      name: "Bolo de baunilha com morango",
      cat: "Especial",
      price: 75.0,
      desc: "Massa fofinha de baunilha com uma cobertura generosa e cremosa de brigadeiro de morango, finalizada com granulado gourmet por cima. Tamanho: 22 cm - Rendimento: 12 a 15 fatias",
      tamanho:"Tamanho: 22 cm",
      fatias: "Rendimento: 12 a 15 fatias",
      tag: "Mais pedido",
      img: "images/bolo-baunilha-morango.jpg",
      // calda de morango escorrendo + granulado de chocolate caindo
      topping: {
        color: "#F1AFC4",
        color2: "#FBE1E9",
        particles: { color: "#4A2E22", color2: "#6B3A28", shape: "rect" },
      },
    },
    {
      id: "p2",
      name: "Bolo de Cenoura com Ganache",
      cat: "classicos",
      price: 60.0,
      desc: "Clássico, caseiro e irresistível: cenoura com ganache ao leite e granulado gourmet.",
      img: "images/bolo-cenoura.jpg",
      // ganache ao leite escorrendo, brilho suave
      topping: { color: "#6B3B22", color2: "#8A5330", shine: true },
    },
    {
      id: "p3",
      name: "Bolo Beeem Chocolatudo",
      cat: "chocolate",
      price: 70.0,
      desc: "Bolo de chocolate com ganache meio amarga e granulado gourmet — a combinação dos sonhos.",
      tag: "Best seller",
      img: "images/bolo-chocolatudo.jpg",
      // calda de chocolate bem grossa escorrendo + raspas de chocolate caindo
      topping: {
        color: "#2A1810",
        color2: "#4A2712",
        particles: { color: "#5C3820", color2: "#3B2417", shape: "rect" },
        shine: true,
      },
    },
    {
      id: "p4",
      name: "Bolo de Paçoca",
      cat: "especiais",
      price: 65.0,
      desc: "O bolo de paçoca em sua forma mais irresistível.",
      img: "images/bolo-pacoca.jpg",
      // calda amanteigada escorrendo + farofinha de paçoca caindo
      topping: {
        color: "#D9A441",
        color2: "#E6CFA0",
        particles: { color: "#E6CFA0", color2: "#C9A15A", shape: "crumb" },
      },
    },
    {
      id: "p5",
      name: "Bolo de Chocolate com Brigadeiro",
      cat: "chocolate",
      price: 70.0,
      desc: "Cobertura de brigadeiro cremoso, com escorrimento delicado e brilho intenso. Um clássico que nunca sai de cena.",
      tag: "Clássico",
      img: "images/bolo-brigadeiro.jpg",
      // brigadeiro cremoso escorrendo com brilho intenso
      topping: { color: "#3B2417", color2: "#5C3820", shine: true },
    },
    {
      id: "p6",
      name: "Bolo de Coco com Beijinho",
      cat: "classicos",
      price: 60.0,
      desc: "Bolo de coco fofinho, bem molhadinho, com cobertura de beijinho. Impossível comer só um pedaço.",
      img: "images/bolo-coco-beijinho.jpg",
      // glacê branquinho escorrendo + coco ralado "nevando"
      topping: {
        color: "#FBF6EE",
        color2: "#FFFFFF",
        particles: { color: "#FFFFFF", color2: "#F5F0E8", shape: "flake" },
      },
    },    
    {
      id: "p7",
      name: "Cenoura com calda de chocolate tradicional",
      cat: "classicos",
      price: 60.0,
      desc: "Clássico, caseiro e irresistível: cenoura com ganache ao leite.",
      img: "images/bolo-de-cenoura-com-ganache.png",
      // ganache ao leite escorrendo, brilho suave
            topping: {
        color: "#2A1810",
        color2: "#4A2712",
        particles: { color: "#5C3820", color2: "#3B2417", shape: "rect" },
        shine: true,
      },
    },
    {
      id: "p8",
      name: "Paçoca Cremosa",
      cat: "classicos",
      // TODO: preço estimado (baseado em bolos parecidos) — confirme o valor real.
      price: 65.0,
      desc: "Massa de paçoca com cobertura cremosa de paçoca.",
      img: "images/bolo-pacoca-cremosa.png",
      // calda amanteigada escorrendo + farofinha de paçoca caindo
      topping: {
        color: "#D9A441",
        color2: "#E6CFA0",
        particles: { color: "#E6CFA0", color2: "#C9A15A", shape: "crumb" },
      },
    },
    {
      id: "p9",
      name: "Fubá com Goiabada",
      cat: "classicos",
      // TODO: preço estimado (baseado em bolos parecidos) — confirme o valor real.
      price: 60.0,
      desc: "Massa de fubá com calda de goiaba.",
      img: "images/bolo-fuba-goiabada.png",
      // calda de goiabada vermelha e brilhante escorrendo
      topping: { color: "#7A1616", color2: "#B23A2E", shine: true },
    },
    {
      id: "p10",
      name: "Aipim com Coco",
      cat: "classicos",
      // TODO: preço estimado (baseado em bolos parecidos) — confirme o valor real.
      price: 60.0,
      desc: "Bolo de aipim com coco.",
      // TODO: foto ainda não enviada — o card usa o ícone de bolo como substituto
      // automático até a foto real ser adicionada em images/bolo-aipim-coco.jpg
      img: "images/bolo-aipim-coco.jpg",
      // glacê branquinho escorrendo + coco ralado "nevando"
      topping: {
        color: "#FBF6EE",
        color2: "#FFFFFF",
        particles: { color: "#FFFFFF", color2: "#F5F0E8", shape: "flake" },
      },
    },
    {
      id: "p11",
      name: "Milho com Coco",
      cat: "classicos",
      // TODO: preço estimado (baseado em bolos parecidos) — confirme o valor real.
      price: 60.0,
      desc: "Bolo de milho com coco.",
      img: "images/bolo-milho-coco.png",
      // glacê branquinho escorrendo + coco ralado "nevando"
      topping: {
        color: "#FBF6EE",
        color2: "#FFFFFF",
        particles: { color: "#FFFFFF", color2: "#F5F0E8", shape: "flake" },
      },
    },
    {
      id: "p12",
      name: "Cenoura Tradicional",
      cat: "classicos",
      // TODO: preço estimado (baseado em bolos parecidos) — confirme o valor real.
      price: 60.0,
      desc: "Massa de cenoura com calda de chocolate.",
      img: "images/bolo-de-cenoura-com-ganache.png",
      // ganache de chocolate escorrendo, brilho suave
      topping: {
        color: "#2A1810",
        color2: "#4A2712",
        particles: { color: "#5C3820", color2: "#3B2417", shape: "rect" },
        shine: true,
      },
    },
    {
      id: "p13",
      name: "Ninho Cremoso",
      cat: "classicos",
      // TODO: preço estimado (baseado em bolos parecidos) — confirme o valor real.
      // TODO: descrição estimada a partir da foto — confirme o texto real.
      price: 70.0,
      desc: "Massa fofinha com cobertura cremosa de leite Ninho e raspas de chocolate meio amargo.",
      img: "images/bolo-ninho-cremoso.png",
      // glacê cremoso claro escorrendo + raspas de chocolate escuro caindo
      topping: {
        color: "#F3E9D2",
        color2: "#FFF8E7",
        particles: { color: "#3B2417", color2: "#2A1810", shape: "rect" },
        shine: true,
      },
    },
  ];

  const TESTIMONIALS = [
    { name: "olgaluiisa", text: "O melhor!! ❤️😃" },
    { name: "eloizavieiraalves7", text: "Tudo de bom !!!" },
  ];

  /* ---------------------------------------------------------
     ÍCONE SVG genérico usado nos cards (referencia sprite #ico-cake)
  --------------------------------------------------------- */
  function cakeSvg() {
    return `<svg viewBox="0 0 64 64"><use href="#ico-cake"/></svg>`;
  }

  // Mostra a foto real do bolo (p.img); se o arquivo não existir,
  // troca automaticamente pelo ícone de bolo — nunca quebra o layout.
  function productMedia(p) {
    return `
      <img src="${p.img}" alt="${p.name}" loading="lazy"
        onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="media-fallback" style="display:none">${cakeSvg()}</div>
    `;
  }

  function formatPrice(v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  /* ---------------------------------------------------------
     COBERTURA ANIMADA — calda escorrendo + granulado/coco/farofa
     caindo, diferente para cada bolo (p.topping), usada na vitrine.
  --------------------------------------------------------- */
  function toppingMarkup(p) {
    const t = p.topping;
    if (!t) return "";
    const gradId = "dripGrad-" + p.id;
    return `
      <div class="slider-topping${t.shine ? " topping-shine" : ""}">
        <svg class="drip-shape" viewBox="0 0 200 90" preserveAspectRatio="none">
          <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${t.color2 || t.color}"/>
              <stop offset="100%" stop-color="${t.color}"/>
            </linearGradient>
          </defs>
          <path d="M0,0 H200 V26 C195,52 189,16 183,42 C177,18 171,50 165,24
            C159,50 153,20 147,44 C141,20 135,52 129,26 C123,50 117,18 111,44
            C105,20 99,52 93,26 C87,50 81,18 75,44 C69,20 63,50 57,26
            C51,50 45,18 39,44 C33,20 27,52 21,26 C15,50 9,18 3,42 C1,34 0,30 0,26 Z"
            fill="url(#${gradId})"/>
        </svg>
        ${t.shine ? '<div class="topping-shine-sweep"></div>' : ""}
        ${t.particles ? `<div class="topping-particles" data-shape="${t.particles.shape}"></div>` : ""}
      </div>
    `;
  }

  function spawnToppingParticles(container, particleCfg) {
    if (!container || !particleCfg) return;
    container.innerHTML = "";
    const colors = [particleCfg.color, particleCfg.color2 || particleCfg.color];
    const shape = particleCfg.shape || "rect";
    const count = 16;
    for (let i = 0; i < count; i++) {
      const el = document.createElement("span");
      el.className = "topping-particle shape-" + shape;
      el.style.left = (4 + Math.random() * 88) + "%";
      el.style.background = colors[i % colors.length];
      const size = shape === "flake" ? 4 + Math.random() * 3 : 3 + Math.random() * 2;
      el.style.width = size + "px";
      el.style.height = (shape === "rect" ? size * 2.6 : size) + "px";
      el.style.animationDuration = (2.4 + Math.random() * 2.2) + "s";
      el.style.animationDelay = Math.random() * -4.5 + "s";
      container.appendChild(el);
    }
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
    let msg = "Olá, Doçuras do céu! Quero fazer o seguinte pedido:%0A%0A";
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
          ${productMedia(p)}
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
     VITRINE ANIMADA — troca de bolo com animação
     (substitui o carrossel horizontal simples)
  --------------------------------------------------------- */
  const CAT_LABELS = { classicos: "Clássicos", chocolate: "Chocolate", especiais: "Especiais" };

  const sliderStage = document.getElementById("sliderStage");
  const sliderPhoto = document.getElementById("sliderPhoto");
  const sliderIndex = document.getElementById("sliderIndex");
  const sliderCat = document.getElementById("sliderCat");
  const sliderName = document.getElementById("sliderName");
  const sliderDesc = document.getElementById("sliderDesc");
  const sliderPrice = document.getElementById("sliderPrice");
  const sliderAddBtn = document.getElementById("sliderAddBtn");
  const sliderThumbs = document.getElementById("sliderThumbs");
  const sliderInfo = document.getElementById("sliderInfo");
  const sliderSection = document.getElementById("mais-pedidos");

  let sliderCurrent = 0;
  let sliderAutoTimer = null;

  function renderSliderPhoto(p) {
    sliderPhoto.innerHTML = `
      <img src="${p.img}" alt="${p.name}" loading="lazy"
        onerror="this.onerror=null; this.style.display='none'; this.nextElementSibling.style.display='flex';">
      <div class="media-fallback" style="display:none">${cakeSvg()}</div>
      ${toppingMarkup(p)}
    `;
    if (p.topping && p.topping.particles) {
      spawnToppingParticles(sliderPhoto.querySelector(".topping-particles"), p.topping.particles);
    }
  }

  function goToSlide(i, direction) {
    sliderCurrent = (i + PRODUCTS.length) % PRODUCTS.length;
    const p = PRODUCTS[sliderCurrent];

    // troca o tema de cor de fundo por categoria do bolo
    sliderSection.dataset.theme = p.cat;

    // animação de saída
    sliderPhoto.classList.remove("in");
    sliderPhoto.classList.add(direction === "prev" ? "out-right" : "out-left");
    sliderInfo.classList.add("fade-out");

    setTimeout(() => {
      renderSliderPhoto(p);
      sliderIndex.textContent = String(sliderCurrent + 1).padStart(2, "0") + " / " + String(PRODUCTS.length).padStart(2, "0");
      sliderCat.textContent = CAT_LABELS[p.cat] || p.cat;
      sliderName.textContent = p.name;
      sliderDesc.textContent = p.desc;
      sliderPrice.textContent = formatPrice(p.price);
      sliderAddBtn.dataset.id = p.id;

      sliderPhoto.classList.remove("out-right", "out-left");
      void sliderPhoto.offsetWidth; // reinicia a animação CSS
      sliderPhoto.classList.add("in");
      sliderInfo.classList.remove("fade-out");
    }, 260);

    sliderThumbs.querySelectorAll(".slider-thumb").forEach((t, idx) => {
      t.classList.toggle("active", idx === sliderCurrent);
    });
  }

  function renderSliderThumbs() {
    sliderThumbs.innerHTML = PRODUCTS.map((p, i) => `
      <button class="slider-thumb${i === 0 ? " active" : ""}" data-i="${i}" aria-label="${p.name}">
        <img src="${p.img}" alt="" loading="lazy" onerror="this.remove();">
      </button>
    `).join("");

    sliderThumbs.querySelectorAll(".slider-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = Number(btn.dataset.i);
        stopSliderAutoplay();
        goToSlide(i, i < sliderCurrent ? "prev" : "next");
        startSliderAutoplay();
      });
    });
  }

  function startSliderAutoplay() {
    clearInterval(sliderAutoTimer);
    sliderAutoTimer = setInterval(() => goToSlide(sliderCurrent + 1, "next"), 5000);
  }
  function stopSliderAutoplay() {
    clearInterval(sliderAutoTimer);
  }

  document.getElementById("sliderPrev").addEventListener("click", () => {
    stopSliderAutoplay();
    goToSlide(sliderCurrent - 1, "prev");
    startSliderAutoplay();
  });
  document.getElementById("sliderNext").addEventListener("click", () => {
    stopSliderAutoplay();
    goToSlide(sliderCurrent + 1, "next");
    startSliderAutoplay();
  });
  sliderAddBtn.addEventListener("click", () => addToCart(sliderAddBtn.dataset.id, sliderAddBtn));
  sliderStage.addEventListener("mouseenter", stopSliderAutoplay);
  sliderStage.addEventListener("mouseleave", startSliderAutoplay);

  function renderFloatingDecor() {
    const wrap = document.getElementById("sliderDecor");
    const colors = ["#C46A80", "#C9A15A", "#F6C9D6", "#E6CFA0"];
    for (let i = 0; i < 10; i++) {
      const dot = document.createElement("span");
      dot.style.left = Math.random() * 100 + "%";
      dot.style.top = Math.random() * 100 + "%";
      dot.style.background = colors[i % colors.length];
      dot.style.animationDuration = 5 + Math.random() * 6 + "s";
      dot.style.animationDelay = Math.random() * 5 + "s";
      wrap.appendChild(dot);
    }
  }

  function initSlider() {
    renderSliderPhoto(PRODUCTS[0]);
    sliderPhoto.classList.add("in");
    sliderIndex.textContent = "01 / " + String(PRODUCTS.length).padStart(2, "0");
    sliderCat.textContent = CAT_LABELS[PRODUCTS[0].cat] || PRODUCTS[0].cat;
    sliderName.textContent = PRODUCTS[0].name;
    sliderDesc.textContent = PRODUCTS[0].desc;
    sliderPrice.textContent = formatPrice(PRODUCTS[0].price);
    sliderAddBtn.dataset.id = PRODUCTS[0].id;
    sliderSection.dataset.theme = PRODUCTS[0].cat;
    renderSliderThumbs();
    renderFloatingDecor();
    startSliderAutoplay();
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
     LOGIN OBRIGATÓRIO (cadastro manual) + CADASTRO COMPLEMENTAR
     Fluxo: 1) usuário cria conta -> POST /api/register
               ou já tem conta   -> POST /api/login
            2) se faltar idade/endereço/bolo -> formulário extra
               -> POST /api/profile
            3) GET /api/me confirma sessão a cada carregamento
               da página e libera (ou não) o site.
  --------------------------------------------------------- */
  const authGate = document.getElementById("authGate");
  const authStepLogin = document.getElementById("authStepLogin");
  const authStepProfile = document.getElementById("authStepProfile");
  const authLoginError = document.getElementById("authLoginError");
  const authProfileError = document.getElementById("authProfileError");
  const userChip = document.getElementById("userChip");

  function populateProfileBoloOptions() {
    const select = document.getElementById("profileBolo");
    if (!select) return;
    select.innerHTML =
      '<option value="" disabled selected>Escolha um sabor</option>' +
      PRODUCTS.map((p) => `<option value="${p.name}">${p.name}</option>`).join("") +
      '<option value="Outro">Outro / ainda não experimentei</option>';
  }

  function showGate() {
    document.body.style.overflow = "hidden";
    authGate.hidden = false;
  }

  function hideGate() {
    document.body.style.overflow = "";
    authGate.hidden = true;
  }

  function showLoginStep() {
    authStepLogin.style.display = "block";
    authStepProfile.style.display = "none";
  }

  function showProfileStep() {
    authStepLogin.style.display = "none";
    authStepProfile.style.display = "block";
  }

  function updateUserChip(user) {
    if (!user || !userChip) return;
    document.getElementById("userChipName").textContent = (user.name || user.email || "").split(" ")[0];
    userChip.style.display = "flex";
  }

  function afterAuthSuccess(data) {
    updateUserChip(data.user);
    if (data.profileComplete) {
      hideGate();
    } else {
      showProfileStep();
    }
  }

  function setupAuthTabs() {
    const tabLoginBtn = document.getElementById("tabLoginBtn");
    const tabRegisterBtn = document.getElementById("tabRegisterBtn");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const title = document.getElementById("authLoginTitle");
    const desc = document.getElementById("authLoginDesc");
    if (!tabLoginBtn || !tabRegisterBtn) return;

    function showLoginTab() {
      tabLoginBtn.classList.add("active");
      tabRegisterBtn.classList.remove("active");
      loginForm.style.display = "flex";
      registerForm.style.display = "none";
      title.textContent = "Entre para continuar";
      desc.textContent = "Para acessar o cardápio e fazer pedidos, entre com sua conta. Leva 5 segundos. 🌸";
      authLoginError.textContent = "";
    }

    function showRegisterTab() {
      tabRegisterBtn.classList.add("active");
      tabLoginBtn.classList.remove("active");
      registerForm.style.display = "flex";
      loginForm.style.display = "none";
      title.textContent = "Crie sua conta";
      desc.textContent = "Leva menos de um minuto e já libera o cardápio. 🌸";
      authLoginError.textContent = "";
    }

    tabLoginBtn.addEventListener("click", showLoginTab);
    tabRegisterBtn.addEventListener("click", showRegisterTab);
  }

  function setupLoginForm() {
    const form = document.getElementById("loginForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      authLoginError.textContent = "";
      const email = form.email.value.trim();
      const senha = form.senha.value;
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, senha }),
        });
        const data = await res.json();
        if (!res.ok) {
          authLoginError.textContent = data.error || "Não foi possível entrar. Tente de novo.";
          return;
        }
        afterAuthSuccess(data);
      } catch (e) {
        authLoginError.textContent = "Erro de conexão. Verifique sua internet e tente de novo.";
      }
    });
  }

  function setupRegisterForm() {
    const form = document.getElementById("registerForm");
    if (!form) return;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      authLoginError.textContent = "";
      const nome = form.nome.value.trim();
      const email = form.email.value.trim();
      const senha = form.senha.value;
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha }),
        });
        const data = await res.json();
        if (!res.ok) {
          authLoginError.textContent = data.error || "Não foi possível criar sua conta. Tente de novo.";
          return;
        }
        afterAuthSuccess(data);
      } catch (e) {
        authLoginError.textContent = "Erro de conexão. Verifique sua internet e tente de novo.";
      }
    });
  }

  function setupProfileForm() {
    const form = document.getElementById("profileForm");
    if (!form) return;
    populateProfileBoloOptions();

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      authProfileError.textContent = "";

      const idade = form.idade.value.trim();
      const endereco = form.endereco.value.trim();
      const boloPreferido = form.boloPreferido.value;
      const consentiu = document.getElementById("profileConsent").checked;

      if (!idade || !endereco || !boloPreferido || !consentiu) {
        authProfileError.textContent = "Preencha idade, endereço, bolo preferido e aceite o uso dos dados.";
        return;
      }

      try {
        const res = await fetch("/api/profile", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idade, endereco, boloPreferido }),
        });
        const data = await res.json();
        if (!res.ok) {
          authProfileError.textContent = data.error || "Não foi possível salvar seu cadastro.";
          return;
        }
        updateUserChip(data.user);
        hideGate();
        showToast("Cadastro concluído! Bem-vindo(a). 🌸");
      } catch (e) {
        authProfileError.textContent = "Erro de conexão. Tente de novo.";
      }
    });
  }

  function setupLogout() {
    const btn = document.getElementById("logoutBtn");
    if (!btn) return;
    btn.addEventListener("click", async () => {
      try {
        await fetch("/api/logout", { method: "POST" });
      } catch (e) { /* segue o baile mesmo se falhar */ }
      userChip.style.display = "none";
      showLoginStep();
      authLoginError.textContent = "";
      showGate();
    });
  }

  async function initAuthGate() {
    setupAuthTabs();
    setupLoginForm();
    setupRegisterForm();
    setupProfileForm();
    setupLogout();
    try {
      const res = await fetch("/api/me");
      if (!res.ok) {
        showGate();
        showLoginStep();
        return;
      }
      const data = await res.json();
      updateUserChip(data.user);
      if (data.profileComplete) {
        hideGate();
      } else {
        showGate();
        showProfileStep();
      }
    } catch (e) {
      // Sem conexão com a API — libera login mesmo assim
      showGate();
      showLoginStep();
    }
  }

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
  initSlider();
  renderTestimonials();
  startTestimonialAutoplay();
  renderPetals();
  renderCart();
  setupScrollReveal();
  initAuthGate();
})();
