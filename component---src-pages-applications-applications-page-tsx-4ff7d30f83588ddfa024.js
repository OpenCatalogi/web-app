"use strict";(self.webpackChunkskeleton_pip=self.webpackChunkskeleton_pip||[]).push([[149],{5587:function(e,t,a){a.d(t,{Z:function(){return s}});var i=a(7294);const n=i.createContext({}),l=!0;function o(e){let{baseColor:t,highlightColor:a,width:i,height:n,borderRadius:o,circle:s,direction:r,duration:u,enableAnimation:c=l}=e;const p={};return"rtl"===r&&(p["--animation-direction"]="reverse"),"number"==typeof u&&(p["--animation-duration"]=`${u}s`),c||(p["--pseudo-element-display"]="none"),"string"!=typeof i&&"number"!=typeof i||(p.width=i),"string"!=typeof n&&"number"!=typeof n||(p.height=n),"string"!=typeof o&&"number"!=typeof o||(p.borderRadius=o),s&&(p.borderRadius="50%"),void 0!==t&&(p["--base-color"]=t),void 0!==a&&(p["--highlight-color"]=a),p}function s(e){let{count:t=1,wrapper:a,className:s,containerClassName:r,containerTestId:u,circle:c=!1,style:p,...d}=e;var m,g,v;const f=i.useContext(n),h={...d};for(const[i,n]of Object.entries(d))void 0===n&&delete h[i];const b={...f,...h,circle:c},y={...p,...o(b)};let x="react-loading-skeleton";s&&(x+=` ${s}`);const w=null!==(m=b.inline)&&void 0!==m&&m,j=[],C=Math.ceil(t);for(let n=0;n<C;n++){let e=y;if(C>t&&n===C-1){const a=null!==(g=e.width)&&void 0!==g?g:"100%",i=t%1,n="number"==typeof a?a*i:`calc(${a} * ${i})`;e={...e,width:n}}const a=i.createElement("span",{className:x,style:e,key:n},"‌");w?j.push(a):j.push(i.createElement(i.Fragment,{key:n},a,i.createElement("br",null)))}return i.createElement("span",{className:r,"data-testid":u,"aria-live":"polite","aria-busy":null!==(v=b.enableAnimation)&&void 0!==v?v:l},a?j.map(((e,t)=>i.createElement(a,{key:t},e))):j)}},2997:function(e,t,a){a.d(t,{k:function(){return c}});var i=a(7294),n=a(5505),l=a(8177),o=a(9885),s=a(1634),r=a(5019),u=a(5893);const c=e=>{let{queryLimitName:t,layoutClassName:a}=e;const{watch:c,register:d,control:m,setValue:g,formState:{errors:v}}=(0,l.cI)(),{queryLimit:f,setQueryLimit:h}=(0,s.TL)(),{t:b}=(0,r.$)(),y=c("limit"),x=f[t];return i.useEffect((()=>{if(!y)return;if(parseInt(y.value)===x)return;const e=p.find((e=>e.value===y.value));e&&h({...f,[t]:parseInt(e.value)})}),[y]),i.useEffect((()=>{g("limit",p.find((e=>e.value===(void 0!==x&&x.toString()))))}),[]),(0,u.jsxs)("div",{className:(0,n.Z)("PaginationLimitSelect-module--container--4b5a5",a&&a),children:[(0,u.jsxs)("span",{children:[b("Results per page"),":"]}),(0,u.jsx)(o.Nh,{ariaLabel:b("Select result limit"),register:d,errors:v,control:m,defaultValue:s.mr,name:"limit",options:p,menuPlacement:"auto",placeholder:b("Limit")})]})},p=[{label:"6",value:"6"},{label:"8",value:"8"},{label:"10",value:"10"},{label:"16",value:"16"},{label:"20",value:"20"},{label:"40",value:"40"},{label:"60",value:"60"},{label:"100",value:"100"}]},4706:function(e,t,a){a.d(t,{o:function(){return o}});var i=a(7294),n=a(686),l=a(7177);const o=e=>{const t=i.useContext(l.Z);return{getOne:a=>(0,n.useQuery)(["applications",a],(()=>null==t?void 0:t.Applications.getOne(a)),{initialData:()=>{var t;return null===(t=e.getQueryData("applications"))||void 0===t?void 0:t.find((e=>e.id===a))},onError:e=>{throw new Error(e.message)},enabled:!!a}),getAll:(e,a,i)=>(0,n.useQuery)(["applications",e,a,i],(()=>null==t?void 0:t.Applications.getAll(a,i)),{onError:e=>{throw new Error(e.message)}}),getCount:()=>(0,n.useQuery)(["applications_count"],(()=>null==t?void 0:t.Applications.getCount()),{onError:e=>{throw new Error(e.message)},refetchOnWindowFocus:!1,refetchOnReconnect:!1,retry:!1,staleTime:6e5})}}},5631:function(e,t,a){a.r(t),a.d(t,{default:function(){return y}});var i=a(7294),n=a(1800),l=a(9885),o=a(5983),s=a(5019),r=a(1370),u=a(686),c=a(4706),p=a(5587),d=a(9201),m=a(2997),g=a(1634),v=a(7606),f=a(3168),h=a(5893);const b=()=>{var e,t,a;const{t:b}=(0,s.$)(),{filters:y}=(0,o.P)(),{queryLimit:x}=(0,g.TL)(),{pagination:w,setPagination:j}=(0,d.E)(),C=new u.QueryClient,N=(0,c.o)(C),A=N.getAll({...y},w.applicationCurrentPage,x.applicationsQueryLimit),L=N.getCount();return i.useEffect((()=>{j({...w,applicationCurrentPage:1})}),[x.applicationsQueryLimit]),(0,h.jsxs)(l.W2,{layoutClassName:"ApplicationsTemplate-module--container--2be0f",children:[(0,h.jsx)("div",{className:"ApplicationsTemplate-module--header--15411",children:(0,h.jsxs)("div",{children:[(0,h.jsxs)(n.X6,{level:2,className:"ApplicationsTemplate-module--title--2d10c",children:[b("Applications")," ",L.data>=0&&`(${L.data})`]}),(0,h.jsxs)(n.nv,{className:"ApplicationsTemplate-module--description--e2fbb",children:["Totaal oplossing op basis van een set componenten. Het gaat om werkende software die een oplossing biedt voor een bepaalde"," ",(0,h.jsx)("span",{children:(0,h.jsxs)(n.rU,{className:"ApplicationsTemplate-module--inlineTextLink--feaef",target:"_new",href:"https://www.gemmaonline.nl/index.php/GEMMA_Bedrijfsfuncties",children:[(0,h.jsx)(n.JO,{children:(0,h.jsx)(v.G,{icon:f.gJF})}),b("Business function")]})}),"."]})]})}),A.isSuccess&&0!==A.data.total&&(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)("div",{className:"ApplicationsTemplate-module--ComponentsGrid--a2045",children:null===(e=A.data)||void 0===e||null===(t=e.results)||void 0===t?void 0:t.map((e=>{var t,a;return(0,h.jsx)(r.w,{title:{label:e.name,href:`/applications/${e.id}`},description:e.shortDescription,tags:{organization:null==e||null===(t=e.embedded)||void 0===t||null===(a=t.owner)||void 0===a?void 0:a.fullName,githubLink:null==e?void 0:e.demoUrl}},e.id)}))}),(0,h.jsxs)("div",{className:"ApplicationsTemplate-module--pagination--6741f",children:[(0,h.jsx)(l.tl,{layoutClassName:"ApplicationsTemplate-module--paginationContainer--c29fa",totalPages:A.data.pages,currentPage:A.data.page,setCurrentPage:e=>j({...w,applicationCurrentPage:e}),ariaLabels:{nextPage:b("Next page"),previousPage:b("Previous page"),page:b("Page")}}),(0,h.jsx)(m.k,{queryLimitName:"applicationsQueryLimit"})]})]}),!(null!==(a=A.data)&&void 0!==a&&a.results)&&!A.isLoading&&b("No results found"),A.isSuccess&&0===A.data.total&&b("No results available"),A.isLoading&&(0,h.jsx)(p.Z,{height:"200px"})]})};var y=e=>(0,h.jsx)(b,{})}}]);
//# sourceMappingURL=component---src-pages-applications-applications-page-tsx-4ff7d30f83588ddfa024.js.map