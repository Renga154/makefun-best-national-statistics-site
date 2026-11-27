# Data sources: `app/data2.js`

Everything was retrieved on 2026-11-27 from official files downloaded directly from the source sites. Nothing was estimated, interpolated or filled in from memory. Each figure was extracted by one researcher and then checked by a second against the raw file, covering all 47 prefecture populations and samples of every other indicator.

## Prefecture indicators (`PREFECTURE_INDICATORS`, 47 rows, JIS order 01–47)

Join to the `prefectures` list in `data.js` on `name`.

| Field | Source | Reference |
|---|---|---|
| population | **Not duplicated.** Use `data.js` `prefectures[].thousands`. All 47 values match 人口推計 2024 表５ exactly. | 2024-10-01 |
| `changeRate` (%) | Statistics Bureau, 人口推計（2024年10月1日現在）結果の概要, 表６ 都道府県別人口増減率 — https://www.stat.go.jp/data/jinsui/2024np/pdf/2024gaiyou.pdf | 2024. Change from Oct 2023 to Sep 2024, divided by the 2023-10-01 population. |
| `agingRate` (%) | Same PDF, 表10 年齢３区分別人口の割合, 65歳以上 column | 2024-10-01 |
| `incomePerCapita` (thousand yen) | Cabinet Office ESRI, 県民経済計算, 総括表 ７．１人当たり県民所得 — https://www.esri.cao.go.jp/jp/sna/data/data_list/kenmin/files/contents/tables/2023/soukatu7.xlsx | FY2023 (令和5年度), the latest published. Includes the 2026-08-07 correction to Okayama (3,034). |
| `areaKm2` | GSI, 令和6年全国都道府県市区町村別面積調, 第Ⅱ章 — https://www.gsi.go.jp/KOKUJYOHO/MENCHO/backnumber/GSI-menseki20241001.pdf | 2024-10-01 |
| `density` (people/km²) | **Computed**: `data.js` population × 1000 ÷ `areaKm2`, rounded to 0.1 | 2024-10-01 |

Notes:
- **Income definition.** Per-capita prefectural income is total prefectural income (employee compensation, property income and enterprise income) divided by population. It is not household or wage income. The national reference value of 3,639 is the file's 全県計, not 国民所得.
- **`areaReference: true`** marks the 21 prefectures that GSI prints with `*` 参考値, because part of their boundary is undetermined. These figures are GSI's 便宜上の概算数値 and are included in the national total.
- **Disputed areas.** Hokkaido's area includes the Habomai Islands (94.84 km²). Shimane includes Takeshima (0.20 km²) and Okinawa includes the Senkaku Islands (5.53 km²), exactly as GSI prints them.
- **Sanity check.** The 47 prefecture populations sum to 123,803 thousand. The national figure on the site and in 表５ is 123,802 thousand, so the 1 thousand gap is independent rounding and not an error. The 47 areas sum to 377,975.65 km² against GSI's national 377,975.64 km², also rounding.

## Extended national series

| Export | Source and series | Points |
|---|---|---|
| `GDP_QUARTERLY` | Cabinet Office ESRI, 四半期別GDP速報 2026年7-9月期 1次速報値 (released 2026-11-16). 国内総生産(支出側) 名目 季節調整系列, annual rate. Converted from 10億円 to trillion yen at 1 dp. https://www.esri.cao.go.jp/jp/sna/data/data_list/sokuhou/files/2026/qe263/tables/gaku-mk2631.csv | 16 (2022Q4–2026Q3) |
| `GDP_ANNUAL` | Same release, 名目 暦年 (calendar year). https://www.esri.cao.go.jp/jp/sna/data/data_list/sokuhou/files/2026/qe263/tables/gaku-mcy2631.csv | 16 (2010–2025) |
| `CPI_MONTHLY` | Statistics Bureau, 消費者物価指数 中分類指数 前年同月比, `zmy2025s.csv` on e-Stat (updated 2026-11-20). All items (総合) YoY and core (生鮮食品を除く総合) YoY. https://www.e-stat.go.jp/stat-search/file-download?statInfId=000040482953&fileKind=1 | 24 (2024-11 to 2026-10) |
| `UNEMPLOYMENT_MONTHLY` | Statistics Bureau, 労働力調査 基本集計 長期時系列 `lt01-a10.xlsx` (published 2026-10-30), 完全失業率 季節調整値, both sexes. https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031831358&fileKind=0 | 24 (2024-10 to 2026-09) |

Caveats:
- **GDP is preliminary.** The QE figures will be revised in the 2nd preliminary estimate (December 2026).
- **GDP in `data.js` doesn't match.** The site's existing annual `gdp` values (for example 2023 at 619.4 and 2024 at 642.4) do not match the calendar-year figures in this release (616.7 and 636.9). They look like fiscal-year and/or 年次推計 figures. `data.js` does not say which, so check before showing both side by side.
- **CPI base break.** 2024-11 to 2025-12 are the 2020-base published rates, which the Bureau keeps unchanged. 2026-01 onward are 2025-base. Both come from the same official file, and the Jan–Jun 2026 values were confirmed against the Bureau's 2025/2020 base comparison PDF.
- **Unemployment stops at 2026-09.** The October 2026 Labour Force Survey was not yet published on the retrieval date; its cell in the workbook is empty. Seasonally adjusted values are recalculated every January.

## Omitted

Nothing in the brief was left out. The only shortfall is that unemployment ends one month earlier than CPI (2026-09 rather than 2026-10), because the October figure has not been released.
