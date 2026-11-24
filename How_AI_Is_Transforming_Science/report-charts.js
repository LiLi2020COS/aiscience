/* Report figure definitions and datasets adapted from the supplied two-part report. */
(() => {
  'use strict';
    const C = {
      evergreen:  '#123f2f',
      forest:     '#16583d',
      teal:       '#2d7d82',
      emerald:    '#4ea17c',
      amber:      '#d9822b',
      terracotta: '#c95b3c',
      mauve:      '#9b6b8e',
      plum:       '#6e5d96',
      cyanTeal:   '#3c8d8a',
      slate:      '#8ca398',
      nodata:     '#9db2a5',
      prose:      '#171717',
      muted:      '#252525',
      border:     '#b5cfbd',
      eraML:      '#f3f8f5',
      eraDL:      '#f7f6ee',
      eraGenAI:   '#faf2ef'
    };

    const YEARS_ALL = [
      '2003','2004','2005','2006','2007','2008','2009','2010','2011','2012',
      '2013','2014','2015','2016','2017','2018','2019','2020','2021','2022',
      '2023','2024','2025*'
    ];
    const YEARS_2006 = YEARS_ALL.slice(3);

    // Part I: PLOS Longitudinal & Era Datasets (N = 353,810; AI subset N = 14,507)
    const PLOS = {
      aiShare: [
        2.75, 0.83, 0.97, 2.96, 1.60, 1.28, 1.41, 1.47, 1.65, 1.57,
        1.64, 1.77, 2.10, 2.43, 3.30, 3.99, 4.43, 5.39, 6.57, 7.97,
        9.60, 11.99, 15.58
      ],
      aiFamily: {
        ml:     [77.78, 89.13, 86.44, 90.53, 90.96, 83.90, 89.89, 89.07, 86.08, 87.35, 84.32, 78.78, 71.98, 66.62, 58.59, 55.54, 48.73, 45.99, 42.71, 37.43],
        dl:     [22.22, 10.87, 13.56, 9.47, 8.44, 15.79, 9.46, 10.22, 13.74, 12.30, 15.34, 20.80, 27.33, 33.12, 41.05, 43.64, 49.68, 50.80, 51.81, 55.43],
        genai:  [0.00, 0.00, 0.00, 0.00, 0.60, 0.31, 0.65, 0.53, 0.18, 0.35, 0.34, 0.42, 0.69, 0.26, 0.36, 0.75, 1.59, 3.10, 5.18, 6.48],
        hybrid: [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.18, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.07, 0.00, 0.11, 0.30, 0.66]
      },
      dataRoleAnnual: {
        producer:  [62.39, 62.24, 48.55, 53.37, 61.10, 63.13, 64.71, 65.47, 66.70, 67.48, 66.70, 65.74, 63.68, 62.04, 60.53, 58.63, 57.28, 55.17, 52.06, 51.36, 47.31, 46.40, 46.61],
        mixotroph: [27.52, 22.82, 27.01, 23.27, 21.71, 21.95, 21.22, 20.92, 20.86, 19.92, 19.36, 19.02, 20.02, 19.24, 19.53, 20.18, 19.98, 17.79, 17.42, 16.29, 15.30, 15.69, 16.51],
        consumer:  [10.09, 14.53, 24.12, 23.03, 16.77, 14.75, 13.80, 13.41, 12.25, 12.39, 13.72, 14.98, 16.07, 18.43, 19.60, 20.77, 22.47, 26.28, 28.68, 29.54, 33.60, 33.77, 31.83],
        nodata:    [0.00, 0.41, 0.32, 0.33, 0.42, 0.17, 0.27, 0.20, 0.19, 0.21, 0.22, 0.26, 0.23, 0.29, 0.34, 0.42, 0.27, 0.76, 1.84, 2.81, 3.79, 4.14, 5.05]
      },
      cpdc: [
        0.112, 0.171, 0.319, 0.300, 0.203, 0.173, 0.161, 0.155, 0.140, 0.142,
        0.159, 0.177, 0.192, 0.227, 0.245, 0.264, 0.291, 0.360, 0.413, 0.437,
        0.537, 0.544, 0.504
      ],
      shannon: [
        0.635, 0.675, 0.769, 0.744, 0.689, 0.661, 0.649, 0.640, 0.625, 0.619,
        0.630, 0.643, 0.661, 0.680, 0.694, 0.711, 0.716, 0.738, 0.776, 0.792,
        0.816, 0.826, 0.843
      ],
      eraAI: [1.625, 4.314, 11.331],
      eraRoles: {
        producer:  [66.03, 58.06, 46.83],
        mixotroph: [20.03, 18.88, 15.60],
        consumer:  [13.72, 22.25, 33.49],
        nodata:    [0.23,  0.81,  4.09]
      },
      eraCpdc: {
        nonAi: [0.176, 0.280, 0.453],
        ai:    [1.164, 1.122, 1.464]
      }
    };

    // Part II: 12 Adoption Drivers (n = 37) with exact 95% Wilson CIs
    const DRIVERS = [
      { label: 'Lower analytical barriers via generative AI', pct: 81.08, ciLow: 65.79, ciHigh: 90.52, count: 30 },
      { label: 'Complex, high-dimensional problems',          pct: 70.27, ciLow: 54.22, ciHigh: 82.51, count: 26 },
      { label: 'Interdisciplinary collaboration',             pct: 59.46, ciLow: 43.49, ciHigh: 73.65, count: 22 },
      { label: 'Insights and mechanistic understanding',      pct: 56.76, ciLow: 40.91, ciHigh: 71.33, count: 21 },
      { label: 'Public data availability',                    pct: 48.65, ciLow: 33.45, ciHigh: 64.11, count: 18 },
      { label: 'Access to high-performance computing',        pct: 48.65, ciLow: 33.45, ciHigh: 64.11, count: 18 },
      { label: 'Lower research costs',                        pct: 45.95, ciLow: 31.04, ciHigh: 61.62, count: 17 },
      { label: 'Faster publication',                          pct: 43.24, ciLow: 28.67, ciHigh: 59.09, count: 16 },
      { label: 'Student interest in algorithmic research',    pct: 40.54, ciLow: 26.35, ciHigh: 56.51, count: 15 },
      { label: 'Funding support',                             pct: 37.84, ciLow: 24.06, ciHigh: 53.90, count: 14 },
      { label: 'High-impact journals favour AI',              pct: 29.73, ciLow: 17.49, ciHigh: 45.78, count: 11 },
      { label: 'Research evaluation favours AI',              pct: 16.22, ciLow: 7.65,  ciHigh: 31.14, count: 6  }
    ];

    // Part II: 10 Safeguards (n = 19)
    // counts: [Not at all feasible, Slightly, Moderately, Feasible, Highly feasible, Not sure]
    const SAFEGUARDS = [
      { label: 'Data, code and model disclosure',       counts: [0, 2, 4, 6, 6, 1], fPlus: 63.2, mPlus: 84.2 },
      { label: 'Standardised AI-use disclosure',        counts: [0, 1, 4, 4, 7, 3], fPlus: 57.9, mPlus: 78.9 },
      { label: 'Evidence-informed policy revision',     counts: [0, 2, 6, 6, 4, 1], fPlus: 52.6, mPlus: 84.2 },
      { label: 'External or empirical validation',      counts: [0, 2, 6, 4, 6, 1], fPlus: 52.6, mPlus: 84.2 },
      { label: 'Reproducibility checks',                counts: [0, 1, 7, 5, 5, 1], fPlus: 52.6, mPlus: 89.5 },
      { label: 'AI and domain expert review',           counts: [0, 3, 5, 5, 4, 2], fPlus: 47.4, mPlus: 73.7 },
      { label: 'AI-independent scientific evaluation',  counts: [0, 4, 3, 4, 4, 4], fPlus: 42.1, mPlus: 57.9 },
      { label: 'Monitor AI use and imbalances',         counts: [0, 2, 8, 6, 2, 1], fPlus: 42.1, mPlus: 84.2 },
      { label: 'Support underrepresented research',     counts: [1, 3, 6, 3, 3, 3], fPlus: 31.6, mPlus: 63.2 },
      { label: 'Balance AI and non-AI research',        counts: [0, 1, 9, 3, 1, 5], fPlus: 21.1, mPlus: 68.4 }
    ];

    /**
     * =========================================================================
     * 2. GLOBAL CHART.JS DEFAULTS & CUSTOM PUBLICATION PLUGINS
     * =========================================================================
     */
    Chart.defaults.font.family = '"Inter", -apple-system, BlinkMacSystemFont, sans-serif';
    Chart.defaults.color = C.prose;
    Chart.defaults.animation = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : { duration: 260 };
    // Display the report's formatted tooltip text outside the canvas so that
    // long survey responses cannot be clipped at a panel boundary.
    const hoverCard = document.createElement('div');
    hoverCard.className = 'report-hover';
    hoverCard.hidden = true;
    hoverCard.setAttribute('aria-hidden', 'true');
    document.body.append(hoverCard);
    let activeCanvas = null;

    function hideHoverCard() {
      hoverCard.hidden = true;
      activeCanvas = null;
    }

    function showHoverData({ chart, tooltip }) {
      if (!tooltip.opacity || !tooltip.dataPoints?.length) {
        if (activeCanvas === chart.canvas) hideHoverCard();
        return;
      }
      activeCanvas = chart.canvas;
      hoverCard.replaceChildren();
      function addLines(lines, kind) {
        for (const line of lines || []) {
          const row = document.createElement('div');
          row.className = kind;
          row.textContent = line;
          hoverCard.append(row);
        }
      }
      addLines(tooltip.title, 'hover-title');
      addLines(tooltip.beforeBody, 'hover-note');
      for (const item of tooltip.body || []) {
        addLines([...item.before, ...item.lines, ...item.after], 'hover-value');
      }
      addLines(tooltip.afterBody, 'hover-note');
      addLines(tooltip.footer, 'hover-note');
      hoverCard.hidden = false;
      const box = chart.canvas.getBoundingClientRect();
      const x = box.left + tooltip.caretX * box.width / chart.width;
      const y = box.top + tooltip.caretY * box.height / chart.height;
      const w = hoverCard.offsetWidth;
      const h = hoverCard.offsetHeight;
      const left = x + w + 14 < document.documentElement.clientWidth ? x + 12 : x - w - 12;
      const top = y + h + 14 < window.innerHeight ? y + 12 : y - h - 12;
      hoverCard.style.left = Math.max(6, Math.min(left, document.documentElement.clientWidth - w - 6)) + 'px';
      hoverCard.style.top = Math.max(6, Math.min(top, window.innerHeight - h - 6)) + 'px';
    }

    Chart.defaults.plugins.tooltip.enabled = false;
    Chart.defaults.plugins.tooltip.external = showHoverData;
    window.addEventListener('scroll', hideHoverCard, { passive: true });
    window.addEventListener('resize', hideHoverCard);
    document.addEventListener('pointerdown', event => {
      if (event.target !== activeCanvas) hideHoverCard();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') hideHoverCard();
    });

    // Helper: gracefully wrap long horizontal labels on narrow mobile viewports
    function responsiveWrap(label, maxChars) {
      if (window.innerWidth >= 640 || label.length <= maxChars) return label;
      const words = label.split(' ');
      const lines = [];
      let line = '';
      for (const word of words) {
        if ((line + ' ' + word).trim().length <= maxChars) {
          line = (line + ' ' + word).trim();
        } else {
          if (line) lines.push(line);
          line = word;
        }
      }
      if (line) lines.push(line);
      return lines;
    }

    // Plugin A: Methodological Era Shading + Dashed Dividers + Era Tags
    const eraZonesPlugin = {
      id: 'eraZones',
      beforeDatasetsDraw(chart, args, opts) {
        if (!opts || !opts.splits) return;
        const { ctx, chartArea, scales: { x } } = chart;
        if (!chartArea || !x) return;
        const [s1, s2] = opts.splits;
        const x1 = (x.getPixelForValue(Math.floor(s1)) + x.getPixelForValue(Math.ceil(s1))) / 2;
        const x2 = (x.getPixelForValue(Math.floor(s2)) + x.getPixelForValue(Math.ceil(s2))) / 2;

        if (opts.shade !== false) {
          ctx.save();
          ctx.fillStyle = C.eraML;
          ctx.fillRect(chartArea.left, chartArea.top, x1 - chartArea.left, chartArea.bottom - chartArea.top);
          ctx.fillStyle = C.eraDL;
          ctx.fillRect(x1, chartArea.top, x2 - x1, chartArea.bottom - chartArea.top);
          ctx.fillStyle = C.eraGenAI;
          ctx.fillRect(x2, chartArea.top, chartArea.right - x2, chartArea.bottom - chartArea.top);
          ctx.restore();
        }
      },
      afterDatasetsDraw(chart, args, opts) {
        if (!opts || !opts.splits) return;
        const { ctx, chartArea, scales: { x } } = chart;
        if (!chartArea || !x) return;
        const [s1, s2] = opts.splits;
        const x1 = (x.getPixelForValue(Math.floor(s1)) + x.getPixelForValue(Math.ceil(s1))) / 2;
        const x2 = (x.getPixelForValue(Math.floor(s2)) + x.getPixelForValue(Math.ceil(s2))) / 2;

        ctx.save();
        ctx.strokeStyle = opts.lightDivider ? 'rgba(255,255,255,0.8)' : 'rgba(18, 63, 47, 0.45)';
        ctx.lineWidth = 1.15;
        ctx.setLineDash([4, 3]);
        [x1, x2].forEach(px => {
          ctx.beginPath();
          ctx.moveTo(px, chartArea.top);
          ctx.lineTo(px, chartArea.bottom);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        if (opts.showTags) {
          const tags = [
            { text: 'ML',     cx: (chartArea.left + x1) / 2, color: C.evergreen },
            { text: 'DL',     cx: (x1 + x2) / 2,             color: C.forest },
            { text: 'GenAI*', cx: (x2 + chartArea.right) / 2, color: C.terracotta }
          ];
          ctx.font = '600 9.5px "Inter", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          tags.forEach(t => {
            const w = ctx.measureText(t.text).width + 10;
            const h = 15;
            const y = chartArea.top + 5;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.88)';
            ctx.beginPath();
            ctx.roundRect(t.cx - w / 2, y, w, h, 3);
            ctx.fill();
            ctx.fillStyle = t.color;
            ctx.fillText(t.text, t.cx, y + h / 2 + 0.5);
          });
        }
        ctx.restore();
      }
    };

    // Plugin B: Right-Edge End-Share Annotations (Figure 1A, 1B, 1C)
    const endAnnotationsPlugin = {
      id: 'endAnnotations',
      afterDatasetsDraw(chart, args, opts) {
        if (!opts || !opts.enabled) return;
        const { ctx, chartArea, scales: { y } } = chart;
        if (!chartArea || !y) return;
        ctx.save();
        ctx.font = '600 9.5px "JetBrains Mono", monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';

        if (opts.mode === 'single') {
          const meta = chart.getDatasetMeta(0);
          const pt = meta.data[meta.data.length - 1];
          if (pt) {
            ctx.fillStyle = C.evergreen;
            ctx.fillText(opts.text, pt.x + 6, pt.y - 2);
          }
        } else if (opts.mode === 'stacked') {
          const labels = opts.items.map(item => {
            const midPct = item.start + item.val / 2;
            return {
              text: item.text,
              color: item.color,
              targetY: y.getPixelForValue(midPct),
              drawY: y.getPixelForValue(midPct)
            };
          });
          labels.sort((a, b) => a.drawY - b.drawY);
          for (let i = 1; i < labels.length; i++) {
            if (labels[i].drawY - labels[i - 1].drawY < 12.5) {
              labels[i].drawY = labels[i - 1].drawY + 12.5;
            }
          }
          const maxY = chartArea.bottom - 4;
          for (let i = labels.length - 1; i >= 0; i--) {
            if (labels[i].drawY > maxY) labels[i].drawY = maxY;
            if (i > 0 && labels[i].drawY - labels[i - 1].drawY < 12.5) {
              labels[i - 1].drawY = labels[i].drawY - 12.5;
            }
          }
          labels.forEach(lbl => {
            ctx.strokeStyle = lbl.color;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(chartArea.right + 1, lbl.targetY);
            ctx.lineTo(chartArea.right + 6, lbl.drawY);
            ctx.stroke();

            ctx.fillStyle = lbl.color;
            ctx.fillText(lbl.text, chartArea.right + 8, lbl.drawY);
          });
        }
        ctx.restore();
      }
    };

    // Plugin C: Direct Bar Labels (top %, stacked vertical %, combo bar+line, stacked horizontal counts, grouped right %)
    const directLabelsPlugin = {
      id: 'directLabels',
      afterDatasetsDraw(chart, args, opts) {
        if (!opts || !opts.mode) return;
        const { ctx } = chart;
        ctx.save();

        if (opts.mode === 'topPct') {
          const meta = chart.getDatasetMeta(0);
          ctx.font = '600 11px "JetBrains Mono", monospace';
          ctx.fillStyle = C.evergreen;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          meta.data.forEach((bar, i) => {
            ctx.fillText(`${chart.data.datasets[0].data[i].toFixed(1)}%`, bar.x, bar.y - 5);
          });
        } else if (opts.mode === 'stackedVertPct') {
          ctx.font = '600 10px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          chart.data.datasets.forEach((ds, dIdx) => {
            const meta = chart.getDatasetMeta(dIdx);
            meta.data.forEach((bar, i) => {
              const val = ds.data[i];
              const h = Math.abs(bar.base - bar.y);
              if (val >= 10 && h >= 18) {
                ctx.fillStyle = '#ffffff';
                ctx.fillText(`${val.toFixed(1)}%`, bar.x, (bar.y + bar.base) / 2);
              }
            });
          });
        } else if (opts.mode === 'comboBarLine') {
          const barMeta = chart.getDatasetMeta(0);
          const lineMeta = chart.getDatasetMeta(1);
          ctx.font = '600 10.5px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          barMeta.data.forEach((bar, i) => {
            const val = chart.data.datasets[0].data[i];
            ctx.fillStyle = '#ffffff';
            ctx.textBaseline = 'middle';
            ctx.fillText(`${val.toFixed(1)}%`, bar.x, (bar.y + bar.base) / 2);
          });
          lineMeta.data.forEach((pt, i) => {
            const val = chart.data.datasets[1].data[i];
            ctx.fillStyle = C.evergreen;
            ctx.textBaseline = 'bottom';
            ctx.fillText(`${val.toFixed(1)}%`, pt.x, pt.y - 8);
          });
        } else if (opts.mode === 'stackedHorizCounts') {
          const minCount = opts.minCount ?? 2;
          ctx.font = '600 11px "Inter", sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          chart.data.datasets.forEach((ds, dIdx) => {
            const meta = chart.getDatasetMeta(dIdx);
            meta.data.forEach((bar, i) => {
              const cnt = ds.counts ? ds.counts[i] : 0;
              const segWidth = Math.abs(bar.x - bar.base);
              if (cnt >= minCount && segWidth >= 18) {
                ctx.fillStyle = ds.textColor || '#ffffff';
                ctx.fillText(String(cnt), (bar.base + bar.x) / 2, bar.y);
              }
            });
          });
        } else if (opts.mode === 'horizRightPct') {
          ctx.font = '600 10px "JetBrains Mono", monospace';
          ctx.fillStyle = C.evergreen;
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          chart.data.datasets.forEach((ds, dIdx) => {
            const meta = chart.getDatasetMeta(dIdx);
            meta.data.forEach((bar, i) => {
              ctx.fillText(`${ds.data[i].toFixed(1)}%`, bar.x + 5, bar.y);
            });
          });
        }
        ctx.restore();
      }
    };

    // Plugin D: Significance Brackets "***" for Figure 2C
    const sigBracketsPlugin = {
      id: 'sigBrackets',
      afterDatasetsDraw(chart, args, opts) {
        if (!opts || !opts.enabled) return;
        const { ctx } = chart;
        const m0 = chart.getDatasetMeta(0);
        const m1 = chart.getDatasetMeta(1);
        if (!m0 || !m1) return;

        ctx.save();
        ctx.strokeStyle = C.evergreen;
        ctx.fillStyle = C.terracotta;
        ctx.lineWidth = 1.15;
        ctx.font = '700 12px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        for (let i = 0; i < m0.data.length; i++) {
          const b0 = m0.data[i];
          const b1 = m1.data[i];
          const topY = Math.min(b0.y, b1.y) - 10;
          ctx.beginPath();
          ctx.moveTo(b0.x, topY + 5);
          ctx.lineTo(b0.x, topY);
          ctx.lineTo(b1.x, topY);
          ctx.lineTo(b1.x, topY + 5);
          ctx.stroke();
          ctx.fillText('***', (b0.x + b1.x) / 2, topY - 1);
        }
        ctx.restore();
      }
    };

    // Plugin E: Centered Ring Callout for Part II Fig. 1A Doughnut
    const ringCenterPlugin = {
      id: 'ringCenter',
      afterDraw(chart, args, opts) {
        if (!opts || !opts.primary) return;
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const cx = (chartArea.left + chartArea.right) / 2;
        const cy = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = C.evergreen;
        ctx.font = '600 20px "JetBrains Mono", monospace';
        ctx.fillText(opts.primary, cx, cy - 8);
        ctx.fillStyle = C.muted;
        ctx.font = '500 11px "Inter", sans-serif';
        ctx.fillText(opts.secondary || '', cx, cy + 12);
        ctx.restore();
      }
    };

    // Plugin F: Cleveland Dot-and-Whisker Forest Plot for Part II Fig. 1C
    const dotWhiskerPlugin = {
      id: 'dotWhisker',
      afterDatasetsDraw(chart, args, opts) {
        if (!opts || !opts.enabled || !opts.items) return;
        const { ctx, chartArea, scales: { x, y } } = chart;
        if (!chartArea || !x || !y) return;

        ctx.save();
        ctx.strokeStyle = 'rgba(181, 207, 189, 0.7)';
        ctx.lineWidth = 1;
        ctx.strokeRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);

        opts.items.forEach((item, idx) => {
          const py = y.getPixelForValue(idx);
          const xLow = x.getPixelForValue(item.ciLow);
          const xHigh = x.getPixelForValue(item.ciHigh);
          const xMid = x.getPixelForValue(item.pct);
          const cap = 4.2;

          ctx.strokeStyle = 'rgba(181, 207, 189, 0.22)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(chartArea.left, py);
          ctx.lineTo(chartArea.right, py);
          ctx.stroke();

          ctx.strokeStyle = C.forest;
          ctx.lineWidth = 1.9;
          ctx.beginPath();
          ctx.moveTo(xLow, py);
          ctx.lineTo(xHigh, py);
          ctx.moveTo(xLow, py - cap);
          ctx.lineTo(xLow, py + cap);
          ctx.moveTo(xHigh, py - cap);
          ctx.lineTo(xHigh, py + cap);
          ctx.stroke();

          ctx.fillStyle = C.forest;
          ctx.beginPath();
          ctx.arc(xMid, py, 5.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.3;
          ctx.stroke();

          ctx.fillStyle = C.evergreen;
          ctx.font = '600 11.5px "JetBrains Mono", monospace';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'middle';
          ctx.fillText(`${item.pct.toFixed(1)}%`, chartArea.right + 52, py);
        });
        ctx.restore();
      }
    };

    // Plugin G: Right-Aligned "F+ / M+" Column for Part II Fig. 3 Default View
    const rightSummaryColumnPlugin = {
      id: 'rightSummaryColumn',
      afterDatasetsDraw(chart, args, opts) {
        if (!opts || !opts.enabled || !opts.items || window.innerWidth < 640) return;
        const { ctx, chartArea, scales: { y } } = chart;
        if (!chartArea || !y) return;

        ctx.save();
        ctx.font = '500 11px "JetBrains Mono", monospace';
        ctx.fillStyle = C.evergreen;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';

        opts.items.forEach((item, idx) => {
          const py = y.getPixelForValue(idx);
          ctx.fillText(`${item.fPlus.toFixed(1)}% / ${item.mPlus.toFixed(1)}%`, chartArea.right + 106, py);
        });
        ctx.restore();
      }
    };

    Chart.register(
      eraZonesPlugin,
      endAnnotationsPlugin,
      directLabelsPlugin,
      sigBracketsPlugin,
      ringCenterPlugin,
      dotWhiskerPlugin,
      rightSummaryColumnPlugin
    );

    /**
     * =========================================================================
     * 3. CHART REGISTRIES & LAZY PART INITIALIZATION (ZERO 0px GLITCHES)
     * =========================================================================
     */
    const part1Charts = {};
    const part2Charts = {};
    let part1Built = false;
    let part2Built = false;
    let fig5Mode = 'full';

    function initPart1Charts() {
      if (part1Built) return;
      part1Built = true;

      // Fig 1A: AI-method articles (%)
      part1Charts.f1a = new Chart(document.getElementById('fig1-a'), {
        type: 'line',
        data: {
          labels: YEARS_ALL,
          datasets: [{
            label: 'AI-method articles (%)',
            data: PLOS.aiShare,
            borderColor: C.forest,
            backgroundColor: 'rgba(22, 88, 61, 0.10)',
            pointBackgroundColor: '#ffffff',
            pointBorderColor: C.forest,
            pointBorderWidth: 1.8,
            pointRadius: 2.8,
            pointHoverRadius: 5,
            borderWidth: 2.1,
            tension: 0.2,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { right: 42 } },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            eraZones: { splits: [11.5, 19.5], shade: true, showTags: true },
            endAnnotations: { enabled: true, mode: 'single', text: '15.6%' },
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: items => `Year ${items[0].label}`,
                label: ctx => `AI-method share: ${ctx.parsed.y.toFixed(2)}%`
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkipPadding: 14, font: { size: 10 } } },
            y: {
              beginAtZero: true,
              max: 18,
              ticks: { stepSize: 5, callback: v => `${v}%`, font: { family: '"JetBrains Mono", monospace', size: 10 } },
              grid: { color: 'rgba(181, 207, 189, 0.35)' }
            }
          }
        }
      });

      // Fig 1B: AI-family composition (%)
      part1Charts.f1b = new Chart(document.getElementById('fig1-b'), {
        type: 'line',
        data: {
          labels: YEARS_2006,
          datasets: [
            { label: 'Machine learning', data: PLOS.aiFamily.ml,     backgroundColor: 'rgba(22, 88, 61, 0.90)',  borderColor: '#ffffff', borderWidth: 0.8, fill: true, pointRadius: 0, pointHoverRadius: 4, tension: 0.18 },
            { label: 'Deep learning',    data: PLOS.aiFamily.dl,     backgroundColor: 'rgba(45, 125, 130, 0.90)', borderColor: '#ffffff', borderWidth: 0.8, fill: true, pointRadius: 0, pointHoverRadius: 4, tension: 0.18 },
            { label: 'Generative AI',    data: PLOS.aiFamily.genai,  backgroundColor: 'rgba(201, 91, 60, 0.92)',  borderColor: '#ffffff', borderWidth: 0.8, fill: true, pointRadius: 0, pointHoverRadius: 4, tension: 0.18 },
            { label: 'Hybrid methods',   data: PLOS.aiFamily.hybrid, backgroundColor: 'rgba(78, 161, 124, 0.95)', borderColor: '#ffffff', borderWidth: 0.8, fill: true, pointRadius: 0, pointHoverRadius: 4, tension: 0.18 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { right: 64 } },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            eraZones: { splits: [8.5, 16.5], shade: false, lightDivider: true, showTags: false },
            endAnnotations: {
              enabled: true,
              mode: 'stacked',
              items: [
                { text: 'ML 37.4%',  color: C.forest,     start: 0,     val: 37.43 },
                { text: 'DL 55.4%',  color: C.teal,       start: 37.43, val: 55.43 },
                { text: 'Gen 6.5%',  color: C.terracotta, start: 92.86, val: 6.48  },
                { text: 'Hyb 0.7%',  color: C.emerald,    start: 99.34, val: 0.66  }
              ]
            },
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: items => `Year ${items[0].label} (AI papers)`,
                label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}%`
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkipPadding: 14, font: { size: 10 } } },
            y: {
              stacked: true,
              min: 0,
              max: 100,
              ticks: { stepSize: 25, callback: v => `${v}%`, font: { family: '"JetBrains Mono", monospace', size: 10 } },
              grid: { color: 'rgba(181, 207, 189, 0.25)' }
            }
          }
        }
      });

      // Fig 1C: Classified articles by data role (%)
      part1Charts.f1c = new Chart(document.getElementById('fig1-c'), {
        type: 'line',
        data: {
          labels: YEARS_ALL,
          datasets: [
            { label: 'Primary producers', data: PLOS.dataRoleAnnual.producer,  backgroundColor: 'rgba(22, 88, 61, 0.90)',   borderColor: '#ffffff', borderWidth: 0.8, fill: true, pointRadius: 0, pointHoverRadius: 4, tension: 0.18 },
            { label: 'Mixotrophs',        data: PLOS.dataRoleAnnual.mixotroph, backgroundColor: 'rgba(78, 161, 124, 0.88)', borderColor: '#ffffff', borderWidth: 0.8, fill: true, pointRadius: 0, pointHoverRadius: 4, tension: 0.18 },
            { label: 'Data consumers',    data: PLOS.dataRoleAnnual.consumer,  backgroundColor: 'rgba(217, 130, 43, 0.92)', borderColor: '#ffffff', borderWidth: 0.8, fill: true, pointRadius: 0, pointHoverRadius: 4, tension: 0.18 },
            { label: 'No empirical data', data: PLOS.dataRoleAnnual.nodata,    backgroundColor: 'rgba(157, 178, 165, 0.95)',borderColor: '#ffffff', borderWidth: 0.8, fill: true, pointRadius: 0, pointHoverRadius: 4, tension: 0.18 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { right: 68 } },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            eraZones: { splits: [11.5, 19.5], shade: false, lightDivider: true, showTags: false },
            endAnnotations: {
              enabled: true,
              mode: 'stacked',
              items: [
                { text: 'Prod 46.6%', color: C.forest,  start: 0,     val: 46.61 },
                { text: 'Mix 16.5%',  color: C.emerald, start: 46.61, val: 16.51 },
                { text: 'Cons 31.8%', color: C.amber,   start: 63.12, val: 31.83 },
                { text: 'None 5.1%',  color: C.muted,   start: 94.95, val: 5.05  }
              ]
            },
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: items => `Year ${items[0].label} (All classified)`,
                label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}%`
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkipPadding: 14, font: { size: 10 } } },
            y: {
              stacked: true,
              min: 0,
              max: 100,
              ticks: { stepSize: 25, callback: v => `${v}%`, font: { family: '"JetBrains Mono", monospace', size: 10 } },
              grid: { color: 'rgba(181, 207, 189, 0.25)' }
            }
          }
        }
      });

      // Fig 1D: Dual-Axis CPDC & Shannon Evenness
      part1Charts.f1d = new Chart(document.getElementById('fig1-d'), {
        type: 'line',
        data: {
          labels: YEARS_ALL,
          datasets: [
            {
              label: 'CPDC ratio',
              data: PLOS.cpdc,
              yAxisID: 'y',
              borderColor: C.terracotta,
              backgroundColor: C.terracotta,
              pointBackgroundColor: '#ffffff',
              pointBorderColor: C.terracotta,
              pointBorderWidth: 1.7,
              pointRadius: 2.5,
              borderWidth: 2,
              tension: 0.2
            },
            {
              label: 'Shannon evenness',
              data: PLOS.shannon,
              yAxisID: 'y1',
              borderColor: C.evergreen,
              backgroundColor: C.evergreen,
              pointStyle: 'rect',
              pointBackgroundColor: '#ffffff',
              pointBorderColor: C.evergreen,
              pointBorderWidth: 1.5,
              pointRadius: 2.5,
              borderWidth: 1.85,
              tension: 0.2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            eraZones: { splits: [11.5, 19.5], shade: true, showTags: true },
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: items => `Year ${items[0].label}`,
                label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(3)}`
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { maxRotation: 0, autoSkipPadding: 14, font: { size: 10 } } },
            y: {
              type: 'linear',
              position: 'left',
              min: 0,
              max: 0.60,
              ticks: { stepSize: 0.15, color: C.terracotta, font: { family: '"JetBrains Mono", monospace', size: 9.5 } },
              grid: { color: 'rgba(181, 207, 189, 0.32)' }
            },
            y1: {
              type: 'linear',
              position: 'right',
              min: 0.56,
              max: 0.88,
              ticks: { stepSize: 0.08, color: C.evergreen, font: { family: '"JetBrains Mono", monospace', size: 9.5 } },
              grid: { drawOnChartArea: false }
            }
          }
        }
      });

      // Fig 2A: AI-method articles by era
      part1Charts.f2a = new Chart(document.getElementById('fig2-a'), {
        type: 'bar',
        data: {
          labels: [['ML', 'n=142,803'], ['DL', 'n=166,917'], ['GenAI*', 'n=44,090']],
          datasets: [{
            label: 'AI-method share (%)',
            data: PLOS.eraAI,
            backgroundColor: [C.emerald, C.teal, C.forest],
            borderRadius: 4,
            barPercentage: 0.58
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            directLabels: { mode: 'topPct' },
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: items => `${String(items[0].label).replace(',', ' · ')}`,
                label: ctx => `AI-method share: ${ctx.parsed.y.toFixed(2)}%`
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: {
              beginAtZero: true,
              max: 14,
              ticks: { stepSize: 4, callback: v => `${v}%`, font: { family: '"JetBrains Mono", monospace', size: 10 } },
              grid: { color: 'rgba(181, 207, 189, 0.35)' }
            }
          }
        }
      });

      // Fig 2B: Data provenance by era (100% stacked vertical)
      part1Charts.f2b = new Chart(document.getElementById('fig2-b'), {
        type: 'bar',
        data: {
          labels: ['ML', 'DL', 'GenAI*'],
          datasets: [
            { label: 'Primary producers', data: PLOS.eraRoles.producer,  backgroundColor: C.forest  },
            { label: 'Mixotrophs',        data: PLOS.eraRoles.mixotroph, backgroundColor: C.emerald },
            { label: 'Data consumers',    data: PLOS.eraRoles.consumer,  backgroundColor: C.amber   },
            { label: 'No empirical data', data: PLOS.eraRoles.nodata,    backgroundColor: C.nodata  }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            directLabels: { mode: 'stackedVertPct' },
            legend: { display: false },
            tooltip: {
              callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}%` }
            }
          },
          scales: {
            x: { stacked: true, grid: { display: false }, ticks: { font: { size: 10.5, weight: '600' } } },
            y: {
              stacked: true,
              min: 0,
              max: 100,
              ticks: { stepSize: 25, callback: v => `${v}%`, font: { family: '"JetBrains Mono", monospace', size: 10 } },
              grid: { color: 'rgba(181, 207, 189, 0.30)' }
            }
          }
        }
      });

      // Fig 2C: Mean quarterly CPDC Non-AI vs AI + "***" brackets
      part1Charts.f2c = new Chart(document.getElementById('fig2-c'), {
        type: 'bar',
        data: {
          labels: [['ML', 'n=40 qtrs'], ['DL', 'n=32 qtrs'], ['GenAI*', 'n=11 qtrs']],
          datasets: [
            { label: 'Non-AI', data: PLOS.eraCpdc.nonAi, backgroundColor: C.slate,      borderRadius: 3, barPercentage: 0.8, categoryPercentage: 0.65 },
            { label: 'AI',     data: PLOS.eraCpdc.ai,    backgroundColor: C.terracotta, borderRadius: 3, barPercentage: 0.8, categoryPercentage: 0.65 }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            sigBrackets: { enabled: true },
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: items => `${String(items[0].label).replace(',', ' · ')}`,
                label: ctx => `${ctx.dataset.label} mean quarterly CPDC: ${ctx.parsed.y.toFixed(3)}`,
                afterBody: () => 'Holm-adjusted significance: *** p < .001'
              }
            }
          },
          scales: {
            x: { grid: { display: false }, ticks: { font: { size: 10 } } },
            y: {
              beginAtZero: true,
              max: 1.75,
              ticks: { stepSize: 0.5, font: { family: '"JetBrains Mono", monospace', size: 10 } },
              grid: { color: 'rgba(181, 207, 189, 0.35)' }
            }
          }
        }
      });
    }

    function initPart2Charts() {
      if (part2Built) return;
      part2Built = true;

      // Survey Fig 1A: Personal Adoption Thin-Ring Doughnut
      part2Charts.f3a = new Chart(document.getElementById('fig3-a'), {
        type: 'doughnut',
        data: {
          labels: ['Routine use', 'Early-stage use', 'Just starting', 'Never used'],
          datasets: [{
            data: [43.9, 43.9, 2.4, 9.8],
            counts: [18, 18, 1, 4],
            backgroundColor: [C.forest, C.amber, C.emerald, C.mauve],
            borderColor: '#ffffff',
            borderWidth: 2.5,
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '66%',
          plugins: {
            ringCenter: { primary: '90.2%', secondary: 'Using / trying' },
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => {
                  const cnt = ctx.dataset.counts[ctx.dataIndex];
                  const extra = ctx.dataIndex === 3 ? ' (3/4 rated interest 4/5)' : '';
                  return `${ctx.label}: ${cnt}/41 (${ctx.parsed.toFixed(1)}%)${extra}`;
                }
              }
            }
          }
        }
      });

      // Survey Fig 1B: Estimated Adoption in the Field (Bar + Cumulative Line)
      part2Charts.f3b = new Chart(document.getElementById('fig3-b'), {
        type: 'bar',
        data: {
          labels: ['0–25%', '25–50%', '50–75%', '75–100%'],
          datasets: [
            {
              type: 'bar',
              label: 'Responses',
              data: [19.51, 34.15, 29.27, 17.07],
              counts: [8, 14, 12, 7],
              backgroundColor: C.teal,
              borderRadius: 3,
              barPercentage: 0.72,
              order: 2
            },
            {
              type: 'line',
              label: 'Cumulative',
              data: [19.51, 53.66, 82.93, 100.00],
              borderColor: C.amber,
              backgroundColor: C.amber,
              pointBackgroundColor: C.amber,
              pointBorderColor: '#ffffff',
              pointBorderWidth: 1.5,
              pointRadius: 4.5,
              borderWidth: 2.2,
              tension: 0.08,
              order: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: 20 } },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            directLabels: { mode: 'comboBarLine' },
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: items => `Estimated field share: ${items[0].label}`,
                label: ctx => ctx.dataset.type === 'bar'
                  ? `Responses: ${ctx.dataset.counts[ctx.dataIndex]}/41 (${ctx.parsed.y.toFixed(1)}%)`
                  : `Cumulative: ${ctx.parsed.y.toFixed(1)}%`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              title: { display: true, text: 'Estimated share of groups using AI', color: C.muted, font: { size: 11 } },
              ticks: { font: { size: 11 } }
            },
            y: {
              beginAtZero: true,
              max: 108,
              title: { display: true, text: 'Respondents (%)', color: C.muted, font: { size: 11 } },
              ticks: {
                stepSize: 50,
                callback: v => v <= 100 ? `${v}%` : '',
                font: { family: '"JetBrains Mono", monospace', size: 10.5 }
              },
              grid: { color: 'rgba(181, 207, 189, 0.38)' }
            }
          }
        }
      });

      // Survey Fig 1C: Cleveland Dot-and-Whisker Forest Plot (NO filled bars)
      part2Charts.f3c = new Chart(document.getElementById('fig3-c'), {
        type: 'scatter',
        data: {
          labels: DRIVERS.map(d => d.label),
          datasets: [{
            label: 'Proportion rating 4–5 (%)',
            data: DRIVERS.map(d => ({ x: d.pct, y: d.label })),
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: 'rgba(22, 88, 61, 0)',
            pointBorderColor: 'rgba(22, 88, 61, 0)',
            pointHoverBackgroundColor: C.evergreen,
            pointHoverBorderColor: '#ffffff',
            pointHoverBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { top: 8, right: 62, bottom: 4, left: 4 } },
          interaction: { mode: 'nearest', axis: 'y', intersect: false },
          plugins: {
            dotWhisker: { enabled: true, items: DRIVERS },
            legend: { display: false },
            tooltip: {
              callbacks: {
                title: items => DRIVERS[items[0].dataIndex].label,
                label: ctx => {
                  const d = DRIVERS[ctx.dataIndex];
                  return [
                    `Rated 4–5/5: ${d.pct.toFixed(1)}% (${d.count}/37)`,
                    `95% Wilson CI: [${d.ciLow.toFixed(1)}%, ${d.ciHigh.toFixed(1)}%]`
                  ];
                }
              }
            }
          },
          scales: {
            x: {
              type: 'linear',
              min: 0,
              max: 100,
              title: { display: true, text: 'Respondents rating 4–5 (%)', color: C.muted, font: { size: 11, weight: '500' } },
              ticks: { stepSize: 25, callback: v => `${v}%`, font: { family: '"JetBrains Mono", monospace', size: 10.5 } },
              grid: { color: 'rgba(181, 207, 189, 0.38)' }
            },
            y: {
              type: 'category',
              labels: DRIVERS.map(d => d.label),
              offset: true,
              grid: { display: false },
              ticks: {
                autoSkip: false,
                color: C.prose,
                font: { size: window.innerWidth < 640 ? 10 : 11.5 },
                padding: 8,
                callback: function(v) { return responsiveWrap(this.getLabelForValue(v), 24); }
              }
            }
          }
        }
      });

      // Survey Fig 2A: Disadvantage associated with non-adoption
      part2Charts.f4a = new Chart(document.getElementById('fig4-a'), {
        type: 'bar',
        data: {
          labels: ['Researchers: academic competition', 'Editors: publication competition'],
          datasets: [
            { label: 'Disadvantage',    data: [78.05, 84.21], counts: [32, 16], backgroundColor: C.forest,  textColor: '#ffffff' },
            { label: 'No disadvantage', data: [17.07, 10.53], counts: [7,  2],  backgroundColor: C.amber,   textColor: '#ffffff' },
            { label: 'Unsure',          data: [4.88,  5.26],  counts: [2,  1],  backgroundColor: C.emerald, textColor: '#ffffff' }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', axis: 'y', intersect: false },
          plugins: {
            directLabels: { mode: 'stackedHorizCounts', minCount: 2 },
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => {
                  const n = ctx.dataIndex === 0 ? 41 : 19;
                  return `${ctx.dataset.label}: ${ctx.dataset.counts[ctx.dataIndex]}/${n} (${ctx.parsed.x.toFixed(1)}%)`;
                }
              }
            }
          },
          scales: {
            x: {
              stacked: true,
              min: 0,
              max: 100,
              title: { display: true, text: 'Responses (%) · segment labels: n', color: C.muted, font: { size: 10.5 } },
              ticks: { stepSize: 25, callback: v => `${v}%`, font: { family: '"JetBrains Mono", monospace', size: 10 } },
              grid: { color: 'rgba(181, 207, 189, 0.35)' }
            },
            y: {
              stacked: true,
              grid: { display: false },
              ticks: {
                color: C.prose,
                font: { size: window.innerWidth < 640 ? 10 : 11.5 },
                callback: function(v) { return responsiveWrap(this.getLabelForValue(v), 20); }
              }
            }
          }
        }
      });

      // Survey Fig 2B: Expected effects on long-term sustainability
      part2Charts.f4b = new Chart(document.getElementById('fig4-b'), {
        type: 'bar',
        data: {
          labels: ['Researchers (n = 41)', 'Editors (n = 19)'],
          datasets: [
            { label: 'Positive', data: [58.54, 52.63], counts: [24, 10], backgroundColor: C.forest,  textColor: '#ffffff' },
            { label: 'Neutral',  data: [24.39, 26.32], counts: [10, 5],  backgroundColor: C.amber,   textColor: '#ffffff' },
            { label: 'Negative', data: [2.44,  5.26],  counts: [1,  1],  backgroundColor: C.emerald, textColor: '#ffffff' },
            { label: 'Unsure',   data: [14.63, 15.79], counts: [6,  3],  backgroundColor: C.mauve,   textColor: '#ffffff' }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          interaction: { mode: 'index', axis: 'y', intersect: false },
          plugins: {
            directLabels: { mode: 'stackedHorizCounts', minCount: 2 },
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => {
                  const n = ctx.dataIndex === 0 ? 41 : 19;
                  return `${ctx.dataset.label}: ${ctx.dataset.counts[ctx.dataIndex]}/${n} (${ctx.parsed.x.toFixed(1)}%)`;
                }
              }
            }
          },
          scales: {
            x: {
              stacked: true,
              min: 0,
              max: 100,
              title: { display: true, text: 'Responses (%) · segment labels: n', color: C.muted, font: { size: 10.5 } },
              ticks: { stepSize: 25, callback: v => `${v}%`, font: { family: '"JetBrains Mono", monospace', size: 10 } },
              grid: { color: 'rgba(181, 207, 189, 0.35)' }
            },
            y: {
              stacked: true,
              grid: { display: false },
              ticks: { color: C.prose, font: { size: 11.5 } }
            }
          }
        }
      });

      // Survey Fig 3: Safeguards Feasibility
      renderFigure5(fig5Mode);
    }

    function renderFigure5(mode) {
      fig5Mode = mode;
      const canvas = document.getElementById('fig5-canvas');
      if (!canvas) return;
      if (part2Charts.f5) part2Charts.f5.destroy();

      const labels = SAFEGUARDS.map(s => s.label);
      const colHeaders = document.getElementById('fig5-col-headers');
      const legendFull = document.getElementById('fig5-legend-full');
      const legendComp = document.getElementById('fig5-legend-comp');
      const footnote = document.getElementById('fig5-footnote');
      const isWide = window.innerWidth >= 640;

      if (mode === 'full') {
        colHeaders.classList.remove('hidden');
        legendFull.classList.remove('hidden');
        legendComp.classList.add('hidden');
        footnote.textContent = 'F+ = feasible or highly feasible; M+ = at least moderately feasible. Denominator: all 19 editors (including not sure). Segment labels: counts (n).';

        const pctOf = idx => SAFEGUARDS.map(s => +(s.counts[idx] / 19 * 100).toFixed(2));
        const cntOf = idx => SAFEGUARDS.map(s => s.counts[idx]);

        part2Charts.f5 = new Chart(canvas, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              { label: 'Not at all feasible', data: pctOf(0), counts: cntOf(0), backgroundColor: C.evergreen, textColor: '#ffffff' },
              { label: 'Slightly feasible',   data: pctOf(1), counts: cntOf(1), backgroundColor: C.amber,     textColor: '#ffffff' },
              { label: 'Moderately feasible', data: pctOf(2), counts: cntOf(2), backgroundColor: C.emerald,   textColor: '#ffffff' },
              { label: 'Feasible',            data: pctOf(3), counts: cntOf(3), backgroundColor: C.mauve,     textColor: '#ffffff' },
              { label: 'Highly feasible',     data: pctOf(4), counts: cntOf(4), backgroundColor: C.plum,      textColor: '#ffffff' },
              { label: 'Not sure',            data: pctOf(5), counts: cntOf(5), backgroundColor: C.cyanTeal,  textColor: '#ffffff' }
            ]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { right: isWide ? 112 : 8 } },
            interaction: { mode: 'index', axis: 'y', intersect: false },
            plugins: {
              directLabels: { mode: 'stackedHorizCounts', minCount: 2 },
              rightSummaryColumn: { enabled: true, items: SAFEGUARDS },
              legend: { display: false },
              tooltip: {
                callbacks: {
                  title: items => {
                    const s = SAFEGUARDS[items[0].dataIndex];
                    return `${s.label}  (F+: ${s.fPlus.toFixed(1)}% | M+: ${s.mPlus.toFixed(1)}%)`;
                  },
                  label: ctx => {
                    const cnt = ctx.dataset.counts[ctx.dataIndex];
                    return `${ctx.dataset.label}: ${cnt}/19 (${(cnt / 19 * 100).toFixed(1)}%)`;
                  }
                }
              }
            },
            scales: {
              x: {
                stacked: true,
                min: 0,
                max: 100,
                title: { display: true, text: 'Responses (%) · segment labels: n', color: C.muted, font: { size: 10.5 } },
                ticks: { stepSize: 25, callback: v => `${v}%`, font: { family: '"JetBrains Mono", monospace', size: 10 } },
                grid: { color: 'rgba(181, 207, 189, 0.35)' }
              },
              y: {
                stacked: true,
                grid: { display: false },
                ticks: {
                  autoSkip: false,
                  color: C.prose,
                  font: { size: isWide ? 11.5 : 10 },
                  callback: function(v) { return responsiveWrap(this.getLabelForValue(v), 22); }
                }
              }
            }
          }
        });
      } else {
        colHeaders.classList.add('hidden');
        legendFull.classList.add('hidden');
        legendComp.classList.remove('hidden');
        footnote.textContent = 'Side-by-side comparison of overlapping cumulative thresholds: F+ (feasible or highly feasible) vs. M+ (at least moderately feasible) over all n = 19 editors.';

        part2Charts.f5 = new Chart(canvas, {
          type: 'bar',
          data: {
            labels,
            datasets: [
              {
                label: 'F+ (Feasible + Highly feasible)',
                data: SAFEGUARDS.map(s => s.fPlus),
                counts: SAFEGUARDS.map(s => s.counts[3] + s.counts[4]),
                backgroundColor: C.forest,
                borderRadius: 3,
                barPercentage: 0.78,
                categoryPercentage: 0.74
              },
              {
                label: 'M+ (At least moderately feasible)',
                data: SAFEGUARDS.map(s => s.mPlus),
                counts: SAFEGUARDS.map(s => s.counts[2] + s.counts[3] + s.counts[4]),
                backgroundColor: C.emerald,
                borderRadius: 3,
                barPercentage: 0.78,
                categoryPercentage: 0.74
              }
            ]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { right: 44 } },
            interaction: { mode: 'index', axis: 'y', intersect: false },
            plugins: {
              directLabels: { mode: 'horizRightPct' },
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: ctx => `${ctx.dataset.label}: ${ctx.parsed.x.toFixed(1)}% (${ctx.dataset.counts[ctx.dataIndex]}/19)`
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: 'Editors meeting threshold (%)', color: C.muted, font: { size: 10.5 } },
                ticks: { stepSize: 25, callback: v => `${v}%`, font: { family: '"JetBrains Mono", monospace', size: 10 } },
                grid: { color: 'rgba(181, 207, 189, 0.35)' }
              },
              y: {
                grid: { display: false },
                ticks: {
                  autoSkip: false,
                  color: C.prose,
                  font: { size: isWide ? 11.5 : 10 },
                  callback: function(v) { return responsiveWrap(this.getLabelForValue(v), 22); }
                }
              }
            }
          }
        });
      }
    }

    const titles = {
      'fig1-a': 'Share of PLOS articles using AI methods by received year',
      'fig1-b': 'AI method families by received year',
      'fig1-c': 'Data roles by received year',
      'fig1-d': 'Annual CPDC ratio and normalized Shannon evenness',
      'fig2-a': 'Share of AI-method articles by era',
      'fig2-b': 'Composition of data roles by era',
      'fig2-c': 'Mean quarterly CPDC in non-AI and AI articles by era',
      'fig3-a': 'Personal AI adoption among 41 surveyed researchers',
      'fig3-b': 'Researchers’ estimates of AI adoption in their field',
      'fig3-c': 'Adoption drivers and 95% Wilson intervals among 37 AI users',
      'fig4-a': 'Perceived disadvantages for non-AI research',
      'fig4-b': 'Expected long-term effects on disciplinary sustainability',
      'fig5-canvas': 'Feasibility of editorial safeguards among 19 journal professionals'
    };

    function enableKeyboardReadout(canvas) {
      canvas.tabIndex = 0;
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', titles[canvas.id] + '. Use left and right arrows to read individual observations.');
      const readout = document.createElement('span');
      readout.className = 'sr-only';
      readout.setAttribute('aria-live', 'polite');
      canvas.after(readout);
      let index = 0;

      function inspect() {
        const chart = Chart.getChart(canvas);
        const datasets = chart.data.datasets;
        const active = datasets.map((dataset, datasetIndex) => ({datasetIndex, index}));
        const point = chart.getDatasetMeta(0).data[index];
        if (!point) return;
        chart.setActiveElements(active);
        chart.tooltip.setActiveElements(active, point.getCenterPoint());
        chart.update('none');
        const {title, body, afterBody} = chart.tooltip;
        readout.textContent = [...title, ...body.flatMap(item => item.lines), ...afterBody].join('. ');
      }
      canvas.addEventListener('focus', inspect);
      canvas.addEventListener('keydown', event => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const last = Chart.getChart(canvas).data.labels.length - 1;
        if (event.key === 'Home') index = 0;
        if (event.key === 'End') index = last;
        if (event.key === 'ArrowRight') index = Math.min(last, index + 1);
        if (event.key === 'ArrowLeft') index = Math.max(0, index - 1);
        inspect();
      });
      canvas.addEventListener('blur', () => {
        const chart = Chart.getChart(canvas);
        chart.setActiveElements([]);
        chart.tooltip.setActiveElements([], {x: 0, y: 0});
        chart.update('none');
        readout.textContent = '';
      });
    }

    if (document.getElementById('fig1-a')) initPart1Charts();
    if (document.getElementById('fig3-a')) {
      initPart2Charts();
      const full = document.getElementById('btn-fig5-full');
      const comparison = document.getElementById('btn-fig5-comp');
      function switchMode(mode) {
        full.setAttribute('aria-pressed', String(mode === 'full'));
        comparison.setAttribute('aria-pressed', String(mode === 'comp'));
        if (mode !== fig5Mode) renderFigure5(mode);
      }
      full.addEventListener('click', () => switchMode('full'));
      comparison.addEventListener('click', () => switchMode('comp'));
      switchMode('full');
      window.matchMedia('(min-width: 640px)').addEventListener('change', () => renderFigure5(fig5Mode));
    }
    for (const id of Object.keys(titles)) {
      const canvas = document.getElementById(id);
      if (canvas) enableKeyboardReadout(canvas);
    }
})();
