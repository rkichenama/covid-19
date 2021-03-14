(()=>{"use strict";var e={7210:(e,t,a)=>{var n=a(7294),s=a(3935);const r=e=>({name:t,checked:a,onChange:s,label:r=t,value:o=t,className:i})=>n.createElement("label",Object.assign({"data-class":e},{className:i}),n.createElement("input",Object.assign({},{type:e,name:t,checked:a,onChange:s,value:o})),n.createElement("span",null,r)),o=r("radio"),i=r("checkbox"),l=({type:e="cases",onChange:t=(e=>{console.table(e.target,["value","checked"])})})=>n.createElement("fieldset",{className:"radio-options w2 as-table"},n.createElement(o,Object.assign({},{onChange:t,className:"w6 align-center",name:"radio-option",value:"deaths",label:"Deaths",checked:"deaths"===e})),n.createElement(o,Object.assign({},{onChange:t,className:"w6 align-center",name:"radio-option",value:"cases",label:"Cases",checked:"cases"===e})));var d=a(1663),c=a(3253),g=a.n(c);const p=JSON.parse('["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]'),u={overlay:{top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.75)"},content:{border:"1px solid #131313",background:"#333",overflow:"visible",borderRadius:"4px",outline:"none",padding:"20px",top:"50%",left:"30%",right:"30%",bottom:"auto",transform:"translateY(-50%)"}},h=({states:e=[],setOpen:t=(()=>{}),setStates:a=(()=>{})})=>n.createElement(g(),{isOpen:!0,onRequestClose:()=>t(!1),style:u,contentLabel:"state selector"},n.createElement(d.ZP,Object.assign({},{className:"reactSelect-container",classNamePrefix:"reactSelect",menuPlacement:"auto",value:e.map((e=>({label:e,value:e}))),options:p.map((e=>({label:e,value:e}))),isMulti:!0,isClearable:!1,onChange:e=>{e&&Array.isArray(e)?a(e.map((({value:e})=>e))):a([])}}))),m="changeType",y="toggleScale",f="includeUS",b="upStates",k="toggleDeltas",v={[m]:(e,{payload:t})=>({...e,type:t}),[y]:(e,{payload:t})=>({...e,logScale:t}),[f]:(e,{payload:t})=>({...e,includeUS:t}),[k]:(e,{payload:t})=>({...e,deltas:t}),[b]:(e,{payload:t})=>({...e,states:t})},w=({type:e="deaths",includeUS:t=!1,logScale:a=!1,states:n=[],deltas:s=!1})=>({type:e,logScale:a,includeUS:t,states:n,deltas:s}),E=(e,t)=>{const a=v[t.type];return a?a(e,t):e},x={dispatch:()=>{},type:"deaths",includeUS:!0,logScale:!1,deltas:!1,states:["New York","Texas","Florida","Kentucky","Tennessee","California"]},S=n.createContext(x),C=S,O=({children:e})=>{const[t,a]=(s=x,(0,n.useReducer)(E,s,w));var s;return n.createElement(S.Provider,{value:{...t,dispatch:a}},e)},j=()=>{const{dispatch:e,type:t,includeUS:a,logScale:s,states:r,deltas:o}=n.useContext(C),[d,c]=n.useState(!1);return n.createElement("div",{className:"x1 y1 w12 h1 as-grid one-row"},n.createElement(l,Object.assign({},{type:t,onChange:t=>e({type:m,payload:t?.target?.value||"deaths"})})),n.createElement("fieldset",{className:"w4 as-table"},n.createElement(i,Object.assign({},{className:"w4",checked:o,label:"Show Deltas",onChange:t=>e({type:k,payload:!o})})),n.createElement(i,Object.assign({},{className:"w4",checked:a,label:"Include US",onChange:t=>e({type:f,payload:!a})})),n.createElement(i,Object.assign({},{className:"w4",checked:s,label:"Log Scale",onChange:t=>e({type:y,payload:!s})}))),n.createElement("button",{className:"w2",onClick:()=>c(!0)},"select states"),d?n.createElement(h,Object.assign({},{states:r,setOpen:c,setStates:t=>{console.log(t),e({type:b,payload:t})}})):null,n.createElement("div",{id:"portal",className:"x10 w3"}))};var N=a(8910),L=a(2510),W=a(7891),M=a(9368),U=a(3466),T=a(1949),I=a(8602),D=a(6486);const A=["#F4511E","#FFF59D","#DCE775","#8BC34A","#00796B","#006064"],P="#808080",z="#acacac",F="#ffffff",R="#131313",Z={width:360,height:360,padding:{top:48,bottom:48,left:48,right:48}},K={fontFamily:"'Helvetica Neue', 'Helvetica', sans-serif",fontSize:14,letterSpacing:"normal",padding:8,fill:F,stroke:"transparent",strokeWidth:0},q=(0,D.assign)({textAnchor:"middle"},K),H="round",_="round",B={area:(0,D.assign)({style:{data:{fill:R},labels:K}},Z),axis:(0,D.assign)({style:{axis:{fill:"transparent",stroke:z,strokeWidth:2,strokeLinecap:H,strokeLinejoin:_},axisLabel:(0,D.assign)({},q,{padding:8,stroke:"transparent"}),grid:{fill:"none",stroke:P,strokeDasharray:"10, 5",strokeLinecap:H,strokeLinejoin:_,pointerEvents:"painted"},ticks:{fill:"transparent",size:5,stroke:z,strokeWidth:1,strokeLinecap:H,strokeLinejoin:_},tickLabels:(0,D.assign)({},K,{fill:F})}},Z),polarDependentAxis:(0,D.assign)({style:{ticks:{fill:"transparent",size:1,stroke:"transparent"}}}),bar:(0,D.assign)({style:{data:{fill:F,padding:8,strokeWidth:0},labels:K}},Z),boxplot:(0,D.assign)({style:{max:{padding:8,stroke:F,strokeWidth:1},maxLabels:(0,D.assign)({},K,{padding:3}),median:{padding:8,stroke:F,strokeWidth:1},medianLabels:(0,D.assign)({},K,{padding:3}),min:{padding:8,stroke:F,strokeWidth:1},minLabels:(0,D.assign)({},K,{padding:3}),q1:{padding:8,fill:F},q1Labels:(0,D.assign)({},K,{padding:3}),q3:{padding:8,fill:F},q3Labels:(0,D.assign)({},K,{padding:3})},boxWidth:20},Z),candlestick:(0,D.assign)({style:{data:{stroke:F},labels:(0,D.assign)({},K,{padding:5})},candleColors:{positive:"#ffffff",negative:F}},Z),chart:Z,errorbar:(0,D.assign)({borderWidth:8,style:{data:{fill:"transparent",opacity:1,stroke:F,strokeWidth:2},labels:K}},Z),group:(0,D.assign)({colorScale:A},Z),histogram:(0,D.assign)({style:{data:{fill:F,stroke:R,strokeWidth:2},labels:K}},Z),legend:{colorScale:A,gutter:10,orientation:"vertical",titleOrientation:"top",style:{data:{type:"circle"},labels:K,title:(0,D.assign)({},K,{padding:5})}},line:(0,D.assign)({style:{data:{fill:"transparent",opacity:1,stroke:F,strokeWidth:2},labels:K}},Z),pie:(0,D.assign)({colorScale:A,style:{data:{padding:8,stroke:P,strokeWidth:1},labels:(0,D.assign)({},K,{padding:20})}},Z),scatter:(0,D.assign)({style:{data:{fill:F,opacity:1,stroke:"transparent",strokeWidth:0},labels:K}},Z),stack:(0,D.assign)({colorScale:A},Z),tooltip:{style:(0,D.assign)({},K,{padding:0,pointerEvents:"none"}),flyoutStyle:{stroke:R,strokeWidth:1,fill:"#f0f0f0",pointerEvents:"none"},flyoutPadding:5,cornerRadius:5,pointerLength:10},voronoi:(0,D.assign)({style:{data:{fill:"transparent",stroke:"transparent",strokeWidth:0},labels:(0,D.assign)({},K,{padding:5,pointerEvents:"none",fill:R}),flyout:{stroke:R,strokeWidth:1,fill:"#f0f0f0",pointerEvents:"none"}}},Z)};var V=a(9849),Y=a(9734),G=a.n(Y);const J=e=>t=>G()(e.map((({date:e,[t]:a})=>({x:(0,V.Z)(e),y:a}))),[({x:e})=>e]),$={year:"2-digit",month:"short",day:"2-digit"},X={year:"2-digit",month:"2-digit",day:"2-digit"},Q=e=>e instanceof Date?e:(0,V.Z)(e),ee=e=>t=>e.toLocaleDateString(void 0,t),te=e=>ee(Q(e))($),ae=e=>ee(Q(e))(X),ne=({datasets:e})=>{const{logScale:t}=n.useContext(C),a=n.useRef(void 0),{width:r,height:o}=(e=>{const[{x:t,y:a,width:s,height:r},o]=(0,n.useState)({x:0,y:0,width:0,height:0});return(0,n.useLayoutEffect)((()=>{let t;return e?.current&&(o(e.current.getBoundingClientRect()),t=()=>{o(e.current.getBoundingClientRect())},window.addEventListener("resize",t)),()=>{t&&window.removeEventListener("resize",t)}}),[e?.current]),{x:t,y:a,width:s,height:r}})(a);return n.createElement("div",Object.assign({className:"plot x1 y2 w12 h11"},{ref:a}),e.length&&r&&o?n.createElement(n.Fragment,null,n.createElement(N.Z,Object.assign({},{theme:B},{width:r,height:o,scale:{x:"time",y:t?"sqrt":"linear"},domainPadding:{x:[0,0],y:[0,96]},padding:{...Z.padding,top:0,left:16,right:16},containerComponent:n.createElement(L.Z,Object.assign({},{theme:B},{labels:({datum:e})=>"Invalid Date"===te(e.x)?null:`[${te(e.x)}]: ${(0,I.WU)(",.0d")(e.y)}`,labelComponent:n.createElement(W.Z,Object.assign({},{theme:B},{constrainToVisibleArea:!0}))}))}),n.createElement(M.Z,Object.assign({},{theme:B},{x:96,style:{data:{stroke:"white"},border:{stroke:"white"}},name:"legend",orientation:"horizontal",gutter:20,data:e.map((({name:e,color:t})=>({name:e,symbol:{fill:t}})))})),n.createElement(U.Z,Object.assign({},{theme:B},{tickFormat:e=>ae(e),tickCount:5})),n.createElement(U.Z,Object.assign({},{theme:B},{dependentAxis:!0,tickCount:6,tickFormat:(0,I.WU)(",~s"),offsetX:64})),Object.entries(importantDates).map((([e,t])=>{const a=Q(e);return n.createElement(T.Z,{key:e,samples:2,x:()=>a,style:{data:{stroke:"rgba(255, 0, 0, 0.5)",strokeWidth:"2px"}},events:[{target:"data",eventHandlers:{onClick:()=>(((e,t)=>{(0,s.render)(n.createElement("div",{style:{fontSize:"0.8em"}},"[",ae(e),"]:"," ",t),document.getElementById("portal"))})(e,t),[])}}]})})),e.map((({name:e,data:t,color:a})=>n.createElement(T.Z,Object.assign({key:e},{theme:B,name:e},{style:{data:{stroke:a}},data:t,interpolation:"monotoneX"})))))):null)};var se=a(9669),re=a.n(se),oe=a(6264);const ie=(e=>{const t=re().create({baseURL:"https://disease.sh/v3/covid-19/"});return t.interceptors.response.use((e=>(e.data&&/^application\/json/.test(e.headers["content-type"])&&(e.data=(0,oe.camelizeKeys)(e.data)),e))),t.interceptors.request.use((e=>{const t={...e};return"multipart/form-data"===t.headers["Content-Type"]||(e.params&&(t.params=(0,oe.decamelizeKeys)(e.params)),e.data&&(t.data=(0,oe.decamelizeKeys)(e.data))),t})),t})(),le=e=>{const[t,a]=(0,n.useState)(0);return(0,n.useEffect)((()=>{let n=0;return e&&(n=window.setInterval((()=>{a(t+1)}),1e3*e)),()=>{n&&window.clearInterval(n)}}),[e]),t},de=(e,t)=>({...e,...t}),ce={"New York":"#008BC4",Alabama:"#996633",Arizona:"#16256b",California:"#000080",Delaware:"#71a1a0",Florida:"#cc6500",Georgia:"#993366",Hawaii:"#f00c0f",Idaho:"#339966",Indiana:"#0000cc",Kentucky:"#ffe39b",Louisiana:"#c41e3a",Maryland:"#336699",Massachusetts:"#0000ff",Minnesota:"#800080",Nevada:"#c0c0c0","New Hampshire":"#fa500","New Jersey":"#f0dc82","New Mexico":"#ffff00","North Carolina":"#cc0000",Ohio:"#0000ff",Oklahoma:"#008000",Oregon:"#ccac00",Pennsylvania:"#008800","South Carolina":"#00416a","South Dakota":"#ffd700",Tennessee:"#ff7f00",Texas:"#ff0000",Utah:"#ffcc33",Vermont:"#006400","West Virginia":"#cfb53b",Wyoming:"#a52a2a"},ge=()=>{const{type:e,includeUS:t,states:a,deltas:s}=n.useContext(C),r=((e="deaths",t=10)=>{const[{data:a,loading:s,loaded:r,error:o},i]=(0,n.useReducer)(de,void 0,(()=>({data:[],loading:!1,loaded:!1,error:void 0}))),l=le(60*t),d=e=>{i({loading:!0,loaded:!1,error:void 0,data:[]}),(async()=>{let e=[];try{e=(await ie("nyt/usa")).data}catch(e){console.log({err:e})}finally{return e}})().then((t=>{i({loading:!1,loaded:!0,error:void 0,data:[{name:"United States",color:"cyan",data:J(t)(e)}]})}))};return(0,n.useEffect)((()=>{d(e)}),[e]),(0,n.useLayoutEffect)((()=>{l&&d(e)}),[e,l]),{data:a,loading:s,loaded:r,error:o}})(e),{datasets:o,loading:i,loaded:l,error:d}=((e,t="deaths",a=10)=>{const[{data:s,loading:r,loaded:o,error:i},l]=(0,n.useReducer)(de,void 0,(()=>({data:[],loading:!1,loaded:!1,error:void 0}))),d=le(60*a),c=async(e,t,a)=>{const n=await Promise.all(e.map((e=>(async e=>{let t=[];try{t=(await ie(`nyt/states/${encodeURIComponent(e)}?lastdays=all`)).data}catch(e){console.log({err:e})}finally{return t}})(e).then((a=>({name:e,color:ce[e]||"lightgray",data:J(a)(t)}))))));a&&a({loading:!1,loaded:!0,error:void 0,data:n})};return(0,n.useEffect)((()=>{let a=l;return e.length&&(a&&a({loading:!0,loaded:!1,error:void 0,data:[]}),c(e,t,a)),()=>{a=void 0}}),[e.sort().join("|"),t]),(0,n.useLayoutEffect)((()=>{let a=l;return e.length&&d&&(a&&a({loading:!0,loaded:!1,error:void 0,data:[]}),c(e,t,a)),()=>{a=void 0}}),[e.sort().join("|"),t,d]),{datasets:s,loading:r,loaded:o,error:i}})(a,e),c=n.useMemo((()=>{let e=[];return o.length&&e.push.apply(e,o),t&&r.data.length&&e.push.apply(e,r.data),((e,t)=>{if(!e)return t;const a=(n=7,(e,t)=>{const[{y:a},...s]=e.slice(t-n-1,t);return s.reduce((e=>(t,{y:a},n,s)=>t+Math.max(0,n?a-s[n-1].y:a-e))(a),0)/n});var n;return t.map((({data:e,...t})=>({...t,data:e.map(((e,t,n)=>{if(t<=7)return e;const s=a(n,t);return{...e,y:s}}))})))})(s,e)}),[!i&&l,!r.loading&&r.loaded,t,s]);return d?d.toString():!i&&l?n.createElement(ne,Object.assign({},{datasets:c})):"Loading..."};var pe=a(5580);const ue=window.document.createElement("div");ue.style.display="contents",window.document.body.appendChild(ue),(0,s.render)(n.createElement((()=>{const[e,t]=n.useState("cases"),[a,s]=n.useState(!0),[r,o]=n.useState(["New York","Texas","Florida","Kentucky","Tennessee","California"]);return n.createElement(O,null,n.createElement("main",{style:{display:"contents"}},n.createElement(ge,Object.assign({},{type:e,states:r,includeUS:a})),n.createElement(j,Object.assign({},{type:e,setType:t,includeUS:a,toggleUS:s,states:r,setStates:o}))))}),null),ue),"serviceWorker"in navigator&&window.addEventListener("load",(()=>{const e=new pe.Z("./service-worker.js");e.addEventListener("waiting",(t=>{const a=document.createElement("button");a.className="x11 y1 w2 h1 wait",a.style.zIndex="9999",a.innerText="Update Service Worker",document.body.appendChild(a),a.addEventListener("click",(()=>{e.addEventListener("controlling",(e=>{window.location.reload()})),e.messageSW({type:"SKIP_WAITING"})}))})),e.register()}))}},t={};function a(n){if(t[n])return t[n].exports;var s=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(s.exports,s,s.exports,a),s.loaded=!0,s.exports}a.m=e,a.x=e=>{},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={514:0},t=[[7210,216]],n=e=>{},s=(s,r)=>{for(var o,i,[l,d,c,g]=r,p=0,u=[];p<l.length;p++)i=l[p],a.o(e,i)&&e[i]&&u.push(e[i][0]),e[i]=0;for(o in d)a.o(d,o)&&(a.m[o]=d[o]);for(c&&c(a),s&&s(r);u.length;)u.shift()();return g&&t.push.apply(t,g),n()},r=self.webpackChunkcovid_19=self.webpackChunkcovid_19||[];function o(){for(var n,s=0;s<t.length;s++){for(var r=t[s],o=!0,i=1;i<r.length;i++){var l=r[i];0!==e[l]&&(o=!1)}o&&(t.splice(s--,1),n=a(a.s=r[0]))}return 0===t.length&&(a.x(),a.x=e=>{}),n}r.forEach(s.bind(null,0)),r.push=s.bind(null,r.push.bind(r));var i=a.x;a.x=()=>(a.x=i||(e=>{}),(n=o)())})(),a.x()})();