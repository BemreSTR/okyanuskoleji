import './admin.css';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { loadGrades, addVideo, updateVideo, deleteVideo, addUnit, updateUnit, deleteUnit, updateVideoOrder, updateUnitOrder } from '../services/firebase.service';
import { validateVideoForm, validateUnitForm } from '../utils/security';
import type { Grade, Unit, Video } from '../types';
import Sortable from 'sortablejs';

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

// DOM Elements
const loginScreen = document.getElementById('login-screen')!;
const dashboardScreen = document.getElementById('dashboard-screen')!;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const loginError = document.getElementById('login-error')!;
const logoutBtn = document.getElementById('logout-btn')!;
const userEmailSpan = document.getElementById('user-email')!;

//State
let currentGrades: Grade[] = [];
let currentView: 'videos' | 'units' = 'videos';
let selectedGradeId: string = '';
let selectedUnitId: string = '';

// ====================AUTH====================
onAuthStateChanged(auth, (user) => {
    if (user) {
        userEmailSpan.textContent = user.email || '';
        showDashboard();
    } else {
        showLogin();
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
        loginError.textContent = 'Giriş başarısız! Email veya şifre hatalı.';
        loginError.style.display = 'block';
    }
});

logoutBtn.addEventListener('click', async () => {
    await signOut(auth);
});

function showLogin() {
    loginScreen.style.display = 'flex';
    dashboardScreen.style.display = 'none';
}

function showDashboard() {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
    loadData();
}

// ==================== DATA LOADING ====================
async function loadData() {
    currentGrades = await loadGrades();
    renderCurrentView();

    // Restore state from sessionStorage
    restoreState();
}

// State persistence
function saveState() {
    sessionStorage.setItem('admin_selectedGradeId', selectedGradeId);
    sessionStorage.setItem('admin_selectedUnitId', selectedUnitId);
    sessionStorage.setItem('admin_currentView', currentView);

    // Save unit view grade selection
    const unitsGradeSelect = document.getElementById('units-grade-select') as HTMLSelectElement;
    if (unitsGradeSelect) {
        sessionStorage.setItem('admin_unitsGradeId', unitsGradeSelect.value);
    }
}

function restoreState() {
    const savedGradeId = sessionStorage.getItem('admin_selectedGradeId');
    const savedUnitId = sessionStorage.getItem('admin_selectedUnitId');
    const savedView = sessionStorage.getItem('admin_currentView');
    const savedUnitsGradeId = sessionStorage.getItem('admin_unitsGradeId');

    if (savedView) {
        currentView = savedView as 'videos' | 'units';
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-view') === savedView);
        });
    }

    if (savedGradeId && currentView === 'videos') {
        gradeSelect.value = savedGradeId;
        selectedGradeId = savedGradeId;
        gradeSelect.dispatchEvent(new Event('change'));

        if (savedUnitId) {
            setTimeout(() => {
                unitSelect.value = savedUnitId;
                selectedUnitId = savedUnitId;
                unitSelect.dispatchEvent(new Event('change'));
            }, 100);
        }
    }

    // Restore unit view
    if (savedUnitsGradeId && currentView === 'units') {
        setTimeout(() => {
            const unitsGradeSelect = document.getElementById('units-grade-select') as HTMLSelectElement;
            if (unitsGradeSelect) {
                unitsGradeSelect.value = savedUnitsGradeId;
                unitsGradeSelect.dispatchEvent(new Event('change'));
            }
        }, 100);
    }
}

// ==================== NAVIGATION ====================
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const target = e.target as HTMLButtonElement;
        const view = target.dataset.view as 'videos' | 'units';

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        target.classList.add('active');

        currentView = view;
        renderCurrentView();
    });
});

function renderCurrentView() {
    if (currentView === 'videos') {
        document.getElementById('videos-view')!.style.display = 'block';
        document.getElementById('units-view')!.style.display = 'none';
        renderVideosView();
    } else {
        document.getElementById('videos-view')!.style.display = 'none';
        document.getElementById('units-view')!.style.display = 'block';
        renderUnitsView();
    }
}

// ==================== VIDEOS VIEW ====================
const gradeSelect = document.getElementById('grade-select') as HTMLSelectElement;
const unitSelect = document.getElementById('unit-select') as HTMLSelectElement;
const videosListEl = document.getElementById('videos-list')!;
const addVideoBtn = document.getElementById('add-video-btn')!;

gradeSelect.addEventListener('change', () => {
    selectedGradeId = gradeSelect.value;
    selectedUnitId = '';

    if (selectedGradeId) {
        const grade = currentGrades.find(g => g.id === selectedGradeId);
        unitSelect.disabled = false;
        unitSelect.innerHTML = '<option value="">Tema Seçin</option>';

        grade?.units.forEach((unit, index) => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = `${index + 1}. ${unit.name}`;
            unitSelect.appendChild(option);
        });
    } else {
        unitSelect.disabled = true;
        unitSelect.innerHTML = '<option value="">Önce sınıf seçin</option>';
    }

    saveState();
    renderVideosList();
});

unitSelect.addEventListener('change', () => {
    selectedUnitId = unitSelect.value;
    saveState();
    renderVideosList();
});

function renderVideosView() {
    // Reset selections on view change
    gradeSelect.value = '';
    unitSelect.value = '';
    selectedGradeId = '';
    selectedUnitId = '';
    renderVideosList();
}

function renderVideosList() {
    if (!selectedGradeId || !selectedUnitId) {
        videosListEl.innerHTML = '<p class="empty-state">Sınıf ve tema seçin</p>';
        return;
    }

    const grade = currentGrades.find(g => g.id === selectedGradeId);
    const unit = grade?.units.find(u => u.id === selectedUnitId);

    if (!unit || unit.videos.length === 0) {
        videosListEl.innerHTML = '<p class="empty-state">Henüz konu yok</p>';
        return;
    }

    videosListEl.innerHTML = unit.videos.map((video: any) => {
        const safeDocId = escapeHTML(video._docId || '');
        const safeTitle = escapeHTML(video.title || '');
        const safeYoutubeId = escapeHTML(video.youtubeId || '');

        return `
        <div class="item-card" data-id="${safeDocId}">
          <div class="drag-handle">⋮⋮</div>
          <div class="item-info">
            <h4>${safeTitle}</h4>
            <p class="item-meta">YouTube ID: ${safeYoutubeId}</p>
          </div>
          <div class="item-actions">
            <button class="btn btn-sm btn-secondary js-edit-video" data-id="${safeDocId}">Düzenle</button>
            <button class="btn btn-sm btn-danger js-remove-video" data-id="${safeDocId}">Sil</button>
          </div>
        </div>
      `;
    }).join('');

    // Initialize Sortable for drag-drop
    Sortable.create(videosListEl, {
        handle: '.drag-handle',
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: async function (evt) {
            if (evt.oldIndex === evt.newIndex) return;

            // Get all video elements in new order
            const videoElements = Array.from(videosListEl.querySelectorAll('.item-card'));
            const videoOrder = videoElements.map((el, index) => ({
                docId: el.getAttribute('data-id'),
                order: index
            }));

            // Update Firebase with new order
            try {
                for (const item of videoOrder) {
                    if (item.docId) {
                        await updateVideoOrder(selectedGradeId, selectedUnitId, item.docId, item.order);
                    }
                }
                // Reload data to reflect changes
                await loadData();
            } catch (error) {
                console.error('Error updating video order:', error);
                alert('Sıralama kaydedilemedi!');
            }
        }
    });
}

videosListEl.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    const editButton = target.closest<HTMLButtonElement>('.js-edit-video');
    const removeButton = target.closest<HTMLButtonElement>('.js-remove-video');

    const docId = editButton?.dataset.id || removeButton?.dataset.id;
    if (!docId) return;

    const grade = currentGrades.find(g => g.id === selectedGradeId);
    const unit = grade?.units.find(u => u.id === selectedUnitId);
    const video = unit?.videos.find((v: any) => v._docId === docId);

    if (editButton) {
        if (video) openVideoModal(video);
        return;
    }

    if (removeButton) {
        if (!confirm('Bu konuyu silmek istediğinize emin misiniz?')) return;
        try {
            await deleteVideo(selectedGradeId, selectedUnitId, docId);
            await loadData();
            alert('Konu silindi!');
        } catch (error) {
            alert('Hata oluştu: ' + error);
        }
    }
});

addVideoBtn.addEventListener('click', () => {
    if (!selectedGradeId || !selectedUnitId) {
        alert('Önce sınıf ve tema seçin!');
        return;
    }
    openVideoModal();
});

// ==================== VIDEO MODAL ====================
const videoModal = document.getElementById('video-modal')!;
const videoForm = document.getElementById('video-form') as HTMLFormElement;

function openVideoModal(video?: any) {
    document.getElementById('video-modal-title')!.textContent = video ? 'Konu Düzenle' : 'Yeni Konu';

    if (video) {
        (document.getElementById('video-id') as HTMLInputElement).value = video._docId || '';
        (document.getElementById('video-title') as HTMLInputElement).value = video.title;
        (document.getElementById('youtube-id') as HTMLInputElement).value = video.youtubeId;
        (document.getElementById('kahoot-link') as HTMLInputElement).value = video.kahootLink || '';
        (document.getElementById('wordwall-kitaplik') as HTMLInputElement).value = video.wordwallKitaplik || '';
        (document.getElementById('wordwall-carkifelek') as HTMLInputElement).value = video.wordwallCarkifelek || '';
    } else {
        videoForm.reset();
        (document.getElementById('video-id') as HTMLInputElement).value = '';
    }

    videoModal.style.display = 'flex';
}

function closeVideoModal() {
    videoModal.style.display = 'none';
    videoForm.reset();
}

// Helper: Extract YouTube ID from URL or return as-is if already an ID
function extractYouTubeId(input: string): string {
    const trimmed = input.trim();

    // If it's already just an ID (11 characters, alphanumeric), return it
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
        return trimmed;
    }

    // Try to extract from various YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
        const match = trimmed.match(pattern);
        if (match) return match[1];
    }

    // If no pattern matched, return original (might be invalid, will be caught later)
    return trimmed;
}

videoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const videoId = (document.getElementById('video-id') as HTMLInputElement).value;
    const youtubeInput = (document.getElementById('youtube-id') as HTMLInputElement).value;
    const title = (document.getElementById('video-title') as HTMLInputElement).value.trim();
    const kahootLink = (document.getElementById('kahoot-link') as HTMLInputElement).value.trim();
    const wordwallKitaplik = (document.getElementById('wordwall-kitaplik') as HTMLInputElement).value.trim();
    const wordwallCarkifelek = (document.getElementById('wordwall-carkifelek') as HTMLInputElement).value.trim();

    const extractedYouTubeId = extractYouTubeId(youtubeInput);
    const sanitizedYouTubeId = sanitizeYouTubeId(extractedYouTubeId);
    const sanitizedKahoot = sanitizeExternalLink(kahootLink, ALLOWED_KAHOOT_HOSTS);
    const sanitizedKitaplik = sanitizeExternalLink(wordwallKitaplik, ALLOWED_WORDWALL_HOSTS);
    const sanitizedCarki = sanitizeExternalLink(wordwallCarkifelek, ALLOWED_WORDWALL_HOSTS);

    if (!sanitizedYouTubeId) {
        alert('Geçersiz YouTube ID. Lütfen yalnızca 11 karakterlik YouTube video ID girin.');
        return;
    }
    if (kahootLink && !sanitizedKahoot) {
        alert('Kahoot linki yalnızca https://create.kahoot.it veya kahoot.it adreslerinden olmalıdır.');
        return;
    }
    if (wordwallKitaplik && !sanitizedKitaplik) {
        alert('Wordwall Kitaplık linki yalnızca https://wordwall.net adresinden olmalıdır.');
        return;
    }
    if (wordwallCarkifelek && !sanitizedCarki) {
        alert('Wordwall Çarkıfelek linki yalnızca https://wordwall.net adresinden olmalıdır.');
        return;
    }

    const videoData: Video = {
        id: videoId || `${selectedUnitId}-${Date.now()}`,
        title,
        youtubeId: sanitizedYouTubeId || '',
        kahootLink: sanitizedKahoot || undefined,
        wordwallKitaplik: sanitizedKitaplik || undefined,
        wordwallCarkifelek: sanitizedCarki || undefined
    };

    // Validate form data
    const validation = validateVideoForm(videoData);
    if (!validation.valid) {
        alert('Form hataları:\n\n' + validation.errors.join('\n'));
        return;
    }

    try {
        if (videoId) {
            await updateVideo(selectedGradeId, selectedUnitId, videoId, videoData);
        } else {
            await addVideo(selectedGradeId, selectedUnitId, videoData);
        }

        closeVideoModal();
        await loadData();
        alert('Konu başarıyla kaydedildi!');
    } catch (error) {
        console.error('Video save error:', error);
        alert('Konu kaydedilirken hata oluştu: ' + error);
    }
});

document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
        closeVideoModal();
        closeUnitModal();
    });
});

// ==================== UNITS VIEW ====================
const unitsGradeSelect = document.getElementById('units-grade-select') as HTMLSelectElement;
const unitsListEl = document.getElementById('units-list')!;
const addUnitBtn = document.getElementById('add-unit-btn')!;

unitsGradeSelect.addEventListener('change', () => {
    saveState();
    renderUnitsList();
});

function renderUnitsView() {
    unitsGradeSelect.value = '';
    renderUnitsList();
}

function renderUnitsList() {
    const gradeId = unitsGradeSelect.value;

    if (!gradeId) {
        unitsListEl.innerHTML = '<p class="empty-state">Sınıf seçin</p>';
        return;
    }

    const grade = currentGrades.find(g => g.id === gradeId);

    if (!grade || grade.units.length === 0) {
        unitsListEl.innerHTML = '<p class="empty-state">Henüz tema yok</p>';
        return;
    }

    unitsListEl.innerHTML = grade.units.map((unit, index) => `
    <div class="item-card" data-id="${escapeHTML(unit.id)}" data-grade="${escapeHTML(gradeId)}">
      <div class="drag-handle">⋮⋮</div>
      <div class="item-info">
        <h4>${index + 1}. ${escapeHTML(unit.name)}</h4>
        <p class="item-meta">${unit.videos.length} konu</p>
      </div>
      <div class="item-actions">
        <button class="btn btn-sm btn-secondary js-edit-unit" data-grade="${escapeHTML(gradeId)}" data-id="${escapeHTML(unit.id)}">Düzenle</button>
        <button class="btn btn-sm btn-danger js-remove-unit" data-grade="${escapeHTML(gradeId)}" data-id="${escapeHTML(unit.id)}">Sil</button>
      </div>
    </div>
  `).join('');

    // Initialize Sortable for drag-drop
    Sortable.create(unitsListEl, {
        handle: '.drag-handle',
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: async function (evt) {
            if (evt.oldIndex === evt.newIndex) return;

            // Get all unit elements in new order
            const unitElements = Array.from(unitsListEl.querySelectorAll('.item-card'));
            const unitOrder = unitElements.map((el, index) => ({
                id: el.getAttribute('data-id'),
                order: index
            }));

            // Update Firebase with new order
            try {
                for (const item of unitOrder) {
                    if (item.id) {
                        await updateUnitOrder(gradeId, item.id, item.order);
                    }
                }
                // Reload data to reflect changes
                await loadData();
            } catch (error) {
                console.error('Error updating unit order:', error);
                alert('Sıralama kaydedilemedi!');
            }
        }
    });
}

unitsListEl.addEventListener('click', async (event) => {
    const target = event.target as HTMLElement;
    const editButton = target.closest<HTMLButtonElement>('.js-edit-unit');
    const removeButton = target.closest<HTMLButtonElement>('.js-remove-unit');

    const gradeId = editButton?.dataset.grade || removeButton?.dataset.grade;
    const unitId = editButton?.dataset.id || removeButton?.dataset.id;
    if (!gradeId || !unitId) return;

    const grade = currentGrades.find(g => g.id === gradeId);
    const unit = grade?.units.find(u => u.id === unitId);

    if (editButton) {
        if (unit) openUnitModal(gradeId, unit);
        return;
    }

    if (removeButton) {
        if (!confirm('Bu temayı silmek istediğinize emin misiniz? İçindeki tüm konular silinecek!')) return;
        try {
            await deleteUnit(gradeId, unitId);
            await loadData();
            alert('Tema silindi!');
        } catch (error) {
            alert('Hata oluştu: ' + error);
        }
    }
});

addUnitBtn.addEventListener('click', () => {
    const gradeId = unitsGradeSelect.value;
    if (!gradeId) {
        alert('Önce sınıf seçin!');
        return;
    }
    openUnitModal(gradeId);
});

// ==================== UNIT MODAL ====================
const unitModal = document.getElementById('unit-modal')!;
const unitForm = document.getElementById('unit-form') as HTMLFormElement;
let editingUnitGradeId = '';

function openUnitModal(gradeId: string, unit?: Unit) {
    editingUnitGradeId = gradeId;
    document.getElementById('unit-modal-title')!.textContent = unit ? 'Tema Düzenle' : 'Yeni Tema';

    const unitIdInput = document.getElementById('unit-id') as HTMLInputElement;

    if (unit) {
        unitIdInput.value = unit.id;
        (document.getElementById('unit-name') as HTMLInputElement).value = unit.name;
    } else {
        unitForm.reset();
        unitIdInput.value = '';
    }

    unitModal.style.display = 'flex';
}

function closeUnitModal() {
    unitModal.style.display = 'none';
    unitForm.reset();
}

unitForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const unitId = (document.getElementById('unit-id') as HTMLInputElement).value.trim();
    const unitName = (document.getElementById('unit-name') as HTMLInputElement).value.trim();

    const unitData = {
        id: unitId || '',
        name: unitName
    };

    // Validate form data
    const validation = validateUnitForm(unitData);
    if (!validation.valid) {
        alert('Form hataları:\n\n' + validation.errors.join('\n'));
        return;
    }

    try {
        if (unitId) {
            // Editing existing unit
            await updateUnit(editingUnitGradeId, unitId, { name: unitName });
        } else {
            // Creating new unit - ID will be auto-generated
            await addUnit(editingUnitGradeId, { id: '', name: unitName });
        }

        closeUnitModal();
        await loadData();
        alert('Tema başarıyla kaydedildi!');
    } catch (error) {
        console.error('Unit save error:', error);
        alert('Tema kaydedilirken hata oluştu: ' + error);
    }
});
