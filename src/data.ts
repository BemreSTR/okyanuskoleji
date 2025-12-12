import type { Grade, Video } from './types';

// Örnek video şablonu
function createTestVideos(unitId: string, count: number): Video[] {
    const videos: Video[] = [];
    for (let i = 1; i <= count; i++) {
        videos.push({
            id: `${unitId}-video-${i}`,
            title: `Ünite ${unitId} - Video ${i}`,
            youtubeId: 'pQxsdeU7MaI',
            kahootLink: 'https://create.kahoot.it/share/5-sini',
            wordwallKitaplik: 'https://wordwall.net/play/97566/048/300',
            wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250'
        });
    }
    return videos;
}

// Sınıflar ve Üniteler
export const grades: Grade[] = [
    {
        id: '5',
        name: '5-sinif',
        displayName: '5. Sınıf',
        isActive: true,
        units: [
            {
                id: '1',
                name: '1. Ünite - Güneş Sistemi',
                videos: createTestVideos('1', 5)
            },
            {
                id: '2',
                name: '2. Ünite - Canlılar Dünyası',
                videos: createTestVideos('2', 5)
            },
            {
                id: '3',
                name: '3. Ünite - Kuvvet ve Hareket',
                videos: createTestVideos('3', 5)
            },
            {
                id: '4',
                name: '4. Ünite - Madde ve Değişim',
                videos: createTestVideos('4', 5)
            },
            {
                id: '5',
                name: '5. Ünite - Işık ve Ses',
                videos: createTestVideos('5', 5)
            },
            {
                id: '6',
                name: '6. Ünite - Elektrik',
                videos: createTestVideos('6', 5)
            }
        ]
    },
    {
        id: '6',
        name: '6-sinif',
        displayName: '6. Sınıf',
        isActive: false,
        units: []
    },
    {
        id: '7',
        name: '7-sinif',
        displayName: '7. Sınıf',
        isActive: false,
        units: []
    },
    {
        id: '8',
        name: '8-sinif',
        displayName: '8. Sınıf',
        isActive: false,
        units: []
    }
];

// Yardımcı fonksiyonlar
export function getGradeById(gradeId: string): Grade | undefined {
    return grades.find(g => g.id === gradeId);
}

export function getUnitById(gradeId: string, unitId: string) {
    const grade = getGradeById(gradeId);
    return grade?.units.find(u => u.id === unitId);
}
