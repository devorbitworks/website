import raw from '../../docs/figma/content-map.json';
export type PageKey = keyof typeof raw;
export type Asset = {asset: string; w: number; h: number};
export function section(page: PageKey, name: string) {
  const find = (view: 'desktop' | 'mobile') => raw[page][view].sections.find(s => s.name === name);
  const d = find('desktop');
  if (!d) throw new Error(`Missing approved Figma section ${page}/${name}`);
  const m = find('mobile');
  return { t: d.texts.map(x => x.text), mt: m?.texts.map(x => x.text) ?? [], a: d.assets, ma: m?.assets ?? [] };
}
