import type {CSSProperties} from 'react';
import type {Asset} from '@/lib/design';
import records from '../../docs/figma/product-layers.json';
import {TapPanel} from './motion';
import {Art,Copy} from './ui';

type Layer = (typeof records)[keyof typeof records];
const layers: Partial<Record<string,Layer>> = records;
const percent = (value:number, dimension:number) => `${value / dimension * 100}%`;

export function ProductStage({desktop,mobile,alt,panelLabel,priority=false}:{
  desktop:Asset;
  mobile?:Asset;
  alt:string;
  panelLabel?:string;
  priority?:boolean;
}) {
  const large=layers[desktop.asset];
  const small=mobile && layers[mobile.asset];
  if (!large || !small) {
    return <div className="product-stack"><Art asset={desktop} mobile={mobile} alt={alt} className="product-background" priority={priority}/></div>;
  }
  const background = (layer:Layer):Asset => ({asset:layer.background,...layer.stage});
  const panel = (layer:Layer):Asset => ({asset:layer.panel,w:layer.panelBox.w,h:layer.panelBox.h});
  const style:CSSProperties & Record<`--${string}`,string> = {};
  for (const [prefix,layer] of [['desktop',large],['mobile',small]] as const) {
    const {stage,panelBox,tags}=layer;
    style[`--${prefix}-panel-left`]=percent(panelBox.x,stage.w);
    style[`--${prefix}-panel-top`]=percent(panelBox.y,stage.h);
    style[`--${prefix}-panel-width`]=percent(panelBox.w,stage.w);
    style[`--${prefix}-panel-radius`]=`${panelBox.cornerRadius}px`;
    const shadow=panelBox.effects.find(effect=>effect.type==='DROP_SHADOW' && effect.visible);
    style[`--${prefix}-panel-shadow`]=shadow ? `${shadow.offset.x}px ${shadow.offset.y}px ${shadow.radius}px ${shadow.spread}px rgb(${Math.round(shadow.color.r*255)} ${Math.round(shadow.color.g*255)} ${Math.round(shadow.color.b*255)} / ${Math.round(shadow.color.a*100)}%)` : 'none';
    tags.forEach(({x,y,w,h},index)=>{
      if(index!==0) return;
      style[`--${prefix}-tag-left`]=percent(x,stage.w);
      style[`--${prefix}-tag-top`]=percent(y,stage.h);
      style[`--${prefix}-tag-width`]=percent(w,stage.w);
      style[`--${prefix}-tag-height`]=percent(h,stage.h);
    });
  }
  const largeTag=large.tags.at(0);
  const smallTag=small.tags.at(0);
  return <div className="product-stack product-layered" style={style}>
    <Art asset={background(large)} mobile={background(small)} alt={alt} className="product-background" priority={priority}/>
    <TapPanel className="product-panel" label={panelLabel ?? alt}><Art asset={panel(large)} mobile={panel(small)} priority={priority}/></TapPanel>
    {largeTag && smallTag && <span className="product-tag"><Copy text={largeTag.text} mobile={smallTag.text}/></span>}
  </div>;
}
