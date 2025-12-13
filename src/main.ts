import './style.css';
import { getGrades, getGradeById, getUnitById } from './data';
import type { Video, Unit, Grade } from './types';

// Visitor Counter - CounterAPI.dev (CORS-friendly JSON API)
let hasIncrementedThisSession = false;

async function updateVisitorCount(): Promise<void> {
  const counterElement = document.getElementById('visitor-count-number');
  if (!counterElement) return;

  // Eğer bu oturumda zaten artırıldıysa, sadece göster
  if (hasIncrementedThisSession) {
    const stored = localStorage.getItem('dinakademi_visits');
    if (stored) counterElement.textContent = parseInt(stored).toLocaleString('tr-TR');
    return;
  }

  try {
    // CounterAPI.dev - CORS destekli ve JSON döner
    const response = await fetch('https://api.counterapi.dev/v1/dinakademi-website/visits/up');
    const data = await response.json();
    const count = data.count || 0;
    counterElement.textContent = count.toLocaleString('tr-TR');
    localStorage.setItem('dinakademi_visits', count.toString());
    hasIncrementedThisSession = true;
  } catch (error) {
    // API başarısız olursa localStorage'dan göster
    const stored = localStorage.getItem('dinakademi_visits');
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
  const kahootButton = video.kahootLink
    ? `<a href="${video.kahootLink}" target="_blank" rel="noopener noreferrer" class="link-btn link-btn--kahoot">
        ${kahootIcon}
        <span>Kahoot</span>
      </a>`
    : '';

  const wordwallButtons = `
    <div class="wordwall-buttons">
      <a href="${video.wordwallKitaplik}" target="_blank" rel="noopener noreferrer" class="link-btn link-btn--wordwall-kitaplik">
        ${bookIcon}
        <span>Kitaplık</span>
      </a>
      <a href="${video.wordwallCarkifelek}" target="_blank" rel="noopener noreferrer" class="link-btn link-btn--wordwall-carkifelek">
        ${wheelIcon}
        <span>Çarkıfelek</span>
      </a>
    </div>
  `;

  return `
    <article class="video-card">
      <h3 class="video-title">${video.title}</h3>
      <div class="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/${video.youtubeId}"
          title="${video.title}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
      <div class="video-links">
        ${kahootButton}
        ${wordwallButtons}
      </div>
    </article>
  `;
}

// ==================== HOME PAGE ====================
async function renderHomePage(): Promise<string> {
  const grades = await getGrades();

  const gradeCards = grades.map(grade => `
    <a href="${grade.isActive ? `#/sinif/${grade.id}` : '#/'}" class="grade-card grade-card--${grade.id} ${!grade.isActive ? 'grade-card--disabled' : ''}">
      <span class="grade-number">${grade.id}</span>
      <span class="grade-label">${grade.displayName}</span>
      ${!grade.isActive ? '<span class="coming-soon">Yakında</span>' : ''}
    </a>
  `).join('');

  return `
    ${createVisitorCounter()}
    <header class="header">
      <div class="header-content">
        <h1 class="logo">DİN AKADEMİ</h1>
        <img src="${import.meta.env.BASE_URL}images/dinakademi.png" alt="Din Akademi Banner" class="header-banner" />
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
      <p class="footer-text">© ${new Date().getFullYear()} DİN AKADEMİ</p>
    </footer>
  `;
}

// ==================== UNITS PAGE ====================
async function renderUnitsPage(grade: Grade): Promise<string> {
  const unitCards = grade.units.map(unit => `
    <a href="#/sinif/${grade.id}/unite/${unit.id}" class="unit-card unit-card--grade-${grade.id}">
      <span class="unit-number">${unit.id}</span>
      <span class="unit-name">${unit.name}</span>
      <span class="unit-video-count">${unit.videos.length} Video</span>
    </a>
  `).join('');

  return `
    ${createVisitorCounter()}
    <header class="header header--compact header--grade-${grade.id}">
      <div class="header-content">
        <a href="#/" class="back-button back-button--grade-${grade.id}">${backIcon} Ana Sayfa</a>
        <h1 class="logo logo--small logo--grade-${grade.id}">${grade.displayName}</h1>
        <p class="tagline">Üniteleri keşfet, videoları izle!</p>
      </div>
    </header>
    <main class="container">
      <h2 class="section-title">Üniteler</h2>
      <div class="unit-grid">
        ${unitCards}
      </div>
    </main>
    <footer class="footer">
      <p class="footer-text">© ${new Date().getFullYear()} DİN AKADEMİ</p>
    </footer>
  `;
}

// ==================== VIDEOS PAGE ====================
async function renderVideosPage(grade: Grade, unit: Unit): Promise<string> {
  const videoCards = unit.videos.map(createVideoCard).join('');

  return `
    ${createVisitorCounter()}
    <header class="header header--compact header--grade-${grade.id}">
      <div class="header-content">
        <a href="#/sinif/${grade.id}" class="back-button back-button--grade-${grade.id}">${backIcon} Üniteler</a>
        <h1 class="logo logo--small logo--grade-${grade.id}">${grade.displayName}</h1>
        <p class="tagline">${unit.name}</p>
        <div class="video-count video-count--grade-${grade.id}">
          <span class="video-count-number">${unit.videos.length}</span>
          <span class="video-count-text">Video</span>
        </div>
      </div>
    </header>
    <main class="container">
      <div class="video-grid">
        ${videoCards}
      </div>
    </main>
    <footer class="footer">
      <p class="footer-text">© ${new Date().getFullYear()} DİN AKADEMİ</p>
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

  // Ünite sayfası: #/sinif/5/unite/1
  const unitMatch = hash.match(/^#\/sinif\/(\d+)\/unite\/(\d+)$/);
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
window.addEventListener('DOMContentLoaded', router);
router();
