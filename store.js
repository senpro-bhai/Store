// ═══════════════════════════════════════════════════
//  MYTHICALLIFE STORE — Shared State & Utilities
// ═══════════════════════════════════════════════════

const STORE_KEY = 'mcs8';

const DEFAULT_STATE = {
  // Appearance
  name: 'MythicalLife Store',
  emoji: '⛏️',
  logo: '',
  banner: '',
  bannerTitle: 'MYTHICAL|LIFE',
  bannerSub: 'Buy ranks, keys, cosmetics. Delivered instantly in-game!',
  serverIP: 'play.mythicallife.net',
  players: 572,
  discord: 'https://discord.gg/mythicallife',
  discCount: 5552,

  // Welcome section
  welcomeTag: 'WELCOME TO THE OFFICIAL',
  welcomeTitle: 'MYTHICALLIFE STORE',
  welcomeDesc: 'MythicalLife is a free-to-play Minecraft Server. Items purchased here enhance your gameplay.\n\nTo begin, please select a gamemode from the sidebar.',
  supportText: 'Need help? Contact staff on Discord or submit a support ticket.',
  supportEmail: '',

  // Footer / legal
  footer: 'Copyright © MythicalLife 2025. All Rights Reserved.\nWe are not affiliated with Mojang AB.',
  tos: '', refund: '', privacy: '',
  refundText: 'All payments are final and non-refundable. Attempting a chargeback will result in permanent and irreversible banishment from all of our servers.',
  tosText: 'By purchasing from our store, you agree to our terms. All items are digital goods delivered in-game.',
  agreements: [
    'I agree with the Terms and Conditions of this purchase.',
    'I confirm that I am either over 16 or have guardian permission, and I consent to the collection and use of my data.',
    'I verify that the Minecraft account username I am using is correct.'
  ],

  // Announcement bar
  annEnabled: true,
  annText: '🔥 Sale is Live! Use Code: SAVE20 for 20% OFF | Ends 31st March',
  annColor: 'gold',

  // Theme
  theme: 'gold',
  mode: 'dark',

  // Admin
  adminPass: 'admin123',

  // Payment
  payMethods: [
    { id: 1, name: 'UPI', icon: '📱', detail: 'yourname@upi', qr: '', enabled: true },
    { id: 2, name: 'PayPal', icon: '💳', detail: 'pay@example.com', qr: '', enabled: false },
  ],
  payIns: 'After payment, send screenshot to our Discord for fast delivery!',

  // Integrations
  webhook: '', webhookName: 'MythicalLife Store', webhookAvatar: '',
  rconIP: '', rconPort: '25575', rconPass: '',

  // Gamemodes
  gamemodes: [
    { id: 1, name: 'Survival', icon: '⚔️', img: '', sub: 'Click to view ▶',
      categories: ['Ranks', 'Coins', 'Crate Keys', 'Cosmetics', 'Kits', 'Other'] },
    { id: 2, name: 'Lifesteal', icon: '❤️', img: '', sub: 'Click to view ▶',
      categories: ['Lifesteal Ranks', 'Coins', 'Crate Keys', 'Other'] },
    { id: 3, name: 'Bedwars', icon: '🛏️', img: '', sub: 'Click to view ▶',
      categories: ['Ranks', 'Coins', 'Kits', 'Other'] },
    { id: 4, name: 'SkyWars', icon: '☁️', img: '', sub: 'Click to view ▶',
      categories: ['Ranks', 'Coins', 'Kits', 'Other'] },
  ],

  // Products
  products: [
    { id: 1, name: 'GOD Rank (+3600 Coins)', inr: 2200, usd: 27.00, origInr: 0, gm: 'Survival', cat: 'Ranks',
      icon: '👑', desc: '♦ Access to /fly\n♦ Access to /nick\n♦ Access to /hat\n♦ Access to /kit god\n&eOther:\n♦ 3600 Coins', img: '', screenshot: '', status: 'featured', cmd: 'rank add {ign} GOD', featured: 1 },
    { id: 2, name: 'VIP Rank', inr: 799, usd: 9.99, origInr: 1199, gm: 'Survival', cat: 'Ranks',
      icon: '⭐', desc: '♦ Access to /fly\n♦ Access to /kit vip\n♦ 3 Homes\n&eOther:\n♦ VIP Prefix &6[VIP]', img: '', screenshot: '', status: 'popular', cmd: 'rank add {ign} VIP', featured: 0 },
    { id: 3, name: '5000 Coins', inr: 399, usd: 4.99, origInr: 0, gm: 'Survival', cat: 'Coins',
      icon: '🪙', desc: '♦ 5000 In-game Coins\n♦ Use in /shop\n♦ Trade with players\n♦ Instant delivery', img: '', screenshot: '', status: 'active', cmd: 'eco give {ign} 5000', featured: 0 },
    { id: 4, name: 'Legendary Crate Key ×5', inr: 649, usd: 7.99, origInr: 999, gm: 'Survival', cat: 'Crate Keys',
      icon: '🗝️', desc: '♦ 5× Legendary Crate Keys\n♦ Chance for rare items\n♦ Instant delivery', img: '', screenshot: '', status: 'sale', cmd: 'give {ign} crate_key 5', featured: 0 },
    { id: 5, name: 'GOD Rank', inr: 2200, usd: 27.00, origInr: 0, gm: 'Lifesteal', cat: 'Lifesteal Ranks',
      icon: '👑', desc: '♦ All commands\n♦ /fly enabled\n♦ &c3600 Coins bonus', img: '', screenshot: '', status: 'featured', cmd: 'lsrank add {ign} GOD', featured: 1 },
    { id: 6, name: 'VIP Rank', inr: 799, usd: 9.99, origInr: 0, gm: 'Bedwars', cat: 'Ranks',
      icon: '⭐', desc: '♦ Special cosmetics\n♦ VIP kit access\n♦ Exclusive trails', img: '', screenshot: '', status: 'popular', cmd: 'bw rank add {ign} VIP', featured: 1 },
  ],

  // Coupons & Gift Cards
  coupons: [{ code: 'SAVE20', disc: 20, uses: 0, maxUses: 0, expiry: '' }],
  giftCards: [{ code: 'GIFT-ML50', value: 50, used: false }],

  // Orders & Cart
  cart: [],
  orders: []
};

// ── State Management ──────────────────────────────
function getState() {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (!saved) return JSON.parse(JSON.stringify(DEFAULT_STATE));
    const s = JSON.parse(saved);
    // Merge missing keys from default
    for (const k in DEFAULT_STATE) {
      if (!(k in s)) s[k] = JSON.parse(JSON.stringify(DEFAULT_STATE[k]));
    }
    return s;
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}
function saveState(s) { localStorage.setItem(STORE_KEY, JSON.stringify(s)); }

// ── User Session ──────────────────────────────────
function getIGN() { return localStorage.getItem('mc_ign8') || ''; }
function isBedrock() { return localStorage.getItem('mc_bedrock8') === '1'; }
function setUser(ign, bedrock) {
  localStorage.setItem('mc_ign8', ign);
  localStorage.setItem('mc_bedrock8', bedrock ? '1' : '0');
}
function logout() {
  localStorage.removeItem('mc_ign8');
  localStorage.removeItem('mc_bedrock8');
}

// ── Cart ─────────────────────────────────────────
function getCart(s) { return s.cart || []; }
function addToCart(s, productId) {
  const p = s.products.find(x => x.id === productId);
  if (!p) return false;
  const existing = s.cart.find(x => x.id === productId);
  if (existing) { existing.qty = (existing.qty || 1) + 1; }
  else { s.cart.push({ id: productId, qty: 1 }); }
  return true;
}
function removeFromCart(s, productId) {
  s.cart = s.cart.filter(x => x.id !== productId);
}
function clearCart(s) { s.cart = []; }
function cartTotal(s, currency) {
  return s.cart.reduce((sum, item) => {
    const p = s.products.find(x => x.id === item.id);
    if (!p) return sum;
    const price = currency === 'USD' ? (p.usd * (item.qty || 1)) : (p.inr * (item.qty || 1));
    return sum + price;
  }, 0);
}

// ── Currency ─────────────────────────────────────
function getCurrency() { return localStorage.getItem('mc_cur8') || 'INR'; }
function setCurrency(c) { localStorage.setItem('mc_cur8', c); }
function fmtPrice(inr, usd, currency) {
  if (currency === 'USD') return `$${Number(usd).toFixed(2)} USD`;
  return `₹${inr} INR`;
}

// ── Color Codes ───────────────────────────────────
const MC_COLORS = {
  '0':'#000000','1':'#0000aa','2':'#00aa00','3':'#00aaaa','4':'#aa0000',
  '5':'#aa00aa','6':'#ffaa00','7':'#aaaaaa','8':'#555555','9':'#5555ff',
  'a':'#55ff55','b':'#55ffff','c':'#ff5555','d':'#ff55ff','e':'#ffff55','f':'#ffffff'
};
function parseColors(text) {
  if (!text) return '';
  let out = '', i = 0, spans = 0;
  while (i < text.length) {
    if (text[i] === '&' && i + 1 < text.length) {
      const c = text[i+1].toLowerCase();
      if (MC_COLORS[c]) { out += `<span style="color:${MC_COLORS[c]}">`;spans++;i+=2;continue; }
      if (c === 'l') { out += '<strong>';i+=2;continue; }
      if (c === 'o') { out += '<em>';i+=2;continue; }
      if (c === 'r') { for(let j=0;j<spans;j++)out+='</span>';spans=0;i+=2;continue; }
    }
    if (text[i] === '\n') { out += '<br>';i++;continue; }
    out += (text[i]==='<'?'&lt;':text[i]==='>'?'&gt;':text[i]);
    i++;
  }
  for (let j=0;j<spans;j++) out += '</span>';
  return out;
}

// ── Theme ─────────────────────────────────────────
const THEME_COLORS = {
  gold:   { p:'#f5a718',p2:'#e09000',p3:'#ffc94a',pa:'#c07000',bg:'#0f0f13',bg2:'#16161d',bg3:'#1e1e28',bg4:'#252532',bg5:'#2e2e3d' },
  orange: { p:'#f97316',p2:'#ea580c',p3:'#fb923c',pa:'#c2410c',bg:'#100800',bg2:'#1c0e00',bg3:'#261400',bg4:'#301a00',bg5:'#3a2000' },
  green:  { p:'#22c55e',p2:'#16a34a',p3:'#4ade80',pa:'#15803d',bg:'#050f08',bg2:'#0a1a0f',bg3:'#0f2416',bg4:'#162d1c',bg5:'#1c3622' },
  blue:   { p:'#3b82f6',p2:'#2563eb',p3:'#60a5fa',pa:'#1d4ed8',bg:'#020b18',bg2:'#071224',bg3:'#0c1a2e',bg4:'#112338',bg5:'#162c42' },
  red:    { p:'#ef4444',p2:'#dc2626',p3:'#f87171',pa:'#b91c1c',bg:'#120303',bg2:'#1e0505',bg3:'#280707',bg4:'#320a0a',bg5:'#3c0d0d' },
  purple: { p:'#a855f7',p2:'#9333ea',p3:'#c084fc',pa:'#7c3aed',bg:'#080510',bg2:'#110a1e',bg3:'#180f2a',bg4:'#1e1436',bg5:'#241940' },
  cyan:   { p:'#06b6d4',p2:'#0891b2',p3:'#22d3ee',pa:'#0e7490',bg:'#020e12',bg2:'#051820',bg3:'#07222c',bg4:'#092c38',bg5:'#0b3644' },
  pink:   { p:'#ec4899',p2:'#db2777',p3:'#f472b6',pa:'#be185d',bg:'#100518',bg2:'#1a082a',bg3:'#220c38',bg4:'#2a1044',bg5:'#321450' },
  lime:   { p:'#84cc16',p2:'#65a30d',p3:'#a3e635',pa:'#4d7c0f',bg:'#060d00',bg2:'#0d1800',bg3:'#142000',bg4:'#1a2800',bg5:'#203000' },
  white:  { p:'#e5e5e5',p2:'#aaaaaa',p3:'#ffffff',pa:'#888888',bg:'#0a0a0a',bg2:'#141414',bg3:'#1e1e1e',bg4:'#282828',bg5:'#323232' },
};
const LIGHT_OVERRIDES = {
  bg:'#f0f0f0',bg2:'#ffffff',bg3:'#ebebeb',bg4:'#dedede',bg5:'#d0d0d0',
  text:'#111111',text2:'#555555',text3:'#888888',border:'rgba(0,0,0,.1)',borderP:'rgba(0,0,0,.2)'
};

function applyTheme(theme, mode) {
  const t = THEME_COLORS[theme] || THEME_COLORS.gold;
  const r = document.documentElement.style;
  r.setProperty('--p', t.p); r.setProperty('--p2', t.p2);
  r.setProperty('--p3', t.p3); r.setProperty('--pa', t.pa);
  if (mode === 'light') {
    r.setProperty('--bg', LIGHT_OVERRIDES.bg); r.setProperty('--bg2', LIGHT_OVERRIDES.bg2);
    r.setProperty('--bg3', LIGHT_OVERRIDES.bg3); r.setProperty('--bg4', LIGHT_OVERRIDES.bg4);
    r.setProperty('--bg5', LIGHT_OVERRIDES.bg5); r.setProperty('--text', LIGHT_OVERRIDES.text);
    r.setProperty('--text2', LIGHT_OVERRIDES.text2); r.setProperty('--text3', LIGHT_OVERRIDES.text3);
    r.setProperty('--border', LIGHT_OVERRIDES.border); r.setProperty('--border-p', LIGHT_OVERRIDES.borderP);
  } else {
    r.setProperty('--bg', t.bg); r.setProperty('--bg2', t.bg2);
    r.setProperty('--bg3', t.bg3); r.setProperty('--bg4', t.bg4);
    r.setProperty('--bg5', t.bg5); r.setProperty('--text', '#f0f0f0');
    r.setProperty('--text2', '#909090'); r.setProperty('--text3', '#505060');
    r.setProperty('--border', 'rgba(255,255,255,.07)');
    r.setProperty('--border-p', t.p + '44');
  }
}

// ── Webhook ───────────────────────────────────────
async function sendWebhook(s, order, product) {
  if (!s.webhook) return;
  try {
    await fetch(s.webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: s.webhookName || 'Store Bot',
        ...(s.webhookAvatar ? { avatar_url: s.webhookAvatar } : {}),
        embeds: [{
          title: '🛒 New Order!',
          color: 0xf5a718,
          fields: [
            { name: 'Product', value: `${product.icon || '🎮'} ${product.name}`, inline: true },
            { name: 'Price', value: order.price, inline: true },
            { name: 'IGN', value: `\`${order.ign}\``, inline: true },
            { name: 'Gamemode', value: order.gm || '-', inline: true },
            { name: 'Payment', value: order.method || '-', inline: true },
            { name: 'Order ID', value: `\`${order.id}\``, inline: false },
            ...(order.cmd ? [{ name: '⚡ Command', value: `\`${order.cmd}\``, inline: false }] : []),
            ...(order.email ? [{ name: 'Email', value: order.email, inline: false }] : []),
          ],
          timestamp: new Date().toISOString(),
          footer: { text: s.name || 'MythicalLife Store' }
        }]
      })
    });
  } catch (e) { console.warn('Webhook failed:', e); }
}

// ── Skin ──────────────────────────────────────────
function skinUrl(ign) {
  return `https://crafatar.com/avatars/${encodeURIComponent(ign)}?size=32&overlay`;
}

// ── Toast ─────────────────────────────────────────
function toast(msg, type = 'info') {
  const colors = { info: 'var(--p)', ok: '#22c55e', err: '#ef4444' };
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:20px;right:16px;background:var(--bg2);border:1px solid ${colors[type]||colors.info};border-radius:9px;padding:10px 15px;color:${colors[type]||colors.info};font-weight:600;font-size:13px;z-index:99999;box-shadow:0 8px 30px rgba(0,0,0,.6);animation:tIn .3s ease,tOut .3s 2.7s ease forwards;max-width:270px;font-family:'Outfit',sans-serif`;
  t.textContent = msg;
  if (!document.getElementById('toast-style')) {
    const s = document.createElement('style');
    s.id = 'toast-style';
    s.textContent = '@keyframes tIn{from{opacity:0;transform:translateX(50px)}}@keyframes tOut{to{opacity:0;transform:translateX(50px)}}';
    document.head.appendChild(s);
  }
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

// ── Shared Navbar Builder ─────────────────────────
function buildNavbar(s, activePage) {
  const ign = getIGN();
  const cart = getCart(s);
  const cartCount = cart.reduce((n, i) => n + (i.qty || 1), 0);
  const skinEl = ign ? `<img src="${skinUrl(ign)}" style="width:24px;height:24px;border-radius:4px;object-fit:cover" onerror="this.style.display='none'">` : '';

  return `
  <div class="nav-inner">
    <div class="nav-logo" onclick="window.location='index.html'" style="cursor:pointer">
      ${s.logo ? `<img src="${s.logo}" style="height:34px;width:34px;object-fit:contain;border-radius:7px">` :
        `<div style="font-size:22px;width:34px;height:34px;display:flex;align-items:center;justify-content:center;background:var(--bg3);border:1px solid var(--border);border-radius:7px">${s.emoji||'⛏️'}</div>`}
      <span style="font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:2px;color:var(--p)">${s.name||'STORE'}</span>
    </div>
    <div class="nav-pill nav-ip" onclick="copyIP('${s.serverIP||''}')">
      <span style="width:6px;height:6px;border-radius:50%;background:#22c55e;box-shadow:0 0 5px #22c55e;flex-shrink:0"></span>
      <span style="font-family:'JetBrains Mono',monospace;font-size:10.5px;color:var(--text2);max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${s.serverIP||'play.server.net'}</span>
      <span style="background:var(--p);color:#000;font-size:8.5px;font-weight:800;padding:1px 6px;border-radius:99px">${s.players||0}</span>
    </div>
    ${s.discord ? `<a class="nav-pill nav-disc" href="${s.discord}" target="_blank">
      <span style="font-size:13px">💬</span>
      <span style="font-size:10px;font-weight:700;color:#7289da">DISCORD</span>
      <span style="background:#5865F2;color:#fff;font-size:8.5px;font-weight:800;padding:1px 6px;border-radius:99px">${s.discCount||0}</span>
    </a>` : ''}
    <div style="flex:1"></div>
    <div class="nav-cart" onclick="window.location='cart.html'">
      🛒 <div class="cart-badge" style="display:${cartCount>0?'flex':'none'}">${cartCount}</div>
    </div>
    <div class="nav-login" id="nav-user-btn" onclick="${ign?'openLogoutMenu()':'openLogin()'}">
      ${skinEl}
      <div>
        <div style="font-size:12px;font-weight:${ign?'800':'600'};color:${ign?'var(--p)':'var(--text2)'};max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${ign||'Guest'}</div>
        <div style="font-size:9.5px;color:var(--text3)">${ign?(isBedrock()?'BEDROCK':'JAVA'):'CLICK TO LOGIN'}</div>
      </div>
    </div>
  </div>`;
}

// ── Shared CSS ────────────────────────────────────
const SHARED_CSS = `
:root {
  --bg:#0f0f13;--bg2:#16161d;--bg3:#1e1e28;--bg4:#252532;--bg5:#2e2e3d;
  --border:rgba(255,255,255,.07);--border-p:rgba(245,167,24,.25);
  --p:#f5a718;--p2:#e09000;--p3:#ffc94a;--pa:#c07000;
  --text:#f0f0f0;--text2:#909090;--text3:#505060;
  --green:#22c55e;--red:#ef4444;--blue:#3b82f6;--disc:#5865F2;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html,body{font-family:'Outfit',sans-serif;background:var(--bg);color:var(--text);min-height:100vh}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--bg4);border-radius:2px}
a{text-decoration:none;color:inherit}button{font-family:'Outfit',sans-serif;cursor:pointer}input,select,textarea{font-family:'Outfit',sans-serif}

/* ANNOUNCEMENT */
#ann-bar{padding:7px 36px 7px 16px;text-align:center;font-size:12.5px;font-weight:700;color:#000;position:relative;overflow:hidden;display:none}
#ann-close{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.2);border:none;border-radius:50%;width:20px;height:20px;color:#000;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center}

/* NAVBAR */
#navbar{background:var(--bg2);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:400}
.nav-inner{max-width:1280px;margin:0 auto;padding:0 14px;height:56px;display:flex;align-items:center;gap:8px}
.nav-logo{display:flex;align-items:center;gap:8px;flex-shrink:0}
.nav-pill{display:flex;align-items:center;gap:5px;padding:5px 11px;border-radius:99px;border:1px solid var(--border);cursor:pointer;transition:all .2s;flex-shrink:0}
.nav-pill:hover{border-color:var(--border-p)}
.nav-disc{background:rgba(88,101,242,.1);border-color:rgba(88,101,242,.2)}
.nav-disc:hover{background:rgba(88,101,242,.2)}
.nav-cart{position:relative;width:36px;height:36px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:15px;flex-shrink:0;transition:all .2s}
.nav-cart:hover{border-color:var(--border-p)}
.cart-badge{position:absolute;top:-5px;right:-5px;background:var(--p);color:#000;font-size:9px;font-weight:800;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.nav-login{display:flex;align-items:center;gap:7px;padding:6px 11px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;cursor:pointer;transition:all .2s;flex-shrink:0}
.nav-login:hover{border-color:var(--border-p)}

/* BANNER */
#banner{position:relative;min-height:300px;overflow:hidden;display:flex;align-items:flex-end;justify-content:center;background:var(--bg)}
#banner-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 20%;opacity:.5;display:none}
.ban-overlay{position:absolute;inset:0;background:linear-gradient(0deg,var(--bg) 0%,rgba(15,15,19,.55) 50%,rgba(15,15,19,.15) 100%)}
.ban-glow{position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 50% 30%,rgba(245,167,24,.07),transparent 65%);pointer-events:none}
.ban-content{position:relative;z-index:2;text-align:center;padding:28px 14px;width:100%;max-width:600px}
#ban-logo{max-height:110px;object-fit:contain;margin-bottom:14px;filter:drop-shadow(0 6px 28px rgba(0,0,0,.8));animation:bob 4s ease-in-out infinite;display:none}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes popUp{from{opacity:0;transform:scale(.75) translateY(25px)}to{opacity:1;transform:none}}
#ban-title{font-family:'Bebas Neue',sans-serif;font-size:clamp(36px,8vw,72px);letter-spacing:5px;color:#fff;line-height:1;text-shadow:0 4px 30px rgba(0,0,0,.9);margin-bottom:8px}
#ban-title .hl{color:var(--p)}
#ban-sub{font-size:13px;color:var(--text2);margin-bottom:14px;line-height:1.6;max-width:420px;margin-inline:auto}
.ban-pills{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap}
.ban-pill{display:flex;align-items:center;gap:6px;padding:6px 14px;border-radius:99px;font-size:11.5px;font-weight:700;cursor:pointer;transition:all .2s}
.ban-pill-ip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);color:var(--text2)}
.ban-pill-ip:hover{background:rgba(255,255,255,.13);color:var(--p)}
.ban-pill-disc{background:rgba(88,101,242,.14);border:1px solid rgba(88,101,242,.28);color:#7289da}
.ban-pill-disc:hover{background:rgba(88,101,242,.24)}

/* STORE LAYOUT */
.store-wrap{max-width:1280px;margin:0 auto;padding:22px 14px 80px;display:grid;grid-template-columns:200px 1fr;gap:18px}

/* SIDEBAR */
.sidebar{display:flex;flex-direction:column;gap:10px}
.sb-card{background:var(--bg2);border:1px solid var(--border);border-radius:10px;overflow:hidden}
.sb-head{padding:10px 13px;font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--p);border-bottom:1px solid var(--border)}
.sb-user{padding:14px;text-align:center}
.sb-item{padding:11px 13px;color:var(--text2);font-size:12.5px;font-weight:600;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:7px;border-left:3px solid transparent}
.sb-item:hover{background:var(--bg3);color:var(--text);border-left-color:rgba(245,167,24,.3)}
.sb-item.active{background:color-mix(in srgb,var(--p) 9%,var(--bg2));color:var(--p);border-left-color:var(--p)}
.sb-ico{font-size:15px;width:20px;text-align:center;flex-shrink:0}

/* PRODUCT ROW (FireMC featured style) */
.featured-list{display:flex;flex-direction:column;gap:8px;margin-bottom:20px}
.feat-item{background:var(--bg2);border:1px solid var(--border);border-radius:9px;padding:13px 15px;display:flex;align-items:center;gap:13px;cursor:pointer;transition:all .2s;text-decoration:none}
.feat-item:hover{border-color:var(--border-p);background:var(--bg3);transform:translateX(3px)}
.feat-item.featured{border-left:3px solid var(--p);background:color-mix(in srgb,var(--p) 5%,var(--bg2))}
.feat-item.featured:hover{border-color:var(--p);background:color-mix(in srgb,var(--p) 9%,var(--bg2))}
.fi-img{width:56px;height:56px;border-radius:8px;object-fit:cover;flex-shrink:0;background:var(--bg3);display:flex;align-items:center;justify-content:center;font-size:26px}
.fi-img img{width:100%;height:100%;object-fit:cover;border-radius:8px}
.fi-info{flex:1;min-width:0}
.fi-name{font-size:14.5px;font-weight:700;color:var(--p);margin-bottom:2px;line-height:1.2}
.fi-name.normal{color:var(--text)}
.fi-price{font-size:12.5px;color:var(--text2);font-family:'JetBrains Mono',monospace}
.fi-orig{font-size:10px;color:var(--text3);text-decoration:line-through}
.fi-status{flex-shrink:0}
.status-badge{padding:3px 9px;border-radius:4px;font-size:9px;font-weight:800;letter-spacing:.8px;text-transform:uppercase}
.sb-popular{background:var(--p);color:#000}
.sb-new{background:#16a34a;color:#fff}
.sb-sale{background:#dc2626;color:#fff;animation:pBlink 1.8s ease-in-out infinite}
.sb-featured{background:linear-gradient(135deg,var(--p),var(--pa));color:#000}
.sb-oos{background:var(--bg4);color:var(--text3)}
.sb-coming{background:linear-gradient(135deg,#7c3aed,#2563eb);color:#fff}
@keyframes pBlink{0%,100%{opacity:1}50%{opacity:.75}}
.fi-discount{background:#dc2626;color:#fff;padding:2px 7px;border-radius:4px;font-size:9px;font-weight:800;margin-left:5px}

/* SECTION TITLE */
.sec-title{display:flex;align-items:center;gap:10px;margin-bottom:13px}
.sec-title h2{font-family:'Bebas Neue',sans-serif;font-size:18px;letter-spacing:3px;color:var(--p);white-space:nowrap}
.sec-line{flex:1;height:1px;background:linear-gradient(90deg,var(--border-p),transparent)}

/* WELCOME BOX */
.welcome-box{background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:18px 20px}
.wb-tag{font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--p);margin-bottom:5px}
.wb-title{font-family:'Bebas Neue',sans-serif;font-size:24px;letter-spacing:3px;margin-bottom:11px}
.wb-body{font-size:12.5px;color:var(--text2);line-height:1.75}
.wb-body h4{color:var(--p);font-size:11.5px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin:13px 0 5px}
.wb-body p{margin-bottom:8px}
.wb-body strong{color:var(--text)}
.wb-btns{display:flex;gap:7px;flex-wrap:wrap;margin-top:12px}
.btn-disc{display:inline-flex;align-items:center;gap:6px;padding:8px 15px;background:rgba(88,101,242,.13);border:1px solid rgba(88,101,242,.25);border-radius:7px;color:#7289da;font-weight:700;font-size:12.5px;cursor:pointer;transition:all .2s;text-decoration:none}
.btn-disc:hover{background:rgba(88,101,242,.22)}
.btn-legal{padding:7px 13px;background:var(--bg3);border:1px solid var(--border);border-radius:7px;color:var(--text3);font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;text-decoration:none;display:inline-block}
.btn-legal:hover{background:var(--bg4);color:var(--text)}

/* LOGIN MODAL */
#login-ov{display:none;position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:9000;align-items:center;justify-content:center;backdrop-filter:blur(14px)}
#login-ov.show{display:flex}
.login-box{background:var(--bg2);border:1px solid var(--border-p);border-radius:15px;padding:32px 26px;max-width:400px;width:93%;text-align:center;animation:popUp .35s cubic-bezier(.34,1.56,.64,1);box-shadow:0 28px 70px rgba(0,0,0,.85)}
.lb-logo{width:68px;height:68px;margin:0 auto 14px;animation:bob 3.5s ease-in-out infinite}
.lb-logo img,.lb-logo span{display:block;width:100%;height:100%;object-fit:contain;line-height:68px;font-size:44px}
.login-box h2{font-family:'Bebas Neue',sans-serif;font-size:24px;letter-spacing:3px;color:var(--p);margin-bottom:4px}
.login-box p{color:var(--text2);font-size:12px;margin-bottom:18px;line-height:1.6}
.login-inp-wrap{position:relative;margin-bottom:10px}
.login-skin{position:absolute;left:10px;top:50%;transform:translateY(-50%);width:26px;height:26px;border-radius:5px;display:none}
.login-inp{width:100%;padding:12px 14px 12px 46px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;text-align:center;outline:none;letter-spacing:2px;transition:all .2s}
.login-inp:focus{border-color:var(--p);box-shadow:0 0 0 3px color-mix(in srgb,var(--p) 10%,transparent)}
.login-inp::placeholder{font-weight:400;letter-spacing:1px;color:var(--text3);text-align:center}
.bedrock-row{display:flex;align-items:center;justify-content:space-between;background:var(--bg3);border:1px solid var(--border);border-radius:8px;padding:10px 13px;margin-bottom:12px}
.bedrock-row span{font-size:12.5px;font-weight:600;color:var(--text2)}
.tog-wrap{display:flex;align-items:center;gap:8px}
.tog-lbl{font-size:11px;color:var(--text3);font-weight:600}
.tog{position:relative;width:38px;height:20px;cursor:pointer;flex-shrink:0}
.tog input{opacity:0;width:0;height:0;position:absolute}
.tog-tr{position:absolute;inset:0;background:var(--bg4);border-radius:99px;border:1px solid var(--border);transition:all .2s}
.tog-th{position:absolute;left:2px;top:2px;width:14px;height:14px;background:var(--text3);border-radius:50%;transition:all .2s}
.tog input:checked~.tog-tr{background:color-mix(in srgb,var(--p) 18%,var(--bg4));border-color:var(--p)}
.tog input:checked~.tog-th{transform:translateX(18px);background:var(--p)}
.bedrock-note{font-size:10.5px;color:var(--text3);margin-bottom:10px;display:none}
.btn-continue{width:100%;padding:12px;background:linear-gradient(135deg,var(--p),var(--pa));border:none;border-radius:8px;color:#000;font-weight:800;font-size:14px;cursor:pointer;transition:all .2s}
.btn-continue:hover{filter:brightness(1.1);box-shadow:0 5px 20px color-mix(in srgb,var(--p) 35%,transparent);transform:translateY(-1px)}
.btn-cancel{width:100%;padding:9px;background:transparent;border:1px solid var(--border);border-radius:7px;color:var(--text3);font-size:12.5px;cursor:pointer;margin-top:7px;transition:all .2s}
.btn-cancel:hover{border-color:var(--border-p);color:var(--text2)}

/* PRODUCT DETAIL MODAL */
#prod-ov{display:none;position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:8000;align-items:flex-start;justify-content:center;backdrop-filter:blur(12px);overflow-y:auto;padding:20px 14px}
#prod-ov.show{display:flex}
.prod-modal{background:var(--bg2);border:1px solid var(--border);border-radius:14px;max-width:680px;width:100%;margin:auto;animation:popUp .3s ease;box-shadow:0 28px 70px rgba(0,0,0,.85);display:grid;grid-template-columns:200px 1fr;overflow:hidden}
.pm-left{background:var(--bg3);padding:20px;display:flex;flex-direction:column;gap:12px}
.pm-img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:9px;background:var(--bg4);display:flex;align-items:center;justify-content:center;font-size:52px}
.pm-img img{width:100%;height:100%;object-fit:cover;border-radius:9px}
.pm-name{font-size:15px;font-weight:800;line-height:1.2;color:var(--text)}
.pm-price{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:1px;color:var(--p)}
.pm-orig{font-size:11px;color:var(--text3);text-decoration:line-through}
.btn-addcart{width:100%;padding:11px;background:linear-gradient(135deg,var(--p),var(--pa));border:none;border-radius:8px;color:#000;font-weight:800;font-size:13px;cursor:pointer;transition:all .2s}
.btn-addcart:hover{filter:brightness(1.1);box-shadow:0 4px 16px color-mix(in srgb,var(--p) 35%,transparent)}
.btn-addcart:disabled{background:var(--bg4);color:var(--text3);cursor:not-allowed;filter:none;box-shadow:none}
.btn-gift{width:100%;padding:10px;background:rgba(168,85,247,.15);border:1px solid rgba(168,85,247,.3);border-radius:8px;color:#c084fc;font-weight:700;font-size:12.5px;cursor:pointer;transition:all .2s;margin-top:4px}
.btn-gift:hover{background:rgba(168,85,247,.25)}
.pm-right{padding:18px 20px;overflow-y:auto;max-height:80vh}
.pm-close{position:absolute;top:12px;right:12px;width:30px;height:30px;background:var(--bg3);border:1px solid var(--border);border-radius:7px;color:var(--text2);font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.pm-close:hover{background:var(--bg4);color:var(--text)}
.pm-features{font-size:12.5px;color:var(--text2);line-height:1.8;white-space:pre-line}
.pm-screenshot{width:100%;border-radius:8px;object-fit:cover;margin-top:12px;border:1px solid var(--border)}
.pm-section-title{font-size:9.5px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--p);margin-bottom:6px;margin-top:14px}

/* ADMIN ── */
#adm-fab{position:fixed;bottom:16px;right:14px;z-index:7000;padding:7px 13px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text2);font-weight:700;font-size:11px;cursor:pointer;box-shadow:0 4px 16px rgba(0,0,0,.4);display:flex;align-items:center;gap:5px;transition:all .2s}
#adm-fab:hover{background:var(--bg4);border-color:var(--border-p);color:var(--p)}
#adm-login-ov{display:none;position:fixed;inset:0;background:rgba(0,0,0,.92);z-index:9800;align-items:center;justify-content:center;backdrop-filter:blur(14px)}
#adm-login-ov.show{display:flex}
.al-box{background:var(--bg2);border:1px solid var(--border-p);border-radius:13px;padding:30px 26px;max-width:320px;width:93%;text-align:center;animation:popUp .3s ease;box-shadow:0 24px 70px rgba(0,0,0,.9)}
.al-box h2{font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:3px;color:var(--p);margin-bottom:5px}
.al-box p{color:var(--text2);font-size:12px;margin-bottom:16px}
.al-inp{width:100%;padding:10px 13px;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text);font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:700;text-align:center;outline:none;letter-spacing:3px;margin-bottom:9px;transition:all .2s}
.al-inp:focus{border-color:var(--p)}
.al-err{color:#ef4444;font-size:11px;margin-bottom:8px;display:none}

/* ADMIN PANEL */
#adm-panel{display:none;position:fixed;inset:0;background:var(--bg);z-index:9600;flex-direction:column}
#adm-panel.show{display:flex}
.ap-topbar{height:50px;padding:0 13px;background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:9px}
.ap-topbar h2{font-family:'Bebas Neue',sans-serif;font-size:15px;letter-spacing:3px;color:var(--pa);flex:1}
.ap-body{display:flex;flex:1;overflow:hidden}
.ap-side{width:168px;background:var(--bg2);border-right:1px solid var(--border);padding:8px 4px;overflow-y:auto;flex-shrink:0}
.ap-tab{padding:7px 9px;border-radius:7px;color:var(--text3);font-size:11px;font-weight:600;cursor:pointer;transition:all .18s;display:flex;align-items:center;gap:6px;margin-bottom:2px;border:1px solid transparent;white-space:nowrap}
.ap-tab:hover{background:var(--bg3);color:var(--text2)}
.ap-tab.active{background:color-mix(in srgb,var(--p) 9%,transparent);border-color:color-mix(in srgb,var(--p) 20%,transparent);color:var(--p)}
.ap-content{flex:1;padding:18px 20px;overflow-y:auto}
.ap-sec{display:none}.ap-sec.active{display:block}
.ap-sec>h3{font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--pa);margin-bottom:14px}
.af-g{margin-bottom:11px}
.af-lbl{display:block;font-size:8.5px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--text3);margin-bottom:4px}
.af-inp,.af-ta,.af-sel{width:100%;padding:9px 10px;background:var(--bg3);border:1px solid var(--border);border-radius:7px;color:var(--text);font-family:'Outfit',sans-serif;font-size:12.5px;outline:none;transition:border-color .2s}
.af-inp:focus,.af-ta:focus{border-color:color-mix(in srgb,var(--p) 38%,transparent)}
.af-ta{min-height:65px;resize:vertical}
.af-sel option{background:var(--bg3)}
.af-row{display:grid;grid-template-columns:1fr 1fr;gap:9px}
.af-row3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px}
.ap-btn{padding:8px 15px;background:linear-gradient(135deg,var(--p),var(--pa));border:none;border-radius:7px;color:#000;font-weight:800;font-size:11.5px;cursor:pointer;transition:all .2s;font-family:'Outfit',sans-serif}
.ap-btn:hover{filter:brightness(1.08)}
.ap-btn.red{background:#7f1d1d;color:#fca5a5}.ap-btn.red:hover{background:#991b1b;filter:none}
.ap-btn.grn{background:#14532d;color:#86efac}.ap-btn.grn:hover{background:#166534;filter:none}
.ap-btn.blue{background:#1e3a8a;color:#93c5fd}.ap-btn.blue:hover{background:#1e40af;filter:none}
.ap-btn.gray{background:var(--bg4);border:1px solid var(--border);color:var(--text2);filter:none}.ap-btn.gray:hover{background:var(--bg5);filter:none}
.ap-divider{height:1px;background:var(--border);margin:14px 0}
.ali{background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:9px 11px;display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap}
.ali-main{flex:1;min-width:0}
.ali-name{font-weight:700;font-size:12.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ali-sub{font-size:10px;color:var(--text3);margin-top:1px}
.ali-acts{display:flex;gap:5px;align-items:center}
.upload-area{border:2px dashed var(--border);border-radius:7px;padding:12px;text-align:center;cursor:pointer;transition:all .2s;background:var(--bg3);position:relative}
.upload-area:hover{border-color:var(--border-p)}
.upload-area input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
.upload-area p{font-size:11px;color:var(--text3)}
.up-prev{max-width:80px;max-height:50px;object-fit:contain;display:none;margin:5px auto 0;border-radius:5px}
.color-bar{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:4px}
.cb-btn{width:21px;height:21px;border-radius:4px;border:1px solid rgba(255,255,255,.12);cursor:pointer;font-size:8.5px;font-weight:800;display:flex;align-items:center;justify-content:center;transition:transform .15s}
.cb-btn:hover{transform:scale(1.18)}
.desc-prev{background:var(--bg4);border:1px solid var(--border);border-radius:7px;padding:8px 10px;font-size:12px;line-height:1.75;min-height:40px;margin-top:4px;white-space:pre-line}
.th-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:11px}
.th-opt{height:42px;border-radius:7px;border:2px solid transparent;cursor:pointer;transition:all .2s;font-size:9.5px;font-weight:800;display:flex;align-items:center;justify-content:center}
.th-opt:hover{transform:scale(1.05)}
.th-opt.sel{border-color:#fff;box-shadow:0 0 0 2px rgba(255,255,255,.2)}
.mode-tog{display:flex;background:var(--bg3);border:1px solid var(--border);border-radius:7px;overflow:hidden;margin-bottom:11px}
.mode-btn{flex:1;padding:9px;background:transparent;border:none;color:var(--text3);font-weight:700;font-size:12px;cursor:pointer;transition:all .2s}
.mode-btn.active{background:var(--p);color:#000}
.rcon-note{background:color-mix(in srgb,var(--p) 5%,var(--bg3));border:1px solid var(--border-p);border-radius:7px;padding:10px 12px;margin-top:11px;font-size:11px;color:var(--text2);line-height:1.7}
.rcon-note code{color:var(--p3);font-family:'JetBrains Mono',monospace;font-size:10px}
.r-badge{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:99px;font-size:10.5px;font-weight:700;margin-bottom:10px}
.rb-on{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);color:#22c55e}
.rb-off{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);color:#ef4444}
.ord-item{background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:11px;margin-bottom:7px}
.cp-item{background:var(--bg3);border:1px solid var(--border);border-radius:7px;padding:8px 11px;display:flex;align-items:center;gap:8px;margin-bottom:6px}
.cp-code{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;color:var(--p);flex:1}

/* RESPONSIVE */
@media(max-width:768px){
  .store-wrap{grid-template-columns:1fr;padding:12px 10px 70px}
  .sidebar{display:none}
  .prod-modal{grid-template-columns:1fr}
  .pm-left{padding:16px}
  .af-row,.af-row3{grid-template-columns:1fr}
  .th-grid{grid-template-columns:repeat(5,1fr)}
  .ap-side{width:42px;padding:6px 3px}
  .ap-tab span:last-child{display:none}
  .ap-tab{justify-content:center;padding:8px}
  .nav-inner{gap:6px}
}
@media(max-width:480px){
  .nav-pill.nav-ip .nav-ip-txt{max-width:70px}
}
`;

// Export
window.S_utils = {
  getState, saveState, DEFAULT_STATE,
  getIGN, isBedrock, setUser, logout,
  getCart, addToCart, removeFromCart, clearCart, cartTotal,
  getCurrency, setCurrency, fmtPrice,
  parseColors, applyTheme, sendWebhook, skinUrl, toast,
  buildNavbar, SHARED_CSS, THEME_COLORS
};
