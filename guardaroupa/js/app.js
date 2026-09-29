/* ============================================
   App Module — Navigation, Init, Utilities
   ============================================ */

const App = {
  currentPage: 'dashboard',
  initialized: false,

  init() {
    if (!this.initialized) {
      this.bindNav();
      this.bindSidebar();
      this.bindModals();
      this.bindMobile();
      DashboardModule.init();
      InventoryModule.init();
      OutfitBuilderModule.init();
      WeatherModule.init();
      this.initialized = true;
    }
    this.navigateTo('dashboard');
  },

  /* ---------- Navigation ---------- */
  bindNav() {
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        this.navigateTo(page);
        this.closeMobileSidebar();
      });
    });
  },

  navigateTo(page) {
    this.currentPage = page;

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const activeNav = document.querySelector(`.nav-item[data-page="${page}"]`);
    if (activeNav) activeNav.classList.add('active');

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(`page-${page}`);
    if (target) {
      target.classList.add('active');
      if (page === 'dashboard') { DashboardModule.refresh(); WeatherModule.refresh(); }
      if (page === 'inventory') InventoryModule.refresh();
      if (page === 'outfits') OutfitBuilderModule.refresh();
      if (page === 'saved-outfits') this.renderSavedOutfits();
    }
  },

  renderSavedOutfits() {
    const outfits = WardrobeDB.getOutfits();
    const grid = document.getElementById('savedOutfitsGrid');
    const empty = document.getElementById('emptyOutfitsState');

    if (outfits.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }

    empty.style.display = 'none';
    grid.innerHTML = outfits.map(outfit => {
      const slots = ['top', 'bottom', 'shoes', 'accessories'];
      const slotHTML = slots.map(zone => {
        const item = outfit.items[zone];
        if (item) {
          const content = item.image
            ? `<img src="${item.image}" alt="${item.name}">`
            : (WardrobeDB.categoryEmojis[item.category] || '👕');
          return `<div class="outfit-preview-slot">${content}</div>`;
        }
        return `<div class="outfit-preview-slot empty">+</div>`;
      }).join('');

      const date = new Date(outfit.createdAt).toLocaleDateString('pt-BR');

      return `
        <div class="saved-outfit-card">
          <div class="outfit-preview-grid">${slotHTML}</div>
          <div class="outfit-card-body">
            <div class="outfit-card-name">${outfit.name}</div>
            <div class="outfit-card-date">${date}</div>
          </div>
          <div class="outfit-card-actions">
            <button class="delete-outfit" data-id="${outfit.id}">Excluir</button>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.delete-outfit').forEach(btn => {
      btn.addEventListener('click', () => {
        WardrobeDB.deleteOutfit(btn.dataset.id);
        this.renderSavedOutfits();
        this.showToast('Outfit excluído');
      });
    });
  },

  /* ---------- Sidebar ---------- */
  bindSidebar() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
      });
    }
  },

  /* ---------- Mobile ---------- */
  bindMobile() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const addBtn = document.getElementById('mobileAddBtn');
    const overlay = document.getElementById('sidebarOverlay');

    if (menuBtn) menuBtn.addEventListener('click', () => this.openMobileSidebar());
    if (addBtn) addBtn.addEventListener('click', () => openAddModal());
    if (overlay) overlay.addEventListener('click', () => this.closeMobileSidebar());
  },

  openMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.add('mobile-open');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  },

  /* ---------- Modals ---------- */
  bindModals() {
    const addBtn = document.getElementById('addItemBtn');
    const addPieceBtn = document.getElementById('addPieceBtn');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelAdd');
    const closeDetail = document.getElementById('closeDetailModal');

    if (addBtn) addBtn.addEventListener('click', () => openAddModal());
    if (addPieceBtn) addPieceBtn.addEventListener('click', () => openAddModal());
    if (closeBtn) closeBtn.addEventListener('click', closeAddModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeAddModal);
    if (closeDetail) closeDetail.addEventListener('click', closeDetailModal);

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    });
  },

  /* ---------- Toast ---------- */
  showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toastMessage');
    if (!toast || !msg) return;
    msg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }
};

/* ---------- Modal Helpers ---------- */
function openAddModal() {
  const addModal = document.getElementById('addModal');
  const itemForm = document.getElementById('itemForm');
  const uploadPreview = document.getElementById('uploadPreview');
  if (addModal) addModal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (itemForm) itemForm.reset();
  if (uploadPreview) {
    uploadPreview.innerHTML = `
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="6" y="6" width="36" height="36" rx="8" stroke="#bbb" stroke-width="2" stroke-dasharray="4 4"/>
        <path d="M24 18V30M18 24H30" stroke="#bbb" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <p>Arraste uma imagem ou clique para selecionar</p>
      <span class="upload-hint">Suporta JPG, PNG (máx. 5MB)</span>
    `;
  }
  if (typeof UploadModule !== 'undefined' && UploadModule.resetImage) {
    UploadModule.resetImage();
  }
}

function closeAddModal() {
  const addModal = document.getElementById('addModal');
  if (addModal) addModal.classList.remove('active');
  document.body.style.overflow = '';
  if (typeof CameraModule !== 'undefined' && CameraModule.close) {
    CameraModule.close();
  }
}

function closeDetailModal() {
  const detailModal = document.getElementById('detailModal');
  if (detailModal) detailModal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ---------- Global navigateTo ---------- */
function navigateTo(page) {
  App.navigateTo(page);
}

/* ---------- Init on DOM Ready ---------- */
document.addEventListener('DOMContentLoaded', () => {
  AuthModule.init();

  if (AuthModule.hasSession()) {
    document.body.classList.remove('auth-mode');
    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.classList.remove('active');
    window.__wardrobeAppStarted = true;
    App.init();
  } else {
    document.body.classList.add('auth-mode');
    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.classList.add('active');
  }
});
