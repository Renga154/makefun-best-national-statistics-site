import { ageGroups, cpi, gdp, population, prefectures, society, sources, unemployment } from './data.js';
import { lineChart, number, rankingChart, source } from './views.js';

const el = id => document.getElementById(id);
const put = (id, html) => { el(id).innerHTML = html; };
const populationDate = '1 Oct 2024';
const populationCsvDate = '2024-10-01';

const populationMetric = ['Population', '≈123.80 million', populationDate, 'population', 'Statistics Bureau'];
const economicMetrics = [
  ['Nominal GDP', '≈¥642.4 trillion', 'FY2024 · Apr 2024–Mar 2025', 'gdp', 'Cabinet Office'],
  ['All-items CPI change', '+2.7%', 'Calendar 2024', 'cpi', 'Statistics Bureau'],
  ['Unemployment rate', '2.5%', 'Calendar 2024', 'labor', 'Statistics Bureau'],
];

function cards(id, rows) {
  put(id, rows.map(([name, value, period, key, agency]) => `
    <article class="metric">
      <h2>${name}</h2>
      <p class="value">${value}</p>
      <span class="meta">${period}</span>
      <span class="meta">${source(key, agency)}</span>
    </article>`).join(''));
}

function sourceList(keys) {
  put('source-list', keys.map(key => `<li>${source(key)}</li>`).join(''));
}

function renderPopulationTrend() {
  put('population-trend', lineChart({
    series: [population.map(([year, thousands]) => [year, thousands / 1000])],
    ticks: [80, 90, 100, 110, 120, 130],
    years: [1950, 1970, 1990, 2010, 2024],
    label: 'Japan’s population rose from 83.2 million in 1950 to about 128.08 million in 2008, then fell to about 123.80 million in 2024.',
    area: true,
  }));
  put('population-caption', `${source('population', 'Statistics Bureau, table 4')} · Okinawa excluded through 1970.`);
}

function renderOverview() {
  const { men, women } = society[2024];
  cards('indicators', [
    populationMetric, ...economicMetrics,
    ['Life expectancy at birth', `${men} / ${women}`, 'Men / women · years · 2024', 'life', 'MHLW'],
  ]);
  renderPopulationTrend();
  put('cover-ranking', prefectures.slice(0, 10).map(({ name, rank, thousands }) => `
    <tr><td>${rank}</td><th scope="row">${name}</th>
      <td><svg class="cover-bar" viewBox="0 0 100 5" preserveAspectRatio="none" aria-hidden="true">
        <rect class="bar-track" width="100" height="5"/>
        <rect class="chart-point" width="${100 * thousands / prefectures[0].thousands}" height="5"/>
      </svg></td>
      <td class="numeric">${number(thousands)}</td>
    </tr>`).join(''));
  sourceList(['population', 'gdp', 'cpi', 'labor', 'life']);
}

function renderPopulation() {
  cards('population-indicators', [
    populationMetric,
    ['Change from 1 Oct 2023', '−550,000', populationDate, 'population', 'Statistics Bureau'],
    ['Residents aged 65 or older', '29.3%', populationDate, 'population', 'Statistics Bureau'],
  ]);
  renderPopulationTrend();
  const total = ageGroups.reduce((sum, [, count]) => sum + count, 0);
  let offset = 0;
  const segments = ageGroups.map(([, count], index) => {
    const width = 100 * count / total;
    const segment = `<rect class="chart-point" x="${offset}" width="${width}" height="10" opacity="${[.34, .66, 1][index]}"/>`;
    offset += width;
    return segment;
  }).join('');
  put('age-chart', `<svg class="age-chart" viewBox="0 0 100 10" aria-hidden="true">${segments}</svg>`);
  put('age-breakdown', ageGroups.map(([label, count, share]) =>
    `<div><dt>${label}</dt><dd class="numeric">${share}% · ${number(count)} thousand</dd></div>`
  ).join(''));
  sourceList(['population']);
}

function renderEconomy() {
  cards('economy-indicators', economicMetrics);
  put('gdp-chart', lineChart({
    series: [gdp], ticks: [540, 570, 600, 630, 660], years: gdp.map(([year]) => year),
    label: 'Nominal GDP rose from 570.6 trillion yen in FY2019 to 642.4 trillion yen in FY2024.',
  }));
  put('rates-chart', lineChart({
    series: [cpi, unemployment], ticks: [-1, 0, 1, 2, 3, 4], years: cpi.map(([year]) => year),
    label: 'In 2024 annual CPI increased 2.7 percent and the annual unemployment rate was 2.5 percent.',
  }));
  put('gdp-source', source('gdp'));
  put('rates-sources', `${source('cpi')} · ${source('labor')}`);
  sourceList(['gdp', 'cpi', 'labor', 'trade']);
}

function downloadCsv(filename, rows) {
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob(['\uFEFF', csv, '\r\n'], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function renderPrefectures() {
  const search = el('pref-search');
  const sort = el('pref-sort');
  const download = el('pref-csv');
  const fold = text => text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().trim();
  const matches = () => {
    const query = fold(search.value);
    return prefectures.filter(({ name, japanese }) => fold(name).includes(query) || fold(japanese).includes(query));
  };
  const comparisons = {
    largest: (a, b) => a.rank - b.rank,
    smallest: (a, b) => b.rank - a.rank,
    name: (a, b) => a.name.localeCompare(b.name, 'en'),
  };
  const tableRows = () => matches().sort(comparisons[sort.value]);

  function update() {
    const rows = tableRows();
    const ranked = matches().slice(0, 10);
    el('pref-count').textContent = `${rows.length} of ${prefectures.length} prefectures`;
    download.disabled = rows.length === 0;
    put('pref-rows', rows.map(({ rank, name, japanese, thousands }) => `
      <tr><td>${rank}</td><th scope="row">${name}</th><td lang="ja">${japanese}</td>
      <td class="numeric">${number(thousands)}</td></tr>`).join(''));
    put('pref-chart', ranked.length ? rankingChart(ranked) : '<p class="note">No prefectures match this search.</p>');
  }

  search.addEventListener('input', update);
  sort.addEventListener('change', update);
  download.addEventListener('click', () => {
    const rows = tableRows().map(({ rank, name, japanese, thousands }) =>
      [rank, name, japanese, thousands, populationCsvDate, sources.population[1]]);
    downloadCsv('japan-prefectures-2024.csv', [
      ['National rank', 'Prefecture', '都道府県', 'Population (thousands)', 'Reference date', 'Source URL'],
      ...rows,
    ]);
  });
  put('pref-source', source('population', 'Statistics Bureau, prefecture population table'));
  sourceList(['population']);
  update();
}

function renderSociety() {
  const period = el('society-period');
  function rows() {
    const year = period.value;
    const { men, women, physicians, students } = society[year];
    return [
      ['Life expectancy at birth, men', men.toFixed(2), 'years', `Calendar ${year}`, 'life', 'MHLW'],
      ['Life expectancy at birth, women', women.toFixed(2), 'years', `Calendar ${year}`, 'life', 'MHLW'],
      ['Registered physicians', physicians, 'people', `31 Dec ${year}`, 'physicians', 'MHLW'],
      ['University undergraduates', students, 'students', `1 May ${year}`, `education${year}`, 'MEXT'],
    ];
  }
  const display = (value, unit) => unit === 'years' ? `${value} years` : number(value);
  function update() {
    const selected = rows();
    cards('society-indicators', selected.map(([name, value, unit, date, key, agency]) =>
      [name, display(value, unit), date, key, agency]));
    put('society-rows', selected.map(([name, value, unit, date, key, agency]) =>
      `<tr><th scope="row">${name}</th><td class="numeric">${display(value, unit)}</td>
      <td>${date}<br>${source(key, agency)}</td></tr>`).join(''));
    sourceList(['life', 'physicians', `education${period.value}`]);
  }
  period.addEventListener('change', update);
  el('society-csv').addEventListener('click', () => downloadCsv(`japan-society-${period.value}.csv`, [
    ['Indicator', 'Value', 'Unit', 'Reference period', 'Source URL'],
    ...rows().map(([name, value, unit, date, key]) => [name, value, unit, date, sources[key][1]]),
  ]));
  update();
}

const page = document.querySelector('main').dataset.page;
const renderers = {
  index: renderOverview, population: renderPopulation, economy: renderEconomy,
  prefectures: renderPrefectures, society: renderSociety,
};
renderers[page]();
