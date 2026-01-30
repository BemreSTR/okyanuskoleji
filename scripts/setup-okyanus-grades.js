import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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
const auth = getAuth(app);

async function setupOkyanusGrades() {
    console.log('🌊 Okyanus Koleji Sınıf Yapılandırması Başlatılıyor...\n');

    try {
        // Giriş yap (Yetki hatasını aşmak için)
        // Not: Bu kullanıcının Firebase Authentication tarafında kayıtlı olması gerekir.
        try {
            await signInWithEmailAndPassword(auth, 'okyanuskoleji@gmail.com', 'okyanuskoleji1');
            console.log('🔐 Admin girişi başarılı.\n');
        } catch (authError) {
            console.warn('⚠️ Giriş yapılamadı, yetki hatası alabilirsiniz. (Firebase kurallarınızı kontrol edin)\n');
        }

        // 1. Mevcut tüm grades belgelerini temizle
        const gradesSnapshot = await getDocs(collection(db, 'grades'));
        for (const gradeDoc of gradesSnapshot.docs) {
            await deleteDoc(doc(db, 'grades', gradeDoc.id));
            console.log(`🗑️ Eski sınıf silindi: ${gradeDoc.id}`);
        }

        // 2. Yeni sınıfları (1, 2, 3, 4) oluştur
        const newGrades = [
            { id: '1', name: '1. Sınıf', displayName: '1. Sınıf', isActive: true, hasUnits: false },
            { id: '2', name: '2. Sınıf', displayName: '2. Sınıf', isActive: true, hasUnits: true },
            { id: '3', name: '3. Sınıf', displayName: '3. Sınıf', isActive: true, hasUnits: false },
            { id: '4', name: '4. Sınıf', displayName: '4. Sınıf', isActive: true, hasUnits: false }
        ];

        for (const grade of newGrades) {
            const gradeRef = doc(db, 'grades', grade.id);
            await setDoc(gradeRef, {
                name: grade.name,
                displayName: grade.displayName,
                isActive: grade.isActive
            });
            
            console.log(`✅ Sınıf eklendi: ${grade.name}`);

            // Eğer hasUnits true ise sembolik bir ünite ekle (Yakında çıkmaması için)
            if (grade.hasUnits) {
                const unitRef = doc(db, 'grades', grade.id, 'units', 'initial-unit');
                await setDoc(unitRef, {
                    id: 'initial-unit',
                    name: 'Giriş Ünitesi',
                    order: 0
                });
                console.log(`   📦 ${grade.name} için başlangıç ünitesi oluşturuldu.`);
            }
        }

        console.log('\n🎉 Sınıf yapılandırması başarıyla tamamlandı!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Hata oluştu:', error);
        process.exit(1);
    }
}

setupOkyanusGrades();
