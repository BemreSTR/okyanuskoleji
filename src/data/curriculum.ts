import type { Grade } from '../types';

export const GRADES_DATA: Grade[] = [
    { 
        id: '1', 
        name: '1. Sınıf', 
        displayName: '1. Sınıf', 
        isActive: true, 
        units: [] 
    },
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
    { 
        id: '3', 
        name: '3. Sınıf', 
        displayName: '3. Sınıf', 
        isActive: true, 
        units: [] 
    },
    { 
        id: '4', 
        name: '4. Sınıf', 
        displayName: '4. Sınıf', 
        isActive: true, 
        units: [] 
    }
];
