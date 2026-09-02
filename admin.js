/* =====================================================================
   LAXMI EMBROIDERY — ADMIN CONTROL CENTER (SPA)
   Hash-routed, localStorage-backed. Shares laxmi_* keys with market.js.
   Demo auth: any credentials work.
   ===================================================================== */
'use strict';

/* ---------------- Storage ---------------- */
const LS = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
  del(k) { localStorage.removeItem(k); }
};
const K = {
  PRODUCTS: 'laxmi_products', ORDERS: 'laxmi_orders', AUTH: 'laxmi_auth',
  DOWNLOADS: 'laxmi_dl', COUPONS: 'laxmi_coupons', SETTINGS: 'laxmi_settings',
  CATS: 'laxmi_categories', COLLS: 'laxmi_collections', ADMIN: 'laxmi_admin'
};

const settings = Object.assign({ phone: '9865414464', email: 'laxmiembroidery@gmail.com', code: 'LE409', whatsapp: '919865414464', name: 'LAXMI EMBROIDERY', tag: 'Premium Digital Embroidery Designs', heroBadge: '✦ Premium Digitised Embroidery · Instant Download', heroTitle: 'Premium Machine <em>Embroidery</em> Designs', heroSub: 'Beautifully digitized designs for embroidery machines, creators and embroidery professionals. Crafted stitch by stitch, delivered instantly.', address: 'Chennai, Tamil Nadu, India', announcement: '', paywallOn: false, payMode: 'demo', upiId: 'laxmiembroidery@upi', payeeName: 'LAXMI EMBROIDERY', payNote: 'Scan the QR or pay via any UPI app, then confirm.', payQR: null, payQRName: '' }, LS.get(K.SETTINGS, {}));

const CATEGORIES = LS.get(K.CATS, []);
const COLLECTIONS = LS.get(K.COLLS, []);

let PRODUCTS = LS.get(K.PRODUCTS, null);
if (!PRODUCTS) { PRODUCTS = seedProducts(); LS.set(K.PRODUCTS, PRODUCTS); }

function seedProducts() {
  const P = (o) => ({
    id: o.id, code: o.code, name: o.name, slug: o.slug, price: o.price, sale: o.sale ?? null,
    cat: o.cat, sub: o.sub ?? o.cat, coll: o.coll ?? [], tags: o.tags ?? [], motif: o.motif ?? 'motif',
    stitches: o.stitches, w: o.w, h: o.h, colors: o.colors, formats: o.formats ?? ['DST', 'PES', 'JEF', 'EXP'],
    hoop: o.hoop ?? '5 × 7"', rating: o.rating ?? 4.8, reviews: o.reviews ?? 12,
    desc: o.desc, suitable: o.suitable ?? ['Blouse', 'Kurti'], status: 'active',
    created: o.created ?? '2026-08-01', sales: o.sales ?? 0, featured: o.featured ?? false,
    free: o.free ?? false, hue1: o.hue1 ?? 'gold', hue2: o.hue2 ?? 'deep', media: o.media ?? []
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

const SEED_COUPONS = [
  { code:'LAXMI10', pct:10, min:500, max:150, label:'10% off orders above ₹500', def:true },
  { code:'WELCOME99', pct:0, fixed:99, min:0, max:99, label:'Flat ₹99 off your first order', def:true },
  { code:'FESTIVE', pct:15, min:799, max:300, label:'15% off festive orders above ₹799', def:true }
];

/* ---------------- Demo orders ---------------- */
const DEMO_PEOPLE = [
  { name:'Priya Sankaran', email:'priya.s@gmail.com', phone:'+91 98410 22110', city:'Chennai' },
  { name:'Anita Menon', email:'anita.m@gmail.com', phone:'+91 98940 55231', city:'Bengaluru' },
  { name:'Rukmini Krishnan', email:'rukmini.k@gmail.com', phone:'+91 90030 33441', city:'Coimbatore' },
  { name:'Divya Raman', email:'divya.r@gmail.com', phone:'+91 95000 44332', city:'Madurai' },
  { name:'Sangeetha Pavan', email:'sangeetha.p@gmail.com', phone:'+91 81240 67890', city:'Hyderabad' }
];
function seedOrders() {
  if (LS.get(K.ORDERS, null)) return;
  const now = Date.now();
  const mk = (i, ids, days, pay, status) => {
    const c = DEMO_PEOPLE[i % DEMO_PEOPLE.length];
    const items = ids.map(id => {
      const p = byId(id);
      return { id: id, name: p.name, qty: 1 + (i % 3), price: money(p), formats: p.formats };
    });
    const sub = items.reduce((s, it) => s + it.price * it.qty, 0);
    const disc = i % 3 === 0 ? Math.min(99, Math.round(sub * .1)) : 0;
    return {
      id: 'LEM-' + (2100 + i * 7), date: new Date(now - days * 864e5).toISOString().slice(0, 10),
      customer: { name: c.name, email: c.email, phone: c.phone, city: c.city },
      items: items, sub: sub, disc: disc, total: sub - disc, pay: pay, status: status, user: c.email, demo: true
    };
  };
  const orders = [
    mk(0, [1, 5], 1, 'cod', 'Paid'), mk(1, [3], 2, 'online', 'Paid'), mk(2, [7, 21], 3, 'cod', 'Paid'),
    mk(3, [10], 6, 'online', 'Paid'), mk(4, [2, 8], 8, 'cod', 'Paid'), mk(5, [4], 11, 'online', 'Refunded'),
    mk(6, [11, 13], 15, 'cod', 'Paid'), mk(7, [16], 22, 'online', 'Pending')
  ];
  LS.set(K.ORDERS, orders);
}

/* ---------------- Helpers ---------------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const INR = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');
const fmt = (n) => Number(n || 0).toLocaleString('en-IN');
const byId = (id) => PRODUCTS.find(p => String(p.id) === String(id));
const money = (p) => p.free ? 0 : (p.sale ?? p.price);
const slugify = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'design';
const catName = (id) => { const c = CATEGORIES.find(c => c.id === id); return c ? c.name : id; };
const collName = (id) => { const c = COLLECTIONS.find(c => c.id === id); return c ? c.name : id; };
const orders = () => LS.get(K.ORDERS, []);
const saveOrders = () => LS.set(K.ORDERS, orders());
const isAdmin = () => !!LS.get(K.ADMIN, null);

/* ---------------- Toast ---------------- */
function toast(msg, kind) {
  const wrap = $('#toastWrap');
  const t = document.createElement('div');
  t.className = 'toast';
  const ic = kind === 'danger'
    ? '<path d="M12 9v4m0 4h.01M10.3 3.9l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3l-8-14a2 2 0 0 0-3.4 0Z"/>'
    : '<path d="M20 6 9 17l-5-5"/>';
  t.innerHTML = `<div class="t-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">${ic}</svg></div><div>${esc(msg)}</div>`;
  wrap.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 2600);
}

/* ---------------- Modal ---------------- */
function openModal(html) {
  $('#modalBox').innerHTML = html;
  $('#modalBack').classList.add('open');
  document.body.style.overflow = 'hidden';
  bindModal();
}
function closeModal() {
  $('#modalBack').classList.remove('open');
  document.body.style.overflow = '';
}
function bindModal() {
  const m = $('#modalBox');
  const close = m.querySelector('.m-close');
  if (close) close.onclick = closeModal;
  $$('[data-close-modal]', m).forEach(b => b.onclick = closeModal);
  const go = m.querySelector('a[href]');
  if (go) go.onclick = () => { closeModal(); };
}
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ---------------- Login / shell ---------------- */
function showShell() {
  $('#loginScreen').classList.add('hidden');
  $('#shell').classList.remove('hidden');
}
function showLogin() {
  $('#shell').classList.add('hidden');
  $('#loginScreen').classList.remove('hidden');
}
function bindLogin() {
  $('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    LS.set(K.ADMIN, { email: fd.get('email'), at: new Date().toISOString(), name: 'Admin' });
    document.title = 'LAXMI EMBROIDERY — Admin Control Center';
    showShell();
    if (!location.hash.startsWith('#/admin')) location.hash = '#/admin';
    router();
    toast('Welcome back, Admin', 'ok');
  });
  $('#logoutBtn').addEventListener('click', () => {
    LS.del(K.ADMIN);
    showLogin();
    location.hash = '#/login';
  });
}
function setActiveNav(base) {
  $$('#sideNav a').forEach(a => a.classList.toggle('active', a.dataset.nav === base));
}
function setSubtitle(t) { $('#topSubtitle').textContent = t; }

/* ---------------- Router ---------------- */
const routes = [];
function route(pattern, handler) { routes.push({ pattern, handler }); }
function router() {
  const hash = location.hash || '#/login';
  if (hash === '#/login') { showLogin(); return; }
  if (!isAdmin()) { showLogin(); return; }
  showShell();
  const queryIdx = hash.indexOf('?');
  const path = queryIdx === -1 ? hash : hash.slice(0, queryIdx);
  const q = new URLSearchParams(queryIdx === -1 ? '' : hash.slice(queryIdx + 1));
  const base = path.split('/')[2] || 'dashboard';
  setActiveNav(base);
  $('#sidebar').classList.remove('open');
  for (const r of routes) {
    const parts = r.pattern.split('/');
    const hparts = path.split('/');
    if (parts.length !== hparts.length) continue;
    let match = true, params = [];
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].startsWith(':')) params.push(decodeURIComponent(hparts[i]));
      else if (parts[i] !== hparts[i]) { match = false; break; }
    }
    if (match) { try { r.handler(params, q); } catch (e) { console.error(e); $('#app').innerHTML = errView(e); } return; }
  }
  $('#app').innerHTML = errView(new Error('No such admin page'));
  window.scrollTo({ top: 0, behavior: 'instant' });
}
function errView(e) {
  return `<div class="empty"><h3>Something went wrong</h3><p>${esc(e.message || 'Please try again.')}</p><button class="btn btn-gold" onclick="location.hash='#/admin'">Back to Dashboard</button></div>`;
}

route('#/admin', () => renderDashboard());
route('#/admin/products', (m, q) => renderProducts(q));
route('#/admin/products/new', () => renderProductForm(null));
route('#/admin/products/:id/edit', (m) => renderProductForm(m[0]));
route('#/admin/orders', () => renderOrders());
route('#/admin/customers', () => renderCustomers());
route('#/admin/categories', () => renderCategories());
route('#/admin/collections', () => renderCollections());
route('#/admin/coupons', () => renderCoupons());
route('#/admin/analytics', () => renderAnalytics());
route('#/admin/media', () => renderMedia());
route('#/admin/settings', () => renderSettings());

/* ---------------- Chart helpers (pure SVG) ---------------- */
function thumb(p, size) {
  const fab = (p.media && p.media.length) ? 'cream' : (p.fab) || 'cream';
  const art = MP.motifArtwork(p, fab, size || 42, { code: false });
  return art;
}
function sparkPath(vals, w, h) {
  const max = Math.max(...vals, 1);
  const min = Math.min(...vals, 0);
  const rng = (max - min) || 1;
  const step = w / (vals.length - 1 || 1);
  const pts = vals.map((v, i) => [i * step, h - ((v - min) / rng) * (h - 4) - 2]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L ${w} ${h} L 0 ${h} Z`;
  return { line, area, pts };
}
function areaChart(vals, labels, w, h) {
  const { line, area } = sparkPath(vals, w, h);
  const max = Math.max(...vals, 1);
  const dots = vals.map((v, i) => `<circle cx="${(i * w / (vals.length - 1 || 1)).toFixed(1)}" cy="${(h - (v / max) * (h - 14) - 7).toFixed(1)}" r="3" fill="#0e0e10" stroke="#e5c76b" stroke-width="2"/>`).join('');
  const grid = [1, 3, 5].map(g => `<line x1="0" x2="${w}" y1="${(h * g / 6).toFixed(1)}" y2="${(h * g / 6).toFixed(1)}" stroke="#232329" stroke-dasharray="3 4"/>`).join('');
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" preserveAspectRatio="none">
    ${grid}${area ? `<path d="${area}" fill="url(#agrad-${w})" opacity=".5"/>` : ''}
    <defs><linearGradient id="agrad-${w}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#c9a227"/><stop offset="100%" stop-color="#c9a227" stop-opacity=".02"/></linearGradient></defs>
    <path d="${line}" fill="none" stroke="#e5c76b" stroke-width="2" stroke-linecap="round"/>
    ${dots}
  </svg>`;
}
function barChart(items, w, h) {
  const max = Math.max(...items.map(i => i.v), 1);
  const n = items.length;
  const bw = (w - 20) / n;
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="100%">
    ${items.map((it, i) => {
      const bH = Math.max(2, (it.v / max) * (h - 30));
      const x = 10 + i * bw + bw * .22;
      return `<rect x="${x}" y="${(h - 20 - bH).toFixed(1)}" width="${(bw * .56).toFixed(1)}" height="${bH.toFixed(1)}" rx="4" fill="url(#bgrad)"/>
        <text x="${(x + bw * .28).toFixed(1)}" y="${(h - 7).toFixed(1)}" font-size="8" text-anchor="middle" fill="#8b8795">${esc(it.l)}</text>`;
    }).join('')}
    <defs><linearGradient id="bgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#e5c76b"/><stop offset="100%" stop-color="#8a6d1c"/></linearGradient></defs>
  </svg>`;
}
function donutChart(segments, size, gap) {
  size = size || 160; gap = gap || 8;
  const total = segments.reduce((s, x) => s + x.v, 0) || 1;
  const r = (size / 2) - 14;
  const C = 2 * Math.PI * r;
  let off = 0;
  const arcs = segments.map((s, i) => {
    const len = (s.v / total) * C;
    const dash = `${Math.max(0, len - gap)} ${C - Math.max(0, len - gap)}`;
    const ret = `<circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${s.c}" stroke-width="18" stroke-dasharray="${dash}" stroke-dashoffset="${(-off).toFixed(1)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>`;
    off += len;
    return ret;
  }).join('');
  return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%">${arcs}<circle cx="${size / 2}" cy="${size / 2}" r="${size / 4}" fill="#1a1a1e"/><text x="${size / 2}" y="${size / 2 + 5}" text-anchor="middle" font-family="Georgia, serif" font-size="17" font-weight="700" fill="#ece9e0">${fmt(total)}</text></svg>`;
}

/* ---------------- DASHBOARD ---------------- */
function renderDashboard() {
  const ORDRS = orders();
  const revenue = ORDRS.filter(o => o.status === 'Paid').reduce((s, o) => s + Number(o.total || 0), 0);
  const pending = ORDRS.filter(o => o.status === 'Pending').length;
  const active = PRODUCTS.filter(p => p.status !== 'disabled').length;
  const custEmails = new Set(ORDRS.map(o => (o.user || o.customer?.email || '').toLowerCase()).filter(Boolean));
  const me = LS.get(K.AUTH, null);
  if (me && me.email) custEmails.add(me.email.toLowerCase());
  const dlCount = LS.get(K.DOWNLOADS, []).length;
  const weekRev = weeklyRevenue(ORDRS);
  const statusCount = {};
  ORDRS.forEach(o => { statusCount[o.status] = (statusCount[o.status] || 0) + 1; });
  const topProducts = [...PRODUCTS].sort((a, b) => b.sales - a.sales).slice(0, 5);
  const catDist = CATEGORIES.map(c => ({ l: c.id, v: PRODUCTS.filter(p => p.cat === c.id || p.sub === c.id).length })).filter(c => c.v > 0).sort((a, b) => b.v - a.v);
  const deltas = [{ l: 'Revenue', v: INR(revenue), d: '+12.4%', up: true }, { l: 'Orders', v: fmt(ORDRS.length), d: `+${fmt(pending)} pending`, up: true }, { l: 'Active Designs', v: fmt(active), d: `${fmt(PRODUCTS.length - active)} paused`, up: false }, { l: 'Downloads', v: fmt(dlCount), d: '+8.1%', up: true }];
  setSubtitle('Here\'s what\'s happening with your embroidery store.');
  $('#app').innerHTML = `
  <div class="stack">
    <div class="stats-grid">
      ${deltas.map((s, i) => `<div class="stat reveal in spark-${i}"><div class="lbl">${s.l}</div><div class="val">${s.v}</div><span class="delta ${s.up ? 'up' : 'dn'}">${s.d}</span><span class="spark">${sparkBtn(i)}</span></div>`).join('')}
    </div>
    <div class="charts-grid">
      <div class="card"><h3>Revenue — last 12 weeks <span class="chip pill gold">${INR(weekRev.reduce((a, b) => a + b, 0))}</span></h3><div class="chart-box">${areaChart(weekRev, [], 580, 240)}</div></div>
      <div class="card"><h3>Order status</h3><div style="display:flex;align-items:center;gap:20px;flex-wrap:wrap"><div style="flex:1;min-width:150px">${donutChart(Object.entries(statusCount).map(([k, v]) => ({ v, c: statusColor(k) })), 160)}</div><div class="legend" style="flex-direction:column;gap:8px">${Object.entries(statusCount).map(([k, v]) => `<span><i style="background:${statusColor(k)}"></i>${k} · ${v}</span>`).join('')}</div></div></div>
    </div>
    <div class="grid-main-side">
      <div class="card"><h3>Recent orders <a href="#/admin/orders" style="font-size:.76rem;color:var(--gold);font-weight:700">View all →</a></h3>
        <div class="table-wrap">${ordersTable(ORDRS.slice(-6).reverse(), ['id', 'cust', 'items', 'total', 'status', 'action'])}</div>
      </div>
      <div class="card"><h3>Top performers</h3><div class="chart-box" style="height:280px">${barChart(topProducts.map(p => ({ l: p.code.replace(/[^0-9]/g, ''), v: p.sales })), 320, 260)}</div></div>
    </div>
    <div class="grid-side-main">
      <div class="card"><h3>Catalog by category</h3><div class="chart-box" style="height:260px">${barChart(catDist.slice(0, 8).map(c => ({ l: shortCat(c.l), v: c.v })), 360, 240)}</div></div>
      <div class="card"><h3>Quick actions</h3><div class="stack" style="gap:10px">
        <a class="btn btn-gold btn-block" href="#/admin/products/new">＋ Add a new design</a>
        <a class="btn btn-dark btn-block" href="#/admin/orders">Review orders</a>
        <a class="btn btn-dark btn-block" href="#/admin/products">Manage catalog</a>
        <a class="btn btn-outline btn-block" href="#/admin/settings">Update store settings</a>
      </div></div>
    </div>
  </div>`;
}
function sparkBtn(i) {
  const pats = [[3, 5, 4, 7, 6, 9, 8, 11], [2, 4, 3, 6, 7, 5, 8, 9], [6, 7, 5, 8, 9, 11, 10, 12], [1, 3, 4, 2, 5, 7, 6, 8]];
  const vals = pats[i % pats.length];
  const w = 84, h = 26;
  const { line } = sparkPath(vals, w, h);
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><path d="${line}" fill="none" stroke="${i % 2 ? '#8b8795' : '#c9a227'}" stroke-width="1.6" stroke-linecap="round"/></svg>`;
}
function statusColor(s) {
  return ({ 'Paid': '#3f8c6a', 'Pending': '#c9a227', 'Refunded': '#a32727', 'Cancelled': '#c25454', 'Completed': '#5a6eb4' }[s]) || '#8b8795';
}
function weeklyRevenue(ORDRS) {
  const weeks = Array(12).fill(0);
  const now = Date.now();
  const day = 864e5;
  ORDRS.forEach(o => {
    const t = new Date(o.date).getTime();
    if (!t) return;
    const wk = Math.floor((now - t) / (7 * day));
    if (wk >= 0 && wk < 12 && o.status !== 'Refunded') weeks[11 - wk] += Number(o.total || 0);
  });
  return weeks.map(x => Math.round(x));
}
function shortCat(s) {
  const c = CATEGORIES.find(c => c.id === s);
  return c ? c.name.split(' ')[0] : s;
}

/* ---------------- PRODUCTS ---------------- */
function renderProducts(q) {
  q = q || new URLSearchParams();
  let list = [...PRODUCTS];
  const search = q.get('s') || '';
  const cat = q.get('cat') || '';
  const st = q.get('st') || '';
  if (search) { const t = search.toLowerCase(); list = list.filter(p => (p.name + ' ' + p.code + ' ' + (p.tags || []).join(' ')).toLowerCase().includes(t)); }
  if (cat) list = list.filter(p => p.cat === cat || p.sub === cat);
  if (st) list = list.filter(p => p.status === st);
  setSubtitle(`${fmt(list.length)} designs`);
  $('#app').innerHTML = `
  <div class="section-t">Designs</div><div class="section-s">Manage your embroidery catalog — add, edit, price and publish designs.</div>
  <div class="toolbar">
    <div class="search-in"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><input id="pSearch" placeholder="Search designs…" value="${esc(search)}"></div>
    <select id="pCat">
      <option value="">All categories</option>
      ${CATEGORIES.map(c => `<option value="${c.id}" ${cat === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('')}
    </select>
    <select id="pSt">
      <option value="">All statuses</option>
      <option value="active" ${st === 'active' ? 'selected' : ''}>Active</option>
      <option value="draft" ${st === 'draft' ? 'selected' : ''}>Draft</option>
      <option value="disabled" ${st === 'disabled' ? 'selected' : ''}>Disabled</option>
    </select>
    <div class="spacer"></div>
    <a class="btn btn-gold" href="#/admin/products/new">＋ New Design</a>
  </div>
  <div class="table-wrap"><table class="tbl">
    <tr><th>Design</th><th>Category</th><th>Price</th><th>Stitches</th><th>Sales</th><th>Status</th><th class="shrink">Actions</th></tr>
    ${list.length ? list.map(productRow).join('') : `<tr><td colspan="7"><div class="empty"><h3>No designs found</h3><p>Try a different filter or create a new design.</p></div></td></tr>`}
  </table></div>`;
  const go = () => location.hash = '#/admin/products?s=' + encodeURIComponent($('#pSearch').value) + '&cat=' + $('#pCat').value + '&st=' + $('#pSt').value;
  $('#pSearch').addEventListener('input', () => { clearTimeout(go._t); go._t = setTimeout(go, 350); });
  $('#pCat').addEventListener('change', go);
  $('#pSt').addEventListener('change', go);
  $$('[data-del]').forEach(b => b.onclick = () => delProduct(+b.dataset.del));
  $$('[data-feat]').forEach(b => b.onclick = () => toggleFeatured(+b.dataset.feat));
}
function productRow(p) {
  const pi = statusPill(p.status);
  return `<tr>
    <td><div style="display:flex;align-items:center;gap:12px"><span class="mini-thumb">${MP.motifArtwork(p, 'cream', 42, { code: false })}</span><div><b>${esc(p.name)}</b><div class="section-s" style="font-size:.72rem;margin:0;color:var(--dim)">${esc(p.code)} · ${p.stitches.toLocaleString('en-IN')} st · ${p.w}×${p.h}mm</div></div></div></td>
    <td>${esc(catName(p.cat))}</td>
    <td><b>${p.free ? '<span class="pill green">FREE</span>' : INR(money(p))}${p.sale ? `<div style="font-size:.7rem;color:var(--dim)"><s>${INR(p.price)}</s></div>` : ''}</td>
    <td>${fmt(p.stitches)}</td>
    <td>${fmt(p.sales)}</td>
    <td>${pi}</td>
    <td class="shrink"><div style="display:flex;gap:6px;align-items:center">
      <a class="btn btn-ic btn-dark" title="View on store" href="../index.html#/design/${p.slug}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></a>
      <button class="btn btn-ic btn-dark" data-feat="${p.id}" title="${p.featured ? 'Unfeature' : 'Feature'}"><svg viewBox="0 0 24 24" fill="${p.featured ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6" style="color:${p.featured ? '#e5c76b' : 'inherit'}"><path d="M12 3l2.7 5.6 6.3.8-4.6 4.3 1.2 6.1L12 17l-5.6 2.8 1.2-6.1L3 9.4l6.3-.8Z"/></svg></button>
      <a class="btn btn-ic btn-dark" title="Edit" href="#/admin/products/${p.id}/edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg></a>
      <button class="btn btn-ic btn-danger" title="Delete" data-del="${p.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
    </div></td>
  </tr>`;
}
function statusPill(st) {
  return { active: '<span class="pill green">active</span>', draft: '<span class="pill blue">draft</span>', disabled: '<span class="pill gray">disabled</span>' }[st] || `<span class="pill gray">${esc(st)}</span>`;
}
function delProduct(id) {
  const p = byId(id);
  openModal(`<button class="m-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    <div class="m-title">Delete “${esc(p?.name || 'design')}”?</div>
    <p style="color:var(--muted);margin-bottom:22px">This permanently removes the design from your catalog. Orders and downloads already made are not affected.</p>
    <div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-dark" data-close-modal="">Cancel</button><button class="btn btn-danger" id="confirmDel">Delete design</button></div>`);
  $('#confirmDel').onclick = () => {
    PRODUCTS = PRODUCTS.filter(x => x.id !== id);
    LS.set(K.PRODUCTS, PRODUCTS);
    closeModal();
    toast('Design deleted', 'ok', 0);
    renderProducts();
  };
}
function toggleFeatured(id) {
  const p = byId(id);
  if (!p) return;
  p.featured = !p.featured;
  LS.set(K.PRODUCTS, PRODUCTS);
  renderProducts();
  toast(p.featured ? 'Marked as featured' : 'Removed from featured', 'ok');
}

/* ---------------- PRODUCT FORM ---------------- */
const MOTIFS = ['floral', 'front-neck', 'back-neck', 'butta', 'mandala', 'arabic', 'traditional', 'zari', 'rose', 'leaf', 'paisley', 'border', 'kid', 'motif'];
const THREAD_KEYS = ['gold', 'maroon', 'deep', 'rust', 'teal', 'emerald', 'pink', 'rose', 'sky', 'red', 'green', 'cream', 'ink', 'plum', 'black'];
function renderProductForm(idOrNull) {
  const edit = idOrNull != null && !['new', 'null', 'undefined'].includes(String(idOrNull));
  const p = edit ? byId(idOrNull) : {
    id: null, code: '', name: '', price: 199, sale: null, cat: 'front-neck', sub: '', coll: [], tags: [], motif: 'floral',
    stitches: 5000, w: 120, h: 140, colors: 5, formats: ['DST', 'PES', 'JEF', 'EXP'], hoop: '5 × 7"', rating: 4.8, reviews: 0,
    desc: '', suitable: ['Blouse', 'Kurti'], status: 'active', created: new Date().toISOString().slice(0, 10), sales: 0, featured: false, free: false, hue1: 'gold', hue2: 'maroon', fab: 'cream', media: []
  };
  if (edit && !p) { $('#app').innerHTML = `<div class="empty"><h3>Design not found</h3><a class="btn btn-gold" href="#/admin/products">Back to catalog</a></div>`; return; }
  setSubtitle(edit ? 'Editing ' + esc(p.name) : 'Add a new design to your catalog');
  const motifs = MOTIFS.map((m, i) => `<option value="${m}" ${p.motif === m ? 'selected' : ''}>${m}</option>`).join('');
  const hueOpts = (cur) => THREAD_KEYS.map(k => `<option value="${k}" ${cur === k ? 'selected' : ''}>${k} · ${(MP.THREAD[k])}</option>`).join('');
  const collOpts = COLLECTIONS.map(c => `<label class="fmt-chip ${(p.coll || []).includes(c.id) ? 'on' : ''}" style="cursor:pointer"><input type="checkbox" value="${c.id}" ${(p.coll || []).includes(c.id) ? 'checked' : ''} style="display:none">${esc(c.name)}</label>`).join('');
  const catOpts = CATEGORIES.map(c => `<option value="${c.id}" ${p.cat === c.id ? 'selected' : ''}>${esc(c.name)}</option>`).join('');
  const fabs = Object.keys(MP.FABRICS);
  const stages = fabs.map(f => `<div class="pstage ${p.fab === f ? 'primary' : ''}" data-fab="${f}" style="background:${f === 'black' || f === 'maroon' || f === 'green' || f === 'navy' ? '#191613' : '#f3ecdb'}"><div class="art">${MP.motifArtwork(p, f, 120, { code: false })}</div><span class="pm">${f}</span></div>`).join('');
  const fileRows = (p.media || []).map((m, i) => fileRowHtml(m, i, p.id)).join('');
  $('#app').innerHTML = `
  <div class="section-t">${edit ? 'Edit design' : 'New design'}</div><div class="section-s">Fields marked <b style="color:var(--red)">*</b> are required. Preview regenerates from the chosen motif.</div>
  <div class="grid-main-side" style="grid-template-columns:1.9fr 1fr">
    <div class="stack">
      <div class="card"><h3>Basics</h3>
        <div class="grid2">
          <div class="field"><label>Design name <b>*</b></label><input id="fName" value="${esc(p.name)}" placeholder="e.g. Royal Floral Neckline"></div>
          <div class="field"><label>Code <b>*</b></label><input id="fCode" value="${esc(p.code)}" placeholder="e.g. LE025" ${edit ? 'readonly style="opacity:.5"' : ''}></div>
          <div class="field"><label>Price (₹)</label><input id="fPrice" type="number" min="0" value="${p.price ?? 0}"></div>
          <div class="field"><label>Sale price (₹, optional)</label><input id="fSale" type="number" min="0" value="${p.sale ?? ''}" placeholder="Leave blank for no sale"></div>
        </div>
        <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:center;margin-bottom:4px">
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="fFree" ${p.free ? 'checked' : ''}> Free download</label>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="fFeatured" ${p.featured ? 'checked' : ''}> Featured on home</label>
        </div>
      </div>
      <div class="card"><h3>Technical</h3>
        <div class="grid3">
          <div class="field"><label>Category <b>*</b></label><select id="fCat">${catOpts}</select></div>
          <div class="field"><label>Motif</label><select id="fMotif">${motifs}</select></div>
          <div class="field"><label>Status</label><select id="fStatus">${['active', 'draft', 'disabled'].map(s => `<option ${p.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
          <div class="field"><label>Stitch count</label><input id="fStitches" type="number" min="0" value="${p.stitches ?? 0}"></div>
          <div class="field"><label>Width (mm)</label><input id="fW" type="number" min="1" value="${p.w ?? 100}"></div>
          <div class="field"><label>Height (mm)</label><input id="fH" type="number" min="1" value="${p.h ?? 120}"></div>
          <div class="field"><label>Colours</label><input id="fColors" type="number" min="1" max="30" value="${p.colors ?? 5}"></div>
          <div class="field"><label>Hoop size</label><input id="fHoop" value="${esc(p.hoop || '')}" placeholder="5 × 7&quot;"></div>
          <div class="field"><label>Thread 1</label><select id="fHue1">${hueOpts(p.hue1)}</select></div>
          <div class="field"><label>Thread 2</label><select id="fHue2">${hueOpts(p.hue2)}</select></div>
          <div class="field"><label>Sub-category</label><select id="fSub"><option value="">—</option>${catOpts.replaceAll('selected', '')}</select></div>
          <div class="field"><label>Tags</label><input id="fTags" value="${esc((p.tags || []).join(', '))}" placeholder="floral, royal, festive"></div>
        </div>
        <div class="field" style="margin-bottom:0"><label>Description</label><textarea id="fDesc" rows="4" placeholder="Describe the design…">${esc(p.desc || '')}</textarea></div>
      </div>
      <div class="card"><h3>Formats produced</h3><div class="formats-toggle" id="fmtWrap">${['DST', 'PES', 'JEF', 'EXP', 'PNG', 'SVG'].map(f => `<span class="fmt-chip ${(p.formats || []).includes(f) ? 'on' : ''}" data-raw="${f}">${f}</span>`).join('')}</div></div>
      <div class="card"><h3>Collections</h3><div class="formats-toggle" id="collWrap">${collOpts}</div></div>
      <div class="card"><h3>Media <span class="chip pill blue" style="font-size:.66rem">optional uploads</span></h3>
        <div class="drop" id="drop">
          <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg></div>
          <b>Drop embroidery files here</b><p>DST, PES, JEF, EXP or preview images — store up to 4 files.</p>
          <div class="fmts"><i>DST</i><i>PES</i><i>JEF</i><i>EXP</i><i>PNG</i><i>SVG</i></div>
        </div>
        <div class="file-list" id="fileList">${fileRows}</div>
      </div>
    </div>
    <div class="stack">
      <div class="card"><h3>Preview generator <span class="chip pill gold">procedural</span></h3>
        <p class="section-s" style="margin-bottom:12px">Pick the fabric for the storefront preview — the artwork is stitched live via the shared engine.</p>
        <div class="preview-stages" id="stages">${stages}</div>
        <p class="section-s" style="margin:12px 0 6px;font-size:.74rem;color:var(--dim)">Tip: dense motifs read best on black/cream backgrounds.</p>
      </div>
      <div class="card" style="position:sticky;top:82px">
        <h3>Save design</h3>
        ${edit ? `<a class="btn btn-outline btn-block" href="../index.html#/design/${p.slug}" target="_blank" rel="noopener" style="margin-bottom:10px">View live preview ↗</a>` : ''}
        <button class="btn btn-gold btn-block" id="saveProd">${edit ? 'Save changes' : 'Publish design'}</button>
        <button class="btn btn-dark btn-block" style="margin-top:10px" onclick="location.hash='#/admin/products'">Cancel</button>
      </div>
    </div>
  </div>`;
  initMedia(p);
  initStages(p);
  renderLivePreview(p);
  $('#saveProd').onclick = () => saveProduct(p, edit);
  ['fMotif', 'fHue1', 'fHue2'].forEach(id => { const el = $('#' + id); if (el) el.addEventListener('change', () => renderLivePreview(p)); });
}
function fileRowHtml(m, i, pid) {
  return `<div class="file-row"><div class="fico">${(m.name || 'FILE').split('.').pop().toUpperCase().slice(0, 4)}</div><div><div class="fname">${esc(m.name)}</div><div class="fmeta">${fmt(m.size || 0)} bytes · ${m.type || 'file'}</div></div><div class="factions"><button class="btn btn-ic btn-danger" data-mdel="${i}" data-pid="${pid}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div></div>`;
}
function initStages(p) {
  $$('#stages .pstage').forEach(s => s.onclick = () => {
    $$('#stages .pstage').forEach(x => x.classList.remove('primary'));
    s.classList.add('primary');
    p.fab = s.dataset.fab;
  });
}
function renderLivePreview(p) {
  const motif = $('#fMotif') ? $('#fMotif').value : p.motif;
  const hue1 = $('#fHue1') ? $('#fHue1').value : p.hue1;
  const hue2 = $('#fHue2') ? $('#fHue2').value : p.hue2;
  const cur = Object.assign({}, p, { motif, hue1, hue2, name: $('#fName') ? $('#fName').value || p.name : p.name, code: $('#fCode') ? $('#fCode').value : p.code });
  $$('#stages .pstage').forEach(s => {
    const fab = s.dataset.fab;
    s.innerHTML = `<div class="art">${MP.motifArtwork(cur, fab, 120, { code: false })}</div><span class="pm">${fab}</span>`;
    s.classList.toggle('primary', fab === p.fab);
  });
}
function initMedia(p) {
  const drop = $('#drop');
  const input = document.createElement('input');
  input.type = 'file'; input.multiple = true; input.accept = '.dst,.pes,.jef,.exp,.png,.jpg,.jpeg,.svg,.webp';
  drop.onclick = () => input.click();
  drop.ondragover = (e) => { e.preventDefault(); drop.classList.add('over'); };
  drop.ondragleave = () => drop.classList.remove('over');
  drop.ondrop = (e) => { e.preventDefault(); drop.classList.remove('over'); handleFiles(e.dataTransfer.files, p); };
  input.onchange = () => { handleFiles(input.files, p); input.value = ''; };
}
function handleFiles(files, p) {
  const keep = [(p.media || []).slice()];
  const arr = [...files].filter(f => /\.(dst|pes|jef|exp|png|jpg|jpeg|svg|webp)$/i.test(f.name)).slice(0, 4 - keep[0].length);
  if (!arr.length) { toast('No supported files in selection', 'danger'); return; }
  let done = 0;
  arr.forEach(f => {
    const r = new FileReader();
    r.onload = () => {
      keep[0].push({ name: f.name, type: f.type || 'application/octet-stream', size: f.size, data: r.result });
      if (++done === arr.length) {
        p.media = keep[0];
        $('#fileList').innerHTML = (p.media || []).map((m, i) => fileRowHtml(m, i, p.id)).join('');
        handleMediaDelete(p);
        toast('File added to design', 'ok');
      }
    };
    r.readAsDataURL(f);
  });
}
function handleMediaDelete(p) {
  $$('#fileList [data-mdel]').forEach(b => b.onclick = () => {
    const i = +b.dataset.mdel;
    p.media = (p.media || []).filter((_, k) => k !== i);
    $('#fileList').innerHTML = (p.media || []).map((m, k) => fileRowHtml(m, k, p.id)).join('');
    handleMediaDelete(p);
  });
}
function saveProduct(p, edit) {
  const name = $('#fName').value.trim();
  const code = $('#fCode').value.trim();
  if (!name || !code) { toast('Design name and code are required', 'danger'); return; }
  const formats = $$('#fmtWrap .fmt-chip.on').map(el => el.dataset.raw);
  const coll = $$('#collWrap input:checked').map(i => i.value);
  const tags = $('#fTags').value.split(',').map(s => s.trim()).filter(Boolean);
  const data = {
    name: name, code: code, price: Number($('#fPrice').value) || 0,
    sale: $('#fSale').value !== '' ? Number($('#fSale').value) : null,
    free: $('#fFree').checked, featured: $('#fFeatured').checked,
    cat: $('#fCat').value, sub: $('#fSub').value, motif: $('#fMotif').value, status: $('#fStatus').value,
    stitches: Number($('#fStitches').value) || 0, w: Number($('#fW').value) || 100, h: Number($('#fH').value) || 120,
    colors: Number($('#fColors').value) || 1, hoop: $('#fHoop').value.trim() || '5 × 7"',
    hue1: $('#fHue1').value, hue2: $('#fHue2').value, tags, desc: $('#fDesc').value.trim(),
    formats: formats.length ? formats : ['DST', 'PES', 'JEF', 'EXP'], coll: coll,
    fab: p.fab || 'cream', media: p.media || []
  };
  if (edit) {
    Object.assign(p, data);
    if (data.name !== p.name || !p.slug) p.slug = slugify(data.name) + '-' + p.id;
    LS.set(K.PRODUCTS, PRODUCTS);
    toast('Design updated', 'ok');
  } else {
    const id = Math.max(0, ...PRODUCTS.map(x => Number(x.id))) + 1;
    const rec = Object.assign({
      id: id, slug: slugify(data.name) + '-' + id, rating: 4.8, reviews: 0, sales: 0, created: new Date().toISOString().slice(0, 10)
    }, data);
    PRODUCTS.push(rec);
    LS.set(K.PRODUCTS, PRODUCTS);
    toast('Design published to the storefront', 'ok');
  }
  location.hash = '#/admin/products';
}

/* ---------------- ORDERS ---------------- */
function ordersTable(rows, cols) {
  if (!rows.length) return `<div class="empty"><h3>No orders yet</h3><p>Orders placed on the storefront will appear here.</p></div>`;
  const cells = {
    id: (o) => `<b style="color:var(--gold-hi)">${esc(o.id)}</b><div class="section-s" style="font-size:.7rem;margin:0;color:var(--dim)">${o.date}</div>`,
    cust: (o) => `<b>${esc(o.customer?.name || o.user || '—')}</b><div class="section-s" style="font-size:.7rem;margin:0;color:var(--dim)">${esc(o.customer?.email || '')}</div>`,
    items: (o) => `<div style="max-width:240px">${esc(o.items.slice(0, 2).map(i => i.name).join(', '))}${o.items.length > 2 ? ` <span style="color:var(--gold)">+${o.items.length - 2}</span>` : ''}</div>`,
    total: (o) => `<b>${o.total ? INR(o.total) : '<span class="pill green">FREE</span>'}</b><div class="section-s" style="font-size:.7rem;margin:0;color:var(--dim)">${esc(o.pay || 'cod')}</div>`,
    status: (o) => `<span class="pill ${statusPillCls(o.status)}">${esc(o.status || '—')}</span>`,
    action: (o) => `<a class="btn btn-ic btn-dark" title="View order" data-oview="${o.id}" href="#"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4h18v12H3zM7 20h10M12 16v4"/></svg></a>`
  };
  const order = (col) => cells[col] || cells.id;
  return `<table class="tbl"><tr>${cols.map(c => `<th>${c === 'cust' ? 'Customer' : c === 'items' ? 'Items' : c === 'total' ? 'Total' : c === 'status' ? 'Status' : c === 'action' ? '' : c}</th>`).join('')}</tr>
    ${rows.map(o => `<tr>${cols.map(c => `<td>${order(c)(o)}</td>`).join('')}</tr>`).join('')}</table>`;
}
function statusPillCls(s) {
  return ({ 'Paid': 'green', 'Pending': 'gold', 'Refunded': 'red', 'Cancelled': 'red', 'Completed': 'blue' }[s]) || 'gray';
}
function renderOrders() {
  const ORDRS = orders();
  const st = (new URLSearchParams(location.hash.split('?')[1] || '')).get('st') || '';
  const list = st ? ORDRS.filter(o => o.status === st) : ORDRS;
  const totals = { Paid: 0, Pending: 0, Refunded: 0 };
  ORDRS.forEach(o => { if (o.status in totals) totals[o.status] += Number(o.total || 0); });
  setSubtitle(`${fmt(ORDRS.length)} orders`);
  $('#app').innerHTML = `
  <div class="section-t">Orders</div><div class="section-s">Track and manage storefront orders.</div>
  <div class="stats-grid">
    <div class="stat reveal in"><div class="lbl">Paid revenue</div><div class="val">${INR(totals.Paid)}</div><span class="delta up">${fmt(ORDRS.filter(o => o.status === 'Paid').length)} paid</span></div>
    <div class="stat reveal in"><div class="lbl">Pending</div><div class="val">${INR(totals.Pending)}</div><span class="delta gold" style="color:var(--gold-hi)">${fmt(ORDRS.filter(o => o.status === 'Pending').length)} awaiting</span></div>
    <div class="stat reveal in"><div class="lbl">Refunded</div><div class="val">${INR(totals.Refunded)}</div><span class="delta dn">${fmt(ORDRS.filter(o => o.status === 'Refunded').length)} refunds</span></div>
    <div class="stat reveal in"><div class="lbl">Avg order value</div><div class="val">${INR(Math.round(ORDRS.filter(o => o.status !== 'Refunded').reduce((s, o) => s + Number(o.total || 0), 0) / Math.max(1, ORDRS.filter(o => o.status !== 'Refunded').length)))}</div><span class="delta up">all time</span></div>
  </div>
  <div class="toolbar">
    <div class="range-tabs">
      ${['', 'Paid', 'Pending', 'Refunded'].map(s => `<button class="${st === s ? 'active' : ''}" data-st="${s}">${s || 'All'}</button>`).join('')}
    </div>
    <div class="spacer"></div>
    <button class="btn btn-dark" id="seedOrders">＋ Seed demo orders</button>
  </div>
  <div class="table-wrap">${ordersTable(list, ['id', 'cust', 'items', 'total', 'pay', 'status', 'action'])}</div>`;
  $$('.range-tabs button').forEach(b => b.onclick = () => { location.hash = b.dataset.st ? '#/admin/orders?st=' + encodeURIComponent(b.dataset.st) : '#/admin/orders'; });
  $('#seedOrders').onclick = () => {
    triggerSeed();
    renderOrders();
    toast('8 demo orders seeded', 'ok');
  };
  bindOrderViews(list);
}
function triggerSeed() {
  if (LS.get(K.ORDERS, null)) return;
  seedOrders();
}
function bindOrderViews(rows) {
  $$('[data-oview]').forEach(a => a.onclick = (e) => {
    e.preventDefault();
    const o = rows.find(x => x.id === a.dataset.oview);
    if (o) openOrderModal(o);
  });
}
function openOrderModal(o) {
  openModal(`<button class="m-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    <div class="m-title">${esc(o.id)} <span class="pill ${statusPillCls(o.status)}" style="margin-left:6px">${esc(o.status)}</span></div>
    <div class="grid2" style="margin-bottom:16px">
      <div class="field"><label>Customer</label><div>${esc(o.customer?.name || o.user || '—')}<div class="section-s" style="margin:0">${esc(o.customer?.email || '')} · ${esc(o.customer?.phone || '')}</div></div></div>
      <div class="field"><label>Placed</label><div>${o.date}<div class="section-s" style="margin:0">Via ${esc(o.pay || 'cod')}</div></div></div>
    </div>
    <div class="field"><label>Items</label><div class="table-wrap"><table class="tbl"><tr><th>Design</th><th>Qty</th><th>Price</th></tr>
      ${o.items.map(i => `<tr><td>${esc(i.name)}</td><td>×${i.qty}</td><td>${INR(i.price * i.qty)}</td></tr>`).join('')}
    </table></div></div>
    <div style="display:flex;justify-content:space-between;margin:14px 0 20px;font-weight:800"><span>Total</span><span style="color:var(--gold-hi)">${INR(o.total || 0)}</span></div>
    <div class="field"><label>Order status</label><select id="oStatus">${['Paid', 'Pending', 'Refunded', 'Cancelled'].map(s => `<option ${o.status === s ? 'selected' : ''}>${s}</option>`).join('')}</select></div>
    <div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-dark" data-close-modal="">Close</button><button class="btn btn-gold" id="oSave">Save status</button></div>`);
  $('#oSave').onclick = () => {
    o.status = $('#oStatus').value;
    saveOrders();
    closeModal();
    toast('Order updated', 'ok');
    renderOrders();
  };
}

/* ---------------- CUSTOMERS ---------------- */
function renderCustomers() {
  const ORDRS = orders();
  const map = new Map();
  ORDRS.forEach(o => {
    const email = (o.user || o.customer?.email || '').toLowerCase();
    if (!email) return;
    const c = map.get(email) || { email, name: o.customer?.name || o.user || '', phone: o.customer?.phone || '', city: o.customer?.city || '', n: 0, spent: 0, last: '' };
    c.n++; c.spent += Number(o.total || 0);
    if (o.date > c.last) c.last = o.date;
    if (o.customer?.name) c.name = o.customer.name;
    map.set(email, c);
  });
  const me = LS.get(K.AUTH, null);
  if (me && me.email) {
    const email = me.email.toLowerCase();
    if (!map.has(email)) map.set(email, { email, name: me.name || 'Customer', phone: me.phone || '', city: '', n: 0, spent: 0, last: '' });
  }
  const list = [...map.values()];
  const top = [...list].sort((a, b) => b.spent - a.spent)[0];
  setSubtitle(`${fmt(list.length)} customers`);
  $('#app').innerHTML = `
  <div class="section-t">Customers</div><div class="section-s">Everyone who has ordered from your store.</div>
  <div class="stats-grid">
    <div class="stat reveal in"><div class="lbl">Total customers</div><div class="val">${fmt(list.length)}</div><span class="delta up">signed up</span></div>
    <div class="stat reveal in"><div class="lbl">Orders placed</div><div class="val">${fmt(ORDRS.length)}</div><span class="delta up">all time</span></div>
    <div class="stat reveal in"><div class="lbl">Lifetime value</div><div class="val">${INR(list.reduce((s, c) => s + c.spent, 0))}</div><span class="delta up">revenue</span></div>
    <div class="stat reveal in"><div class="lbl">Top customer</div><div class="val" style="font-size:1.05rem">${top ? esc(top.name.split(' ')[0]) : '—'}</div><span class="delta up">${top ? INR(top.spent) : ''}</span></div>
  </div>
  <div class="table-wrap"><table class="tbl">
    <tr><th>Customer</th><th>City</th><th>Orders</th><th>Spent</th><th>Last order</th><th class="shrink"></th></tr>
    ${list.sort((a, b) => b.spent - a.spent).map(c => `<tr>
      <td><div style="display:flex;align-items:center;gap:12px"><span class="mini-thumb" style="border-radius:50%;font-family:Georgia,serif;font-weight:700;color:var(--gold-hi)">${esc((c.name || c.email[0]).toUpperCase()[0])}</span><div><b>${esc(c.name || 'Guest')}</b><div class="section-s" style="font-size:.7rem;margin:0;color:var(--dim)">${esc(c.email)}</div></div></div></td>
      <td>${esc(c.city || '—')}</td><td>${fmt(c.n)}</td><td><b>${INR(c.spent)}</b></td><td>${c.last || '—'}</td>
      <td class="shrink"><a class="btn btn-ic btn-dark" title="Mail customer" href="mailto:${esc(c.email)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></a></td>
    </tr>`).join('')}
  </table></div>`;
}

/* ---------------- CATEGORIES ---------------- */
function renderCategories() {
  const count = (id) => PRODUCTS.filter(p => p.cat === id || p.sub === id).length;
  setSubtitle(`${fmt(CATEGORIES.length)} categories`);
  $('#app').innerHTML = `
  <div class="section-t">Categories</div><div class="section-s">Group your designs — shown in the storefront shop filter and directory.</div>
  <div class="grid-main-side">
    <div class="table-wrap"><table class="tbl">
      <tr><th></th><th>Category</th><th>Slug</th><th>Designs</th><th class="shrink">Actions</th></tr>
      ${CATEGORIES.map((c, i) => `<tr>
        <td><span class="mini-thumb">${MP.catArt(c.id, 'cream')}</span></td>
        <td><b>${esc(c.name)}</b></td><td style="color:var(--dim)">${esc(c.id)}</td><td><span class="pill blue">${fmt(count(c.id))}</span></td>
        <td class="shrink"><div style="display:flex;gap:6px">
          <button class="btn btn-ic btn-dark" data-cedit="${i}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg></button>
          <button class="btn btn-ic btn-danger" data-cdel="${i}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
        </div></td>
      </tr>`).join('')}
      ${CATEGORIES.length == 0 ? `<tr><td colspan="5"><div class="empty"><h3>No categories yet</h3></div></td></tr>` : ''}
    </table></div>
    <div class="card"><h3>${'Add category'}</h3>
      <div class="field"><label>Name</label><input id="nName" placeholder="e.g. Floral"></div>
      <div class="field"><label>Slug / id</label><input id="nId" placeholder="e.g. floral"></div>
      <button class="btn btn-gold btn-block" id="nSave">Add category</button>
    </div>
  </div>`;
  $('#nSave').onclick = () => {
    const name = $('#nName').value.trim();
    const id = $('#nId').value.trim() || slugify(name);
    if (!name || CATEGORIES.some(c => c.id === id)) { toast(name ? 'Category already exists' : 'Enter a category name', 'danger'); return; }
    CATEGORIES.push({ id, name, count: 0 });
    syncCats();
    toast('Category added', 'ok');
    renderCategories();
  };
  $$('[data-cedit]').forEach(b => b.onclick = () => editCategory(+b.dataset.cedit));
  $$('[data-cdel]').forEach(b => b.onclick = () => {
    const c = CATEGORIES[+b.dataset.cdel];
    CATEGORIES.splice(+b.dataset.cdel, 1);
    syncCats();
    toast(`Category “${esc(c.name)}” deleted`, 'ok');
    renderCategories();
  });
}
function editCategory(i) {
  const c = CATEGORIES[i];
  openModal(`<button class="m-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    <div class="m-title">Edit category</div>
    <div class="field"><label>Name</label><input id="mName" value="${esc(c.name)}"></div>
    <div class="field"><label>Slug / id</label><input id="mId" value="${esc(c.id)}"></div>
    <div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-dark" data-close-modal="">Cancel</button><button class="btn btn-gold" id="mSave">Save</button></div>`);
  $('#mSave').onclick = () => {
    const id = $('#mId').value.trim();
    if (!id || CATEGORIES.some((x, k) => x.id === id && k !== i)) { toast('Invalid or duplicate slug', 'danger'); return; }
    c.name = $('#mName').value.trim() || c.name;
    PRODUCTS.forEach(p => { if (p.cat === c.id) p.cat = id; if (p.sub === c.id) p.sub = id; });
    c.id = id;
    syncCats();
    LS.set(K.PRODUCTS, PRODUCTS);
    closeModal();
    toast('Category saved', 'ok');
    renderCategories();
  };
}
function syncCats() {
  LS.set(K.CATS, CATEGORIES);
  LS.set(K.COLLS, COLLECTIONS);
}

/* ---------------- COLLECTIONS ---------------- */
function renderCollections() {
  setSubtitle(`${fmt(COLLECTIONS.length)} collections`);
  $('#app').innerHTML = `
  <div class="section-t">Collections</div><div class="section-s">Curated groups shown on the storefront home.</div>
  <div class="grid-main-side">
    <div class="stack">
      ${COLLECTIONS.map((c, i) => `<div class="card" style="display:flex;gap:16px;align-items:center">
        <span class="mini-thumb" style="width:64px;height:64px">${MP.collArt(c.id, COLLECTIONS)}</span>
        <div style="flex:1;min-width:0"><b>${esc(c.name)}</b><div class="section-s" style="margin:2px 0 0">${esc(c.desc || '')} · <span style="color:var(--gold)">${fmt(PRODUCTS.filter(p => (p.coll || []).includes(c.id)).length)} designs</span></div></div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-ic btn-dark" data-xedit="${i}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg></button>
          <button class="btn btn-ic btn-dark" data-xmng="${i}" title="Choose designs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M4 6h16M4 12h16M4 18h10"/></svg></button>
          <button class="btn btn-ic btn-danger" data-xdel="${i}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
        </div>
      </div>`).join('')}
      ${COLLECTIONS.length == 0 ? `<div class="empty"><h3>No collections yet</h3></div>` : ''}
    </div>
    <div class="card"><h3>Add collection</h3>
      <div class="field"><label>Name</label><input id="xName" placeholder="e.g. Eid Special"></div>
      <div class="field"><label>Slug / id</label><input id="xId" placeholder="e.g. eid"></div>
      <div class="field"><label>Art style</label><select id="xImg">${['motif', 'floral', 'bridal', 'leaf', 'mandala', 'rose', 'peacock'].map(a => `<option value="${a}">${a}</option>`).join('')}</select></div>
      <div class="field"><label>Description</label><input id="xDesc" placeholder="Freshest drops of the season."></div>
      <button class="btn btn-gold btn-block" id="xSave">Add collection</button>
    </div>
  </div>`;
  $('#xSave').onclick = () => {
    const name = $('#xName').value.trim();
    const id = $('#xId').value.trim() || slugify(name);
    if (!name || COLLECTIONS.some(c => c.id === id)) { toast(name ? 'Collection already exists' : 'Enter a collection name', 'danger'); return; }
    COLLECTIONS.push({ id, name, img: $('#xImg').value, desc: $('#xDesc').value.trim() });
    syncCats();
    toast('Collection added', 'ok');
    renderCollections();
  };
  $$('[data-xedit]').forEach(b => b.onclick = () => editCollection(+b.dataset.xedit));
  $$('[data-xmng]').forEach(b => b.onclick = () => manageCollection(+b.dataset.xmng));
  $$('[data-xdel]').forEach(b => b.onclick = () => {
    const c = COLLECTIONS[+b.dataset.xdel];
    PRODUCTS.forEach(p => { p.coll = (p.coll || []).filter(x => x !== c.id); });
    COLLECTIONS.splice(+b.dataset.xdel, 1);
    syncCats(); LS.set(K.PRODUCTS, PRODUCTS);
    toast('Collection deleted', 'ok');
    renderCollections();
  });
}
function editCollection(i) {
  const c = COLLECTIONS[i];
  openModal(`<button class="m-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    <div class="m-title">Edit “${esc(c.name)}”</div>
    <div class="field"><label>Name</label><input id="xEname" value="${esc(c.name)}"></div>
    <div class="field"><label>Art style</label><select id="xEimg">${['motif', 'floral', 'bridal', 'leaf', 'mandala', 'rose', 'peacock'].map(a => `<option value="${a}" ${c.img === a ? 'selected' : ''}>${a}</option>`).join('')}</select></div>
    <div class="field"><label>Description</label><input id="xEdesc" value="${esc(c.desc || '')}"></div>
    <div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-dark" data-close-modal="">Cancel</button><button class="btn btn-gold" id="xEsave">Save</button></div>`);
  $('#xEsave').onclick = () => {
    c.name = $('#xEname').value.trim() || c.name;
    c.img = $('#xEimg').value; c.desc = $('#xEdesc').value.trim();
    syncCats();
    closeModal();
    toast('Collection saved', 'ok');
    renderCollections();
  };
}
function manageCollection(i) {
  const c = COLLECTIONS[i];
  openModal(`<button class="m-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    <div class="m-title">Choose designs for “${esc(c.name)}”</div>
    <p class="section-s" style="margin-bottom:14px">Selected designs appear under this collection on the storefront.</p>
    <div class="stack" style="max-height:46vh;overflow:auto;gap:8px" id="xGrid">
      ${PRODUCTS.filter(p => p.status !== 'disabled').map(p => `<label class="file-row" style="cursor:pointer;align-items:center">
        <span class="mini-thumb">${MP.motifArtwork(p, 'cream', 40, { code: false })}</span>
        <span style="flex:1;min-width:0"><span class="fname" style="display:block">${esc(p.name)}</span><span class="fmeta">${esc(p.code)} · ${INR(money(p))}</span></span>
        <input type="checkbox" data-xpick="${p.id}" ${(p.coll || []).includes(c.id) ? 'checked' : ''} style="width:18px;height:18px;accent-color:#c9a227">
      </label>`).join('')}
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px"><button class="btn btn-dark" data-close-modal="">Cancel</button><button class="btn btn-gold" id="xMngSave">Save selection</button></div>`);
  $('#xMngSave').onclick = () => {
    $$('[data-xpick]').forEach(el => {
      const p = byId(+el.dataset.xpick);
      const has = (p.coll || []).includes(c.id);
      if (el.checked && !has) p.coll.push(c.id);
      if (!el.checked && has) p.coll = p.coll.filter(x => x !== c.id);
    });
    LS.set(K.PRODUCTS, PRODUCTS);
    syncCats();
    closeModal();
    toast('Collection updated', 'ok');
  };
}

/* ---------------- COUPONS ---------------- */
function renderCoupons() {
  const custom = LS.get(K.COUPONS, []);
  const all = SEED_COUPONS.concat(custom.map(c => ({ ...c, def: false })));
  setSubtitle(`${fmt(all.length)} coupons`);
  $('#app').innerHTML = `
  <div class="section-t">Coupons</div><div class="section-s">Discounts available at checkout. Seed coupons are store defaults.</div>
  <div class="grid-main-side">
    <div class="table-wrap"><table class="tbl">
      <tr><th>Code</th><th>Discount</th><th>Min order</th><th>Cap</th><th>Type</th><th class="shrink">Actions</th></tr>
      ${all.map((c, i) => `<tr>
        <td><b style="color:var(--gold-hi)">${esc(c.code)}</b>${c.def ? ' <span class="pill gray">default</span>' : ''}</td>
        <td>${c.pct ? c.pct + '% off' : 'Flat ' + INR(c.fixed || 0)}</td>
        <td>${c.min ? INR(c.min) : '—'}</td>
        <td>${c.max ? INR(c.max) : '—'}</td>
        <td><span class="pill ${c.def ? 'gray' : 'green'}">${c.def ? 'seed' : 'custom'}</span></td>
        <td class="shrink"><div style="display:flex;gap:6px">${c.def ? '' : `<button class="btn btn-ic btn-dark" data-cpedit="${i - SEED_COUPONS.length}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg></button><button class="btn btn-ic btn-danger" data-cpdel="${i - SEED_COUPONS.length}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>`}</div></td>
      </tr>`).join('')}
    </table></div>
    <div class="card"><h3>New coupon</h3>
      <div class="field"><label>Code</label><input id="cpCode" placeholder="e.g. DIWALI25"></div>
      <div class="grid2">
        <div class="field"><label>Type</label><select id="cpType"><option value="pct">% off</option><option value="fixed">Flat ₹</option></select></div>
        <div class="field"><label>Value</label><input id="cpVal" type="number" min="0" value="10"></div>
        <div class="field"><label>Min order (₹)</label><input id="cpMin" type="number" min="0" value="499"></div>
        <div class="field"><label>Max discount (₹)</label><input id="cpMax" type="number" min="0" value="150"></div>
      </div>
      <div class="field"><label>Label</label><input id="cpLabel" placeholder="10% off orders above ₹499"></div>
      <button class="btn btn-gold btn-block" id="cpSave">Create coupon</button>
    </div>
  </div>`;
  $('#cpSave').onclick = () => {
    const code = $('#cpCode').value.trim().toUpperCase();
    if (!code || all.some(c => c.code === code)) { toast(!code ? 'Enter a coupon code' : 'Coupon already exists', 'danger'); return; }
    const val = Number($('#cpVal').value) || 0;
    const c = { code, min: Number($('#cpMin').value) || 0, max: Number($('#cpMax').value) || 0, label: $('#cpLabel').value.trim() };
    if ($('#cpType').value === 'pct') { c.pct = val; } else { c.fixed = val; }
    custom.push(c);
    LS.set(K.COUPONS, custom);
    toast('Coupon created', 'ok');
    renderCoupons();
  };
  $$('[data-cpedit]').forEach(b => b.onclick = () => editCoupon(+b.dataset.cpedit, custom));
  $$('[data-cpdel]').forEach(b => b.onclick = () => {
    custom.splice(+b.dataset.cpdel, 1);
    LS.set(K.COUPONS, custom);
    toast('Coupon deleted', 'ok');
    renderCoupons();
  });
}
function editCoupon(i, custom) {
  const c = custom[i];
  openModal(`<button class="m-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
    <div class="m-title">Edit ${esc(c.code)}</div>
    <div class="grid2">
      <div class="field"><label>Type</label><select id="cpmType"><option value="pct" ${c.pct ? 'selected' : ''}>% off</option><option value="fixed" ${c.fixed ? 'selected' : ''}>Flat ₹</option></select></div>
      <div class="field"><label>Value</label><input id="cpmVal" type="number" value="${c.pct || c.fixed || 0}"></div>
      <div class="field"><label>Min order (₹)</label><input id="cpmMin" type="number" value="${c.min || 0}"></div>
      <div class="field"><label>Max discount (₹)</label><input id="cpmMax" type="number" value="${c.max || 0}"></div>
    </div>
    <div class="field"><label>Label</label><input id="cpmLabel" value="${esc(c.label || '')}"></div>
    <div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-dark" data-close-modal="">Cancel</button><button class="btn btn-gold" id="cpmSave">Save</button></div>`);
  $('#cpmSave').onclick = () => {
    if ($('#cpmType').value === 'pct') { c.pct = Number($('#cpmVal').value) || 0; delete c.fixed; }
    else { c.fixed = Number($('#cpmVal').value) || 0; delete c.pct; }
    c.min = Number($('#cpmMin').value) || 0; c.max = Number($('#cpmMax').value) || 0;
    c.label = $('#cpmLabel').value.trim();
    LS.set(K.COUPONS, custom);
    closeModal();
    toast('Coupon saved', 'ok');
    renderCoupons();
  };
}

/* ---------------- ANALYTICS ---------------- */
function renderAnalytics() {
  const ORDRS = orders();
  const weekRev = weeklyRevenue(ORDRS);
  const top = [...PRODUCTS].sort((a, b) => b.sales - a.sales).slice(0, 8);
  const catDist = CATEGORIES.map(c => ({ name: c.name, v: PRODUCTS.filter(p => p.cat === c.id || p.sub === c.id).length })).filter(c => c.v > 0).sort((a, b) => b.v - a.v);
  const byCatSales = CATEGORIES.map(c => ({ name: c.name, v: PRODUCTS.filter(p => p.cat === c.id || p.sub === c.id).reduce((s, p) => s + p.sales, 0) })).filter(c => c.v > 0).sort((a, b) => b.v - a.v);
  const aov = ORDRS.filter(o => o.status !== 'Refunded');
  const aovAvg = Math.round(aov.reduce((s, o) => s + Number(o.total || 0), 0) / Math.max(1, aov.length));
  const conv = Math.min(99, Math.round((ORDRS.length / Math.max(1, LS.get(K.AUTH, null) ? 1 : 1)) * 100));
  setSubtitle('Store performance at a glance');
  $('#app').innerHTML = `
  <div class="section-t">Analytics</div><div class="section-s">Trends, top sellers and catalog depth.</div>
  <div class="charts-grid">
    <div class="card"><h3>Revenue trend <span class="chip pill gold">12 weeks</span></h3><div class="chart-box">${areaChart(weekRev, [], 580, 240)}</div></div>
    <div class="card"><h3>Catalog by category</h3><div class="chart-box">${barChart(catDist.map(c => ({ l: c.name.split(' ')[0], v: c.v })), 320, 240)}</div></div>
    <div class="card"><h3>Top sell-by-designs</h3><div class="chart-box">${barChart(top.map(p => ({ l: p.code.replace(/[^0-9]/g, ''), v: p.sales })), 580, 240)}</div></div>
    <div class="card"><h3>Sales share by category</h3><div class="chart-box" style="height:240px;display:flex;align-items:center;gap:18px;flex-wrap:wrap"><div style="flex:1;min-width:150px">${donutChart(byCatSales.slice(0, 6).map((c, i) => ({ v: c.v, c: ['#c9a227', '#a32727', '#3f8c6a', '#5a6eb4', '#c25454', '#8b8795'][i % 6] })), 170)}</div><div class="legend" style="flex-direction:column;gap:7px">${byCatSales.slice(0, 6).map((c, i) => `<span><i style="background:${['#c9a227', '#a32727', '#3f8c6a', '#5a6eb4', '#c25454', '#8b8795'][i % 6]}"></i>${esc(c.name)}</span>`).join('')}</div></div></div>
  </div>
  <div class="stats-grid" style="margin-top:18px">
    <div class="stat reveal in"><div class="lbl">Average order value</div><div class="val">${INR(aovAvg)}</div><span class="delta up">${fmt(ORDRS.length)} orders</span></div>
    <div class="stat reveal in"><div class="lbl">Coupons active</div><div class="val">${fmt(SEED_COUPONS.length + LS.get(K.COUPONS, []).length)}</div><span class="delta up">checkout</span></div>
    <div class="stat reveal in"><div class="lbl">Downloads granted</div><div class="val">${fmt(LS.get(K.DOWNLOADS, []).length)}</div><span class="delta up">digital</span></div>
    <div class="stat reveal in"><div class="lbl">Stitch universe</div><div class="val">${fmt(PRODUCTS.reduce((s, p) => s + p.stitches, 0))}</div><span class="delta up">stitches</span></div>
  </div>`;
}

/* ---------------- MEDIA ---------------- */
function renderMedia() {
  setSubtitle(`${fmt(PRODUCTS.length)} design previews`);
  $('#app').innerHTML = `
  <div class="section-t">Media library</div><div class="section-s">Every design’s generated preview. Hover to inspect or remove.</div>
  <div class="media-grid">
    ${PRODUCTS.map(p => `<div class="media-item">
      <button class="m-del" data-mdell="${p.id}" title="Delete design"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg></button>
      ${(p.media && p.media[0]) ? `<img src="${p.media[0].data}" alt="${esc(p.name)}" style="width:84%;height:84%;object-fit:contain">` : MP.motifArtwork(p, p.fab || 'cream', 160, { code: false })}
      <div class="m-meta"><b>${esc(p.name)}</b><div>${esc(p.code)} · ${p.stitches.toLocaleString('en-IN')} st</div></div>
    </div>`).join('')}
  </div>`;
  $$('[data-mdell]').forEach(b => b.onclick = () => {
    delProduct(+b.dataset.mdell);
    renderMedia();
  });
}

/* ---------------- SETTINGS ---------------- */
function renderSettings() {
  setSubtitle('Store identity and data');
  $('#app').innerHTML = `
  <div class="section-t">Settings</div><div class="section-s">Your storefront identity, contact and demo data.</div>
  <div class="grid-main-side">
    <div class="card"><h3>Store identity</h3>
      <div class="grid2">
        <div class="field"><label>Store name</label><input id="sName" value="${esc(settings.name)}"></div>
        <div class="field"><label>Tagline</label><input id="sTag" value="${esc(settings.tag)}"></div>
        <div class="field"><label>Design code prefix</label><input id="sCode" value="${esc(settings.code)}"></div>
        <div class="field"><label>Address</label><input id="sAddr" value="${esc(settings.address)}"></div>
        <div class="field"><label>Phone</label><input id="sPhone" value="${esc(settings.phone)}"></div>
        <div class="field"><label>WhatsApp (with country code)</label><input id="sWa" value="${esc(settings.whatsapp)}"></div>
      </div>
      <div class="field"><label>Support email</label><input id="sEmail" value="${esc(settings.email)}"></div>
      <div class="field"><label>Announcement bar (optional)</label><input id="sAnn" value="${esc(settings.announcement)}" placeholder="e.g. Flat 15% off this Diwali — code FESTIVE"></div>
      <div class="grid2">
        <div class="field"><label>Hero badge line</label><input id="sHeroBadge" value="${esc(settings.heroBadge)}" placeholder="✦ Premium Digitised Embroidery · Instant Download"></div>
        <div class="field"><label>Hero title (HTML ok — wraps with <em>)</label><input id="sHeroTitle" value="${esc(settings.heroTitle)}" placeholder="Premium Machine &lt;em&gt;Embroidery&lt;/em&gt; Designs"></div>
      </div>
      <div class="field"><label>Hero subtitle</label><input id="sHeroSub" value="${esc(settings.heroSub)}" placeholder="Beautifully digitized designs…"></div>
      <button class="btn btn-gold" id="sSave">Save settings</button>
    </div>
    <div class="stack">
      <div class="card"><h3>Payment wall <span class="chip pill gold">${settings.paywallOn ? 'ON' : 'OFF'}</span></h3>
        <p class="section-s" style="margin-bottom:14px">Gate the checkout behind UPI payment — customers pay you directly, then confirm to unlock their embroidery files.</p>
        <label style="display:flex;align-items:center;gap:10px;font-weight:700;cursor:pointer;margin-bottom:16px">
          <input type="checkbox" id="sPWon" ${settings.paywallOn ? 'checked' : ''} style="width:18px;height:18px;accent-color:#c9a227"> Enable payment wall at checkout
        </label>
        <div class="field"><label>Behaviour when wall is off</label><select id="sPWmode">
          <option value="demo" ${settings.payMode === 'demo' ? 'selected' : ''}>Demo — instant checkout (no payment)</option>
          <option value="upi" ${settings.payMode === 'upi' ? 'selected' : ''}>UPI — show UPI payment options</option>
          <option value="cod" ${settings.payMode === 'cod' ? 'selected' : ''}>Pay on delivery only</option>
        </select><div class="hint">Wall gates checkout only when enabled <b>and</b> mode is UPI.</div></div>
        <div class="field"><label>UPI ID (customers pay to this)</label><input id="sUPI" value="${esc(settings.upiId)}" placeholder="you@upi"></div>
        <div class="field"><label>Payee name (shown in payment &amp; QR)</label><input id="sPayee" value="${esc(settings.payeeName)}" placeholder="LAXMI EMBROIDERY"></div>
        <div class="field"><label>Payment instructions (shown at the wall)</label><input id="sPayNote" value="${esc(settings.payNote)}" placeholder="Scan the QR or pay via any UPI app, then confirm."></div>
        <div class="design-box" style="text-align:center"><h4 style="text-align:left">QR shown to customers</h4><div class="pw-qr" id="qrPrev" style="display:flex;justify-content:center"></div><p class="section-s" style="margin:8px 0 0">Upload your own QR image, or use the auto-generated UPI QR below.</p></div>
        <div class="field" style="margin-top:14px"><label>Your own QR image (replaces the generated one)</label>
          <div class="drop qr-drop" id="qrDrop" style="padding:22px 16px">
            <div class="ic" style="width:40px;height:40px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 16V4m0 0-4 4m4-4 4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg></div>
            <b>Click to upload QR image</b><p>PNG / JPG of your UPI QR code. Amount is not pre-filled for custom QRs — customers confirm after paying.</p>
          </div>
          <div class="file-row" id="qrUploadRow" style="${settings.payQR ? '' : 'display:none'}">
            <div class="fico">QR</div>
            <div><div class="fname">${esc(settings.payQRName || 'my-qr.png')}</div><div class="fmeta">Your QR is shown at the payoff wall.</div></div>
            <div class="factions"><button class="btn btn-ic btn-danger" id="qrRemove" title="Remove QR"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6 6 18M6 6l12 12"/></svg></button></div>
          </div>
        </div>
        <button class="btn btn-gold" id="sPWSave" style="margin-top:14px">Save payment settings</button>
        <p class="section-s" style="margin-top:12px;margin-bottom:0">Customer-facing preview: the checkout shows a payment wall step with your UPI ID, the amount due, and an "I have paid" confirmation button.</p>
      </div>
      <div class="card"><h3>Demo tools</h3>
        <button class="btn btn-dark btn-block" id="seedAgain" style="margin-bottom:10px">Reseed demo orders</button>
        <button class="btn btn-danger btn-block" id="resetAll">Reset all demo data</button>
        <p class="section-s" style="margin-top:12px;margin-bottom:0">Reset clears products, orders, customers, coupons, settings and admin session — returning the store to its seeded demo state.</p>
      </div>
      <div class="card"><h3>Storage</h3>
        <div class="legend"><span><i style="background:#c9a227"></i>Designs · ${fmt(PRODUCTS.length)}</span><span><i style="background:#3f8c6a"></i>Orders · ${fmt(orders().length)}</span><span><i style="background:#5a6eb4"></i>Customers · ${fmt(new Set(orders().map(o => (o.user || '').toLowerCase()).filter(Boolean)).size)}</span></div>
      </div>
    </div>
  </div>`;
  $('#sSave').onclick = () => {
    Object.assign(settings, {
      name: $('#sName').value.trim(), tag: $('#sTag').value.trim(), code: $('#sCode').value.trim(),
      address: $('#sAddr').value.trim(), phone: $('#sPhone').value.trim(), whatsapp: $('#sWa').value.trim(),
      email: $('#sEmail').value.trim(), announcement: $('#sAnn').value.trim(),
      heroBadge: $('#sHeroBadge').value.trim(), heroTitle: $('#sHeroTitle').value.trim() || 'Premium Machine <em>Embroidery</em> Designs',
      heroSub: $('#sHeroSub').value.trim()
    });
    LS.set(K.SETTINGS, settings);
    toast('Settings saved — refresh the storefront to see changes', 'ok');
  };
  $('#sPWSave').onclick = () => {
    settings.paywallOn = $('#sPWon').checked;
    settings.payMode = $('#sPWmode').value;
    settings.upiId = $('#sUPI').value.trim() || 'laxmiembroidery@upi';
    settings.payeeName = $('#sPayee').value.trim() || 'LAXMI EMBROIDERY';
    settings.payNote = $('#sPayNote').value.trim();
    LS.set(K.SETTINGS, settings);
    toast(settings.paywallOn && settings.payMode === 'upi' ? 'Payment wall enabled' : 'Payment settings saved', 'ok');
    renderSettings();
  };
  bindQRPrev();
  bindQRUpload();
  $('#seedAgain').onclick = () => {
    if (LS.get(K.ORDERS, null)) { toast('Demo orders already exist', 'info'); return; }
    seedOrders();
    toast('Demo orders seeded', 'ok');
  };
  $('#resetAll').onclick = () => {
    openModal(`<button class="m-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6 6 18M6 6l12 12"/></svg></button>
      <div class="m-title">Reset all demo data?</div>
      <p style="color:var(--muted);margin-bottom:22px">This wipes every storefront and admin record. The seeded demo catalog is then restored on next load.</p>
      <div style="display:flex;gap:10px;justify-content:flex-end"><button class="btn btn-dark" data-close-modal="">Cancel</button><button class="btn btn-danger" id="rsGo">Yes, reset everything</button></div>`);
    $('#rsGo').onclick = () => {
      [K.PRODUCTS, K.ORDERS, K.AUTH, K.DOWNLOADS, K.COUPONS, K.SETTINGS, K.CATS, K.COLLS, 'laxmi_cart', 'laxmi_wish'].forEach(k => LS.del(k));
      LS.del(K.ADMIN);
      closeModal();
      location.reload();
    };
  };
}

function qrPreview(upi, payee) {
  if (settings.payQR) return `<img class="pw-qr-img" src="${settings.payQR}" alt="Store QR" style="width:150px">`;
  try {
    const qr = qrcode(0, 'M');
    qr.addData('upi://pay?pa=' + encodeURIComponent(upi || '') + '&pn=' + encodeURIComponent(payee || '') + '&am=100.00&cu=INR&tn=LAXMI-EMBROIDERY');
    qr.make();
    return qr.createSvgTag(3, 2);
  } catch (e) {
    return '<span style="color:var(--dim)">Enter a UPI ID to preview your QR</span>';
  }
}
function bindQRPrev() {
  const upd = () => { const el = $('#qrPrev'); if (el) el.innerHTML = qrPreview($('#sUPI').value, $('#sPayee').value); };
  const u = $('#sUPI'), p = $('#sPayee');
  if (u) u.addEventListener('input', upd);
  if (p) p.addEventListener('input', upd);
  upd();
}
function bindQRUpload() {
  const drop = $('#qrDrop');
  if (!drop) return;
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*';
  drop.onclick = () => input.click();
  drop.ondragover = (e) => { e.preventDefault(); drop.classList.add('over'); };
  drop.ondragleave = () => drop.classList.remove('over');
  drop.ondrop = (e) => { e.preventDefault(); drop.classList.remove('over'); if (e.dataTransfer && e.dataTransfer.files[0]) readQR(e.dataTransfer.files[0]); };
  input.onchange = () => { if (input.files[0]) readQR(input.files[0]); input.value = ''; };
  document.addEventListener('drop', (e) => e.preventDefault(), false);
  document.addEventListener('dragover', (e) => e.preventDefault(), false);
  const rm = $('#qrRemove');
  if (rm) rm.onclick = () => {
    settings.payQR = null; settings.payQRName = '';
    $('#qrUploadRow').style.display = 'none';
    bindQRPrev();
    toast('Custom QR removed', 'ok');
  };
}
function readQR(f) {
  if (!/image\/(png|jpe?g|webp|gif)/.test(f.type)) { toast('Please upload a PNG/JPG image', 'danger'); return; }
  if (f.size > 300 * 1024) { toast('Image too large (keep under 300 KB)', 'danger'); return; }
  const r = new FileReader();
  r.onload = () => {
    settings.payQR = r.result; settings.payQRName = f.name;
    $('#qrUploadRow').style.display = '';
    $('#qrUploadRow').querySelector('.fname').textContent = f.name;
    bindQRPrev();
    toast('QR image added — save payment settings to keep it', 'ok');
  };
  r.readAsDataURL(f);
}

/* ---------------- Init ---------------- */
seedOrders();
document.addEventListener('click', (e) => { if (e.target.id === 'modalBack') closeModal(); });
$('#burger').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
bindLogin();
window.addEventListener('hashchange', router);
router();