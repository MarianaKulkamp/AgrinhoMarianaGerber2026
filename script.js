// Scroll suave e interações básicas
document.addEventListener('DOMContentLoaded', function(){
  // Toggle menu (mobile)
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', ()=>{
    nav.classList.toggle('open');
    if(nav.classList.contains('open')){nav.style.display='flex'} else {nav.style.display=''}
  });

  // Smooth scroll for internal links
  document.querySelectorAll('.nav-link, .btn').forEach(link => {
    link.addEventListener('click', (e)=>{
      const href = link.getAttribute('href');
      if(href && href.startsWith('#')){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile nav
        if(nav.classList.contains('open')){nav.classList.remove('open');nav.style.display=''}
      }
    })
  });

  // Tech cards: toggle back content
  document.querySelectorAll('.tech-card').forEach(card=>{
    card.addEventListener('click', ()=>{
      card.classList.toggle('active');
    });
    card.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); card.classList.toggle('active'); } });
  });

  // Animated counters when in view
  const stats = document.querySelectorAll('.stat');
  const options = {root:null, rootMargin:'0px', threshold:0.4};

  const startCounter = (el)=>{
    const target = +el.dataset.target;
    const valueEl = el.querySelector('.stat-value');
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    function tick(now){
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      valueEl.textContent = current.toLocaleString('pt-BR');
      if(progress < 1) requestAnimationFrame(tick);
      else valueEl.textContent = target.toLocaleString('pt-BR');
    }
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        startCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, options);
  stats.forEach(s=>observer.observe(s));

});
