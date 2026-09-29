/* ============================================
   Auth Module — Login, Cadastro & Clima Real
   ============================================ */

const BRAZIL_STATES = {
  AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia', CE: 'Ceará',
  DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás', MA: 'Maranhão', MT: 'Mato Grosso',
  MS: 'Mato Grosso do Sul', MG: 'Minas Gerais', PA: 'Pará', PB: 'Paraíba', PR: 'Paraná',
  PE: 'Pernambuco', PI: 'Piauí', RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte',
  RS: 'Rio Grande do Sul', RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina',
  SP: 'São Paulo', SE: 'Sergipe', TO: 'Tocantins'
};

const DetectWeather = {
  GEO_OPTIONS: { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 },

  WMO: {
    0: 'Céu Limpo', 1: 'Predominantemente Limpo', 2: 'Parcialmente Nublado', 3: 'Nublado',
    45: 'Neblina', 48: 'Neblina',
    51: 'Garoa', 53: 'Garoa', 55: 'Garoa',
    56: 'Garoa Congelante', 57: 'Garoa Congelante',
    61: 'Chuva Fraca', 63: 'Chuva', 65: 'Chuva Forte',
    66: 'Chuva Congelante', 67: 'Chuva Congelante',
    71: 'Neve Fraca', 73: 'Neve', 75: 'Neve Forte', 77: 'Grãos de Neve',
    80: 'Pancadas de Chuva', 81: 'Chuva Moderada', 82: 'Chuva Violenta',
    85: 'Neve', 86: 'Neve',
    95: 'Trovoadas', 96: 'Trovoadas com Granizo', 99: 'Trovoadas com Granizo'
  },

  getPosition() {
    return new Promise(resolve => {
      if (!navigator.geolocation) return resolve(null);
      navigator.geolocation.getCurrentPosition(
        p => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
        () => resolve(null),
        DetectWeather.GEO_OPTIONS
      );
    });
  },

  async fetchByCEP(rawCep) {
    const cep = (rawCep || '').replace(/\D/g, '');
    if (cep.length !== 8) return null;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!res.ok) return null;
      const d = await res.json();
      if (d.erro) return null;
      return {
        cep: d.cep,
        city: d.localidade,
        state: d.uf,
        stateName: d.estado || BRAZIL_STATES[d.uf] || d.uf,
        neighborhood: d.bairro,
        formatted: `${d.localidade}, ${d.uf}`
      };
    } catch (e) {
      return null;
    }
  },

  async reverseGeocode(lat, lon) {
    try {
      const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=pt`);
      if (!res.ok) return null;
      const d = await res.json();
      
      let state = '';
      if (d.principalSubdivisionCode) {
        state = d.principalSubdivisionCode.replace(/^BR-/, '').toUpperCase();
      }
      if (!state && d.principalSubdivision) {
        for (const [uf, name] of Object.entries(BRAZIL_STATES)) {
          if (name.toLowerCase() === d.principalSubdivision.toLowerCase()) {
            state = uf;
            break;
          }
        }
      }

      const city = d.city || d.locality || d.principalSubdivision || '';
      const stateName = BRAZIL_STATES[state] || d.principalSubdivision || '';

      return {
        city: city || 'São Paulo',
        state: state || 'SP',
        stateName,
        country: d.countryName || 'Brasil',
        formatted: state ? `${city}, ${state}` : city
      };
    } catch (e) {
      return null;
    }
  },

  async byIP() {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const d = await res.json();
        if (d && (d.city || d.region)) {
          let state = (d.region_code || '').toUpperCase();
          if (state.length !== 2) {
            for (const [uf, name] of Object.entries(BRAZIL_STATES)) {
              if (name.toLowerCase() === (d.region || '').toLowerCase()) {
                state = uf;
                break;
              }
            }
          }
          const city = d.city || BRAZIL_STATES[state] || d.region || '';
          return {
            lat: d.latitude,
            lon: d.longitude,
            city,
            state: state.length === 2 ? state : 'SP',
            stateName: d.region || BRAZIL_STATES[state] || '',
            country: d.country_name || 'Brasil',
            formatted: state ? `${city}, ${state}` : city
          };
        }
      }
    } catch (e) { }

    try {
      const res = await fetch('https://ip-api.com/json/?lang=pt-BR');
      if (res.ok) {
        const d = await res.json();
        if (d && d.status === 'success' && (d.city || d.regionName)) {
          let state = (d.region || '').toUpperCase();
          if (state.length !== 2) {
            for (const [uf, name] of Object.entries(BRAZIL_STATES)) {
              if (name.toLowerCase() === (d.regionName || '').toLowerCase()) {
                state = uf;
                break;
              }
            }
          }
          const city = d.city || d.regionName || '';
          return {
            lat: d.lat,
            lon: d.lon,
            city,
            state: state || 'SP',
            stateName: d.regionName || BRAZIL_STATES[state] || '',
            country: d.country || 'Brasil',
            formatted: state ? `${city}, ${state}` : city
          };
        }
      }
    } catch (e) { }

    return null;
  },

  async fetchWeather(lat, lon) {
    try {
      const q = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,uv_index',
        timezone: 'auto'
      });
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?${q}`);
      if (!res.ok) return null;
      const d = await res.json();
      const c = d.current || {};
      const condition = DetectWeather.WMO[c.weather_code] || 'Nublado';
      return {
        temp: Math.round(c.temperature_2m),
        feels: Math.round(c.apparent_temperature),
        humidity: Math.round(c.relative_humidity_2m),
        wind: Math.round(c.wind_speed_10m),
        uv: Math.round(c.uv_index || 0),
        condition,
        rainy: /chuva|garoa|trovoada|neve|neblina/i.test(condition),
        src: 'AO VIVO'
      };
    } catch (e) { return null; }
  },

  async fetchWeatherByLocation(city, state) {
    try {
      const cleanCep = (city || '').replace(/\D/g, '');
      if (cleanCep.length === 8) {
        const cepData = await DetectWeather.fetchByCEP(cleanCep);
        if (cepData) {
          city = cepData.city;
          state = cepData.state;
        }
      }

      const stateName = BRAZIL_STATES[state] || state || '';
      const searchQuery = [city, stateName, 'Brasil'].filter(Boolean).join(' ');

      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery)}&count=5&language=pt&format=json`);
      if (!geoRes.ok) return null;
      const geoData = await geoRes.json();

      let match = null;
      if (geoData.results && geoData.results.length > 0) {
        if (state) {
          match = geoData.results.find(r => 
            (r.admin1 && r.admin1.toLowerCase().includes(stateName.toLowerCase())) ||
            (r.country_code === 'BR')
          ) || geoData.results[0];
        } else {
          match = geoData.results[0];
        }
      }

      if (!match) {
        const fallbackRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city || stateName || 'São Paulo')}&count=1&language=pt&format=json`);
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          if (fallbackData.results && fallbackData.results.length > 0) {
            match = fallbackData.results[0];
          }
        }
      }

      if (!match) return null;

      const { latitude, longitude, name, admin1 } = match;
      const weather = await DetectWeather.fetchWeather(latitude, longitude);
      if (!weather) return null;

      const resolvedState = state || (admin1 ? Object.keys(BRAZIL_STATES).find(k => BRAZIL_STATES[k].toLowerCase() === admin1.toLowerCase()) : '') || '';
      const displayCity = name || city;
      const displayLocation = resolvedState ? `${displayCity}, ${resolvedState}` : displayCity;

      return {
        ...weather,
        city: displayCity,
        state: resolvedState,
        locationDisplay: displayLocation,
        lat: latitude,
        lon: longitude
      };
    } catch (e) { return null; }
  },

  band(temp) {
    if (temp < 15) return 'frio';
    if (temp <= 22) return 'ameno';
    return 'calor';
  },

  async detect() {
    const pos = await DetectWeather.getPosition();
    if (pos) {
      const [geo, weather] = await Promise.all([
        DetectWeather.reverseGeocode(pos.lat, pos.lon),
        DetectWeather.fetchWeather(pos.lat, pos.lon)
      ]);
      if (weather) {
        const city = (geo && geo.city) || 'São Paulo';
        const state = (geo && geo.state) || 'SP';
        const display = state ? `${city}, ${state}` : city;
        return {
          ...weather,
          city,
          state,
          locationDisplay: display,
          country: (geo && geo.country) || 'Brasil',
          src: 'GPS AO VIVO',
          sourceType: 'gps'
        };
      }
    }

    const ip = await DetectWeather.byIP();
    if (ip && ip.lat && ip.lon) {
      const weather = await DetectWeather.fetchWeather(ip.lat, ip.lon);
      if (weather) {
        const display = ip.state ? `${ip.city}, ${ip.state}` : ip.city;
        return {
          ...weather,
          city: ip.city,
          state: ip.state || 'SP',
          locationDisplay: display,
          country: ip.country || 'Brasil',
          src: 'REDE AO VIVO',
          sourceType: 'ip'
        };
      }
    }
    return null;
  }
};

const AuthModule = {
  KEYS: {
    users: 'wardrobe_users',
    session: 'wardrobe_session',
    live: 'wardrobe_live_weather'
  },

  state: {
    status: 'detecting',
    live: null
  },

  /* ---------- Sessão & Usuários ---------- */
  hasSession() {
    return !!localStorage.getItem(AuthModule.KEYS.session);
  },

  getSession() {
    try { return JSON.parse(localStorage.getItem(AuthModule.KEYS.session)) || null; }
    catch (e) { return null; }
  },

  getUsers() {
    try { return JSON.parse(localStorage.getItem(AuthModule.KEYS.users)) || []; }
    catch (e) { return []; }
  },

  saveUsers(list) {
    localStorage.setItem(AuthModule.KEYS.users, JSON.stringify(list));
  },

  getLiveWeather() {
    try { return JSON.parse(localStorage.getItem(AuthModule.KEYS.live)) || null; }
    catch (e) { return null; }
  },

  saveLiveWeather(w) {
    localStorage.setItem(AuthModule.KEYS.live, JSON.stringify(w));
  },

  sessionCity() {
    const s = AuthModule.getSession();
    const live = AuthModule.getLiveWeather();
    return (s && (s.location || (s.state ? `${s.city}, ${s.state}` : s.city))) || (live && (live.locationDisplay || live.city)) || 'São Paulo, SP';
  },

  /* ---------- Clima ---------- */
  currentWeather() {
    return AuthModule.state.live;
  },

  feels(w) {
    let f = w.temp;
    if (w.temp <= 15) f -= Math.min(w.wind, 40) * 0.5;
    if (w.temp >= 23) f += (w.humidity - 50) * 0.06;
    if (w.rainy && w.temp >= 15) f -= 1.5;
    return Math.round(f);
  },

  async loadWeather(force) {
    const existing = AuthModule.getLiveWeather();
    if (existing && !force) {
      AuthModule.state.live = existing;
      AuthModule.state.status = 'live';
      AuthModule.renderWeather(false);
      AuthModule.syncFormWithLocation(existing);
      return;
    }

    AuthModule.state.status = 'detecting';
    AuthModule.renderWeather(true);

    const detected = await DetectWeather.detect();
    if (detected) {
      AuthModule.state.live = detected;
      AuthModule.state.status = 'live';
      AuthModule.saveLiveWeather(detected);
      AuthModule.syncFormWithLocation(detected);
    } else {
      AuthModule.state.status = 'sim';
    }
    AuthModule.renderWeather(false);
  },

  async loadWeatherByLocation(city, state) {
    AuthModule.state.status = 'detecting';
    AuthModule.renderWeather(true);

    const weather = await DetectWeather.fetchWeatherByLocation(city, state);
    if (weather) {
      AuthModule.state.live = weather;
      AuthModule.state.status = 'live';
      AuthModule.saveLiveWeather(weather);
    } else {
      AuthModule.state.status = 'sim';
    }
    AuthModule.renderWeather(false);
  },

  syncFormWithLocation(loc) {
    if (!loc) return;
    const stateEl = document.getElementById('regState');
    const cityEl = document.getElementById('regCity');
    if (stateEl && !stateEl.value && loc.state) {
      stateEl.value = loc.state;
    }
    if (cityEl && !cityEl.value && loc.city) {
      cityEl.value = loc.city;
    }
  },

  renderWeather(pending) {
    const el = id => document.getElementById(id);
    if (pending) {
      const t = el('authTemp'); if (t) t.textContent = '—';
      const c = el('authCity'); if (c) c.innerHTML = 'Detectando localização... <span class="auth-src" id="authSrc">AGUARDE</span>';
      const s = el('authStatusTag'); if (s) s.textContent = 'DETECTANDO';
      const cond = el('authCondition'); if (cond) cond.textContent = '—';
      const f = el('authFeels'); if (f) f.textContent = 'Sensação térmica —';
      const h = el('authHumidity'); if (h) h.textContent = '—';
      const w = el('authWind'); if (w) w.textContent = '—';
      const u = el('authUv'); if (u) u.textContent = '—';
      const uf = el('authUvFill'); if (uf) { uf.style.width = '0%'; uf.className = 'uv-fill low'; }
      return;
    }

    const w = AuthModule.currentWeather();
    if (!w) return;

    const locationText = w.locationDisplay || (w.state ? `${w.city}, ${w.state}` : w.city) || AuthModule.sessionCity();
    const src = w.src || 'AO VIVO';

    const t = el('authTemp'); if (t) t.textContent = `${Math.round(w.temp)}°`;
    const c = el('authCity'); if (c) c.innerHTML = `${locationText} <span class="auth-src">${src}</span>`;
    const s = el('authStatusTag'); if (s) s.textContent = 'CLIMA AO VIVO';
    const cond = el('authCondition'); if (cond) cond.textContent = w.condition;
    const f = el('authFeels'); if (f) f.textContent = `Sensação térmica ${Math.round(w.feels != null ? w.feels : AuthModule.feels(w))}°C`;
    const h = el('authHumidity'); if (h) h.textContent = `${w.humidity}%`;
    const wind = el('authWind'); if (wind) wind.textContent = `${w.wind} km/h`;
    const u = el('authUv'); if (u) u.textContent = w.uv;

    const fill = el('authUvFill');
    if (fill) {
      fill.style.width = `${Math.min((w.uv / 11) * 100, 100)}%`;
      fill.className = 'uv-fill' + (w.uv >= 8 ? ' high' : w.uv >= 3 ? ' mid' : ' low');
    }
  },

  _initialized: false,

  /* ---------- Inicialização ---------- */
  init() {
    if (this._initialized) return;
    this._initialized = true;
    AuthModule.bindForms();
    AuthModule.bindWeather();
    AuthModule.loadWeather(false);
  },

  bindForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) loginForm.addEventListener('submit', e => { e.preventDefault(); AuthModule.doLogin(); });
    if (registerForm) registerForm.addEventListener('submit', e => { e.preventDefault(); AuthModule.doRegister(); });

    const showRegister = document.getElementById('showRegister');
    if (showRegister) showRegister.addEventListener('click', () => AuthModule.switchForm('register'));

    const showLogin = document.getElementById('showLogin');
    if (showLogin) showLogin.addEventListener('click', () => AuthModule.switchForm('login'));

    const forgotPassword = document.getElementById('forgotPassword');
    if (forgotPassword) forgotPassword.addEventListener('click', () => {
      if (typeof App !== 'undefined' && App.showToast) App.showToast('Link de recuperação enviado (demo)');
    });

    document.querySelectorAll('.auth-screen .pwd-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.target);
        if (input) input.type = input.type === 'password' ? 'text' : 'password';
      });
    });

    document.querySelectorAll('.auth-social .btn-social').forEach(btn => {
      btn.addEventListener('click', () => AuthModule.socialLogin(btn.dataset.provider));
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        AuthModule.logout();
      });
    }

    const regLocateBtn = document.getElementById('regLocateBtn');
    const badge = document.getElementById('authLocBadge');

    const updateBadge = (html, type = '') => {
      if (!badge) return;
      badge.innerHTML = html;
      badge.className = 'auth-loc-badge' + (type ? ` ${type}` : '');
      badge.style.display = 'flex';
    };

    if (regLocateBtn) {
      regLocateBtn.addEventListener('click', async () => {
        updateBadge('<span>🔄 Solicitando localização GPS do navegador...</span>', 'loading');
        
        const pos = await DetectWeather.getPosition();
        if (pos) {
          const [geo, weather] = await Promise.all([
            DetectWeather.reverseGeocode(pos.lat, pos.lon),
            DetectWeather.fetchWeather(pos.lat, pos.lon)
          ]);

          if (geo) {
            const stateEl = document.getElementById('regState');
            const cityEl = document.getElementById('regCity');
            if (stateEl && geo.state) stateEl.value = geo.state;
            if (cityEl && geo.city) cityEl.value = geo.city;

            const fullLoc = geo.state ? `${geo.city}, ${geo.state}` : geo.city;
            updateBadge(`<span>📍 Localização GPS detectada: <strong>${fullLoc}</strong></span>`);

            if (weather) {
              const live = {
                ...weather,
                city: geo.city,
                state: geo.state,
                locationDisplay: fullLoc,
                src: 'GPS AO VIVO'
              };
              AuthModule.state.live = live;
              AuthModule.saveLiveWeather(live);
              AuthModule.renderWeather(false);
            }
            if (typeof App !== 'undefined' && App.showToast) App.showToast(`Localização detectada: ${fullLoc}`);
            return;
          }
        }

        // Fallback to IP
        updateBadge('<span>🔄 Tentando detectar localização por rede (IP)...</span>', 'loading');
        const ip = await DetectWeather.byIP();
        if (ip) {
          const stateEl = document.getElementById('regState');
          const cityEl = document.getElementById('regCity');
          if (stateEl && ip.state) stateEl.value = ip.state;
          if (cityEl && ip.city) cityEl.value = ip.city;

          const fullLoc = ip.state ? `${ip.city}, ${ip.state}` : ip.city;
          updateBadge(`<span>📍 Localização por rede detectada: <strong>${fullLoc}</strong></span>`);
          AuthModule.loadWeatherByLocation(ip.city, ip.state);
          if (typeof App !== 'undefined' && App.showToast) App.showToast(`Localização estimada: ${fullLoc}`);
        } else {
          updateBadge('<span>⚠️ Não foi possível obter o local. Selecione o Estado e informe a cidade manualmente.</span>', 'error');
        }
      });
    }

    const regCity = document.getElementById('regCity');
    const regState = document.getElementById('regState');

    let cepTimeout = null;
    if (regCity) {
      regCity.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        const cleanCep = val.replace(/\D/g, '');

        clearTimeout(cepTimeout);
        if (cleanCep.length === 8) {
          updateBadge('<span>🔎 Consultando CEP...</span>', 'loading');
          cepTimeout = setTimeout(async () => {
            const cepData = await DetectWeather.fetchByCEP(cleanCep);
            if (cepData) {
              regCity.value = cepData.city;
              if (regState && cepData.state) regState.value = cepData.state;
              updateBadge(`<span>📍 CEP <strong>${cepData.cep}</strong>: ${cepData.city} - ${cepData.state}</span>`);
              AuthModule.loadWeatherByLocation(cepData.city, cepData.state);
              if (typeof App !== 'undefined' && App.showToast) App.showToast(`CEP localizado: ${cepData.city}, ${cepData.state}`);
            } else {
              updateBadge('<span>⚠️ CEP não encontrado. Verifique os números digitados.</span>', 'error');
            }
          }, 300);
        }
      });

      regCity.addEventListener('blur', (e) => {
        const city = e.target.value.trim();
        const state = regState ? regState.value : '';
        if (city && city.replace(/\D/g, '').length !== 8) {
          AuthModule.loadWeatherByLocation(city, state);
        }
      });
    }

    if (regState) {
      regState.addEventListener('change', (e) => {
        const state = e.target.value;
        const city = regCity ? regCity.value.trim() : '';
        if (state) {
          const stateName = BRAZIL_STATES[state] || state;
          const targetCity = city || stateName;
          AuthModule.loadWeatherByLocation(targetCity, state);
        }
      });
    }
  },

  bindWeather() {
    const refreshBtn = document.getElementById('authRefreshWeather');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        AuthModule.loadWeather(true);
      });
    }
  },

  switchForm(mode) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginErr = document.getElementById('loginError');
    const regErr = document.getElementById('registerError');
    const title = document.getElementById('authFormTitle');
    const subtitle = document.getElementById('authFormSubtitle');

    if (loginForm) loginForm.classList.toggle('active', mode === 'login');
    if (registerForm) registerForm.classList.toggle('active', mode === 'register');
    if (loginErr) loginErr.textContent = '';
    if (regErr) regErr.textContent = '';
    if (title) title.textContent = mode === 'login' ? 'Bem-vindo de volta' : 'Criar sua conta';
    if (subtitle) subtitle.textContent = mode === 'login' ? 'Acesse seu armário inteligente' : 'Preencha seus dados e comece';

    if (mode === 'register') {
      const live = AuthModule.currentWeather();
      if (live) AuthModule.syncFormWithLocation(live);
    }
  },

  /* ---------- Login / Cadastro ---------- */
  doLogin() {
    const email = (document.getElementById('loginEmail')?.value || '').trim().toLowerCase();
    const pass = document.getElementById('loginPassword')?.value || '';
    const err = document.getElementById('loginError');

    if (!email || !/.+@.+\..+/.test(email)) return AuthModule.showError(err, 'Informe um e-mail válido.');
    if (!pass || pass.length < 6) return AuthModule.showError(err, 'Informe sua senha (mínimo 6 caracteres).');

    const user = AuthModule.getUsers().find(u => u.email === email);
    if (!user) return AuthModule.showError(err, 'Conta não encontrada. Cadastre-se primeiro.');
    if (user.password !== pass) return AuthModule.showError(err, 'Senha incorreta. Tente novamente.');

    if (err) err.textContent = '';
    const loginPass = document.getElementById('loginPassword');
    if (loginPass) loginPass.value = '';
    AuthModule.startSession(user);
  },

  doRegister() {
    const name = (document.getElementById('regName')?.value || '').trim();
    const email = (document.getElementById('regEmail')?.value || '').trim().toLowerCase();
    const pass = document.getElementById('regPassword')?.value || '';
    const state = (document.getElementById('regState')?.value || '').trim();
    const city = (document.getElementById('regCity')?.value || '').trim();
    const err = document.getElementById('registerError');

    if (name.length < 2) return AuthModule.showError(err, 'Informe seu nome (mínimo 2 letras).');
    if (!/.+@.+\..+/.test(email)) return AuthModule.showError(err, 'Informe um e-mail válido.');
    if (pass.length < 6) return AuthModule.showError(err, 'A senha precisa ter no mínimo 6 caracteres.');
    if (!state) return AuthModule.showError(err, 'Selecione o seu Estado (UF).');
    if (!city) return AuthModule.showError(err, 'Informe sua Cidade ou CEP.');

    const users = AuthModule.getUsers();
    if (users.some(u => u.email === email)) return AuthModule.showError(err, 'Este e-mail já está cadastrado. Faça login.');

    const locationDisplay = state ? `${city}, ${state}` : city;
    const user = {
      id: 'u_' + Date.now(),
      name,
      email,
      password: pass,
      state,
      city,
      location: locationDisplay,
      createdAt: Date.now()
    };
    users.push(user);
    AuthModule.saveUsers(users);
    AuthModule.startSession(user);
  },

  socialLogin(provider) {
    const users = AuthModule.getUsers();
    const email = 'demo@wardrobeai.app';
    let user = users.find(u => u.email === email);
    if (!user) {
      user = {
        id: 'u_' + Date.now(),
        name: 'Usuário Demo',
        email,
        password: 'demo_' + Math.random().toString(36).slice(2, 8),
        state: 'SP',
        city: 'São Paulo',
        location: 'São Paulo, SP',
        createdAt: Date.now()
      };
      users.push(user);
      AuthModule.saveUsers(users);
    }
    AuthModule.startSession(user);
    if (typeof App !== 'undefined' && App.showToast) App.showToast(`${provider === 'google' ? 'Google' : 'Apple'} · entrada demo simulada`);
  },

  showError(el, msg) {
    if (!el) return;
    el.textContent = msg;
    setTimeout(() => { if (el.textContent === msg) el.textContent = ''; }, 3500);
  },

  startSession(user) {
    const loc = user.location || (user.state ? `${user.city}, ${user.state}` : user.city) || AuthModule.sessionCity();
    localStorage.setItem(AuthModule.KEYS.session, JSON.stringify({
      name: user.name,
      email: user.email,
      state: user.state || '',
      city: user.city || '',
      location: loc
    }));
    localStorage.setItem('wardrobe_user_name', user.name);
    AuthModule.onLoginOk(user);
  },

  onLoginOk(user) {
    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.classList.remove('active');
    document.body.classList.remove('auth-mode');

    if (typeof WeatherModule !== 'undefined' && WeatherModule.state) {
      WeatherModule.state.username = user.name;
    }

    if (!window.__wardrobeAppStarted) {
      window.__wardrobeAppStarted = true;
      App.init();
    } else {
      if (typeof DashboardModule !== 'undefined' && DashboardModule.refresh) DashboardModule.refresh();
      if (typeof WeatherModule !== 'undefined' && WeatherModule.refresh) WeatherModule.refresh();
      if (typeof InventoryModule !== 'undefined' && InventoryModule.refresh) InventoryModule.refresh();
      if (typeof App !== 'undefined' && App.navigateTo) App.navigateTo('dashboard');
    }
    if (typeof App !== 'undefined' && App.showToast) App.showToast(`Bem-vindo, ${user.name.split(' ')[0]}!`);
  },

  logout() {
    localStorage.removeItem(AuthModule.KEYS.session);
    window.__wardrobeAppStarted = false;

    if (typeof WeatherModule !== 'undefined' && WeatherModule.state) {
      WeatherModule.state.username = null;
      WeatherModule.state.suggested = null;
    }

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('mobile-open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';

    document.body.classList.add('auth-mode');
    const authScreen = document.getElementById('authScreen');
    if (authScreen) authScreen.classList.add('active');

    AuthModule.switchForm('login');
    AuthModule.loadWeather(false);

    const loginPass = document.getElementById('loginPassword');
    const regPass = document.getElementById('regPassword');
    const loginErr = document.getElementById('loginError');
    const regErr = document.getElementById('registerError');
    if (loginPass) loginPass.value = '';
    if (regPass) regPass.value = '';
    if (loginErr) loginErr.textContent = '';
    if (regErr) regErr.textContent = '';

    if (typeof App !== 'undefined' && App.showToast) {
      App.showToast('Você saiu da sua conta com sucesso.');
    }
  }
};
