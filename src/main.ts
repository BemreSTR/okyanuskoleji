import './style.css';
import { getGrades, getGradeById, getUnitById } from './data';
import type { Video, Unit, Grade } from './types';

// Login Constants
const VALID_EMAIL = 'okyanuskoleji@gmail.com';
const VALID_PASSWORD = 'okyanuskoleji1';
const LOGIN_SESSION_KEY = 'okyanuskoleji_logged_in';

// Initialize login
function initializeLogin(): void {
  // Login screen is currently bypasssed as per user request
  showMainApp();
  return;

  /* Original login logic kept for future activation
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const loginError = document.getElementById('login-error');

  // Check if already logged in
  if (sessionStorage.getItem(LOGIN_SESSION_KEY)) {
    showMainApp();
    return;
  }

  loginForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      sessionStorage.setItem(LOGIN_SESSION_KEY, 'true');
      loginForm.reset();
      if (loginError) loginError.classList.remove('show');
      showMainApp();
    } else {
      if (loginError) {
        loginError.textContent = 'E-posta veya şifre hatalı';
        loginError.classList.add('show');
      }
      passwordInput.value = '';
    }
  });
  */
}

function showMainApp(): void {
  const loginScreen = document.getElementById('login-screen');
  const appContainer = document.getElementById('app');

  if (loginScreen) loginScreen.classList.add('hidden');
  if (appContainer) appContainer.classList.remove('hidden');

  // Start the main application
  startRouter();
}

// Basic output sanitizers to reduce XSS surface when rendering Firestore data
const ALLOWED_KAHOOT_HOSTS = new Set(['kahoot.it', 'create.kahoot.it']);
const ALLOWED_WORDWALL_HOSTS = new Set(['wordwall.net', 'www.wordwall.net']);
const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

function escapeHTML(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeYouTubeId(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return YOUTUBE_ID_PATTERN.test(trimmed) ? trimmed : null;
}

function sanitizeExternalLink(raw: string | undefined | null, allowedHosts: Set<string>): string | null {
  if (!raw) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== 'https:') return null;
    const host = url.hostname.toLowerCase();
    if (!allowedHosts.has(host)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

// Visitor Counter - CounterAPI.dev (CORS-friendly JSON API)
let hasIncrementedThisSession = false;

async function updateVisitorCount(): Promise<void> {
  const counterElement = document.getElementById('visitor-count-number');
  if (!counterElement) return;

  // Eğer bu oturumda zaten artırıldıysa, sadece göster
  if (hasIncrementedThisSession) {
    const stored = localStorage.getItem('okyanuskoleji_visits');
    if (stored) counterElement.textContent = parseInt(stored).toLocaleString('tr-TR');
    return;
  }

  try {
    // CounterAPI.dev - CORS destekli ve JSON döner
    const response = await fetch('https://api.counterapi.dev/v1/okyanuskoleji-website/visits/up');
    const data = await response.json();
    const count = data.count || 0;
    counterElement.textContent = count.toLocaleString('tr-TR');
    localStorage.setItem('okyanuskoleji_visits', count.toString());
    hasIncrementedThisSession = true;
  } catch (error) {
    // API başarısız olursa localStorage'dan göster
    const stored = localStorage.getItem('okyanuskoleji_visits');
    counterElement.textContent = stored ? parseInt(stored).toLocaleString('tr-TR') : '0';
  }
}

function createVisitorCounter(): string {
  return `
    <div class="visitor-counter">
      <span class="visitor-label">Ziyaretçi:</span>
      <span id="visitor-count-number" class="visitor-number">...</span>
    </div>
  `;
}

// SVG Icons
const kahootIcon = `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
const bookIcon = `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`;
const wheelIcon = `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg>`;
const backIcon = `<svg class="back-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`;

// ==================== VIDEO CARD ====================
function createVideoCard(video: Video): string {
  const safeTitle = escapeHTML(video.title);
  const materialUrl = video.materialUrl ? escapeHTML(video.materialUrl) : null;

  if (materialUrl) {
    // Özel İnteraktif Materyal Varsa
    return `
    <article class="video-card">
      <h3 class="video-title">${safeTitle}</h3>
      <div class="material-wrapper" style="padding: 2rem; display: flex; justify-content: center; align-items: center; background: #f8fafc; border-radius: 8px;">
         <a href="${materialUrl}" target="_blank" class="btn btn-primary" style="font-size: 1.2rem; padding: 1rem 2rem; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; border: none; border-radius: 12px; cursor: pointer; text-decoration: none; display: flex; align-items: center; gap: 10px;">
           <span>🚀</span>
           <span>İnteraktif Konu Anlatımını Başlat</span>
         </a>
      </div>
    </article>
  `;
  } else {
    // Henüz Materyal Yoksa - İnaktif Buton
    return `
    <article class="video-card">
      <h3 class="video-title">${safeTitle}</h3>
      <div class="material-wrapper" style="padding: 2rem; display: flex; justify-content: center; align-items: center; background: #f8fafc; border-radius: 8px;">
         <button class="btn btn-secondary" disabled style="font-size: 1.2rem; padding: 1rem 2rem; background: #e2e8f0; color: #94a3b8; border: none; border-radius: 12px; cursor: not-allowed; display: flex; align-items: center; gap: 10px;">
           <span>⏳</span>
           <span>İnteraktif Konu Anlatımı Hazırlanıyor...</span>
         </button>
      </div>
    </article>
  `;
  }
}

// ==================== HOME PAGE ====================
async function renderHomePage(): Promise<string> {
  const grades = await getGrades();

  const gradeCards = grades.map(grade => {
    const safeDisplayName = escapeHTML(grade.displayName);
    const safeId = escapeHTML(grade.id);

    return `
      <a href="${grade.isActive ? `#/sinif/${safeId}` : '#/'}" class="grade-card grade-card--${safeId} ${!grade.isActive ? 'grade-card--disabled' : ''}">
        <span class="grade-number">${safeId}</span>
        <span class="grade-label">${safeDisplayName}</span>
        ${grade.units.length === 0 ? '<span class="coming-soon">Yakında</span>' : ''}
      </a>
    `;
  }).join('');

  return `
    ${createVisitorCounter()}
    <header class="header">
      <div class="header-content">
        <h1 class="logo">OKYANUS KOLEJİ</h1>
        <img src="${import.meta.env.BASE_URL}images/dinakademi.png" alt="Okyanus Koleji Banner" class="header-banner" />
        <p class="tagline">Öğrenciler için eğitici videolar, <br> Wordwall ve Kahoot yarışmaları</p>
      </div>
    </header>
    <main class="container">
      <h2 class="section-title">Sınıfını Seç</h2>
      <div class="grade-grid">
        ${gradeCards}
      </div>
    </main>
    <footer class="footer">
      <p class="footer-text">© ${new Date().getFullYear()} OKYANUS KOLEJİ</p>
    </footer>
  `;
}

// ==================== UNITS PAGE ====================
async function renderUnitsPage(grade: Grade): Promise<string> {
  const safeGradeId = escapeHTML(grade.id);
  const safeGradeDisplayName = escapeHTML(grade.displayName);

  const unitCards = grade.units.map((unit, index) => `
    <a href="#/sinif/${safeGradeId}/unite/${escapeHTML(unit.id)}" class="unit-card unit-card--grade-${safeGradeId}">
      <span class="unit-number">${index + 1}</span>
      <span class="unit-name">${escapeHTML(unit.name)}</span>
      <span class="unit-video-count">${unit.videos.length} Konu</span>
    </a>
  `).join('');

  return `
    ${createVisitorCounter()}
    <header class="header header--compact header--grade-${grade.id}">
      <div class="header-content">
        <a href="#/" class="back-button back-button--grade-${safeGradeId}">${backIcon} Ana Sayfa</a>
        <h1 class="logo logo--small logo--grade-${safeGradeId}">${safeGradeDisplayName}</h1>
        <p class="tagline">Temaları keşfet, konuları öğren!</p>
      </div>
    </header>
    <main class="container">
      <h2 class="section-title">Temalar</h2>
      <div class="unit-grid">
        ${unitCards}
      </div>
    </main>
    <footer class="footer">
      <p class="footer-text">© ${new Date().getFullYear()} OKYANUS KOLEJİ</p>
    </footer>
  `;
}

// ==================== VIDEOS PAGE ====================
async function renderVideosPage(grade: Grade, unit: Unit): Promise<string> {
  const videoCards = unit.videos.map(createVideoCard).join('');
  const safeGradeId = escapeHTML(grade.id);
  const safeGradeDisplayName = escapeHTML(grade.displayName);
  const safeUnitName = escapeHTML(unit.name);

  return `
    ${createVisitorCounter()}
    <header class="header header--compact header--grade-${safeGradeId}">
      <div class="header-content">
        <a href="#/sinif/${safeGradeId}" class="back-button back-button--grade-${safeGradeId}">${backIcon} Temalar</a>
        <h1 class="logo logo--small logo--grade-${safeGradeId}">${safeGradeDisplayName}</h1>
        <p class="tagline">${safeUnitName}</p>
        <div class="video-count video-count--grade-${safeGradeId}">
          <span class="video-count-number">${unit.videos.length}</span>
          <span class="video-count-text">Konu</span>
        </div>
      </div>
    </header>
    <main class="container">
      <div class="video-grid">
        ${videoCards}
      </div>
    </main>
    <footer class="footer">
      <p class="footer-text">© ${new Date().getFullYear()} OKYANUS KOLEJİ</p>
    </footer>
  `;
}

// ==================== 404 PAGE ====================
function render404Page(): string {
  return `
    <div class="error-page">
      <h1>404</h1>
      <p>Sayfa bulunamadı</p>
      <a href="#/" class="back-button">${backIcon} Ana Sayfa</a>
    </div>
  `;
}

// ==================== ROUTER ====================
async function router(): Promise<void> {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  // Show loading
  app.innerHTML = '<div class="loading">Yükleniyor...</div>';

  const hash = window.location.hash || '#/';

  // Ana sayfa
  if (hash === '#/' || hash === '') {
    app.innerHTML = await renderHomePage();
    updateVisitorCount();
    return;
  }

  // Sınıf sayfası: #/sinif/5
  const gradeMatch = hash.match(/^#\/sinif\/(\d+)$/);
  if (gradeMatch) {
    const gradeId = gradeMatch[1];
    const grade = await getGradeById(gradeId);
    if (grade && grade.isActive) {
      app.innerHTML = await renderUnitsPage(grade);
      updateVisitorCount();
    } else {
      app.innerHTML = render404Page();
    }
    return;
  }

  // Ünite sayfası: #/sinif/2/unite/tema-1
  const unitMatch = hash.match(/^#\/sinif\/(\d+)\/unite\/([a-zA-Z0-9_-]+)$/);
  if (unitMatch) {
    const gradeId = unitMatch[1];
    const unitId = unitMatch[2];
    const grade = await getGradeById(gradeId);
    const unit = await getUnitById(gradeId, unitId);
    if (grade && unit) {
      app.innerHTML = await renderVideosPage(grade, unit);
      updateVisitorCount();
    } else {
      app.innerHTML = render404Page();
    }
    return;
  }

  // 404
  app.innerHTML = render404Page();
}

// ==================== INIT ====================
window.addEventListener('hashchange', router);

// Initialize login first, then app
document.addEventListener('DOMContentLoaded', () => {
  initializeLogin();
});

// Only start router after app is shown
function startRouter() {
  window.addEventListener('hashchange', router);
  router();
}
