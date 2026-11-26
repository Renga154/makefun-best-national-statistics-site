[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) [![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Renga154/makefun-best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) [![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Renga154/makefun-best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

# Japan in Figures

Japan in Figures presents official Japanese statistics across five pages. Figures are labeled with their source and reference date or period.

- [Overview](app/index.html) brings together five headline indicators, a 1950–2024 population trend, and the ten most populous prefectures.
- [Population](app/population.html) shows the national population trend and the age structure as of 1 October 2024.
- [Economy](app/economy.html) covers nominal GDP, consumer price changes, unemployment, and merchandise trade.
- [Prefectures](app/prefectures.html) lists all 47 prefectures. Search in English or Japanese, sort by population or name, see the largest matches in a chart, and export filtered rows as CSV.
- [Society](app/society.html) shows life expectancy, registered physicians, and undergraduate enrollment for 2022 and 2024, with an expandable data table and CSV export.

The site works offline when served locally. Plain HTML, CSS, and JavaScript render the bundled data and inline SVG charts.

## Run

Start the local server with `node serve.ts` and open `http://localhost:8080`.

To package the submission, run:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```
