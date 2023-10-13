"use strict";(self.webpackChunkskeleton_pip=self.webpackChunkskeleton_pip||[]).push([[733,149],{5587:function(e,t,n){n.d(t,{Z:function(){return s}});var i=n(7294);const a=i.createContext({}),l=!0;function o(e){let{baseColor:t,highlightColor:n,width:i,height:a,borderRadius:o,circle:s,direction:r,duration:d,enableAnimation:c=l}=e;const u={};return"rtl"===r&&(u["--animation-direction"]="reverse"),"number"==typeof d&&(u["--animation-duration"]=`${d}s`),c||(u["--pseudo-element-display"]="none"),"string"!=typeof i&&"number"!=typeof i||(u.width=i),"string"!=typeof a&&"number"!=typeof a||(u.height=a),"string"!=typeof o&&"number"!=typeof o||(u.borderRadius=o),s&&(u.borderRadius="50%"),void 0!==t&&(u["--base-color"]=t),void 0!==n&&(u["--highlight-color"]=n),u}function s(e){let{count:t=1,wrapper:n,className:s,containerClassName:r,containerTestId:d,circle:c=!1,style:u,...p}=e;var m,h,g;const f=i.useContext(a),v={...p};for(const[i,a]of Object.entries(p))void 0===a&&delete v[i];const b={...f,...v,circle:c},x={...u,...o(b)};let y="react-loading-skeleton";s&&(y+=` ${s}`);const w=null!==(m=b.inline)&&void 0!==m&&m,j=[],C=Math.ceil(t);for(let a=0;a<C;a++){let e=x;if(C>t&&a===C-1){const n=null!==(h=e.width)&&void 0!==h?h:"100%",i=t%1,a="number"==typeof n?n*i:`calc(${n} * ${i})`;e={...e,width:a}}const n=i.createElement("span",{className:y,style:e,key:a},"‌");w?j.push(n):j.push(i.createElement(i.Fragment,{key:a},n,i.createElement("br",null)))}return i.createElement("span",{className:r,"data-testid":d,"aria-live":"polite","aria-busy":null!==(g=b.enableAnimation)&&void 0!==g?g:l},n?j.map(((e,t)=>i.createElement(n,{key:t},e))):j)}},4706:function(e,t,n){n.d(t,{o:function(){return o}});var i=n(7294),a=n(686),l=n(7177);const o=e=>{const t=i.useContext(l.Z);return{getOne:n=>(0,a.useQuery)(["applications",n],(()=>null==t?void 0:t.Applications.getOne(n)),{initialData:()=>{var t;return null===(t=e.getQueryData("applications"))||void 0===t?void 0:t.find((e=>e.id===n))},onError:e=>{throw new Error(e.message)},enabled:!!n}),getAll:e=>(0,a.useQuery)(["applications",e],(()=>null==t?void 0:t.Applications.getAll(e)),{onError:e=>{throw new Error(e.message)}})}}},5631:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var i=n(7294),a=n(1800),l=n(783),o=n(5983),s=n(5019),r=n(1370),d=n(686),c=n(4706),u=n(5587),p=n(2283),m=n(5893);const h=()=>{var e,t,n;const[h,g]=i.useContext(o.oh),{t:f}=(0,s.$)(),v=new d.QueryClient,b=(0,c.o)(v).getAll({...h});return(0,m.jsxs)(l.W2,{layoutClassName:"ApplicationsTemplate-module--container--2be0f",children:[(0,m.jsx)("div",{className:"ApplicationsTemplate-module--header--15411",children:(0,m.jsxs)("div",{children:[(0,m.jsx)(a.X6,{level:2,className:"ApplicationsTemplate-module--title--2d10c",children:f("Applications")}),(0,m.jsxs)(a.nv,{className:"ApplicationsTemplate-module--description--e2fbb",children:["Totaal oplossing op basis van een set componenten. Het gaat om werkende software die een oplossing biedt voor een bepaalde"," ",(0,m.jsx)("span",{children:(0,m.jsxs)(a.rU,{target:"_new",href:"https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties",children:[(0,m.jsx)(a.JO,{children:(0,m.jsx)(p.Z,{})})," ","bedrijfsfunctie"]})}),"."]})]})}),b.isSuccess&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:"ApplicationsTemplate-module--ComponentsGrid--a2045",children:null===(e=b.data)||void 0===e||null===(t=e.results)||void 0===t?void 0:t.map((e=>{var t,n;return(0,m.jsx)(r.w,{title:{label:e.name,href:`/applications/${e.id}`},description:e.shortDescription,tags:{organization:null==e||null===(t=e.embedded)||void 0===t||null===(n=t.owner)||void 0===n?void 0:n.fullName,githubLink:null==e?void 0:e.demoUrl}},e.id)}))}),(0,m.jsx)(l.tl,{layoutClassName:"ApplicationsTemplate-module--paginationContainer--c29fa",totalPages:b.data.pages,currentPage:b.data.page,setCurrentPage:e=>g({...h,applicationsCurrentPage:e})})]}),!(null!==(n=b.data)&&void 0!==n&&n.results)&&!b.isLoading&&"Geen resultaten gevonden",b.isLoading&&(0,m.jsx)(u.Z,{height:"200px"})]})};var g=e=>(0,m.jsx)(h,{})},7072:function(e,t,n){n.r(t);var i=n(5631);t.default=i.default}}]);
//# sourceMappingURL=component---src-pages-applications-index-tsx-bd60bd5cb8c446689f5b.js.map