/* ============================================
   Weather Module — Clima Automático & Sugestão IA Estrita
   ============================================ */

const WeatherModule = {
  state: {
    username: null,
    suggested: null
  },

  init() {
    this.bindActions();
    this.refresh();
  },

  refresh() {
    this.fetchAndRender();
  },

  /* ---------- Helpers de Clima e Armazenamento ---------- */
  liveWeather() {
    try { return JSON.parse(localStorage.getItem('wardrobe_live_weather')) || null; }
    catch (e) { return null; }
  },

  saveLiveWeather(data) {
    localStorage.setItem('wardrobe_live_weather', JSON.stringify(data));
  },

  getWeather() {
    const live = this.liveWeather();
    if (live) {
      const loc = live.locationDisplay || (live.state ? `${live.city}, ${live.state}` : live.city) || this.getSessionLocation();
      const tempVal = typeof live.temp === 'number' ? Math.round(live.temp) : 22;
      return {
        city: loc,
        temp: tempVal,
        condition: live.condition || 'Nublado',
        humidity: live.humidity || 60,
        wind: live.wind || 10,
        uv: live.uv || 0,
        rainy: !!live.rainy
      };
    }

    return {
      city: this.getSessionLocation(),
      temp: '--',
      condition: 'Detectando...',
      humidity: '--',
      wind: '--',
      uv: 0,
      rainy: false
    };
  },

  getSessionLocation() {
    try {
      const s = JSON.parse(localStorage.getItem('wardrobe_session'));
      if (s) {
        if (s.location) return s.location;
        if (s.city && s.state) return `${s.city}, ${s.state}`;
        if (s.city) return s.city;
      }
    } catch (e) { /* sem sessão */ }
    const live = this.liveWeather();
    if (live && live.locationDisplay) return live.locationDisplay;
    if (live && live.city) return live.state ? `${live.city}, ${live.state}` : live.city;
    return 'São Paulo, SP';
  },

  async fetchAndRender() {
    this.render();

    let city = 'São Paulo';
    let state = 'SP';
    try {
      const s = JSON.parse(localStorage.getItem('wardrobe_session'));
      if (s) {
        city = s.city || city;
        state = s.state || state;
      }
    } catch (e) { }

    let weather = null;
    if (typeof DetectWeather !== 'undefined' && DetectWeather.fetchWeatherByLocation) {
      weather = await DetectWeather.fetchWeatherByLocation(city, state);
    }
    if (weather) {
      this.saveLiveWeather(weather);
    }
    this.render();
  },

  /* ---------- Faixa Térmica Baseada na Temperatura Real ---------- */
  bandKey() {
    const w = this.getWeather();
    if (w.temp === '--') return 'ameno';
    const t = Number(w.temp);
    if (t < 17) return 'frio';       // Abaixo de 17°C -> Frio / Casacos Pesados / Calças Térmicas / Botas
    if (t < 24) return 'ameno';      // Entre 17°C e 23°C -> Meia-estação / Sobreposições Leves / Chinos
    return 'calor';                  // 24°C ou mais -> Calor / Bermudas / Linho / Sandálias / Óculos de Sol
  },

  bandLabel() {
    const w = this.getWeather();
    if (w.rainy) return 'Chuva & Proteção';
    return {
      frio: 'Frio Intenso',
      ameno: 'Clima Ameno',
      calor: 'Calor & Sol'
    }[this.bandKey()];
  },

  getGreeting() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Bom dia';
    if (h >= 12 && h < 18) return 'Boa tarde';
    return 'Boa noite';
  },

  getUserName() {
    if (this.state.username === null) {
      let name = null;
      try {
        const s = JSON.parse(localStorage.getItem('wardrobe_session'));
        if (s) name = s.name;
      } catch (e) { /* sessão */ }
      this.state.username = name || localStorage.getItem('wardrobe_user_name') || 'Helena';
    }
    return this.state.username;
  },

  feelsLike() {
    const w = this.getWeather();
    if (w.temp === '--') return '--';
    const { temp, wind, humidity, rainy } = w;
    let felt = Number(temp);
    if (felt <= 15 && typeof wind === 'number') felt -= Math.min(wind, 40) * 0.4;
    if (felt >= 23 && typeof humidity === 'number') felt += (humidity - 50) * 0.05;
    if (rainy && felt >= 15) felt -= 1.5;
    return Math.round(felt);
  },

  getTip() {
    const band = this.bandKey();
    const w = this.getWeather();
    const tempStr = w.temp === '--' ? '' : ` (${w.temp}°C)`;

    if (w.rainy) {
      return `Chuva no radar${tempStr}! Recomendamos tecidos impermeáveis, jaqueta corta-vento, calçados fechados e evitar peças que arrastem no chão.`;
    }
    return {
      frio: `Dia frio${tempStr}! Proteja-se com sobretudo ou jaqueta puffer acolchoada, camisa térmica ou flanela, calça de lã/cotelê e calçado fechado.`,
      ameno: `Clima fresco e agradável${tempStr}. Ideal para sobreposição leve (cardigan ou bomber), camisa polo/oxford e calça chino confortável.`,
      calor: `Dia quente e ensolarado${tempStr}! Priorize bermudas ou shorts frescos, camisas de linho/algodão leve, calçados abertos ou respiráveis e proteção solar.`
    }[band];
  },

  getOccasion() {
    const band = this.bandKey();
    const w = this.getWeather();
    const tempStr = w.temp === '--' ? '' : ` • ${w.temp}°C`;

    if (w.rainy) return `Outfit Protegido para Chuva${tempStr}`;
    return {
      frio: `Outfit Térmico para Frio Intenso${tempStr}`,
      ameno: `Look Meia-Estação • Reuniões & Trabalho${tempStr}`,
      calor: `Look Fresco de Verão • Dias Quentes${tempStr}`
    }[band];
  },

  /* ---------- Definição dos Slots Dinâmicos por Faixa Climática ---------- */
  getSlotsForBand(band) {
    if (band === 'calor') {
      return [
        {
          key: 'accessory',
          label: 'Acessório / Proteção Solar',
          categories: ['acessorios'],
          reason: 'Proteção UV400 e estilo para dias de sol'
        },
        {
          key: 'base',
          label: 'Camisa / Camiseta Leve',
          categories: ['camisas'],
          reason: 'Tecido 100% respirável e fresco contra o calor'
        },
        {
          key: 'bottom',
          label: 'Bermuda ou Short Fresco',
          categories: ['shorts', 'calcas'],
          reason: 'Corte ventilado e confortável para temperaturas altas'
        },
        {
          key: 'shoes',
          label: 'Calçado Leve / Verão',
          categories: ['calcados', 'sapatos'],
          reason: 'Conforto e ventilação térmica para os pés'
        }
      ];
    } else if (band === 'ameno') {
      return [
        {
          key: 'layer',
          label: 'Sobreposição Leve',
          categories: ['casacos', 'camisas'],
          reason: 'Camada versátil para a brisa fresca'
        },
        {
          key: 'base',
          label: 'Camisa / Polo Estruturada',
          categories: ['camisas'],
          reason: 'Toque agradável e elegância casual'
        },
        {
          key: 'bottom',
          label: 'Calça Casual / Chino',
          categories: ['calcas'],
          reason: 'Caimento versátil para o clima ameno'
        },
        {
          key: 'shoes',
          label: 'Calçado Casual',
          categories: ['calcados', 'sapatos'],
          reason: 'Equilíbrio e conforto para o dia a dia'
        }
      ];
    } else { // frio
      return [
        {
          key: 'layer',
          label: 'Casaco Pesado / Sobretudo',
          categories: ['casacos'],
          reason: 'Isolamento térmico robusto contra o frio'
        },
        {
          key: 'base',
          label: 'Camisa Térmica / Flanela',
          categories: ['camisas'],
          reason: 'Segunda pele macia e aconchegante'
        },
        {
          key: 'bottom',
          label: 'Calça Térmica / Encorpada',
          categories: ['calcas'],
          reason: 'Tecido grosso que retém o calor corporal'
        },
        {
          key: 'shoes',
          label: 'Bota / Calçado Fechado',
          categories: ['calcados', 'sapatos'],
          reason: 'Solado seguro e proteção completa contra o frio'
        }
      ];
    }
  },

  /* ---------- Engine de Pontuação Térmica Estrita ---------- */
  scoreItem(item, slotKey, band, weather) {
    const sub = (item.subcategory || '').toLowerCase();
    const mat = (item.material || '').toLowerCase();
    const name = (item.name || '').toLowerCase();
    const cat = item.category;
    const hay = `${name} ${sub} ${mat} ${cat}`.toLowerCase();
    let score = 50; // Base score

    /* ==================== 1. FAIXA: CALOR (>= 24°C) ==================== */
    if (band === 'calor') {
      // PENALIDADE MÁXIMA PARA ROUPAS PESADAS / FRIO (NUNCA SUGERIR TERNO, COURO, LÃ, MOLETOM OU VELUDO NO CALOR)
      if (/lã|la |veludo|cotelê|puffer|sobretudo|flanela|sherpa|pesad|coturno|bota |hiking|gorro|cachecol|moletom|forrad|inverno|termic/.test(hay)) {
        return -999;
      }
      if (item.season === 'inverno') return -999;

      if (slotKey === 'accessory') {
        if (/óculos|oculos|aviador|solar|uv|boné|bone|dad hat/.test(hay)) score += 100;
        else if (/relogio|relógio|carteira|cinto/.test(hay)) score += 40;
        else score -= 100;
      }

      if (slotKey === 'base') {
        if (/linho|pima|egípcio|egipcio|manga curta|careca|respirável|respiravel|verao|fresco/.test(hay)) score += 100;
        if (/polo/.test(hay)) score += 50;
        if (/manga longa|oxford|social|estruturada/.test(hay)) score -= 30;
      }

      if (slotKey === 'bottom') {
        // No calor, priorizar ABSOLUTAMENTE shorts e bermudas
        if (cat === 'shorts' || /bermuda|short|tactel|praia/.test(hay)) score += 150;
        else if (/linho/.test(hay)) score += 40;
        else score -= 100; // Calças normais recebem penalidade forte
      }

      if (slotKey === 'shoes') {
        if (/sandália|sandalia|birken|perfurado|slip-on|slip on|respirável|minimalista|verao/.test(hay)) score += 120;
        if (/running|ultraboost|vans|skate/.test(hay)) score += 60;
        if (/derby|social|loafer|penny/.test(hay)) score -= 20;
      }
    }

    /* ==================== 2. FAIXA: CLIMA AMENO (17°C - 23°C) ==================== */
    else if (band === 'ameno') {
      // Evitar extremos de inverno congelante e extremos de praia
      if (/sobretudo.*batida|puffer.*neve|short praia|tactel/.test(hay)) return -500;

      if (slotKey === 'layer') {
        if (/bomber|cardigan|corta-vento|corta vento|jeans western|blazer/.test(hay)) score += 120;
        if (/pesad|lã batida|puffer/.test(hay)) score -= 100;
      }

      if (slotKey === 'base') {
        if (/oxford|polo|henley|pima|camisa social/.test(hay)) score += 100;
        if (/flanela/.test(hay)) score -= 20;
      }

      if (slotKey === 'bottom') {
        if (/chino|jeans slim|cargo|alfaiataria/.test(hay)) score += 120;
        if (cat === 'shorts') score -= 50;
      }

      if (slotKey === 'shoes') {
        if (/minimalista|loafer|penny|mocassim|vans|sneaker/.test(hay)) score += 100;
        if (/coturno tratorado|sandalia|sandália/.test(hay)) score -= 40;
      }
    }

    /* ==================== 3. FAIXA: FRIO INTENSO (< 17°C) ==================== */
    else {
      // PENALIDADE MÁXIMA PARA ROUPAS DE CALOR (NUNCA SUGERIR SHORT, BERMUDA, REGATA OU SANDÁLIA NO FRIO)
      if (/short|bermuda|tactel|praia|sandália|sandalia|birken|regata|manga curta linho/.test(hay)) {
        return -999;
      }
      if (item.season === 'verao') return -999;

      if (slotKey === 'layer') {
        if (/sobretudo|lã batida|puffer|suéter|sueter|merino|sherpa|pesad|moletom canguru/.test(hay)) score += 150;
        if (/corta-vento|cardigan/.test(hay)) score += 40;
      }

      if (slotKey === 'base') {
        if (/flanela|xadrez|henley|manga longa|oxford|social.*inverno/.test(hay)) score += 120;
        if (/manga curta|pima leve/.test(hay)) score -= 50;
      }

      if (slotKey === 'bottom') {
        if (/lã fria|la fria|veludo|cotelê|cotele|moletom|raw denim|jeans.*escuro/.test(hay)) score += 140;
        if (/linho offwhite/.test(hay)) return -999;
      }

      if (slotKey === 'shoes') {
        if (/bota|chelsea|coturno|tratorado|hiking|nobuck|derby/.test(hay)) score += 140;
        if (/slip-on perfurado|perfurado|canvas/.test(hay)) score -= 80;
      }
    }

    /* ==================== FATOR CHUVA ==================== */
    if (weather.rainy) {
      if (/imperme|repelente|gabardine|trench|corta-vento|hidrofug|tratorado|hiking/.test(hay)) score += 80;
      if (slotKey === 'shoes') {
        if (/sandália|sandalia|perfurado|camurça|lona/.test(hay)) return -999;
        if (/bota|chelsea|coturno|couro legítimo/.test(hay)) score += 100;
      }
    }

    /* Preferência de Estação */
    const seasonAffinity = {
      calor: ['verao', 'primavera'],
      ameno: ['primavera', 'outono'],
      frio: ['inverno', 'outono']
    }[band] || [];
    if (seasonAffinity.includes(item.season)) score += 20;

    /* Leve bônus de variedade de uso */
    score += Math.min((item.timesUsed || 0) * 0.2, 5);

    return score;
  },

  /* ---------- Computação da Sugestão Climática Inteligente ---------- */
  computeSuggestion() {
    const band = this.bandKey();
    const weather = this.getWeather();
    const slots = this.getSlotsForBand(band);
    const allItems = WardrobeDB.getItems();
    const usedIds = new Set();
    const result = {};

    slots.forEach(slot => {
      const candidates = allItems.filter(item => slot.categories.includes(item.category));
      const scored = candidates
        .map(item => ({
          item,
          score: this.scoreItem(item, slot.key, band, weather)
        }))
        .filter(c => !usedIds.has(c.item.id) && c.score > -100)
        .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name));

      if (scored.length > 0) {
        const best = scored[0].item;
        usedIds.add(best.id);
        result[slot.key] = {
          item: best,
          label: slot.label,
          reason: slot.reason
        };
      } else {
        result[slot.key] = {
          item: null,
          label: slot.label,
          reason: slot.reason
        };
      }
    });

    return result;
  },

  /* ---------- Renderização do Dashboard Climático ---------- */
  render() {
    this.renderHero();
    this.renderConditions();
    this.renderSuggestion();
  },

  renderHero() {
    const w = this.getWeather();
    const greet = document.getElementById('heroGreetLabel');
    if (greet) greet.textContent = `${this.getGreeting()},`;

    const nameEl = document.getElementById('heroName');
    if (nameEl) nameEl.textContent = this.getUserName();

    const weatherText = document.getElementById('heroWeatherText');
    if (weatherText) {
      const tempDisplay = w.temp === '--' ? '—' : `${w.temp}°C`;
      weatherText.textContent = `${tempDisplay} ${w.city}, ${w.condition}`;
    }

    const caption = document.getElementById('heroCaption');
    if (caption) caption.textContent = this.getTip();
  },

  renderConditions() {
    const w = this.getWeather();
    const tempEl = document.getElementById('wTemp');
    if (tempEl) tempEl.textContent = w.temp === '--' ? '—' : `${w.temp}°`;

    const cityEl = document.getElementById('wCity');
    if (cityEl) cityEl.textContent = w.city;

    const condEl = document.getElementById('wCondition');
    if (condEl) condEl.textContent = w.condition;

    const statusTag = document.getElementById('wStatusTag');
    if (statusTag) statusTag.textContent = this.bandLabel();

    const feelsEl = document.getElementById('wFeels');
    if (feelsEl) {
      feelsEl.textContent = w.temp === '--' ? 'Sensação térmica —' : `Sensação térmica ${this.feelsLike()}°C`;
    }

    const humEl = document.getElementById('wHumidity');
    if (humEl) humEl.textContent = w.humidity === '--' ? '—' : `${w.humidity}%`;

    const windEl = document.getElementById('wWind');
    if (windEl) windEl.textContent = w.wind === '--' ? '—' : `${w.wind} km/h`;

    const uvEl = document.getElementById('wUv');
    if (uvEl) uvEl.textContent = w.uv || '—';

    const fill = document.getElementById('wUvFill');
    if (fill) {
      fill.style.width = `${Math.min(((w.uv || 0) / 11) * 100, 100)}%`;
      fill.className = 'uv-fill' + ((w.uv || 0) >= 8 ? ' high' : (w.uv || 0) >= 3 ? ' mid' : ' low');
    }

    this.playSwap('weatherPanel');
  },

  renderSuggestion() {
    const grid = document.getElementById('suggestGrid');
    if (!grid) return;

    const result = this.computeSuggestion();
    this.state.suggested = result;
    const band = this.bandKey();
    const noItems = WardrobeDB.getItems().length === 0;

    const titleEl = document.getElementById('suggestTitle');
    if (titleEl) titleEl.textContent = this.getOccasion();

    const slots = this.getSlotsForBand(band);

    grid.innerHTML = slots.map(slot => {
      const slotData = result[slot.key];
      const item = slotData ? slotData.item : null;

      if (!item) {
        return `
          <div class="piece-card placeholder">
            <div class="piece-img"><span class="piece-emoji">✦</span></div>
            <div class="piece-body">
              <div class="piece-role">${slot.label}</div>
              <div class="piece-name">Sem peça adequada</div>
              <div class="piece-meta"><span>${noItems ? 'Cadastre peças no armário' : 'Adicione peças para este clima'}</span></div>
            </div>
          </div>`;
      }

      const img = item.image
        ? `<img src="${item.image}" alt="${item.name}">`
        : `<span class="piece-emoji">${WardrobeDB.categoryEmojis[item.category] || '👕'}</span>`;

      const uses = item.timesUsed || 0;
      const cpw = WardrobeDB.getCPW(item);
      const specificReason = this.pieceSpecificReason(slot.key, item, band);

      return `
        <div class="piece-card">
          <div class="piece-img">${img}</div>
          <div class="piece-body">
            <div class="piece-role">${slot.label}</div>
            <div class="piece-name" title="${item.name}">${item.name}</div>
            <div class="piece-brand">${item.brand || 'Sem marca'}</div>
            <div class="piece-meta">
              <span class="piece-use">${uses === 0 ? 'Nunca usada' : `Usada ${uses}×`}</span>
              <span class="piece-cpw" title="Custo por uso">${cpw ? `${WardrobeDB.formatBRL(cpw)}/uso` : '—'}</span>
            </div>
            <div class="piece-reason">${specificReason}</div>
          </div>
        </div>`;
    }).join('');

    this.playSwap('suggestGrid');
  },

  pieceSpecificReason(slotKey, item, band) {
    const w = this.getWeather();
    const mat = (item.material || '').toLowerCase();

    if (w.rainy && (slotKey === 'shoes' || slotKey === 'layer')) {
      return /imperme|hidrofug|gabardine|trench|bota/.test(mat)
        ? 'Proteção impermeável contra a chuva'
        : 'Fechado e seguro contra poças';
    }

    if (band === 'calor') {
      if (slotKey === 'accessory') return 'Proteção solar UV e conforto térmico';
      if (slotKey === 'base') return 'Tecido leve e respirável para o calor';
      if (slotKey === 'bottom') return 'Bermuda fresca ideal para temperatura alta';
      if (slotKey === 'shoes') return 'Ventilação e leveza nos pés';
    } else if (band === 'frio') {
      if (slotKey === 'layer') return 'Isolamento térmico pesado contra vento e frio';
      if (slotKey === 'base') return 'Camada quente e aconchegante';
      if (slotKey === 'bottom') return 'Tecido encorpado que retém o calor';
      if (slotKey === 'shoes') return 'Bota fechada para proteger do frio';
    } else {
      if (slotKey === 'layer') return 'Sobreposição leve para a brisa fresca';
      if (slotKey === 'base') return 'Algodão estruturado de meia-estação';
      if (slotKey === 'bottom') return 'Caimento versátil para o clima ameno';
      if (slotKey === 'shoes') return 'Conforto equilibrado para o dia';
    }

    return slotKey;
  },

  playSwap(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('re-render');
    void el.offsetWidth;
    el.classList.add('re-render');
  },

  /* ---------- Eventos e Ações ---------- */
  bindActions() {
    const editBtn = document.getElementById('editNameBtn');
    if (editBtn) editBtn.addEventListener('click', () => this.editName());

    const wearBtn = document.getElementById('wearLookBtn');
    if (wearBtn) wearBtn.addEventListener('click', () => this.registerLookUsed());

    const custBtn = document.getElementById('customizeBtn');
    if (custBtn) custBtn.addEventListener('click', () => this.customize());

    const refBtn = document.getElementById('refreshWeather');
    if (refBtn) refBtn.addEventListener('click', () => this.onRefresh());
  },

  async onRefresh() {
    const btn = document.getElementById('refreshWeather');
    if (btn) {
      btn.style.pointerEvents = 'none';
      btn.style.opacity = '0.5';
    }
    localStorage.removeItem('wardrobe_live_weather');
    await this.fetchAndRender();
    if (btn) {
      btn.style.pointerEvents = '';
      btn.style.opacity = '';
    }
    if (typeof App !== 'undefined' && App.showToast) App.showToast('Clima e look atualizados');
  },

  editName() {
    const name = prompt('Seu nome na saudação:', this.getUserName());
    if (name === null) return;
    const n = name.trim().slice(0, 24);
    if (n) {
      localStorage.setItem('wardrobe_user_name', n);
      this.state.username = null;
      this.renderHero();
    }
  },

  registerLookUsed() {
    const s = this.state.suggested || {};
    const items = Object.values(s)
      .map(entry => entry && entry.item)
      .filter(Boolean);

    if (items.length === 0) {
      if (typeof App !== 'undefined' && App.showToast) App.showToast('Nenhum item sugerido para registrar');
      return;
    }

    items.forEach(item => {
      WardrobeDB.updateItem(item.id, { timesUsed: (item.timesUsed || 0) + 1 });
    });

    this.renderSuggestion();
    if (typeof DashboardModule !== 'undefined' && DashboardModule.refresh) DashboardModule.refresh();
    if (typeof App !== 'undefined' && App.showToast) {
      App.showToast(`Look registrado · ${items.length} ${items.length === 1 ? 'peça' : 'peças'} atualizadas`);
    }
  },

  customize() {
    const s = this.state.suggested || {};
    const items = Object.values(s)
      .map(entry => entry && entry.item)
      .filter(Boolean);

    if (items.length === 0) {
      if (typeof App !== 'undefined' && App.showToast) App.showToast('Nenhum look sugerido para personalizar');
      return;
    }

    if (typeof OutfitBuilderModule !== 'undefined') {
      OutfitBuilderModule.reset();

      // Mapear inteligentemente cada peça para sua respectiva zona do outfit builder
      items.forEach(item => {
        const zone = WardrobeDB.categoryZone[item.category] || 'accessories';
        OutfitBuilderModule.state.selected[zone] = item;
      });

      OutfitBuilderModule.renderZones();
      OutfitBuilderModule.renderPalette();
    }

    if (typeof App !== 'undefined') {
      App.navigateTo('outfits');
      App.showToast('Look sugerido carregado no Montador de Outfits!');
    }
  }
};
