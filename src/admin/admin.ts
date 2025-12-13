import './admin.css';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { loadGrades, addVideo, updateVideo, deleteVideo, addUnit, updateUnit, deleteUnit, updateVideoOrder } from '../services/firebase.service';
import type { Grade, Unit, Video } from '../types';
import Sortable from 'sortablejs';

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
        unitSelect.innerHTML = '<option value="">Ünite Seçin</option>';

        grade?.units.forEach(unit => {
            const option = document.createElement('option');
            option.value = unit.id;
            option.textContent = `${unit.id}. ${unit.name}`;
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
        videosListEl.innerHTML = '<p class="empty-state">Sınıf ve ünite seçin</p>';
        return;
    }

    const grade = currentGrades.find(g => g.id === selectedGradeId);
    const unit = grade?.units.find(u => u.id === selectedUnitId);

    if (!unit || unit.videos.length === 0) {
        videosListEl.innerHTML = '<p class="empty-state">Henüz video yok</p>';
        return;
    }

    videosListEl.innerHTML = unit.videos.map((video: any) => `
    <div class="item-card" data-id="${video._docId}">
      <div class="drag-handle">⋮⋮</div>
      <div class="item-info">
        <h4>${video.title}</h4>
        <p class="item-meta">YouTube ID: ${video.youtubeId}</p>
      </div>
      <div class="item-actions">
        <button class="btn btn-sm btn-secondary" onclick="editVideo('${video._docId}')">Düzenle</button>
        <button class="btn btn-sm btn-danger" onclick="removeVideo('${video._docId}')">Sil</button>
      </div>
    </div>
  `).join('');

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

addVideoBtn.addEventListener('click', () => {
    if (!selectedGradeId || !selectedUnitId) {
        alert('Önce sınıf ve ünite seçin!');
        return;
    }
    openVideoModal();
});

// ==================== VIDEO MODAL ====================
const videoModal = document.getElementById('video-modal')!;
const videoForm = document.getElementById('video-form') as HTMLFormElement;

function openVideoModal(video?: any) {
    document.getElementById('video-modal-title')!.textContent = video ? 'Video Düzenle' : 'Yeni Video';

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

    const videoData: Video = {
        id: videoId || `${selectedUnitId}-${Date.now()}`,
        title: (document.getElementById('video-title') as HTMLInputElement).value,
        youtubeId: extractYouTubeId(youtubeInput),
        kahootLink: (document.getElementById('kahoot-link') as HTMLInputElement).value,
        wordwallKitaplik: (document.getElementById('wordwall-kitaplik') as HTMLInputElement).value,
        wordwallCarkifelek: (document.getElementById('wordwall-carkifelek') as HTMLInputElement).value
    };

    try {
        if (videoId) {
            await updateVideo(selectedGradeId, selectedUnitId, videoId, videoData);
        } else {
            await addVideo(selectedGradeId, selectedUnitId, videoData);
        }

        closeVideoModal();
        await loadData();
        alert('Video kaydedildi!');
    } catch (error) {
        alert('Hata oluştu: ' + error);
    }
});

document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
    btn.addEventListener('click', () => {
        closeVideoModal();
        closeUnitModal();
    });
});

// Global functions for onclick handlers
(window as any).editVideo = function (videoDocId: string) {
    const grade = currentGrades.find(g => g.id === selectedGradeId);
    const unit = grade?.units.find(u => u.id === selectedUnitId);
    const video = unit?.videos.find((v: any) => v._docId === videoDocId);
    if (video) openVideoModal(video);
};

(window as any).removeVideo = async function (videoDocId: string) {
    if (!confirm('Bu videoyu silmek istediğinize emin misiniz?')) return;

    try {
        await deleteVideo(selectedGradeId, selectedUnitId, videoDocId);
        await loadData();
        alert('Video silindi!');
    } catch (error) {
        alert('Hata oluştu: ' + error);
    }
};

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
        unitsListEl.innerHTML = '<p class="empty-state">Henüz ünite yok</p>';
        return;
    }

    unitsListEl.innerHTML = grade.units.map(unit => `
    <div class="item-card">
      <div class="item-info">
        <h4>${unit.id}. ${unit.name}</h4>
        <p class="item-meta">${unit.videos.length} video</p>
      </div>
      <div class="item-actions">
        <button class="btn btn-sm btn-secondary" onclick="editUnit('${gradeId}', '${unit.id}')">Düzenle</button>
        <button class="btn btn-sm btn-danger" onclick="removeUnit('${gradeId}', '${unit.id}')">Sil</button>
      </div>
    </div>
  `).join('');
}

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
    document.getElementById('unit-modal-title')!.textContent = unit ? 'Ünite Düzenle' : 'Yeni Ünite';

    const unitIdInput = document.getElementById('unit-id') as HTMLInputElement;

    if (unit) {
        unitIdInput.value = unit.id;
        unitIdInput.readOnly = true; // ID değiştirilemez
        (document.getElementById('unit-name') as HTMLInputElement).value = unit.name;
    } else {
        unitForm.reset();
        unitIdInput.readOnly = false;
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

    if (!unitName) {
        alert('Ünite adını doldurun!');
        return;
    }

    if (!unitId) {
        alert('Ünite numarası zorunludur! (örn: 1, 2, 3)');
        return;
    }

    const unitData = {
        id: unitId,
        name: unitName
    };

    try {
        // Check if editing (readonly input) or creating new
        const unitIdInput = document.getElementById('unit-id') as HTMLInputElement;
        if (unitIdInput.readOnly) {
            // Editing existing unit - update name only
            await updateUnit(editingUnitGradeId, unitId, { name: unitName });
        } else {
            // Creating new unit
            await addUnit(editingUnitGradeId, unitData);
        }

        closeUnitModal();
        await loadData();
        alert('Ünite kaydedildi!');
    } catch (error) {
        alert('Hata oluştu: ' + error);
    }
});

// Global functions
(window as any).editUnit = function (gradeId: string, unitId: string) {
    const grade = currentGrades.find(g => g.id === gradeId);
    const unit = grade?.units.find(u => u.id === unitId);
    if (unit) openUnitModal(gradeId, unit);
};

(window as any).removeUnit = async function (gradeId: string, unitId: string) {
    if (!confirm('Bu üniteyi silmek istediğinize emin misiniz? İçindeki tüm videolar silinecek!')) return;

    try {
        await deleteUnit(gradeId, unitId);
        await loadData();
        alert('Ünite silindi!');
    } catch (error) {
        alert('Hata oluştu: ' + error);
    }
};
