/* =====================================================================
   LAXMI EMBROIDERY — shared procedural embroidery artwork engine
   Pure SVG, dependency-free. Exposes window.MP.
   ===================================================================== */
'use strict';
var MP = (function () {
  const FABRICS = {
    black: '#191613', white: '#f5f2e9', cream: '#e9e0cb', maroon: '#6e1f1f',
    green: '#1f4034', navy: '#1c2a44', pink: '#d98fb0', gold: '#b8902f'
  };
  const THREAD = {
    gold: '#e5c76b', maroon: '#a32727', deep: '#2a2622', rust: '#b95b2c',
    teal: '#2f7a6d', emerald: '#2f6b4a', pink: '#d98fb0', rose: '#c9627a',
    sky: '#7fa6c9', red: '#b32727', green: '#3f8c6a', cream: '#efe8d8',
    ink: '#232323', plum: '#6b3f8a', black: '#171717'
  };
  const thread = (key, fallback) => THREAD[key] || THREAD[fallback || 'gold'];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function fabricBg(fab) {
    const c = FABRICS[fab] || FABRICS.cream;
    const d = (fab === 'black' || fab === 'maroon' || fab === 'green' || fab === 'navy') ? 'rgba(255,255,255,.03)' : 'rgba(0,0,0,.03)';
    return `
    <rect width="100%" height="100%" fill="${c}"/>
    <defs>
      <pattern id="weave${fab}" width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M0 3h6M3 0v6" stroke="${d}" stroke-width="1"/>
      </pattern>
      <radialGradient id="vign${fab}" cx="50%" cy="42%" r="75%">
        <stop offset="0%" stop-color="${c}" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000" stop-opacity=".38"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#weave${fab})"/>
    <rect width="100%" height="100%" fill="url(#vign${fab})"/>`;
  }

  function roundDots(cx, cy, r, n, color, sc) {
    let acc = '';
    for (let i = 0; i < n; i++) {
      const a = i * 360 / n * Math.PI / 180;
      acc += `<circle cx="${(cx + Math.cos(a) * r).toFixed(1)}" cy="${(cy + Math.sin(a) * r).toFixed(1)}" r="${(3.5 * sc).toFixed(1)}" fill="${color}"/>`;
    }
    return acc;
  }

  function motifArtwork(p, fab, size, opts) {
    const m = p.motif || 'motif';
    const t1 = thread(p.hue1), t2 = thread(p.hue2, 'maroon'), t3 = thread(p.hue1 === 'gold' ? 'deep' : 'gold');
    const accent = thread(p.hue1 === 'gold' ? p.hue2 : p.hue1, 'maroon');
    const sc = size / 420;
    const S = (n) => (n * sc).toFixed(1);
    const sS = (n) => (n * sc).toFixed(1);
    let inner = '';
    const cx = 210, cy = 210;
    opts = opts || {};

    const petals = (rOut, rIn, n, rot, fill, stroke, w, dash) => {
      let acc = '';
      for (let i = 0; i < n; i++) {
        const a = (rot + i * 360 / n) * Math.PI / 180;
        const x = cx + Math.cos(a) * rOut, y = cy + Math.sin(a) * rOut;
        acc += `<ellipse cx="${S(x)}" cy="${S(y)}" rx="${sS(rIn)}" ry="${sS(rIn * 1.55)}" transform="rotate(${(rot + i * 360 / n).toFixed(0)} ${S(cx)} ${S(cy)})" fill="${fill}" ${w ? `stroke="${stroke}" stroke-width="${w}"` : ''} stroke-dasharray="${dash || ''}"/>`;
      }
      return acc;
    };
    const ring = (r, color, w, dash) => `<circle cx="${S(cx)}" cy="${S(cy)}" r="${S(r)}" fill="none" stroke="${color}" stroke-width="${w}" stroke-dasharray="${dash}"/>`;
    const dots = (rr, n, color) => { let a = ''; for (let i = 0; i < n; i++) { const ang = i * 360 / n * Math.PI / 180; const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr; a += `<circle cx="${S(x)}" cy="${S(y)}" r="${sS(3.2)}" fill="${color}"/>`; } return a; };

    switch (m) {
      case 'floral':
      case 'front-neck':
        inner = `
          ${ring(185, t1, 1.6, '2 4')}
          ${petals(0, 78, 10, 0, 'none', t1, 1.4, '5 4')}
          ${petals(0, 96, 10, 18, 'none', accent, 1.2, '3 4')}
          ${petals(90, 42, 6, 30, 'none', t2, 1.5, '3 3')}
          ${ring(120, t3, 1.3, '2 5')}
          <circle cx="${S(cx)}" cy="${S(cy)}" r="${S(30)}" fill="none" stroke="${t1}" stroke-width="1.4" stroke-dasharray="3 3"/>
          ${dots(150, 12, t1)}
          <path d="M ${S(cx - 95)} ${S(cy + 95)} q ${S(60)} ${S(-40)} ${S(95)} ${S(-95)}" fill="none" stroke="${t2}" stroke-width="2" stroke-dasharray="4 4" opacity=".8"/>
          <path d="M ${S(cx + 95)} ${S(cy + 95)} q ${S(-60)} ${S(-40)} ${S(-95)} ${S(-95)}" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="4 4" opacity=".8"/>`;
        break;
      case 'back-neck':
        inner = `
          <path d="M ${S(150)} ${S(60)} L ${S(cx)} ${S(200)} L ${S(270)} ${S(60)}" fill="none" stroke="${t1}" stroke-width="2" stroke-dasharray="6 4"/>
          <path d="M ${S(170)} ${S(80)} L ${S(cx)} ${S(195)} L ${S(250)} ${S(80)}" fill="none" stroke="${accent}" stroke-width="5" opacity=".9"/>
          <path d="M ${S(150)} ${S(60)} q ${S(-30)} ${S(40)} 0 ${S(90)} M ${S(270)} ${S(60)} q ${S(30)} ${S(40)} 0 ${S(90)}" fill="none" stroke="${t1}" stroke-width="1.6" stroke-dasharray="4 4"/>
          ${petals(195, 24, 10, 0, 'none', t2, 1.3, '3 4')}
          <circle cx="${S(cx)}" cy="${S(240)}" r="${S(14)}" fill="none" stroke="${t1}" stroke-width="1.6" stroke-dasharray="3 3"/>
          <path d="M ${S(cx)} ${S(254)} q ${S(9)} ${S(16)} 0 ${S(30)} q ${S(-9)} ${S(16)} 0 ${S(30)}" fill="none" stroke="${t1}" stroke-width="1.4"/>`;
        break;
      case 'butta':
        inner = `
          <path d="M ${S(95)} ${S(300)} C ${S(60)} ${S(180)} ${S(150)} ${S(95)} ${S(cx)} ${S(80)} C ${S(270)} ${S(95)} ${S(360)} ${S(180)} ${S(325)} ${S(300)} C ${S(300)} ${S(360)} ${S(120)} ${S(360)} ${S(95)} ${S(300)} Z" fill="none" stroke="${t1}" stroke-width="2" stroke-dasharray="5 3"/>
          <path d="M ${S(cx)} ${S(90)} C ${S(230)} ${S(210)} ${S(210)} ${S(300)} ${S(210)} ${S(330)}" fill="none" stroke="${accent}" stroke-width="4" opacity=".85"/>
          <path d="M ${S(cx)} ${S(95)} q ${S(-34)} ${S(90)} 0 ${S(200)} q ${S(34)} ${S(-90)} 0 ${S(-200)}" fill="none" stroke="${t2}" stroke-width="1.6" stroke-dasharray="4 4"/>
          ${ring(58, t1, 1.5, '3 3')}
          ${ring(86, t3, 1.2, '2 5')}
          <circle cx="${S(cx)}" cy="${S(120)}" r="${S(16)}" fill="none" stroke="${t1}" stroke-width="1.5"/>
          <path d="M ${S(140)} ${S(196)} q ${S(70)} ${S(60)} ${S(140)} ${S(0)} M ${S(150)} ${S(232)} q ${S(60)} ${S(48)} ${S(120)} ${S(0)}" fill="none" stroke="${t3}" stroke-width="1.2" stroke-dasharray="3 4"/>`;
        break;
      case 'mandala':
        inner = `
          ${ring(190, t1, 1.5, '2 4')}
          ${ring(160, t3, 1.3, '2 5')}
          ${ring(128, accent, 1.4, '3 3')}
          ${ring(96, t1, 1.4, '2 4')}
          ${petals(0, 30, 12, 0, 'none', t2, 1.5, '3 3')}
          ${petals(0, 56, 16, 11, 'none', t1, 1.2, '2 4')}
          ${petals(0, 84, 12, 22, 'none', t3, 1.4, '3 3')}
          ${dots(158, 24, t1)}
          <circle cx="${S(cx)}" cy="${S(cy)}" r="${S(22)}" fill="none" stroke="${t1}" stroke-width="1.4" stroke-dasharray="3 3"/>`;
        break;
      case 'arabic':
        inner = `
          <path d="M ${S(60)} ${S(120)} L ${S(150)} ${S(60)} L ${S(240)} ${S(60)} L ${S(320)} ${S(120)}" fill="none" stroke="${t1}" stroke-width="2" stroke-dasharray="5 4"/>
          <path d="M ${S(60)} ${S(290)} L ${S(150)} ${S(360)} L ${S(240)} ${S(360)} L ${S(320)} ${S(290)}" fill="none" stroke="${accent}" stroke-width="2" stroke-dasharray="5 4"/>
          <path d="M ${S(cx)} ${S(70)} L ${S(cx)} ${S(350)} M ${S(150)} ${S(90)} L ${S(230)} ${S(330)} M ${S(270)} ${S(90)} L ${S(190)} ${S(330)}" fill="none" stroke="${t1}" stroke-width="1.4" stroke-dasharray="3 4"/>
          ${ring(120, t2, 1.6, '4 3')}
          ${ring(88, t1, 1.2, '2 5')}
          <circle cx="${S(cx)}" cy="${S(cy)}" r="${S(30)}" fill="none" stroke="${accent}" stroke-width="1.5"/>
          ${Array.from({ length: 8 }, (_, i) => { const a = i * 45 * Math.PI / 180; const x = cx + Math.cos(a) * 150, y = cy + Math.sin(a) * 150; return `<path d="M ${S(x)} ${S(y)} l ${sS(8)} ${sS(8)} l ${sS(-8)} ${sS(8)} l ${sS(-8)} ${sS(-8)} Z" fill="${t1}"/>`; }).join('')}`;
        break;
      case 'bridal':
        inner = `
          ${ring(190, t1, 1.8, '3 5')}
          ${petals(0, 70, 12, 0, 'none', t2, 1.5, '4 3')}
          ${petals(0, 52, 12, 15, 'none', t1, 1.2, '2 4')}
          ${ring(116, accent, 1.6, '3 3')}
          ${Array.from({ length: 12 }, (_, i) => { const a = i * 30 * Math.PI / 180; const r = 160; const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r; return `<circle cx="${S(x)}" cy="${S(y)}" r="${sS(6)}" fill="none" stroke="${t1}" stroke-width="1.2"/>` + `<circle cx="${S(x)}" cy="${S(y)}" r="${sS(2)}" fill="${t2}"/>`; }).join('')}
          ${Array.from({ length: 12 }, (_, i) => { const x = cx + 90 + Math.cos(i) * 14, y = cy - 40 + Math.sin(i) * 14; return `<path d="M ${S(x)} ${S(y)} q ${S(4)} ${S(-6)} ${sS(2)} ${sS(-14)}" stroke="${t3}" stroke-width="1.3" fill="none"/>`; }).join('')}
          <circle cx="${S(cx)}" cy="${S(cy)}" r="${S(28)}" fill="none" stroke="${t1}" stroke-width="1.5" stroke-dasharray="3 3"/>`;
        break;
      case 'traditional':
        inner = `
          <path d="M ${S(110)} ${S(330)} q ${S(-50)} ${S(-40)} 0 ${S(-90)} q ${S(50)} ${S(-40)} ${S(100)} ${S(-40)} q ${S(50)} ${S(0)} ${S(100)} ${S(40)} q ${S(50)} ${S(40)} 0 ${S(90)}" fill="none" stroke="${t1}" stroke-width="2" stroke-dasharray="5 4"/>
          <path d="M ${S(135)} ${S(300)} q ${S(-30)} ${S(-30)} 0 ${S(-70)} q ${S(30)} ${S(-30)} ${S(75)} ${S(-30)} q ${S(45)} ${S(0)} ${S(75)} ${S(30)} q ${S(30)} ${S(30)} 0 ${S(70)}" fill="none" stroke="${accent}" stroke-width="4" opacity=".85"/>
          ${Array.from({ length: 7 }, (_, i) => `<path d="M ${S(60 + i * 50)} ${S(360)} q 0 ${sS(-14)} ${sS(12)} ${sS(-40)}" stroke="${t2}" stroke-width="1.4" fill="none" stroke-dasharray="3 3"/>`).join('')}
          ${ring(120, t3, 1.2, '2 5')}
          ${ring(95, t1, 1.4, '3 4')}
          ${petals(150, 10, 6, 30, 'none', t1, 1.1, '2 3')}`;
        break;
      case 'zari':
        inner = `
          <path d="M ${S(90)} ${S(330)} C ${S(70)} ${S(190)} ${S(150)} ${S(100)} ${S(cx)} ${S(85)} C ${S(270)} ${S(100)} ${S(350)} ${S(190)} ${S(330)} ${S(330)} Z" fill="none" stroke="${t1}" stroke-width="1.8"/>
          <path d="M ${S(cx)} ${S(95)} C ${S(245)} ${S(220)} ${S(220)} ${S(300)} ${S(215)} ${S(335)} M ${S(cx)} ${S(95)} C ${S(175)} ${S(220)} ${S(200)} ${S(300)} ${S(205)} ${S(335)}" fill="none" stroke="${t1}" stroke-width="1.3" stroke-dasharray="4 3"/>
          ${ring(70, t1, 1.5, '3 3')}
          ${petals(92, 16, 8, 22, 'none', accent, 1.3, '3 4')}
          ${dots(135, 14, t1)}`;
        break;
      case 'rose':
        inner = `
          ${petals(0, 40, 10, 0, 'none', t1, 1.6, '4 4')}
          ${petals(52, 26, 8, 22, 'none', accent, 1.3, '3 4')}
          <path d="M ${S(90)} ${S(190)} q ${S(-30)} ${S(-70)} ${S(20)} ${S(-120)} M ${S(120)} ${S(215)} q ${S(20)} ${S(-60)} ${S(70)} ${S(-95)} M ${S(300)} ${S(190)} q ${S(30)} ${S(-60)} ${sS(-15)} ${sS(-115)}" stroke="${t2}" stroke-width="1.5" fill="none" stroke-dasharray="4 3"/>
          ${Array.from({ length: 8 }, (_, i) => `<ellipse cx="${S(cx - 120 + i * 38)}" cy="${S(260)}" rx="${sS(12)}" ry="${sS(20)}" fill="none" stroke="${t1}" stroke-width="1.2" transform="rotate(${i % 2 ? 15 : -15} ${S(cx - 120 + i * 38)} ${S(260)})"/>`).join('')}`;
        break;
      case 'leaf':
        inner = `
          <path d="M ${S(210)} ${S(40)} q ${S(-70)} ${S(60)} ${S(-60)} ${S(160)} q ${S(60)} ${S(60)} ${S(60)} ${S(160)} q ${S(70)} ${S(-80)} ${S(60)} ${S(-160)} q ${S(10)} ${S(-100)} ${sS(-60)} ${sS(-160)} Z" fill="none" stroke="${t1}" stroke-width="1.8" stroke-dasharray="5 4"/>
          <path d="M ${S(210)} ${S(50)} q ${S(8)} ${S(140)} 0 ${S(340)}" stroke="${t2}" stroke-width="1.2" stroke-dasharray="3 3"/>
          ${Array.from({ length: 7 }, (_, i) => `<path d="M ${S(200 + i * 4)} ${S(120 + i * 45)} q ${sS(-14)} ${sS(8)} ${sS(-30)} ${sS(4)} M ${S(214 + i * 4)} ${S(110 + i * 45)} q ${sS(14)} ${sS(8)} ${sS(30)} ${sS(4)}" stroke="${accent}" stroke-width="1.3" fill="none"/>`).join('')}
          <circle cx="${S(210)}" cy="${S(300)}" r="${S(44)}" fill="none" stroke="${t1}" stroke-width="1.3" stroke-dasharray="3 4"/>`;
        break;
      case 'paisley':
        inner = `
          <path d="M ${S(95)} ${S(300)} C ${S(50)} ${S(170)} ${S(160)} ${S(90)} ${S(cx)} ${S(75)} C ${S(320)} ${S(90)} ${S(360)} ${S(220)} ${S(300)} ${S(310)} q ${S(-70)} ${S(40)} ${sS(-120)} ${sS(-10)} Z" fill="none" stroke="${t1}" stroke-width="2" stroke-dasharray="5 3"/>
          <path d="M ${S(cx)} ${S(85)} C ${S(240)} ${S(220)} ${S(220)} ${S(290)} ${S(205)} ${S(330)}" fill="none" stroke="${accent}" stroke-width="4" opacity=".85"/>
          ${ring(52, t1, 1.5, '2 4')}
          ${roundDots(cx, cy + 20, 34, 8, t3, sc)}
          ${Array.from({ length: 6 }, (_, i) => `<circle cx="${S(300 - i * 16)}" cy="${S(120 + i * 26)}" r="${sS(3.5)}" fill="${t2}"/>`).join('')}`;
        break;
      case 'border':
        inner = `
          ${Array.from({ length: 7 }, (_, i) => {
            const x = 30 + i * 60;
            return `<circle cx="${S(x)}" cy="${S(150)}" r="${S(26)}" fill="none" stroke="${t1}" stroke-width="1.5" stroke-dasharray="4 3"/>
                    <circle cx="${S(x)}" cy="${S(150)}" r="${S(10)}" fill="none" stroke="${accent}" stroke-width="1.3"/>
                    <path d="M ${S(x + 50)} ${S(120)} q ${S(8)} ${S(30)} 0 ${S(60)} M ${S(x - 50)} ${S(120)} q ${sS(-8)} ${sS(30)} 0 ${sS(60)}" stroke="${t2}" stroke-width="1.4" fill="none" stroke-dasharray="3 3"/>`;
          }).join('')}
          <path d="M ${S(20)} ${S(200)} h ${S(380)} M ${S(20)} ${S(218)} h ${S(380)}" stroke="${t1}" stroke-width="1.4" stroke-dasharray="6 4"/>`;
        break;
      case 'kid':
        inner = `
          <circle cx="${S(cx)}" cy="${S(180)}" r="${S(52)}" fill="none" stroke="${t1}" stroke-width="4"/>
          <path d="M ${S(cx)} ${S(232)} v ${S(40)} M ${S(180)} ${S(262)} l ${sS(-14)} ${sS(-30)} M ${S(240)} ${S(262)} l ${sS(14)} ${sS(-30)} M ${S(196)} ${S(272)} l ${sS(14)} ${sS(30)} M ${S(224)} ${S(272)} l ${sS(-14)} ${sS(30)}" stroke="${t1}" stroke-width="3" stroke-linecap="round"/>
          <circle cx="${S(190)}" cy="${S(168)}" r="${sS(4)}" fill="${accent}"/><circle cx="${S(230)}" cy="${S(168)}" r="${sS(4)}" fill="${accent}"/>
          <path d="M ${S(198)} ${S(192)} q ${S(12)} ${S(10)} ${S(24)} ${S(0)}" fill="none" stroke="${t1}" stroke-width="2.4"/>
          ${dots(80, 12, accent)}`;
        break;
      default:
        inner = `${ring(180, t1, 1.5, '2 4')}${ring(140, accent, 1.3, '3 4')}${petals(0, 40, 8, 0, 'none', t1, 1.4, '4 3')}${ring(70, t2, 1.4, '3 3')}<circle cx="${S(cx)}" cy="${S(cy)}" r="${S(18)}" fill="none" stroke="${t1}" stroke-width="1.4"/>`;
    }

    const codeTxt = opts.code !== false ? `<text x="50%" y="96%" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="${sS(16)}" fill="${opts.codeOnDark ? '#cfc6a8' : 'rgba(0,0,0,.32)'}">${esc(p.code)}</text>` : '';
    return `<svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" role="img" aria-label="${esc(p.name || p.cat || '')}">
      ${fabricBg(fab || 'cream')}
      <g transform="scale(${sc})">${inner}</g>
      ${codeTxt}
    </svg>`;
  }

  const CAT_MOTIF = { 'front-neck': 'front-neck', 'back-neck': 'back-neck', 'sleeve-buttas': 'butta', 'borders': 'border', 'motifs': 'mandala', 'bridal': 'bridal', 'arabic': 'arabic', 'traditional': 'traditional', 'kids': 'kid', 'floral': 'floral', 'applique': 'rose', 'zari': 'zari' };
  function catArt(catId, fab) {
    return motifArtwork({ id: catId, name: catId, code: '', motif: CAT_MOTIF[catId] || 'motif', hue1: 'gold', hue2: 'maroon' }, fab || 'cream', 420, { code: false });
  }
const COLL_ART = { floral: 'floral', bridal: 'bridal', leaf: 'leaf', mandala: 'mandala', motif: 'butta', rose: 'rose' };
  function collArt(id, colls) {
    if (!colls && typeof window !== 'undefined') colls = window._MP_COLLS;
    const c = (colls || []).find(x => x && String(x.id) === String(id));
    return motifArtwork({ code: '', motif: COLL_ART[(c && c.img) || 'motif'] || 'butta', hue1: 'gold', hue2: 'maroon' }, 'black', 420, { code: false });
  }

  return { FABRICS, THREAD, motifArtwork, catArt, collArt };
})();
if (typeof window !== 'undefined') window.MP = MP;
