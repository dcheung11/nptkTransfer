import * as echarts from 'echarts';
import { darkTheme } from './dark';
import { infographic } from './infographic';
import { macarons } from './macarons';
import { roma } from './roma';
import { vintage } from './vintage';
import { shine } from './shine';

echarts.registerTheme('dark', darkTheme);
echarts.registerTheme('infographic', infographic);
echarts.registerTheme('macarons', macarons);
echarts.registerTheme('roma', roma);
echarts.registerTheme('macarons', macarons);
echarts.registerTheme('vintage', vintage);
echarts.registerTheme('shine', shine);
console.log("done");
