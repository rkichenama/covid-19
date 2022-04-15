(()=>{"use strict";var e,t={9150:(e,t,a)=>{var o=a(7294),n=a(745),r=a(8804);const l=(0,r.ZP)((({className:e,children:t,x:a,y:n,w:r=1,h:l=1})=>o.createElement("section",{children:t,className:`${a?`x${a} `:""}${n?`y${n} `:""}w${r} h${l} panel ${e}`})))`
  background-color: ${e=>e.noBg?"transparent":"hsla(0, 0%, 0%, 0.6)"};

  & & {
    margin: 2px;
    padding: 0 2px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }

  ${e=>e.style}
`;var i=a(3279),s=a.n(i);const c=(0,r.ZP)((({id:e,className:t,draw:a,onMouseEnter:n,onMouseMove:r,onMouseLeave:l})=>{const[i,c]=o.useState({x:0,y:0,width:0,height:0}),d=o.useRef(void 0);o.useEffect((()=>{const{current:e}=d;e&&a&&a(e.getContext("2d"),i)}),[d.current,a,i]);const h=o.useCallback((()=>{if(!d.current)return;const{x:e,y:t,width:a,height:o}=d.current.getBoundingClientRect();c({x:e,y:t,width:a,height:o})}),[c]);return o.useEffect((()=>{const e=s()(h,200,{trailing:!0,maxWait:1e3});return window.addEventListener("resize",e),e(),()=>{window.removeEventListener("resize",e)}}),[]),o.createElement("canvas",{id:e,className:t,onMouseEnter:e=>n(e,d.current.getContext("2d"),i),onMouseMove:e=>r(e,d.current.getContext("2d"),i),onMouseLeave:e=>l(e,d.current.getContext("2d"),i),ref:d,width:i.width,height:i.height})}))`
  width: 100%;
  height: 100%;

  ${e=>e.style}
`;var d=a(6264),h=a(6127),m=a(3703),u=a(5472),p=a.n(u);const f=JSON.parse('["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]');var g,v;!function(e){e.Cases="cases",e.Deaths="deaths"}(g||(g={})),function(e){e.ShowOverall="show-overall",e.Deltas="deltas",e.LogScale="log-scale"}(v||(v={}));const w=o.createContext(void 0),x=({children:e})=>{const[t,a]=o.useState({chartVerticalPadding:1.1,pandemicStart:new Date(2020,0,21),fromBottom:32,fromLeft:0,months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dataType:g.Cases,options:[v.ShowOverall],textInChartFont:'12px "Source Code Pro"',chartMetaColor:"#cccccc",hoverValue:{date:void 0,value:0},maxRange:1032,selectedStates:[],hoveredDataPoints:[],lineWidthMain:2,lineWidthGrid:.5}),n=o.useCallback((e=>{a((t=>({...t,...e})))}),[a]),r=o.useMemo((()=>t.options.includes(v.ShowOverall)),[t.options]),l=o.useMemo((()=>t.options.includes(v.Deltas)),[t.options]),i=o.useMemo((()=>t.options.includes(v.LogScale)),[t.options]);return o.useLayoutEffect((()=>{const e=()=>{let e=(()=>{let e=[];return location.hash.length>1&&(e=decodeURIComponent(location.hash.slice(1)).split(",").filter((e=>f.includes(e)))),e})();!e.length&&(e=["New York","Florida","Texas"]),n({selectedStates:p()(e,[e=>e.toLowerCase()],["asc"])})};return window.addEventListener("hashchange",e),e(),()=>{window.removeEventListener("hashchange",e)}}),[]),o.createElement(w.Provider,{value:{...t,update:n,includeUS:r,isRelative:l,isLogScale:i}},e)};x.displayName="GlobalContext";const y=x,k=({style:e,scaledY:t,scaledX:a,data:n})=>{const{fromBottom:r,fromLeft:l,maxRange:i,pandemicStart:s,lineWidthMain:u}=o.useContext(w),p=o.useCallback((e=>t(i,e-r)),[t,i,r]);return o.createElement(c,{id:n?.name?(0,d.camelize)(n.name):void 0,draw:(e,{width:t,height:o})=>{e.clearRect(0,0,t,o);const r=p(o),i=a(s,(0,h.Z)(new Date,(0,m.Z)(s))+1,t-l);if(n.data.length){e.beginPath(),e.strokeStyle=n.color,e.lineWidth=u,e.moveTo(i(n.data[0].x)+l,r(n.data[0].y));for(let t=1;t<n.data.length;t++)e.lineTo(i(n.data[t].x)+l,r(n.data[t].y));e.stroke(),e.closePath()}},style:e})};var b=a(5564),E=a.n(b),C=a(9669),S=a.n(C);const M=(e=>{const t=S().create({baseURL:"https://disease.sh/v3/covid-19/"});return t.interceptors.response.use((e=>(e.data&&/^application\/json/.test(e.headers["content-type"])&&(e.data=(0,d.camelizeKeys)(e.data)),e))),t.interceptors.request.use((e=>{const t={...e};return"multipart/form-data"===t.headers["Content-Type"]||(e.params&&(t.params=(0,d.decamelizeKeys)(e.params)),e.data&&(t.data=(0,d.decamelizeKeys)(e.data))),t})),t})();var P=a(2902),Z=a(9734),z=a.n(Z);const N=(e=[])=>(t,a=!1)=>z()(e.map((({date:e,[t]:o},n,r)=>({x:(0,P.Z)(e),y:a&&n?o-(r[n-1][t]||0):o}))),[({x:e})=>e]),L=[2,2,1],I=(L.reduce(((e,t)=>e+t),0),L.length,{year:"numeric",month:"long",day:"numeric"}),D={year:"2-digit",month:"2-digit",day:"2-digit"},T=e=>e instanceof Date?e:(0,P.Z)(e),O=e=>t=>e.toLocaleDateString(void 0,t),$=e=>O(T(e))(I),R=e=>e.toLocaleString(void 0,{notation:"compact"}),W=window._tasks=new Map,F=window._executeTasks=(e=!1)=>{Array.from(W.values()).map((t=>(!e&&t.countdown--,t))).filter((({countdown:t})=>e||0>=t)).forEach((t=>{t.fn(),!e&&(t.countdown=t.delay)}))};window.setInterval(F,1e3);const j=(e,t)=>(0,o.useEffect)((()=>{const a=Symbol();return W.set(a,{fn:t,delay:1*e,countdown:0}),()=>{W.has(a)&&W.delete(a)}}),[e,t]),_=(e,t)=>({...e,...t}),A={"New York":"#008BC4",Alabama:"#996633",Arizona:"#16256b",California:"#000080",Delaware:"#71a1a0",Florida:"#cc6500",Georgia:"#993366",Hawaii:"#f00c0f",Idaho:"#339966",Indiana:"#0000cc",Kentucky:"#ffe39b",Louisiana:"#c41e3a",Maryland:"#336699",Massachusetts:"#0000ff",Minnesota:"#800080",Nevada:"#c0c0c0","New Hampshire":"#fa500","New Jersey":"#f0dc82","New Mexico":"#ffff00","North Carolina":"#cc0000",Ohio:"#0000ff",Oklahoma:"#008000",Oregon:"#ccac00",Pennsylvania:"#008800","South Carolina":"#00416a","South Dakota":"#ffd700",Tennessee:"#ff7f00",Texas:"#ff0000",Utah:"#ffcc33",Vermont:"#006400","West Virginia":"#cfb53b",Wyoming:"#a52a2a"};var V=a(7349),U=a(4135),B=a(1640),Y=a(8148),G=a(876),K=a(7950),J=a(1593),H=a(6843),X=a(9119);const q=(e,t)=>{if(!e)return t;const a=(o=7,(e,t)=>{const[{y:a},...n]=e.slice(t-o-1,t);return n.reduce((e=>(t,{y:a},o,n)=>t+Math.max(0,o?a-n[o-1].y:a-e))(a),0)/o});var o;return t.map((({data:e,...t})=>({...t,data:e.map(((e,t,o)=>{if(t<=7)return e;const n=a(o,t);return{...e,y:n}}))})))},Q=e=>(t,a)=>o=>e?a*(1-Math.max(0,Math.log10(o)/Math.log10(t))):a*(1-o/t),ee=e=>(t,a)=>o=>e?Math.pow(10,(a-o)*(Math.log10(t)/a)):t/a*(a-o),te=(e,t,a)=>o=>a*((0,h.Z)(o,(0,m.Z)(e))/t),ae=(e,t,a)=>o=>(0,V.Z)((0,m.Z)(e),Math.floor(t*(o/a))),oe=({zIndex:e})=>{const{pandemicStart:t,fromLeft:a,fromBottom:n,months:r,chartMetaColor:l,textInChartFont:i}=o.useContext(w);return o.createElement(c,{draw:(e,{width:o,height:s})=>{e.clearRect(0,0,o,s);let c=(0,m.Z)(t);const d=new Date,u=te(t,(0,h.Z)(new Date,(0,m.Z)(t)),o-a);let p=0;for(;c<d;){e.beginPath(),e.fillStyle=`rgba(0, 0, 0, ${p%2?.6:.2})`;let t=u(c)+a;const o=u((0,U.Z)(c))-t;e.fillRect(t,0,o,s),e.closePath(),e.beginPath(),e.fillStyle=l,e.font=i,e.textAlign="center",e.fillText(r[p%r.length],t+o/2,s-n+12),e.closePath(),c=(0,B.Z)(c,1),p++}let f=(0,Y.Z)(t);for(p=0;f<d;){e.beginPath();let o=u(f)+a;(0,G.Z)(f);const r=u((0,K.Z)([d,(0,G.Z)(f)]))-o;e.fillStyle=l,e.font=i,e.textAlign="center",e.fillText(`${t.getFullYear()+p}`,o+r/2,s-n+16+12),e.closePath(),f=(0,J.Z)(f,1),p++}},style:{position:"absolute",top:"0",left:"0","z-index":e}})},ne=({zIndex:e})=>{const{isLogScale:t,fromLeft:a,fromBottom:n,maxRange:r,chartMetaColor:l,textInChartFont:i,lineWidthGrid:s}=o.useContext(w);return o.createElement(c,{draw:(e,{width:o,height:c})=>{e.clearRect(0,0,o,c);const d=Q(t)(r,c-n),h=t=>{const n=d(t);e.beginPath(),e.strokeStyle=l,e.lineWidth=s,e.moveTo(a,n),e.lineTo(o,n),e.stroke(),e.closePath(),e.beginPath(),e.fillStyle=l,e.font=i,e.textAlign="left",e.fillText(`${R(Math.round(t))}`,a,n+12),e.closePath(),e.beginPath(),e.fillStyle=l,e.font=i,e.textAlign="right",e.fillText(`${R(Math.round(t))}`,o,n+12),e.closePath()};if(h(0),t){const e=Math.ceil(Math.log10(r));for(let t=1;t<=e;t++)h(Math.pow(10,t))}else{h(r);for(let e=1;e<10;e++)h(r*(e/10))}},style:{position:"absolute",top:"0",left:"0","z-index":e}})},re=({zIndex:e})=>{const{pandemicStart:t,fromLeft:a,fromBottom:n,lineWidthGrid:r}=o.useContext(w);return o.createElement(c,{draw:(e,{width:o,height:l})=>{e.clearRect(0,0,o,l);const i=te(t,(0,h.Z)(new Date,(0,m.Z)(t)),o-a),s=window?.importantDates||{};Object.entries(s).forEach((([t])=>{(t=>{const o=i(t)+a;e.beginPath(),e.strokeStyle="red",e.lineWidth=r,e.moveTo(o,0),e.lineTo(o,l-n),e.stroke(),e.closePath()})(new Date(t))}))},style:{position:"absolute",top:"0",left:"0","z-index":e}})},le=({zIndex:e})=>{const{fromBottom:t,fromLeft:a,isLogScale:n,maxRange:r,pandemicStart:l,hoverValue:i,update:s,lineWidthGrid:d}=o.useContext(w);return o.createElement(c,{onMouseEnter:(e,t,{width:a,height:o})=>{t.clearRect(0,0,a,o),s({hoverValue:{...i,date:void 0}})},onMouseLeave:(e,t,{width:a,height:o})=>{t.clearRect(0,0,a,o),s({hoverValue:{...i,date:void 0}})},onMouseMove:(e,o,{width:i,height:c,y:u})=>{o.clearRect(0,0,i,c);const p=e.clientX,f=e.clientY-u;f>c-t||p<a||(o.beginPath(),o.strokeStyle="yellow",o.lineWidth=d,o.moveTo(a,f),o.lineTo(i,f),o.stroke(),o.closePath(),o.beginPath(),o.strokeStyle="yellow",o.lineWidth=d,o.moveTo(p,c-t),o.lineTo(p,0),o.stroke(),o.closePath(),s({hoverValue:{date:ae(l,(0,h.Z)(new Date,(0,m.Z)(l)),i-a)(p+a),value:ee(n)(r,c-t)(f)}}))},style:{position:"absolute",top:"0",left:"0","z-index":e,cursor:"crosshair"}})},ie=({zIndex:e,US:t})=>{const{isLogScale:a,includeUS:n}=o.useContext(w);return n&&t.loaded&&t.data.length?o.createElement(k,{scaledX:te,data:t.data[0],scaledY:Q(a),style:{position:"absolute",top:"0",left:"0","z-index":e}}):null},se=({zIndex:e,States:t})=>{const{isLogScale:a}=o.useContext(w);return t.loaded&&t.datasets.length?o.createElement(o.Fragment,null,p()(t.datasets,[({name:e})=>e.toLowerCase()],["asc"]).map(((t,n)=>o.createElement(k,{key:t.name,scaledX:te,data:t,scaledY:Q(a),style:{position:"absolute",top:"0",left:"0","z-index":`${Number(e)+n}`}})))):null},ce=(e,t=!1)=>{const{data:a=[],error:n,loaded:r,loading:l}=((e="deaths",t=!1,a=10)=>{const{data:n,loading:r,loaded:l,error:i}=(e=>{const[t,a]=(0,o.useReducer)(_,void 0,(()=>({data:[],loading:!1,loaded:!1,error:void 0})));return j(60*e,(0,o.useCallback)((async()=>{a({...t,loading:!0,loaded:!1,error:void 0});const e=await(async()=>{let e=[];try{e=(await M("nyt/usa")).data}catch(e){console.log({err:e})}finally{return e}})();a({...t,loading:!1,loaded:!0,error:void 0,data:e})}),[a])),t})(a),[s,c]=(0,o.useState)([]);return(0,o.useEffect)((()=>{c([{name:"United States",color:"cyan",data:N(n)(e,t)}])}),[n,e,t]),{data:s,loading:r,loaded:l,error:i}})(e);return{error:n,loaded:r,loading:l,data:q(t,a)}},de=(e,t,a=!1)=>{const{datasets:n=[],error:r,loaded:l,loading:i}=((e,t="deaths",a=!1,n=10)=>{const{data:r,loading:l,loaded:i,error:s}=((e,t)=>{const[a,n]=(0,o.useReducer)(_,void 0,(()=>({data:[],loading:!1,loaded:!1,error:void 0})));return j(60*e,(0,o.useCallback)((async()=>{n({...a,loading:!0,loaded:!1,error:void 0});const e=await Promise.all(t.map((e=>(async e=>{let t=[];try{t=(await M(`nyt/states/${encodeURIComponent(e)}?lastdays=all`)).data}catch(e){console.log({err:e})}finally{return t}})(e))));n({...a,loading:!1,loaded:!0,error:void 0,data:e})}),[n,t.join("|")])),a})(n,e),[c,d]=(0,o.useState)([]);return(0,o.useEffect)((()=>{d(e.map(((e,o)=>({name:e,color:A[e]||"lightgray",data:N(r[o])(t,a)}))))}),[r,t,a]),{datasets:c,loading:l,loaded:i,error:s}})(e,t);return{error:r,loaded:l,loading:i,datasets:q(a,n)}},he=()=>{const{chartVerticalPadding:e,includeUS:t,dataType:a,isRelative:n,selectedStates:r,update:l,hoverValue:i}=o.useContext(w),s=ce(a,n),c=de(r,a,n);return o.useEffect((()=>{let a=0;t&&s.loaded&&s.data.length&&(a=Math.max(a,Math.max.apply(Math,s.data[0].data.map((({y:e})=>e))))),c.loaded&&c.datasets.length&&c.datasets.every((e=>e.data.length))&&(a=Math.max(a,Math.max.apply(Math,E()(c.datasets.map((({data:e})=>e))).map((({y:e})=>e))))),l({maxRange:Math.round(a*e)})}),[s.data,s.loaded,c.datasets,c.loaded,t,n]),o.useEffect((()=>{let e=[];i.date?(t&&s.loaded&&s.data[0].data.length&&e.push({...s.data[0],data:s.data[0].data.filter((({x:e})=>(0,H.Z)((0,X.Z)(e),(0,X.Z)(i.date))))}),c.loaded&&e.push.apply(e,c.datasets.map((e=>({...e,data:e.data.filter((({x:e})=>(0,H.Z)((0,X.Z)(e),(0,X.Z)(i.date))))})))),e=p()(e,[({data:e})=>Math.max.apply(Math,e.map((({y:e})=>e))),({name:e})=>e.toLowerCase()],["desc","asc"]),l({hoveredDataPoints:e})):l({hoveredDataPoints:e})}),[s.data,s.loaded,c.datasets,c.loaded,t,i,l]),o.createElement(o.Fragment,null,o.createElement(oe,{zIndex:"10"}),o.createElement(ne,{zIndex:"11"}),o.createElement(re,{zIndex:"12"}),o.createElement(ie,{zIndex:"20",US:s}),o.createElement(se,{zIndex:"21",States:c}),o.createElement(le,{zIndex:"100"}))},me=r.ZP.label`
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: rows;
  align-items: center;
  justify-items: stretch;
`,ue=r.ZP.input`
  flex: 0;
  display: inline-block;
  align-self: stretch;
  margin: 0;
  margin-right: 1.2rem;
  padding: 0;
  height: 1rem;
  width: 0;

  &:before,
  &:after {
    position: absolute;
    left: 0;
    top: 50%;
    width: 1em;
    height: 1em;
    border: 1px solid transparent;
    transform: translateY(-50%);

    font-family: 'Material Icons Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 1em;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }

  &:before {
    content: '';
    // background-color: transparentize(white, 0.95);
  }

  &:after {
    content: 'radio_button_unchecked';
    border-color: transparent;
    color: hsla(0, 100%, 100%, 0.15);;
  }
  &:checked:after {
    content: 'radio_button_checked';
    color: var(--success);
  }
  }
`,pe=r.ZP.section`
  flex: 1;
  font-size: 1rem;
  line-height: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,fe=(0,r.ZP)((({className:e,onChange:t,label:a="radio",checked:n=!1,value:r=(0,d.camelize)(a)})=>o.createElement(me,{className:`${e}`,title:a},o.createElement(ue,{onChange:t,checked:n,type:"radio","data-value":r}),o.createElement(pe,null,a))))`
`,ge=(0,r.ZP)((({options:e,selected:t,onChange:a=(()=>{})})=>o.createElement(o.Fragment,null,e.map((({label:n,value:r})=>o.createElement(fe,{key:r,label:n,value:r,className:`w${Math.max(1,Math.floor(12/e.length))}`,checked:t===r,onChange:({target:e})=>{a(e.dataset.value)}}))))))`
`,ve=r.ZP.label`
  position: relative;
  padding: 0;
  display: flex;
  flex-direction: rows;
  align-items: center;
  justify-items: stretch;
`,we=r.ZP.input`
  flex: 0;
  display: inline-block;
  align-self: stretch;
  margin: 0;
  margin-right: 1.2rem;
  padding: 0;
  height: 1rem;
  width: 0;

  &:before,
  &:after {
    position: absolute;
    left: 0;
    top: 50%;
    width: 1em;
    height: 1em;
    border: 1px solid transparent;
    transform: translateY(-50%);

    font-family: 'Material Icons Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 1em;
    display: inline-block;
    line-height: 1;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: normal;
    white-space: nowrap;
    direction: ltr;

    /* Support for all WebKit browsers. */
    -webkit-font-smoothing: antialiased;
    /* Support for Safari and Chrome. */
    text-rendering: optimizeLegibility;

    /* Support for Firefox. */
    -moz-osx-font-smoothing: grayscale;

    /* Support for IE. */
    font-feature-settings: 'liga';
  }

  &:before {
    content: '';
    // background-color: transparentize(white, 0.95);
  }

  &:after {
    content: 'check_box_outline_blank';
    border-color: transparent;
    color: hsla(0, 100%, 100%, 0.15);;
  }
  &:checked:after {
    content: 'check_box';
    color: var(--success);
  }
  }
`,xe=r.ZP.section`
  flex: 1;
  font-size: 1rem;
  line-height: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,ye=(0,r.ZP)((({className:e,onChange:t,label:a="checkbox",checked:n=!1,value:r=(0,d.camelize)(a)})=>o.createElement(ve,{className:`${e}`,title:a},o.createElement(we,{onChange:t,checked:n,type:"checkbox","data-value":r}),o.createElement(xe,null,a))))`
  ${e=>e.style}
`,ke=(0,r.ZP)((({options:e,selected:t=[],onChange:a=(()=>{})})=>o.createElement(o.Fragment,null,e.map((({label:n,value:r})=>o.createElement(ye,{key:r,label:n,value:r,className:`w${Math.max(1,Math.floor(12/e.length))}`,checked:t.includes(r),onChange:({target:e})=>{t.includes(r)?a(t.filter((e=>e!==r))):a([...t,r])}}))))))`
`,be=()=>{const{options:e,dataType:t,update:a}=o.useContext(w);return o.createElement(o.Fragment,null,o.createElement(l,{x:2,w:3,className:"as-table one-row"},o.createElement(ge,{options:[{label:"Cases",value:g.Cases},{label:"Deaths",value:g.Deaths}],onChange:e=>{a({dataType:e})},selected:t})),o.createElement(l,{w:4,className:"as-table one-row"},o.createElement(ke,{options:[{label:"Relative",value:v.Deltas},{label:"Log Scale",value:v.LogScale},{label:"Include US",value:v.ShowOverall}],onChange:e=>{a({options:e})},selected:e})))},Ee=()=>{const{hoverValue:e}=o.useContext(w);return o.createElement(l,{x:9,w:3},e.date?o.createElement("section",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%"}},o.createElement("div",null,$(e.date)),o.createElement("div",null,Math.round(e.value).toLocaleString(void 0,{useGrouping:!0,maximumFractionDigits:0,roundingMode:"floor"}))):null)},Ce=r.ZP.button`
  width: unset;
`,Se=(0,r.ZP)(l)`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
`,Me=(0,r.ZP)(l)`
  position: relative;
  border-radius: 0.75rem;
  padding: 1.5rem !important;
  background-color: #131313;
  box-shadow: 2px 2px 4px #333333;
  display: grid;
  grid-auto-columns: max-content;
  grid-template-rows: repeat(10, 1fr);
  grid-auto-flow: column;
  gap: 4px;
`,Pe=(0,r.ZP)((({className:e,onClick:t})=>o.createElement("div",{className:e,onClick:t},o.createElement("span",{className:"material-icons",style:{verticalAlign:"middle",fontSize:"1em"}},"close"))))`
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 60;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  color: var(--error);
  cursor: pointer;

  &:hover {
    background-color: var(--error);
    color: white;
  }

  .material-icons {
    ${"\n  text-shadow:\n    calc(var(--stroke-width, 1px) * 1) calc(var(--stroke-width, 1px) * 0) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * 0.9239) calc(var(--stroke-width, 1px) * 0.3827) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * 0.7071) calc(var(--stroke-width, 1px) * 0.7071) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * 0.3827) calc(var(--stroke-width, 1px) * 0.9239) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * 0) calc(var(--stroke-width, 1px) * 1) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * -0.3827) calc(var(--stroke-width, 1px) * 0.9239) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * -0.7071) calc(var(--stroke-width, 1px) * 0.7071) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * -0.9239) calc(var(--stroke-width, 1px) * 0.3827) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * -1) calc(var(--stroke-width, 1px) * 0) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * -0.9239) calc(var(--stroke-width, 1px) * -0.3827) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * -0.7071) calc(var(--stroke-width, 1px) * -0.7071) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * -0.3827) calc(var(--stroke-width, 1px) * -0.9239) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * 0) calc(var(--stroke-width, 1px) * -1) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * 0.3827) calc(var(--stroke-width, 1px) * -0.9239) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * 0.7071) calc(var(--stroke-width, 1px) * -0.7071) 0 var(--stroke-color, #000000),\n    calc(var(--stroke-width, 1px) * 0.9239) calc(var(--stroke-width, 1px) * -0.3827) 0 var(--stroke-color, #000000);\n"}
  }
`,Ze=(0,r.ZP)((({className:e})=>{const{selectedStates:t}=o.useContext(w),[a,n]=o.useState(!1);return o.createElement(o.Fragment,null,o.createElement(Ce,{onClick:()=>{n((e=>!e))}},o.createElement("span",{className:"material-icons-outlined"},"where_to_vote")," ","Choose States"),a?o.createElement(Se,null,o.createElement(Me,null,o.createElement(Pe,{onClick:()=>{n(!1)}}),f.map((e=>o.createElement(ye,{key:e,style:A[e]?{color:A[e]}:void 0,label:e,value:e,checked:t.includes(e),onChange:()=>{let a=[...t];a=a.includes(e)?a.filter((t=>t!==e)):[...a,e],window.location.hash=`#${p()(a,[e=>e.toLowerCase()],["asc"]).join(",")}`}}))))):null)}))``,ze=({x:e,y:t,w:a,h:n})=>{const{hoveredDataPoints:r}=o.useContext(w);return o.createElement(l,{x:e,y:t,w:a,h:n,style:{height:"100%",overflow:"hidden",...r.length?{columnWidth:"calc(96px * 1.8)"}:{display:"flex",alignItems:"center",justifyContent:"center"}}},r.map((({name:e,color:t,data:[a]})=>a?.x?o.createElement("div",{key:`${e}${$(a.x)}`,style:{color:t,display:"flex",alignItems:"center",justifyContent:"space-between"}},o.createElement("span",null,e,":"),o.createElement("span",{style:{fontFamily:"Source Code Pro"}},R(a.y))):null)),r.length?null:o.createElement(Ze,null))};var Ne=a(4257);const Le=r.ZP.span`
  color: var(--highlight);
  font-weight: bold;
  margin-right: 4px;
`,Ie=r.ZP.div`
  font-size: 0.8rem;
  line-height: 1em;
`,De=r.ZP.section`
  overflow: hidden;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: calc(96px * 1.8);
  grid-template-rows: 1fr;
  gap 2px;
`,Te=()=>{const{hoverValue:e}=o.useContext(w),t=o.useMemo((()=>Object.entries(window.importantDates).map((([e,t])=>{const a=(0,X.Z)(new Date(e));return{start:(0,V.Z)(a,-5),end:(0,V.Z)(a,5),date:a,info:t}}))),[window.importantDates]);return o.createElement(De,null,t.filter((t=>(0,Ne.Z)(e.date,t))).map((({date:e,info:t})=>o.createElement(Ie,{key:e.getTime()},o.createElement(Le,null,(e=>O(T(e))(D))(e)),t.replaceAll(/\b[a-z]/g,(e=>e.toUpperCase()))))))},Oe=window.document.createElement("main");Oe.id="covid-19-app",document.body.appendChild(Oe);const $e=o.createElement(o.StrictMode,null,o.createElement(y,null,o.createElement((()=>o.createElement(o.Fragment,null,o.createElement(l,{x:1,y:1,w:12,noBg:!0,className:"as-table one-row"},o.createElement(be,null),o.createElement(Ee,null)),o.createElement(l,{x:1,y:2,w:10,h:10,noBg:!0,style:{position:"relative",perspective:"1024px"}},o.createElement(he,null)),o.createElement(ze,{x:11,y:2,w:2,h:10}),o.createElement(l,{x:1,y:12,w:12},o.createElement(Te,null)))),null)));(0,n.s)(Oe).render($e)}},a={};function o(e){var n=a[e];if(void 0!==n)return n.exports;var r=a[e]={id:e,loaded:!1,exports:{}};return t[e].call(r.exports,r,r.exports,o),r.loaded=!0,r.exports}o.m=t,e=[],o.O=(t,a,n,r)=>{if(!a){var l=1/0;for(d=0;d<e.length;d++){for(var[a,n,r]=e[d],i=!0,s=0;s<a.length;s++)(!1&r||l>=r)&&Object.keys(o.O).every((e=>o.O[e](a[s])))?a.splice(s--,1):(i=!1,r<l&&(l=r));if(i){e.splice(d--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var d=e.length;d>0&&e[d-1][2]>r;d--)e[d]=e[d-1];e[d]=[a,n,r]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var a in t)o.o(t,a)&&!o.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={514:0};o.O.j=t=>0===e[t];var t=(t,a)=>{var n,r,[l,i,s]=a,c=0;if(l.some((t=>0!==e[t]))){for(n in i)o.o(i,n)&&(o.m[n]=i[n]);if(s)var d=s(o)}for(t&&t(a);c<l.length;c++)r=l[c],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(d)},a=self.webpackChunkcovid_19=self.webpackChunkcovid_19||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})();var n=o.O(void 0,[216],(()=>o(9150)));n=o.O(n)})();