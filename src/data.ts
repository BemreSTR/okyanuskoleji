// Firebase'den veri yükleme
import { loadGrades } from './services/firebase.service';
import type { Grade } from './types';

// Grades cache
let gradesCache: Grade[] = [];
let isLoading = false;
let loadPromise: Promise<Grade[]> | null = null;

// Firebase'den grades yükle (cache ile)
export async function getGrades(): Promise<Grade[]> {
    if (gradesCache.length > 0) {
        return gradesCache;
    }

    if (isLoading && loadPromise) {
        return loadPromise;
    }

    isLoading = true;
    loadPromise = loadGrades().then(grades => {
        gradesCache = grades;
        isLoading = false;
        return grades;
    }).catch(error => {
        console.error('Error loading grades:', error);
        isLoading = false;
        return [];
    });

    return loadPromise;
}

// ID ile grade bul
export async function getGradeById(id: string): Promise<Grade | undefined> {
    const grades = await getGrades();
    return grades.find(g => g.id === id);
}

// ID ile unit bul
export async function getUnitById(gradeId: string, unitId: string) {
    const grade = await getGradeById(gradeId);
    return grade?.units.find(u => u.id === unitId);
}
