// Script to activate grades 6, 7, 8
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

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

async function activateGrades() {
    console.log('🚀 Activating grades 6, 7, 8...\n');

    try {
        const grades = ['6', '7', '8'];

        for (const gradeId of grades) {
            const gradeRef = doc(db, 'grades', gradeId);
            await updateDoc(gradeRef, {
                isActive: true
            });
            console.log(`✅ Grade ${gradeId} activated`);
        }

        console.log('\n🎉 All grades activated successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

activateGrades();
