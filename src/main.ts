import './style.css';
import { videos } from './data';
import type { Video } from './types';

// SVG Icons
const kahootIcon = `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
const bookIcon = `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`;
const wheelIcon = `<svg class="link-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/></svg>`;

function createVideoCard(video: Video): string {
  const kahootButton = video.kahootLink
    ? `<a href="${video.kahootLink}" target="_blank" rel="noopener noreferrer" class="link-btn link-btn--kahoot">
        ${kahootIcon}
        <span>Kahoot</span>
       </a>`
    : '';

  const wordwallKitaplikButton = video.wordwallKitaplik
    ? `<a href="${video.wordwallKitaplik}" target="_blank" rel="noopener noreferrer" class="link-btn link-btn--wordwall-kitaplik">
        ${bookIcon}
        <span>Kitaplık</span>
       </a>`
    : '';

  const wordwallCarkifelekButton = video.wordwallCarkifelek
    ? `<a href="${video.wordwallCarkifelek}" target="_blank" rel="noopener noreferrer" class="link-btn link-btn--wordwall-carkifelek">
        ${wheelIcon}
        <span>Çarkıfelek</span>
       </a>`
    : '';

  return `
    <article class="video-card">
      <h3 class="video-title">${video.title}</h3>
      <div class="video-embed">
        <iframe 
          src="https://www.youtube.com/embed/${video.youtubeId}" 
          title="${video.title}"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
      <div class="video-links">
        ${kahootButton}
        <div class="wordwall-buttons">
          ${wordwallKitaplikButton}
          ${wordwallCarkifelekButton}
        </div>
      </div>
    </article>
  `;
}

function createHeader(): string {
  return `
    <header class="header">
      <div class="header-content">
        <h1 class="logo">🎓 Ali Öflü</h1>
        <p class="tagline">Çocuklar için eğlenceli ve öğretici videolar, interaktif aktiviteler</p>
        <div class="video-count">
          <span class="video-count-number">${videos.length}</span>
          <span class="video-count-text">Eğitici Video</span>
        </div>
      </div>
    </header>
  `;
}

function createVideoGrid(): string {
  if (videos.length === 0) {
    return `
      <div class="empty-state">
        <div class="empty-state-icon">📹</div>
        <p class="empty-state-text">Henüz video eklenmemiş</p>
      </div>
    `;
  }

  return videos.map(createVideoCard).join('');
}

function createFooter(): string {
  return `
    <footer class="footer">
      <p class="footer-text">© ${new Date().getFullYear()} Ali Öflü - Tüm hakları saklıdır</p>
    </footer>
  `;
}

function renderApp(): void {
  const app = document.querySelector<HTMLDivElement>('#app');

  if (!app) return;

  app.innerHTML = `
    ${createHeader()}
    <main class="container">
      <div class="video-grid">
        ${createVideoGrid()}
      </div>
    </main>
    ${createFooter()}
  `;
}

// Initialize the app
document.addEventListener('DOMContentLoaded', renderApp);
renderApp();
