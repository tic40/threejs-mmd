(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(1906)}])},1906:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var o=n(5893),r=n(7294),i=n(9477),a=n(2125),l=n(410),d=n(9365),m=n(5414),s=n.n(m),c=n(9008),u=n.n(c),h=function(e){var t=e.title,n=e.description;return(0,o.jsxs)(u(),{children:[(0,o.jsx)("title",{children:t}),(0,o.jsx)("meta",{property:"description",content:n}),(0,o.jsx)("meta",{property:"og:title",content:t}),(0,o.jsx)("meta",{property:"og:description",content:n}),(0,o.jsx)("meta",{property:"og:image",content:"https://avatars.githubusercontent.com/u/739402?v=4?s=400"}),(0,o.jsx)("meta",{name:"twitter:card",content:"summary"}),(0,o.jsx)("link",{rel:"icon",href:"".concat("/threejs-mmd/","/favicon.ico")})]})},p=[{path:"./models/lat_miku/Lat\u5f0f\u30df\u30afVer2.31_White.pmd",height:1.58,emissiveMag:1.5},{path:"./models/alicia/mmd/Alicia_solid.pmx",height:1.48,emissiveMag:.1}],f=[{name:"step1",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a1.vmd"},{name:"step2",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a10.vmd"},{name:"step3",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a17.vmd"},{name:"step4",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a19.vmd"},{name:"step5",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a23.vmd"},{name:"step6",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a20.vmd"},{name:"step7",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a22.vmd"},{name:"step8",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a28.vmd"},{name:"step9",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a29.vmd"},{name:"step10",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a31.vmd"},{name:"step11",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a36.vmd"},{name:"step12",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a37.vmd"},{name:"step13",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a7.vmd"},{name:"step14",path:"./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a8.vmd"},{name:"dance1",path:"./motions/nekomimi_switch/nekomimi_lat.vmd"},{name:"dance2",path:"./motions/schrodingeiger_no_koneko/Schrodingeiger_no_Koneko1.vmd"}];function v(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),o.forEach((function(t){v(e,t,n[t])}))}return e}var w=function(){return{w:0,h:0,renderer:null,scene:new i.xsS,clock:new i.SUY,helper:new a._,loader:new l.k,camera:null,groundMesh:null,directionalLight:null,controls:null,currentModel:null,currentMotion:null}},b=function(){var e,t=function(e){var t;!function(){for(var e;null===(e=l.current)||void 0===e?void 0:e.firstChild;)l.current.removeChild(l.current.firstChild)}(),e.w=window.innerWidth,e.h=window.innerHeight,e.renderer=new i.CP7,e.renderer.setPixelRatio(window.devicePixelRatio),e.renderer.setSize(e.w,e.h),e.renderer.setClearColor(16777215,1),e.renderer.shadowMap.enabled=!0,null===(t=l.current)||void 0===t||t.appendChild(e.renderer.domElement),e.camera=new i.cPb(45,e.w/e.h,.1,100),e.scene.add(new i.Mig(16777215,.6)),e.directionalLight=new i.Ox3(16769721,.4),e.directionalLight.position.set(2,4,2),e.directionalLight.castShadow=!0,e.scene.add(e.directionalLight),e.groundMesh=new i.Kj0(new i._12(10,10,1,1),new i.Tn7({opacity:.2})),e.groundMesh.rotation.x=-Math.PI/2,e.groundMesh.receiveShadow=!0,e.scene.add(e.groundMesh),e.scene.add(new i.VLJ(10,20,0,10066329)),e.scene.add(new i.y8_(10)),e.controls=new d.z(e.camera,e.renderer.domElement),e.controls.enableDamping=!0},n=function(e){var t=p[b],n=f[x];console.info("[model file]",n),console.info("[motion file]",n),s()().then((function(){e.loader.loadWithAnimation(t.path,n.path,(function(n){var o,r,l=n.mesh,d=n.animation;l.castShadow=!0;var m=(new i.ZzF).setFromObject(l);l.scale.multiplyScalar(t.height/m.max.y),null===(o=e.controls)||void 0===o||o.target.set(0,t.height/2,0),null===(r=e.controls)||void 0===r||r.object.position.set(0,.55*t.height,1.9*t.height),Array.isArray(l.material)&&l.material.forEach((function(e){return e.emissive.multiplyScalar(t.emissiveMag)})),e.helper.add(l,{animation:d,physics:!0}),e.scene.add(l),e.currentModel=l,e.currentMotion=d,setTimeout((function(){S(g({},k,e)),u(!1),a(e)}),500)}),(function(e){return console.info(e.loaded/e.total*100+"% loaded")}),(function(e){return console.error(e)}))}))},a=function(e){var t=function(){var n,o;(e.helper.update(e.clock.getDelta()),null===(n=e.controls)||void 0===n||n.update(),e.camera)&&(null===(o=e.renderer)||void 0===o||o.render(e.scene,e.camera));requestAnimationFrame(t)};t()},l=(0,r.useRef)(null),m=(0,r.useState)(!1),c=m[0],u=m[1],v=(0,r.useState)(0),b=v[0],_=v[1],y=(0,r.useState)((e=f.length,Math.floor(Math.random()*e))),x=y[0],j=y[1],M=(0,r.useState)(w()),k=M[0],S=M[1];return(0,r.useEffect)((function(){u(!0);var e=w();t(e),n(e)}),[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(h,{title:"tic40/threejs-mmd",description:"tic40/threejs-mmd"}),(0,o.jsx)("div",{className:"absolute top-1/2 left-1/2 animate-ping h-5 w-5 bg-gray-600 rounded-full",role:"status",style:{display:c?"block":"none"}}),(0,o.jsx)("button",{onClick:function(){var e;u(!0),_((b+1)%p.length),k.currentModel&&(null===(e=k.scene)||void 0===e||e.remove(k.currentModel)),n(g({},k))},className:"absolute top-2 left-2 bg-transparent text-gray-700 py-1 px-1 border border-gray-500 rounded",disabled:c,children:"Model >>"}),(0,o.jsx)("button",{onClick:function(){var e;u(!0),j((x+1)%f.length),k.currentModel&&(null===(e=k.scene)||void 0===e||e.remove(k.currentModel)),n(g({},k))},className:"absolute top-2 left-24 bg-transparent text-gray-700 py-1 px-1 border border-gray-500 rounded",disabled:c,children:"Motion >>"}),(0,o.jsx)("a",{className:"absolute bottom-2 left-2 bg-transparent text-gray-700 py-1 px-1 noborder rounded",href:"https://github.com/tic40/threejs-mmd",target:"_blank",rel:"noreferrer",children:"GitHub"}),(0,o.jsx)("div",{ref:l})]})}},1756:function(){}},function(e){e.O(0,[737,34,231,774,888,179],(function(){return t=8312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);