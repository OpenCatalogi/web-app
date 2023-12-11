"use strict";(self.webpackChunkskeleton_pip=self.webpackChunkskeleton_pip||[]).push([[294],{3687:function(e,n,t){t.d(n,{Z:function(){return j}});var r=t(7294),s=t(5697),a=t.n(s),o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"},i=Object.defineProperty,l=Object.defineProperties,c=Object.getOwnPropertyDescriptors,d=Object.getOwnPropertySymbols,h=Object.prototype.hasOwnProperty,p=Object.prototype.propertyIsEnumerable,m=(e,n,t)=>n in e?i(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,u=(e,n)=>{for(var t in n||(n={}))h.call(n,t)&&m(e,t,n[t]);if(d)for(var t of d(n))p.call(n,t)&&m(e,t,n[t]);return e},j=(e,n,t)=>{const s=(0,r.forwardRef)(((n,s)=>{var a,i=n,{color:m="currentColor",size:j=24,stroke:g=2,children:x}=i,v=((e,n)=>{var t={};for(var r in e)h.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&d)for(var r of d(e))n.indexOf(r)<0&&p.call(e,r)&&(t[r]=e[r]);return t})(i,["color","size","stroke","children"]);return(0,r.createElement)("svg",u((a=u({ref:s},o),l(a,c({width:j,height:j,stroke:m,strokeWidth:g,className:`tabler-icon tabler-icon-${e}`}))),v),[...t.map((([e,n])=>(0,r.createElement)(e,n))),...x||[]])}));return s.propTypes={color:a().string,size:a().oneOfType([a().string,a().number]),stroke:a().oneOfType([a().string,a().number])},s.displayName=`${n}`,s}},3844:function(e,n,t){t.d(n,{Z:function(){return r}});var r=(0,t(3687).Z)("external-link","IconExternalLink",[["path",{d:"M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6",key:"svg-0"}],["path",{d:"M11 13l9 -9",key:"svg-1"}],["path",{d:"M15 4h5v5",key:"svg-2"}]])},7572:function(e,n,t){t.r(n),t.d(n,{default:function(){return v}});var r="UsageDocumentationTemplate-module--code--efe0d",s="UsageDocumentationTemplate-module--codeBlock--7435b",a="UsageDocumentationTemplate-module--description--d3f95",o="UsageDocumentationTemplate-module--section--0520c",i=t(8538),l=t(5663),c=t(3844);function d(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function h(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?d(Object(t),!0).forEach((function(n){p(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n,t){return(n=function(e){var n=function(e,n){if("object"!=typeof e||null===e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var r=t.call(e,n||"default");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"==typeof n?n:String(n)}(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var m=function e(n){return t.withOptions=t=>e(h(h({},n),t)),t;function t(e,...t){const r="string"==typeof e?[e]:e.raw,{escapeSpecialCharacters:s=Array.isArray(e)}=n;let a="";for(let n=0;n<r.length;n++){let e=r[n];s&&(e=e.replace(/\\\n[ \t]*/g,"").replace(/\\`/g,"`").replace(/\\\$/g,"$").replace(/\\{/g,"{")),a+=e,n<t.length&&(a+=t[n])}const o=a.split("\n");let i=null;for(const n of o){const e=n.match(/^(\s+)\S+/);if(e){const n=e[1].length;i=i?Math.min(i,n):n}}if(null!==i){const e=i;a=o.map((n=>" "===n[0]||"\t"===n[0]?n.slice(e):n)).join("\n")}return a.trim().replace(/\\n/g,"\n")}}({});var u=t(6716),j=t(1072),g=t(5893);const x=()=>{const{t:e}=(0,j.$G)();return(0,g.jsxs)(i.W2,{layoutClassName:"UsageDocumentationTemplate-module--container--4864e",children:[(0,g.jsxs)("section",{className:o,children:[(0,g.jsx)(l.X6,{level:1,children:"Componenten op OpenCatalogi plaatsen en Componenten installeren"}),(0,g.jsx)(l.nv,{lead:!0,className:a,children:"Er zijn drie manieren om een component zichtbaar te maken op OpenCatalogi."})]}),(0,g.jsx)("section",{className:o,children:(0,g.jsx)(u.x,{title:e("Already have a repository URL? Then register it immediately."),placeholder:e("Repository url of your component or organization"),buttonLabel:e("Submit component or organization")})}),(0,g.jsxs)("section",{className:o,children:[(0,g.jsx)(l.X6,{level:2,children:"1. Een publiccode.yaml opnemen in je repository"}),(0,g.jsxs)(l.nv,{className:a,children:["OpenCatalogi is gebouwd op het Europese public code framework. Uitgangspunt hierbij is dat open source, betekent dat de source code in een git repository staat (bijvoorbeeld Github, Gitlab of SourceTree) die openbaar toegankelijk is.",(0,g.jsx)("br",{}),(0,g.jsx)("br",{}),"Vanuit de gedachte zelf documenterende code hoef je in dit geval alleen een publiccode.yaml op te nemen in de root van je repository. In deze yaml beschrijf je het project op een voor machines leesbare manier. Meer uitleg over publiccode.yaml vind je"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://yml.publiccode.tools/schema.core.html#top-level-keys-and-sections",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})})," ","hier"]})})," ","en een online-editor kun je"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://publiccode-editor.developers.italia.it/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"hier"]})})," ","terug vinden."]}),(0,g.jsx)(l.X6,{level:2,children:"2. Start een eigen OpenCatalogi installatie"}),(0,g.jsxs)(l.nv,{className:a,children:["OpenCatalogi is een federatief ecosysteem dat betekent dat iedere organisatie zijn eigen componenten catalogus kan starten. Vanuit de eigen catalogus kunnen zowel componenten worden geïmporteerd als beschikbaar gesteld voor andere catalogussen.",(0,g.jsx)("br",{}),(0,g.jsx)("br",{}),"Meer informatie over het zelf inrichten van een OpenCatalogi vind je hier onder."]}),(0,g.jsx)(l.X6,{level:2,children:"3. Via andere catalogussen"}),(0,g.jsxs)(l.nv,{className:a,children:["OpenCatalogi synchroniseert onder andere met"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://componentencatalogus.commonground.nl/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"Common Ground Componenten­catalogus"]})})," ","en"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://developer.overheid.nl/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"Developer Overheid"]})}),", het daar vermelden van software zorgt ervoor dat deze wordt overgenomen in OpenCatalogi."]})]}),(0,g.jsxs)("section",{className:o,children:[(0,g.jsx)(l.X6,{level:1,id:"intsallation",children:"Installeren met de skeleton application"}),(0,g.jsx)(l.nv,{className:a,children:"De skeleton application is een makkelijke manier om de componenten te installeren en te gebruiken. De skeleton application is namelijk ontworpen voor snelle applicatietesten en prototypeontwikkeling op het NL Design System."})]}),(0,g.jsxs)("section",{className:o,children:[(0,g.jsx)(l.X6,{level:2,children:"Aan de slag "}),(0,g.jsxs)(l.nv,{className:a,children:['Om een eigen project op te zetten heb je een GitHub-account nodig en daar mee ingelogd zijn. Klik op de groene "Use this template" knop op de ',(0,g.jsx)("br",{}),(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://github.com/ConductionNL/skeleton-app",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"GitHub-pagina"]})}),'. Vertel GitHub waar je je prototype wilt hebben draaien en klik op "reate a repository from template"',(0,g.jsx)("br",{}),(0,g.jsx)("br",{})]}),(0,g.jsx)(l.X6,{level:3,children:"Lokaal je omgeving laten draaien"}),(0,g.jsx)(l.nv,{className:a,children:"Om lokaal te ontwikkelen, moet je de nieuwe repository klonen naar je eigen lokale machine. Open een terminal, navigeer naar de folder die de repository bevat, en maak een keuze tussen Node.js/npm of Docker om de app te laten draaien."}),(0,g.jsx)(l.X6,{level:4,children:"Node.js / NPM"}),(0,g.jsx)(l.nv,{className:a,children:"Je hebt een Git client nodig(optioneel), en je moet Node.js en NPM geïnstalleerd hebben. Dit zal de frontend op poort:9000 laten draaien, dus zorg er voor dat de poort niet al in gebruik is."}),(0,g.jsx)(l.dn,{className:s,children:m`
          $ cd /pwa
          $ npm run build
          $ npm run serve`}),(0,g.jsx)(l.X6,{level:4,children:"Docker"}),(0,g.jsx)(l.nv,{className:a,children:"Je moet Docker geïnstalleerd hebben. Dit zal de frontend op poort:81 laten draaien, dus zorg er voor dat de poort niet al in gebruik is."}),(0,g.jsx)(l.dn,{className:s,children:"$ docker-compose pull"}),(0,g.jsx)(l.nv,{children:"De eerste keer dat je Docker containers of wanneer je grote veranderingen hebt gemaakt aan de werking van de applicatie, voert je het volgende commando uit:"}),(0,g.jsx)(l.dn,{className:s,children:"$ docker-compose up --build"}),(0,g.jsx)(l.nv,{children:"Als je dit niet doet dan draai je de containers zonder de applicatie container te herbouwen."}),(0,g.jsx)(l.dn,{className:s,children:"$ docker-compose up"}),(0,g.jsxs)(l.nv,{children:["Na het succesvol instellen van de ontwikkelomgeving, navigeer naar"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"http://localhost:81/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"http://localhost:81/"]})})," ","om de app in de browser te bekijken."]}),(0,g.jsx)(l.X6,{level:4,children:"Back-endverbinding configureren"}),(0,g.jsxs)(l.nv,{className:a,children:["Om verbinding te maken tussen de frontend en de lokale back-end moet je eerst de back-end opstarten, je kunt de installatiehandleiding"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://github.com/OpenCatalogi/OpenCatalogiBundle#opencatalogibundle-",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"hier"]})})," ","volgen."]}),(0,g.jsxs)(l.nv,{children:["Om de frontend met de lokale gateway te laten praten moet je de omgevingsvariabelen in het"," ",(0,g.jsx)(l.EK,{className:r,children:".env.development"})," bestand veranderen. Vervang de inhoud onder het kopje"," ",(0,g.jsx)(l.EK,{className:r,children:"Backend-config"})," met het volgende:"]}),(0,g.jsx)(l.dn,{className:s,children:m`
            GATSBY_ME_URL=http://localhost/me
            GATSBY_API_URL=http://localhost/api
            GATSBY_ADMIN_URL=http://localhost/admin
            GATSBY_BASE_URL=http://localhost
            GATSBY_FRONTEND_URL=http://localhost:8000
            GATSBY_ORGANIZATION=http://webresourcecatalogus.conduction.svc.cluster.local/organizations/b2d3176e-f1c6-4365-ab86-dd253c65fc43
            GATSBY_LOGIN_REDIRECT=vault
            GATSBY_ADMIN_DASHBOARD_URL=https://admin.opencatalogi.nl
          `}),(0,g.jsx)(l.nv,{children:"Herstart de frontend na het aanpassen van dit bestand."}),(0,g.jsx)(l.X6,{level:5,children:"Node.js / NPM"}),(0,g.jsxs)(l.nv,{className:a,children:["Stop de server door op ",(0,g.jsx)(l.EK,{className:r,children:"CTRL + C"})," te drukken en bouw de frontend opnieuw op:"]}),(0,g.jsx)(l.dn,{className:s,children:m`
          $ npm run build
          $ npm run serve`}),(0,g.jsx)(l.X6,{level:5,children:"Docker"}),(0,g.jsxs)(l.nv,{className:a,children:["Stop de server door op ",(0,g.jsx)(l.EK,{className:r,children:"CTRL + C"})," te drukken en herstart frontend:"]}),(0,g.jsx)(l.dn,{className:s,children:m`
          $ docker-compose down
          $ docker-compose up`}),(0,g.jsx)("br",{}),(0,g.jsx)("br",{}),(0,g.jsxs)(l.nv,{children:["Om de werking van de common-gateway die samen met de applicatie gaat draaien, te veranderen verwijzen we vriendelijk naar de technische documentatie van de"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://commongateway.readthedocs.io/en/latest/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"common-gateway"]})}),"."]}),(0,g.jsx)(l.X6,{level:2,children:"Installeren op Kubernetes omgevingen"}),(0,g.jsxs)(l.nv,{className:a,children:["Om de applicatie te installeren op je eigen cloud omgeving ondersteunen we installaties in"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://kubernetes.io/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"kubernetes"]})})," ","met het gebruik van de bijgeleverde"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://helm.sh/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"Helm"]})})," ","grafiek. Kubernetes is een Container Orkestratie dat een standaard is geworden voor Nederlandse gemeenten onder de"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://haven.commonground.nl/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"Haven"]})})," ","standaard, en waar Helm de standaard installatie methode voor componenten is.",(0,g.jsx)("br",{}),(0,g.jsx)("br",{}),"De Helm grafiek kan geïnstalleerd worden met de hulp van Kubernetes beheertools zoals"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://rancher.com/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"Rancher"]})}),".",(0,g.jsx)("br",{}),(0,g.jsx)("br",{}),"De Helm grafiek kan ook geïnstalleerd worden door Helm te draaien van je lokale machine (zie de instructies over hoe je Helm installeert op ",(0,g.jsx)("br",{}),(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://helm.sh/docs/intro/install/#through-package-managers/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"helm.sh"]})}),", hiervoor is het vereist om"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://kubernetes.io/docs/tasks/tools/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"kubectl"]})})," ","te hebben geïnstalleerd)."]}),(0,g.jsx)(l.dn,{className:s,children:m`
          $ helm repo add opencatalogi https://raw.githubusercontent.com/opencatalogi/web-app/development/helm/
          $ helm install my-opencatalogi opencatalogi/opencatalogi`}),(0,g.jsxs)(l.nv,{children:["Voor overige configuratie verwijzen we vriendelijk naar de documentatie van de helm grafiek die vind je"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://github.com/OpenCatalogi/web-app/blob/e3fdf396cd5fb39266fd77a2af404cb59a881cb7/helm/README.md/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"hier"]})}),"."]}),(0,g.jsx)(l.X6,{level:2,children:"Technische Documentatie"}),(0,g.jsxs)(l.nv,{className:a,children:["De volledige technische documentatie is te vinden op"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://skeleton-app.readthedocs.io/en/latest/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"Read the Docs"]})})," ","en is gebaseerd op"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://www.mkdocs.org/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"MKDocs"]})}),".",(0,g.jsx)("br",{})," ",(0,g.jsx)("br",{}),'Als je de technische documentatie lokaal wilt draaien, kan je dit doen door middel van de MKDocs server en het "erve" commando.']}),(0,g.jsx)(l.dn,{className:s,children:"$ mkdocs serve"}),(0,g.jsxs)(l.nv,{children:["Ga naar de repository en voer het commando uit om de documentatie beschikbaar te stellen op poort:8000. ",(0,g.jsx)("br",{}),"Zorg er voor dat je eerst"," ",(0,g.jsx)("span",{children:(0,g.jsxs)(l.rU,{target:"_new",href:"https://www.mkdocs.org/user-guide/installation/",children:[(0,g.jsx)(l.JO,{className:"utrecht-icon--conduction-start",children:(0,g.jsx)(c.Z,{})}),"MKDocs installeert"]})}),"."]})]})]})};var v=()=>(0,g.jsx)(x,{})},6716:function(e,n,t){t.d(n,{x:function(){return g}});var r=t(7294),s=t(7536),a=t(1072),o=t(7814),i=t(9417),l=t(8767),c=t(7177),d=t(2982);var h=t(6548);const p=e=>{const n=r.useContext(c.Z);return{postRepository:()=>(0,l.useMutation)([],null==n?void 0:n.Github.postRepository,{onSuccess:async n=>{(async(e,n,t)=>{await e.cancelQueries(n);const r=e.getQueryData(n);r&&e.setQueryData(n,[t].concat((0,d.Z)(r))),e.invalidateQueries(n)})(e,"github",n),n.organization&&(0,h.c4)(`/organizations/${n.organization._self.id}`),n.component&&(0,h.c4)(`/components/${n.component._self.id}`)},onError:e=>{console.warn(e.message)}})}};var m=t(3579),u=t(5663),j=t(5893);const g=e=>{let{title:n,placeholder:t,buttonLabel:c}=e;const{t:d}=(0,a.$G)(),[h,g]=r.useState(!1),[x,v]=r.useState(!1),b=(0,l.useQueryClient)(),f=p(b).postRepository(),{register:k,formState:{errors:w},handleSubmit:y,watch:N}=(0,s.cI)(),O=N("html_url");return r.useEffect((()=>{g(f.isLoading)}),[f.isLoading]),r.useEffect((()=>{v(f.isError)}),[f.isError]),(0,j.jsxs)("div",{className:"SubmitUrlTemplate-module--container--a039d",children:[(0,j.jsx)(u.X6,{level:4,children:n}),(0,j.jsx)("form",{onSubmit:y((e=>{const n={repository:{html_url:e.html_url.trim()}};f.mutate({payload:n})})),children:(0,j.jsxs)("div",{className:"SubmitUrlTemplate-module--formContent--1d7ac",children:[(0,j.jsxs)(u.Wi,{className:"SubmitUrlTemplate-module--formField--4d7d9",children:[(0,j.jsx)(u.fE,{id:"submitUrlTextBox",...k("html_url"),invalid:w.html_url,placeholder:d(t),disabled:h,type:"url"}),x&&(0,j.jsx)("span",{className:"SubmitUrlTemplate-module--customErrorMessage--01163",children:d("Oops, something went wrong. Please make sure you're using a valid repository URL or try again later.")})]}),(0,j.jsxs)(m.zx,{className:"SubmitUrlTemplate-module--submitButton--41942",type:"submit",disabled:h||!O,children:[(0,j.jsx)(o.G,{icon:i.XCy}),null!=c?c:d("Send")]})]})})]})}}}]);
//# sourceMappingURL=component---src-pages-documentation-usage-tsx-866ed8bac963f70434d6.js.map