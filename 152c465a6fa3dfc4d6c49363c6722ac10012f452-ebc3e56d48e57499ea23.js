(self.webpackChunkskeleton_pip=self.webpackChunkskeleton_pip||[]).push([[2992],{53687:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var i=n(67294),s=n(45697),r=n.n(s),a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},o=Object.defineProperty,l=Object.defineProperties,c=Object.getOwnPropertyDescriptors,u=Object.getOwnPropertySymbols,p=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable,h=(e,t,n)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,g=(e,t)=>{for(var n in t||(t={}))p.call(t,n)&&h(e,n,t[n]);if(u)for(var n of u(t))d.call(t,n)&&h(e,n,t[n]);return e},m=(e,t,n)=>{const s=(0,i.forwardRef)(((t,s)=>{var r,o=t,{color:h="currentColor",size:m=24,stroke:f=2,children:b}=o,v=((e,t)=>{var n={};for(var i in e)p.call(e,i)&&t.indexOf(i)<0&&(n[i]=e[i]);if(null!=e&&u)for(var i of u(e))t.indexOf(i)<0&&d.call(e,i)&&(n[i]=e[i]);return n})(o,["color","size","stroke","children"]);return(0,i.createElement)("svg",g((r=g({ref:s},a),l(r,c({width:m,height:m,stroke:h,strokeWidth:f,className:`tabler-icon tabler-icon-${e}`}))),v),[...n.map((([e,t])=>(0,i.createElement)(e,t))),...b||[]])}));return s.propTypes={color:r().string,size:r().oneOfType([r().string,r().number]),stroke:r().oneOfType([r().string,r().number])},s.displayName=`${t}`,s}},12162:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var i=(0,n(53687).Z)("arrow-right","IconArrowRight",[["path",{d:"M5 12l14 0",key:"svg-0"}],["path",{d:"M13 18l6 -6",key:"svg-1"}],["path",{d:"M13 6l6 6",key:"svg-2"}]])},35832:function(e,t,n){"use strict";n.d(t,{l:function(){return a}});var i=n(67294),s=n(88767),r=n(17177);const a=e=>{const t=i.useContext(r.Z);return{getOne:n=>(0,s.useQuery)(["publications",n],(()=>null==t?void 0:t.Publication.getOne(n)),{initialData:()=>{var t;return null===(t=e.getQueryData("publications"))||void 0===t?void 0:t.find((e=>e.id===n))},onError:e=>{throw new Error(e.message)},enabled:!!n}),getSearch:(e,n,i)=>(0,s.useQuery)(["publications",e,n,i],(()=>null==t?void 0:t.Publication.getSearch(e,n,i)),{onError:e=>{throw new Error(e.message)}}),getFilterOptions:()=>(0,s.useQuery)(["available_publication_catagories"],(()=>null==t?void 0:t.Publication.getFilterOptions()),{onError:e=>{console.warn(e.message)}})}}},48544:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return te}});var i=n(67294),s=n(50549),r=n(90512),a=n(7633),o=n(59373),l=n(91072),c=n(88767),u=n(45578),p=n.n(u),d=n(75472),h=n.n(d),g=n(11700),m=n.n(g),f=n(41609),b=n.n(f),v=n(14841),y=n.n(v),C=n(18446),T=n.n(C),x="VerticalFiltersPublicationsTemplate-module--collapsible--49d77",j="VerticalFiltersPublicationsTemplate-module--isOpen--d3b69",O="VerticalFiltersPublicationsTemplate-module--title--7648a",P="VerticalFiltersPublicationsTemplate-module--toggleIcon--1c7a9",N="VerticalFiltersPublicationsTemplate-module--trigger--79231",w=n(80129),S=n.n(w),k=n(87536),E=n(97893),_=n.n(E),I=n(67814),F=n(59417),L=n(53579),R=n(10192),D=n(14160),W=n(37294),Q=n(19201),A=n(82354),V=n(35832),Z=n(85893);const B=e=>{let{filterSet:t,layoutClassName:n}=e;const{t:a}=(0,l.$G)(),{publicationFilters:u,setPublicationFilters:d}=(0,o.Q)(),{screenSize:g,location:f}=(0,R.C)(),{pagination:v,setPagination:C}=(0,Q.E)(),{resultDisplayLayout:w,setResultDisplayLayout:E}=(0,A.e)(),[B,H]=i.useState(o.I),[M,G]=i.useState(),[$,z]=i.useState(),[U,q]=i.useState(!1),[X,J]=i.useState(!0);i.useEffect((()=>q("desktop"===g)),[g]);const{register:Y,watch:K,reset:ee,setValue:te,control:ne,formState:{errors:ie}}=(0,k.cI)();i.useEffect((()=>{const e={...u,...v,...w};T()(e,B)||(H({...u,...v,...w}),(0,D.c4)((0,W.v)({...u,...v},f.pathname)))}),[u,v,w]),i.useEffect((()=>{ee({status:u.status})}),[u]),i.useEffect((()=>{const e=K((e=>{let{status:t}=e;d({...u,status:null==t?void 0:t.value}),C({...v,publicationCurrentPage:1})}));return()=>e.unsubscribe()}),[t]);const se=f.search,[,re]=se.split("?"),ae=S().parse(re);i.useEffect((()=>{b()(ae)||((e=>{d({...u,status:"false"!==window.sessionStorage.getItem("FILTER_SOFTWARE_TYPE")&&e.status?e.status:""}),C({...v,publicationCurrentPage:e.publicationCurrentPage?y()(e.publicationCurrentPage):1})})(ae),G(ae))}),[]);const oe=new c.QueryClient,le=(0,V.l)(oe).getFilterOptions();i.useEffect((()=>{b()($)||(e=>{te("status",null==$?void 0:$.find((t=>t.value===(null==e?void 0:e.status))))})(M)}),[$]);const ce=(e,t)=>{var n;const i=le.data.facets[e].find((e=>e._id===t));return null!==(n=null==i?void 0:i.count)&&void 0!==n?n:"0"};return i.useEffect((()=>{if(!le.isSuccess)return;const e=le.data.facets["data.status"].map((e=>{var t;return{label:m()(null!==(t=e._id)&&void 0!==t?t:"unknown"),value:e._id}})),t=h()(p()(e,"value"),"label","asc");z(t)}),[le.isSuccess]),(0,Z.jsx)("div",{className:(0,r.Z)("VerticalFiltersPublicationsTemplate-module--container--5cff2",n&&n),children:(0,Z.jsxs)(_(),{className:x,openedClassName:x,triggerClassName:O,triggerOpenedClassName:O,trigger:(0,Z.jsxs)("div",{className:N,children:[(0,Z.jsx)("span",{children:"Filters"}),(0,Z.jsx)(I.G,{className:(0,r.Z)(P,U&&j),icon:F._tD})]}),open:U,transitionTime:100,onOpening:()=>q(!0),onClosing:()=>q(!1),children:[(0,Z.jsx)(L.Z0,{className:"VerticalFiltersPublicationsTemplate-module--separator--713a5"}),le.isSuccess&&(0,Z.jsx)("form",{className:"VerticalFiltersPublicationsTemplate-module--form--75435",children:(null==$?void 0:$.length)>0&&(0,Z.jsx)(L.Wi,{children:(0,Z.jsx)(_(),{className:x,openedClassName:x,triggerClassName:O,triggerOpenedClassName:O,trigger:(0,Z.jsxs)("div",{className:N,children:[(0,Z.jsxs)("span",{className:"VerticalFiltersPublicationsTemplate-module--filterTitle--17464",children:["Status",(0,Z.jsxs)("span",{className:"VerticalFiltersPublicationsTemplate-module--filterCountIndicator--bf980",children:[" (",null==$?void 0:$.length,")"]})]}),(0,Z.jsx)(I.G,{className:(0,r.Z)(P,X&&j),icon:F._tD})]}),open:X,transitionTime:100,onOpening:()=>J(!0),onClosing:()=>J(!1),children:null==$?void 0:$.map((e=>(0,Z.jsxs)("div",{className:"VerticalFiltersPublicationsTemplate-module--radioContainer--f07ee",onClick:()=>{C({...v,componentsCurrentPage:1})},children:[(0,Z.jsx)(L.EU,{className:"VerticalFiltersPublicationsTemplate-module--radioButton--2ba57",value:e.value,checked:u.status===e.value}),(0,Z.jsxs)("span",{className:"VerticalFiltersPublicationsTemplate-module--radioLabel--d967d",onClick:()=>d({...u,status:e.value}),children:[a(e.label)," ","("+ce("data.status",e.value)+")"]})]},e.value)))})})}),le.isLoading&&(0,Z.jsx)(s.Z,{height:"1000px"})]})})};var H=n(49665),M=n(65663);const G=()=>{const{publicationFilters:e,setPublicationFilters:t}=(0,o.Q)(),{t:n}=(0,l.$G)();return(0,Z.jsxs)("div",{children:[(0,Z.jsxs)("div",{className:"ActiveFiltersPublicationsTemplate-module--activeFiltersHeader--612f6",children:[(0,Z.jsx)(M.X6,{level:4,children:"Actieve Filters"}),(0,Z.jsx)(M.Ou,{className:"ActiveFiltersPublicationsTemplate-module--onClickActiveFiltersButton--56993",onClick:()=>{t({...e,_search:"",status:void 0})},children:"Alle filters wissen"})]}),(0,Z.jsxs)("div",{className:"ActiveFiltersPublicationsTemplate-module--activeFilters--2757e",children:[e._search&&(0,Z.jsx)(M.Ou,{onClick:()=>t({...e,_search:""}),children:n("Search term")+": "+e._search}),e.status&&(0,Z.jsx)(M.Ou,{onClick:()=>t({...e,status:void 0}),children:n(m()(e.status))})]})]})};var $=n(56514),z=n(91634),U="PublicationsTableTemplate-module--name--6e197",q="PublicationsTableTemplate-module--tagWidth--e9a36",X=n(12162),J=n(1358);const Y=e=>{let{publications:t,hideTableHead:n}=e;const{t:i}=(0,l.$G)();return(0,Z.jsx)(a.QZ,{ariaLabels:{scrollLeftButton:i("Scroll left"),scrollRightButton:i("Scroll right")},children:(0,Z.jsxs)(M.iA,{className:"PublicationsTableTemplate-module--table--968c0",children:[!n&&(0,Z.jsx)(M.xD,{className:"PublicationsTableTemplate-module--tableHeader--2f2f9",children:(0,Z.jsxs)(M.SC,{children:[(0,Z.jsx)(M.xs,{children:i("Name")}),(0,Z.jsx)(M.xs,{children:i("Catalogi")}),(0,Z.jsx)(M.xs,{children:i("MetaData")}),(0,Z.jsx)(M.xs,{children:i("Status")}),(0,Z.jsx)(M.xs,{children:i("Published")}),(0,Z.jsx)(M.xs,{children:i("Organization")}),(0,Z.jsx)(M.xs,{})]})}),(0,Z.jsxs)(M.RM,{className:"PublicationsTableTemplate-module--tableBody--464fe",children:[t.length>0&&t.map((e=>{var t,n,s,r,a,o,l,c;return(0,Z.jsxs)(M.SC,{className:"PublicationsTableTemplate-module--tableRow--125b4",onClick:()=>(0,D.c4)("/publications/"+e.id),children:[(0,Z.jsx)(M.pj,{children:(0,Z.jsx)("span",{"data-tooltip-id":J.TOOLTIP_ID,"data-tooltip-content":null==e?void 0:e.title,className:U,children:null==e?void 0:e.title})}),(0,Z.jsx)(M.pj,{children:(0,Z.jsx)("span",{"data-tooltip-id":J.TOOLTIP_ID,"data-tooltip-content":i("Catalogi"),className:U,children:i(m()(null===(t=e.catalogi)||void 0===t?void 0:t.name))})}),(0,Z.jsx)(M.pj,{children:(0,Z.jsx)("span",{"data-tooltip-id":J.TOOLTIP_ID,"data-tooltip-content":i("MetaData"),className:U,children:i(m()(null!==(n=null===(s=e.metaData)||void 0===s?void 0:s.name)&&void 0!==n?n:null===(r=e.metaData)||void 0===r?void 0:r.title))})}),(0,Z.jsx)(M.pj,{children:(0,Z.jsxs)(M.Ou,{className:q,"data-tooltip-id":J.TOOLTIP_ID,"data-tooltip-content":i("Status"),children:[(0,Z.jsx)(I.G,{icon:F.sqG}),i(m()(null===(a=e.data)||void 0===a?void 0:a.status))]})}),(0,Z.jsx)(M.pj,{children:(0,Z.jsxs)(M.Ou,{className:q,"data-tooltip-id":J.TOOLTIP_ID,"data-tooltip-content":i("Published"),children:[(0,Z.jsx)(I.G,{icon:F.cf$}),null===(o=e.data)||void 0===o?void 0:o.published]})}),(0,Z.jsx)(M.pj,{children:(0,Z.jsxs)(M.Ou,{className:q,"data-tooltip-id":J.TOOLTIP_ID,"data-tooltip-content":"Organisatie",children:[(0,Z.jsx)(I.G,{icon:F.wp6}),null===(l=e.data)||void 0===l||null===(c=l.organization)||void 0===c?void 0:c.title]})}),(0,Z.jsx)(M.pj,{children:(0,Z.jsxs)(M.rU,{onClick:()=>(0,D.c4)("/publications/"+e.id),className:"PublicationsTableTemplate-module--detailsLink--266ee",children:[(0,Z.jsx)(M.JO,{children:(0,Z.jsx)(X.Z,{})}),i("Details")]})})]},e.id)})),!t.length&&(0,Z.jsxs)(M.SC,{children:[(0,Z.jsx)(M.pj,{children:i("Geen resultaten gevonden")}),(0,Z.jsx)(M.pj,{})]})]})]})})},K=()=>{const{publicationFilters:e,setPublicationFilters:t}=(0,o.Q)(),{pagination:n,setPagination:s}=(0,Q.E)(),r=i.useRef(null),{register:a,watch:l,reset:c,formState:{errors:u}}=(0,k.cI)();i.useEffect((()=>{c({name:e._search})}),[e]);const p=l("name");return i.useEffect((()=>{void 0!==p&&p!==e._search&&(r.current&&clearTimeout(r.current),r.current=setTimeout((()=>{t({...e,_search:void 0===p?"":p}),s({...n,publicationCurrentPage:1})}),500))}),[p]),(0,Z.jsx)("form",{onSubmit:e=>{e.preventDefault()},children:(0,Z.jsxs)(M.Wi,{children:[(0,Z.jsx)(M.lX,{htmlFor:"publicationSearchFormInput",children:"Zoek op naam"}),(0,Z.jsx)(M.fE,{id:"publicationSearchFormInput",defaultValue:"",...a("name",{required:!0}),invalid:!!u.name})]})})},ee=()=>{var e,t,n,u,p,d;const{t:h}=(0,l.$G)(),{publicationFilters:g}=(0,o.Q)(),{queryLimit:m,setQueryLimit:f}=(0,z.TL)(),{pagination:b,setPagination:v}=(0,Q.E)(),{resultDisplayLayout:y,setResultDisplayLayout:C}=(0,A.e)(),T=new c.QueryClient,x=(0,V.l)(T).getSearch({...g},b.publicationCurrentPage,m.publicationsQueryLimit);i.useEffect((()=>{m.previousPublicationsQueryLimit!==m.publicationsQueryLimit&&(v({...b,publicationCurrentPage:1}),f({...m,previousPublicationsQueryLimit:m.publicationsQueryLimit}))}),[m.publicationsQueryLimit]);const j=[{label:h("Table"),pressed:"table"===y.publicationsResultDisplayLayout,handleClick:()=>C({...y,publicationsResultDisplayLayout:"table"}),icon:{name:"table",prefix:"fas"}}];return(0,Z.jsxs)(a.W2,{layoutClassName:"PublicationsTemplate-module--container--e0c73",children:[(0,Z.jsxs)("div",{className:"PublicationsTemplate-module--header--5ad13",children:[(0,Z.jsx)("div",{children:(0,Z.jsxs)(M.X6,{level:2,className:(0,r.Z)("PublicationsTemplate-module--title--b9a91",!x.isSuccess&&"PublicationsTemplate-module--loading--17e60"),children:[h("Publications")," ",(null===(e=x.data)||void 0===e?void 0:e.results.length)>=0?"("+x.data.results.length+")":(0,Z.jsxs)(Z.Fragment,{children:["(",(0,Z.jsx)(s.Z,{height:"1ch",width:"1ch"}),")"]})]})}),(0,Z.jsx)(a.b7,{buttons:j})]}),(0,Z.jsxs)("div",{className:"PublicationsTemplate-module--filtersAndResultsContainer--ce00c",children:[(0,Z.jsx)(B,{filterSet:[g],layoutClassName:"PublicationsTemplate-module--verticalFilters--e5f53"}),(0,Z.jsxs)("div",{className:"PublicationsTemplate-module--results--9918d",children:[(0,Z.jsx)(K,{}),(0,Z.jsx)(G,{}),0===(null===(t=x.data)||void 0===t||null===(n=t.results)||void 0===n?void 0:n.length)&&!x.isLoading&&(0,Z.jsx)("span",{children:h("No components found with active filters")}),(null===(u=x.data)||void 0===u?void 0:u.results)&&(null===(p=x.data)||void 0===p||null===(d=p.results)||void 0===d?void 0:d.length)>0&&(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(Y,{publications:x.data.results}),(0,Z.jsx)(H.J,{}),x.data.results.length&&(0,Z.jsxs)("div",{className:"PublicationsTemplate-module--pagination--efbaf",children:[(0,Z.jsx)(a.tl,{layoutClassName:"PublicationsTemplate-module--paginationContainer--12d38",totalPages:Math.ceil(x.data.results.length/m.publicationsQueryLimit),currentPage:b.publicationCurrentPage,setCurrentPage:e=>v({...b,publicationCurrentPage:e}),ariaLabels:{pagination:h("Pagination"),nextPage:h("Next page"),previousPage:h("Previous page"),page:h("Page")}}),(0,Z.jsx)($.k,{queryLimitName:"publicationsQueryLimit"})]})]}),x.isLoading&&(0,Z.jsx)(s.Z,{height:"200px"})]})]})]})};var te=()=>(0,Z.jsx)(ee,{})},97893:function(e,t,n){var i;e.exports=(i=n(67294),function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){e.exports=n(2)()},function(e,t){e.exports=i},function(e,t,n){"use strict";var i=n(3);function s(){}function r(){}r.resetWarningCache=s,e.exports=function(){function e(e,t,n,s,r,a){if(a!==i){var o=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:r,resetWarningCache:s};return n.PropTypes=n,n}},function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";n.r(t);var i=n(1),s=n.n(i),r=n(0),a=n.n(r),o=function(e){return 0!==e};function l(){return(l=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e}).apply(this,arguments)}function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function p(e,t){return(p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=m(e);if(t){var s=m(this).constructor;n=Reflect.construct(i,arguments,s)}else n=i.apply(this,arguments);return h(this,n)}}function h(e,t){if(t&&("object"===c(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return g(e)}function g(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e){return(m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(a,e);var t,n,i,r=d(a);function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),f(g(t=r.call(this,e)),"continueOpenCollapsible",(function(){var e=g(t).innerRef;t.setState({height:e.scrollHeight,transition:"height ".concat(t.props.transitionTime,"ms ").concat(t.props.easing),isClosed:!1,hasBeenOpened:!0,inTransition:o(e.scrollHeight),shouldOpenOnNextCycle:!1})})),f(g(t),"handleTriggerClick",(function(e){t.props.triggerDisabled||t.state.inTransition||(e.preventDefault(),t.props.handleTriggerClick?t.props.handleTriggerClick(t.props.accordionPosition):!0===t.state.isClosed?(t.openCollapsible(),t.props.onOpening(),t.props.onTriggerOpening()):(t.closeCollapsible(),t.props.onClosing(),t.props.onTriggerClosing()))})),f(g(t),"handleTransitionEnd",(function(e){e.target===t.innerRef&&(t.state.isClosed?(t.setState({inTransition:!1}),t.props.onClose()):(t.setState({height:"auto",overflow:t.props.overflowWhenOpen,inTransition:!1}),t.props.onOpen()))})),f(g(t),"setInnerRef",(function(e){return t.innerRef=e})),t.timeout=void 0,t.contentId=e.contentElementId||"collapsible-content-".concat(Date.now()),t.triggerId=e.triggerElementProps.id||"collapsible-trigger-".concat(Date.now()),e.open?t.state={isClosed:!1,shouldSwitchAutoOnNextCycle:!1,height:"auto",transition:"none",hasBeenOpened:!0,overflow:e.overflowWhenOpen,inTransition:!1}:t.state={isClosed:!0,shouldSwitchAutoOnNextCycle:!1,height:0,transition:"height ".concat(e.transitionTime,"ms ").concat(e.easing),hasBeenOpened:!1,overflow:"hidden",inTransition:!1},t}return t=a,(n=[{key:"componentDidUpdate",value:function(e,t){var n=this;this.state.shouldOpenOnNextCycle&&this.continueOpenCollapsible(),"auto"!==t.height&&0!==t.height||!0!==this.state.shouldSwitchAutoOnNextCycle||(window.clearTimeout(this.timeout),this.timeout=window.setTimeout((function(){n.setState({height:0,overflow:"hidden",isClosed:!0,shouldSwitchAutoOnNextCycle:!1})}),50)),e.open!==this.props.open&&(!0===this.props.open?(this.openCollapsible(),this.props.onOpening()):(this.closeCollapsible(),this.props.onClosing()))}},{key:"componentWillUnmount",value:function(){window.clearTimeout(this.timeout)}},{key:"closeCollapsible",value:function(){var e=this.innerRef;this.setState({shouldSwitchAutoOnNextCycle:!0,height:e.scrollHeight,transition:"height ".concat(this.props.transitionCloseTime?this.props.transitionCloseTime:this.props.transitionTime,"ms ").concat(this.props.easing),inTransition:o(e.scrollHeight)})}},{key:"openCollapsible",value:function(){this.setState({inTransition:o(this.innerRef.scrollHeight),shouldOpenOnNextCycle:!0})}},{key:"renderNonClickableTriggerElement",value:function(){var e=this.props,t=e.triggerSibling,n=e.classParentString;if(!t)return null;switch(c(t)){case"string":return s.a.createElement("span",{className:"".concat(n,"__trigger-sibling")},t);case"function":return t();case"object":return t;default:return null}}},{key:"render",value:function(){var e=this,t={height:this.state.height,WebkitTransition:this.state.transition,msTransition:this.state.transition,transition:this.state.transition,overflow:this.state.overflow},n=this.state.isClosed?"is-closed":"is-open",i=this.props.triggerDisabled?"is-disabled":"",r=!1===this.state.isClosed&&void 0!==this.props.triggerWhenOpen?this.props.triggerWhenOpen:this.props.trigger,a=this.props.contentContainerTagName,o=this.props.triggerTagName,c=this.props.lazyRender&&!this.state.hasBeenOpened&&this.state.isClosed&&!this.state.inTransition?null:this.props.children,u=this.props,p=u.classParentString,d=u.contentOuterClassName,h=u.contentInnerClassName,g="".concat(p,"__trigger ").concat(n," ").concat(i," ").concat(this.state.isClosed?this.props.triggerClassName:this.props.triggerOpenedClassName),m="".concat(p," ").concat(this.state.isClosed?this.props.className:this.props.openedClassName),f="".concat(p,"__contentOuter ").concat(d),b="".concat(p,"__contentInner ").concat(h);return s.a.createElement(a,l({className:m.trim()},this.props.containerElementProps),s.a.createElement(o,l({id:this.triggerId,className:g.trim(),onClick:this.handleTriggerClick,style:this.props.triggerStyle&&this.props.triggerStyle,onKeyPress:function(t){var n=t.key;(" "===n&&"button"!==e.props.triggerTagName.toLowerCase()||"Enter"===n)&&e.handleTriggerClick(t)},tabIndex:this.props.tabIndex&&this.props.tabIndex,"aria-expanded":!this.state.isClosed,"aria-disabled":this.props.triggerDisabled,"aria-controls":this.contentId,role:"button"},this.props.triggerElementProps),r),this.renderNonClickableTriggerElement(),s.a.createElement("div",{id:this.contentId,className:f.trim(),style:t,onTransitionEnd:this.handleTransitionEnd,ref:this.setInnerRef,hidden:this.props.contentHiddenWhenClosed&&this.state.isClosed&&!this.state.inTransition,role:"region","aria-labelledby":this.triggerId},s.a.createElement("div",{className:b.trim()},c)))}}])&&u(t.prototype,n),i&&u(t,i),Object.defineProperty(t,"prototype",{writable:!1}),a}(i.Component);b.propTypes={transitionTime:a.a.number,transitionCloseTime:a.a.number,triggerTagName:a.a.string,easing:a.a.string,open:a.a.bool,containerElementProps:a.a.object,triggerElementProps:a.a.object,contentElementId:a.a.string,classParentString:a.a.string,className:a.a.string,openedClassName:a.a.string,triggerStyle:a.a.object,triggerClassName:a.a.string,triggerOpenedClassName:a.a.string,contentOuterClassName:a.a.string,contentInnerClassName:a.a.string,accordionPosition:a.a.oneOfType([a.a.string,a.a.number]),handleTriggerClick:a.a.func,onOpen:a.a.func,onClose:a.a.func,onOpening:a.a.func,onClosing:a.a.func,onTriggerOpening:a.a.func,onTriggerClosing:a.a.func,trigger:a.a.oneOfType([a.a.string,a.a.element]),triggerWhenOpen:a.a.oneOfType([a.a.string,a.a.element]),triggerDisabled:a.a.bool,lazyRender:a.a.bool,overflowWhenOpen:a.a.oneOf(["hidden","visible","auto","scroll","inherit","initial","unset"]),contentHiddenWhenClosed:a.a.bool,triggerSibling:a.a.oneOfType([a.a.string,a.a.element,a.a.func]),tabIndex:a.a.number,contentContainerTagName:a.a.string,children:a.a.oneOfType([a.a.string,a.a.element])},b.defaultProps={transitionTime:400,transitionCloseTime:null,triggerTagName:"span",easing:"linear",open:!1,classParentString:"Collapsible",triggerDisabled:!1,lazyRender:!1,overflowWhenOpen:"hidden",contentHiddenWhenClosed:!1,openedClassName:"",triggerStyle:null,triggerClassName:"",triggerOpenedClassName:"",contentOuterClassName:"",contentInnerClassName:"",className:"",triggerSibling:null,onOpen:function(){},onClose:function(){},onOpening:function(){},onClosing:function(){},onTriggerOpening:function(){},onTriggerClosing:function(){},tabIndex:null,contentContainerTagName:"div",triggerElementProps:{}},t.default=b}]))},50549:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var i=n(67294);const s=i.createContext({}),r=!0;function a({baseColor:e,highlightColor:t,width:n,height:i,borderRadius:s,circle:a,direction:o,duration:l,enableAnimation:c=r}){const u={};return"rtl"===o&&(u["--animation-direction"]="reverse"),"number"==typeof l&&(u["--animation-duration"]=`${l}s`),c||(u["--pseudo-element-display"]="none"),"string"!=typeof n&&"number"!=typeof n||(u.width=n),"string"!=typeof i&&"number"!=typeof i||(u.height=i),"string"!=typeof s&&"number"!=typeof s||(u.borderRadius=s),a&&(u.borderRadius="50%"),void 0!==e&&(u["--base-color"]=e),void 0!==t&&(u["--highlight-color"]=t),u}function o({count:e=1,wrapper:t,className:n,containerClassName:o,containerTestId:l,circle:c=!1,style:u,...p}){var d,h,g;const m=i.useContext(s),f={...p};for(const[i,s]of Object.entries(p))void 0===s&&delete f[i];const b={...m,...f,circle:c},v={...u,...a(b)};let y="react-loading-skeleton";n&&(y+=` ${n}`);const C=null!==(d=b.inline)&&void 0!==d&&d,T=[],x=Math.ceil(e);for(let s=0;s<x;s++){let t=v;if(x>e&&s===x-1){const n=null!==(h=t.width)&&void 0!==h?h:"100%",i=e%1,s="number"==typeof n?n*i:`calc(${n} * ${i})`;t={...t,width:s}}const n=i.createElement("span",{className:y,style:t,key:s},"‌");C?T.push(n):T.push(i.createElement(i.Fragment,{key:s},n,i.createElement("br",null)))}return i.createElement("span",{className:o,"data-testid":l,"aria-live":"polite","aria-busy":null!==(g=b.enableAnimation)&&void 0!==g?g:r},t?T.map(((e,n)=>i.createElement(t,{key:n},e))):T)}}}]);
//# sourceMappingURL=152c465a6fa3dfc4d6c49363c6722ac10012f452-ebc3e56d48e57499ea23.js.map