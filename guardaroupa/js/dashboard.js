/* ============================================
   Dashboard Module — Charts & Statistics
   ============================================ */

const DashboardModule = {
  charts: {},

  init() {
    this.initCharts();
  },

  initCharts() {
    this.categoryCtx = document.getElementById('categoryChart').getContext('2d');
    this.seasonCtx = document.getElementById('seasonChart').getContext('2d');
  },

  refresh() {
    this.updateStats();
    this.renderCategoryChart();
    this.renderSeasonChart();
    this.renderRecent();
  },

  /* ---------- Stats Cards ---------- */
  updateStats() {
    const items = WardrobeDB.getItems();
    const outfits = WardrobeDB.getOutfits();

    document.getElementById('totalItems').textContent = items.length;

    document.getElementById('totalOutfits').textContent = outfits.length;

    const usedItems = items.filter(i => i.timesUsed > 0).length;
    const utilization = items.length > 0 ? Math.round((usedItems / items.length) * 100) : 0;
    document.getElementById('utilizationRate').textContent = `${utilization}%`;

    let mostUsed = '—';
    let maxUses = 0;
    items.forEach(item => {
      if (item.timesUsed > maxUses) {
        maxUses = item.timesUsed;
        mostUsed = WardrobeDB.categoryLabels[item.category] || item.category;
      }
    });
    document.getElementById('mostUsedCategory').textContent = mostUsed;
  },

  /* ---------- Category Chart (Doughnut) ---------- */
  renderCategoryChart() {
    const items = WardrobeDB.getItems();
    const counts = {};
    items.forEach(item => {
      const key = item.category;
      counts[key] = (counts[key] || 0) + 1;
    });

    const labels = Object.keys(counts);
    if (labels.length === 0) {
      this.drawEmptyChart(this.categoryCtx);
      return;
    }

    const data = labels.map(l => counts[l]);
    const colors = labels.map(l => this.categoryColor(l));

    if (this.charts.category) {
      this.charts.category.data.labels = labels.map(l => WardrobeDB.categoryLabels[l] || l);
      this.charts.category.data.datasets[0].data = data;
      this.charts.category.data.datasets[0].backgroundColor = colors;
      this.charts.category.update();
      return;
    }

    this.charts.category = new Chart(this.categoryCtx, {
      type: 'doughnut',
      data: {
        labels: labels.map(l => WardrobeDB.categoryLabels[l] || l),
        datasets: [{
          data,
          backgroundColor: colors,
          borderColor: '#FFFFFF',
          borderWidth: 3,
          hoverOffset: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 16,
              color: '#6B6560',
              font: { size: 12 }
            }
          }
        }
      }
    });
  },

  /* ---------- Season Chart (Bar) ---------- */
  renderSeasonChart() {
    const items = WardrobeDB.getItems();
    const seasons = ['verao', 'primavera', 'outono', 'inverno'];
    const seasonLabels = { verao: 'Verão', primavera: 'Primavera', outono: 'Outono', inverno: 'Inverno' };
    const data = seasons.map(s => items.filter(i => i.season === s).length);

    if (this.charts.season) {
      this.charts.season.data.datasets[0].data = data;
      this.charts.season.update();
      return;
    }

    this.charts.season = new Chart(this.seasonCtx, {
      type: 'bar',
      data: {
        labels: seasons.map(s => seasonLabels[s]),
        datasets: [{
          data,
          backgroundColor: ['#C4B59B', '#B5C4B1', '#D0B5B5', '#B5C8D0'],
          borderRadius: 8,
          borderSkipped: false,
          maxBarThickness: 40
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#F0ECE6' },
            ticks: { color: '#9E9590', precision: 0 }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#6B6560' }
          }
        }
      }
    });
  },

  /* ---------- Recent Items ---------- */
  renderRecent() {
    const items = WardrobeDB.getItems();
    const recent = [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);

    const container = document.getElementById('recentItems');
    if (recent.length === 0) {
      container.innerHTML = `<p style="color:var(--text-tertiary);font-size:13px;">Nenhuma peça cadastrada ainda</p>`;
      return;
    }

    container.innerHTML = recent.map(item => {
      const imgContent = item.image
        ? `<img src="${item.image}" alt="${item.name}" class="recent-item-img">`
        : `<div class="recent-item-img">${WardrobeDB.categoryEmojis[item.category] || '👕'}</div>`;

      return `
        <div class="recent-item-card" data-id="${item.id}">
          ${imgContent}
          <div class="recent-item-info">
            <div class="recent-item-name">${item.name}</div>
            <div class="recent-item-cat">${WardrobeDB.categoryLabels[item.category] || item.category}</div>
          </div>
        </div>
      `;
    }).join('');

    container.querySelectorAll('.recent-item-card').forEach(card => {
      card.addEventListener('click', () => {
        InventoryModule.openDetail(card.dataset.id);
      });
    });
  },

  /* ---------- Helpers ---------- */
  categoryColor(category) {
    return {
      camisas: '#D4C5B0',
      calcas: '#B5C4B1',
      shorts: '#D8C4B8',
      sapatos: '#C1B5D0',
      casacos: '#D0B5B5',
      acessorios: '#B5C8D0',
      vestidos: '#D0C1B5',
      calcados: '#B5B5C4'
    }[category] || '#ccc';
  },

  drawEmptyChart(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#9E9590';
    ctx.font = '13px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Sem dados para exibir', ctx.canvas.width / 2, ctx.canvas.height / 2);
  }
};
