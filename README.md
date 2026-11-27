[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) [![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Renga154/makefun-best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) [![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Renga154/makefun-best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# Japan in Figures

Japan in Figures presents official Japanese statistics across five pages. Figures are labeled with their source and reference date or period.

- [Overview](app/index.html) pairs a 1950–2024 population trend with a prefecture tile map and sourced national indicators.
- [Population](app/population.html) shows the national population trend and the age structure as of 1 October 2024.
- [Economy](app/economy.html) charts calendar-year nominal GDP, annualized quarterly nominal GDP, monthly all-items and core CPI changes, and monthly seasonally adjusted unemployment. It also summarizes merchandise trade.
- [Prefectures](app/prefectures.html) maps all 47 prefectures by population, population change, share aged 65 or older, per-capita prefectural income, area, and population density. The selected indicator drives the ranking, searchable and sortable table, and CSV export.
- [Society](app/society.html) shows life expectancy, registered physicians, and undergraduate enrollment for 2022 and 2024, with a side-by-side comparison and CSV export.

See [data sources and methodology](DATA_SOURCES.md) for reference periods, definitions, and series caveats.

The site works offline when served locally. Plain HTML, CSS, and JavaScript render the bundled data and inline SVG charts.

## Run

Start the local server with `node serve.ts` and open `http://localhost:8080`.

To package the submission, run:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```
