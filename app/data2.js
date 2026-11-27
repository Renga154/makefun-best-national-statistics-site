// Japan in Figures · data pack 2 (companion to data.js). Retrieved 2026-11-27.
// Every value below was read from the official file named; nothing is estimated or interpolated.
//
// PREFECTURE_INDICATORS (47 prefectures, JIS order; join to data.js `prefectures` on `name`)
//   population        → NOT duplicated here: use data.js prefectures[].thousands (2024-10-01).
//                       All 47 values were checked identical to Statistics Bureau 人口推計 2024 表５.
//   changeRate (%)    Statistics Bureau, 人口推計（2024年10月1日現在）結果の概要, 表６ 都道府県別人口増減率,
//                     2024 (change Oct 2023–Sep 2024 ÷ 2023-10-01 population). stat.go.jp/data/jinsui/2024np/pdf/2024gaiyou.pdf
//   agingRate (%)     Same publication, 表10 年齢３区分別人口の割合, share aged 65+, 2024-10-01.
//   incomePerCapita   Cabinet Office ESRI, 県民経済計算, 総括表 ７．１人当たり県民所得 (thousand yen), FY2023 (令和5年度);
//                     esri.cao.go.jp/jp/sna/data/data_list/kenmin/files/contents/tables/2023/soukatu7.xlsx
//                     (includes the 2026-08-07 Okayama correction). Prefectural income ÷ population, not household income.
//   areaKm2           GSI, 令和6年全国都道府県市区町村別面積調 (2024-10-01), 第Ⅱ章 都道府県別面積.
//                     gsi.go.jp/KOKUJYOHO/MENCHO/backnumber/GSI-menseki20241001.pdf
//                     areaReference: true = GSI marks the area * 参考値 (boundary not fully determined).
//   density (/km2)    COMPUTED here: data.js population (thousands × 1000) ÷ areaKm2, rounded to 0.1.
//
// GDP_QUARTERLY   Cabinet Office ESRI, 四半期別GDP速報 2026年7-9月期 1次速報値 (released 2026-11-16),
//                 国内総生産(支出側) 名目 季節調整系列, annual rate, trillion yen (from 10億円, 1 dp).
//                 .../sokuhou/files/2026/qe263/tables/gaku-mk2631.csv
// GDP_ANNUAL      Same release, 名目 暦年 (calendar year), trillion yen. .../qe263/tables/gaku-mcy2631.csv
// CPI_MONTHLY     Statistics Bureau, 消費者物価指数 前年同月比 (zmy2025s.csv on e-Stat, updated 2026-11-20):
//                 [month, all items 総合 YoY %, core 生鮮食品を除く総合 YoY %].
//                 BASE BREAK: 2024-11..2025-12 are 2020-base published rates; 2026-01 onward are 2025-base.
// UNEMPLOYMENT_MONTHLY  Statistics Bureau, 労働力調査 基本集計 長期時系列 lt01-a10.xlsx (published 2026-10-30),
//                 完全失業率 季節調整値, both sexes, %. Latest available month is 2026-09.

export const sources2 = {
  populationChange: ['Statistics Bureau · Population Estimates 2024 (Table 6)', 'https://www.stat.go.jp/data/jinsui/2024np/pdf/2024gaiyou.pdf'],
  aging: ['Statistics Bureau · Population Estimates 2024 (Table 10)', 'https://www.stat.go.jp/data/jinsui/2024np/pdf/2024gaiyou.pdf'],
  income: ['Cabinet Office · Prefectural Accounts FY2023', 'https://www.esri.cao.go.jp/jp/sna/data/data_list/kenmin/files/contents/tables/2023/soukatu7.xlsx'],
  area: ['GSI · Area Statistics 2024-10-01', 'https://www.gsi.go.jp/KOKUJYOHO/MENCHO/backnumber/GSI-menseki20241001.pdf'],
  gdpQuarterly: ['Cabinet Office · QE Jul–Sep 2026 (1st prelim.)', 'https://www.esri.cao.go.jp/jp/sna/data/data_list/sokuhou/files/2026/qe263/tables/gaku-mk2631.csv'],
  gdpAnnual: ['Cabinet Office · QE Jul–Sep 2026, calendar year', 'https://www.esri.cao.go.jp/jp/sna/data/data_list/sokuhou/files/2026/qe263/tables/gaku-mcy2631.csv'],
  cpiMonthly: ['Statistics Bureau · CPI, YoY % (e-Stat)', 'https://www.e-stat.go.jp/stat-search/file-download?statInfId=000040482953&fileKind=1'],
  laborMonthly: ['Statistics Bureau · Labour Force Survey (seasonally adjusted)', 'https://www.e-stat.go.jp/stat-search/file-download?statInfId=000031831358&fileKind=0'],
};

export const indicatorMeta = {
  changeRate: { label: 'Population change', unit: '%', date: '2024-10-01' },
  agingRate: { label: 'Aged 65+', unit: '%', date: '2024-10-01' },
  incomePerCapita: { label: 'Income per capita', unit: 'thousand yen', date: 'FY2023' },
  density: { label: 'Population density', unit: 'people/km²', date: '2024-10-01' },
  areaKm2: { label: 'Area', unit: 'km²', date: '2024-10-01' },
};

// National reference values from the same tables (income = 全県計, the all-prefecture figure).
export const nationalIndicators = { changeRate: -0.44, agingRate: 29.3, incomePerCapita: 3639, areaKm2: 377975.64 };

export const PREFECTURE_INDICATORS = [
  { code: '01', name: 'Hokkaido', japanese: '北海道', changeRate: -0.97, agingRate: 33.3, incomePerCapita: 3000, areaKm2: 83422.27, areaReference: false, density: 60.5 },
  { code: '02', name: 'Aomori', japanese: '青森県', changeRate: -1.66, agingRate: 35.7, incomePerCapita: 2879, areaKm2: 9645.11, areaReference: false, density: 120.8 },
  { code: '03', name: 'Iwate', japanese: '岩手県', changeRate: -1.57, agingRate: 35.4, incomePerCapita: 2835, areaKm2: 15275.05, areaReference: false, density: 75.0 },
  { code: '04', name: 'Miyagi', japanese: '宮城県', changeRate: -0.73, agingRate: 29.6, incomePerCapita: 3054, areaKm2: 7282.3, areaReference: true, density: 308.7 },
  { code: '05', name: 'Akita', japanese: '秋田県', changeRate: -1.87, agingRate: 39.5, incomePerCapita: 2889, areaKm2: 11637.52, areaReference: false, density: 77.1 },
  { code: '06', name: 'Yamagata', japanese: '山形県', changeRate: -1.49, agingRate: 35.6, incomePerCapita: 3271, areaKm2: 9323.15, areaReference: true, density: 108.4 },
  { code: '07', name: 'Fukushima', japanese: '福島県', changeRate: -1.35, agingRate: 33.7, incomePerCapita: 3215, areaKm2: 13784.39, areaReference: false, density: 126.4 },
  { code: '08', name: 'Ibaraki', japanese: '茨城県', changeRate: -0.64, agingRate: 30.9, incomePerCapita: 3526, areaKm2: 6098.32, areaReference: false, density: 460.1 },
  { code: '09', name: 'Tochigi', japanese: '栃木県', changeRate: -0.66, agingRate: 30.5, incomePerCapita: 3550, areaKm2: 6408.09, areaReference: false, density: 294.2 },
  { code: '10', name: 'Gunma', japanese: '群馬県', changeRate: -0.62, agingRate: 31.1, incomePerCapita: 3523, areaKm2: 6362.28, areaReference: false, density: 297.1 },
  { code: '11', name: 'Saitama', japanese: '埼玉県', changeRate: 0.01, agingRate: 27.5, incomePerCapita: 3286, areaKm2: 3797.75, areaReference: true, density: 1930.6 },
  { code: '12', name: 'Chiba', japanese: '千葉県', changeRate: -0.08, agingRate: 28.1, incomePerCapita: 3275, areaKm2: 5156.48, areaReference: true, density: 1212.3 },
  { code: '13', name: 'Tokyo', japanese: '東京都', changeRate: 0.66, agingRate: 22.7, incomePerCapita: 6368, areaKm2: 2199.94, areaReference: true, density: 6444.7 },
  { code: '14', name: 'Kanagawa', japanese: '神奈川県', changeRate: -0.05, agingRate: 26.0, incomePerCapita: 3349, areaKm2: 2416.55, areaReference: false, density: 3817.4 },
  { code: '15', name: 'Niigata', japanese: '新潟県', changeRate: -1.29, agingRate: 34.2, incomePerCapita: 3156, areaKm2: 12583.67, areaReference: true, density: 166.8 },
  { code: '16', name: 'Toyama', japanese: '富山県', changeRate: -1.0, agingRate: 33.2, incomePerCapita: 3504, areaKm2: 4247.54, areaReference: true, density: 234.7 },
  { code: '17', name: 'Ishikawa', japanese: '石川県', changeRate: -1.0, agingRate: 30.7, incomePerCapita: 3081, areaKm2: 4186.2, areaReference: false, density: 262.3 },
  { code: '18', name: 'Fukui', japanese: '福井県', changeRate: -0.77, agingRate: 31.8, incomePerCapita: 3642, areaKm2: 4190.57, areaReference: false, density: 176.3 },
  { code: '19', name: 'Yamanashi', japanese: '山梨県', changeRate: -0.63, agingRate: 32.0, incomePerCapita: 3259, areaKm2: 4465.27, areaReference: true, density: 177.1 },
  { code: '20', name: 'Nagano', japanese: '長野県', changeRate: -0.84, agingRate: 32.9, incomePerCapita: 3164, areaKm2: 13561.56, areaReference: true, density: 146.5 },
  { code: '21', name: 'Gifu', japanese: '岐阜県', changeRate: -0.81, agingRate: 31.4, incomePerCapita: 3264, areaKm2: 10621.29, areaReference: true, density: 180.4 },
  { code: '22', name: 'Shizuoka', japanese: '静岡県', changeRate: -0.8, agingRate: 31.2, incomePerCapita: 3822, areaKm2: 7777.01, areaReference: true, density: 453.5 },
  { code: '23', name: 'Aichi', japanese: '愛知県', changeRate: -0.23, agingRate: 25.8, incomePerCapita: 4150, areaKm2: 5173.21, areaReference: true, density: 1442.0 },
  { code: '24', name: 'Mie', japanese: '三重県', changeRate: -0.94, agingRate: 30.9, incomePerCapita: 3444, areaKm2: 5774.48, areaReference: true, density: 296.3 },
  { code: '25', name: 'Shiga', japanese: '滋賀県', changeRate: -0.32, agingRate: 27.3, incomePerCapita: 3461, areaKm2: 4017.38, areaReference: true, density: 349.0 },
  { code: '26', name: 'Kyoto', japanese: '京都府', changeRate: -0.6, agingRate: 29.8, incomePerCapita: 3216, areaKm2: 4612.21, areaReference: false, density: 546.4 },
  { code: '27', name: 'Osaka', japanese: '大阪府', changeRate: -0.07, agingRate: 27.6, incomePerCapita: 3450, areaKm2: 1905.34, areaReference: false, density: 4596.0 },
  { code: '28', name: 'Hyogo', japanese: '兵庫県', changeRate: -0.61, agingRate: 30.2, incomePerCapita: 3277, areaKm2: 8400.82, areaReference: false, density: 635.3 },
  { code: '29', name: 'Nara', japanese: '奈良県', changeRate: -0.8, agingRate: 32.9, incomePerCapita: 2898, areaKm2: 3690.94, areaReference: false, density: 348.1 },
  { code: '30', name: 'Wakayama', japanese: '和歌山県', changeRate: -1.34, agingRate: 34.5, incomePerCapita: 3456, areaKm2: 4724.66, areaReference: false, density: 186.3 },
  { code: '31', name: 'Tottori', japanese: '鳥取県', changeRate: -1.16, agingRate: 33.7, incomePerCapita: 2611, areaKm2: 3507.03, areaReference: false, density: 151.4 },
  { code: '32', name: 'Shimane', japanese: '島根県', changeRate: -1.16, agingRate: 35.2, incomePerCapita: 3350, areaKm2: 6707.78, areaReference: false, density: 95.7 },
  { code: '33', name: 'Okayama', japanese: '岡山県', changeRate: -0.84, agingRate: 31.2, incomePerCapita: 3034, areaKm2: 7114.44, areaReference: true, density: 257.4 },
  { code: '34', name: 'Hiroshima', japanese: '広島県', changeRate: -0.86, agingRate: 30.4, incomePerCapita: 3316, areaKm2: 8478.16, areaReference: false, density: 320.1 },
  { code: '35', name: 'Yamaguchi', japanese: '山口県', changeRate: -1.26, agingRate: 35.5, incomePerCapita: 3336, areaKm2: 6113.0, areaReference: false, density: 209.6 },
  { code: '36', name: 'Tokushima', japanese: '徳島県', changeRate: -1.36, agingRate: 35.7, incomePerCapita: 3388, areaKm2: 4147.0, areaReference: false, density: 165.2 },
  { code: '37', name: 'Kagawa', japanese: '香川県', changeRate: -0.93, agingRate: 32.8, incomePerCapita: 3111, areaKm2: 1876.86, areaReference: true, density: 488.6 },
  { code: '38', name: 'Ehime', japanese: '愛媛県', changeRate: -1.22, agingRate: 34.5, incomePerCapita: 2865, areaKm2: 5675.89, areaReference: false, density: 224.8 },
  { code: '39', name: 'Kochi', japanese: '高知県', changeRate: -1.56, agingRate: 36.6, incomePerCapita: 2749, areaKm2: 7102.28, areaReference: false, density: 92.4 },
  { code: '40', name: 'Fukuoka', japanese: '福岡県', changeRate: -0.21, agingRate: 28.6, incomePerCapita: 2974, areaKm2: 4987.66, areaReference: true, density: 1020.9 },
  { code: '41', name: 'Saga', japanese: '佐賀県', changeRate: -0.82, agingRate: 32.0, incomePerCapita: 3044, areaKm2: 2440.64, areaReference: false, density: 322.9 },
  { code: '42', name: 'Nagasaki', japanese: '長崎県', changeRate: -1.21, agingRate: 34.7, incomePerCapita: 2782, areaKm2: 4131.2, areaReference: false, density: 303.1 },
  { code: '43', name: 'Kumamoto', japanese: '熊本県', changeRate: -0.69, agingRate: 32.6, incomePerCapita: 2928, areaKm2: 7409.19, areaReference: true, density: 229.0 },
  { code: '44', name: 'Oita', japanese: '大分県', changeRate: -1.0, agingRate: 34.4, incomePerCapita: 3042, areaKm2: 6340.7, areaReference: true, density: 171.1 },
  { code: '45', name: 'Miyazaki', japanese: '宮崎県', changeRate: -0.89, agingRate: 33.9, incomePerCapita: 2695, areaKm2: 7734.16, areaReference: true, density: 133.6 },
  { code: '46', name: 'Kagoshima', japanese: '鹿児島県', changeRate: -1.1, agingRate: 34.2, incomePerCapita: 2936, areaKm2: 9186.2, areaReference: true, density: 166.8 },
  { code: '47', name: 'Okinawa', japanese: '沖縄県', changeRate: -0.11, agingRate: 24.2, incomePerCapita: 2315, areaKm2: 2282.11, areaReference: false, density: 642.4 },
];

// [quarter, trillion yen, SA annual rate]
export const GDP_QUARTERLY = [
  ['2022Q4', 594.2], ['2023Q1', 606.5], ['2023Q2', 617.4], ['2023Q3', 618.0],
  ['2023Q4', 624.6], ['2024Q1', 622.2], ['2024Q2', 633.6], ['2024Q3', 641.8],
  ['2024Q4', 649.6], ['2025Q1', 655.3], ['2025Q2', 666.9], ['2025Q3', 668.1],
  ['2025Q4', 675.4], ['2026Q1', 680.2], ['2026Q2', 690.0], ['2026Q3', 692.7],
];

// [calendar year, trillion yen]
export const GDP_ANNUAL = [
  [2010, 510.1], [2011, 501.1], [2012, 505.4], [2013, 514.6],
  [2014, 528.2], [2015, 548.9], [2016, 556.0], [2017, 565.1],
  [2018, 569.2], [2019, 571.8], [2020, 554.1], [2021, 573.7],
  [2022, 584.5], [2023, 616.7], [2024, 636.9], [2025, 666.4],
];

// [month, all items YoY %, core (less fresh food) YoY %]
export const CPI_MONTHLY = [
  ['2024-11', 2.9, 2.7], ['2024-12', 3.6, 3.0], ['2025-01', 4.0, 3.2], ['2025-02', 3.7, 3.0],
  ['2025-03', 3.6, 3.2], ['2025-04', 3.6, 3.5], ['2025-05', 3.5, 3.7], ['2025-06', 3.3, 3.3],
  ['2025-07', 3.1, 3.1], ['2025-08', 2.7, 2.7], ['2025-09', 2.9, 2.9], ['2025-10', 3.0, 3.0],
  ['2025-11', 2.9, 3.0], ['2025-12', 2.1, 2.4], ['2026-01', 1.5, 1.9], ['2026-02', 1.3, 1.5],
  ['2026-03', 1.5, 1.7], ['2026-04', 1.4, 1.4], ['2026-05', 1.5, 1.4], ['2026-06', 1.6, 1.6],
  ['2026-07', 1.9, 1.8], ['2026-08', 1.9, 1.7], ['2026-09', 2.1, 2.1], ['2026-10', 2.3, 2.2],
];

// [month, unemployment rate %, seasonally adjusted]
export const UNEMPLOYMENT_MONTHLY = [
  ['2024-10', 2.5], ['2024-11', 2.5], ['2024-12', 2.5], ['2025-01', 2.5], ['2025-02', 2.4], ['2025-03', 2.5],
  ['2025-04', 2.5], ['2025-05', 2.5], ['2025-06', 2.5], ['2025-07', 2.4], ['2025-08', 2.6], ['2025-09', 2.6],
  ['2025-10', 2.6], ['2025-11', 2.6], ['2025-12', 2.6], ['2026-01', 2.7], ['2026-02', 2.6], ['2026-03', 2.7],
  ['2026-04', 2.5], ['2026-05', 2.5], ['2026-06', 2.5], ['2026-07', 2.4], ['2026-08', 2.5], ['2026-09', 2.4],
];
