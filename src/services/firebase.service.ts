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

        return grades.sort((a, b) => parseInt(a.id) - parseInt(b.id));
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
