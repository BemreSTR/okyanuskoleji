import type { Grade, Video } from './types';

// 5. Sınıf Ünite 1: Allah İnancı (8 video)
const unit1Videos: Video[] = [
    { id: '1-1', title: 'Evrendeki Mükemmel Düzen', youtubeId: 'qllnCxGt6ns', kahootLink: 'https://create.kahoot.it/share/5-sinif-din-kulturu-1-unite-1-konu-evrendeki-mukemmel-duzen/885c091d-2836-4aa1-a775-bb5a27da5940', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '1-2', title: 'Allah\'ın Varlığı ve Birliği', youtubeId: 'WrSASpWfURw', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '1-3', title: 'Allah\'ın Güzel İsimleri', youtubeId: 'yOW_MjP-zpA', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '1-4', title: 'Allah Rahman ve Rahîm\'dir', youtubeId: '37KeOYiw82w', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '1-5', title: 'Allah Her Şeyi Bilir', youtubeId: 'zbJY4Ll1M0U', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '1-6', title: 'Allah Her Şeyi Görür ve İşitir', youtubeId: 'v7YOybrPhKM', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '1-7', title: 'Allah\'ın Her Şeye Gücü Yeter', youtubeId: 'n55jai0lrco', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '1-8', title: 'Bir Sure Öğreniyorum: İhlas Suresi', youtubeId: 'Bkz9mhhh5IM', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
];

// 5. Sınıf Ünite 2: Namaz (7 video)
const unit2Videos: Video[] = [
    { id: '2-1', title: 'Allah\'ın Huzurunda Olmak: Namaz İbadeti', youtubeId: 'a36PjD9m9DI', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '2-2', title: 'Namaz Çeşitleri', youtubeId: 's_OUa7Gj_a4', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '2-3', title: 'Namazın Kılınışı', youtubeId: 'YPXZDxmChs0', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '2-4', title: 'Namazın Hazırlık Şartları', youtubeId: 'e6jUfrCNYrU', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '2-5', title: 'Namazın Kılınış Şartları', youtubeId: 'e6jUfrCNYrU', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '2-6', title: 'Namaz İbadetinin İnsana Kazandırdıkları', youtubeId: '5eSHCsN9vNw', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '2-7', title: 'Bir Dua Öğreniyorum: Tahiyyat Duası', youtubeId: 'KPGsmM9a23s', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
];

// 5. Sınıf Ünite 3: Kur'an-ı Kerim (8 video)
const unit3Videos: Video[] = [
    { id: '3-1', title: 'Kur\'an-ı Kerim\'in İç Düzeni', youtubeId: 'pQxsdeU7MaI', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '3-2', title: 'Kur\'an-ı Kerim\'in Temel Özellikleri', youtubeId: 'pQxsdeU7MaI', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '3-3', title: 'Kur\'an-ı Kerim\'in Ana Konuları: İnanç', youtubeId: 'pQxsdeU7MaI', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '3-4', title: 'Kur\'an-ı Kerim\'in Ana Konuları: İbadet', youtubeId: 'pQxsdeU7MaI', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '3-5', title: 'Kur\'an-ı Kerim\'in Ana Konuları: Ahlak', youtubeId: 'pQxsdeU7MaI', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '3-6', title: 'Kur\'an-ı Kerim\'in Ana Konuları: Sosyal Hayat', youtubeId: 'pQxsdeU7MaI', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '3-7', title: 'Kur\'an-ı Kerim\'in Ana Konuları: Kıssalar', youtubeId: 'pQxsdeU7MaI', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '3-8', title: 'Bir Sure Öğreniyorum: Kevser Suresi', youtubeId: 'pQxsdeU7MaI', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
];

// 5. Sınıf Ünite 4: Peygamber Kıssaları (8 video)
const unit4Videos: Video[] = [
    { id: '4-1', title: 'Allah\'ın Elçileri: Peygamberler', youtubeId: '2CR7hFC3LEA', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '4-2', title: 'Kur\'an-ı Kerim\'den Öğütler: Peygamber Kıssaları', youtubeId: 'OaxA4eXGpAs', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '4-3', title: 'Hz. Nuh', youtubeId: 'Rq0ssVnKLo0', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '4-4', title: 'Hz. İbrahim', youtubeId: 'hFIeOL5jK-4', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '4-5', title: 'Hz. Musa', youtubeId: 'ir-LjrH5uFU', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '4-6', title: 'Hz. İsa', youtubeId: 'kZq8LOJY164', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '4-7', title: 'Peygamber Kıssalarında Verilen Mesajlar', youtubeId: '5Ce-gquXDY4', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '4-8', title: 'Bir Sure Öğreniyorum: Kureyş Suresi', youtubeId: 'CVdpIpWCgWk', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
];

// 5. Sınıf Ünite 5: Mimarimizde Dini Motifler (3 video)
const unit5Videos: Video[] = [
    { id: '5-1', title: 'Dinin Mimarimize Etkisi', youtubeId: 'vXGAtsLy8so', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '5-2', title: 'Camileri Tanıyalım', youtubeId: 'DioXJEN6FAk', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
    { id: '5-3', title: 'Kültürümüzden Cami Örnekleri', youtubeId: 'KlLmjQ7k964', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
];

// Sınıflar ve Üniteler
export const grades: Grade[] = [
    {
        id: '5',
        name: '5-sinif',
        displayName: '5. Sınıf',
        isActive: true,
        units: [
            { id: '1', name: '1. Ünite: Allah İnancı', videos: unit1Videos },
            { id: '2', name: '2. Ünite: Namaz', videos: unit2Videos },
            { id: '3', name: '3. Ünite: Kur\'an-ı Kerim', videos: unit3Videos },
            { id: '4', name: '4. Ünite: Peygamber Kıssaları', videos: unit4Videos },
            { id: '5', name: '5. Ünite: Mimarimizde Dini Motifler', videos: unit5Videos },
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
