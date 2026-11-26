/* Original material_website fluid scene, with a non-blocking static fallback. */
(async()=>{
  const container=document.getElementById('brand-background');
  if(!container || matchMedia('(prefers-reduced-motion: reduce)').matches || !window.UnicornStudio)return;
  try {
    const response=await fetch('brand/fluid-config-light.json');
    if(!response.ok)return;
    const config=await response.json();
    const data=document.createElement('script');data.type='application/json';data.id='shodh-fluid-scene';data.textContent=JSON.stringify(config);document.body.appendChild(data);
    const scene=await UnicornStudio.addScene({element:container,filePath:data.id,fps:24,scale:1,dpi:Math.min(devicePixelRatio,1.25),lazyLoad:false});
    document.addEventListener('visibilitychange',()=>{if(scene && typeof scene.paused==='boolean')scene.paused=document.hidden;});
    window.addEventListener('pagehide',()=>scene?.destroy(),{once:true});
  } catch (_) { /* CSS uses the same four-color palette when WebGL is unavailable. */ }
})();
