// Migration script to upload existing data to Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZdZ__Ugi1DfSPSbVKBmTPYJMkKeWDVW4",
    authDomain: "dinakademi-b7252.firebaseapp.com",
    projectId: "dinakademi-b7252",
    storageBucket: "dinakademi-b7252.firebasestorage.app",
    messagingSenderId: "378509939886",
    appId: "1:378509939886:web:6d55dcdab8a6960592c93f",
    measurementId: "G-QMR5WSX415"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Existing data from data.ts
const existingData = {
    grades: [
        {
            id: '5',
            name: '5. Sınıf',
            displayName: '5. Sınıf',
            isActive: true,
            units: [
                {
                    id: '1',
                    name: 'Allah İnancı',
                    videos: [
                        { id: '1-1', title: 'Evrendeki Mükemmel Düzen', youtubeId: 'qllnCxGt6ns', kahootLink: 'https://create.kahoot.it/share/5-sinif-din-kulturu-1-unite-1-konu-evrendeki-mukemmel-duzen/885c091d-2836-4aa1-a775-bb5a27da5940', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '1-2', title: 'Allah\'ın Varlığı ve Birliği', youtubeId: 'WrSASpWfURw', kahootLink: 'https://create.kahoot.it/share/5-sinif-din-kulturu-1-unite-2-konu-allah-in-varligi-ve-birligi/e8e309cf-0197-4389-92bf-06196b1e9862', wordwallKitaplik: 'https://wordwall.net/play/97968/663/755', wordwallCarkifelek: 'https://wordwall.net/play/97968/663/225' },
                        { id: '1-3', title: 'Allah\'ın Güzel İsimleri', youtubeId: 'yOW_MjP-zpA', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '1-4', title: 'Allah Rahman ve Rahîm\'dir', youtubeId: '37KeOYiw82w', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '1-5', title: 'Allah Her Şeyi Bilir', youtubeId: 'zbJY4Ll1M0U', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '1-6', title: 'Allah Her Şeyi Görür ve İşitir', youtubeId: 'v7YOybrPhKM', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '1-7', title: 'Allah\'ın Her Şeye Gücü Yeter', youtubeId: 'n55jai0lrco', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '1-8', title: 'Bir Sure Öğreniyorum: İhlas Suresi', youtubeId: 'Bkz9mhhh5IM', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' }
                    ]
                },
                {
                    id: '2',
                    name: 'Namaz',
                    videos: [
                        { id: '2-1', title: 'Allah\'ın Huzurunda Olmak: Namaz İbadeti', youtubeId: 'a36PjD9m9DI', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '2-2', title: 'Namaz Çeşitleri', youtubeId: 's_OUa7Gj_a4', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '2-3', title: 'Namazın Kılınışı', youtubeId: 'YPXZDxmChs0', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '2-4', title: 'Namazın Kılınış Şartları', youtubeId: 'e6jUfrCNYrU', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '2-5', title: 'Cemaatle Namaz', youtubeId: '5eSHCsN9vNw', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '2-6', title: 'Namaz İbadetinin İnsana Kazandırdıkları', youtubeId: 'KPGsmM9a23s', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '2-7', title: 'Bir Dua Öğreniyorum: Tahiyyat Duası', youtubeId: 'TOTU85lLMbw', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' }
                    ]
                },
                {
                    id: '3',
                    name: 'Kur\'an-ı Kerim',
                    videos: [
                        { id: '3-1', title: 'Kur\'an-ı Kerim\'in İç Düzeni', youtubeId: 'vbWOOCv-6Jk', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '3-2', title: 'Kur\'an-ı Kerim\'in Temel Özellikleri', youtubeId: 'ursiKEIlimo', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '3-3', title: 'Kur\'an-ı Kerim\'in Ana Konuları: İnanç', youtubeId: '1rA0x0hMkag', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '3-4', title: 'Kur\'an-ı Kerim\'in Ana Konuları: İbadet', youtubeId: 'orwxPW_quoM', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '3-5', title: 'Kur\'an-ı Kerim\'in Ana Konuları: Ahlak', youtubeId: 'pnkRc6GO3Hc', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '3-6', title: 'Kur\'an-ı Kerim\'in Ana Konuları: Sosyal Hayat', youtubeId: 'wS_G9pKTNQY', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '3-7', title: 'Kur\'an-ı Kerim\'in Ana Konuları: Kıssalar', youtubeId: 'mpfNAsdMIxw', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '3-8', title: 'Bir Sure Öğreniyorum: Kevser Suresi', youtubeId: 'cJJCKtv9bQQ', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' }
                    ]
                },
                {
                    id: '4',
                    name: 'Peygamber Kıssaları',
                    videos: [
                        { id: '4-1', title: 'Allah\'ın Elçileri: Peygamberler', youtubeId: '2CR7hFC3LEA', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '4-2', title: 'Kur\'an-ı Kerim\'den Öğütler: Peygamber Kıssaları', youtubeId: 'OaxA4eXGpAs', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '4-3', title: 'Hz. Nuh', youtubeId: 'Rq0ssVnKLo0', kahootLink: 'https://create.kahoot.it/share/hazreti-nuh-peygamber/994570b1-5ed2-4228-8f6c-10ae887ca603', wordwallKitaplik: 'https://wordwall.net/play/103352/571/711', wordwallCarkifelek: 'https://wordwall.net/play/103352/571/744' },
                        { id: '4-4', title: 'Hz. İbrahim', youtubeId: 'hFIeOL5jK-4', kahootLink: 'https://create.kahoot.it/share/hazreti-ibrahim-a-s/191776fc-758d-450a-ad1c-6ae3d09f4fd4', wordwallKitaplik: 'https://wordwall.net/play/103850/986/848', wordwallCarkifelek: 'https://wordwall.net/play/103850/986/940' },
                        { id: '4-5', title: 'Hz. Musa', youtubeId: 'ir-LjrH5uFU', kahootLink: 'https://create.kahoot.it/share/hazreti-musa-a-s/110b7776-b093-4d32-abca-a6f8bc78fd5d', wordwallKitaplik: 'https://wordwall.net/play/103907/888/664', wordwallCarkifelek: 'https://wordwall.net/play/103907/888/229' },
                        { id: '4-6', title: 'Hz. İsa', youtubeId: 'kZq8LOJY164', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '4-7', title: 'Peygamber Kıssalarında Verilen Mesajlar', youtubeId: '5Ce-gquXDY4', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '4-8', title: 'Bir Sure Öğreniyorum: Kureyş Suresi', youtubeId: 'CVdpIpWCgWk', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' }
                    ]
                },
                {
                    id: '5',
                    name: 'Mimarimizde Dini Motifler',
                    videos: [
                        { id: '5-1', title: 'Dinin Mimarimize Etkisi', youtubeId: 'vXGAtsLy8so', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '5-2', title: 'Camileri Tanıyalım', youtubeId: 'DioXJEN6FAk', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' },
                        { id: '5-3', title: 'Kültürümüzden Cami Örnekleri', youtubeId: 'KlLmjQ7k964', kahootLink: 'https://create.kahoot.it/share/5-sini', wordwallKitaplik: 'https://wordwall.net/play/97566/048/300', wordwallCarkifelek: 'https://wordwall.net/play/97566/048/250' }
                    ]
                }
            ]
        },
        {
            id: '6',
            name: '6. Sınıf',
            displayName: '6. Sınıf',
            isActive: false,
            units: []
        },
        {
            id: '7',
            name: '7. Sınıf',
            displayName: '7. Sınıf',
            isActive: false,
            units: []
        },
        {
            id: '8',
            name: '8. Sınıf',
            displayName: '8. Sınıf',
            isActive: false,
            units: []
        }
    ]
};

async function migrateData() {
    console.log('🚀 Starting migration...\n');

    try {
        for (const grade of existingData.grades) {
            console.log(`📚 Migrating ${grade.displayName}...`);

            // Create grade document
            await setDoc(doc(db, 'grades', grade.id), {
                name: grade.name,
                displayName: grade.displayName,
                isActive: grade.isActive
            });

            // Create units and videos
            for (const unit of grade.units) {
                console.log(`  📖 Unit ${unit.id}: ${unit.name}`);

                await setDoc(doc(db, 'grades', grade.id, 'units', unit.id), {
                    id: unit.id,
                    name: unit.name
                });

                // Create videos
                for (const video of unit.videos) {
                    await setDoc(
                        doc(db, 'grades', grade.id, 'units', unit.id, 'videos', video.id),
                        video
                    );
                }

                console.log(`    ✅ ${unit.videos.length} videos migrated`);
            }

            console.log(`✅ ${grade.displayName} completed\n`);
        }

        console.log('🎉 Migration completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

migrateData();
