/* ============================================
   Inventory Module — Grid, Filters, Search
   ============================================ */

const InventoryModule = {
  state: {
    view: 'grid',
    search: '',
    filters: {
      category: new Set(),
      color: new Set(),
      season: new Set(),
      occasion: new Set()
    },
    paletteFilter: 'all'
  },

  init() {
    this.bindSearch();
    this.bindViewToggles();
    this.bindFilters();
    this.bindColorFilters();
    this.bindClearFilters();
    this.bindGenerateSample();
  },

  refresh() {
    this.render();
  },

  bindGenerateSample() {
    const btn = document.getElementById('generateSampleBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        WardrobeDB.seedDefaultData(true);
        this.render();
        if (typeof DashboardModule !== 'undefined' && DashboardModule.refresh) DashboardModule.refresh();
        if (typeof OutfitBuilderModule !== 'undefined' && OutfitBuilderModule.refresh) OutfitBuilderModule.refresh();
        if (typeof WeatherModule !== 'undefined' && WeatherModule.refresh) WeatherModule.refresh();
        if (typeof App !== 'undefined' && App.showToast) App.showToast('✨ 60 peças (10 por categoria) geradas com sucesso!');
      });
    }
  },

  /* ---------- Getters ---------- */
  getFilteredItems() {
    let items = WardrobeDB.getItems();
    const { search, filters } = this.state;

    if (search) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.subcategory || '').toLowerCase().includes(search.toLowerCase()) ||
        (item.brand || '').toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filters.category.size > 0) {
      items = items.filter(item => filters.category.has(item.category));
    }
    if (filters.color.size > 0) {
      items = items.filter(item => filters.color.has(item.color));
    }
    if (filters.season.size > 0) {
      items = items.filter(item => filters.season.has(item.season));
    }
    if (filters.occasion.size > 0) {
      items = items.filter(item => filters.occasion.has(item.occasion));
    }

    return items;
  },

  /* ---------- Filter Bindings ---------- */
  bindSearch() {
    const input = document.getElementById('searchInput');
    input.addEventListener('input', (e) => {
      this.state.search = e.target.value;
      this.render();
    });
  },

  bindViewToggles() {
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.view = btn.dataset.view;
        this.render();
      });
    });
  },

  bindFilters() {
    document.querySelectorAll('input[data-filter]').forEach(input => {
      input.addEventListener('change', () => {
        const set = this.state.filters[input.dataset.filter];
        if (input.checked) {
          set.add(input.value);
        } else {
          set.delete(input.value);
        }
        this.render();
      });
    });
  },

  bindColorFilters() {
    document.querySelectorAll('.color-dot').forEach(btn => {
      btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        btn.classList.toggle('active');
        const set = this.state.filters.color;
        if (set.has(color)) set.delete(color);
        else set.add(color);
        this.render();
      });
    });
  },

  bindClearFilters() {
    const clearBtn = document.getElementById('clearFilters');
    clearBtn.addEventListener('click', () => {
      this.state.filters = {
        category: new Set(),
        color: new Set(),
        season: new Set(),
        occasion: new Set()
      };
      document.querySelectorAll('input[data-filter]').forEach(i => i.checked = false);
      document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
      this.render();
    });
  },

  /* ---------- Render ---------- */
  render() {
    const items = this.getFilteredItems();
    const grid = document.getElementById('itemsGrid');
    const empty = document.getElementById('emptyState');
    const count = document.getElementById('resultsCount');

    grid.classList.toggle('list-view', this.state.view === 'list');
    count.textContent = `${items.length} ${items.length === 1 ? 'peça' : 'peças'}`;

    if (items.length === 0) {
      grid.innerHTML = '';
      empty.style.display = 'block';
      return;
    }

    empty.style.display = 'none';
    grid.innerHTML = items.map(item => this.itemCardHTML(item)).join('');

    this.attachCardEvents(grid);
  },

  itemCardHTML(item) {
    const imgContent = item.image
      ? `<img src="${item.image}" alt="${item.name}">`
      : (WardrobeDB.categoryEmojis[item.category] || '👕');
    const colorHex = WardrobeDB.colorHex[item.color] || '#ccc';
    const catLabel = WardrobeDB.categoryLabels[item.category] || item.category;

    return `
      <div class="item-card" data-id="${item.id}">
        <div class="item-card-img">
          ${imgContent}
          <button class="item-card-drag" draggable="true" data-drag-id="${item.id}" title="Arrastar para outfit">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6H12M4 10H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="item-card-body">
          <div class="item-card-name">${item.name}</div>
          <div class="item-card-meta">
            <span class="item-card-badge">${catLabel}</span>
            <span class="item-card-color" style="background:${colorHex}" title="${WardrobeDB.colorLabels[item.color] || item.color}"></span>
          </div>
        </div>
      </div>
    `;
  },

  attachCardEvents(container) {
    container.querySelectorAll('.item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.item-card-drag')) return;
        this.openDetail(card.dataset.id);
      });
    });

    container.querySelectorAll('.item-card-drag').forEach(dragEl => {
      dragEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', dragEl.dataset.dragId);
        e.dataTransfer.effectAllowed = 'copy';
      });
    });
  },

  /* ---------- Detail Modal ---------- */
  openDetail(id) {
    const item = WardrobeDB.getItemById(id);
    const modal = document.getElementById('detailModal');

    const imgContent = item.image
      ? `<img src="${item.image}" alt="${item.name}">`
      : (WardrobeDB.categoryEmojis[item.category] || '👕');

    const rows = [
      { label: 'Categoria', value: WardrobeDB.categoryLabels[item.category] || '-' },
      { label: 'Subcategoria', value: item.subcategory || '-' },
      { label: 'Cor', value: WardrobeDB.colorLabels[item.color] || '-' },
      { label: 'Estação', value: WardrobeDB.seasonLabels[item.season] || '-' },
      { label: 'Ocasião', value: WardrobeDB.occasionLabels[item.occasion] || '-' },
      { label: 'Marca', value: item.brand || '-' },
      { label: 'Material', value: item.material || '-' },
      { label: 'Preço', value: item.price ? WardrobeDB.formatBRL(item.price) : '-' },
      { label: 'Custo por uso', value: WardrobeDB.getCPW(item) ? WardrobeDB.formatBRL(WardrobeDB.getCPW(item)) : '-' },
      { label: 'Vezes usada', value: item.timesUsed || 0 }
    ];

    document.getElementById('detailTitle').textContent = item.name;

    const infoHTML = rows.map(r => `
      <div class="detail-row">
        <span class="detail-label">${r.label}</span>
        <span class="detail-value">${r.value}</span>
      </div>
    `).join('');

    document.getElementById('detailImage').innerHTML = imgContent;
    document.getElementById('detailInfo').innerHTML = infoHTML;

    const deleteBtn = document.getElementById('deleteItemBtn');
    const newBtn = deleteBtn.cloneNode(true);
    deleteBtn.parentNode.replaceChild(newBtn, deleteBtn);
    newBtn.addEventListener('click', () => {
      WardrobeDB.deleteItem(item.id);
      closeDetailModal();
      this.render();
      App.navigateTo('inventory');
      App.showToast('Peça excluída');
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

/* ============================================
   Upload Module — File & Camera Capture
   ============================================ */

const UploadModule = {
  imageData: null,
  imageFile: null,

  init() {
    this.bindUploadArea();
    this.bindButtons();
    this.bindForm();
  },

  resetImage() {
    this.imageData = null;
    this.imageFile = null;
  },

  setImageData(dataUrl) {
    this.imageData = dataUrl;
    this.imageFile = null;
    const preview = document.getElementById('uploadPreview');
    preview.innerHTML = `<img src="${this.imageData}" alt="Preview da peça">`;
    preview.querySelector('p')?.remove();
    preview.querySelector('span')?.remove();
  },

  bindUploadArea() {
    const area = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    area.addEventListener('click', (e) => {
      if (!e.target.closest('.upload-actions')) {
        fileInput.click();
      }
    });

    area.addEventListener('dragover', (e) => {
      e.preventDefault();
      area.classList.add('dragover');
    });

    area.addEventListener('dragleave', () => {
      area.classList.remove('dragover');
    });

    area.addEventListener('drop', (e) => {
      e.preventDefault();
      area.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) this.handleFile(files[0]);
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        this.handleFile(e.target.files[0]);
      }
    });
  },

  bindButtons() {
    document.getElementById('uploadFileBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('fileInput').click();
    });

    document.getElementById('takePhotoBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('cameraInput').click();
    });

    document.getElementById('cameraInput').addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        this.handleFile(e.target.files[0]);
      }
    });
  },

  handleFile(file) {
    if (!file.type.startsWith('image/')) {
      App.showToast('Por favor, selecione uma imagem');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      App.showToast('Imagem muito grande (máx 5MB)');
      return;
    }

    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageData = e.target.result;
      const preview = document.getElementById('uploadPreview');
      preview.innerHTML = `<img src="${this.imageData}" alt="Preview da peça">`;
      preview.querySelector('p')?.remove();
      preview.querySelector('span')?.remove();
    };
    reader.readAsDataURL(file);
  },

  /* ---------- Form Submit ---------- */
  bindForm() {
    const form = document.getElementById('itemForm');
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('itemName').value.trim();
      const category = document.getElementById('itemCategory').value;
      const subcategory = document.getElementById('itemSubcategory').value.trim();
      const color = document.getElementById('itemColor').value;
      const season = document.getElementById('itemSeason').value;
      const occasion = document.getElementById('itemOccasion').value;
      const brand = document.getElementById('itemBrand').value.trim();
      const price = Number(document.getElementById('itemPrice').value) || 0;
      const material = document.getElementById('itemMaterial').value.trim();

      if (!name || !category || !color || !season) {
        App.showToast('Preencha os campos obrigatórios');
        return;
      }

      let emoji = null;
      if (!this.imageData && !this.imageFile) {
        emoji = WardrobeDB.categoryEmojis[category] || '👕';
      }

      const item = WardrobeDB.createItem({
        name,
        category,
        subcategory,
        color,
        season,
        occasion,
        brand,
        price,
        material,
        image: this.imageData || null,
        emoji
      });

      WardrobeDB.addItem(item);
      closeAddModal();
      InventoryModule.render();
      App.navigateTo('inventory');
      App.showToast('Peça adicionada com sucesso!');
    });
  }
};

/* ---------- Camera Module ---------- */
const CameraModule = {
  stream: null,

  async open() {
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('cameraVideo');

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });

      video.srcObject = this.stream;
      modal.classList.add('active');
    } catch (err) {
      console.error('Camera error:', err);
      App.showToast('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  },

  close() {
    const modal = document.getElementById('cameraModal');
    const video = document.getElementById('cameraVideo');

    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    video.srcObject = null;
    modal.classList.remove('active');
  },

  capture() {
    const video = document.getElementById('cameraVideo');
    const canvas = document.getElementById('cameraCanvas');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    this.close();
    UploadModule.setImageData(dataUrl);
  },

  init() {
    document.getElementById('takePhotoBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      this.open();
    });

    document.getElementById('capturePhoto').addEventListener('click', () => this.capture());
    document.getElementById('closeCameraModal').addEventListener('click', () => this.close());
    document.getElementById('cancelCamera').addEventListener('click', () => this.close());

    document.getElementById('cameraModal').addEventListener('click', (e) => {
      if (e.target.id === 'cameraModal') this.close();
    });
  }
};

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  UploadModule.init();
  CameraModule.init();
});
