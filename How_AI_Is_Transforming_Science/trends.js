(() => {
  const {years, plos} = studyData;
  const groups = {
    ai: {unit: '%', limit: 20, series: [['AI-method articles', plos.aiShare]]},
    role: {unit: '%', limit: 80, series: [['Primary producers', plos.dataRoleAnnual.producer], ['Mixed', plos.dataRoleAnnual.mixotroph], ['Consumers', plos.dataRoleAnnual.consumer], ['No empirical data', plos.dataRoleAnnual.nodata]]},
    family: {unit: '%', limit: 100, series: [['Machine learning', plos.aiFamily.ml], ['Deep learning', plos.aiFamily.dl], ['Generative AI', plos.aiFamily.genai], ['Hybrid', plos.aiFamily.hybrid]]},
    balance: {unit: '', limit: 1, series: [['CPDC', plos.cpdc], ['Shannon evenness', plos.shannon]]}
  };
  const palette = ['#b7452c','#376e65','#486698','#8c6c32'];
  const plot = document.querySelector('#chart');
  const metric = document.querySelector('#metric');
  const year = document.querySelector('#year');
  let layout;
  function render() {
    const group = groups[metric.value];
    const labels = years.slice(metric.value === 'family' ? 3 : 0);
    const width = Math.max(280, plot.clientWidth);
    const height = width < 500 ? 213 : 260;
    const left = 36, right = width - 24, top = 16, bottom = height - 33;
    const x = i => left + i * (right - left) / (labels.length - 1);
    const y = n => bottom - n / group.limit * (bottom - top);
    layout = {labels, left, right};
    year.max = labels.length - 1;
    const index = Number(year.value);
    const elements = [];
    for (let t = 0; t <= 4; t++) {
      const v = group.limit * t / 4;
      elements.push('<line x1="'+left+'" x2="'+right+'" y1="'+y(v)+'" y2="'+y(v)+'" stroke="#dedfd7"/>',
        '<text x="'+(left-5)+'" y="'+(y(v)+4)+'" text-anchor="end">'+v+group.unit+'</text>');
    }
    for (const label of ['2015','2023']) {
      const xpos = x(labels.indexOf(label) - 0.5);
      elements.push('<line x1="'+xpos+'" x2="'+xpos+'" y1="'+top+'" y2="'+bottom+'" stroke="#787a70" stroke-dasharray="4 4"/>');
    }
    for (const i of [0,labels.indexOf('2014'),labels.length - 1]) {
      elements.push('<text x="'+x(i)+'" y="'+(bottom+24)+'" text-anchor="middle">'+labels[i]+'</text>');
    }
    elements.push('<line x1="'+x(index)+'" x2="'+x(index)+'" y1="'+top+'" y2="'+bottom+'" stroke="#191918" stroke-opacity=".4"/>');
    group.series.forEach(([name,values],i) => {
      const points = values.map((v,j) => x(j)+','+y(v)).join(' ');
      elements.push('<polyline fill="none" stroke="'+palette[i]+'" stroke-width="2.5" points="'+points+'"/>',
        '<circle cx="'+x(index)+'" cy="'+y(values[index])+'" r="4" fill="'+palette[i]+'" stroke="white"/>');
    });
    plot.innerHTML = '<svg role="img" aria-label="'+metric.selectedOptions[0].text+' by received year" viewBox="0 0 '+width+' '+height+'">'+elements.join('')+'</svg>';
    document.querySelector('#legend').innerHTML = group.series.map(([name],i) => '<span><i style="background:'+palette[i]+'"></i>'+name+'</span>').join('');
    document.querySelector('#year-label').textContent = labels[index];
    year.setAttribute('aria-valuetext', labels[index]);
    document.querySelector('#readout').textContent = group.series.map(([name,values]) => name+' '+values[index].toFixed(group.unit ? 2 : 3)+group.unit).join(' · ');
  }
  metric.addEventListener('change', () => {
    const date = layout.labels[Number(year.value)];
    const labels = years.slice(metric.value === 'family' ? 3 : 0);
    year.max = labels.length - 1;
    year.value = Math.max(0, labels.indexOf(date));
    render();
  });
  year.addEventListener('input', render);
  function inspect(event) {
    const pos = event.clientX - plot.getBoundingClientRect().left;
    const idx = Math.round((pos - layout.left) / (layout.right - layout.left) * (layout.labels.length - 1));
    const selected = Math.max(0, Math.min(idx, layout.labels.length - 1));
    if (selected !== Number(year.value)) {year.value = selected; render();}
  }
  plot.addEventListener('pointermove', inspect);
  plot.addEventListener('pointerdown', inspect);
  window.addEventListener('resize', render);
  document.querySelector('.annual-explorer')?.addEventListener('toggle', render);
  render();
})();
