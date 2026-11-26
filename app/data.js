export const sources = {
  population: ['Statistics Bureau · Population Estimates', 'https://www.stat.go.jp/data/jinsui/2024np/pdf/2024gaiyou.pdf'],
  gdp: ['Cabinet Office · National Accounts', 'https://www.esri.cao.go.jp/jp/sna/data/data_list/kakuhou/gaiyou/pdf/point_20251208.pdf'],
  cpi: ['Statistics Bureau · Consumer Price Index', 'https://www.stat.go.jp/info/headline/pdf/202510.pdf'],
  labor: ['Statistics Bureau · Labour Force Survey', 'https://www.stat.go.jp/info/t-news/pdf/2604.pdf'],
  trade: ['Japan Customs · Trade Statistics', 'https://www.customs.go.jp/toukei/suii/html/nenbet.htm'],
  life: ['MHLW · Abridged Life Tables', 'https://www.mhlw.go.jp/english/database/db-hw/lifetb24/dl/lifetb24-06.pdf'],
  physicians: ['MHLW · Physician Statistics', 'https://www.mhlw.go.jp/toukei/saikin/hw/ishi/24/dl/R06_kekka-1.pdf'],
  education2022: ['MEXT · School Basic Survey 2022', 'https://www.mext.go.jp/content/20241011-mxt_daigakuc01-000038093_1.pdf'],
  education2024: ['MEXT · School Basic Survey 2024', 'https://www.mext.go.jp/content/20241213-mxt_chousa01-000037551_01.pdf'],
};

export const population = [
  [1950, 83200], [1955, 89276], [1960, 93419], [1965, 98275], [1970, 103720],
  [1975, 111940], [1980, 117060], [1985, 121049], [1990, 123611], [1995, 125570],
  [2000, 126926], [2005, 127768], [2006, 127901], [2007, 128033], [2008, 128084],
  [2009, 128032], [2010, 128057], [2011, 127834], [2012, 127593], [2013, 127414],
  [2014, 127237], [2015, 127095], [2016, 127042], [2017, 126919], [2018, 126749],
  [2019, 126555], [2020, 126146], [2021, 125502], [2022, 124947], [2023, 124352],
  [2024, 123802],
];

export const ageGroups = [
  ['Under 15', 13830, 11.2], ['15–64', 73728, 59.6], ['65 and older', 36243, 29.3],
];

export const gdp = [[2019, 570.6], [2020, 554.3], [2021, 576.6], [2022, 591.7], [2023, 619.4], [2024, 642.4]];
export const cpi = [[2020, 0], [2021, -0.2], [2022, 2.5], [2023, 3.2], [2024, 2.7]];
export const unemployment = [[2020, 2.8], [2021, 2.8], [2022, 2.6], [2023, 2.6], [2024, 2.5]];

export const prefectures = [
  ['Tokyo', '東京都', 14178], ['Kanagawa', '神奈川県', 9225], ['Osaka', '大阪府', 8757],
  ['Aichi', '愛知県', 7460], ['Saitama', '埼玉県', 7332], ['Chiba', '千葉県', 6251],
  ['Hyogo', '兵庫県', 5337], ['Fukuoka', '福岡県', 5092], ['Hokkaido', '北海道', 5043],
  ['Shizuoka', '静岡県', 3527], ['Ibaraki', '茨城県', 2806], ['Hiroshima', '広島県', 2714],
  ['Kyoto', '京都府', 2520], ['Miyagi', '宮城県', 2248], ['Niigata', '新潟県', 2099],
  ['Nagano', '長野県', 1987], ['Gifu', '岐阜県', 1916], ['Gunma', '群馬県', 1890],
  ['Tochigi', '栃木県', 1885], ['Okayama', '岡山県', 1831], ['Fukushima', '福島県', 1743],
  ['Mie', '三重県', 1711], ['Kumamoto', '熊本県', 1697], ['Kagoshima', '鹿児島県', 1532],
  ['Okinawa', '沖縄県', 1466], ['Shiga', '滋賀県', 1402], ['Nara', '奈良県', 1285],
  ['Yamaguchi', '山口県', 1281], ['Ehime', '愛媛県', 1276], ['Nagasaki', '長崎県', 1252],
  ['Aomori', '青森県', 1165], ['Iwate', '岩手県', 1145], ['Ishikawa', '石川県', 1098],
  ['Oita', '大分県', 1085], ['Miyazaki', '宮崎県', 1033], ['Yamagata', '山形県', 1011],
  ['Toyama', '富山県', 997], ['Kagawa', '香川県', 917], ['Akita', '秋田県', 897],
  ['Wakayama', '和歌山県', 880], ['Yamanashi', '山梨県', 791], ['Saga', '佐賀県', 788],
  ['Fukui', '福井県', 739], ['Tokushima', '徳島県', 685], ['Kochi', '高知県', 656],
  ['Shimane', '島根県', 642], ['Tottori', '鳥取県', 531],
].map(([name, japanese, thousands], index) => ({ name, japanese, thousands, rank: index + 1 }));

export const society = {
  2022: { men: 81.05, women: 87.09, physicians: 343275, students: 2632216 },
  2024: { men: 81.09, women: 87.13, physicians: 347772, students: 2628310 },
};
