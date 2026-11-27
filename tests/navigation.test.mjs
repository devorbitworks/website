import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {nav,operationFeatureIds,orbitShortcuts,orbitMoreShortcuts} from '../src/lib/navigation.ts';
const content=JSON.parse(readFileSync(new URL('../docs/figma/content-map.json',import.meta.url),'utf8'));
const page=readFileSync(new URL('../src/app/page.tsx',import.meta.url),'utf8');
test('primary menu order remains unchanged',()=>assert.deepEqual(nav.map(x=>x.label),['회사소개','사업영역','오빗웍스','업데이트']));
test('six feature categories match the requested order',()=>assert.deepEqual(orbitShortcuts.map(x=>x.label),['계약','단지','자산','공문서 수발신','인사','배치·폐지 신고']));
test('operation anchors align with the nine approved desktop and mobile cards',()=>{
  assert.equal(new Set(operationFeatureIds).size,9);
  for(const view of ['desktop','mobile'])assert.equal(content.orbit[view].sections.find(x=>x.name==='section/orbit-details').assets.length,operationFeatureIds.length);
  assert.match(page,/id=\{operationFeatureIds\[i\]\}/);
});
test('every menu shortcut resolves to an existing or generated homepage anchor',()=>{
  const known=new Set([...operationFeatureIds,'complexes','product','personnel','deployment','features','patrol','inquiry','onboarding']);
  for(const x of [...orbitShortcuts,...orbitMoreShortcuts]){
    assert.ok(known.has(x.id),x.id);assert.match(x.id,/^[a-z][a-z0-9-]*$/);assert.ok(x.description.length>5);
  }
});
test('unreleased patrol remains explicitly marked as planned',()=>{
  assert.equal(orbitMoreShortcuts.find(x=>x.id==='patrol').planned,true);
  assert.ok(orbitShortcuts.every(x=>!x.planned));
});

test('complex shortcut opens contract/site management, not employee assignment',()=>{
  assert.equal(orbitShortcuts.find(x=>x.label==='단지').id,'complexes');
  assert.equal(operationFeatureIds[2],'assignment');
  assert.match(page,/<div id="complexes"[^>]*><Product name="contracts" id="product"\/>/);
});
