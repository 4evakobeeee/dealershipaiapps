import { useState, useEffect } from "react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Mono:wght@400;500&display=swap');
`;

const styles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #0a0a0b; color: #f0ede8; }

  :root {
    --gold: #c9a84c;
    --gold-light: #e8c96e;
    --gold-dim: #7a5f28;
    --bg: #0a0a0b;
    --bg2: #111114;
    --bg3: #18181d;
    --bg4: #1f1f26;
    --border: #2a2a35;
    --border-light: #3a3a48;
    --text: #f0ede8;
    --text-dim: #888895;
    --text-muted: #555565;
    --green: #3ecf8e;
    --red: #e05a5a;
    --blue: #5a9ee0;
  }

  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 60px;
    background: var(--bg); border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 100;
  }
  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px; letter-spacing: 3px; color: var(--gold);
    display: flex; align-items: center; gap: 10px;
  }
  .nav-logo span { color: var(--text); }
  .nav-tabs { display: flex; gap: 2px; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 3px; }
  .nav-tab {
    padding: 6px 16px; border-radius: 6px; font-size: 13px; font-weight: 500;
    cursor: pointer; border: none; background: transparent; color: var(--text-dim);
    transition: all 0.2s;
  }
  .nav-tab.active { background: var(--bg4); color: var(--text); }
  .nav-tab:hover:not(.active) { color: var(--text); }
  .nav-right { display: flex; align-items: center; gap: 12px; }
  .btn-new-deal {
    background: var(--gold); color: #000; font-weight: 600; font-size: 13px;
    padding: 8px 18px; border-radius: 7px; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; letter-spacing: 0.3px;
    transition: all 0.2s;
  }
  .btn-new-deal:hover { background: var(--gold-light); transform: translateY(-1px); }
  .avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--bg4); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600; color: var(--gold); cursor: pointer; }

  /* LAYOUT */
  .main { flex: 1; display: flex; }
  .sidebar {
    width: 220px; min-width: 220px; background: var(--bg2); border-right: 1px solid var(--border);
    padding: 20px 12px; display: flex; flex-direction: column; gap: 2px;
  }
  .sidebar-section { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; color: var(--text-muted); text-transform: uppercase; padding: 12px 12px 6px; margin-top: 8px; }
  .sidebar-item {
    display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 7px;
    font-size: 13px; color: var(--text-dim); cursor: pointer; transition: all 0.15s;
    border: 1px solid transparent;
  }
  .sidebar-item:hover { background: var(--bg3); color: var(--text); }
  .sidebar-item.active { background: var(--bg4); color: var(--text); border-color: var(--border); }
  .sidebar-item .icon { font-size: 15px; width: 18px; text-align: center; }
  .sidebar-badge { margin-left: auto; background: var(--gold); color: #000; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 10px; }

  /* CONTENT */
  .content { flex: 1; overflow-y: auto; padding: 28px 32px; background: var(--bg); }

  /* STATS ROW */
  .stats-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 28px; }
  .stat-card {
    background: var(--bg2); border: 1px solid var(--border); border-radius: 10px;
    padding: 16px 18px; cursor: pointer; transition: all 0.2s;
  }
  .stat-card:hover { border-color: var(--border-light); transform: translateY(-1px); }
  .stat-card.highlight { border-color: var(--gold-dim); background: linear-gradient(135deg, var(--bg2), #1a1608); }
  .stat-label { font-size: 11px; color: var(--text-muted); font-weight: 500; letter-spacing: 0.5px; margin-bottom: 8px; text-transform: uppercase; }
  .stat-value { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--text); letter-spacing: 1px; line-height: 1; }
  .stat-value.gold { color: var(--gold); }
  .stat-sub { font-size: 11px; color: var(--text-muted); margin-top: 4px; }
  .stat-sub.up { color: var(--green); }
  .stat-sub.down { color: var(--red); }

  /* SECTION HEADER */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; color: var(--text); }
  .section-actions { display: flex; gap: 8px; }

  /* DEALS TABLE */
  .deals-table { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  .table-header { display: grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 100px; gap: 0; padding: 10px 20px; background: var(--bg3); border-bottom: 1px solid var(--border); }
  .th { font-size: 11px; font-weight: 600; color: var(--text-muted); letter-spacing: 0.8px; text-transform: uppercase; }
  .deal-row { display: grid; grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr 1fr 100px; gap: 0; padding: 14px 20px; border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.15s; align-items: center; }
  .deal-row:last-child { border-bottom: none; }
  .deal-row:hover { background: var(--bg3); }
  .deal-vehicle { display: flex; align-items: center; gap: 12px; }
  .deal-thumb { width: 42px; height: 30px; background: var(--bg4); border-radius: 5px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .deal-name { font-size: 14px; font-weight: 500; color: var(--text); }
  .deal-vin { font-size: 11px; color: var(--text-muted); font-family: 'DM Mono', monospace; margin-top: 1px; }
  .deal-customer { font-size: 13px; color: var(--text-dim); }
  .deal-amount { font-size: 14px; font-weight: 500; color: var(--text); font-family: 'DM Mono', monospace; }
  .deal-payment { font-size: 12px; color: var(--text-dim); }
  .deal-time { font-size: 12px; color: var(--text-muted); }
  .status-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 20px; letter-spacing: 0.3px; }
  .status-badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; }
  .status-sent { background: rgba(90,158,224,0.15); color: #5a9ee0; }
  .status-sent::before { background: #5a9ee0; }
  .status-viewed { background: rgba(201,168,76,0.15); color: var(--gold); }
  .status-viewed::before { background: var(--gold); }
  .status-negotiating { background: rgba(240,120,60,0.15); color: #f0783c; }
  .status-negotiating::before { background: #f0783c; }
  .status-closed { background: rgba(62,207,142,0.15); color: var(--green); }
  .status-closed::before { background: var(--green); }
  .status-draft { background: rgba(136,136,149,0.15); color: var(--text-muted); }
  .status-draft::before { background: var(--text-muted); }
  .deal-actions { display: flex; gap: 6px; }
  .action-btn { padding: 5px 10px; border-radius: 5px; border: 1px solid var(--border); background: transparent; color: var(--text-dim); font-size: 11px; cursor: pointer; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
  .action-btn:hover { background: var(--bg4); color: var(--text); border-color: var(--border-light); }

  /* MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.75); z-index: 200;
    display: flex; align-items: center; justify-content: center; padding: 20px;
    animation: fadeIn 0.2s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: var(--bg2); border: 1px solid var(--border); border-radius: 16px;
    width: 100%; max-width: 720px; max-height: 90vh; overflow-y: auto;
    animation: slideUp 0.25s ease;
  }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .modal-header { padding: 24px 28px 0; display: flex; align-items: center; justify-content: space-between; }
  .modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 2px; color: var(--text); }
  .modal-close { background: var(--bg4); border: 1px solid var(--border); color: var(--text-dim); width: 32px; height: 32px; border-radius: 7px; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
  .modal-close:hover { color: var(--text); border-color: var(--border-light); }
  .modal-body { padding: 20px 28px 28px; }
  .form-section { margin-bottom: 24px; }
  .form-section-title { font-size: 11px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .form-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .form-group { display: flex; flex-direction: column; gap: 5px; }
  .form-group.full { grid-column: 1 / -1; }
  label { font-size: 12px; font-weight: 500; color: var(--text-dim); letter-spacing: 0.3px; }
  input, select {
    background: var(--bg3); border: 1px solid var(--border); border-radius: 7px;
    padding: 9px 12px; font-size: 13px; color: var(--text);
    font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.15s;
    width: 100%;
  }
  input:focus, select:focus { border-color: var(--gold-dim); }
  input::placeholder { color: var(--text-muted); }
  select option { background: var(--bg3); }

  /* CALC BOX */
  .calc-box { background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 16px 18px; margin-top: 16px; }
  .calc-title { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; }
  .calc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .calc-item { text-align: center; }
  .calc-item-label { font-size: 10px; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .calc-item-value { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--gold); letter-spacing: 1px; }
  .calc-item-sub { font-size: 10px; color: var(--text-muted); margin-top: 2px; }

  .modal-footer { padding: 0 28px 24px; display: flex; gap: 10px; justify-content: flex-end; }
  .btn { padding: 10px 22px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; border: none; transition: all 0.2s; }
  .btn-primary { background: var(--gold); color: #000; }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); }
  .btn-secondary { background: var(--bg4); color: var(--text-dim); border: 1px solid var(--border); }
  .btn-secondary:hover { color: var(--text); border-color: var(--border-light); }
  .btn-ghost { background: transparent; color: var(--text-dim); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--bg3); color: var(--text); }

  /* DEAL PAGE VIEW */
  .deal-page { max-width: 480px; margin: 0 auto; }
  .deal-page-header { text-align: center; padding: 20px 0 28px; }
  .dealership-name { font-size: 11px; letter-spacing: 2px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
  .deal-page-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 3px; color: var(--gold); }
  .vehicle-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; margin-bottom: 16px; }
  .vehicle-image { height: 200px; background: linear-gradient(135deg, #1a1a22, #222230); display: flex; align-items: center; justify-content: center; font-size: 80px; border-bottom: 1px solid var(--border); }
  .vehicle-info { padding: 18px 20px; }
  .vehicle-year { font-size: 12px; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase; }
  .vehicle-model { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 2px; color: var(--text); }
  .vehicle-vin { font-family: 'DM Mono', monospace; font-size: 11px; color: var(--text-muted); margin-top: 4px; }

  .price-breakdown { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; margin-bottom: 16px; }
  .pb-title { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 2px; color: var(--text-dim); margin-bottom: 14px; }
  .pb-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 0; border-bottom: 1px solid var(--border); }
  .pb-row:last-child { border-bottom: none; }
  .pb-label { font-size: 13px; color: var(--text-dim); }
  .pb-value { font-size: 13px; color: var(--text); font-family: 'DM Mono', monospace; }
  .pb-row.total { margin-top: 4px; padding-top: 10px; border-top: 1px solid var(--border-light); border-bottom: none; }
  .pb-row.total .pb-label { font-weight: 600; color: var(--text); font-size: 14px; }
  .pb-row.total .pb-value { font-weight: 600; color: var(--gold); font-size: 16px; }
  .pb-row.discount .pb-value { color: var(--green); }

  .payment-options { margin-bottom: 16px; display: flex; flex-direction: column; gap: 10px; }
  .payment-option {
    background: var(--bg2); border: 1px solid var(--border); border-radius: 12px;
    padding: 16px 18px; cursor: pointer; transition: all 0.2s; position: relative;
  }
  .payment-option:hover { border-color: var(--border-light); }
  .payment-option.selected { border-color: var(--gold); background: linear-gradient(135deg, var(--bg2), #1a1608); }
  .payment-option.selected::after { content: '✓'; position: absolute; top: 14px; right: 16px; color: var(--gold); font-weight: 700; font-size: 14px; }
  .po-type { font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px; }
  .po-payment { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 1px; color: var(--text); }
  .po-payment span { font-size: 18px; color: var(--text-dim); }
  .po-details { font-size: 12px; color: var(--text-muted); margin-top: 4px; }

  .deal-actions-section { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .deal-action-btn {
    width: 100%; padding: 13px 20px; border-radius: 10px; font-size: 14px; font-weight: 600;
    cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; border: none;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .deal-action-btn.accept { background: var(--green); color: #000; }
  .deal-action-btn.accept:hover { filter: brightness(1.1); transform: translateY(-1px); }
  .deal-action-btn.negotiate { background: transparent; border: 1px solid var(--gold-dim); color: var(--gold); }
  .deal-action-btn.negotiate:hover { background: rgba(201,168,76,0.08); border-color: var(--gold); }
  .deal-action-btn.secondary { background: var(--bg2); border: 1px solid var(--border); color: var(--text-dim); }
  .deal-action-btn.secondary:hover { border-color: var(--border-light); color: var(--text); }

  /* NEGOTIATION PANEL */
  .neg-panel { background: var(--bg2); border: 1px solid var(--border-light); border-radius: 12px; padding: 16px 18px; margin-bottom: 16px; }
  .neg-title { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 12px; }
  .neg-message { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 12px; font-size: 13px; color: var(--text-dim); line-height: 1.5; margin-bottom: 10px; }
  .neg-input { width: 100%; background: var(--bg3); border: 1px solid var(--border); border-radius: 7px; padding: 9px 12px; font-size: 13px; color: var(--text); font-family: 'DM Sans', sans-serif; outline: none; resize: none; min-height: 70px; }
  .neg-input:focus { border-color: var(--gold-dim); }

  /* MANAGER VIEW */
  .manager-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; }
  .manager-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }
  .mc-title { font-size: 11px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 16px; }
  .rep-row { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .rep-row:last-child { border-bottom: none; }
  .rep-avatar { width: 34px; height: 34px; border-radius: 50%; background: var(--bg4); display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: var(--gold); flex-shrink: 0; }
  .rep-name { font-size: 13px; font-weight: 500; color: var(--text); }
  .rep-stat { font-size: 11px; color: var(--text-muted); }
  .rep-right { margin-left: auto; text-align: right; }
  .rep-deals { font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--text); letter-spacing: 1px; }
  .rep-rate { font-size: 11px; color: var(--green); }

  .pipeline-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); }
  .pipeline-row:last-child { border-bottom: none; }
  .pipeline-label { font-size: 12px; color: var(--text-dim); width: 100px; flex-shrink: 0; }
  .pipeline-bar-wrap { flex: 1; height: 6px; background: var(--bg4); border-radius: 3px; overflow: hidden; }
  .pipeline-bar { height: 100%; border-radius: 3px; transition: width 0.6s ease; }
  .pipeline-count { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--text); width: 30px; text-align: right; flex-shrink: 0; }

  /* AI BADGE */
  .ai-chip { display: inline-flex; align-items: center; gap: 5px; background: rgba(201,168,76,0.12); border: 1px solid var(--gold-dim); color: var(--gold); font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; padding: 3px 8px; border-radius: 20px; }

  /* SEARCH BAR */
  .search-bar { display: flex; align-items: center; gap: 8px; background: var(--bg2); border: 1px solid var(--border); border-radius: 8px; padding: 8px 14px; width: 220px; }
  .search-bar input { background: transparent; border: none; color: var(--text); font-size: 13px; outline: none; width: 100%; }
  .search-icon { color: var(--text-muted); font-size: 13px; }

  /* SUCCESS TOAST */
  .toast {
    position: fixed; bottom: 28px; right: 28px; background: var(--bg3); border: 1px solid var(--green);
    border-radius: 10px; padding: 14px 18px; display: flex; align-items: center; gap: 10px;
    font-size: 13px; color: var(--text); z-index: 500;
    animation: toastIn 0.3s ease;
  }
  @keyframes toastIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .toast-icon { color: var(--green); font-size: 16px; }

  /* LINK SHARE */
  .link-box { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; margin-top: 14px; }
  .link-url { font-family: 'DM Mono', monospace; font-size: 12px; color: var(--text-dim); flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .link-copy { background: var(--bg4); border: 1px solid var(--border); color: var(--text-dim); padding: 5px 12px; border-radius: 5px; font-size: 11px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.15s; flex-shrink: 0; }
  .link-copy:hover { color: var(--text); }

  /* EMPTY */
  .empty-state { text-align: center; padding: 60px 20px; }
  .empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
  .empty-text { font-size: 14px; color: var(--text-muted); }

  /* TABS */
  .tab-strip { display: flex; gap: 0; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
  .tab-item { padding: 10px 18px; font-size: 13px; font-weight: 500; color: var(--text-muted); cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.15s; margin-bottom: -1px; }
  .tab-item.active { color: var(--gold); border-bottom-color: var(--gold); }
  .tab-item:hover:not(.active) { color: var(--text); }

  .filter-chip { display: inline-flex; align-items: center; gap: 5px; background: var(--bg3); border: 1px solid var(--border); color: var(--text-dim); font-size: 12px; padding: 5px 12px; border-radius: 20px; cursor: pointer; transition: all 0.15s; }
  .filter-chip.active { background: rgba(201,168,76,0.1); border-color: var(--gold-dim); color: var(--gold); }
  .filter-chip:hover:not(.active) { border-color: var(--border-light); color: var(--text); }
`;

const DEALS_DATA = [
  { id: 1, year: "2024", make: "Toyota", model: "Camry XSE", vin: "4T1B11HK5KU196742", customer: "Marcus Reid", email: "m.reid@email.com", phone: "(714) 555-0182", price: 34500, msrp: 36200, discount: 1700, taxes: 2900, fees: 895, downPayment: 3000, tradeIn: 0, rate: 5.9, term: 60, status: "viewed", created: "2h ago", payment: 589, emoji: "🚗" },
  { id: 2, year: "2023", make: "BMW", model: "X5 xDrive40i", vin: "5UXKR0C54JL069348", customer: "Sarah Chen", email: "s.chen@email.com", phone: "(949) 555-0234", price: 67800, msrp: 71400, discount: 3600, taxes: 5950, fees: 1295, downPayment: 10000, tradeIn: 12000, rate: 4.9, term: 72, status: "negotiating", created: "5h ago", payment: 994, emoji: "🚙" },
  { id: 3, year: "2024", make: "Ford", model: "F-150 Lariat", vin: "1FTFW1E84LKD12345", customer: "James Okafor", email: "j.okafor@email.com", phone: "(562) 555-0301", price: 52400, msrp: 54900, discount: 2500, taxes: 4480, fees: 895, downPayment: 5000, tradeIn: 8000, rate: 6.4, term: 60, status: "closed", created: "1d ago", payment: 892, emoji: "🛻" },
  { id: 4, year: "2024", make: "Honda", model: "Accord Sport", vin: "1HGCV2F37NA001234", customer: "Lisa Park", email: "l.park@email.com", phone: "(310) 555-0445", price: 29900, msrp: 31200, discount: 1300, taxes: 2610, fees: 795, downPayment: 2500, tradeIn: 0, rate: 5.4, term: 60, status: "sent", created: "3h ago", payment: 497, emoji: "🚗" },
  { id: 5, year: "2023", make: "Tesla", model: "Model Y LR", vin: "5YJ3E1EA9PF123456", customer: "David Vasquez", email: "d.vasquez@email.com", phone: "(626) 555-0567", price: 48990, msrp: 50990, discount: 2000, taxes: 4200, fees: 595, downPayment: 8000, tradeIn: 6000, rate: 4.5, term: 60, status: "draft", created: "30m ago", payment: 734, emoji: "⚡" },
];

function calcPayment(price, msrp, discount, taxes, fees, down, trade, rate, term) {
  const vehiclePrice = price - (trade || 0);
  const totalFinanced = vehiclePrice + taxes + fees - down;
  const monthlyRate = rate / 100 / 12;
  if (monthlyRate === 0) return Math.round(totalFinanced / term);
  const payment = (totalFinanced * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
  return Math.round(payment);
}

function calcLease(price, term = 36, mf = 0.00125, rv = 0.55) {
  const residual = price * rv;
  const dep = (price - residual) / term;
  const finance = (price + residual) * mf;
  return Math.round(dep + finance + (price * 0.09 / term));
}

export default function App() {
  const [view, setView] = useState("dashboard");
  const [subview, setSubview] = useState("deals");
  const [deals, setDeals] = useState(DEALS_DATA);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [toast, setToast] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [dealPage, setDealPage] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNeg, setShowNeg] = useState(false);
  const [negText, setNegText] = useState("");

  const [form, setForm] = useState({
    customerName: "", phone: "", email: "",
    year: "2024", make: "", model: "", vin: "", price: "",
    msrp: "", discount: "", taxes: "", fees: "", downPayment: "", tradeIn: "", rate: "5.9", term: "60"
  });

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleCreateDeal = () => {
    const p = parseFloat(form.price) || 30000;
    const ms = parseFloat(form.msrp) || p + 1500;
    const disc = parseFloat(form.discount) || (ms - p);
    const tx = parseFloat(form.taxes) || Math.round(p * 0.0875);
    const fe = parseFloat(form.fees) || 895;
    const dn = parseFloat(form.downPayment) || 0;
    const tr = parseFloat(form.tradeIn) || 0;
    const ra = parseFloat(form.rate) || 5.9;
    const te = parseInt(form.term) || 60;
    const pmt = calcPayment(p, ms, disc, tx, fe, dn, tr, ra, te);
    const newDeal = {
      id: deals.length + 1,
      year: form.year, make: form.make, model: form.model, vin: form.vin,
      customer: form.customerName, email: form.email, phone: form.phone,
      price: p, msrp: ms, discount: disc, taxes: tx, fees: fe,
      downPayment: dn, tradeIn: tr, rate: ra, term: te,
      status: "draft", created: "Just now", payment: pmt, emoji: "🚗"
    };
    setDeals([newDeal, ...deals]);
    setShowModal(false);
    showToast("Deal created — link copied to clipboard");
    setForm({ customerName: "", phone: "", email: "", year: "2024", make: "", model: "", vin: "", price: "", msrp: "", discount: "", taxes: "", fees: "", downPayment: "", tradeIn: "", rate: "5.9", term: "60" });
  };

  const fv = (n) => `$${(n || 0).toLocaleString()}`;
  const filteredDeals = filterStatus === "all" ? deals : deals.filter(d => d.status === filterStatus);

  const statusCounts = {
    all: deals.length,
    draft: deals.filter(d => d.status === "draft").length,
    sent: deals.filter(d => d.status === "sent").length,
    viewed: deals.filter(d => d.status === "viewed").length,
    negotiating: deals.filter(d => d.status === "negotiating").length,
    closed: deals.filter(d => d.status === "closed").length,
  };

  const liveCalc = (() => {
    const p = parseFloat(form.price) || 0;
    const ms = parseFloat(form.msrp) || p + 1500;
    const tx = parseFloat(form.taxes) || Math.round(p * 0.0875);
    const fe = parseFloat(form.fees) || 895;
    const dn = parseFloat(form.downPayment) || 0;
    const tr = parseFloat(form.tradeIn) || 0;
    const ra = parseFloat(form.rate) || 5.9;
    const te = parseInt(form.term) || 60;
    if (!p) return null;
    return { payment: calcPayment(p, ms, 0, tx, fe, dn, tr, ra, te), ood: p + tx + fe - dn - tr, lease: calcLease(p) };
  })();

  const openDealPage = (deal) => {
    setDealPage(deal);
    setSelectedOption(null);
    setShowNeg(false);
    setNegText("");
    setView("dealpage");
  };

  const REPS = [
    { init: "MK", name: "Mike Kowalski", deals: 12, rate: "67%", closed: 8 },
    { init: "JR", name: "Jamie Rodriguez", deals: 9, rate: "55%", closed: 5 },
    { init: "TN", name: "Tara Nguyen", deals: 15, rate: "73%", closed: 11 },
    { init: "BF", name: "Bryan Foster", deals: 7, rate: "42%", closed: 3 },
  ];

  return (
    <>
      <style>{FONTS}{styles}</style>
      <div className="app">
        <nav>
          <div className="nav-logo">⬡ <span>DEAL</span>FLOW
            <span className="ai-chip">AI</span>
          </div>
          <div className="nav-tabs">
            {[["dashboard","Sales Desk"],["manager","Manager View"]].map(([v,l]) => (
              <button key={v} className={`nav-tab ${view === v || (view === "dealpage" && v === "dashboard") ? "active" : ""}`} onClick={() => setView(v)}>{l}</button>
            ))}
          </div>
          <div className="nav-right">
            <button className="btn-new-deal" onClick={() => setShowModal(true)}>+ New Deal</button>
            <div className="avatar">MK</div>
          </div>
        </nav>

        <div className="main">
          {view !== "dealpage" && (
            <div className="sidebar">
              <div className="sidebar-section">Workspace</div>
              {[
                ["deals", "📋", "All Deals", statusCounts.all],
                ["negotiating", "💬", "Negotiating", statusCounts.negotiating],
                ["analytics", "📊", "Analytics", null],
              ].map(([id, icon, label, count]) => (
                <div key={id} className={`sidebar-item ${subview === id ? "active" : ""}`} onClick={() => { setSubview(id); setView("dashboard"); }}>
                  <span className="icon">{icon}</span> {label}
                  {count > 0 && <span className="sidebar-badge">{count}</span>}
                </div>
              ))}
              <div className="sidebar-section">Pipeline</div>
              {[["draft","⬜","Draft"],["sent","📤","Sent"],["viewed","👁","Viewed"],["closed","✅","Closed"]].map(([id, icon, label]) => (
                <div key={id} className={`sidebar-item ${filterStatus === id && subview === "deals" ? "active" : ""}`}
                  onClick={() => { setFilterStatus(id); setSubview("deals"); setView("dashboard"); }}>
                  <span className="icon">{icon}</span> {label}
                  <span style={{marginLeft:"auto", fontSize:"11px", color:"var(--text-muted)"}}>{statusCounts[id]}</span>
                </div>
              ))}
            </div>
          )}

          <div className="content">
            {view === "dashboard" && (
              <>
                {/* Stats */}
                <div className="stats-row">
                  {[
                    ["Total Deals", deals.length, "↑ 3 this week", true],
                    ["Deals Sent", statusCounts.sent + statusCounts.viewed + statusCounts.negotiating + statusCounts.closed, "Active pipeline", false],
                    ["Negotiating", statusCounts.negotiating, "Needs attention", false],
                    ["Closed", statusCounts.closed, "↑ 12% vs last wk", false],
                    ["Revenue", `$${(deals.filter(d=>d.status==="closed").reduce((a,d)=>a+d.price,0)/1000).toFixed(0)}K`, "This month", true],
                  ].map(([label, val, sub, hi]) => (
                    <div key={label} className={`stat-card ${hi?"highlight":""}`}>
                      <div className="stat-label">{label}</div>
                      <div className={`stat-value ${hi?"gold":""}`}>{val}</div>
                      <div className={`stat-sub ${sub.startsWith("↑")?"up":""}`}>{sub}</div>
                    </div>
                  ))}
                </div>

                {/* Deals Table */}
                <div className="section-header">
                  <div className="section-title">
                    {subview === "negotiating" ? "Active Negotiations" : "Deal Pipeline"}
                  </div>
                  <div className="section-actions">
                    <div className="search-bar">
                      <span className="search-icon">🔍</span>
                      <input placeholder="Search customer or vehicle…" />
                    </div>
                    <div style={{display:"flex",gap:"6px"}}>
                      {["all","sent","viewed","negotiating","closed"].map(s => (
                        <span key={s} className={`filter-chip ${filterStatus===s?"active":""}`} onClick={() => setFilterStatus(s)}>
                          {s === "all" ? "All" : s.charAt(0).toUpperCase()+s.slice(1)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="deals-table">
                  <div className="table-header">
                    <div className="th">Vehicle</div>
                    <div className="th">Customer</div>
                    <div className="th">Price</div>
                    <div className="th">Payment</div>
                    <div className="th">Status</div>
                    <div className="th">Created</div>
                    <div className="th">Actions</div>
                  </div>
                  {(subview === "negotiating" ? deals.filter(d => d.status === "negotiating") : filteredDeals).map(deal => (
                    <div key={deal.id} className="deal-row" onClick={() => openDealPage(deal)}>
                      <div className="deal-vehicle">
                        <div className="deal-thumb">{deal.emoji}</div>
                        <div>
                          <div className="deal-name">{deal.year} {deal.make} {deal.model}</div>
                          <div className="deal-vin">{deal.vin.slice(-8)}</div>
                        </div>
                      </div>
                      <div className="deal-customer">{deal.customer}</div>
                      <div>
                        <div className="deal-amount">{fv(deal.price)}</div>
                      </div>
                      <div>
                        <div className="deal-payment">{fv(deal.payment)}/mo</div>
                      </div>
                      <div>
                        <span className={`status-badge status-${deal.status}`}>{deal.status}</span>
                      </div>
                      <div className="deal-time">{deal.created}</div>
                      <div className="deal-actions" onClick={e => e.stopPropagation()}>
                        <button className="action-btn" onClick={() => { const nd = [...deals]; nd.find(d=>d.id===deal.id).status="sent"; setDeals(nd); showToast("Deal link sent to customer"); }}>Send</button>
                        <button className="action-btn" onClick={() => openDealPage(deal)}>View</button>
                      </div>
                    </div>
                  ))}
                  {filteredDeals.length === 0 && (
                    <div className="empty-state">
                      <div className="empty-icon">📋</div>
                      <div className="empty-text">No deals in this category yet</div>
                    </div>
                  )}
                </div>
              </>
            )}

            {view === "dealpage" && dealPage && (
              <>
                <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"20px"}}>
                  <button className="btn btn-ghost" onClick={() => setView("dashboard")}>← Back to Dashboard</button>
                  <div className="ai-chip">✦ Customer View</div>
                  <div style={{marginLeft:"auto",display:"flex",gap:"8px"}}>
                    <button className="btn btn-secondary" onClick={() => showToast("Link copied to clipboard!")}>📋 Copy Link</button>
                    <button className="btn btn-primary" onClick={() => { const nd=[...deals]; nd.find(d=>d.id===dealPage.id).status="sent"; setDeals(nd); showToast("Deal sent via SMS & Email"); }}>📤 Send to Customer</button>
                  </div>
                </div>

                <div style={{display:"grid",gridTemplateColumns:"480px 1fr",gap:"28px",alignItems:"start"}}>
                  {/* Customer-facing deal page */}
                  <div className="deal-page">
                    <div className="deal-page-header">
                      <div className="dealership-name">Premier Auto Group · Powered by DealFlow AI</div>
                      <div className="deal-page-title">Your Personalized Deal</div>
                    </div>

                    <div className="vehicle-card">
                      <div className="vehicle-image">{dealPage.emoji}</div>
                      <div className="vehicle-info">
                        <div className="vehicle-year">{dealPage.year}</div>
                        <div className="vehicle-model">{dealPage.make} {dealPage.model}</div>
                        <div className="vehicle-vin">VIN: {dealPage.vin}</div>
                      </div>
                    </div>

                    <div className="price-breakdown">
                      <div className="pb-title">Pricing Breakdown</div>
                      <div className="pb-row"><span className="pb-label">MSRP</span><span className="pb-value">{fv(dealPage.msrp)}</span></div>
                      <div className="pb-row discount"><span className="pb-label">Dealer Discount</span><span className="pb-value">−{fv(dealPage.discount)}</span></div>
                      {dealPage.tradeIn > 0 && <div className="pb-row discount"><span className="pb-label">Trade-In Value</span><span className="pb-value">−{fv(dealPage.tradeIn)}</span></div>}
                      <div className="pb-row"><span className="pb-label">Taxes</span><span className="pb-value">+{fv(dealPage.taxes)}</span></div>
                      <div className="pb-row"><span className="pb-label">Dealer Fees</span><span className="pb-value">+{fv(dealPage.fees)}</span></div>
                      <div className="pb-row total"><span className="pb-label">Out-The-Door</span><span className="pb-value">{fv(dealPage.price + dealPage.taxes + dealPage.fees - dealPage.tradeIn)}</span></div>
                    </div>

                    <div className="payment-options">
                      {[
                        { id:"finance60", type:"Finance · 60 Months", payment: dealPage.payment, details: `${dealPage.rate}% APR · ${fv(dealPage.downPayment)} down · ${fv(dealPage.price + dealPage.taxes + dealPage.fees - dealPage.downPayment - dealPage.tradeIn)} financed` },
                        { id:"finance72", type:"Finance · 72 Months", payment: Math.round(dealPage.payment * 0.88), details: `${dealPage.rate}% APR · ${fv(dealPage.downPayment)} down · Lower monthly payment` },
                        { id:"lease36", type:"Lease · 36 Months", payment: calcLease(dealPage.price), details: `12,000 mi/yr · ${fv(Math.round(dealPage.price * 0.1))} due at signing` },
                      ].map(opt => (
                        <div key={opt.id} className={`payment-option ${selectedOption===opt.id?"selected":""}`} onClick={() => setSelectedOption(opt.id)}>
                          <div className="po-type">{opt.type}</div>
                          <div className="po-payment"><span>$</span>{opt.payment.toLocaleString()}<span>/mo</span></div>
                          <div className="po-details">{opt.details}</div>
                        </div>
                      ))}
                    </div>

                    {showNeg && (
                      <div className="neg-panel">
                        <div className="neg-title">💬 Request a Better Deal</div>
                        <div className="neg-message">What would make this deal work for you? We'll review your request and get back to you within minutes.</div>
                        <textarea className="neg-input" placeholder="e.g. Can you lower the monthly payment to under $500? Or can you do more for my trade-in?" value={negText} onChange={e=>setNegText(e.target.value)} />
                        <div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
                          <button className="btn btn-primary" style={{flex:1}} onClick={() => { setShowNeg(false); const nd=[...deals]; nd.find(d=>d.id===dealPage.id).status="negotiating"; setDeals(nd); showToast("Counter offer sent to salesperson"); }}>Send Request</button>
                          <button className="btn btn-ghost" onClick={() => setShowNeg(false)}>Cancel</button>
                        </div>
                      </div>
                    )}

                    <div className="deal-actions-section">
                      <button className="deal-action-btn accept" onClick={() => { const nd=[...deals]; nd.find(d=>d.id===dealPage.id).status="closed"; setDeals(nd); showToast("🎉 Deal accepted! Paperwork initiated."); setView("dashboard"); }}>
                        ✓ Accept This Deal
                      </button>
                      <button className="deal-action-btn negotiate" onClick={() => setShowNeg(!showNeg)}>
                        💬 Request Lower Payment
                      </button>
                      <button className="deal-action-btn secondary" onClick={() => showToast("Test drive scheduled for tomorrow at 2 PM")}>
                        🚗 Schedule Test Drive
                      </button>
                      <button className="deal-action-btn secondary" onClick={() => showToast("Credit application link sent to your email")}>
                        📄 Submit Credit Application
                      </button>
                    </div>
                  </div>

                  {/* Salesperson analytics panel */}
                  <div>
                    <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"14px",padding:"20px",marginBottom:"16px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
                        <div style={{fontSize:"13px",fontWeight:"600",color:"var(--text)"}}>Deal Intelligence</div>
                        <div className="ai-chip">AI Powered</div>
                      </div>
                      <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:"9px",padding:"14px",fontSize:"13px",color:"var(--text-dim)",lineHeight:"1.6",marginBottom:"12px"}}>
                        ✦ <strong style={{color:"var(--text)"}}>AI Summary:</strong> Here is the pricing breakdown for the {dealPage.year} {dealPage.make} {dealPage.model} you were interested in. Your total out-the-door price reflects a dealer discount of {fv(dealPage.discount)} — bringing your payment to just {fv(dealPage.payment)}/mo with approved financing.
                      </div>
                      <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:"9px",padding:"14px",fontSize:"13px",color:"var(--text-dim)",lineHeight:"1.6"}}>
                        ✦ <strong style={{color:"var(--text)"}}>Suggested Follow-Up:</strong> "Good news {dealPage.customer.split(" ")[0]} — we were able to look at adjusting the down payment structure on your {dealPage.model}. Would you like to explore a lower monthly option?"
                      </div>
                    </div>

                    <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"14px",padding:"20px",marginBottom:"16px"}}>
                      <div style={{fontSize:"12px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"var(--text-muted)",marginBottom:"14px"}}>Customer Activity</div>
                      {[
                        ["Deal Opened","2 times","var(--green)"],
                        ["Time on Page","4m 32s","var(--text)"],
                        ["Options Clicked","Finance 60mo","var(--gold)"],
                        ["Last Viewed","18 min ago","var(--text-muted)"],
                      ].map(([label,val,color]) => (
                        <div key={label} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--border)",fontSize:"13px"}}>
                          <span style={{color:"var(--text-dim)"}}>{label}</span>
                          <span style={{color,fontWeight:"500"}}>{val}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:"14px",padding:"20px"}}>
                      <div style={{fontSize:"12px",fontWeight:"600",letterSpacing:"1px",textTransform:"uppercase",color:"var(--text-muted)",marginBottom:"14px"}}>Follow-Up Automation</div>
                      {[
                        ["24hr SMS","Pending","var(--gold)","📱"],
                        ["48hr Email","Pending","var(--text-muted)","📧"],
                        ["AI Nudge","Suggested","var(--blue)","✦"],
                      ].map(([label,status,color,icon]) => (
                        <div key={label} style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 0",borderBottom:"1px solid var(--border)",fontSize:"13px"}}>
                          <span>{icon}</span>
                          <span style={{color:"var(--text-dim)",flex:1}}>{label}</span>
                          <span style={{color,fontSize:"11px",fontWeight:"600"}}>{status}</span>
                        </div>
                      ))}
                      <div style={{marginTop:"12px"}}>
                        <div className="link-box">
                          <span className="link-url">dealflow.app/d/{dealPage.id}-{dealPage.make.toLowerCase()}-{dealPage.model.split(" ")[0].toLowerCase()}</span>
                          <button className="link-copy" onClick={() => showToast("Link copied!")}>Copy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {view === "manager" && (
              <>
                <div className="stats-row" style={{marginBottom:"24px"}}>
                  {[
                    ["Total Revenue","$284K","This month","true"],
                    ["Deals Created","43","↑ 8 vs last month","false"],
                    ["Avg Close Rate","62%","Team average","false"],
                    ["Avg Deal Value","$47.2K","Per closed deal","false"],
                    ["Active Negotiations","3","Needs attention","false"],
                  ].map(([l,v,s,hi]) => (
                    <div key={l} className={`stat-card ${hi==="true"?"highlight":""}`}>
                      <div className="stat-label">{l}</div>
                      <div className={`stat-value ${hi==="true"?"gold":""}`}>{v}</div>
                      <div className={`stat-sub ${s.startsWith("↑")?"up":""}`}>{s}</div>
                    </div>
                  ))}
                </div>

                <div className="manager-grid">
                  <div className="manager-card">
                    <div className="mc-title">Salesperson Performance</div>
                    {REPS.map(r => (
                      <div key={r.name} className="rep-row">
                        <div className="rep-avatar">{r.init}</div>
                        <div>
                          <div className="rep-name">{r.name}</div>
                          <div className="rep-stat">{r.deals} deals this month</div>
                        </div>
                        <div className="rep-right">
                          <div className="rep-deals">{r.closed}</div>
                          <div className="rep-rate">{r.rate} close rate</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="manager-card">
                    <div className="mc-title">Pipeline Distribution</div>
                    {[
                      ["Draft", statusCounts.draft, "#555565", deals.length],
                      ["Sent", statusCounts.sent, "#5a9ee0", deals.length],
                      ["Viewed", statusCounts.viewed, "#c9a84c", deals.length],
                      ["Negotiating", statusCounts.negotiating, "#f0783c", deals.length],
                      ["Closed", statusCounts.closed, "#3ecf8e", deals.length],
                    ].map(([label, count, color, total]) => (
                      <div key={label} className="pipeline-row">
                        <div className="pipeline-label">{label}</div>
                        <div className="pipeline-bar-wrap">
                          <div className="pipeline-bar" style={{width:`${total > 0 ? (count/total)*100 : 0}%`, background:color}} />
                        </div>
                        <div className="pipeline-count">{count}</div>
                      </div>
                    ))}
                  </div>

                  <div className="manager-card" style={{gridColumn:"1/-1"}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}}>
                      <div className="mc-title">Recent Deals</div>
                      <button className="btn btn-ghost" style={{fontSize:"12px",padding:"6px 14px"}}>Export CSV</button>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",gap:"0",paddingBottom:"8px",borderBottom:"1px solid var(--border)",marginBottom:"4px"}}>
                      {["Vehicle","Salesperson","Deal Value","Status","Close Date"].map(h => <div key={h} style={{fontSize:"11px",fontWeight:"600",color:"var(--text-muted)",letterSpacing:"0.8px",textTransform:"uppercase"}}>{h}</div>)}
                    </div>
                    {deals.slice(0,5).map(d => (
                      <div key={d.id} style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr 1fr",gap:"0",padding:"11px 0",borderBottom:"1px solid var(--border)",alignItems:"center"}}>
                        <div style={{fontSize:"13px",color:"var(--text)",fontWeight:"500"}}>{d.emoji} {d.year} {d.make} {d.model}</div>
                        <div style={{fontSize:"12px",color:"var(--text-dim)"}}>Mike K.</div>
                        <div style={{fontSize:"13px",color:"var(--text)",fontFamily:"'DM Mono',monospace"}}>{fv(d.price)}</div>
                        <div><span className={`status-badge status-${d.status}`}>{d.status}</span></div>
                        <div style={{fontSize:"12px",color:"var(--text-muted)"}}>{d.created}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* NEW DEAL MODAL */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <div className="modal-title">Create New Deal</div>
                <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <div className="modal-body">
                <div className="form-section">
                  <div className="form-section-title">Customer Information</div>
                  <div className="form-grid">
                    {[["customerName","Full Name","e.g. John Smith"],["phone","Phone","(555) 000-0000"],["email","Email","customer@email.com","full"]].map(([key,label,ph,full]) => (
                      <div key={key} className={`form-group ${full?"full":""}`}>
                        <label>{label}</label>
                        <input placeholder={ph} value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-section-title">Vehicle Information</div>
                  <div className="form-grid-3">
                    {[["year","Year","2024"],["make","Make","Toyota"],["model","Model","Camry XSE"]].map(([key,label,ph]) => (
                      <div key={key} className="form-group">
                        <label>{label}</label>
                        <input placeholder={ph} value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} />
                      </div>
                    ))}
                  </div>
                  <div className="form-grid" style={{marginTop:"10px"}}>
                    <div className="form-group">
                      <label>VIN</label>
                      <input placeholder="17-character VIN" value={form.vin} onChange={e => setForm({...form,vin:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Sale Price</label>
                      <input placeholder="$34,500" type="number" value={form.price} onChange={e => setForm({...form,price:e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <div className="form-section-title">Deal Structure</div>
                  <div className="form-grid-3">
                    {[["msrp","MSRP","$36,200"],["discount","Discount","$1,700"],["taxes","Taxes & Fees","$2,900"],["fees","Doc Fees","$895"],["downPayment","Down Payment","$3,000"],["tradeIn","Trade-In Value","$0"]].map(([key,label,ph]) => (
                      <div key={key} className="form-group">
                        <label>{label}</label>
                        <input placeholder={ph} type="number" value={form[key]} onChange={e => setForm({...form,[key]:e.target.value})} />
                      </div>
                    ))}
                  </div>
                  <div className="form-grid" style={{marginTop:"10px"}}>
                    <div className="form-group">
                      <label>Interest Rate (%)</label>
                      <input placeholder="5.9" type="number" step="0.1" value={form.rate} onChange={e => setForm({...form,rate:e.target.value})} />
                    </div>
                    <div className="form-group">
                      <label>Loan Term</label>
                      <select value={form.term} onChange={e => setForm({...form,term:e.target.value})}>
                        <option value="36">36 months</option>
                        <option value="48">48 months</option>
                        <option value="60">60 months</option>
                        <option value="72">72 months</option>
                        <option value="84">84 months</option>
                      </select>
                    </div>
                  </div>
                </div>

                {liveCalc && (
                  <div className="calc-box">
                    <div className="calc-title">✦ Live Calculation</div>
                    <div className="calc-grid">
                      <div className="calc-item">
                        <div className="calc-item-label">Monthly Payment</div>
                        <div className="calc-item-value">${liveCalc.payment.toLocaleString()}</div>
                        <div className="calc-item-sub">Estimated</div>
                      </div>
                      <div className="calc-item">
                        <div className="calc-item-label">Out-The-Door</div>
                        <div className="calc-item-value">${(liveCalc.ood/1000).toFixed(1)}K</div>
                        <div className="calc-item-sub">Total financed</div>
                      </div>
                      <div className="calc-item">
                        <div className="calc-item-label">Lease Option</div>
                        <div className="calc-item-value">${liveCalc.lease}/mo</div>
                        <div className="calc-item-sub">36 month est.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleCreateDeal}>Create Deal & Generate Link</button>
              </div>
            </div>
          </div>
        )}

        {toast && (
          <div className="toast">
            <span className="toast-icon">✓</span>
            {toast}
          </div>
        )}
      </div>
    </>
  );
}
export default DealBuilder;
