"use strict";(self.webpackChunkskeleton_pip=self.webpackChunkskeleton_pip||[]).push([[6850,9684],{34706:function(e,a,l){l.d(a,{o:function(){return o}});var n=l(67294),i=l(88767),t=l(17177);const o=e=>{const a=n.useContext(t.Z);return{getOne:l=>(0,i.useQuery)(["applications",l],(()=>null==a?void 0:a.Applications.getOne(l)),{initialData:()=>{var a;return null===(a=e.getQueryData("applications"))||void 0===a?void 0:a.find((e=>e.id===l))},onError:e=>{throw new Error(e.message)},enabled:!!l}),getAll:(e,l,n)=>(0,i.useQuery)(["applications",e,l,n],(()=>null==a?void 0:a.Applications.getAll(l,n)),{onError:e=>{throw new Error(e.message)}})}}},22681:function(e,a,l){l.r(a),l.d(a,{default:function(){return g}});var n=l(67294),i="ApplicationsDetailTemplate-module--buttonIcon--3b584",t="ApplicationsDetailTemplate-module--title--8914e",o=l(7633),s=l(65663),d=l(91072),c=l(59417),p=l(50549),r=l(67814),u=l(88767),m=l(34706),v=l(63270),h=l(18931),x=l(1358),j=l(71562),b=l(85893);const D=e=>{var a,l,D,g,y,f,T,A,C,N,k,O,w;let{applicationId:I}=e;const{t:G}=(0,d.$G)(),[E,Z]=n.useState("layer"),z=new u.QueryClient,L=(0,m.o)(z).getOne(I);return(0,b.jsxs)(o.W2,{layoutClassName:"ApplicationsDetailTemplate-module--container--e6fce",children:[(0,b.jsxs)(s.rU,{className:"ApplicationsDetailTemplate-module--backButton--5f643",onClick:e=>{e.preventDefault(),(0,j.c4)("/applications")},href:"/applications",children:[(0,b.jsx)(s.JO,{children:(0,b.jsx)(r.G,{icon:c.acZ})}),G("Back to applications")]}),L.isSuccess&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"ApplicationsDetailTemplate-module--header--bd1fa",children:(0,b.jsxs)("div",{className:"ApplicationsDetailTemplate-module--description--31b70",children:[(0,b.jsx)(s.X6,{level:1,className:t,children:L.data.name}),(0,b.jsx)(h.z,{description:null!==(a=L.data.description)&&void 0!==a?a:G("There is no description available")}),(0,b.jsxs)("div",{className:"ApplicationsDetailTemplate-module--layerAndCategoryContainer--f8e7d",children:[(null===(l=L.data.embedded)||void 0===l?void 0:l.owner)&&(0,b.jsxs)(s.Ou,{"data-tooltip-id":x.TOOLTIP_ID,"data-tooltip-content":"Organisatie",children:[(0,b.jsx)(r.G,{icon:c.wp6}),null===(D=L.data.embedded)||void 0===D?void 0:D.owner.fullName]}),L.data.demoUrl&&(0,b.jsxs)(s.Ou,{"data-tooltip-id":x.TOOLTIP_ID,"data-tooltip-content":"Demo",onClick:()=>open(L.data.demoUrl),children:[(0,b.jsx)(r.G,{icon:c.py1}),G("Demo")]})]})]})}),(0,b.jsx)(s.Z0,{}),(0,b.jsxs)("div",{children:[(0,b.jsx)(s.X6,{level:2,className:t,children:"Screenshot"}),(0,b.jsx)("div",{className:"ApplicationsDetailTemplate-module--screenshotContainer--da970",children:(0,b.jsx)("img",{src:L.data.detailPageImageUrl,className:"ApplicationsDetailTemplate-module--screenshot--c7466"})})]}),(0,b.jsx)(s.Z0,{}),(null===(g=L.data)||void 0===g||null===(y=g.embedded)||void 0===y?void 0:y.components)&&(0,b.jsxs)("div",{className:"ApplicationsDetailTemplate-module--components--eb9d2",children:[(0,b.jsxs)(s.hE,{className:"ApplicationsDetailTemplate-module--dependenciesDisplaySwitchButtons--8b90b",children:[(0,b.jsxs)(s.zx,{className:i,pressed:"layer"===E,appearance:"layer"===E?"secondary-action-button":"subtle-button",onClick:()=>Z("layer"),children:[(0,b.jsx)(s.JO,{children:(0,b.jsx)(r.G,{icon:c.Krp})})," ",G("Layers")]}),(0,b.jsxs)(s.zx,{className:i,pressed:"relations"===E,appearance:"relations"===E?"secondary-action-button":"subtle-button",onClick:()=>Z("relations"),children:[(0,b.jsx)(s.JO,{children:(0,b.jsx)(r.G,{icon:c.bpC})})," ",G("Relations")]})]}),(0,b.jsx)(v.i,{type:E,components:null!==(f=null===(T=L.data)||void 0===T||null===(A=T.embedded)||void 0===A?void 0:A.components)&&void 0!==f?f:[],mainComponent:{id:L.data.id,name:L.data.name,layer:(null===(C=L.data.embedded)||void 0===C||null===(N=C.nl)||void 0===N||null===(k=N.embedded)||void 0===k?void 0:k.commonground.layerType)||null}})]}),!(null!==(O=L.data)&&void 0!==O&&null!==(w=O.embedded)&&void 0!==w&&w.components)&&(0,b.jsx)("span",{className:"ApplicationsDetailTemplate-module--noComponentsFound--23e6a",children:"Deze applicatie heeft (nog) geen gekoppelde componenten."})]}),L.isLoading&&(0,b.jsx)(p.Z,{height:"200px"})]})};var g=e=>(0,b.jsx)(D,{applicationId:e.params.applicationId})},87858:function(e,a,l){l.r(a);var n=l(22681);a.default=n.default}}]);
//# sourceMappingURL=component---src-pages-applications-application-id-index-tsx-c93a9542a567dd939f66.js.map