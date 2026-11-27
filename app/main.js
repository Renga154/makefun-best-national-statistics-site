import { indicators, tileMap } from './prefecture-map.js';
import { populationMap } from './prefecture-map.js';
import { ageGroups, population, prefectures, society, sources } from './data.js';
import { CPI_MONTHLY, GDP_ANNUAL, GDP_QUARTERLY, UNEMPLOYMENT_MONTHLY } from './data2.js';
import { lineChart, number, source } from './views.js';

const el = id => document.getElementById(id);
const put = (id, html) => { el(id).innerHTML = html; };
const populationDate = '1 Oct 2024';

const populationMetric = ['Population', '≈123.80 million', populationDate, 'population', 'Statistics Bureau'];
const economicMetrics = [
  ['Nominal GDP', `≈¥${GDP_ANNUAL.find(([year]) => year === 2024)[1].toFixed(1)} trillion`, 'Calendar 2024', 'gdpAnnual', 'Cabinet Office'],
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
  const { men, women, physicians, students } = society[2024];
  cards('indicators', [
    populationMetric, ...economicMetrics,
    ['Life expectancy at birth', `${men} / ${women}`, 'Men / women · years · 2024', 'life', 'MHLW'],
  ]);
  renderPopulationTrend();
  put('cover-map', populationMap());
  cards('overview-indicators', [
    ['Residents aged 65 or older', `${ageGroups.at(-1)[2]}%`, populationDate, 'population', 'Statistics Bureau'],
    ['Registered physicians', number(physicians), '31 Dec 2024', 'physicians', 'MHLW'],
    ['University undergraduates', number(students), '1 May 2024', 'education2024', 'MEXT'],
  ]);
  sourceList(['population', 'gdpAnnual', 'cpi', 'labor', 'life', 'physicians', 'education2024']);
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
  const [year, annual] = GDP_ANNUAL.at(-1);
  const [cpiMonth, inflation] = CPI_MONTHLY.at(-1);
  const [laborMonth, unemployment] = UNEMPLOYMENT_MONTHLY.at(-1);
  const monthFormat = new Intl.DateTimeFormat('en-GB', {
    month: 'short', year: 'numeric', timeZone: 'UTC',
  });
  const monthLabel = period => monthFormat.format(new Date(`${period}-01T00:00:00Z`));
  cards('economy-indicators', [
    ['Nominal GDP', `≈¥${annual.toFixed(1)} trillion`, `Calendar ${year}`, 'gdpAnnual', 'Cabinet Office'],
    ['All-items CPI change', `+${inflation.toFixed(1)}%`, `${monthLabel(cpiMonth)} · year over year`, 'cpiMonthly', 'Statistics Bureau'],
    ['Unemployment rate', `${unemployment.toFixed(1)}%`, `${monthLabel(laborMonth)} · seasonally adjusted`, 'laborMonthly', 'Statistics Bureau'],
  ]);
  put('gdp-chart', lineChart({
    series: [GDP_ANNUAL], ticks: [500, 550, 600, 650, 700], years: [2010, 2015, 2020, 2025],
    label: 'Calendar-year nominal GDP rose from 510.1 trillion yen in 2010 to 666.4 trillion yen in 2025.',
  }));
  put('gdp-quarterly-chart', lineChart({
    series: [GDP_QUARTERLY.map(([, value], index) => [index, value])],
    ticks: [575, 600, 625, 650, 675, 700], years: [0, 4, 8, 12, 15],
    formatPeriod: index => GDP_QUARTERLY[index][0].replace('Q', ' Q'),
    label: 'Quarterly nominal GDP at a seasonally adjusted annual rate rose from 594.2 trillion yen in Q4 2022 to a preliminary 692.7 trillion yen in Q3 2026.',
  }));
  const monthlyTicks = [0, 6, 12, 18, 23];
  put('rates-chart', lineChart({
    series: [1, 2].map(column => CPI_MONTHLY.map((row, index) => [index, row[column]])),
    ticks: [1, 2, 3, 4, 5], years: monthlyTicks,
    formatPeriod: index => monthLabel(CPI_MONTHLY[index][0]),
    label: 'October 2026 inflation was 2.3 percent for all items and 2.2 percent excluding fresh food, year over year.',
  }));
  put('unemployment-chart', lineChart({
    series: [UNEMPLOYMENT_MONTHLY.map(([, value], index) => [index, value])],
    ticks: [2.2, 2.4, 2.6, 2.8, 3.0], years: monthlyTicks,
    formatPeriod: index => monthLabel(UNEMPLOYMENT_MONTHLY[index][0]),
    label: 'Seasonally adjusted unemployment ranged from 2.4 to 2.7 percent from October 2024 to September 2026.',
  }));
  put('gdp-source', `${source('gdpAnnual', 'Cabinet Office')} · This series uses calendar years. The earlier site figures appear to use fiscal years.`);
  put('gdp-quarterly-source', `${source('gdpQuarterly', 'Cabinet Office')} · Q3 2026 is the first preliminary estimate.`);
  put('rates-sources', `${source('cpiMonthly', 'Statistics Bureau · e-Stat')} · 2025 base from Jan 2026, 2020 base before.`);
  put('unemployment-source', source('laborMonthly'));
  sourceList(['gdpAnnual', 'gdpQuarterly', 'cpiMonthly', 'laborMonthly', 'trade']);
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
  const selection = el('pref-indicator');
  const download = el('pref-csv');
  const fold = text => text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().trim();
  const byName = (a, b) => a.name.localeCompare(b.name, 'en');
  const valueLabel = ({ label, unit }) => `${label} (${unit})`;
  const comparisons = {
    largest: (a, b) => a.rank - b.rank,
    smallest: (a, b) => b.rank - a.rank,
    name: byName,
  };
  let indicator;
  let ranked;
  let visibleRows;

  function updateTable() {
    const query = fold(search.value);
    visibleRows = ranked.filter(({ name, japanese }) =>
      fold(name).includes(query) || fold(japanese).includes(query));
    visibleRows.sort((a, b) => {
      if (sort.value !== 'name' && a.known !== b.known) return Number(b.known) - Number(a.known);
      return comparisons[sort.value](a, b);
    });
    el('pref-count').textContent = `${visibleRows.length} of ${prefectures.length} prefectures`;
    download.disabled = visibleRows.length === 0;
    put('pref-rows', visibleRows.map(({ rank, name, japanese, value, known }) => `
      <tr><td>${rank || '—'}</td><th scope="row">${name}</th><td lang="ja">${japanese}</td>
      <td class="numeric">${known ? number(value) : '—'}</td></tr>`).join(''));
  }

  function updateIndicator() {
    indicator = indicators[selection.value];
    ranked = prefectures.map(prefecture => {
      const value = indicator.value(prefecture);
      return { ...prefecture, value, known: Number.isFinite(value) };
    }).sort((a, b) => (b.known ? b.value : -Infinity) - (a.known ? a.value : -Infinity) || byName(a, b));
    ranked.forEach((row, index) => { row.rank = row.known ? index + 1 : 0; });
    el('pref-map-title').textContent = `${indicator.label} by prefecture`;
    el('pref-unit').textContent = valueLabel(indicator);
    el('pref-caption').textContent = `${valueLabel(indicator)} · ${indicator.date}`;
    put('pref-map', tileMap(prefectures, indicator));
    const sourceLinks = [indicator.source, indicator.additionalSource].filter(Boolean);
    el('pref-source').textContent = [`Reference period · ${indicator.date}`, indicator.note].filter(Boolean).join(' · ');
    put('source-list', sourceLinks.map(([label, url]) => `<li><a href="${url}">${label}</a></li>`).join(''));
    put('pref-ranking', ranked.filter(row => row.known).slice(0, 3).map(({ rank, name, value }) =>
      `<li><b>${rank}</b> ${name} · ${number(value)}</li>`).join(''));
    updateTable();
  }

  selection.addEventListener('change', updateIndicator);
  search.addEventListener('input', updateTable);
  sort.addEventListener('change', updateTable);
  download.addEventListener('click', () => {
    const sourceColumns = ['Source URL'];
    const sourceUrls = [indicator.source[1]];
    if (indicator.additionalSource) {
      sourceColumns.push('Additional source URL');
      sourceUrls.push(indicator.additionalSource[1]);
    }
    downloadCsv(`japan-prefectures-${selection.value}-${indicator.date}.csv`, [
      ['National rank', 'Prefecture', '都道府県', valueLabel(indicator), 'Reference period', ...sourceColumns],
      ...visibleRows.map(({ rank, name, japanese, value, known }) =>
        [rank || '', name, japanese, known ? value : '', indicator.date, ...sourceUrls]),
    ]);
  });
  selection.replaceChildren(...Object.entries(indicators).map(([id, { label }]) => new Option(label, id)));
  updateIndicator();
}

function renderSociety() {
  const period = el('society-period');
  function rows(year = period.value) {
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
  }

  const current = rows('2024');
  const previous = rows('2022');
  const referencePeriods = ['Calendar year', 'Calendar year', '31 December', '1 May'];
  put('society-rows', current.map(([name, value, unit], index) =>
    `<tr><th scope="row">${name}</th><td class="numeric">${display(previous[index][1], unit)}</td>
    <td class="numeric">${display(value, unit)}</td><td>${referencePeriods[index]}</td></tr>`).join(''));
  sourceList(['life', 'physicians', 'education2022', 'education2024']);
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
