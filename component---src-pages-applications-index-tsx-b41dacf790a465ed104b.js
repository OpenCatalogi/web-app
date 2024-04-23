"use strict";(self.webpackChunkskeleton_pip=self.webpackChunkskeleton_pip||[]).push([[733,149],{3687:function(e,t,i){i.d(t,{Z:function(){return h}});var a=i(7294),n=i(5697),r=i.n(n),l={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},o=Object.defineProperty,s=Object.defineProperties,c=Object.getOwnPropertyDescriptors,u=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,m=(e,t,i)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,f=(e,t)=>{for(var i in t||(t={}))d.call(t,i)&&m(e,i,t[i]);if(u)for(var i of u(t))p.call(t,i)&&m(e,i,t[i]);return e},h=(e,t,i)=>{const n=(0,a.forwardRef)(((t,n)=>{var r,o=t,{color:m="currentColor",size:h=24,stroke:g=2,children:v}=o,b=((e,t)=>{var i={};for(var a in e)d.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&u)for(var a of u(e))t.indexOf(a)<0&&p.call(e,a)&&(i[a]=e[a]);return i})(o,["color","size","stroke","children"]);return(0,a.createElement)("svg",f((r=f({ref:n},l),s(r,c({width:h,height:h,stroke:m,strokeWidth:g,className:`tabler-icon tabler-icon-${e}`}))),b),[...i.map((([e,t])=>(0,a.createElement)(e,t))),...v||[]])}));return n.propTypes={color:r().string,size:r().oneOfType([r().string,r().number]),stroke:r().oneOfType([r().string,r().number])},n.displayName=`${t}`,n}},2162:function(e,t,i){i.d(t,{Z:function(){return a}});var a=(0,i(3687).Z)("arrow-right","IconArrowRight",[["path",{d:"M5 12l14 0",key:"svg-0"}],["path",{d:"M13 18l6 -6",key:"svg-1"}],["path",{d:"M13 6l6 6",key:"svg-2"}]])},4383:function(e,t,i){i.d(t,{w:function(){return m}});var a=i(512),n=i(5663),r=i(1072),l=i(2162),o=i(7814),s=i(9417),c=i(3683),u=i(7633),d=i(1562),p=i(5893);const m=e=>{let{title:t,description:i,tags:m,layoutClassName:f}=e;const{t:h}=(0,r.$G)();return(0,p.jsxs)(u.UK,{className:(0,a.Z)(["ApplicationCard-module--container--af780",f&&f]),onClick:()=>(0,d.c4)(t.href),children:[(0,p.jsx)(u.Ol,{className:"ApplicationCard-module--cardHeader--4aa85",children:(0,p.jsx)(u.wP,{children:(0,p.jsxs)(n.rU,{className:"ApplicationCard-module--titleLink--5e3d5",onClick:()=>(0,d.c4)(t.href),children:[(0,p.jsx)(n.JO,{children:(0,p.jsx)(l.Z,{})}),t.label]})})}),(0,p.jsx)(n.nv,{className:"ApplicationCard-module--description--e916e",children:i}),(0,p.jsxs)("div",{className:"ApplicationCard-module--tags--3a901",children:[m.organization&&(0,p.jsxs)(n.Ou,{"data-tooltip-id":c.TOOLTIP_ID,"data-tooltip-content":"Organisatie",children:[(0,p.jsx)(o.G,{icon:s.wp6}),m.organization]}),m.githubLink&&(0,p.jsxs)(n.Ou,{"data-tooltip-id":c.TOOLTIP_ID,"data-tooltip-content":"Demo",onClick:e=>{e.stopPropagation(),open(m.githubLink)},children:[(0,p.jsx)(o.G,{icon:s.py1}),h("Demo")]})]})]})}},6514:function(e,t,i){i.d(t,{k:function(){return u}});var a=i(7294),n=i(512),r=i(7536),l=i(7633),o=i(1634),s=i(1072),c=i(5893);const u=e=>{let{queryLimitName:t,layoutClassName:i}=e;const{watch:u,register:p,control:m,setValue:f,formState:{errors:h}}=(0,r.cI)(),{queryLimit:g,setQueryLimit:v}=(0,o.TL)(),{t:b}=(0,s.$G)(),y=u("limit"),x=g[t];return a.useEffect((()=>{if(!y)return;if(parseInt(y.value)===x)return;const e=d.find((e=>e.value===y.value));e&&v({...g,[t]:parseInt(e.value)})}),[y]),a.useEffect((()=>{f("limit",d.find((e=>e.value===(void 0!==x&&x.toString()))))}),[]),(0,c.jsxs)("div",{className:(0,n.Z)("PaginationLimitSelect-module--container--4b5a5",i&&i),children:[(0,c.jsxs)("span",{children:[b("Results per page"),":"]}),(0,c.jsx)(l.Nh,{ariaLabel:b("Select result limit"),register:p,errors:h,control:m,defaultValue:o.mr,name:"limit",options:d,menuPlacement:"auto",placeholder:b("Limit")})]})},d=[{label:"6",value:"6"},{label:"8",value:"8"},{label:"10",value:"10"},{label:"16",value:"16"},{label:"20",value:"20"},{label:"40",value:"40"},{label:"60",value:"60"},{label:"100",value:"100"}]},4706:function(e,t,i){i.d(t,{o:function(){return l}});var a=i(7294),n=i(8767),r=i(7177);const l=e=>{const t=a.useContext(r.Z);return{getOne:i=>(0,n.useQuery)(["applications",i],(()=>null==t?void 0:t.Applications.getOne(i)),{initialData:()=>{var t;return null===(t=e.getQueryData("applications"))||void 0===t?void 0:t.find((e=>e.id===i))},onError:e=>{throw new Error(e.message)},enabled:!!i}),getAll:(e,i,a)=>(0,n.useQuery)(["applications",e,i,a],(()=>null==t?void 0:t.Applications.getAll(i,a)),{onError:e=>{throw new Error(e.message)}})}}},1917:function(e,t,i){i.r(t),i.d(t,{default:function(){return x}});var a=i(7294),n=i(512),r=i(549),l=i(5663),o=i(7633),s=i(5983),c=i(1072),u=i(4383),d=i(8767),p=i(4706),m=i(9201),f=i(6514),h=i(1634),g=i(7814),v=i(9417),b=i(5893);const y=()=>{var e,t,i,y,x;const{t:j}=(0,c.$G)(),{filters:w}=(0,s.PH)(),{queryLimit:k,setQueryLimit:L}=(0,h.TL)(),{pagination:C,setPagination:N}=(0,m.E)(),A=new d.QueryClient,O=(0,p.o)(A).getAll({...w},C.applicationCurrentPage,k.applicationsQueryLimit);return a.useEffect((()=>{k.previousApplicationsQueryLimit!==k.applicationsQueryLimit&&(N({...C,applicationCurrentPage:1}),L({...k,previousApplicationsQueryLimit:k.applicationsQueryLimit}))}),[k.applicationsQueryLimit]),(0,b.jsxs)(o.W2,{layoutClassName:"ApplicationsTemplate-module--container--2be0f",children:[(0,b.jsx)("div",{className:"ApplicationsTemplate-module--header--15411",children:(0,b.jsxs)("div",{children:[(0,b.jsxs)(l.X6,{level:2,className:(0,n.Z)("ApplicationsTemplate-module--title--2d10c",!O.isSuccess&&"ApplicationsTemplate-module--loading--11c2f"),children:[j("Applications")," ",(null===(e=O.data)||void 0===e?void 0:e.total)>=0?"("+(null===(t=O.data)||void 0===t?void 0:t.total)+")":(0,b.jsxs)(b.Fragment,{children:["(",(0,b.jsx)(r.Z,{height:"1ch",width:"1ch"}),")"]})]}),(0,b.jsxs)(l.nv,{className:"ApplicationsTemplate-module--description--e2fbb",children:["Totaal oplossing op basis van een set componenten. Het gaat om werkende software die een oplossing biedt voor een bepaalde"," ",(0,b.jsx)("span",{children:(0,b.jsxs)(l.rU,{className:"ApplicationsTemplate-module--inlineTextLink--feaef",target:"_new",href:"https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties",children:[(0,b.jsx)(l.JO,{children:(0,b.jsx)(g.G,{icon:v.gJF})}),j("Business function")]})}),"."]})]})}),O.isSuccess&&0!==O.data.total&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"ApplicationsTemplate-module--ComponentsGrid--a2045",children:null===(i=O.data)||void 0===i||null===(y=i.results)||void 0===y?void 0:y.map((e=>{var t,i;return(0,b.jsx)(u.w,{title:{label:e.name,href:"/applications/"+e.id},description:e.shortDescription,tags:{organization:null==e||null===(t=e.embedded)||void 0===t||null===(i=t.owner)||void 0===i?void 0:i.fullName,githubLink:null==e?void 0:e.demoUrl}},e.id)}))}),(0,b.jsxs)("div",{className:"ApplicationsTemplate-module--pagination--6741f",children:[(0,b.jsx)(o.tl,{layoutClassName:"ApplicationsTemplate-module--paginationContainer--c29fa",totalPages:O.data.pages,currentPage:O.data.page,setCurrentPage:e=>N({...C,applicationCurrentPage:e}),ariaLabels:{nextPage:j("Next page"),previousPage:j("Previous page"),page:j("Page")}}),(0,b.jsx)(f.k,{queryLimitName:"applicationsQueryLimit"})]})]}),!(null!==(x=O.data)&&void 0!==x&&x.results)&&!O.isLoading&&j("No results found"),O.isSuccess&&0===O.data.total&&j("No results available"),O.isLoading&&(0,b.jsx)(r.Z,{height:"200px"})]})};var x=e=>(0,b.jsx)(y,{})},7072:function(e,t,i){i.r(t);var a=i(1917);t.default=a.default},549:function(e,t,i){i.d(t,{Z:function(){return o}});var a=i(7294);const n=a.createContext({}),r=!0;function l({baseColor:e,highlightColor:t,width:i,height:a,borderRadius:n,circle:l,direction:o,duration:s,enableAnimation:c=r}){const u={};return"rtl"===o&&(u["--animation-direction"]="reverse"),"number"==typeof s&&(u["--animation-duration"]=`${s}s`),c||(u["--pseudo-element-display"]="none"),"string"!=typeof i&&"number"!=typeof i||(u.width=i),"string"!=typeof a&&"number"!=typeof a||(u.height=a),"string"!=typeof n&&"number"!=typeof n||(u.borderRadius=n),l&&(u.borderRadius="50%"),void 0!==e&&(u["--base-color"]=e),void 0!==t&&(u["--highlight-color"]=t),u}function o({count:e=1,wrapper:t,className:i,containerClassName:o,containerTestId:s,circle:c=!1,style:u,...d}){var p,m,f;const h=a.useContext(n),g={...d};for(const[a,n]of Object.entries(d))void 0===n&&delete g[a];const v={...h,...g,circle:c},b={...u,...l(v)};let y="react-loading-skeleton";i&&(y+=` ${i}`);const x=null!==(p=v.inline)&&void 0!==p&&p,j=[],w=Math.ceil(e);for(let n=0;n<w;n++){let t=b;if(w>e&&n===w-1){const i=null!==(m=t.width)&&void 0!==m?m:"100%",a=e%1,n="number"==typeof i?i*a:`calc(${i} * ${a})`;t={...t,width:n}}const i=a.createElement("span",{className:y,style:t,key:n},"‌");x?j.push(i):j.push(a.createElement(a.Fragment,{key:n},i,a.createElement("br",null)))}return a.createElement("span",{className:o,"data-testid":s,"aria-live":"polite","aria-busy":null!==(f=v.enableAnimation)&&void 0!==f?f:r},t?j.map(((e,i)=>a.createElement(t,{key:i},e))):j)}}}]);
//# sourceMappingURL=component---src-pages-applications-index-tsx-b41dacf790a465ed104b.js.map