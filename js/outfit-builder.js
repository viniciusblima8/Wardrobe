/* ============================================
   Outfit Builder Module — Drag & Drop, Zones
   ============================================ */

const OutfitBuilderModule = {
  state: {
    selected: {
      top: null,
      bottom: null,
      shoes: null,
      accessories: null
    },
    paletteFilter: 'all',
    paletteSearch: ''
  },

  ZONES: ['top', 'bottom', 'shoes', 'accessories'],

  init() {
    this.bindClear();
    this.bindSave();
    this.bindPaletteControls();
  },

  refresh() {
    this.reset();
    this.renderPalette();
    this.renderZones();
  },

  reset() {
    this.state.selected = {
      top: null,
      bottom: null,
      shoes: null,
      accessories: null
    };
  },

  /* ---------- Zone mapping ---------- */
  getZoneForCategory(category) {
    return WardrobeDB.categoryZone[category] || 'accessories';
  },

  /* ---------- Palette render ---------- */
  bindPaletteControls() {
    const paletteSearch = document.getElementById('paletteSearch');
    paletteSearch.addEventListener('input', (e) => {
      this.state.paletteSearch = e.target.value;
      this.renderPalette();
    });

    document.querySelectorAll('.palette-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.palette-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.paletteFilter = btn.dataset.pfilter;
        this.renderPalette();
      });
    });
  },

  renderPalette() {
    let items = WardrobeDB.getItems();
    const { paletteFilter, paletteSearch } = this.state;

    if (paletteFilter !== 'all') {
      items = items.filter(item => this.getZoneForCategory(item.category) === paletteFilter);
    }

    if (paletteSearch) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(paletteSearch.toLowerCase())
      );
    }

    const container = document.getElementById('paletteItems');

    if (items.length === 0) {
      container.innerHTML = `<p style="color:var(--text-tertiary);font-size:13px;text-align:center;padding:20px;">Nenhuma peça encontrada</p>`;
      return;
    }

    container.innerHTML = items.map(item => {
      const zone = this.getZoneForCategory(item.category);
      const used = this.state.selected[zone] && this.state.selected[zone].id === item.id;
      const imgContent = item.image
        ? `<img src="${item.image}" alt="${item.name}">`
        : (WardrobeDB.categoryEmojis[item.category] || '👕');
      const catLabel = WardrobeDB.categoryLabels[item.category] || item.category;

      return `
        <div class="palette-item ${used ? 'used' : ''}" draggable="true" data-id="${item.id}" data-zone="${zone}">
          <div class="palette-item-img">${imgContent}</div>
          <div class="palette-item-info">
            <div class="palette-item-name">${item.name}</div>
            <div class="palette-item-cat">${catLabel}</div>
          </div>
        </div>
      `;
    }).join('');

    this.attachPaletteDrag(container);
  },

  attachPaletteDrag(container) {
    container.querySelectorAll('.palette-item').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', item.dataset.id);
        e.dataTransfer.effectAllowed = 'copy';
      });
    });
  },

  /* ---------- Zones render ---------- */
  renderZones() {
    this.ZONES.forEach(zone => {
      const dropArea = document.querySelector(`.zone-drop-area[data-zone="${zone}"]`);
      const item = this.state.selected[zone];
      const zoneName = this.zoneLabel(zone);

      if (!item) {
        dropArea.innerHTML = `
          <div class="zone-placeholder">
            <p>Arraste ${zone === 'shoes' ? 'um calçado' : (zone === 'accessories' ? 'acessórios' : 'uma peça')} aqui</p>
          </div>
        `;
      } else {
        const imgContent = item.image
          ? `<img src="${item.image}" alt="${item.name}">`
          : (WardrobeDB.categoryEmojis[item.category] || '👕');
        const catLabel = WardrobeDB.categoryLabels[item.category] || item.category;

        dropArea.innerHTML = `
          <div class="zone-item" draggable="true" data-id="${item.id}">
            <div class="zone-item-img">${imgContent}</div>
            <div class="zone-item-info">
              <div class="zone-item-name">${item.name}</div>
              <div class="zone-item-meta">${catLabel}</div>
            </div>
            <button class="zone-item-remove" data-zone="${zone}" title="Remover">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
          </div>
        `;
      }

      this.attachZoneEvents(dropArea, zone);
    });
  },

  zoneLabel(zone) {
    return {
      top: 'Parte Superior',
      bottom: 'Parte Inferior',
      shoes: 'Calçados',
      accessories: 'Acessórios'
    }[zone];
  },

  attachZoneEvents(dropArea, zone) {
    dropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', () => {
      dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.classList.remove('dragover');
      const id = e.dataTransfer.getData('text/plain');
      if (!id) return;
      this.assignToZone(zone, id);
    });

    const removeBtn = dropArea.querySelector('.zone-item-remove');
    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeFromZone(removeBtn.dataset.zone);
      });
    }

    const zoneItem = dropArea.querySelector('.zone-item');
    if (zoneItem) {
      zoneItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', zoneItem.dataset.id);
        e.dataTransfer.effectAllowed = 'move';
      });
    }
  },

  assignToZone(zone, itemId) {
    const item = WardrobeDB.getItemById(itemId);
    if (!item) return;

    const itemZone = this.getZoneForCategory(item.category);

    if (zone !== itemZone) {
      App.showToast(`Essa peça vai na zona ${this.zoneLabel(itemZone)}`);
      return;
    }

    this.state.selected[zone] = item;
    this.renderZones();
    this.renderPalette();
  },

  removeFromZone(zone) {
    this.state.selected[zone] = null;
    this.renderZones();
    this.renderPalette();
  },

  /* ---------- Actions ---------- */
  bindClear() {
    document.getElementById('clearOutfit').addEventListener('click', () => {
      this.reset();
      this.renderZones();
      this.renderPalette();
      App.showToast('Outfit limpo');
    });
  },

  bindSave() {
    document.getElementById('saveOutfit').addEventListener('click', () => {
      const selected = this.state.selected;
      const filled = Object.values(selected).filter(Boolean);

      if (filled.length === 0) {
        App.showToast('Adicione pelo menos uma peça ao outfit');
        return;
      }

      const name = prompt('Nome do outfit:');
      if (name === null) return;

      const outfit = WardrobeDB.createOutfit(name.trim() || 'Outfit', selected);
      WardrobeDB.addOutfit(outfit);

      filled.forEach(item => {
        WardrobeDB.updateItem(item.id, { timesUsed: (item.timesUsed || 0) + 1 });
      });

      this.reset();
      this.renderZones();
      this.renderPalette();
      App.navigateTo('saved-outfits');
      App.showToast('Outfit salvo!');
    });
  }
};
