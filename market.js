/* =====================================================================
   LAXMI EMBROIDERY — PREMIUM MARKETPLACE (Customer SPA)
   Hash-routed, localStorage-backed, self-contained.
   Artwork engine lives in artwork.js (window.MP).
   ===================================================================== */
'use strict';

/* ---------------- Storage helpers ---------------- */
const LS = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
};
const US = {
  CART: 'laxmi_cart', WISH: 'laxmi_wish', ORDERS: 'laxmi_orders',
  AUTH: 'laxmi_auth', DOWNLOADS: 'laxmi_dl', COUPONS: 'laxmi_coupons', SETTINGS: 'laxmi_settings'
};

const settings = Object.assign({ phone: '9865414464', email: 'laxmiembroidery@gmail.com', code: 'LE409', whatsapp: '919865414464', name: 'LAXMI EMBROIDERY', tag: 'Premium Digital Embroidery Designs', heroBadge: '✦ Premium Digitised Embroidery · Instant Download', heroTitle: 'Premium Machine <em>Embroidery</em> Designs', heroSub: 'Beautifully digitized designs for embroidery machines, creators and embroidery professionals. Crafted stitch by stitch, delivered instantly.', paywallOn: false, payMode: 'demo', upiId: 'laxmiembroidery@upi', payeeName: 'LAXMI EMBROIDERY', payNote: 'Scan the QR or pay via any UPI app, then confirm.', payQR: null, payQRName: '' }, LS.get(US.SETTINGS, {}));

/* ---------------- Seed data ---------------- */
const CATEGORY_SEED = [
  { id: 'front-neck', name: 'Front Neck', count: 18 },
  { id: 'back-neck', name: 'Back Neck', count: 14 },
  { id: 'sleeve-buttas', name: 'Sleeve Buttas', count: 16 },
  { id: 'borders', name: 'Borders', count: 11 },
  { id: 'motifs', name: 'Motifs', count: 13 },
  { id: 'bridal', name: 'Bridal', count: 9 },
  { id: 'arabic', name: 'Arabian', count: 8 },
  { id: 'traditional', name: 'Traditional', count: 12 },
  { id: 'kids', name: 'Kids', count: 7 },
  { id: 'floral', name: 'Floral', count: 20 },
  { id: 'applique', name: 'Appliqué', count: 6 },
  { id: 'zari', name: 'Zari Inspired', count: 10 }
];
let CATEGORIES = LS.get('laxmi_categories', null) || CATEGORY_SEED;
if (!LS.get('laxmi_categories', null)) LS.set('laxmi_categories', CATEGORIES);

const COLLECTION_SEED = [
  { id: 'new', name: 'New Arrivals', img: 'motif', bg: 'bg-ink', desc: 'Freshly digitized designs dropped this month.' },
  { id: 'best', name: 'Best Sellers', img: 'floral', bg: 'bg-maroon', desc: 'The designs our customers love most.' },
  { id: 'bridal', name: 'Bridal Collection', img: 'bridal', bg: 'bg-gold', desc: 'Statement bridal &amp; lehenga pieces.' },
  { id: 'festive', name: 'Festive Collection', img: 'leaf', bg: 'bg-green', desc: 'Celebrate with rich festive motifs.' },
  { id: 'premium', name: 'Premium Collection', img: 'mandala', bg: 'bg-plum', desc: 'High stitch-count luxury work.' },
  { id: 'price-99', name: '₹99 Collection', img: 'motif', bg: 'bg-burgundy', desc: 'Beautiful budget-friendly designs.' }
];
let COLLECTIONS = LS.get('laxmi_collections', null) || COLLECTION_SEED;
if (!LS.get('laxmi_collections', null)) LS.set('laxmi_collections', COLLECTIONS);
if (typeof window !== 'undefined') window._MP_COLLS = COLLECTIONS;

let PRODUCTS = LS.get('laxmi_products', null);
if (!PRODUCTS) {
  PRODUCTS = seedProducts();
  LS.set('laxmi_products', PRODUCTS);
}

function seedProducts() {
  const P = (o) => ({
    id: o.id, code: o.code, name: o.name, slug: o.slug, price: o.price, sale: o.sale ?? null,
    cat: o.cat, sub: o.sub ?? o.cat, coll: o.coll ?? [], tags: o.tags ?? [], motif: o.motif ?? 'motif',
    stitches: o.stitches, w: o.w, h: o.h, colors: o.colors, formats: o.formats ?? ['DST', 'PES', 'JEF', 'EXP'],
    hoop: o.hoop ?? '5 × 7"', rating: o.rating ?? 4.8, reviews: o.reviews ?? 12,
    desc: o.desc, suitable: o.suitable ?? ['Blouse', 'Kurti'], status: 'active',
    created: o.created ?? '2026-08-01', sales: o.sales ?? 0, featured: o.featured ?? false,
    free: o.free ?? false, hue1: o.hue1 ?? 'gold', hue2: o.hue2 ?? 'deep'
  });
  return [
    P({ id:1, code:'LE001', name:'Royal Floral Neckline', slug:'royal-floral-neckline', price:299, cat:'front-neck', coll:['best','bridal'], tags:['floral','royal'], motif:'floral', stitches:8542, w:120, h:180, colors:7, hue1:'gold', hue2:'maroon', sales:421, featured:true, rating:4.9, reviews:86, created:'2026-08-12', desc:'A majestic front-neck floral composition with delicate petals and a regal centrepiece — digitized for dense, luxurious stitching.' }),
    P({ id:2, code:'LE002', name:'Classic Back Neck V', slug:'classic-back-neck-v', price:249, cat:'back-neck', coll:['best'], motif:'back-neck', stitches:6200, w:100, h:140, colors:5, hue1:'gold', hue2:'ink', sales:388, featured:true, rating:4.8, reviews:64, created:'2026-08-10', desc:'An elegant V-shaped back-neck border with trailing vines — perfect for blouses and kurtis.' }),
    P({ id:3, code:'LE003', name:'Twin Sleeve Butta Set', slug:'twin-sleeve-butta-set', price:199, cat:'sleeve-buttas', coll:['price-199','best'], motif:'butta', stitches:3400, w:80, h:80, colors:4, hue1:'gold', hue2:'rust', sales:512, featured:true, rating:4.9, reviews:110, created:'2026-08-08', desc:'A matching pair of sleeve buttas with a traditional paisley heart — designed for paired placement.' }),
    P({ id:4, code:'LE004', name:'Mandala Motif Tile', slug:'mandala-motif-tile', price:219, cat:'motifs', coll:['premium'], motif:'mandala', stitches:11800, w:140, h:140, colors:8, hue1:'gold', hue2:'teal', sales:203, featured:true, rating:4.8, reviews:38, created:'2026-08-05', desc:'An intricate mandala motif with concentric stitch rings — a premium centrepiece for sarees and lehengas.' }),
    P({ id:5, code:'LE005', name:'Arabic Front Neck', slug:'arabic-front-neck', price:279, cat:'front-neck', sub:'arabic', coll:['bridal','premium'], motif:'arabic', stitches:9800, w:130, h:170, colors:9, hue1:'gold', hue2:'maroon', sales:276, featured:true, rating:4.9, reviews:72, created:'2026-08-02', desc:'Bold Arabic geometry with fine filigree details — a luxurious statement front neck in the current trend.' }),
    P({ id:6, code:'LE006', name:'Rose Sleeve Border', slug:'rose-sleeve-border', price:179, cat:'borders', coll:['price-99','festive'], motif:'rose', stitches:4100, w:180, h:70, colors:5, hue1:'rose', hue2:'green', sales:349, featured:true, rating:4.7, reviews:51, created:'2026-07-30', desc:'A delicate rose-and-leaf sleeve border that wraps sweetly around cuff openings.' }),
    P({ id:7, code:'LE007', name:'Bridal Lehenga Jhoomar', slug:'bridal-lehenga-jhoomar', price:399, cat:'bridal', coll:['bridal','premium'], motif:'bridal', stitches:15400, w:180, h:220, colors:11, hue1:'gold', hue2:'maroon', sales:187, featured:true, rating:5, reviews:44, created:'2026-07-28', desc:'A grand bridal jhoomar with cascading floral drops — the showpiece for your wedding lehenga.' }),
    P({ id:8, code:'LE008', name:'Kids Butterfly Appliqué', slug:'kids-butterfly-applique', price:149, cat:'kids', coll:['price-99'], motif:'kid', stitches:2600, w:70, h:90, colors:6, hue1:'pink', hue2:'sky', sales:298, featured:true, rating:4.8, reviews:39, created:'2026-07-25', desc:'A cheerful butterfly appliqué outline with satin-stitch wings — adorable for kids’ wear.' }),
    P({ id:9, code:'LE009', name:'Paisley Bridal Butta', slug:'paisley-bridal-butta', price:259, cat:'sleeve-buttas', coll:['bridal'], motif:'paisley', stitches:7200, w:90, h:110, colors:7, hue1:'gold', hue2:'emerald', sales:312, created:'2026-07-22', desc:'A grand paisley butta filled with diamond filigree — rich heritage done with modern density.' }),
    P({ id:10, code:'LE010', name:'Zari Paisley Corner', slug:'zari-paisley-corner', price:229, cat:'zari', coll:['festive','premium'], motif:'zari', stitches:8900, w:120, h:120, colors:6, hue1:'gold', hue2:'maroon', sales:241, created:'2026-07-20', desc:'Gold-on-gold zari corner treatment with dense metallic-toned stitching for festive wear.' }),
    P({ id:11, code:'LE011', name:'Floral Saree Border', slug:'floral-saree-border', price:319, cat:'borders', coll:['best'], motif:'border', stitches:12300, w:220, h:110, colors:9, hue1:'gold', hue2:'teal', sales:265, created:'2026-07-18', desc:'A continuous floral trail for saree and dupatta borders — long-form digitization at its finest.' }),
    P({ id:12, code:'LE012', name:'Traditional Front Neck', slug:'traditional-front-neck', price:259, cat:'front-neck', sub:'traditional', coll:['festive'], motif:'traditional', stitches:7800, w:125, h:150, colors:6, hue1:'gold', hue2:'rust', sales:298, created:'2026-07-15', desc:'Timeless traditional front neckline with temple-inspired arch work and hanging bells.' }),
    P({ id:13, code:'LE013', name:'Back Neck Butterflies', slug:'back-neck-butterflies', price:189, cat:'back-neck', coll:['price-199'], motif:'leaf', stitches:3800, w:110, h:130, colors:4, hue1:'green', hue2:'gold', sales:356, created:'2026-07-12', desc:'Playful butterflies resting on vines — a light, pretty back-neck piece.' }),
    P({ id:14, code:'LE014', name:'Ombré Chinese Butta', slug:'ombre-chinese-butta', price:199, cat:'sleeve-buttas', coll:['price-199'], motif:'butta', stitches:4500, w:75, h:85, colors:5, hue1:'pink', hue2:'gold', sales:402, created:'2026-07-10', desc:'A modern ombré defined-embroidery butta with soft colour blending and a bold outline.' }),
    P({ id:15, code:'LE015', name:'Criss-Cross Back Neck', slug:'criss-cross-back-neck', price:219, cat:'back-neck', motif:'arabic', stitches:5600, w:105, h:120, colors:5, hue1:'gold', hue2:'black', sales:230, created:'2026-07-08', desc:'Criss-cross lattice back neck with scattered jewelled dots — clean, contemporary, striking.' }),
    P({ id:16, code:'LE016', name:'Peacock Motif', slug:'peacock-motif', price:269, cat:'motifs', coll:['premium'], motif:'mandala', stitches:9600, w:130, h:150, colors:8, hue1:'teal', hue2:'gold', sales:198, created:'2026-07-05', desc:'An ornate peacock-inspired motif with layered feather stitching — a centre of gravity for any garment.' }),
    P({ id:17, code:'LE017', name:'Kids Teddy Appliqué', slug:'kids-teddy-applique', price:139, cat:'kids', coll:['price-99'], motif:'kid', stitches:2100, w:60, h:75, colors:4, hue1:'sky', hue2:'cream', sales:311, created:'2026-07-02', desc:'A cute appliqué teddy bear with stitched details — soft, simple and machine-friendly.' }),
    P({ id:18, code:'LE018', name:'Arabian Sleeve Set', slug:'arabian-sleeve-set', price:249, cat:'sleeve-buttas', sub:'arabic', coll:['bridal'], motif:'arabic', stitches:6100, w:85, h:95, colors:7, hue1:'gold', hue2:'maroon', sales:274, created:'2026-06-29', desc:'A set of Arabian-style sleeve pieces with pointed arcs and dangle details.' }),
    P({ id:19, code:'LE019', name:'Gota Patti Border', slug:'gota-patti-border', price:229, cat:'zari', coll:['festive'], motif:'zari', stitches:8700, w:200, h:90, colors:5, hue1:'gold', hue2:'red', sales:256, created:'2026-06-25', desc:'Zari gota-patti inspired border with layered metallic sheen for a rich festive finish.' }),
    P({ id:20, code:'LE020', name:'Floral Appliqué Motif', slug:'floral-applique-motif', price:179, cat:'applique', coll:['price-99'], motif:'rose', stitches:3300, w:90, h:90, colors:5, hue1:'pink', hue2:'green', sales:224, created:'2026-06-22', desc:'A rose-appliqué motif with satin edges — great for quick, bold placement.' }),
    P({ id:21, code:'LE021', name:'Neck Jewel Set', slug:'neck-jewel-set', price:289, cat:'front-neck', coll:['bridal','premium'], motif:'bridal', stitches:10200, w:135, h:165, colors:9, hue1:'gold', hue2:'emerald', sales:199, created:'2026-06-18', desc:'A jewelled front-neck set with emerald-toned stone fills and gold tracing.' }),
    P({ id:22, code:'LE022', name:'Temple Arch Back Neck', slug:'temple-arch-back-neck', price:279, cat:'back-neck', sub:'traditional', coll:['festive'], motif:'traditional', stitches:8200, w:115, h:135, colors:6, hue1:'gold', hue2:'maroon', sales:243, created:'2026-06-15', desc:'Temple architecture translated into thread — arched back neck with pillar details.' }),
    P({ id:23, code:'LE023', name:'Mini Leaf Motif', slug:'mini-leaf-motif', price:0, free:true, cat:'motifs', coll:['price-99'], motif:'leaf', stitches:940, w:40, h:50, colors:3, hue1:'green', hue2:'gold', sales:1200, rating:4.6, reviews:210, created:'2026-06-10', desc:'A free leaf motif to try our digitising quality. DST, PES, JEF, EXP included.' }),
    P({ id:24, code:'LE024', name:'Dragon Emblem', slug:'dragon-emblem', price:349, cat:'motifs', coll:['premium'], motif:'arabic', stitches:12800, w:160, h:160, colors:10, hue1:'red', hue2:'gold', sales:156, created:'2026-06-05', desc:'A bold dragon emblem with dense scales and flowing whiskers — standout branded work.' })
  ];
}

const COUPONS = [
  { code:'LAXMI10', pct:10, min:500, max:150, label:'10% off orders above ₹500' },
  { code:'WELCOME99', pct:0, fixed:99, min:0, max:99, label:'Flat ₹99 off your first order' },
  { code:'FESTIVE', pct:15, min:799, max:300, label:'15% off festive orders above ₹799' }
];

const REVIEW_SEED = [
  { name:'Priya S.', product:1, rating:5, date:'Aug 2026', text:'Stitched the Royal Floral Neckline on a red blouse — the density and finish were superb. Looks exactly like the preview.' },
  { name:'Anita M.', product:3, rating:5, date:'Jul 2026', text:'The twin sleeve buttas stitched beautifully. Clear instructions and instant download. Highly recommend.' },
  { name:'Rukmini K.', product:5, rating:5, date:'Jul 2026', text:'Arabic front neck came out stunning. The fill stitches are perfectly balanced, no puckering at all.' },
  { name:'Divya R.', product:13, rating:4, date:'Jun 2026', text:'Lovely back neck design. Download was instant and all four formats worked on my machine.' },
  { name:'Sangeetha P.', product:8, rating:5, date:'Jun 2026', text:'Made my daughter’s frock with the butterfly set — so cute! Will order again.' },
  { name:'Meera L.', product:23, rating:5, date:'Jun 2026', text:'The free leaf motif convinced me to buy. Quality is outstanding for a digital file.' }
];

/* ---------------- Auth ---------------- */
function currentUser() { return LS.get(US.AUTH, null); }
function isLoggedIn() { return !!currentUser(); }
function requireLogin(action) {
  if (!isLoggedIn()) { location.hash = '#/account'; toast('Please sign in first', 'account'); return false; }
  return true;
}

/* ---------------- Helpers ---------------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const INR = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');
const fmt = (n) => Number(n || 0).toLocaleString('en-IN');
function byId(id) { return PRODUCTS.find(p => p.id === Number(id) || String(p.id) === String(id)); }
function bySlug(slug) { return PRODUCTS.find(p => p.slug === slug || String(p.id) === slug); }
function money(p) { return p.free ? 0 : (p.sale ?? p.price); }
function catName(id) { const c = CATEGORIES.find(c => c.id === id); return c ? c.name : id; }
function collName(id) { const c = COLLECTIONS.find(c => c.id === id); return c ? c.name : id; }
function designCode(p) { return settings.code + '-' + String(p.code).replace(/\D/g, '').slice(-3); }

/* ---------------- Cart / Wishlist ---------------- */
let cart = LS.get(US.CART, []);
let wish = LS.get(US.WISH, []);
function saveCart() { LS.set(US.CART, cart); updateBadges(); }
function saveWish() { LS.set(US.WISH, wish); updateBadges(); }
function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function cartTotal() { return cart.reduce((s, i) => s + money(byId(i.id)) * i.qty, 0); }
function addToCart(id, qty, silent) {
  id = Number(id); qty = qty || 1;
  const item = cart.find(i => i.id === id);
  if (item) item.qty += qty; else cart.push({ id, qty });
  saveCart();
  if (!silent) toast('Added to cart', 'cart', byId(id)?.name);
}
function toggleWish(id) {
  id = Number(id);
  const i = wish.indexOf(id);
  if (i >= 0) wish.splice(i, 1); else wish.push(id);
  saveWish();
  return i < 0;
}
function updateBadges() {
  setBadge('#cartCount', cartCount());
  setBadge('#wishCount', wish.length);
}
function setBadge(sel, n) {
  const el = $(sel); if (!el) return;
  el.textContent = n; el.classList.toggle('hidden', n === 0);
}

/* ---------------- Toast ---------------- */
const icons = {
  cart: '<path d="M6 6h15l-1.5 9h-12L5 3H2"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1.2a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z"/>',
  account: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 8h.01M11 12h1v4h1"/>',
  download: '<path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>'
};
function toast(msg, kind, sub) {
  const wrap = $('#toastWrap');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<div class="t-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">${icons[kind] || icons.check}</svg></div>
    <div><div style="font-weight:700">${esc(msg)}</div>${sub ? `<div style="font-size:.76rem;color:#a9a294">${esc(sub)}</div>` : ''}</div>`;
  wrap.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 2600);
}

/* ---------------- Modal ---------------- */
function openModal(html) {
  $('#modalBox').innerHTML = html;
  $('#modalBack').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  $('#modalBack').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', (e) => { if (e.target.id === 'modalBack') closeModal(); });

/* ---------------- Nav / UI state ---------------- */
function setActiveNav(route) {
  $$('#mainNav a, .mob-nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === route));
  $('#mainNav').classList.remove('open');
}
function bindBurger() {
  const b = $('#burger');
  if (b && !b.dataset.bound) { b.addEventListener('click', () => $('#mainNav').classList.toggle('open')); b.dataset.bound = '1'; }
  const s = $('#searchBtn');
  if (s && !s.dataset.bound) { s.addEventListener('click', () => { $('#mainNav').classList.remove('open'); location.hash = '#/search'; }); s.dataset.bound = '1'; }
}

/* ---------------- Router ---------------- */
const routes = [];
function route(pattern, handler) { routes.push({ pattern, handler }); }

route('#/', () => renderHome());
route('#/shop', (m, q) => renderShop(q));
route('#/search', () => renderSearch());
route('#/categories', () => renderCategories());
route('#/collections', () => renderCollections());
route('#/wishlist', () => renderWishlist());
route('#/cart', () => renderCart());
route('#/checkout', () => renderCheckout());
route('#/success', (m, q) => renderSuccess(q));
route('#/account', () => renderAccount());
route('#/downloads', () => renderDownloads());
route('#/orders', () => renderOrders());
route('#/about', () => renderPage('about'));
route('#/contact', () => renderPage('contact'));
route('#/faq', () => renderPage('faq'));
route('#/help', () => renderPage('faq'));
route('#/login', () => renderAuth('login'));
route('#/register', () => renderAuth('register'));
route('#/auth', () => renderAuth('login'));
route('#/design/:id', (m) => renderDetail(m[0]));

function router() {
  const hash = location.hash || '#/';
  const queryIdx = hash.indexOf('?');
  const path = queryIdx === -1 ? hash : hash.slice(0, queryIdx);
  const q = new URLSearchParams(queryIdx === -1 ? '' : hash.slice(queryIdx + 1));
  const base = path.split('/')[1] || 'home';
  setActiveNav(base);
  window.scrollTo({ top: 0, behavior: 'instant' });
  for (const r of routes) {
    const parts = r.pattern.split('/');
    const hparts = path.split('/');
    if (parts.length !== hparts.length) continue;
    let match = true, params = [];
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith(':')) params.push(decodeURIComponent(hparts[i]));
      else if (parts[i] !== hparts[i]) { match = false; break; }
    }
    if (match) { try { r.handler(params, q); } catch (e) { console.error(e); renderError(e); } return; }
  }
  render404();
}

/* ---------------- Page scaffolding ---------------- */
function pageHead(title, sub) {
  return `<div class="page-head"><div class="container">
    <div class="crumbs"><a href="#/">Home</a><span class="sep">/</span></div>
    <h1>${title}</h1>${sub ? `<p>${sub}</p>` : ''}
  </div></div>`;
}
function sectionHead(eyebrow, title, sub, center) {
  return `<div class="section-head ${center ? 'center' : ''}"><span class="eyebrow ${center ? 'center' : ''}">${eyebrow}</span><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>`;
}
function render404() {
  $('#app').innerHTML = `<div class="container"><div class="empty" style="min-height:50vh;display:grid;place-content:center">
    <div class="art">${MP.motifArtwork({ code: '', motif: 'mandala', hue1: 'gold', hue2: 'maroon' }, 'cream', 420, { code: false })}</div>
    <h2>This thread got tangled</h2><p>We couldn't find that page. Let's guide you back.</p>
    <div><a class="btn btn-gold" href="#/">Back to Home</a> <a class="btn btn-ghost" href="#/shop">Browse Designs</a></div>
  </div></div>`;
}
function renderError(e) {
  $('#app').innerHTML = `<div class="container"><div class="empty" style="min-height:50vh;display:grid;place-content:center">
    <h2>Something went wrong.</h2><p>${esc(e.message || 'Please try again.')}</p>
    <div><a class="btn btn-gold" href="#/">Home</a></div></div></div>`;
}

/* ---------------- HOME ---------------- */
function renderHome() {
  const featured = PRODUCTS.filter(p => p.featured && p.status !== 'disabled').slice(0, 8);
  const cats = CATEGORIES.slice(0, 8);
  const colls = COLLECTIONS.slice(0, 3);
  const reviews = REVIEW_SEED;
  $('#app').innerHTML = `
  <section class="hero">
    <div class="hero-grid"></div>
    <div class="container">
      <div class="hero-text reveal in">
        <div class="hero-badge">${settings.heroBadge || '✦ Premium Digitised Embroidery · Instant Download'}</div>
        <h1>${settings.heroTitle || 'Premium Machine <em>Embroidery</em> Designs'}</h1>
        <p class="lead">${settings.heroSub || 'Beautifully digitized designs for embroidery machines, creators and embroidery professionals. Crafted stitch by stitch, delivered instantly.'}</p>
        <div class="hero-cta">
          <a class="btn btn-gold" href="#/shop">Explore Designs</a>
          <a class="btn btn-outline" href="#/shop?filter=new">View New Arrivals</a>
        </div>
        <div class="hero-stats">
          <div><div class="num">800+</div><div class="lbl">Designs</div></div>
          <div><div class="num">9.6k</div><div class="lbl">Customers</div></div>
          <div><div class="num">4.9★</div><div class="lbl">Rated</div></div>
          <div><div class="num">4</div><div class="lbl">Formats</div></div>
        </div>
      </div>
      <div class="hero-stage reveal in d1">
        <div class="hero-chip chip1"><b>${esc(designCode(PRODUCTS[0]))}</b>Royal Floral Neckline</div>
        <div class="hero-chip chip2"><b>8,542 Stitches</b>Dense · 7 Colours</div>
        <div class="hero-chip chip3"><b>DST · PES · JEF · EXP</b>Machine ready</div>
        <div class="spool s1"><div class="thread"></div><div class="core"></div></div>
        <div class="spool s2"><div class="thread"></div><div class="core"></div></div>
        <div class="spool s3"><div class="thread"></div><div class="core"></div></div>
        <div class="spool s4"><div class="thread"></div><div class="core"></div></div>
        <div class="spool s5"><div class="thread"></div><div class="core"></div></div>
        <div class="hoop3d">
          <div class="needle"></div>
          <div class="rim"></div>
          <div class="fabric">${MP.motifArtwork(PRODUCTS[0], 'black', 420, { code: false })}</div>
        </div>
        <div class="thread-strand strand-1"></div>
        <div class="thread-strand strand-2"></div>
        <div class="thread-strand strand-3"></div>
      </div>
    </div>
  </section>

  <div class="ticker"><div class="ticker-track">
    ${Array(2).fill(CATEGORIES.slice(0, 8)).flat().map(c => `<span>${c.name} · ${c.count} designs</span>`).join('')}
    ${Array(2).fill('<span>Instant Digital Download</span><span>DST · PES · JEF · EXP</span><span>Premium Digitisation</span>').join('')}
  </div></div>

  <section class="section">
    <div class="container">
      ${sectionHead('Collections', 'Shop by Category', 'From regal front necks to delicate sleeve buttas — find the motif your garment deserves.', true)}
      <div class="cat-grid">
        ${cats.map(c => `<a href="#/shop?cat=${c.id}" class="cat-card reveal">
          <div class="art">${MP.catArt(c.id)}</div>
          <div class="overlay"><h3>${c.name}</h3><p>${c.count} designs</p></div>
          <span class="count">${c.count}</span>
        </a>`).join('')}
      </div>
      <div style="text-align:center;margin-top:30px"><a href="#/categories" class="btn btn-outline">View all categories</a></div>
    </div>
  </section>

  <section class="section alt">
    <div class="container">
      ${sectionHead('Handpicked', 'Featured Designs', 'Handpicked embroidery designs for your next creation.')}
      <div class="grid">${featured.map(productCard).join('')}</div>
      <div style="text-align:center;margin-top:34px"><a class="btn btn-dark" href="#/shop">Browse all designs</a></div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead('Curated sets', 'Signature Collections', 'Full design families for complete garments — stitched together, delivered together.', true)}
      <div class="collect-grid">
        ${colls.map(c => `<a href="#/shop?coll=${c.id}" class="collect ${c.bg} reveal">
          <span class="art">${MP.collArt(c.id)}</span>
          <div class="c"><h3>${c.name}</h3><p>${c.desc}</p><span class="btn btn-gold btn-sm">Shop ${c.name}</span></div>
        </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--ivory-2);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
    <div class="container">
      ${sectionHead('Why us', 'The LAXMI Standard', 'Every design is digitised, tested and delivered by a team that has stitched lakhs of metres.', true)}
      <div class="feature-grid">
        ${[
          ['spool', 'Ultra-clean stitching', 'Balanced densities and smooth satin transitions — minimal puckering, maximum finish.'],
          ['bolt', 'Instant delivery', 'Pay once, download all formats immediately. DST, PES, JEF, EXP.'],
          ['layers', 'Machine ready', 'Correctly sized, hooped and tested for home and industrial machines.'],
          ['heart', 'Loved by thousands', '4.9★ from 9,000+ embroidery professionals across India.']
        ].map((f, i) => `
        <div class="feature reveal ${'d' + i}">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5Z"/></svg></div>
          <h3>${f[1]}</h3><p>${f[2]}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead('Loved', 'What our customers say', 'Real reviews from real embroidery artists.', true)}
      <div class="review-grid">
        ${reviews.map((r, i) => `
        <div class="review reveal ${'d' + (i % 3)}">
          <div class="stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
          <p>"${esc(r.text)}"</p>
          <div class="who"><div class="avi">${esc(r.name[0])}</div><div><b>${esc(r.name)}</b><span>${r.date} · ${esc(PRODUCTS.find(p => p.id === r.product)?.name || 'Verified buyer')}</span></div></div>
        </div>`).join('')}
      </div>
    </div>
  </section>
  `;
  bindCards();
  observeReveals();
}

/* ---------------- Card component ---------------- */
function productCard(p) {
  const price = money(p);
  const flag = p.free ? '<span style="background:#3f8c6a;color:#fff">Free</span>' :
    (p.sale ? '<span style="background:var(--maroon);color:#fff">Sale</span>' : (p.featured ? '<span style="background:var(--black);color:#fff">Featured</span>' : ''));
  const was = p.sale ? `<span class="was">${INR(p.price)}</span>` : '';
  const inWish = wish.includes(p.id);
  return `
  <article class="pcard reveal in">
    <div class="thumb">
      <div class="art">${MP.motifArtwork(p, 'cream', 420)}</div>
      <div class="flag">${flag}</div>
      <button class="wish ${inWish ? 'on' : ''}" data-wish="${p.id}" aria-label="Wishlist" title="Wishlist">
        <svg viewBox="0 0 24 24" fill="${inWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8" width="18" height="18"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1.2a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
      </button>
      <div class="quick">
        <a class="btn btn-gold btn-sm" href="#/design/${p.slug}">Quick Preview</a>
      </div>
    </div>
    <div class="meta">
      <span class="cat">${esc(catName(p.cat))}</span>
      <h3><a href="#/design/${p.slug}">${esc(p.name)}</a></h3>
      <div class="specs">
        <span><b>${fmt(p.stitches)}</b> st</span>
        <span><b>${p.w} × ${p.h}</b> mm</span>
        <span><b>${p.colors}</b> col</span>
      </div>
      <div class="row">
        <div class="price">${price ? INR(price) : 'FREE'}${was}</div>
        <button class="btn btn-dark btn-sm" data-add="${p.id}" data-qty="1">${price ? 'Add to Cart' : 'Download'}</button>
      </div>
    </div>
  </article>`;
}

/* ---------------- Global delegation ---------------- */
function bindCards() {
  document.querySelectorAll('[data-add]').forEach(b => {
    if (b.dataset.bound) return; b.dataset.bound = '1';
    b.addEventListener('click', () => {
      if (b.hasAttribute('data-buynow')) { if (requireLogin('buy')) { addToCart(+b.dataset.add, +(b.dataset.qty || 1), true); location.hash = '#/checkout'; } return; }
      addToCart(+b.dataset.add, +(b.dataset.qty || 1));
    });
  });
  document.querySelectorAll('[data-wish]').forEach(b => {
    if (b.dataset.bound) return; b.dataset.bound = '1';
    b.addEventListener('click', () => {
      const id = +b.dataset.wish, on = toggleWish(id);
      const p = byId(id);
      b.classList.toggle('on', on);
      const svg = b.querySelector('svg');
      if (svg) svg.setAttribute('fill', on ? 'currentColor' : 'none');
      const label = b.id === 'detailWish' ? $('#detailWish') : null;
      if (label) label.textContent = on ? '♥ In Wishlist' : '♡ Add to Wishlist';
      toast(on ? 'Saved to wishlist' : 'Removed from wishlist', 'heart', p?.name);
    });
  });
}
function observeReveals() {
  const io = new IntersectionObserver((es) => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  $$('.reveal').forEach(el => { if (!el.classList.contains('in')) io.observe(el); });
}

/* ---------------- SHOP ---------------- */
function renderShop(q) {
  q = q || new URLSearchParams();
  const params = { cat: q.get('cat'), coll: q.get('coll'), filter: q.get('filter'), q: q.get('q') || '' };
  const prices = q.getAll('p'), formats = q.getAll('f');
  const sort = q.get('sort') || 'new';

  let list = PRODUCTS.filter(p => p.status !== 'disabled');
  if (params.cat) list = list.filter(p => p.cat === params.cat || p.sub === params.cat);
  if (params.coll) list = list.filter(p => (p.coll || []).includes(params.coll));
  if (params.q) { const t = params.q.toLowerCase(); list = list.filter(p => (p.name + ' ' + (p.tags || []).join(' ') + ' ' + p.cat + ' ' + p.code).toLowerCase().includes(t)); }
  if (prices.length) list = list.filter(p => prices.some(r => { const [a, b] = r.split('-').map(Number); const m = money(p); return m >= a && (b ? m <= b : true); }));
  if (formats.length) list = list.filter(p => (p.formats || []).some(f => formats.includes(f)));
  if (params.filter === 'new') list = list.filter(p => Date.now() - new Date(p.created).getTime() < 45 * 864e5);
  if (params.filter === 'best') list = list.sort((a, b) => b.sales - a.sales);
  if (params.filter === 'trend') list = [...list].sort((a, b) => (b.rating * b.sales) - (a.rating * a.sales));
  if (params.filter === 'free') list = list.filter(p => p.free);
  if (params.filter === 'premium') list = list.filter(p => p.price >= 300);

  if (sort === 'new') list = [...list].sort((a, b) => b.created.localeCompare(a.created));
  else if (sort === 'popular') list = [...list].sort((a, b) => b.sales - a.sales);
  else if (sort === 'lo') list = [...list].sort((a, b) => money(a) - money(b));
  else if (sort === 'hi') list = [...list].sort((a, b) => money(b) - money(a));
  else if (sort === 'rated') list = [...list].sort((a, b) => b.rating - a.rating);

  const fmtBands = [['0-99', 'Under ₹100'], ['100-149', '₹100 – ₹149'], ['150-199', '₹150 – ₹199'], ['200-299', '₹200 – ₹299'], ['300-9999', '₹300+']];

  $('#app').innerHTML = `
  <div class="page-head"><div class="container">
    <div class="crumbs"><a href="#/">Home</a><span class="sep">/</span></div>
    <h1>${params.cat ? esc(catName(params.cat)) : (params.filter === 'free' ? 'Free Designs' : 'All Designs')}</h1>
    <p>${params.cat ? esc(catName(params.cat)) + ' designs, beautifully digitised and machine ready.' : 'Browse the full collection — every design is tested, sized and delivered in four formats.'}</p>
  </div></div>

  <section class="section">
    <div class="container">
      <div class="shop-layout">
        <aside class="filters">
          <h4 style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">Filters <span class="filters-reset" data-reset-filters>Reset</span></h4>
          <h4>Category</h4>
          <div class="grp">
            ${CATEGORIES.map(c => `<label><input type="checkbox" data-cat="${c.id}" ${params.cat === c.id ? 'checked' : ''}> ${c.name}</label>`).join('')}
          </div>
          <h4>Price</h4>
          <div class="grp">
            ${fmtBands.map(([v, l]) => `<label><input type="checkbox" data-price="${v}" ${prices.includes(v) ? 'checked' : ''}> ${l}</label>`).join('')}
          </div>
          <h4>Format</h4>
          <div class="chips">${['DST', 'PES', 'JEF', 'EXP'].map(f => `<span class="chip ${formats.includes(f) ? 'active' : ''}" data-format="${f}">${f}</span>`).join('')}</div>
          <h4>Quick picks</h4>
          <div class="grp">
            ${[['new', 'New Arrivals'], ['best', 'Best Sellers'], ['trend', 'Trending'], ['free', 'Free'], ['premium', 'Premium']].map(([f, l]) => `<label><input type="radio" name="quick" value="${f}" ${params.filter === f ? 'checked' : ''}> ${l}</label>`).join('')}
          </div>
        </aside>
        <div>
          <div class="toolbar">
            <span class="count">${list.length} design${list.length === 1 ? '' : 's'}</span>
            <div class="sort"><select data-sort>
              <option value="new" ${sort === 'new' ? 'selected' : ''}>Sort: Newest</option>
              <option value="popular" ${sort === 'popular' ? 'selected' : ''}>Most Popular</option>
              <option value="lo" ${sort === 'lo' ? 'selected' : ''}>Price: Low → High</option>
              <option value="hi" ${sort === 'hi' ? 'selected' : ''}>Price: High → Low</option>
              <option value="rated" ${sort === 'rated' ? 'selected' : ''}>Best Rated</option>
            </select></div>
          </div>
          <div class="grid">${list.length ? list.map(productCard).join('') : emptyState('No designs match', 'Try clearing some filters or search wider.')}</div>
        </div>
      </div>
    </div>
  </section>`;

  bindCards();
  bindFilters();
}

function bindFilters() {
  const rebuild = () => {
    const cats = $$('[data-cat]').filter(i => i.checked).map(i => i.dataset.cat);
    const prices = $$('[data-price]').filter(i => i.checked).map(i => i.dataset.price);
    const formats = $$('[data-format]').filter(i => i.classList.contains('active')).map(i => i.dataset.format);
    const quick = $('input[name=quick]:checked')?.value || '';
    const sort = $('[data-sort]')?.value || 'new';
    const dup = new URLSearchParams();
    cats.forEach(c => dup.append('cat', c));
    prices.forEach(p => dup.append('p', p));
    formats.forEach(f => dup.append('f', f));
    if (quick) dup.set('filter', quick);
    dup.set('sort', sort);
    const next = '#/shop' + (dup.toString() ? '?' + dup.toString() : '');
    if (next !== location.hash) location.hash = next; else router();
  };
  $$('.filters input').forEach(i => i.onchange = rebuild);
  $$('[data-format]').forEach(c => c.onclick = () => { c.classList.toggle('active'); rebuild(); });
  $$('[data-sort]').forEach(s => s.onchange = rebuild);
  $('[data-reset-filters]')?.addEventListener('click', () => { location.hash = '#/shop'; router(); });
}

function emptyState(title, msg) {
  return `<div class="empty"><div class="art">${MP.motifArtwork({ code: '', motif: 'motif', hue1: 'gold', hue2: 'maroon' }, 'cream', 420, { code: false })}</div>
    <h2>${title}</h2><p>${msg}</p><a class="btn btn-gold" href="#/shop">Browse Designs</a></div>`;
}

/* ---------------- PRODUCT DETAIL ---------------- */
function renderDetail(id) {
  const p = bySlug(id);
  if (!p) return render404();
  document.title = p.name + ' — LAXMI EMBROIDERY';
  const price = money(p), was = p.sale, save = p.sale ? Math.round((1 - p.sale / p.price) * 100) : 0;
  const rel = PRODUCTS.filter(r => r.id !== p.id && r.status !== 'disabled' &&
    (r.cat === p.cat || (r.tags || []).some(t => (p.tags || []).includes(t)) || ((p.coll || []).some(c => (r.coll || []).includes(c))))).slice(0, 4);
  const related = rel.length > 1 ? rel : PRODUCTS.filter(r => r.id !== p.id && r.status !== 'disabled').slice(0, 4);
  const reviews = REVIEW_SEED.filter(r => r.product === p.id);
  const inCart = cart.find(i => i.id === p.id);

  $('#app').innerHTML = `
  <section class="section">
    <div class="container">
      <div class="crumbs" style="margin-bottom:20px"><a href="#/">Home</a><span class="sep">/</span><a href="#/shop">Shop</a><span class="sep">/</span><a href="#/shop?cat=${p.cat}">${esc(catName(p.cat))}</a><span class="sep">/</span><span>${esc(p.name)}</span></div>
      <div class="detail-layout">
        <div>
          <div class="viewer">
            <div class="viewer-stage shown" id="vstage">
              <div class="art" id="vart" style="padding:26px">${MP.motifArtwork(p, 'cream', 500, { code: false })}</div>
            </div>
            <div class="viewer-tools">
              <button class="stool" data-vzoom="-1" title="Zoom out">−</button>
              <button class="stool" data-vzoom="1" title="Zoom in">+</button>
              <button class="stool" data-vfit title="Fit to screen">⊡</button>
              <span class="sep-tool"></span>
              <button class="stool" data-vrot title="Rotate">⟳</button>
              <button class="stool" data-vreset title="Reset">↺</button>
              <span class="sep-tool"></span>
              <button class="stool" data-vgrid title="Grid overlay">▦</button>
              <button class="stool" data-vfull title="Fullscreen">⛶</button>
              <div class="fabric-picker" id="fabricPicker">
                ${Object.keys(MP.FABRICS).map(f => `<button class="fabric-swatch ${f === 'cream' ? 'active' : ''}" data-fab="${f}" style="background:${MP.FABRICS[f]}" title="${f}"></button>`).join('')}
              </div>
            </div>
          </div>
        </div>
        <div class="detail-info">
          <span class="eyebrow">${esc(catName(p.cat))}${p.sub && p.sub !== p.cat ? ' · ' + esc(catName(p.sub)) : ''} · ${esc(p.code)}</span>
          <h1>${esc(p.name)}</h1>
          <div class="rating-line">
            <span class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}</span>
            <b style="color:var(--text)">${p.rating.toFixed(1)}</b> · ${p.reviews} reviews · <b style="color:#3f8c6a">${fmt(p.sales)} sold</b>
          </div>
          <div class="price-line">
            <span class="now">${price ? INR(price) : 'FREE'}</span>
            ${was ? `<span class="was">${INR(was)}</span>` : ''}
            ${was ? `<span class="save">SAVE ${save}%</span>` : ''}
            ${p.free ? '<span class="save" style="background:#3f8c6a">FREE DOWNLOAD</span>' : ''}
          </div>
          <p class="detail-desc">${esc(p.desc)}</p>
          <div class="key-chips">
            <span class="kchip"><i>${fmt(p.stitches)}</i>&nbsp; stitches</span>
            <span class="kchip"><i>${p.w} × ${p.h}</i>&nbsp; mm</span>
            <span class="kchip"><i>${p.colors}</i>&nbsp; colors</span>
            <span class="kchip">Hoop&nbsp;<b>${p.hoop}</b></span>
            ${(p.formats || []).map(f => `<span class="kchip"><i>${f}</i></span>`).join('')}
          </div>
          <div class="qty-row">
            <div class="qty"><button data-qminus>−</button><span id="qty">${inCart?.qty || 1}</span><button data-qplus>+</button></div>
            <span class="note">Per design package (all formats included)</span>
          </div>
          <div class="detail-cta">
            <button class="btn btn-gold" data-add="${p.id}" data-buynow id="detailAdd">${price ? 'Add to Cart · ' + INR(price * (inCart?.qty || 1)) : 'Download Free'}</button>
            <button class="btn btn-dark" data-add="${p.id}" data-buynow data-qty="${inCart?.qty || 1}" id="detailBuy">Buy Now</button>
            <button class="btn btn-ghost" data-wish="${p.id}" id="detailWish">${wish.includes(p.id) ? '♥ In Wishlist' : '♡ Add to Wishlist'}</button>
          </div>
          <div class="secure-note">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5Z"/><path d="m9 12 2 2 4-4"/></svg>
            Instant delivery after payment · 128-bit secure checkout · Download unlimited times
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--ivory-2);border-top:1px solid var(--border)">
    <div class="container">
      <div class="detail-cols">
        <div class="form-card">
          <h2 style="margin-bottom:18px">Description</h2>
          <p style="color:#555">${esc(p.desc)}</p>
          <p style="color:#555;margin-top:12px">Digitised on calibrated machines and stitch-tested for density, underlay and pull compensation. Each package is delivered digitally the moment your order is confirmed, and remains available in your library forever.</p>
          <h2 style="margin:34px 0 14px">Included Files</h2>
          <div class="format-chips">
            ${(p.formats || []).map(f => `<span class="format-chip ${p.free ? 'free' : ''}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" width="16" height="16"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>${f}</span>`).join('')}
          </div>
          <h2 style="margin:34px 0 14px">Design Specifications</h2>
          <table class="spec-table">
            ${[['Stitch Count', fmt(p.stitches) + ' stitches'], ['Design Width', p.w + ' mm'], ['Design Height', p.h + ' mm'], ['Color Changes', p.colors], ['File Formats', (p.formats || []).join(', ')], ['Recommended Hoop', p.hoop], ['Max Stitch Length', '3.0 mm'], ['Design Code', esc(designCode(p))]].map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
          </table>
        </div>
        <div>
          <div class="form-card" style="margin-bottom:24px">
            <h2 style="margin-bottom:14px">Suitable For</h2>
            <div class="key-chips" style="margin-bottom:0">${(p.suitable && p.suitable.length ? p.suitable : ['Blouse', 'Kurti', 'Saree', 'Dupatta']).map(s => `<span class="kchip">${s}</span>`).join('')}</div>
          </div>
          <div class="form-card">
            <h2 style="margin-bottom:16px;display:flex;justify-content:space-between;align-items:center">Customer Reviews <span class="note">${p.reviews} review${p.reviews === 1 ? '' : 's'}</span></h2>
            ${reviews.length ? reviews.map(reviewCard).join('') : '<div class="note" style="padding:20px 0;text-align:center">Reviews from verified buyers will appear here.</div>'}
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${sectionHead('More like this', 'Related Designs', 'Pairs perfectly with your selection.')}
      <div class="grid">${related.map(productCard).join('')}</div>
    </div>
  </section>`;

  bindCards();
  bindViewer(p);
  bindQty(p);
}

function reviewCard(r) {
  return `<div class="review-card">
    <div class="avi">${esc(r.name[0])}</div>
    <div class="rc">
      <b>${esc(r.name)}</b><span>${r.date} · Verified purchase</span>
      <div class="stars" style="color:var(--gold);letter-spacing:2px">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
      <p>${esc(r.text)}</p>
    </div>
  </div>`;
}

function bindViewer(p) {
  const picker = $('#fabricPicker'); if (!picker) return;
  const vart = $('#vart'), vstage = $('#vstage');
  let vscale = 1, vrot = 0, zoomEnabled = false, gridOn = false;
  picker.querySelectorAll('.fabric-swatch').forEach(sw => sw.onclick = () => {
    picker.querySelectorAll('.fabric-swatch').forEach(s => s.classList.remove('active'));
    sw.classList.add('active');
    vart.innerHTML = MP.motifArtwork(p, sw.dataset.fab, 500, { code: false, codeOnDark: ['black', 'maroon', 'green', 'navy'].includes(sw.dataset.fab) });
    toast('Fabric changed to ' + sw.dataset.fab, 'check');
  });
  $$('.stool').forEach(bt => {
    if (bt.dataset.vzoom) bt.onclick = () => { zoomEnabled = true; vscale = Math.min(6, Math.max(1, +(vscale + (+bt.dataset.vzoom) * 0.3))); apply(); };
    if (bt.dataset.vfit) bt.onclick = () => { zoomEnabled = false; apply(); };
    if (bt.dataset.vrot) bt.onclick = () => { vrot = (vrot + 90) % 360; apply(); };
    if (bt.dataset.vreset) bt.onclick = () => { vscale = 1; vrot = 0; zoomEnabled = false; gridOn = false; vstage.classList.remove('grid-v'); apply(); };
    if (bt.dataset.vgrid) bt.onclick = () => { gridOn = !gridOn; vstage.classList.toggle('grid-v', gridOn); toast(gridOn ? 'Grid on' : 'Grid off', 'info'); };
    if (bt.dataset.vfull) bt.onclick = () => { if (!document.fullscreenElement) vstage.requestFullscreen?.().catch(() => {}); else document.exitFullscreen(); };
  });
  function apply() {
    vart.style.transform = `scale(${zoomEnabled ? vscale : 1}) rotate(${vrot}deg)`;
  }
}

function bindQty(p) {
  const qEl = $('#qty'); if (!qEl) return;
  const cta = $('#detailAdd'), buy = $('#detailBuy');
  const mk = () => {
    const q = +qEl.textContent;
    if (cta) cta.textContent = p.free ? 'Download Free' : `Add to Cart · ${INR(money(p) * q)}`;
    if (buy) buy.dataset.qty = q;
    if (cta) cta.dataset.qty = q;
  };
  $('[data-qplus]').onclick = () => { qEl.textContent = +qEl.textContent + 1; mk(); };
  $('[data-qminus]').onclick = () => { qEl.textContent = Math.max(1, +qEl.textContent - 1); mk(); };
}

/* ---------------- CATEGORIES / COLLECTIONS / SEARCH ---------------- */
function renderCategories() {
  $('#app').innerHTML = `
  ${pageHead('All Categories', 'Browse every family of embroidery design in the LAXMI library.')}
  <section class="section"><div class="container">
    <div class="cat-grid">${CATEGORIES.map(c => `
      <a href="#/shop?cat=${c.id}" class="cat-card reveal">
        <div class="art">${MP.catArt(c.id)}</div>
        <div class="overlay"><h3>${c.name}</h3><p>${c.count} designs</p></div>
        <span class="count">${c.count}</span>
      </a>`).join('')}
    </div>
  </div></section>`;
  observeReveals();
}
function renderCollections() {
  $('#app').innerHTML = `
  ${pageHead('Collections', 'Curated design families for complete garments — stitched and sold together.')}
  <section class="section"><div class="container">
    <div class="collect-grid">${COLLECTIONS.map(c => `
      <a href="#/shop?coll=${c.id}" class="collect ${c.bg} reveal" style="min-height:260px">
        <span class="art">${MP.collArt(c.id)}</span>
        <div class="c"><h3>${c.name}</h3><p>${c.desc}</p><span class="btn btn-gold btn-sm">Shop ${c.name}</span></div>
      </a>`).join('')}
    </div>
  </div></section>`;
  observeReveals();
}
function renderSearch() {
  $('#app').innerHTML = `
  ${pageHead('Search Designs', 'Find by name, category, style, format, stitch count or price.')}
  <section class="section"><div class="container">
    <div class="form-card" style="margin-bottom:28px">
      <div class="field" style="margin-bottom:0">
        <input id="searchInput" type="search" placeholder="Try “floral”, “bridal”, “butta”, “LE007”…" autocomplete="off">
        <div id="acWrap" style="position:relative"></div>
      </div>
    </div>
    <div id="searchResults"></div>
  </div></section>`;
  $('#searchInput').addEventListener('input', () => {
    const t = $('#searchInput').value.trim();
    if (!t) { $('#searchResults').innerHTML = suggestionsHTML(); $('#acWrap').innerHTML = ''; return; }
    autocomplete(t); doSearch(t);
  });
  $('#searchResults').innerHTML = suggestionsHTML();
}
function suggestionsHTML() {
  const blooms = ['floral', 'rose', 'peacock', 'arabic', 'mandala', 'paisley', 'sleeve', 'bridal', 'kids'];
  return `
    <div class="section-head"><span class="eyebrow">Discover</span><h2>Popular searches</h2></div>
    <div class="chips" style="gap:10px">${blooms.map(b => `<span class="chip" data-pop="${b}">${b}</span>`).join('')}</div>
    <div class="grid" style="margin-top:30px">${PRODUCTS.filter(p => p.status !== 'disabled' && p.featured).slice(0, 4).map(productCard).join('')}</div>`;
}
function autocomplete(t) {
  const hits = PRODUCTS.filter(p => (p.name + ' ' + (p.tags || []).join(' ') + ' ' + p.cat + ' ' + p.code).toLowerCase().includes(t.toLowerCase())).slice(0, 6);
  $('#acWrap').innerHTML = hits.length ? `<div class="form-card" style="position:absolute;top:8px;left:0;right:0;z-index:40;padding:10px;box-shadow:var(--shadow-lg)">
    ${hits.map(p2 => `<a href="#/design/${p2.slug}" style="display:flex;align-items:center;gap:12px;padding:8px;border-radius:10px">
      <span style="width:44px;height:44px;border-radius:8px;overflow:hidden;background:var(--cream);display:grid;place-items:center">${MP.motifArtwork(p2, 'cream', 44, { code: false })}</span>
      <span><b style="font-size:.9rem">${esc(p2.name)}</b><br><span class="note">${esc(catName(p2.cat))} · ${p2.free ? 'FREE' : INR(money(p2))}</span></span>
    </a>`).join('')}
  </div>` : '';
}
function doSearch(t) {
  const tl = t.toLowerCase();
  const found = PRODUCTS.filter(p => p.status !== 'disabled' && (p.name + ' ' + (p.tags || []).join(' ') + ' ' + p.cat + ' ' + p.code).toLowerCase().includes(tl)).slice(0, 12);
  $('#searchResults').innerHTML = found.length
    ? `<div class="toolbar"><span class="count">${found.length} results for “${esc(t)}”</span></div><div class="grid">${found.map(productCard).join('')}</div>`
    : emptyState('No designs found', 'Try a different keyword, like “floral” or “sleeve”.');
  bindCards();
}

/* ---------------- WISHLIST ---------------- */
function renderWishlist() {
  const items = wish.map(byId).filter(Boolean);
  $('#app').innerHTML = `
  ${pageHead('Wishlist', 'Your embroidery collection is taking shape.')}
  <section class="section"><div class="container">
    ${items.length ? `<div class="toolbar"><span class="count">${items.length} saved design${items.length === 1 ? '' : 's'}</span>
      <button class="btn btn-ghost btn-sm" id="clearWish">Clear all</button></div>
      <div class="grid">${items.map(productCard).join('')}</div>`
    : `<div class="empty"><div class="art">${MP.motifArtwork({ code: '', motif: 'floral', hue1: 'gold', hue2: 'maroon' }, 'black', 420, { code: false })}</div>
        <h2>Your embroidery collection is waiting</h2><p>Tap the heart on any design to save it here for later.</p>
        <a class="btn btn-gold" href="#/shop">Browse Designs</a></div>`}
  </div></section>`;
  $('#clearWish')?.addEventListener('click', () => { wish = []; saveWish(); renderWishlist(); toast('Wishlist cleared', 'check'); });
  bindCards();
}

/* ---------------- CART ---------------- */
function renderCart() {
  const rows = cart.map(i => ({ ...i, p: byId(i.id) })).filter(r => r.p);
  const sub = cartTotal();
  const discAmt = applyCoupon(sub);
  const total = Math.max(0, sub - discAmt);
  $('#app').innerHTML = `
  ${pageHead('Your Cart', 'Everything you need for your next masterpiece.')}
  <section class="section"><div class="container">
    ${rows.length ? `
    <div class="cart-layout">
      <div>
        ${rows.map(r => `
        <div class="cart-item reveal in">
          <a class="ci-thumb" href="#/design/${r.p.slug}"><span class="art">${MP.motifArtwork(r.p, 'cream', 96, { code: false })}</span></a>
          <div>
            <span class="ci-cat">${esc(catName(r.p.cat))}</span>
            <h3><a href="#/design/${r.p.slug}">${esc(r.p.name)}</a></h3>
            <div class="ci-specs">${fmt(r.p.stitches)} st · ${r.p.w} × ${r.p.h} mm · ${(r.p.formats || []).join(', ')}</div>
            <div class="ci-actions">
              <button data-wish="${r.p.id}">♡ Wishlist</button>
              <button data-remove="${r.p.id}">Remove</button>
            </div>
          </div>
          <div class="ci-side">
            <span class="ci-price">${r.p.free ? 'FREE' : INR(money(r.p))}</span>
            <div class="qty" style="height:36px"><button data-qm="${r.id}">−</button><span>${r.qty}</span><button data-qp="${r.id}">+</button></div>
          </div>
        </div>`).join('')}
        <div style="display:flex;justify-content:space-between;margin-top:18px;flex-wrap:wrap;gap:12px">
          <a class="btn btn-ghost" href="#/shop">← Continue shopping</a>
          <a class="btn btn-gold" href="#/checkout">Proceed to Checkout →</a>
        </div>
      </div>
      <div>
        <div class="summary">
          <h3>Order Summary</h3>
          <div class="row"><span>Subtotal</span><b>${INR(sub)}</b></div>
          <div class="row"><span>Discount</span><b class="${discAmt ? 'disc' : ''}">${discAmt ? '− ' + INR(discAmt) : '—'}</b></div>
          <div class="coupon">
            <input id="couponIn" placeholder="Enter coupon code" value="${esc(couponCode() || '')}">
            <button id="couponBtn">Apply</button>
          </div>
          <div class="note" style="color:#8b8374;margin-top:8px">${couponLabel() || 'Try LAXMI10, WELCOME99 or FESTIVE.'}</div>
          <div class="row tot"><span>Total</span><b>${INR(total)}</b></div>
          <a class="btn btn-gold btn-block" href="#/checkout" style="margin-top:18px">Proceed to Checkout</a>
          <div class="note" style="text-align:center;margin-top:12px;color:#8b8374">Secure 128-bit checkout</div>
        </div>
      </div>
    </div>` : `
    <div class="empty"><div class="art">${MP.motifArtwork({ code: '', motif: 'butta', hue1: 'gold', hue2: 'maroon' }, 'cream', 420, { code: false })}</div>
      <h2>Your next masterpiece starts here</h2><p>Your cart is empty — add a preferred design and begin.</p>
      <a class="btn btn-gold" href="#/shop">Explore Designs</a></div>`}
  </div></section>`;

  $$('[data-remove]').forEach(b => b.onclick = () => { cart = cart.filter(i => i.id !== +b.dataset.remove); saveCart(); renderCart(); toast('Removed from cart', 'cart'); });
  $$('[data-qm]').forEach(b => b.onclick = () => { const it = cart.find(i => i.id === +b.dataset.qm); if (it.qty > 1) { it.qty--; saveCart(); renderCart(); } });
  $$('[data-qp]').forEach(b => b.onclick = () => { const it = cart.find(i => i.id === +b.dataset.qp); it.qty++; saveCart(); renderCart(); });
  $('#couponBtn')?.addEventListener('click', () => {
    applyCoupon(cartTotal(), $('#couponIn').value.trim().toUpperCase(), true);
    renderCart();
  });
  bindCards();
}

/* ---------------- Coupons ---------------- */
const activeCoupon = { code: null };
function couponCode() { return activeCoupon.code; }
function couponLabel() {
  const c = COUPONS.concat(LS.get(US.COUPONS, [])).find(c => c.code === activeCoupon.code);
  return c ? `Applied ${c.code} — ${c.label}.` : '';
}
function applyCoupon(base, code, save) {
  const entries = COUPONS.concat(LS.get(US.COUPONS, []));
  if (code) {
    const c = entries.find(x => x.code.toLowerCase() === code.toLowerCase());
    if (!c || (c.min && base < c.min)) { activeCoupon.code = null; toast('Invalid coupon for this total', 'info'); return 0; }
    activeCoupon.code = c.code; if (save) toast(`Coupon ${c.code} applied`, 'check');
  }
  const active = entries.find(c => c.code === activeCoupon.code);
  if (!active) return 0;
  const d = active.pct ? Math.round(base * active.pct / 100) : (active.fixed ?? 0);
  return Math.min(d, active.max ?? d);
}

/* ---------------- CHECKOUT ---------------- */
function renderCheckout() {
  const rows = cart.map(i => ({ ...i, p: byId(i.id) })).filter(r => r.p);
  if (!rows.length) { location.hash = '#/cart'; return; }
  const paywallUp = paywallActive();
  const sub = cartTotal(), disc = applyCoupon(sub), total = Math.max(0, sub - disc);
  const me = currentUser();
  $('#app').innerHTML = `
  ${pageHead('Checkout', 'Secure and effortless. Your files unlock the moment payment completes.')}
  <section class="section"><div class="container">
    <div class="cart-layout">
      <div>
        <form id="coForm">
          <div class="form-card" style="margin-bottom:22px">
            <h2 style="margin-bottom:18px">1 · Customer Details</h2>
            <div class="form-2col">
              <div class="field"><label>Full name *</label><input name="name" required value="${esc(me?.name || '')}" placeholder="Your name"></div>
              <div class="field"><label>Email *</label><input name="email" type="email" required value="${esc(me?.email || '')}" placeholder="you@email.com"></div>
              <div class="field"><label>Phone *</label><input name="phone" required value="${esc(me?.phone || '')}" placeholder="+91 XXXXX XXXXX"></div>
              <div class="field"><label>City</label><input name="city" placeholder="City"></div>
            </div>
          </div>
          <div class="form-card" style="margin-bottom:22px">
            <h2 style="margin-bottom:18px">2 · Payment</h2>
            ${paywallUp?'<div class="pw-banner">🛡 Payment wall active — files unlock once payment is confirmed.</div>':''}
            <label style="display:flex;align-items:center;gap:10px;font-weight:600;margin-bottom:14px;cursor:pointer">
              <input type="radio" name="pay" value="cod" checked> Pay on delivery (UPI / Cash)
            </label>
            ${paywallUp?'':`<label style="display:flex;align-items:center;gap:10px;font-weight:600;margin-bottom:14px;cursor:pointer">
              <input type="radio" name="pay" value="online"> Online — UPI / Card (instant files)
            </label>`}
            <label style="display:flex;align-items:center;gap:10px;font-weight:600;cursor:pointer">
              <input type="radio" name="pay" value="upi"> UPI — pay to <b style="color:var(--gold)">${esc(settings.upiId)}</b>
            </label>
            ${paywallUp?`<div class="pw-box">
              <div class="pw-qr">${payQrBlock(total, 'LAXMI-ONLINE')}</div>
              <div class="pw-title">${esc(settings.payeeName || 'LAXMI EMBROIDERY')} · <span style="color:var(--gold)">${esc(settings.upiId)}</span></div>
              <div class="pw-sub">Scan with <b>Google Pay / PhonePe / Paytm</b> — or pay <b style="color:var(--maroon)">${INR(total)}</b> to the UPI ID above. Your download links unlock the moment you confirm.</div>
              <div class="pw-note">${esc(settings.payNote)}</div>
            </div>`:''}
            <div class="note" style="margin-top:12px">${paywallUp?'Payments are simulated for this demo — confirmation instantly marks the order paid and grants your files.':'Digital Downloads are simulated in this demo — files are granted to your account immediately after checkout.'}</div>
          </div>
          <div class="form-card">
            <h2 style="margin-bottom:8px">3 · Review &amp; Place</h2>
            ${rows.map(r => `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:9px 0;border-bottom:1px solid var(--border);font-size:.9rem">
              <span>${esc(r.p.name)} × ${r.qty}</span><b>${r.p.free ? 'FREE' : INR(money(r.p) * r.qty)}</b>
            </div>`).join('')}
            <div style="display:flex;justify-content:space-between;font-weight:800;padding:14px 0 4px;font-size:1.05rem">
              <span>Total</span><span style="color:var(--maroon);font-family:var(--serif);font-size:1.3rem">${INR(total)}</span>
            </div>
            <button class="btn btn-gold btn-block" type="submit" style="margin-top:2px">Complete Purchase · ${INR(total)}</button>
          </div>
        </form>
      </div>
      <div>
        <div class="summary">
          <h3>Order Summary</h3>
          ${rows.map(r => `<div class="row"><span>${esc(r.p.name)} × ${r.qty}</span><b>${r.p.free ? 'FREE' : INR(money(r.p) * r.qty)}</b></div>`).join('')}
          <div class="row"><span>Subtotal</span><b>${INR(sub)}</b></div>
          <div class="row"><span>Discount</span><b class="${disc ? 'disc' : ''}">${disc ? '− ' + INR(disc) : '—'}</b></div>
          <div class="row tot"><span>Total</span><b>${INR(total)}</b></div>
          <div class="note" style="text-align:center;color:#8b8374;margin-top:14px">Files available instantly in<br><b style="color:#e5c76b">My Downloads</b> after purchase</div>
        </div>
      </div>
    </div>
  </div></section>`;

  $('#coForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const order = {
      id: 'LEM-' + (1000 + Math.floor(Math.random() * 9000)),
      date: new Date().toISOString().slice(0, 10),
      customer: { name: fd.get('name'), email: fd.get('email'), phone: fd.get('phone'), city: fd.get('city') },
      items: rows.map(r => ({ id: r.p.id, name: r.p.name, qty: r.qty, price: money(r.p), formats: r.p.formats })),
      sub, disc, total, pay: fd.get('pay'), status: 'Paid', user: fd.get('email'), wall: paywallUp
    };
    if (paywallUp && fd.get('pay') === 'upi') { showPaymentWall(order); return; }
    finalizeOrder(order);
  });
}

function paywallActive() {
  return !!(settings.paywallOn && settings.payMode && settings.payMode !== 'demo');
}
function upiUri(amount, ref) {
  return 'upi://pay?pa=' + encodeURIComponent(settings.upiId) + '&pn=' + encodeURIComponent(settings.payeeName || 'LAXMI EMBROIDERY') +
    '&am=' + (Number(amount || 0).toFixed(2)) + '&cu=INR&tn=' + encodeURIComponent(ref || 'LAXMI EMBROIDERY');
}
function upiQR(amount, ref) {
  try {
    const qr = qrcode(0, 'M');
    qr.addData(upiUri(amount, ref));
    qr.make();
    return qr.createSvgTag(3, 2);
  } catch (e) {
    return `<div class="pw-qr-fallback">${esc(upiUri(amount, ref))}</div>`;
  }
}
function payQrBlock(amount, ref) {
  if (settings.payQR) return `<img class="pw-qr-img" src="${settings.payQR}" alt="Scan to pay LAXMI EMBROIDERY">`;
  return upiQR(amount, ref);
}
function renderAnnounce() {
  const el = $('#announceBar');
  if (!el) return;
  const t = (settings.announcement || '').trim();
  el.hidden = !t;
  if (t) el.textContent = t;
}
function finalizeOrder(order) {
  const orders = LS.get(US.ORDERS, []);
  orders.push(order); LS.set(US.ORDERS, orders);
  const dls = LS.get(US.DOWNLOADS, []);
  order.items.forEach(r => { if (!dls.some(d => d.order === order.id && d.id === r.id)) dls.push({ order: order.id, id: r.id, name: r.name, date: order.date, formats: r.formats }); });
  LS.set(US.DOWNLOADS, dls);
  LS.set(US.AUTH, { name: order.customer.name, email: order.customer.email, phone: order.customer.phone, joined: new Date().toISOString().slice(0, 10), guest: false });
  cart = []; saveCart(); activeCoupon.code = null;
  location.hash = '#/success?order=' + encodeURIComponent(order.id);
}
function showPaymentWall(order) {
  openModal(`<div class="pw-wall">
    <div class="pw-logo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9h18"/><path d="M8 13h3"/></svg></div>
    <div class="m-title" style="text-align:center">Pay to unlock your files</div>
    <p style="text-align:center;color:var(--muted);font-size:.9rem">Order <b>${order.id}</b> · ${INR(order.total)}</p>
    <div class="pw-box" style="text-align:center">
      <div class="pw-qr" style="justify-content:center;display:flex">${payQrBlock(order.total, order.id)}</div>
      <div class="pw-title">${esc(settings.payeeName || 'LAXMI EMBROIDERY')} · ${esc(settings.upiId)}</div>
      <div class="pw-sub">Scan with <b>Google Pay / PhonePe / Paytm</b> — or enter this UPI ID in any UPI app and pay <b style="color:var(--gold)">${INR(order.total)}</b>. Your files unlock immediately after confirmation.</div>
    </div>
    <div class="pw-note" style="text-align:center">${esc(settings.payNote)}</div>
    <div style="display:flex;gap:10px;margin-top:22px;justify-content:center;flex-wrap:wrap">
      <button class="btn btn-gold" id="pwConfirm">✓ I have paid — unlock my files</button>
      <button class="btn btn-ghost" data-close-modal="">Not yet</button>
    </div>
  </div>`);
  $('#pwConfirm').onclick = () => { closeModal(); finalizeOrder(order); };
}

/* ---------------- SUCCESS ---------------- */
function renderSuccess(q) {
  const id = (q && q.get('order')) || '';
  const order = LS.get(US.ORDERS, []).find(o => o.id === id);
  const me = currentUser();
  if (!me) LS.set(US.AUTH, { name: order?.customer?.name || 'Customer', email: order?.customer?.email || '', phone: order?.customer?.phone || '', guest: true });
  updateBadges();
  $('#app').innerHTML = `
  <div class="success-wrap reveal in">
    <div class="stitch-check">
      <div class="ring"></div>
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#e5c76b" stroke-width="2" stroke-dasharray="6 4" opacity=".6"/>
        <path class="tick" d="M 30 52 L 45 66 L 72 38"/>
      </svg>
      ${confetti()}
    </div>
    <h1 style="font-size:clamp(2rem,4vw,2.8rem)">Order Confirmed</h1>
    <p style="color:var(--muted);max-width:420px;margin:12px auto 6px">Your embroidery files are ready.</p>
    <p style="font-size:.9rem;color:var(--muted)">${order ? 'Order ' + order.id + ' · ' + order.items.length + ' design' + (order.items.length === 1 ? '' : 's') + ' · ' + INR(order.total) : ''}</p>
    <div style="display:flex;gap:14px;justify-content:center;margin-top:30px;flex-wrap:wrap">
      <a class="btn btn-gold" href="#/downloads">Download Designs</a>
      <a class="btn btn-ghost" href="#/orders">View Orders</a>
      <a class="btn btn-outline" href="#/shop">Keep Browsing</a>
    </div>
  </div>`;
}
function confetti() {
  return Array.from({ length: 14 }, (_, i) => {
    const a = i * 26 * Math.PI / 180 + (i % 2 ? 0.3 : 0);
    const x = 50 + Math.cos(a) * 46, y = 50 + Math.sin(a) * 46;
    const c = ['#e5c76b', '#c9a227', '#8b1a1a', '#8b8374'][i % 4];
    return `<span class="confetti" style="left:${x}%;top:${y}%;background:${c};animation-delay:${(1 + i * 0.05).toFixed(2)}s"></span>`;
  }).join('');
}

/* ---------------- ACCOUNT / AUTH ---------------- */
function renderAuth(mode) {
  const isLogin = mode === 'login';
  $('#app').innerHTML = `
  <section class="section"><div class="container">
    <div class="auth-wrap reveal in">
      <div class="auth-visual">
        <div class="art">${MP.motifArtwork({ code: '', motif: 'bridal', hue1: 'gold', hue2: 'maroon' }, 'black', 520, { code: false })}</div>
        <div class="q"><b>“Every stitch tells a story.”</b><p>Sign in to view your downloads, orders and wishlist across all devices.</p></div>
      </div>
      <div class="auth-form">
        <h2>${isLogin ? 'Welcome back' : 'Create your account'}</h2>
        <p class="sub">${isLogin ? 'Sign in to access your embroidery library.' : 'Join thousands of creators and download instantly.'}</p>
        <form id="authForm">
          ${isLogin ? '' : `<div class="field"><label>Full name</label><input name="name" required placeholder="Your name"></div>`}
          <div class="field"><label>Email</label><input name="email" type="email" required placeholder="you@email.com"></div>
          <div class="field"><label>Password</label><input name="pass" type="password" required placeholder="••••••••"></div>
          <button class="btn btn-gold btn-block" type="submit">${isLogin ? 'Sign In' : 'Create Account'}</button>
        </form>
        <div class="auth-switch">${isLogin ? `New here? <a href="#/register">Create an account</a>` : `Already have an account? <a href="#/login">Sign in</a>`}</div>
        <div class="note" style="text-align:center;margin-top:20px">Demo — any email works. Admin: <a href="admin.html" style="color:var(--gold)">open dashboard</a>.</div>
      </div>
    </div>
  </div></section>`;
  $('#authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get('name') || 'Customer', email = fd.get('email');
    LS.set(US.AUTH, { name, email, phone: '', joined: new Date().toISOString().slice(0, 10), guest: false });
    toast(isLogin ? 'Welcome back, ' + name : 'Account created', 'check');
    location.hash = '#/account';
  });
}
function renderAccount() {
  const me = currentUser();
  if (!me) { renderAuth('login'); return; }
  const orders = LS.get(US.ORDERS, []).filter(o => !o.user || o.user === me.email || o.customer?.email === me.email);
  const spent = orders.reduce((s, o) => s + (o.total || 0), 0);
  const dls = LS.get(US.DOWNLOADS, []).filter(d => !me.email || orders.some(o => o.id === d.order));
  $('#app').innerHTML = `
  ${pageHead('My Account', me ? `Welcome back, ${esc(me.name)}` : 'Welcome back')}
  <section class="section"><div class="container">
    <div class="acc-layout">
      <aside class="acc-nav">
        <div class="me">
          <div class="avi">${esc((me.name || 'L')[0])}</div>
          <div><b>${esc(me.name || 'Guest')}</b><div class="note">${esc(me.email || 'Guest session')}</div></div>
        </div>
        <a href="#/account"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 13h6V4H4ZM14 4v6h6V4ZM4 20h6v-6H4ZM14 20h6v-6h-6"/></svg>Dashboard</a>
        <a href="#/downloads"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>My Downloads</a>
        <a href="#/orders"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm0 4h18M7 3v4M17 3v4"/></svg>My Orders</a>
        <a href="#/wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.8l-1-1.2a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8Z"/></svg>Wishlist</a>
        <a href="#/cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6h15l-1.5 9h-12L5 3H2"/></svg>Cart</a>
        <a href="#!" id="logout" style="color:var(--maroon)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>Sign Out</a>
      </aside>
      <div>
        <div class="acc-cards">
          ${[['Orders', orders.length], ['Downloads', dls.length], ['Wishlist', wish.length], ['Total Spent', INR(spent)]].map(([t, n]) => `<div class="acc-card reveal in"><div class="n">${typeof n === 'number' ? n : n}</div><div class="t">${t}</div></div>`).join('')}
        </div>
        <div class="section-head" style="margin-bottom:20px"><span class="eyebrow">Recent</span><h2 style="font-size:1.4rem">Recent purchases</h2></div>
        ${orders.length ? `<div class="table-wrap"><table class="orders">
          <tr><th>Order</th><th>Date</th><th>Items</th><th>Total</th><th>Status</th><th></th></tr>
          ${orders.slice(-5).reverse().map(o => `<tr>
            <td><b>${o.id}</b></td><td>${o.date}</td><td>${esc(o.items.map(i => i.name).join(', ').slice(0, 38))}${o.items.length > 1 ? '…' : ''}</td>
            <td>${INR(o.total)}</td><td><span class="pill done">${o.status}</span></td>
            <td><a href="#/downloads" class="btn btn-gold btn-sm">Download</a></td>
          </tr>`).join('')}
        </table></div>` : `<p class="muted">No orders yet — <a href="#/shop" style="color:var(--gold)">start shopping</a>.</p>`}
      </div>
    </div>
  </div></section>`;
  $('#logout')?.addEventListener('click', (e) => { e.preventDefault(); LS.set(US.AUTH, null); toast('Signed out', 'info'); location.hash = '#/'; });
}

/* ---------------- DOWNLOADS / ORDERS ---------------- */
function downloadFile(p, fmt) {
  if (!p) { toast('File unavailable', 'info'); return; }
  const code = designCode(p);
  const name = `${code}_${p.slug}_${fmt}.${fmt.toLowerCase()}`;
  let content = '';
  if (fmt === 'DST') {
    content = ['LA:LAXMI EMBROIDERY', 'ST:96', 'CO:1', '++X:' + (p.w * 10), '++Y:' + (p.h * 10), '+X:0', '+Y:0', '~CS', '00 00 00']
      .concat(Array(48).fill('21 00 00 00 00 03'), ['00 00 00', '11 00 00 00 00 F3']).join('\r\n');
  } else {
    content = `LAXMI EMBROIDERY ${code}\n${p.name}\n${p.w} x ${p.h} mm\n${p.stitches} stitches\n${p.colors} colors\nPlaceholder ${fmt} package for ${p.code}\nLAXMI EMBROIDERY 98654 14464`;
  }
  const blob = new Blob([content], { type: 'application/octet-stream' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  toast(fmt + ' file downloading…', 'download');
}
function renderDownloads() {
  const me = currentUser();
  let dls = LS.get(US.DOWNLOADS, []);
  if (me && me.email) {
    const myOrders = LS.get(US.ORDERS, []).filter(o => o.user === me.email).map(o => o.id);
    dls = dls.filter(d => myOrders.includes(d.order));
  }
  const orders = LS.get(US.ORDERS, []).length;
  $('#app').innerHTML = `
  ${pageHead('My Downloads', 'Every design you own, ready to download again — forever.')}
  <section class="section"><div class="container">
    ${dls.length ? `
    <div class="table-wrap"><table class="orders">
      <tr><th>Design</th><th>Order</th><th>Purchase date</th><th>Stitches</th><th>Available formats</th><th></th></tr>
      ${dls.map(d => { const p = byId(d.id); if (!p) return ''; return `
        <tr>
          <td><div style="display:flex;align-items:center;gap:12px"><span style="width:52px;height:52px;border-radius:10px;overflow:hidden;background:var(--cream);display:grid;place-items:center">${MP.motifArtwork(p, 'cream', 52, { code: false })}</span><b>${esc(p.name)}</b></div></td>
          <td>${d.order}</td><td>${d.date}</td><td>${fmt(p.stitches)}</td>
          <td><div class="formats">${(p.formats || []).map(f => `<i>${f}</i>`).join('')}</div></td>
          <td><a class="btn btn-gold btn-sm" href="#" data-dl="${p.slug}">Download</a></td>
        </tr>`; }).join('')}
    </table></div>
    <div class="note" style="margin-top:16px">${me ? 'Your downloads are linked to your account' : 'Your downloads are stored on this device'} · ${orders} orders · Unlimited re-downloads · License: personal &amp; small-batch commercial embroidery.</div>`
    : `
    <div class="empty"><div class="art">${MP.motifArtwork({ code: '', motif: 'mandala', hue1: 'gold', hue2: 'maroon' }, 'cream', 420, { code: false })}</div>
      <h2>Your purchased designs will appear here</h2><p>Complete a checkout and your files unlock instantly. Downloads never expire.</p>
      <a class="btn btn-gold" href="#/shop">Find a design</a></div>`}
  </div></section>`;
  $$('[data-dl]').forEach(a => a.onclick = (e) => {
    e.preventDefault();
    const p = bySlug(a.dataset.dl); if (!p) return toast('File unavailable', 'info');
    (p.formats || ['DST']).forEach(f => setTimeout(() => downloadFile(p, f), 200));
    setTimeout(() => toast('All formats downloading', 'download'), 1200);
  });
}
function renderOrders() {
  const me = currentUser();
  const orders = LS.get(US.ORDERS, []).filter(o => !me?.email || o.user === me.email || o.customer?.email === me.email).reverse();
  $('#app').innerHTML = `
  ${pageHead('My Orders', 'Track every purchase and download.')}
  <section class="section"><div class="container">
    ${orders.length ? `<div class="table-wrap"><table class="orders">
      <tr><th>Order ID</th><th>Date</th><th>Items</th><th>Payment</th><th>Status</th><th>Total</th><th></th></tr>
      ${orders.map(o => `<tr>
        <td><b>${o.id}</b></td><td>${o.date}</td>
        <td>${o.items.map(i => `<div>${esc(i.name)} × ${i.qty}</div>`).join('')}</td>
        <td><span class="pill ${o.pay === 'online' ? 'info' : 'pending'}">${o.pay === 'online' ? 'Online' : 'Pay on Delivery'}</span></td>
        <td><span class="pill done">${o.status}</span></td>
        <td><b>${INR(o.total)}</b></td>
        <td><a class="btn btn-gold btn-sm" href="#/downloads">Download</a></td>
      </tr>`).join('')}
    </table></div>`
    : `<div class="empty"><div class="art">${MP.motifArtwork({ code: '', motif: 'leaf', hue1: 'green', hue2: 'gold' }, 'cream', 420, { code: false })}</div>
      <h2>No orders yet</h2><p>When you complete a checkout, your orders will appear here.</p>
      <a class="btn btn-gold" href="#/shop">Start shopping</a></div>`}
  </div></section>`;
}

/* ---------------- STATIC PAGES ---------------- */
function renderPage(page) {
  const PAGES = {
    about: {
      title: 'About LAXMI EMBROIDERY', sub: 'A family studio, a digital future, and 30 years of stitching craft.',
      body: `
      <div class="grid" style="grid-template-columns:1fr 1fr;gap:30px">
        <div class="form-card">
          <span class="eyebrow">Our story</span><h2 style="font-size:1.6rem;margin-bottom:14px">From needles to machines to now — the cloud.</h2>
          <p style="color:#555">What began as a small tailoring room in Chennai has grown into a full embroidery studio partnering with boutique houses across India. We digitise designs the way good embroidery demands: density that lays flat, transitions that never lump, and shapes that hold up wash after wash.</p>
          <p style="color:#555;margin-top:14px">Today our library travels to machines everywhere — home Brother and Singer units, and industrial machines stitching thousands of sarees a month.</p>
          <p style="color:#555;margin-top:14px;font-family:var(--serif);font-style:italic;color:var(--gold)">“If the fabric is the canvas, thread is the paint — and we paint in DST.”</p>
        </div>
        <div class="form-card" style="background:var(--black);color:#c5bfb0;border:none">
          <h2 style="color:#fff;margin-bottom:20px">By the numbers</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:22px">
            ${[['800+', 'Designs'], ['9,600+', 'Customers'], ['1.2 Cr+', 'Stitches digitised'], ['4.9★', 'Average rating']].map(([n, t]) => `<div style="text-align:center;padding:20px 0;border:1px solid rgba(201,162,39,.25);border-radius:14px"><div style="font-family:var(--serif);font-size:1.8rem;color:var(--gold-hi)">${n}</div><div style="font-size:.76rem;text-transform:uppercase;letter-spacing:.1em;margin-top:6px">${t}</div></div>`).join('')}
          </div>
        </div>
      </div>`
    },
    contact: {
      title: 'Contact Us', sub: 'Questions, custom digitising, or bulk licenses — we reply fast.',
      body: `
      <div class="grid" style="grid-template-columns:1fr 1.3fr;gap:30px">
        <div>
          <div class="form-card" style="margin-bottom:20px">
            <h2 style="margin-bottom:16px">Reach us directly</h2>
            <div style="display:grid;gap:12px">
              <a href="https://wa.me/${settings.whatsapp}" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:14px;padding:14px;border:1px solid var(--border);border-radius:14px"><span style="width:42px;height:42px;border-radius:50%;background:var(--gold-soft);display:grid;place-items:center;color:var(--gold);font-weight:800">W</span><span><b>WhatsApp</b><div style="font-size:.84rem;color:var(--muted)">+91 ${settings.phone} · Fastest reply</div></span></a>
              <a href="mailto:${settings.email}" style="display:flex;align-items:center;gap:14px;padding:14px;border:1px solid var(--border);border-radius:14px"><span style="width:42px;height:42px;border-radius:50%;background:var(--gold-soft);display:grid;place-items:center;color:var(--gold);font-weight:800">@</span><span><b>Email</b><div style="font-size:.84rem;color:var(--muted)">${settings.email} · Within 24 hours</div></span></a>
              <div style="display:flex;align-items:center;gap:14px;padding:14px;border:1px solid var(--border);border-radius:14px"><span style="width:42px;height:42px;border-radius:50%;background:var(--gold-soft);display:grid;place-items:center;color:var(--gold);font-weight:800">⚲</span><span><b>Studio</b><div style="font-size:.84rem;color:var(--muted)">Chennai, India · By appointment</div></span></div>
            </div>
          </div>
        </div>
        <form class="form-card" id="contactForm">
          <h2 style="margin-bottom:18px">Send a message</h2>
          <div class="form-2col">
            <div class="field"><label>Name *</label><input required placeholder="Your name"></div>
            <div class="field"><label>WhatsApp number</label><input placeholder="+91…"></div>
          </div>
          <div class="field"><label>Subject</label><select><option>Design enquiry</option><option>Custom digitising</option><option>Bulk / business license</option><option>Technical help</option></select></div>
          <div class="field"><label>Message *</label><textarea rows="5" required placeholder="Tell us how we can help…"></textarea></div>
          <button class="btn btn-gold btn-block" type="submit">Send Message</button>
        </form>
      </div>`
    },
    faq: {
      title: 'Frequently Asked Questions', sub: 'Everything you need to know about buying and using our digital designs.',
      body: `
      <div class="grid" style="grid-template-columns:1.4fr 1fr;gap:30px;align-items:start">
        <div>
          ${
            [['What file formats do I get?', 'Every design includes DST, PES, JEF and EXP in one package — compatible with virtually all commercial and home embroidery machines. Some designs also include VP3, HUS and XXX.'],
            ['How do I receive my files after purchase?', 'Instantly. The moment payment completes you are taken to a confirmation screen with a Download button. Files are also stored permanently in your account under My Downloads — you can re-download anytime.'],
            ['Can I resize the design?', 'Yes. Designs are provided at the listed size, but you can scale them in your embroidery software. We recommend not enlarging beyond 110–120% to preserve stitch density.'],
            ['What is the license?', 'Each purchase includes a basic license for personal use and small-batch commercial embroidery (up to 100 pieces). For large-scale production or distribution of the files, contact us for a bulk license.'],
            ['Can I see the design before buying?', 'Absolutely. Every product page has an interactive preview where you can zoom, rotate and even switch fabric colours to see exactly how the embroidery will look.'],
            ['What machines are compatible?', 'Our files work with Brother, Janome, Singer, Husqvarna, Bernina, Tajima, Barudan, Happy and most other machines. If you use a format we don’t list, message us and we will help.'],
            ['Do you do custom digitising?', 'Yes. Send us a sketch or picture on WhatsApp and our digitising team will quote within 24 hours — usually ₹299–₹999 depending on complexity.']
            ].map(([q, a]) => `
            <div class="faq-item"><button class="faq-q">${q}<span class="icon">+</span></button>
              <div class="faq-a"><p>${a}</p></div>
            </div>`).join('')
          }
        </div>
        <div>
          <div class="form-card" style="position:sticky;top:96px">
            <h2 style="margin-bottom:12px">Still have questions?</h2>
            <p class="muted" style="font-size:.9rem;margin-bottom:18px">Our team typically replies within a few hours on WhatsApp.</p>
            <a class="btn btn-gold btn-block" href="https://wa.me/${settings.whatsapp}" target="_blank" rel="noopener">Chat on WhatsApp</a>
            <a class="btn btn-ghost btn-block" href="#/contact" style="margin-top:10px">Contact page</a>
          </div>
        </div>
      </div>`
    }
  };
  const P = PAGES[page] || PAGES.about;
  $('#app').innerHTML = `${pageHead(P.title, P.sub)}<section class="section"><div class="container">${P.body}</div></section>`;
  $('#contactForm')?.addEventListener('submit', (e) => { e.preventDefault(); toast('Message sent — we\'ll reply soon!', 'check'); e.target.reset(); });
  $$('.faq-q').forEach(q => q.onclick = () => { const item = q.closest('.faq-item'); const open = item.classList.contains('open'); $$('.faq-item').forEach(i => i.classList.remove('open')); if (!open) item.classList.add('open'); });
  observeReveals();
}

/* ---------------- Init ---------------- */
bindBurger();
updateBadges();
renderAnnounce();
document.addEventListener('click', (e) => {
  const pop = e.target.closest('[data-pop]');
  if (pop) { doSearch(pop.dataset.pop); $('#searchInput').value = pop.dataset.pop; $('#acWrap').innerHTML = ''; }
  if (e.target.closest('[data-close-modal]')) closeModal();
});
window.addEventListener('hashchange', router);
router();