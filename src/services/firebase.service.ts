import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    setDoc,
    Timestamp
} from 'firebase/firestore';
import { db } from '../firebase.config';
import type { Video, Unit, Grade } from '../types';

// Firestore collection names
const COLLECTIONS = {
    GRADES: 'grades',
    UNITS: 'units',
    VIDEOS: 'videos'
};

// ==================== GRADES ====================
export async function loadGrades(): Promise<Grade[]> {
    try {
        const gradesSnapshot = await getDocs(collection(db, COLLECTIONS.GRADES));
        const grades: Grade[] = [];

        if (gradesSnapshot.empty) {
            // Veri yoksa varsayılan Okyanus Koleji sınıflarını dön
            return [
                { id: '1', name: '1. Sınıf', displayName: '1. Sınıf', isActive: true, units: [] },
                { id: '2', name: '2. Sınıf', displayName: '2. Sınıf', isActive: true, units: [{ id: 'init', name: 'Başlangıç', videos: [], order: 0 }] },
                { id: '3', name: '3. Sınıf', displayName: '3. Sınıf', isActive: true, units: [] },
                { id: '4', name: '4. Sınıf', displayName: '4. Sınıf', isActive: true, units: [] }
            ];
        }

        for (const gradeDoc of gradesSnapshot.docs) {
            const gradeData = gradeDoc.data();
            const units = await loadUnits(gradeDoc.id);

            grades.push({
                id: gradeDoc.id,
                name: gradeData.name,
                displayName: gradeData.displayName,
                isActive: gradeData.isActive,
                units
            });
        }

        const result = grades.filter(g => ['1', '2', '3', '4'].includes(g.id)).sort((a, b) => parseInt(a.id) - parseInt(b.id));
        
        if (result.length === 0) {
            return [
                { id: '1', name: '1. Sınıf', displayName: '1. Sınıf', isActive: true, units: [] },
                { 
                    id: '2', 
                    name: '2. Sınıf', 
                    displayName: '2. Sınıf', 
                    isActive: true, 
                    units: [
                        { 
                            id: 'tema-1', 
                            name: '1. TEMA: NESNELERİN GEOMETRİSİ', 
                            order: 1,
                            videos: [
                                { id: 't1-k1', title: 'Geometrik Cisimler', youtubeId: '', materialUrl: '/ders-materyal/Geometrik-Cisimler/index.html', order: 1 },
                                { id: 't1-k2', title: 'Geometrik Cisim Modelleri', youtubeId: '', order: 2 },
                                { id: 't1-k3', title: 'Geometrik Şekil Modelleri', youtubeId: '', order: 3 },
                                { id: 't1-k4', title: 'Geometrik Cisim ve Şekillerin Biçimsel Özellikleri', youtubeId: '', order: 4 },
                                { id: 't1-k5', title: 'Sıvı Ölçme', youtubeId: '', order: 5 }
                            ] 
                        },
                        { 
                            id: 'tema-2', 
                            name: '2. TEMA: SAYILAR VE NİCELİKLER', 
                            order: 2,
                            videos: [
                                { id: 't2-k1', title: 'Sayılar', youtubeId: '', order: 1 },
                                { id: 't2-k2', title: 'Sayılarda Çözümleme', youtubeId: '', order: 2 },
                                { id: 't2-k3', title: 'Sayı Doğrusu', youtubeId: '', order: 3 },
                                { id: 't2-k4', title: 'Ritmik Sayma', youtubeId: '', order: 4 },
                                { id: 't2-k5', title: 'Örüntü', youtubeId: '', order: 5 },
                                { id: 't2-k6', title: 'Tahmin Etme', youtubeId: '', order: 6 }
                            ] 
                        },
                        { 
                            id: 'tema-3', 
                            name: '3. TEMA: İŞLEMLERDEN CEBİRSEL DÜŞÜNMEYE', 
                            order: 3,
                            videos: [
                                { id: 't3-k1', title: 'Toplama ve Çıkarma İşlemleriyle İlgili Problemler', youtubeId: '', order: 1 },
                                { id: 't3-k2', title: 'Toplama ve Çıkarma İşlemlerinin Sonuçlarını Tahmin Etme', youtubeId: '', order: 2 },
                                { id: 't3-k3', title: 'Toplama ve Çıkarma İşlemlerinin İlişkisi', youtubeId: '', order: 3 }
                            ] 
                        }
                    ] 
                },
                { id: '3', name: '3. Sınıf', displayName: '3. Sınıf', isActive: true, units: [] },
                { id: '4', name: '4. Sınıf', displayName: '4. Sınıf', isActive: true, units: [] }
            ];
        }

        return result;
    } catch (error) {
        console.error('Error loading grades:', error);
        return [];
    }
}

// ==================== UNITS ====================
export async function loadUnits(gradeId: string): Promise<Unit[]> {
    try {
        const unitsRef = collection(db, COLLECTIONS.GRADES, gradeId, COLLECTIONS.UNITS);
        const unitsSnapshot = await getDocs(unitsRef);
        const units: Unit[] = [];

        for (const unitDoc of unitsSnapshot.docs) {
            const unitData = unitDoc.data();
            const videos = await loadVideos(gradeId, unitDoc.id);

            units.push({
                id: unitDoc.id,
                name: unitData.name,
                order: unitData.order || 0,
                videos
            });
        }

        // Sort by order
        return units.sort((a, b) => (a.order || 0) - (b.order || 0));
    } catch (error) {
        console.error('Error loading units:', error);
        return [];
    }
}

export async function addUnit(gradeId: string, unit: Omit<Unit, 'videos'>): Promise<void> {
    // Generate auto ID if not provided
    const unitId = unit.id || String(Date.now());
    const unitRef = doc(db, COLLECTIONS.GRADES, gradeId, COLLECTIONS.UNITS, unitId);
    await setDoc(unitRef, {
        id: unitId,
        name: unit.name,
        order: Date.now() // Use timestamp to ensure newest units go last
    });
}

export async function updateUnit(gradeId: string, unitId: string, unit: Partial<Unit>): Promise<void> {
    const unitRef = doc(db, COLLECTIONS.GRADES, gradeId, COLLECTIONS.UNITS, unitId);
    await updateDoc(unitRef, unit);
}

export async function updateUnitOrder(gradeId: string, unitId: string, order: number): Promise<void> {
    const unitRef = doc(db, COLLECTIONS.GRADES, gradeId, COLLECTIONS.UNITS, unitId);
    await updateDoc(unitRef, { order });
}

export async function deleteUnit(gradeId: string, unitId: string): Promise<void> {
    const unitRef = doc(db, COLLECTIONS.GRADES, gradeId, COLLECTIONS.UNITS, unitId);
    await deleteDoc(unitRef);
}

// ==================== VIDEOS ====================
export async function loadVideos(gradeId: string, unitId: string): Promise<Video[]> {
    try {
        const videosRef = collection(db, COLLECTIONS.GRADES, gradeId, COLLECTIONS.UNITS, unitId, COLLECTIONS.VIDEOS);
        const videosSnapshot = await getDocs(videosRef);

        const videos = videosSnapshot.docs.map(docSnap => ({
            id: docSnap.data().id,
            title: docSnap.data().title,
            youtubeId: docSnap.data().youtubeId,
            kahootLink: docSnap.data().kahootLink,
            wordwallKitaplik: docSnap.data().wordwallKitaplik,
            wordwallCarkifelek: docSnap.data().wordwallCarkifelek,
            order: docSnap.data().order || 0,
            // Store Firestore doc ID for deletion
            _docId: docSnap.id
        } as any));

        // Sort by order field
        return videos.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    } catch (error) {
        console.error('Error loading videos:', error);
        return [];
    }
}

export async function addVideo(gradeId: string, unitId: string, video: Video): Promise<void> {
    const videosRef = collection(db, COLLECTIONS.GRADES, gradeId, COLLECTIONS.UNITS, unitId, COLLECTIONS.VIDEOS);
    await addDoc(videosRef, {
        ...video,
        order: Date.now(), // Use timestamp to ensure newest videos go last
        createdAt: Timestamp.now()
    });
}

export async function updateVideo(gradeId: string, unitId: string, videoDocId: string, video: Partial<Video>): Promise<void> {
    const videoRef = doc(db, COLLECTIONS.GRADES, gradeId, COLLECTIONS.UNITS, unitId, COLLECTIONS.VIDEOS, videoDocId);
    await updateDoc(videoRef, {
        ...video,
        updatedAt: Timestamp.now()
    });
}

export async function updateVideoOrder(gradeId: string, unitId: string, videoDocId: string, order: number): Promise<void> {
    const videoRef = doc(db, COLLECTIONS.GRADES, gradeId, COLLECTIONS.UNITS, unitId, COLLECTIONS.VIDEOS, videoDocId);
    await updateDoc(videoRef, { order });
}

export async function deleteVideo(gradeId: string, unitId: string, videoDocId: string): Promise<void> {
    const videoRef = doc(db, COLLECTIONS.GRADES, gradeId, COLLECTIONS.UNITS, unitId, COLLECTIONS.VIDEOS, videoDocId);
    await deleteDoc(videoRef);
}
