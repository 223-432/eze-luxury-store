import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#5a4778', secondary: '#c9a76a', accent: '#ec4899', dark: '#0d0926',
    background: '#f8f7ff', white: '#ffffff', text: '#171326', muted: '#6b7280',
    success: '#16a34a', danger: '#dc2626', border: '#e5e7eb', goldLight: '#e3cc9d'
  },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', xxl: '48px' },
  radius: { sm: '8px', md: '12px', lg: '20px', full: '999px' },
  shadows: { sm: '0 2px 8px rgba(0,0,0,0.08)', md: '0 8px 24px rgba(0,0,0,0.12)', lg: '0 16px 40px rgba(0,0,0,0.16)' }
};

export const GlobalStyle = createGlobalStyle`
:root {
  --ink: ${({ theme }) => theme.colors.text};
  --navy: ${({ theme }) => theme.colors.dark};
  --navy-soft: #202231;
  --purple: ${({ theme }) => theme.colors.primary};
  --gold: ${({ theme }) => theme.colors.secondary};
  --gold-light: ${({ theme }) => theme.colors.goldLight};
  --paper: ${({ theme }) => theme.colors.background};
  --white: ${({ theme }) => theme.colors.white};
  --muted: ${({ theme }) => theme.colors.muted};
  --line: ${({ theme }) => theme.colors.border};
  --danger: ${({ theme }) => theme.colors.danger};
  --serif: 'Playfair Display', Georgia, serif;
  --sans: 'DM Sans', Arial, sans-serif;
}
* { box-sizing: border-box; }
html { min-width: 320px; scroll-behavior: smooth; }
body { margin: 0; color: var(--ink); background: var(--paper); font: 15px/1.6 var(--sans); -webkit-font-smoothing: antialiased; }
button, input, textarea, select { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; }
img { max-width: 100%; }
::selection { background: var(--gold-light); color: var(--ink); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.site-shell { min-height: 100vh; display: flex; flex-direction: column; }
.announcement { min-height: 30px; display: flex; align-items: center; justify-content: center; padding: 4px 12px; color: #e5d4b4; background: var(--navy); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; text-align: center; }
.site-header { z-index: 20; position: sticky; top: 0; display: flex; align-items: center; justify-content: space-between; min-height: 76px; gap: 25px; padding: 0 5.5%; border-bottom: 1px solid #ffffff18; background: rgba(17,19,33,.97); color: #fff; }
.brand { flex: 0 0 auto; color: white; font: 600 24px var(--serif); letter-spacing: .08em; }
.brand small { color: var(--gold); font-size: 13px; }
.primary-nav { display: flex; align-items: center; gap: clamp(14px,2.3vw,34px); }
.primary-nav a { color: #dedde2; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; transition: color .2s ease; }
.primary-nav a:hover,.primary-nav a.active { color: var(--gold-light); }
.header-actions { display: flex; align-items: center; gap: 17px; }
.icon-link { position: relative; color: white; font-size: 24px; line-height: 1; }
.icon-link svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5; vertical-align: middle; }
.count { position: absolute; top: -7px; right: -10px; min-width: 16px; height: 16px; padding: 0 4px; border-radius: 20px; background: var(--gold); color: var(--ink); font: 600 9px/16px var(--sans); text-align: center; }
.search-form { display: flex; width: clamp(120px,17vw,215px); height: 36px; border: 1px solid #ffffff40; border-radius: 2px; }
.search-form input { width: 100%; min-width: 0; padding: 0 10px; border: 0; outline: 0; background: transparent; color: white; font-size: 11px; }
.search-form input::placeholder { color: #c8c7cd; }
.search-form button { width: 35px; border: 0; background: transparent; color: var(--gold-light); font-size: 23px; }
.menu-toggle { display: none; border: 0; background: none; color: white; font-size: 23px; }
.page-content { flex: 1; width: 100%; }
.site-footer { display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; padding: 34px 6%; color: #d2d0d6; background: var(--navy); font-size: 12px; }
.site-footer div { display: flex; gap: 20px; }
.site-footer a:not(.brand):hover { color: var(--gold-light); }
.footer-brand { font-size: 20px; }
.toast { z-index: 80; position: fixed; right: 24px; bottom: 24px; display: flex; align-items: center; gap: 22px; max-width: min(460px,calc(100vw - 32px)); padding: 14px 18px; border: 1px solid #ffffff24; border-radius: 4px; background: #222432; color: white; box-shadow: 0 10px 34px #0003; font-size: 13px; }
.toast.error,.toast.warning { background: #772f34; }
.toast button { border: 0; background: none; color: white; font-size: 20px; }
.content-wrap { width: min(1240px, 100%); margin: 0 auto; padding: 66px 5.5% 84px; }
.page-heading { margin-bottom: 35px; }
.page-heading h1,.auth-card h1 { margin: 4px 0 7px; font: 500 clamp(34px,5vw,54px)/1.12 var(--serif); letter-spacing: -.02em; }
.page-heading p { margin: 0; color: var(--muted); }
.eyebrow { display: block; color: #947744; font-size: 10px; font-weight: 600; letter-spacing: .17em; text-transform: uppercase; }
.button { min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 20px; border: 1px solid transparent; border-radius: 2px; font-size: 11px; font-weight: 600; letter-spacing: .1em; text-align: center; text-transform: uppercase; transition: background .2s,color .2s,border .2s,transform .2s; }
.button:hover:not(:disabled) { transform: translateY(-1px); }
.button:disabled { cursor: not-allowed; opacity: .45; }
.button-primary { background: var(--navy); color: white; }
.button-primary:hover:not(:disabled) { background: var(--purple); }
.button-outline { border-color: #cfcac1; background: transparent; color: var(--ink); }
.button-outline:hover:not(:disabled) { border-color: var(--gold); background: #f2eee5; }
.button-gold { background: var(--gold); color: #17151a; }
.button-gold:hover { background: var(--gold-light); }
.text-button { padding: 4px 0; border: 0; background: none; color: #675843; font-size: 12px; text-decoration: underline; text-underline-offset: 3px; }
.danger-text { color: var(--danger); }
.home-page { padding-bottom: 0; }
.hero { position: relative; min-height: min(690px,78vh); display: flex; align-items: center; padding: 8% 12%; overflow: hidden; color: white; background: linear-gradient(90deg,#111321 0%,#111321d9 48%,#11132145 100%),url('/IMAGES/cars 6.jpg') center 52%/cover; }
.hero:after { position: absolute; inset: 18px; border: 1px solid #d9c9a343; content: ''; pointer-events: none; }
.hero-content { position: relative; z-index: 1; max-width: 640px; }
.hero-mark { display: block; margin-bottom: 22px; color: var(--gold-light); font: 500 19px var(--serif); letter-spacing: .24em; }
.hero .eyebrow { color: var(--gold-light); }
.hero h1 { margin: 14px 0 18px; font: 400 clamp(48px,7vw,82px)/1.05 var(--serif); }
.hero p { max-width: 420px; margin: 0 0 30px; color: #e0dfe3; font-size: 14px; }
.hero-caption { position: absolute; right: 9%; bottom: 40px; color: #eee4d1; font-size: 9px; letter-spacing: .16em; }
.home-section { padding-top: 67px; padding-bottom: 0; }
.section-title { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 24px; }
.section-title h2 { margin: 5px 0 0; font: 500 clamp(27px,4vw,38px)/1.2 var(--serif); }
.section-title > a { color: #72634d; font-size: 12px; }
.category-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 18px; }
.category-tile { position: relative; min-height: 340px; display: flex; align-items: end; padding: 25px; overflow: hidden; color: white; background: var(--navy); }
.category-tile img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
.category-tile:hover img { transform: scale(1.04); }
.category-shade { position: absolute; inset: 0; background: linear-gradient(0deg,#0d0e17dc,#0d0e1720 80%); }
.category-tile div { z-index: 1; }
.category-tile .eyebrow { color: var(--gold-light); }
.category-tile h3 { margin: 5px 0; font: 500 32px var(--serif); text-transform: capitalize; }
.category-tile div span:last-child { font-size: 11px; letter-spacing: .05em; }
.product-grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 18px; }
.product-card { position: relative; min-width: 0; overflow: hidden; background: white; border: 1px solid #eeece7; }
.product-image { position: relative; display: block; aspect-ratio: 1/1; overflow: hidden; background: #eeece9; }
.product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform .35s ease; }
.product-card:hover .product-image img { transform: scale(1.035); }
.stock-tag { position: absolute; bottom: 11px; left: 11px; padding: 4px 8px; background: #fffE; color: #34533b; font-size: 9px; letter-spacing: .06em; text-transform: uppercase; }
.stock-tag.sold-out { color: var(--danger); }
.heart-button { z-index: 2; position: absolute; top: 10px; right: 11px; width: 33px; height: 33px; border: 0; border-radius: 50%; background: #fffE; color: #333; font-size: 20px; }
.heart-button.active { color: #983f4e; }
.product-info { display: flex; align-items: flex-start; flex-direction: column; gap: 8px; padding: 16px; }
.product-info .eyebrow { font-size: 9px; }
.product-name { font: 500 17px/1.35 var(--serif); }
.product-rating { color: #a57c34; font-size: 12px; letter-spacing: .06em; }
.product-rating small { color: #777; font: 11px var(--sans); letter-spacing: 0; }
.product-info strong { margin: 2px 0 4px; font-size: 14px; }
.add-card-button { width: 100%; min-height: 39px; }
.luxury-banner { min-height: 380px; display: flex; align-items: center; margin-top: 80px; padding: 6% 11%; color: white; background: linear-gradient(90deg,#191729f5,#211c31bf,#211c3160),url('/IMAGES/watches 3.jpg') center 44%/cover; }
.luxury-banner > div { max-width: 560px; }
.luxury-banner .eyebrow { color: var(--gold-light); }
.luxury-banner h2 { margin: 10px 0; font: 400 clamp(36px,5vw,54px)/1.1 var(--serif); }
.luxury-banner p { margin: 0 0 22px; color: #e1dce8; }
.newsletter { margin-top: 80px; padding: 60px 20px; background: #eeece7; text-align: center; }
.newsletter .eyebrow { color: #947744; }
.newsletter h2 { margin: 6px 0; font: 500 36px var(--serif); }
.newsletter p { color: var(--muted); }
.newsletter form { display: flex; width: min(460px,100%); margin: 25px auto 0; }
.newsletter input,.search-page-form input { min-width: 0; flex: 1; padding: 12px 14px; border: 1px solid #d4d0c9; border-radius: 2px; background: white; outline: 0; }
.newsletter input:focus,.search-page-form input:focus,.form-card input:focus,.form-card textarea:focus,.form-card select:focus { border-color: var(--gold); box-shadow: 0 0 0 2px #c9a76a25; }
.catalog-controls { display: flex; align-items: center; gap: 15px; margin: -10px 0 22px; padding: 13px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); color: var(--muted); font-size: 11px; }
.catalog-controls > span { margin-right: auto; }
.catalog-controls label { display: flex; align-items: center; gap: 8px; }
.catalog-controls input,.catalog-controls select { width: 120px; height: 36px; padding: 0 9px; border: 1px solid var(--line); background: white; color: var(--ink); }
.empty-state { display: flex; align-items: center; flex-direction: column; gap: 10px; padding: 58px 20px; border: 1px solid var(--line); background: white; text-align: center; }
.empty-state h2,.empty-state h1 { margin: 0; font: 500 29px var(--serif); }
.empty-state p { margin: 0 0 10px; color: var(--muted); }
.empty-mark { color: var(--gold); font: 40px var(--serif); }
.search-page-form { display: flex; gap: 10px; max-width: 650px; }
.results-count { margin: 17px 0; color: var(--muted); font-size: 12px; }
.breadcrumbs { margin-bottom: 22px; color: var(--muted); font-size: 11px; }
.breadcrumbs a:hover { color: #806437; }
.detail-layout { display: grid; grid-template-columns: 1.05fr .95fr; gap: clamp(35px,7vw,95px); }
.detail-main-image { aspect-ratio: 1/1; background: #eeece9; }
.detail-main-image img { width: 100%; height: 100%; object-fit: cover; }
.gallery-thumbs { display: flex; gap: 10px; margin-top: 10px; }
.gallery-thumbs img { width: 74px; height: 74px; object-fit: cover; border: 1px solid var(--line); }
.detail-copy { padding-top: 16px; }
.detail-copy h1 { margin: 7px 0 13px; font: 500 clamp(32px,4vw,48px)/1.15 var(--serif); }
.detail-price { display: block; margin: 18px 0; font-size: 21px; }
.detail-copy > p { color: #626168; }
.stock-copy { color: #466b4b !important; font-size: 12px; }
.out-copy { color: var(--danger) !important; }
.quantity-picker { display: inline-flex; align-items: center; border: 1px solid var(--line); }
.quantity-picker button { width: 38px; height: 38px; border: 0; background: white; font-size: 18px; }
.quantity-picker button:disabled { color: #bbb; }
.quantity-picker span { min-width: 35px; text-align: center; }
.detail-actions { display: flex; flex-wrap: wrap; gap: 10px; margin: 16px 0 30px; }
.detail-actions > .button { flex: 1; }
.wishlist-action.active { color: #923f4c; }
.detail-specs { padding-top: 15px; border-top: 1px solid var(--line); font-size: 12px; }
.detail-specs h3,.reviews-section h2,.related-section h2 { font: 500 24px var(--serif); }
.detail-specs b { display: inline-block; min-width: 100px; color: #29272b; }
.detail-specs ul { padding-left: 18px; color: #626168; }
.reviews-section,.related-section { margin-top: 65px; }
.review-form { display: grid; grid-template-columns: 1fr 2fr auto; align-items: end; gap: 12px; margin: 20px 0; padding: 18px; background: white; border: 1px solid var(--line); }
.review-form label,.form-card label { display: flex; flex-direction: column; gap: 6px; color: #4f4d52; font-size: 11px; font-weight: 600; }
.review-form select { height: 42px; padding: 0 10px; border: 1px solid var(--line); background: white; }
.review-form textarea { min-height: 42px; resize: vertical; padding: 10px; border: 1px solid var(--line); }
.review-item { padding: 18px 0; border-bottom: 1px solid var(--line); }
.review-item p { margin: 6px 0; }
.review-item small,.muted { color: var(--muted); font-size: 12px; }
.cart-layout { display: grid; grid-template-columns: minmax(0,1.6fr) minmax(260px,.75fr); align-items: start; gap: 35px; }
.cart-items { min-width: 0; }
.cart-item { display: grid; grid-template-columns: 90px minmax(100px,1fr) auto auto auto; align-items: center; gap: 15px; padding: 17px 0; border-bottom: 1px solid var(--line); }
.cart-image { width: 90px; height: 90px; background: #eceae7; }
.cart-image img { width: 100%; height: 100%; object-fit: cover; }
.cart-item-copy { display: flex; flex-direction: column; gap: 4px; }
.cart-item-copy .product-name { font-size: 16px; }
.cart-item-copy > span:not(.eyebrow) { font-weight: 600; font-size: 12px; }
.cart-item-copy small { color: var(--muted); font-size: 10px; }
.cart-item > strong { white-space: nowrap; font-size: 12px; }
.cart-item .quantity-picker button { width: 29px; height: 32px; }
.cart-item .quantity-picker span { min-width: 24px; font-size: 12px; }
.form-card { display: flex; flex-direction: column; gap: 15px; padding: 23px; border: 1px solid var(--line); background: white; }
.form-card h2 { margin: 0; font: 500 24px var(--serif); }
.form-card > p { margin: 0; }
.cart-summary { position: sticky; top: 100px; }
.summary-line { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; margin: 7px 0; font-size: 12px; }
.summary-line > *:last-child { text-align: right; }
.summary-line hr,.form-card hr,.confirmation-summary hr { width: 100%; border: 0; border-top: 1px solid var(--line); }
.total-line { padding-top: 10px; border-top: 1px solid var(--line); font-size: 15px; }
.form-card > .button { width: 100%; }
.stepper { display: grid; grid-template-columns: repeat(4,1fr); gap: 9px; margin: 0 0 25px; }
.step { display: flex; align-items: center; gap: 9px; color: #96939a; font-size: 11px; }
.step span { width: 28px; height: 28px; display: grid; place-items: center; border: 1px solid #d5d0c9; border-radius: 50%; font-size: 10px; }
.step.active { color: var(--ink); }
.step.active span { border-color: var(--gold); background: var(--gold); color: #16151a; }
.checkout-layout { display: grid; grid-template-columns: minmax(0,1.3fr) minmax(260px,.7fr); align-items: start; gap: 24px; }
.form-card input,.form-card textarea,.form-card select { width: 100%; min-height: 42px; padding: 9px 11px; border: 1px solid #d9d5cf; border-radius: 2px; background: white; outline: 0; color: var(--ink); }
.form-card textarea { min-height: 92px; resize: vertical; }
.form-row { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; }
.form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 7px; }
.choice-card { display: grid !important; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px !important; padding: 15px; border: 1px solid var(--line); }
.choice-card input { width: 17px; min-height: auto; accent-color: var(--purple); }
.choice-card span { display: flex; flex-direction: column; }
.choice-card small { color: var(--muted); font-weight: 400; }
.password-field { display: flex; align-items: center; border: 1px solid #d9d5cf; }
.password-field input { border: 0; }
.password-field button { border: 0; background: white; color: #675843; font-size: 10px; }
.form-error { padding: 10px; color: var(--danger); background: #fbefed; font-size: 12px; }
.auth-wrap { display: flex; justify-content: center; }
.auth-card { width: min(460px,100%); padding: 34px; }
.auth-card h1 { margin-bottom: 14px; font-size: 38px; }
.auth-card .button { width: 100%; }
.auth-footer { text-align: center; font-size: 12px; }
.auth-footer a { color: #705a35; text-decoration: underline; }
.confirmation-card { width: min(650px,100%); margin: 10px auto; padding: clamp(24px,6vw,50px); border: 1px solid var(--line); background: white; text-align: center; }
.confirmation-check { width: 55px; height: 55px; display: grid; place-items: center; margin: 0 auto 16px; border: 1px solid var(--gold); border-radius: 50%; color: #69865e; font-size: 27px; }
.confirmation-card h1 { margin: 6px 0; font: 500 40px var(--serif); }
.confirmation-card > p { color: var(--muted); }
.confirmation-summary { margin: 25px 0; padding: 18px; background: var(--paper); text-align: left; }
.confirmation-summary p { font-size: 12px; }
.confirmation-card > small { display: block; margin-top: 18px; color: var(--muted); }
.account-layout { display: grid; grid-template-columns: 220px minmax(0,1fr); gap: 35px; }
.account-menu { display: flex; align-items: flex-start; flex-direction: column; gap: 14px; padding: 20px; border-right: 1px solid var(--line); }
.account-menu h2 { margin: 0 0 6px; font: 500 28px var(--serif); }
.account-menu > a { font-size: 12px; }
.account-menu > a span { color: var(--muted); }
.account-panel { min-width: 0; }
.account-panel .section-title { margin: 5px 0 22px; }
.account-panel .section-title h1,.account-panel .section-title h2 { margin: 0; font: 500 30px var(--serif); }
.info-card { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; margin-bottom: 32px; padding: 20px; background: white; border: 1px solid var(--line); }
.info-card p { display: flex; flex-direction: column; margin: 0; overflow-wrap: anywhere; font-size: 12px; }
.info-card b { margin-bottom: 4px; color: var(--muted); font-weight: 400; }
.order-list { display: flex; flex-direction: column; gap: 10px; }
.order-card { display: flex; align-items: center; justify-content: space-between; gap: 14px; padding: 17px; border: 1px solid var(--line); background: white; font-size: 12px; }
.order-card > div { display: flex; flex-direction: column; gap: 3px; }
.order-card small { color: var(--muted); }
.status-pill { width: fit-content; padding: 4px 9px; background: #eeece6; color: #5e533e; font-size: 10px; }
.back-link { margin-top: 18px; }
.admin-page > .page-heading { margin-bottom: 22px; }
.admin-nav { display: flex; gap: 22px; margin-bottom: 24px; padding: 14px; overflow-x: auto; border: 1px solid var(--line); background: white; }
.admin-nav a { flex: 0 0 auto; font-size: 11px; }
.admin-nav a:hover { color: #806437; }
.metrics-grid { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 12px; margin-bottom: 22px; }
.metric-card { display: flex; flex-direction: column; gap: 7px; padding: 18px; border: 1px solid var(--line); background: white; }
.metric-card span { color: var(--muted); font-size: 10px; }
.metric-card strong { font: 500 24px var(--serif); overflow-wrap: anywhere; }
.admin-toolbar { display: flex; gap: 10px; margin-bottom: 15px; }
.admin-toolbar input,.admin-toolbar select { min-width: 0; min-height: 42px; padding: 8px 11px; border: 1px solid var(--line); background: white; }
.admin-toolbar input { flex: 1; }
.admin-edit-form { margin-bottom: 17px; }
.table-wrap { width: 100%; overflow-x: auto; border: 1px solid var(--line); background: white; }
table { width: 100%; border-collapse: collapse; text-align: left; font-size: 11px; }
th,td { min-width: 90px; padding: 12px; border-bottom: 1px solid var(--line); vertical-align: middle; }
th { color: var(--muted); font-size: 9px; letter-spacing: .08em; text-transform: uppercase; }
td small { display: block; color: var(--muted); }
td select { padding: 6px; border: 1px solid var(--line); background: white; }
td .text-button { margin-right: 10px; }
.low-stock { color: var(--danger); font-weight: 700; }
.analytics-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 15px; }
.chart-card { grid-row: span 2; }
.bar-chart { min-height: 210px; display: flex; align-items: end; justify-content: space-around; gap: 12px; padding: 15px 0 0; border-bottom: 1px solid var(--line); }
.bar-column { flex: 1; display: flex; align-items: center; flex-direction: column; justify-content: end; gap: 6px; height: 210px; }
.bar-column span { max-width: 100%; overflow: hidden; color: var(--muted); font-size: 8px; text-overflow: ellipsis; }
.bar-column small { color: var(--muted); font-size: 9px; }
.skeleton-card { overflow: hidden; border: 1px solid #eeece7; background: white; }
.skeleton-image,.skeleton-line { background: linear-gradient(100deg,#eeece9 25%,#f8f6f3 45%,#eeece9 65%); background-size: 220% 100%; animation: shimmer 1.5s infinite; }
.skeleton-image { aspect-ratio: 1/1; }
.skeleton-line { height: 13px; margin: 15px 14px 9px; }
.skeleton-line.short { width: 48%; margin-top: 0; margin-bottom: 18px; }
.error-state { padding: 22px; border: 1px solid #d9b9b5; background: #fbefed; color: #772f34; font-size: 13px; }
.coupon-form { padding: 12px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.coupon-form label,.coupon-form small { display: block; color: var(--muted); font-size: 10px; }
.coupon-form > div { display: flex; gap: 6px; margin: 5px 0; }
.coupon-form input { min-width: 0; flex: 1; height: 38px; padding: 7px; border: 1px solid var(--line); font-size: 11px; }
.coupon-form .button { min-height: 38px; padding: 0 10px; }
.gallery-thumbs button { width: 74px; height: 74px; padding: 0; border: 1px solid var(--line); background: none; cursor: pointer; }
.gallery-thumbs button img { width: 100%; height: 100%; object-fit: cover; }
@keyframes shimmer { to { background-position-x: -220%; } }

@media (max-width: 1000px) {
  .site-header { padding: 0 3%; gap: 15px; }
  .primary-nav { gap: 13px; }
  .primary-nav a { font-size: 10px; }
  .header-actions { gap: 12px; }
  .product-grid { grid-template-columns: repeat(3,minmax(0,1fr)); }
  .cart-item { grid-template-columns: 74px minmax(80px,1fr) auto auto; }
  .cart-image { width: 74px; height: 74px; }
  .cart-item > .text-button { grid-column: 2 / -1; justify-self: end; }
  .metrics-grid { grid-template-columns: repeat(3,minmax(0,1fr)); }
}
@media (max-width: 720px) {
  .site-header { min-height: 66px; flex-wrap: wrap; gap: 0 14px; }
  .brand { margin-right: auto; }
  .menu-toggle { display: block; order: 2; padding: 10px 0; }
  .primary-nav { display: none; order: 4; width: 100%; flex-wrap: wrap; justify-content: flex-start; gap: 0; padding: 0 0 12px; }
  .primary-nav.is-open { display: flex; }
  .primary-nav a { padding: 10px 14px 10px 0; font-size: 10px; }
  .header-actions { order: 3; gap: 12px; }
  .search-form { width: 36px; border: 0; }
  .search-form input { width: 0; padding: 0; opacity: 0; }
  .search-form button { flex: 0 0 36px; }
  .search-form:focus-within { position: absolute; right: 105px; left: 115px; width: auto; border: 1px solid #ffffff50; background: var(--navy); }
  .search-form:focus-within input { width: 100%; padding: 0 10px; opacity: 1; }
  .page-content { min-height: 60vh; }
  .content-wrap { padding: 42px 5% 58px; }
  .hero { min-height: 560px; padding: 12% 9%; background-position: 58% center; }
  .hero:after { inset: 10px; }
  .hero h1 { font-size: clamp(47px,12vw,68px); }
  .hero-caption { right: 8%; bottom: 28px; font-size: 8px; }
  .category-grid { grid-template-columns: 1fr; gap: 12px; }
  .category-tile { min-height: 250px; }
  .product-grid { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 10px; }
  .product-info { gap: 6px; padding: 11px; }
  .product-name { font-size: 15px; }
  .product-info strong { font-size: 12px; }
  .add-card-button { min-height: 36px; padding: 0 8px; font-size: 9px; }
  .luxury-banner { min-height: 330px; margin-top: 55px; padding: 10% 7%; }
  .newsletter { margin-top: 55px; padding: 45px 6%; }
  .newsletter h2 { font-size: 30px; }
  .site-footer { justify-content: center; flex-direction: column; gap: 12px; text-align: center; }
  .detail-layout,.cart-layout,.checkout-layout { grid-template-columns: 1fr; gap: 22px; }
  .detail-copy { padding-top: 0; }
  .cart-summary { position: static; }
  .cart-item { grid-template-columns: 66px minmax(80px,1fr) auto; gap: 10px; }
  .cart-image { width: 66px; height: 66px; }
  .cart-item > strong { grid-column: 2; }
  .cart-item .quantity-picker { grid-column: 3; grid-row: 1 / span 2; }
  .cart-item > .text-button { grid-column: 2 / -1; grid-row: 3; }
  .stepper { gap: 3px; }
  .step { gap: 5px; font-size: 9px; }
  .step span { width: 23px; height: 23px; }
  .account-layout { grid-template-columns: 1fr; gap: 20px; }
  .account-menu { display: flex; align-items: center; flex-direction: row; flex-wrap: wrap; gap: 13px; padding: 0 0 14px; border-right: 0; border-bottom: 1px solid var(--line); }
  .account-menu h2 { width: 100%; }
  .account-menu .eyebrow { width: 100%; }
  .info-card { grid-template-columns: 1fr; }
  .order-card { flex-wrap: wrap; }
  .review-form { grid-template-columns: 1fr; }
  .metrics-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .analytics-grid { grid-template-columns: 1fr; }
  .chart-card { grid-row: auto; }
  .admin-toolbar { flex-wrap: wrap; }
  .admin-toolbar input { flex-basis: 100%; }
  .catalog-controls { flex-wrap: wrap; }
  .catalog-controls > span { flex-basis: 100%; }
}
@media (max-width: 420px) {
  .announcement { font-size: 8px; }
  .header-actions { gap: 9px; }
  .icon-link { font-size: 21px; }
  .section-title { align-items: flex-start; flex-direction: column; gap: 8px; }
  .section-title h2 { font-size: 29px; }
  .product-rating { font-size: 10px; }
  .product-name { font-size: 14px; }
  .search-page-form { align-items: stretch; flex-direction: column; }
  .form-row { grid-template-columns: 1fr; }
  .newsletter form { flex-direction: column; gap: 8px; }
  .newsletter input { min-height: 44px; }
  .detail-actions .button { flex-basis: 42%; padding: 0 10px; font-size: 9px; }
}

`;
