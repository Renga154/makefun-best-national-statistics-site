import { prefectures, sources } from './data.js';
import { indicatorMeta, PREFECTURE_INDICATORS, sources2 } from './data2.js';
import { number } from './views.js';

const companionByName = new Map(PREFECTURE_INDICATORS.map(row => [row.name, row]));
const companionIndicators = [
  ['changeRate', 'Population change rate', sources2.populationChange, 'Change from 1 Oct 2023 to 1 Oct 2024.'],
  ['agingRate', 'Population aged 65+', sources2.aging],
  ['incomePerCapita', 'Per-capita prefectural income', sources2.income],
  ['areaKm2', 'Area', sources2.area, 'GSI marks some areas as reference values where boundaries are unresolved.'],
  ['density', 'Population density', sources2.area, 'Calculated from the Population Estimates and GSI area figures.', sources.population],
];

export const indicators = {
  population: {
    label: 'Population', unit: 'thousands', date: '2024-10-01',
    source: sources.population,
    value: prefecture => prefecture.thousands,
  },
  ...Object.fromEntries(companionIndicators.map(([key, label, source, note, additionalSource]) => [
    key,
    { ...indicatorMeta[key], label, source, note, additionalSource, value: ({ name }) => companionByName.get(name)?.[key] },
  ])),
};

// Northeast to southwest, with Okinawa inset.
const geography = [
  '· · · · · · · · · · · Hokkaido',
  '· · · · · · · · · · · Aomori',
  '· · · · · · · · · · Akita Iwate',
  '· · · · · · · · · Niigata Yamagata Miyagi',
  '· · · · · · Fukui Ishikawa Toyama Gunma Tochigi Fukushima',
  '· · Yamaguchi Shimane Tottori Hyogo Kyoto Shiga Gifu Nagano Saitama Ibaraki',
  'Nagasaki Saga Fukuoka Hiroshima Okayama · Osaka Nara Aichi Yamanashi Tokyo Chiba',
  '· Kumamoto Oita · Ehime Kagawa · Wakayama Mie Shizuoka Kanagawa ·',
  '· Kagoshima Miyazaki · Kochi Tokushima · · · · · ·',
  'Okinawa · · · · · · · · · · ·',
];

const abbreviations = {
  Kagoshima: 'Kgs', Hokkaido: 'Hkd', Nagasaki: 'Ngs', Nagano: 'Ngn', Nara: 'Nar',
  Miyagi: 'Myg', Miyazaki: 'Myz', Yamagata: 'Ygt', Yamaguchi: 'Ygc', Yamanashi: 'Yns',
  Fukuoka: 'Fko', Fukushima: 'Fks', Fukui: 'Fki', Shizuoka: 'Szo', Shiga: 'Sga', Shimane: 'Smn',
  Tokushima: 'Tks', Tokyo: 'Tky', Tottori: 'Ttr', Tochigi: 'Tcg', Toyama: 'Tym',
};

export function tileMap(rows, indicator, { compact = false } = {}) {
  const byName = new Map(rows.map(row => [row.name, row]));
  const values = rows.map(row => indicator.value(row)).filter(Number.isFinite);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const tiles = geography.flatMap((line, row) => line.split(' ').map((name, column) => {
    if (name === '·') return '';
    const prefecture = byName.get(name);
    const value = prefecture && indicator.value(prefecture);
    const known = Number.isFinite(value);
    const band = known ? Math.min(4, Math.floor(5 * (value - min) / (max - min || 1))) : 'missing';
    const shortName = abbreviations[name] ?? name.slice(0, 3);
    const edge = column < 3 ? ' edge-left' : column >= 9 ? ' edge-right' : '';
    const description = `${name} · ${known ? `${number(value)} ${indicator.unit}` : 'No data'}`;
    return `<span class="map-tile band-${band}${edge}" style="grid-area:${row + 1}/${column + 1}" title="${description}" tabindex="0" aria-label="${description}"><span aria-hidden="true">${shortName}</span><span class="map-tooltip" aria-hidden="true">${description}</span></span>`;
  }));
  return `<div class="prefecture-map${compact ? ' map-compact' : ''}" role="group" aria-label="${indicator.label} by prefecture">${tiles.join('')}</div>
    <div class="map-scale"><span>${values.length ? number(min) : '—'}</span><span class="map-ramp" aria-hidden="true"></span><span>${values.length ? number(max) : '—'} ${indicator.unit}</span></div>`;
}

export function populationMap() {
  return tileMap(prefectures, indicators.population, { compact: true });
}
