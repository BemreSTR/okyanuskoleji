import { GRADES_DATA } from './data/curriculum';
import type { Grade, Unit } from './types';

// Grades fetch (Artık statik dosyadan)
export async function getGrades(): Promise<Grade[]> {
    return GRADES_DATA;
}

// ID ile grade bul
export async function getGradeById(id: string): Promise<Grade | undefined> {
    return GRADES_DATA.find(g => g.id === id);
}

// ID ile unit bul
export async function getUnitById(gradeId: string, unitId: string): Promise<Unit | undefined> {
    const grade = GRADES_DATA.find(g => g.id === gradeId);
    return grade?.units.find(u => u.id === unitId);
}
