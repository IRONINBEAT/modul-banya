const siteDataNode = document.querySelector("#site-data");

if (siteDataNode) {
  const siteData = JSON.parse(siteDataNode.textContent);
  const projectGrid = document.querySelector("[data-project-grid]");
  const modal = document.querySelector("[data-modal]");
  const modalContent = modal?.querySelector("[data-modal-content]");
  const floatingPhone = document.querySelector("[data-floating-phone]");
  const reviewTrack = document.querySelector("[data-review-track]");
  const materialGrid = document.querySelector("[data-material-grid]");
  const currentYear = document.querySelector("[data-current-year]");
  const filterBox = document.querySelector("[data-filter-box]");
  const mapFrame = document.querySelector("[data-map-frame]");
  const phonePopover = document.querySelector("[data-phone-popover]");
  const phonePanel = document.querySelector("[data-phone-panel]");
  const phoneCallLink = document.querySelector("[data-phone-call]");
  const phoneDisplay = document.querySelector("[data-phone-display]");
  const copyPhoneButton = document.querySelector("[data-copy-phone]");
  const copyStatus = document.querySelector("[data-copy-status]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  const heroVisual = document.querySelector("[data-hero-visual]");

  let projects = [];
  let reviews = [];
  let activeFilter = "Популярные";

  const iconMarkup = {
    telegram: '<img src="assets/img/telegram.png" alt="Telegram" width="22" height="22">',
    vk: '<img src="assets/img/vk.png"       alt="VK"       width="22" height="22">',
    whatsapp: '<img src="assets/img/whatsapp.png" alt="WhatsApp" width="22" height="22">',
    max: '<img src="assets/img/max.png" alt="MAX" width="22" height="22">',
    phone: '<img src="assets/img/phone.png"    alt="Телефон"  width="22" height="22">',
  };

  const createProjectImage = (project, index) => {
    const palette = siteData.visualPalette || ["#d6b08c", "#8a5837", "#f2e2d0", "#6d452a"];
    const accent = palette[index % palette.length];
    const dark = palette[(index + 1) % palette.length];
    const light = palette[(index + 2) % palette.length];
    const depth = palette[(index + 3) % palette.length];
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
        <rect width="1200" height="900" rx="44" fill="${light}"/>
        <circle cx="946" cy="176" r="110" fill="${accent}" fill-opacity="0.22"/>
        <path d="M136 714C300 658 436 646 592 662C766 680 900 726 1062 786" stroke="${accent}" stroke-width="24" stroke-linecap="round" fill="none"/>
        <rect x="212" y="382" width="760" height="236" rx="30" fill="${dark}"/>
        <rect x="282" y="338" width="228" height="74" rx="18" fill="${depth}"/>
        <rect x="798" y="306" width="148" height="106" rx="18" fill="${depth}"/>
        <rect x="306" y="446" width="260" height="118" rx="18" fill="${accent}"/>
        <rect x="600" y="446" width="128" height="172" rx="18" fill="${light === "#111214" ? "#0f0f10" : "#38251a"}"/>
        <rect x="760" y="446" width="160" height="118" rx="18" fill="${accent}"/>
        <rect x="120" y="76" width="312" height="82" rx="18" fill="rgba(255,255,255,0.42)"/>
        <text x="156" y="128" font-family="Trebuchet MS, Segoe UI, sans-serif" font-size="44" fill="${depth}">${project.name}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const resolveProjectImage = (project, source, fallbackIndex = 0) => {
    return source || project.image || createProjectImage(project, fallbackIndex);
  };

  const getProjectGallery = (project, fallbackIndex) => {
    if (Array.isArray(project.images) && project.images.length > 0) {
      return project.images.map((source, imageIndex) => resolveProjectImage(project, source, fallbackIndex + imageIndex));
    }
    return [resolveProjectImage(project, project.image, fallbackIndex)];
  };

  const getProjectImages = () => {
    return projects.map((project, index) => project.image || createProjectImage(project, index));
  };

  const renderDeliveryOptions = (deliveryOptions = [], className = "project-delivery-list") => {
    if (!Array.isArray(deliveryOptions) || deliveryOptions.length === 0) return "";

    return `
      <details class="delivery-disclosure">
        <summary>Примерная стоимость доставки</summary>
        <div class="delivery-disclosure-content">
          <div class="${className}">
            ${deliveryOptions
              .map(
                (item) => `
                  <div class="delivery-row">
                    <span>${item.city}</span>
                    <strong>${item.price}</strong>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
      </details>
    `;
  };

  const getFilteredProjects = () => {
    if (activeFilter === "Популярные") return projects;

    return projects.filter((project) => Array.isArray(project.filters) && project.filters.includes(activeFilter));
  };

  const createMaterialImage = (material, index) => {
    const palette = siteData.visualPalette || ["#9db39f", "#496457", "#e3ece3", "#2f453b"];
    const accent = palette[index % palette.length];
    const dark = palette[(index + 1) % palette.length];
    const light = palette[(index + 2) % palette.length];
    const base = palette[(index + 3) % palette.length];
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 420">
        <rect width="600" height="420" rx="36" fill="${light}"/>
        <rect x="58" y="72" width="484" height="276" rx="30" fill="rgba(255,255,255,0.54)"/>
        <rect x="104" y="120" width="128" height="176" rx="24" fill="${accent}" fill-opacity="0.75"/>
        <rect x="248" y="120" width="102" height="176" rx="24" fill="${dark}" fill-opacity="0.9"/>
        <rect x="366" y="120" width="130" height="176" rx="24" fill="${base}" fill-opacity="0.86"/>
        <path d="M104 152C148 126 190 126 232 152" stroke="${light}" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M248 176C282 150 316 150 350 176" stroke="${light}" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M366 150C410 124 452 124 496 150" stroke="${light}" stroke-width="8" fill="none" stroke-linecap="round"/>
        <text x="58" y="384" font-family="Trebuchet MS, Segoe UI, sans-serif" font-size="32" fill="${dark}">${material.title}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  const renderProjects = () => {
    if (!projectGrid) return;

    const filteredProjects = getFilteredProjects();
    const projectImages = getProjectImages();

    projectGrid.innerHTML = filteredProjects.length > 0
      ? filteredProjects
      .map(
        (project) => `
          <article class="project-card reveal" data-project-card>
            <img src="${projectImages[projects.findIndex((item) => item.id === project.id)]}" alt="${project.name}">
            <div class="project-body">
              <div class="project-topline">
                <span class="chip">${project.tag}</span>
                <span class="chip">${project.size}</span>
              </div>
              <h3>${project.name}</h3>
              <p>${project.summary}</p>
              <div class="project-bottom">
                <div class="project-price">
                  <div>
                    <span class="chip">от ${project.price}</span>
                    <strong>${project.area}</strong>
                  </div>
                </div>
                <button class="button-secondary" type="button" data-open-project="${project.id}">
                  Смотреть
                </button>
              </div>
            </div>
          </article>
        `
      )
      .join("")
      : `
        <article class="project-card project-card--empty reveal">
          <div class="project-body">
            <div class="project-topline">
              <span class="chip">Фильтр</span>
            </div>
            <h3>По этому тегу пока ничего нет</h3>
            <p>Попробуйте другой фильтр или вернитесь к популярным моделям.</p>
          </div>
        </article>
      `;

    attachProjectHandlers();
    hydrateReveal();
  };

  const openModal = (projectId) => {
    const project = projects.find((item) => item.id === projectId);
    if (!project || !modal || !modalContent) return;

    const projectIndex = projects.findIndex((item) => item.id === projectId);
    const gallery = getProjectGallery(project, projectIndex);

    modalContent.innerHTML = `
      <div class="modal-head">
        <div>
          <div class="modal-meta">
            <span class="chip">${project.tag}</span>
            <span class="chip">${project.size}</span>
            <span class="chip">${project.term}</span>
          </div>
          <h2>${project.name}</h2>
        </div>
        <button class="modal-close" type="button" data-close-modal aria-label="Закрыть карточку">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M6 6l12 12M18 6L6 18"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <div class="modal-media">
          <div class="modal-gallery-main">
            <img src="${gallery[0]}" alt="${project.name}" data-modal-main-image>
            <div class="modal-video-wrap" data-modal-video-wrap hidden></div>
            ${gallery.length > 1 || project.video ? `
              <div class="modal-gallery-nav">
                <button class="carousel-button" type="button" data-modal-gallery-shift="-1" aria-label="Предыдущее фото">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button class="carousel-button" type="button" data-modal-gallery-shift="1" aria-label="Следующее фото">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            ` : ""}
          </div>
          ${gallery.length > 1 || project.video ? `
            <div class="modal-thumbs">
              ${project.video ? `
                <button class="modal-thumb modal-thumb--video" type="button" data-modal-video aria-label="Смотреть видео">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="currentColor" stroke="none"/></svg>
                  <span>Видео</span>
                </button>
              ` : ""}
              ${gallery.map((imageSrc, imageIndex) => `
                <button class="modal-thumb ${imageIndex === 0 ? "is-active" : ""}" type="button" data-modal-thumb="${imageIndex}" aria-label="Фото ${imageIndex + 1}">
                  <img src="${imageSrc}" alt="${project.name} ${imageIndex + 1}">
                </button>
              `).join("")}
            </div>
          ` : ""}
        </div>
        <div class="modal-copy">
          <p>${project.description}</p>
          <div class="modal-price">
            <strong>от ${project.price}</strong>
            <span>${project.note}</span>
          </div>
          <div class="modal-specs">
            <div class="modal-spec"><span>Размер</span><strong>${project.size}</strong></div>
            <div class="modal-spec"><span>Площадь</span><strong>${project.area}</strong></div>
            <div class="modal-spec"><span>Вместимость</span><strong>${project.capacity}</strong></div>
            <div class="modal-spec"><span>Срок изготовления</span><strong>${project.term}</strong></div>
            <div class="modal-spec"><span>Комплектация</span><strong>${project.package}</strong></div>
            <div class="modal-spec"><span>Доставка</span><strong>${project.delivery}</strong></div>
          </div>
          ${renderDeliveryOptions(project.deliveryOptions, "modal-delivery-list")}
          <div class="tag-list">
            ${project.features.map((feature) => `<span class="tag">${feature}</span>`).join("")}
          </div>
          <div class="hero-actions">
            <button class="button-primary" type="button" data-close-modal data-jump="contacts">Узнать подробнее</button>
            <button class="button-secondary" type="button" data-close-modal>Вернуться в каталог</button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    modal.querySelector("[data-close-modal]")?.focus();

    modal.querySelectorAll("[data-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        closeModal();
        setActiveSection(button.dataset.jump);
      });
    });

    if (gallery.length > 1 || project.video) {
      const mainImage = modal.querySelector("[data-modal-main-image]");
      const videoWrap = modal.querySelector("[data-modal-video-wrap]");
      const thumbButtons = Array.from(modal.querySelectorAll("[data-modal-thumb]"));
      const videoThumb = modal.querySelector("[data-modal-video]");
      let galleryIndex = 0;
      let videoActive = false;

      // Converts any YouTube / VK url to embeddable src
      const toEmbedSrc = (url) => {
        // YouTube: watch?v=ID or youtu.be/ID or /shorts/ID
        const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
        if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1&autoplay=1`;

        // VK: vk.com/video-OWNERID_VIDEOID or vkvideo.ru
        const vkMatch = url.match(/vk\.com\/video(-?\d+_\d+)/) || url.match(/vkvideo\.ru\/video(-?\d+_\d+)/);
        if (vkMatch) return `https://vk.com/video_ext.php?oid=${vkMatch[1].split("_")[0]}&id=${vkMatch[1].split("_")[1]}&hd=2&autoplay=1`;

        // Direct mp4 / other — use as-is
        return url;
      };

      const showVideo = () => {
        videoActive = true;
        mainImage.hidden = true;
        videoWrap.hidden = false;
        const src = toEmbedSrc(project.video);
        const isDirectFile = src === project.video && !src.includes("youtube") && !src.includes("vk.com/video_ext");
        videoWrap.innerHTML = isDirectFile
          ? `<video src="${src}" controls autoplay playsinline style="width:100%;height:100%;display:block;border-radius:inherit"></video>`
          : `<iframe src="${src}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border-radius:inherit"></iframe>`;
        thumbButtons.forEach(b => b.classList.remove("is-active"));
        videoThumb?.classList.add("is-active");
      };

      const showPhoto = (index) => {
        if (videoActive) {
          videoActive = false;
          videoWrap.hidden = true;
          videoWrap.innerHTML = "";
          mainImage.hidden = false;
        }
        galleryIndex = index;
        mainImage.src = gallery[galleryIndex];
        thumbButtons.forEach((b, i) => b.classList.toggle("is-active", i === galleryIndex));
        videoThumb?.classList.remove("is-active");
      };

      videoThumb?.addEventListener("click", showVideo);

      thumbButtons.forEach((button) => {
        button.addEventListener("click", () => showPhoto(Number(button.dataset.modalThumb)));
      });

      modal.querySelectorAll("[data-modal-gallery-shift]").forEach((button) => {
        button.addEventListener("click", () => {
          if (videoActive) { showPhoto(0); return; }
          const next = (galleryIndex + Number(button.dataset.modalGalleryShift) + gallery.length) % gallery.length;
          showPhoto(next);
        });
      });
    }
  };

  const closeModal = () => {
    modal?.classList.remove("is-open");
    document.body.classList.remove("modal-open");
  };

  const attachProjectHandlers = () => {
    document.querySelectorAll("[data-open-project]").forEach((button) => {
      button.addEventListener("click", () => openModal(button.dataset.openProject));
    });
  };

  const hydrateReveal = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll(".reveal, .stagger").forEach((node) => observer.observe(node));
  };

  const setActiveSection = (targetId) => {
    document.querySelectorAll("[data-section]").forEach((section) => {
      section.classList.toggle("is-active", section.id === targetId);
    });

    document.querySelectorAll("[data-nav-target]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.navTarget === targetId);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const attachNavigation = () => {
    document.querySelectorAll("[data-nav-target], [data-jump]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.navTarget || button.dataset.jump;
        setActiveSection(targetId);
        closeMobileMenu();
      });
    });
  };

  const attachReviewButtons = () => {
    document.querySelectorAll("[data-review-shift]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!reviewTrack) return;
        const shift = button.dataset.reviewShift === "next" ? 1 : -1;
        reviewTrack.scrollBy({
          left: reviewTrack.clientWidth * 0.82 * shift,
          behavior: "smooth",
        });
      });
    });
  };

  const renderReviews = () => {
    if (!reviewTrack) return;

    reviewTrack.innerHTML = reviews
      .map(
        (review) => `
          <article class="review-card">
            <blockquote>“${review.quote}”</blockquote>
            <div class="review-meta">
              <strong>${review.author}</strong>
              <span class="chip">${review.city}</span>
              <span class="chip">${review.project}</span>
            </div>
          </article>
        `
      )
      .join("");
  };

  const renderMaterials = () => {
    if (!materialGrid) return;

    const materials = Array.isArray(siteData.materials) ? siteData.materials : [];

    materialGrid.innerHTML = materials
      .map(
        (material, index) => `
          <article class="material-card reveal">
            <div class="material-image">
              <img src="${material.image || createMaterialImage(material, index)}" alt="${material.title}">
            </div>
            <div class="material-copy">
              <h3>${material.title}</h3>
              <p>${material.description || ""}</p>
            </div>
          </article>
        `
      )
      .join("");
  };

  const renderSocials = () => {
    document.querySelectorAll("[data-social-links]").forEach((container) => {
      container.innerHTML = siteData.socials
        .map(
          (item) => `
            <a class="social-link" href="${item.href}" aria-label="${item.label}">
              ${iconMarkup[item.icon] || iconMarkup.phone}
            </a>
          `
        )
        .join("");
    });
  };

  const renderFilters = () => {
    if (!filterBox) return;

    filterBox.innerHTML = siteData.filters
      .map(
        (label, index) => `
          <button
            class="filter-pill ${label === activeFilter || (index === 0 && !activeFilter) ? "is-accent" : ""}"
            type="button"
            data-filter-pill="${label}"
            aria-pressed="${label === activeFilter ? "true" : "false"}"
          >
            ${label}
          </button>
        `
      )
      .join("");

    filterBox.querySelectorAll("[data-filter-pill]").forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filterPill;
        renderFilters();
        renderProjects();
      });
    });
  };

  const renderMap = () => {
    if (!mapFrame || !siteData.map) return;

    const lat = Number(siteData.map.lat);
    const lon = Number(siteData.map.lon);
    const delta = Number(siteData.map.delta || 0.072);

    if (Number.isNaN(lat) || Number.isNaN(lon)) return;

    const bbox = [
      (lon - delta).toFixed(6),
      (lat - delta / 1.45).toFixed(6),
      (lon + delta).toFixed(6),
      (lat + delta / 1.45).toFixed(6),
    ].join("%2C");

    mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(6)}%2C${lon.toFixed(6)}`;
  };

  const phoneText = siteData.phoneDisplay || siteData.phoneHref;

  const openPhonePanel = () => {
    if (!phonePanel || !floatingPhone) return;
    phonePanel.hidden = false;
    floatingPhone.setAttribute("aria-expanded", "true");
  };

  const closePhonePanel = () => {
    if (!phonePanel || !floatingPhone) return;
    phonePanel.hidden = true;
    floatingPhone.setAttribute("aria-expanded", "false");
    if (copyStatus) {
      copyStatus.textContent = "Номер можно скопировать в один клик";
    }
  };

  const togglePhonePanel = () => {
    if (!phonePanel) return;
    if (phonePanel.hidden) {
      openPhonePanel();
    } else {
      closePhonePanel();
    }
  };

  const closeMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  const toggleMobileMenu = () => {
    if (!menuToggle || !mobileMenu) return;
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuToggle.classList.toggle("is-active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  };

  const syncHeroMotion = () => {
    if (!heroVisual) return;

    const progress = Math.min(window.scrollY / 420, 1);
    const scale = 1.08 - progress * 0.18;
    const shift = 20 - progress * 32;

    document.body.style.setProperty("--hero-image-scale", scale.toFixed(3));
    document.body.style.setProperty("--hero-image-shift", `${shift.toFixed(1)}px`);
  };

  let heroTicking = false;

  const requestHeroMotionSync = () => {
    if (heroTicking) return;

    heroTicking = true;
    window.requestAnimationFrame(() => {
      syncHeroMotion();
      heroTicking = false;
    });
  };

  // Загрузка проектов из JSON
  const fetchProjects = async () => {
    try {
      const response = await fetch('./data/projects.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      projects = await response.json();
      renderProjects();
    } catch (error) {
      console.error('Ошибка загрузки проектов:', error);
      projects = [];
      renderProjects();
    }
  };

  // Загрузка отзывов из JSON
  const fetchReviews = async () => {
    try {
      const response = await fetch('./data/reviews.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      reviews = await response.json();
      renderReviews();
    } catch (error) {
      console.error('Ошибка загрузки отзывов:', error);
      reviews = [];
      renderReviews();
    }
  };

  // Инициализация
  const init = async () => {
    if (floatingPhone) {
      floatingPhone.addEventListener("click", togglePhonePanel);
    }

    if (menuToggle) {
      menuToggle.addEventListener("click", toggleMobileMenu);
    }

    if (phoneCallLink) {
      phoneCallLink.href = `tel:${siteData.phoneHref}`;
    }

    if (phoneDisplay) {
      phoneDisplay.textContent = phoneText;
    }

    if (copyPhoneButton) {
      copyPhoneButton.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(phoneText);
          if (copyStatus) {
            copyStatus.textContent = "Номер скопирован";
          }
        } catch {
          if (copyStatus) {
            copyStatus.textContent = "Не удалось скопировать номер";
          }
        }
      });
    }

    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }

    modal?.addEventListener("click", (event) => {
      if (event.target === modal || event.target.closest("[data-close-modal]")) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
        closePhonePanel();
        closeMobileMenu();
      }
    });

    document.addEventListener("click", (event) => {
      if (phonePopover && phonePanel && !phonePanel.hidden && !phonePopover.contains(event.target)) {
        closePhonePanel();
      }

      if (menuToggle && mobileMenu && mobileMenu.classList.contains("is-open")) {
        const clickedInsideMenu = mobileMenu.contains(event.target);
        const clickedToggle = menuToggle.contains(event.target);

        if (!clickedInsideMenu && !clickedToggle) {
          closeMobileMenu();
        }
      }
    });

    window.addEventListener("scroll", requestHeroMotionSync, { passive: true });
    window.addEventListener("resize", () => {
      requestHeroMotionSync();

      if (window.innerWidth > 820) {
        closeMobileMenu();
      }
    });

    await Promise.all([fetchProjects(), fetchReviews()]);

    renderSocials();
    renderFilters();
    renderMap();
    renderMaterials();
    attachNavigation();
    attachReviewButtons();
    hydrateReveal();
    requestHeroMotionSync();
  };

  init();
}
