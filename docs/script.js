(()=>{"use strict";var e={307:(e,t,a)=>{var n=a(7294),s=a(3935);const r=({type:e="cases",onChange:t=(e=>{console.table(e.target,["value","checked"])})})=>n.createElement("fieldset",{className:"w2 as-table"},n.createElement("label",{className:"w6 align-center"},n.createElement("input",Object.assign({name:"radio-option",type:"radio",value:"deaths",checked:"deaths"===e},{onChange:t})),n.createElement("span",null,"Deaths")),n.createElement("label",{className:"w6 align-center"},n.createElement("input",Object.assign({name:"radio-option",type:"radio",value:"cases",checked:"cases"===e},{onChange:t})),n.createElement("span",null,"Cases")));var o=a(1663),l=a(3253),i=a.n(l);const d=JSON.parse('["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming"]'),c={overlay:{top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.75)"},content:{border:"1px solid #131313",background:"#333",overflow:"visible",borderRadius:"4px",outline:"none",padding:"20px",top:"50%",left:"30%",right:"30%",bottom:"auto",transform:"translateY(-50%)"}},p=({states:e=[],setOpen:t=(()=>{}),setStates:a=(()=>{})})=>n.createElement(i(),{isOpen:!0,onRequestClose:()=>t(!1),style:c,contentLabel:"state selector"},n.createElement(o.ZP,Object.assign({},{className:"reactSelect-container",classNamePrefix:"reactSelect",menuPlacement:"auto",value:e.map((e=>({label:e,value:e}))),options:d.map((e=>({label:e,value:e}))),isMulti:!0,isClearable:!1,onChange:e=>{e&&Array.isArray(e)?a(e.map((({value:e})=>e))):a([])}}))),g="changeType",u="toggleScale",h="includeUS",m="upStates",y={[g]:(e,{payload:t})=>({...e,type:t}),[u]:(e,{payload:t})=>({...e,logScale:t}),[h]:(e,{payload:t})=>({...e,includeUS:t}),[m]:(e,{payload:t})=>({...e,states:t})},f=({type:e="deaths",includeUS:t=!1,logScale:a=!1,states:n=[]})=>({type:e,logScale:a,includeUS:t,states:n}),b=(e,t)=>{const a=y[t.type];return a?a(e,t):e},k={dispatch:()=>{},type:"deaths",includeUS:!0,logScale:!1,states:["New York","Texas","Florida","Kentucky","Tennessee","California"]},v=n.createContext(k),E=v,w=({children:e})=>{const[t,a]=(s=k,(0,n.useReducer)(b,s,f));var s;return n.createElement(v.Provider,{value:{...t,dispatch:a}},e)},S=()=>{const{dispatch:e,type:t,includeUS:a,logScale:s,states:o}=n.useContext(E),[l,i]=n.useState(!1);return n.createElement("div",{className:"x1 y1 w12 h1 as-grid one-row"},n.createElement(r,Object.assign({},{type:t,onChange:t=>e({type:g,payload:t?.target?.value||"deaths"})})),n.createElement("fieldset",{className:"w2 as-table"},n.createElement("label",{className:"w6"},n.createElement("input",{type:"checkbox",checked:a,onChange:t=>e({type:h,payload:!a})}),"Include US"),n.createElement("label",{className:"w6"},n.createElement("input",{type:"checkbox",checked:s,onChange:t=>e({type:u,payload:!s})}),"Log Scale")),n.createElement("div",{className:"w2"},n.createElement("button",{onClick:()=>i(!0)},"select states"),l?n.createElement(p,Object.assign({},{states:o,setOpen:i,setStates:t=>{console.log(t),e({type:m,payload:t})}})):null))};var x=a(8910),C=a(2510),O=a(7891),j=a(9368),L=a(3466),N=a(1949),W=a(8602),U=a(6486);const T=["#F4511E","#FFF59D","#DCE775","#8BC34A","#00796B","#006064"],M="#808080",F="#acacac",P="#ffffff",R="#131313",A={width:360,height:360,padding:{top:48,bottom:48,left:48,right:48}},z={fontFamily:"'Helvetica Neue', 'Helvetica', sans-serif",fontSize:14,letterSpacing:"normal",padding:8,fill:P,stroke:"transparent",strokeWidth:0},D=(0,U.assign)({textAnchor:"middle"},z),Z="round",I="round",K={area:(0,U.assign)({style:{data:{fill:R},labels:z}},A),axis:(0,U.assign)({style:{axis:{fill:"transparent",stroke:F,strokeWidth:2,strokeLinecap:Z,strokeLinejoin:I},axisLabel:(0,U.assign)({},D,{padding:8,stroke:"transparent"}),grid:{fill:"none",stroke:M,strokeDasharray:"10, 5",strokeLinecap:Z,strokeLinejoin:I,pointerEvents:"painted"},ticks:{fill:"transparent",size:5,stroke:F,strokeWidth:1,strokeLinecap:Z,strokeLinejoin:I},tickLabels:(0,U.assign)({},z,{fill:P})}},A),polarDependentAxis:(0,U.assign)({style:{ticks:{fill:"transparent",size:1,stroke:"transparent"}}}),bar:(0,U.assign)({style:{data:{fill:P,padding:8,strokeWidth:0},labels:z}},A),boxplot:(0,U.assign)({style:{max:{padding:8,stroke:P,strokeWidth:1},maxLabels:(0,U.assign)({},z,{padding:3}),median:{padding:8,stroke:P,strokeWidth:1},medianLabels:(0,U.assign)({},z,{padding:3}),min:{padding:8,stroke:P,strokeWidth:1},minLabels:(0,U.assign)({},z,{padding:3}),q1:{padding:8,fill:P},q1Labels:(0,U.assign)({},z,{padding:3}),q3:{padding:8,fill:P},q3Labels:(0,U.assign)({},z,{padding:3})},boxWidth:20},A),candlestick:(0,U.assign)({style:{data:{stroke:P},labels:(0,U.assign)({},z,{padding:5})},candleColors:{positive:"#ffffff",negative:P}},A),chart:A,errorbar:(0,U.assign)({borderWidth:8,style:{data:{fill:"transparent",opacity:1,stroke:P,strokeWidth:2},labels:z}},A),group:(0,U.assign)({colorScale:T},A),histogram:(0,U.assign)({style:{data:{fill:P,stroke:R,strokeWidth:2},labels:z}},A),legend:{colorScale:T,gutter:10,orientation:"vertical",titleOrientation:"top",style:{data:{type:"circle"},labels:z,title:(0,U.assign)({},z,{padding:5})}},line:(0,U.assign)({style:{data:{fill:"transparent",opacity:1,stroke:P,strokeWidth:2},labels:z}},A),pie:(0,U.assign)({colorScale:T,style:{data:{padding:8,stroke:M,strokeWidth:1},labels:(0,U.assign)({},z,{padding:20})}},A),scatter:(0,U.assign)({style:{data:{fill:P,opacity:1,stroke:"transparent",strokeWidth:0},labels:z}},A),stack:(0,U.assign)({colorScale:T},A),tooltip:{style:(0,U.assign)({},z,{padding:0,pointerEvents:"none"}),flyoutStyle:{stroke:R,strokeWidth:1,fill:"#f0f0f0",pointerEvents:"none"},flyoutPadding:5,cornerRadius:5,pointerLength:10},voronoi:(0,U.assign)({style:{data:{fill:"transparent",stroke:"transparent",strokeWidth:0},labels:(0,U.assign)({},z,{padding:5,pointerEvents:"none",fill:R}),flyout:{stroke:R,strokeWidth:1,fill:"#f0f0f0",pointerEvents:"none"}}},A)};var q=a(9849),_=a(9734),B=a.n(_);const Y=e=>t=>B()(e.map((({date:e,[t]:a})=>({x:(0,q.Z)(e),y:a}))),[({x:e})=>e]),H={year:"2-digit",month:"short",day:"2-digit"},V={year:"2-digit",month:"2-digit",day:"2-digit"},$=e=>e instanceof Date?e:(0,q.Z)(e),J=e=>t=>e.toLocaleDateString(void 0,t),G=({datasets:e})=>{const{logScale:t}=n.useContext(E),a=n.useRef(void 0),{width:s,height:r}=(e=>{const[{x:t,y:a,width:s,height:r},o]=(0,n.useState)({x:0,y:0,width:0,height:0});return(0,n.useLayoutEffect)((()=>{let t;return e?.current&&(o(e.current.getBoundingClientRect()),t=()=>{o(e.current.getBoundingClientRect())},window.addEventListener("resize",t)),()=>{t&&window.removeEventListener("resize",t)}}),[e?.current]),{x:t,y:a,width:s,height:r}})(a);return n.createElement("div",Object.assign({className:"plot x1 y2 w12 h11"},{ref:a}),e.length&&s&&r?n.createElement(n.Fragment,null,n.createElement(x.Z,Object.assign({},{theme:K},{width:s,height:r,scale:{x:"time",y:t?"sqrt":"linear"},domainPadding:{x:[0,0],y:[0,96]},padding:{...A.padding,top:0,left:16,right:16},containerComponent:n.createElement(C.Z,Object.assign({},{theme:K},{labels:({datum:e})=>{return`[${t=e.x,J($(t))(H)}]: ${(0,W.WU)(",.0d")(e.y)}`;var t},labelComponent:n.createElement(O.Z,Object.assign({},{theme:K},{constrainToVisibleArea:!0}))}))}),n.createElement(j.Z,Object.assign({},{theme:K},{name:"legend",orientation:"horizontal",gutter:20,data:e.map((({name:e,color:t})=>({name:e,symbol:{fill:t}})))})),n.createElement(L.Z,Object.assign({},{theme:K},{tickFormat:e=>J($(e))(V),tickCount:5})),n.createElement(L.Z,Object.assign({},{theme:K},{dependentAxis:!0,tickCount:6,tickFormat:(0,W.WU)(",~s"),offsetX:64})),e.map((({name:e,data:t,color:a})=>n.createElement(N.Z,Object.assign({key:e},{theme:K,name:e},{style:{data:{stroke:a}},data:t,interpolation:"natural"})))))):null)};var X=a(9669),Q=a.n(X),ee=a(6264);const te=(e=>{const t=Q().create({baseURL:"https://disease.sh/v3/covid-19/"});return t.interceptors.response.use((e=>(e.data&&/^application\/json/.test(e.headers["content-type"])&&(e.data=(0,ee.camelizeKeys)(e.data)),e))),t.interceptors.request.use((e=>{const t={...e};return"multipart/form-data"===t.headers["Content-Type"]||(e.params&&(t.params=(0,ee.decamelizeKeys)(e.params)),e.data&&(t.data=(0,ee.decamelizeKeys)(e.data))),t})),t})(),ae=e=>{const[t,a]=(0,n.useState)(0);return(0,n.useEffect)((()=>{let n=0;return e&&(n=window.setInterval((()=>{a(t+1)}),1e3*e)),()=>{n&&window.clearInterval(n)}}),[e]),t},ne=(e,t)=>({...e,...t}),se={"New York":"#008BC4",Texas:"#a04039",Florida:"#e1bc8a",Kentucky:"#ffe39b",Tennessee:"#e39b96",California:"#26ad8d"},re=()=>{const{type:e,includeUS:t,states:a}=n.useContext(E),s=((e="deaths",t=10)=>{const[{data:a,loading:s,loaded:r,error:o},l]=(0,n.useReducer)(ne,void 0,(()=>({data:[],loading:!1,loaded:!1,error:void 0}))),i=ae(60*t),d=e=>{l({loading:!0,loaded:!1,error:void 0,data:[]}),(async()=>{let e=[];try{e=(await te("nyt/usa")).data}catch(e){console.log({err:e})}finally{return e}})().then((t=>{l({loading:!1,loaded:!0,error:void 0,data:[{name:"United States",color:"cyan",data:Y(t)(e)}]})}))};return(0,n.useEffect)((()=>{d(e)}),[e]),(0,n.useLayoutEffect)((()=>{i&&d(e)}),[e,i]),{data:a,loading:s,loaded:r,error:o}})(e),{datasets:r,loading:o,loaded:l,error:i}=((e,t="deaths",a=10)=>{const[{data:s,loading:r,loaded:o,error:l},i]=(0,n.useReducer)(ne,void 0,(()=>({data:[],loading:!1,loaded:!1,error:void 0}))),d=ae(60*a),c=async(e,t,a)=>{const n=await Promise.all(e.map((e=>(async e=>{let t=[];try{t=(await te(`nyt/states/${encodeURIComponent(e)}?lastdays=all`)).data}catch(e){console.log({err:e})}finally{return t}})(e).then((a=>({name:e,color:se[e]||"lightgray",data:Y(a)(t)}))))));a&&a({loading:!1,loaded:!0,error:void 0,data:n})};return(0,n.useEffect)((()=>{let a=i;return e.length&&(a&&a({loading:!0,loaded:!1,error:void 0,data:[]}),c(e,t,a)),()=>{a=void 0}}),[e.sort().join("|"),t]),(0,n.useLayoutEffect)((()=>{let a=i;return e.length&&d&&(a&&a({loading:!0,loaded:!1,error:void 0,data:[]}),c(e,t,a)),()=>{a=void 0}}),[e.sort().join("|"),t,d]),{datasets:s,loading:r,loaded:o,error:l}})(a,e),d=n.useMemo((()=>{const e=[];return r.length&&e.push.apply(e,r),t&&s.data.length&&e.push.apply(e,s.data),e}),[!o&&l,!s.loading&&s.loaded,t]);return i?i.toString():!o&&l?n.createElement(G,Object.assign({},{datasets:d})):"Loading..."},oe=window.document.createElement("div");oe.style.display="contents",window.document.body.appendChild(oe),(0,s.render)(n.createElement((()=>{const[e,t]=n.useState("cases"),[a,s]=n.useState(!0),[r,o]=n.useState(["New York","Texas","Florida","Kentucky","Tennessee","California"]);return n.createElement(w,null,n.createElement("main",{style:{display:"contents"}},n.createElement(re,Object.assign({},{type:e,states:r,includeUS:a})),n.createElement(S,Object.assign({},{type:e,setType:t,includeUS:a,toggleUS:s,states:r,setStates:o}))))}),null),oe)}},t={};function a(n){if(t[n])return t[n].exports;var s=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(s.exports,s,s.exports,a),s.loaded=!0,s.exports}a.m=e,a.x=e=>{},a.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return a.d(t,{a:t}),t},a.d=(e,t)=>{for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),a.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={514:0},t=[[307,216]],n=e=>{},s=(s,r)=>{for(var o,l,[i,d,c,p]=r,g=0,u=[];g<i.length;g++)l=i[g],a.o(e,l)&&e[l]&&u.push(e[l][0]),e[l]=0;for(o in d)a.o(d,o)&&(a.m[o]=d[o]);for(c&&c(a),s&&s(r);u.length;)u.shift()();return p&&t.push.apply(t,p),n()},r=self.webpackChunkcovid_19=self.webpackChunkcovid_19||[];function o(){for(var n,s=0;s<t.length;s++){for(var r=t[s],o=!0,l=1;l<r.length;l++){var i=r[l];0!==e[i]&&(o=!1)}o&&(t.splice(s--,1),n=a(a.s=r[0]))}return 0===t.length&&(a.x(),a.x=e=>{}),n}r.forEach(s.bind(null,0)),r.push=s.bind(null,r.push.bind(r));var l=a.x;a.x=()=>(a.x=l||(e=>{}),(n=o)())})(),a.x()})();