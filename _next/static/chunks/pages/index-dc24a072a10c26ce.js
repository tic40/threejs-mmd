(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return i(2717)}])},2717:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return f}});var n=i(5893),o=i(7294),a=i(9477),r=i(2125),m=i(410),d=i(9365),l=i(5414),s=i.n(l),c=i(9008),u=i.n(c),h=function(e){var t=e.title,i=e.description;return(0,n.jsxs)(u(),{children:[(0,n.jsx)("title",{children:t}),(0,n.jsx)("meta",{property:"description",content:i}),(0,n.jsx)("meta",{property:"og:title",content:t}),(0,n.jsx)("meta",{property:"og:description",content:i}),(0,n.jsx)("meta",{property:"og:image",content:"https://avatars.githubusercontent.com/u/739402?v=4?s=400"}),(0,n.jsx)("meta",{name:"twitter:card",content:"summary"}),(0,n.jsx)("link",{rel:"icon",href:"".concat("/threejs-mmd/","/favicon.ico")})]})},v=[{path:"./models/lat_miku/Lat\u5f0f\u30df\u30afVer2.31_White.pmd",height:1.58,emissiveMag:1.5},{path:"./models/Alicia/MMD/Alicia_solid.pmx",height:1.48,emissiveMag:.1}],p=["./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a1.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a10.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a17.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a19.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a20.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a22.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a23.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a28.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a29.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a31.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a36.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a37.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a7.vmd","./models/alicia/mmd_motion/2\u5206\u30eb\u30fc\u30d5\u309a\u30b9\u30c6\u30c3\u30d5\u309a8.vmd","./motions/nekomimi_switch/nekomimi_lat.vmd","./motions/schrodingeiger_no_koneko/Schrodingeiger_no_Koneko1.vmd"],f=function(){var e,t=function(t,n){var o;u(!1),e=t,n;var l=v[t],c=p[n];console.info("[motion file]",c);var h=window.innerWidth,f=window.innerHeight,_=new a.CP7,g=new a.xsS,w=new a.SUY,b=new r._,x=new m.k;_.setPixelRatio(window.devicePixelRatio),_.setSize(h,f),_.setClearColor(16777215,1),_.shadowMap.enabled=!0,null===(o=i.current)||void 0===o||o.appendChild(_.domElement);var y=new a.cPb(45,h/f,.1,100);g.add(new a.Mig(16777215,.6));var j=new a.Ox3(16769721,.4);j.position.set(2,4,2),j.castShadow=!0,g.add(j);var k=new a.Kj0(new a._12(10,10,1,1),new a.Tn7({opacity:.2}));k.rotation.x=-Math.PI/2,k.receiveShadow=!0,g.add(k),g.add(new a.VLJ(10,20,0,10066329)),g.add(new a.y8_(10));var M=new d.z(y,_.domElement);M.enableDamping=!0,s()().then((function(){x.loadWithAnimation(l.path,c,(function(e){var t=e.mesh,i=e.animation;t.castShadow=!0;var n=(new a.ZzF).setFromObject(t);t.scale.multiplyScalar(l.height/n.max.y),M.target.set(0,l.height/2,0),M.object.position.set(0,.55*l.height,1.9*l.height),Array.isArray(t.material)&&t.material.forEach((function(e){return e.emissive.multiplyScalar(l.emissiveMag)})),b.add(t,{animation:i,physics:!0}),g.add(t),setInterval((function(){return u(!0)}),500)}),(function(e){return console.info(e.loaded/e.total*100+"% loaded")}),(function(e){return console.error(e)}));var e=function(){b.update(w.getDelta()),M.update(),_.render(g,y),requestAnimationFrame(e)};e()}))},i=(0,o.useRef)(null),l=(0,o.useState)(!1),c=l[0],u=l[1];return(0,o.useEffect)((function(){var e=Math.floor(Math.random()*p.length);t(0,e)}),[]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(h,{title:"tic40/threejs-mmd",description:"tic40/threejs-mmd"}),(0,n.jsx)("div",{className:"absolute top-1/2 left-1/2 animate-ping h-5 w-5 bg-gray-600 rounded-full",role:"status",style:{display:c?"none":"block"}}),(0,n.jsx)("button",{onClick:function(){for(var n;null===(n=i.current)||void 0===n?void 0:n.firstChild;)i.current.removeChild(i.current.firstChild);t(1^e,Math.floor(Math.random()*p.length))},className:"absolute top-2 left-2 bg-transparent text-blue-700 py-1 px-2 border border-blue-500 rounded",children:"Change"}),(0,n.jsx)("a",{className:"absolute bottom-2 left-2 bg-transparent text-gray-700 py-1 px-1 border border-gray-500 rounded",href:"https://github.com/tic40/threejs-mmd",target:"_blank",rel:"noreferrer",children:"GitHub"}),(0,n.jsx)("div",{ref:i,style:{display:c?"block":"none"}})]})}},1756:function(){}},function(e){e.O(0,[737,34,231,774,888,179],(function(){return t=8312,e(e.s=t);var t}));var t=e.O();_N_E=t}]);