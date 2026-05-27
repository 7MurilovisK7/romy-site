const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'romy-schneider (6).html');
const outputFile = path.join(__dirname, 'index-final.html');

let html = fs.readFileSync(inputFile, 'utf8');

// ─── 1. Substituir CSS do hero ───────────────────────────────────────────────
const cssHeroOld = /\/\* HERO \*\/[\s\S]*?\/\* TICKER \*\//;

const cssHeroNew = `/* HERO */
#hero{
  height:100vh;
  background:#080808;
  position:relative;
  overflow:hidden;
}

/* Texto lado esquerdo */
.hero-l{
  position:relative;
  z-index:4;
  display:flex;
  flex-direction:column;
  justify-content:center;
  max-width:40%;
  padding:140px max(40px,calc((100vw - 1160px)/2 + 40px)) 80px;
  padding-left:max(40px,calc((100vw - 1160px)/2 + 40px));
}

.hero-badge{display:inline-flex;align-items:center;gap:10px;border:1px solid rgba(201,168,76,.35);padding:7px 18px;margin-bottom:40px;width:fit-content;font-size:11px;font-weight:600;letter-spacing:.25em;text-transform:uppercase;color:var(--gold)}
.hero-badge::before{content:'';width:5px;height:5px;background:var(--gold);border-radius:50%;flex-shrink:0}
.hero-h1{font-size:clamp(40px,5vw,72px);font-weight:800;letter-spacing:-.03em;line-height:1.08;margin-bottom:24px}
.hero-h1 em{font-style:italic}
.hero-rule{width:44px;height:2px;background:var(--metal);margin-bottom:24px}
.hero-sub{font-size:16px;font-weight:300;color:var(--w6);max-width:400px;line-height:1.8;margin-bottom:44px}

@keyframes shimmer{0%{left:-100%}100%{left:160%}}
@keyframes pulse-btn{0%{box-shadow:0 0 0 0 rgba(201,168,76,.4)}65%{box-shadow:0 0 0 14px rgba(201,168,76,0)}100%{box-shadow:0 0 0 0 rgba(201,168,76,0)}}
.btn-hero{display:inline-flex;align-items:center;gap:12px;padding:16px 36px;background:var(--metal);color:var(--bg);font-size:11px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;position:relative;overflow:hidden;animation:pulse-btn 2.8s ease 2s infinite;transition:opacity .3s;width:fit-content}
.btn-hero::after{content:'';position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.28),transparent);transform:skewX(-20deg)}
.btn-hero:hover::after{animation:shimmer .5s ease forwards}
.btn-hero:hover{opacity:.88;animation-play-state:paused}

/* Foto Romy centralizada */
.hero-photo-wrap{
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  height:100%;
  z-index:2;
  pointer-events:none;
}
.hero-photo{
  height:100%;
  width:auto;
  display:block;
}

/* Animação float */
@keyframes float{
  0%,100%{transform:translateY(0px)}
  50%{transform:translateY(-12px)}
}

/* Elementos decorativos */
.hero-col1{
  position:absolute;
  left:0;
  bottom:0;
  height:65%;
  width:auto;
  opacity:0.5;
  z-index:1;
  animation:float 6s ease-in-out infinite;
  pointer-events:none;
}
.hero-estatua{
  position:absolute;
  right:0;
  bottom:0;
  height:60%;
  width:auto;
  opacity:0.7;
  z-index:1;
  animation:float 6s ease-in-out 1.2s infinite;
  pointer-events:none;
}
.hero-col2{
  position:absolute;
  right:18%;
  bottom:0;
  height:45%;
  width:auto;
  opacity:0.35;
  z-index:1;
  animation:float 6s ease-in-out 2.4s infinite;
  pointer-events:none;
}
.hero-badge-civel{
  position:absolute;
  right:4%;
  top:28%;
  width:200px;
  z-index:3;
  animation:float 6s ease-in-out 0.6s infinite;
  pointer-events:none;
}
.hero-badge-familia{
  position:absolute;
  right:4%;
  top:48%;
  width:200px;
  z-index:3;
  animation:float 6s ease-in-out 1.8s infinite;
  pointer-events:none;
}

/* TICKER */`;

if (!cssHeroOld.test(html)) {
  console.error('ERRO: Não encontrou o bloco CSS do hero');
  process.exit(1);
}
html = html.replace(cssHeroOld, cssHeroNew);
console.log('CSS do hero substituído.');

// ─── 2. Substituir HTML da section hero ─────────────────────────────────────
const htmlHeroOld = /<!-- HERO -->[\s\S]*?<\/section>\s*(?=\s*<!-- TICKER -->)/;

const htmlHeroNew = `<!-- HERO -->
<section id="hero">

  <!-- Texto esquerdo -->
  <div class="hero-l">
    <div class="hero-badge">OAB/DF 20407164</div>
    <h1 class="hero-h1">
      <span style="display:block;white-space:nowrap">Clareza jurídica</span>
      <span style="display:block;white-space:nowrap">para os momentos</span>
      <span style="display:block;white-space:nowrap"><em class="metal">que importam.</em></span>
    </h1>
    <div class="hero-rule rv" data-d="1"></div>
    <p class="hero-sub rv" data-d="2">
      Assessoria especializada em Direito Civil e Família para quem busca resolver com segurança e sem complicação.
    </p>
    <a href="https://wa.me/5561991523775" target="_blank" rel="noopener" class="btn-hero rv" data-d="3">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.563 4.144 1.542 5.878L.057 23.97a.5.5 0 00.619.61l6.216-1.62A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.03-1.376l-.36-.213-3.732.974.997-3.634-.235-.374A9.818 9.818 0 0112 2.182c5.42 0 9.818 4.399 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/></svg>
      Falar com a Dra. Romy
    </a>
  </div>

  <!-- Foto central -->
  <div class="hero-photo-wrap">
    <img src="foto-hero.png" alt="Dra. Romy Schneider" class="hero-photo">
  </div>

  <!-- Decorativos -->
  <img src="pasta/1_t.png" alt="" class="hero-col1">
  <img src="pasta/4_t.png" alt="" class="hero-estatua">
  <img src="pasta/3_t.png" alt="" class="hero-col2">
  <img src="pasta/5_t.png" alt="" class="hero-badge-civel">
  <img src="pasta/6_t.png" alt="" class="hero-badge-familia">

</section>
`;

if (!htmlHeroOld.test(html)) {
  console.error('ERRO: Não encontrou o bloco HTML do hero');
  process.exit(1);
}
html = html.replace(htmlHeroOld, htmlHeroNew);
console.log('HTML da section hero substituído.');

// ─── 3. Salvar ───────────────────────────────────────────────────────────────
fs.writeFileSync(outputFile, html, 'utf8');
console.log(`\nSalvo: ${outputFile}`);
const stats = fs.statSync(outputFile);
console.log(`Tamanho: ${(stats.size / 1024).toFixed(1)} KB`);
