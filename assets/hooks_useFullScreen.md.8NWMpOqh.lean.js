import{h as g,y as D,P as v,a6 as w,d as f,D as F,o as m,c as b,I as E,w as c,a as s,t as C,m as x,k as i,R as S}from"./chunks/framework.2gZay9Je.js";function r(a){return w(a)?a.value:typeof a=="string"?(document.querySelector(a)||console.error(`useTabScroll: 节点目标错误，没有找到${a}的元素`),document.querySelector(a)):a}function B(a,k=window){const h={};let n;const o=new WeakMap,d=g(!1);D(d,e=>{v(()=>{e?p():u()})},{immediate:!0});function p(){const e=r(k),t=r(a);t&&(h.target=r(a).getAttribute("style")||"",e instanceof Window?A(t):(n=t.parentElement,_(t,e)))}function u(){var t;document.body.setAttribute("style",h.body||""),r(a).setAttribute("style",h.target||""),r(k)instanceof Window||(t=r(k))==null||t.setAttribute("style",h.fulldom),n&&n.appendChild(r(a));let e=window;for(;e.parent!==e;){for(const l of Array.from(e.parent.document.querySelectorAll("iframe")))if(l.contentWindow===e){l==null||l.setAttribute("style",o.get(l)||"");break}e=e.parent}}function A(e){h.body=document.body.getAttribute("style")||"",document.body.setAttribute("style","overflow: hidden;width: 100%;height: 100%;"),e.setAttribute("style","position: fixed; top: 0; left: 0; width: 100%; height: 100%;margin:0;z-index: 99999;");let t=window;for(;t.parent!==t;){for(const l of Array.from(t.parent.document.querySelectorAll("iframe")))if(l.contentWindow===t){o.set(l,l.getAttribute("style")||""),l==null||l.setAttribute("style","position: fixed; top: 0; left: 0; width: 100%; height: 100%;margin: 0;z-index: 99999;");break}t=t.parent}}function _(e,t){let l=r(t),y=window;for(;!l&&y.parent!==y;)y=y.parent,l=r(t);if(!l){console.error("useFullScreen: 找不到全屏容器");return}h.fulldom=l.getAttribute("style"),l.setAttribute("style","position: relative"),e.setAttribute("style","position: absolute; top: 0; left: 0; width: 100%; height: 100%;margin:0;z-index: 99999;"),l.appendChild(e)}return{isFull:d}}const T=f({__name:"useFullScreen.md.demo.a1ebd88c",setup(a){const k=g(),{isFull:h}=B(k);function n(){h.value=!h.value}return(o,d)=>{const p=F("a-button");return m(),b("div",{ref_key:"dom",ref:k,class:"h-100% flex flex-col bg-#f5f5f5 p-20px",border:"1px solid red"},[E(p,{class:"w-180px",type:"primary",onClick:n},{default:c(()=>[s(C(x(h)?"退出全屏":"全屏"),1)]),_:1})],512)}}}),M=f({__name:"useFullScreen.md.demo.a1ebd88a",setup(a){const k=g(),h=g(),{isFull:n}=B(h,k);function o(){n.value=!n.value}return(d,p)=>{const u=F("a-button");return m(),b("div",{ref_key:"dom",ref:k,class:"h-300px flex flex-col bg-#f5f5f5 p-20px",border:"1px solid red"},[i("div",{ref_key:"boxDom",ref:h,class:"w-30% h-30% flex flex-col mt-20px bg-#999",border:"1px solid red"},[E(u,{class:"w-180px",type:"primary",onClick:o},{default:c(()=>[s(C(x(n)?"退出全屏":"局域内全屏"),1)]),_:1})],512)],512)}}}),H=S('<h1 id="usefullscreen" tabindex="-1">useFullScreen <a class="header-anchor" href="#usefullscreen" aria-label="Permalink to &quot;useFullScreen&quot;">​</a></h1><p>这是一个全屏的hook，可以快速将一个元素全屏显示,并且支持了iframe。</p><h2 id="源文件" tabindex="-1">源文件 <a class="header-anchor" href="#源文件" aria-label="Permalink to &quot;源文件&quot;">​</a></h2><p><a href="https://github.com/shiouhoo/hooui/blob/main/src/hooks/useFullScreen.ts" target="_blank" rel="noreferrer">useFullScreen.ts</a></p><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><h3 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h3>',6),L=i("div",{class:"language-vue vp-adaptive-theme"},[i("span",{class:"lang"},"vue"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code","v-pre":""},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"script"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," setup"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," lang"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"ts"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"import"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," { useFullScreen } "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"from"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," '../../src/hooks'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," dom"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," ref"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"HTMLElement"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">();")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," { "),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"isFull"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," } "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," useFullScreen"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(dom "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"as"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," Ref"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"HTMLElement"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">);")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"function"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," handleClick"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"() {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    isFull.value "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," !"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"isFull.value;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"script"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"template"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"div"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," ref"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"dom"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," class"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"h-100% flex flex-col bg-#f5f5f5 p-20px"'),i("span",{style:{"--shiki-light":"#B31D28","--shiki-dark":"#FDAEB7","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," border"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"1px solid red"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"a-button"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," class"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"w-180px"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," type"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"primary"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," @click"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"handleClick"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},'>{{isFull?"退出全屏":"全屏" }}</'),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"a-button"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    </"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"div"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"template"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1),P=i("h3",{id:"局域内全屏",tabindex:"-1"},[s("局域内全屏 "),i("a",{class:"header-anchor",href:"#局域内全屏","aria-label":'Permalink to "局域内全屏"'},"​")],-1),q=i("p",null,"将元素在他的祖先容器中全屏显示，祖先元素会被修改为relative且无论中间节点是否有定位。",-1),R=i("div",{class:"language-vue vp-adaptive-theme"},[i("span",{class:"lang"},"vue"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code","v-pre":""},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"script"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," setup"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," lang"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"ts"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"import"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," { useFullScreen } "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"from"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," '../../src/hooks'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," dom"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," ref"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"HTMLElement"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">();")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"/** 局域内全屏 */")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," boxDom"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," ref"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"HTMLElement"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">();")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," { "),i("span",{style:{"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"}},"isFull"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},": "),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"isFull2"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," } "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," useFullScreen"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(boxDom "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"as"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," Ref"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"HTMLElement"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">, dom "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"as"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," Ref"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"HTMLElement"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">);")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"function"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," handleClick2"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"() {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    isFull2.value "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," !"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"isFull2.value;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"script"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"<"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"template"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"div"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," ref"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"dom"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," class"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"h-300px flex flex-col bg-#f5f5f5 p-20px"'),i("span",{style:{"--shiki-light":"#B31D28","--shiki-dark":"#FDAEB7","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," border"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"1px solid red"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"div"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," ref"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"boxDom"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," class"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"w-30% h-30% flex flex-col mt-20px bg-#999"'),i("span",{style:{"--shiki-light":"#B31D28","--shiki-dark":"#FDAEB7","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}}," border"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"1px solid red"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"            <"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"a-button"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," class"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"w-180px"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," type"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"primary"'),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," @click"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"handleClick2"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},'>{{isFull2?"退出全屏":"局域内全屏" }}</'),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"a-button"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        </"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"div"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    </"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"div"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"</"),i("span",{style:{"--shiki-light":"#22863A","--shiki-dark":"#85E89D"}},"template"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},">")])])])],-1),V=i("h2",{id:"props-参数",tabindex:"-1"},[s("props 参数 "),i("a",{class:"header-anchor",href:"#props-参数","aria-label":'Permalink to "props 参数"'},"​")],-1),W=i("h2",{id:"返回值",tabindex:"-1"},[s("返回值 "),i("a",{class:"header-anchor",href:"#返回值","aria-label":'Permalink to "返回值"'},"​")],-1),$=JSON.parse('{"title":"useFullScreen","description":"","frontmatter":{"outline":[2,3]},"headers":[],"relativePath":"hooks/useFullScreen.md","filePath":"hooks/useFullScreen.md"}'),N={name:"hooks/useFullScreen.md"},I=f({...N,setup(a){const k=[{name:"第一个参数",desc:"要全屏的节点",type:"Ref<HTMLElement>| string | HTMLElement",defaultValue:"-"},{name:"第二个参数",desc:"全屏容器，将目标节点在此容器上全屏，不填默认为window",type:"Ref<HTMLElement>| string | HTMLElement | Window ",defaultValue:"window"}],h=[{name:"isFull",desc:"标识是否全屏",type:"Ref<boolean>",defaultValue:"-"}];return(n,o)=>{const d=F("demo"),p=F("ParamsTable");return m(),b("div",null,[H,E(d,{customClass:"",sourceCode:`<script setup lang="ts">
import { useFullScreen } from '../../src/hooks';

const dom = ref<HTMLElement>();

const { isFull } = useFullScreen(dom as Ref<HTMLElement>);

function handleClick() {
    isFull.value = !isFull.value;
}

<\/script>
<template>
    <div ref="dom" class="h-100% flex flex-col bg-#f5f5f5 p-20px" border="1px solid red">
        <a-button class="w-180px" type="primary" @click="handleClick">{{isFull?"退出全屏":"全屏" }}</a-button>
    </div>
</template>
`,options:"{}"},{highlight:c(()=>[L]),default:c(()=>[E(T)]),_:1}),P,q,E(d,{customClass:"",sourceCode:`<script setup lang="ts">
import { useFullScreen } from '../../src/hooks';

const dom = ref<HTMLElement>();
/** 局域内全屏 */
const boxDom = ref<HTMLElement>();

const { isFull: isFull2 } = useFullScreen(boxDom as Ref<HTMLElement>, dom as Ref<HTMLElement>);

function handleClick2() {
    isFull2.value = !isFull2.value;
}

<\/script>
<template>
    <div ref="dom" class="h-300px flex flex-col bg-#f5f5f5 p-20px" border="1px solid red">
        <div ref="boxDom" class="w-30% h-30% flex flex-col mt-20px bg-#999" border="1px solid red">
            <a-button class="w-180px" type="primary" @click="handleClick2">{{isFull2?"退出全屏":"局域内全屏" }}</a-button>
        </div>
    </div>
</template>
`,options:"{}"},{highlight:c(()=>[R]),default:c(()=>[E(M)]),_:1}),V,E(p,{data:k}),W,E(p,{data:h})])}}});export{$ as __pageData,I as default};