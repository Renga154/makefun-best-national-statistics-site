import { sources } from './data.js';
import { sources2 } from './data2.js';

export const number = new Intl.NumberFormat('en').format;

export function source(key, label) {
  const [title, url] = sources2[key] ?? sources[key];
  return `<a href="${url}">${label ?? title}</a>`;
}

export function lineChart({ series, ticks, years, formatPeriod = String, label, area = false }) {
  const width = 540;
  const left = 42;
  const right = 516;
  const top = 18;
  const bottom = 172;
  const first = years[0];
  const last = years.at(-1);
  const min = ticks[0];
  const max = ticks.at(-1);
  const x = year => left + (year - first) / (last - first) * (right - left);
  const y = value => bottom - (value - min) / (max - min) * (bottom - top);

  const grid = ticks.map(value => `
    <path class="gridline" d="M${left} ${y(value)}H${right}"/>
    <text x="${left - 8}" y="${y(value) + 4}" text-anchor="end">${value}</text>
  `).join('');
  const labels = years.map(year => `<text x="${x(year)}" y="195" text-anchor="middle">${formatPeriod(year)}</text>`).join('');
  const lines = series.map((points, index) => {
    const path = points.map(([year, value]) => `${x(year)},${y(value)}`).join(' L');
    const [endYear, endValue] = points.at(-1);
    return `
      ${area ? `<path class="chart-area" d="M${left},${bottom} L${path} L${right},${bottom} Z"/>` : ''}
      <path class="chart-line ${index ? 'secondary-line' : ''}" d="M${path}"/>
      <circle class="${index ? 'secondary-point' : 'chart-point'}" cx="${x(endYear)}" cy="${y(endValue)}" r="4"/>
    `;
  }).join('');

  return `<svg class="line-chart" viewBox="0 0 ${width} 206" role="img" aria-label="${label}">
    <title>${label}</title>${grid}${labels}${lines}
  </svg>`;
}
