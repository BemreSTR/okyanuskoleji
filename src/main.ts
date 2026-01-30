import './style.css';
import { getGrades, getGradeById, getUnitById } from './data';
import type { Video, Unit, Grade } from './types';

// Login Constants
const VALID_EMAIL = 'okyanuskoleji@gmail.com';
const VALID_PASSWORD = 'okyanuskoleji1';
const LOGIN_SESSION_KEY = 'okyanuskoleji_logged_in';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeLogin();
});

// Initialize login
function initializeLogin(): void {
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const loginError = document.getElementById('login-error');

  // Check if already logged in
  if (sessionStorage.getItem(LOGIN_SESSION_KEY)) {
    showMainApp();
    return;
  }

  if (loginForm) {
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
  }
}

function showMainApp(): void {
  const loginScreen = document.getElementById('login-screen');
  const appContainer = document.getElementById('app');

  if (loginScreen) loginScreen.classList.add('hidden');
  if (appContainer) appContainer.classList.remove('hidden');

  // Start the main application
  startRouter();
}

function escapeHTML(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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
const backIcon = `<svg class="back-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`;

// ==================== VIDEO CARD ====================
function createVideoCard(video: Video): string {
  const safeTitle = escapeHTML(video.title);
  
  // Base URL'i dikkate alarak link oluştur
  let materialUrl = null;
  if(video.materialUrl) {
    const baseUrl = import.meta.env.BASE_URL; // e.g., '/okyanuskoleji/' or '/'
    const cleanMaterialPath = video.materialUrl.startsWith('/') ? video.materialUrl.substring(1) : video.materialUrl;
    materialUrl = escapeHTML(baseUrl + cleanMaterialPath);
  }

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
        <img src="${import.meta.env.BASE_URL}images/okyanus.jpg" alt="Okyanus Koleji Banner" class="header-banner" />
        <p class="tagline">İnteraktif konu anlatımları, eğlenceli etkinlikler ve <br> dijital öğrenme materyalleri</p>
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
// Window listener moved to startRouter

// Only start router after app is shown
function startRouter() {
  window.addEventListener('hashchange', router);
  router();
}
