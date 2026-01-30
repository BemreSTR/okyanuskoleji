# 📚 Din Akademi

<div align="center">
  <img src="public/images/dinakademi.png" alt="Din Akademi Logo" width="400"/>
  
  ### Öğrenciler için Eğitici Video Platformu
  
  [![Live Demo](https://img.shields.io/badge/demo-live-success)](https://dinakademi.com)
  [![GitHub Pages](https://img.shields.io/badge/deployed-GitHub%20Pages-blue)](https://dinakademi.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.2-646CFF)](https://vitejs.dev/)
  [![Firebase](https://img.shields.io/badge/Firebase-11.2-orange)](https://firebase.google.com/)
  
  [🌐 Canlı Demo](https://dinakademi.com) | [📖 Dokümantasyon](#özellikler) | [🐛 Sorun Bildir](https://github.com/okyanuskoleji/Dinakademi/issues)
</div>

---

## 📖 Hakkında

**Din Akademi**, 5-8. sınıf öğrencileri için Din Kültürü ve Ahlak Bilgisi dersi içeriklerini sunan modern bir eğitim platformudur. Öğrenciler, ünite bazında organize edilmiş YouTube videoları, Kahoot testleri ve Wordwall aktivitelerine kolayca erişebilirler.

### 🎯 Amacımız

- ✅ Kaliteli eğitim içeriğini ücretsiz sunmak
- ✅ Öğrencilerin ders çalışmasını eğlenceli hale getirmek
- ✅ Öğretmenlere hazır içerik kaynağı sağlamak
- ✅ İnteraktif öğrenme deneyimi sunmak

---

## ✨ Özellikler

### 🎓 Öğrenci Özellikleri

- **📹 Video Kütüphanesi**: Sınıf ve ünite bazında organize edilmiş eğitici YouTube videoları
- **🎮 İnteraktif İçerikler**: Kahoot testleri ve Wordwall aktiviteleri
- **📱 Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **🔍 Kolay Navigasyon**: Sezgisel ve kullanıcı dostu arayüz
- **⚡ Hızlı Performans**: Optimized loading ve caching
- **📊 İlerleme Takibi**: Hangi videoları izlediğinizi takip edin

### 👨‍💼 Admin Özellikleri

- **🔐 Güvenli Giriş**: Firebase Authentication ile korumalı admin paneli
- **➕ İçerik Yönetimi**: Video, ünite ve sınıf ekleme/düzenleme/silme
- **🎯 Sürükle-Bırak Sıralama**: Video ve üniteleri kolayca yeniden sıralayın
- **📝 Bulk İşlemler**: Toplu içerik yükleme desteği
- **🔄 Gerçek Zamanlı Güncelleme**: Değişiklikler anında yayına alınır
- **📈 Durum Yönetimi**: Session persistence ile kesintisiz çalışma

---

## 🛠️ Teknoloji Stack

### Frontend
- **[Vite](https://vitejs.dev/)** - Lightning fast build tool
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **Vanilla CSS** - Modern, responsive styling
- **ES Modules** - Modern JavaScript modules

### Backend & Database
- **[Firebase Firestore](https://firebase.google.com/docs/firestore)** - NoSQL cloud database
- **[Firebase Authentication](https://firebase.google.com/docs/auth)** - Secure user authentication
- **Cloud Storage** - Media file hosting

### Deployment & Tools
- **[GitHub Pages](https://pages.github.com/)** - Static site hosting
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline
- **Custom Domain** - dinakademi.com (Squarespace + Google Domains DNS)
- **[SortableJS](https://sortablejs.github.io/Sortable/)** - Drag-and-drop functionality

---

## 🚀 Kurulum

### Ön Gereksinimler

- **Node.js** >= 18.0.0
- **npm** veya **pnpm**
- **Git**
- **Firebase Account** (Admin paneli için)

### Adımlar

1. **Repository'yi klonlayın:**
   ```bash
   git clone https://github.com/okyanuskoleji/Dinakademi.git
   cd Dinakademi
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   # veya
   pnpm install
   ```

3. **Firebase yapılandırması:**
   - Firebase Console'dan yeni bir proje oluşturun
   - `src/firebase.config.ts` dosyasını kendi Firebase kimlik bilgilerinizle güncelleyin:
   ```typescript
   export const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Firestore güvenlik kurallarını ayarlayın:**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

5. **Admin kullanıcısı oluşturun:**
   - Firebase Console → Authentication → Users → Add User
   - Email ve şifre belirleyin

6. **Development sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

7. **Tarayıcıda açın:**
   - Ana site: `http://localhost:5173`
   - Admin panel: `http://localhost:5173/admin.html`

---

## 📚 Kullanım

### Öğrenci Tarafı

1. **Sınıf Seçimi**: Ana sayfada 5-8. sınıf arasından seçim yapın
2. **Ünite Seçimi**: İlgili ünitenin kartına tıklayın
3. **Video İzleme**: YouTube embedded player ile videoları izleyin
4. **Aktiviteler**: Kahoot/Wordwall butonlarına tıklayarak testlere katılın

### Admin Panel

#### Giriş
```
URL: https://dinakademi.com/admin.html
Email: [admin email]
Şifre: [admin password]
```

#### Video Yönetimi

1. **Video Ekleme:**
   - "Videolar" sekmesine gidin
   - Sınıf ve ünite seçin
   - "+ Yeni Video" butonuna tıklayın
   - Video bilgilerini doldurun
   - YouTube URL veya ID girebilirsiniz
   - Kaydet

2. **Video Sıralama:**
   - Video kartının sol tarafındaki "⋮⋮" işaretini tutup sürükleyin
   - Bıraktığınızda otomatik kaydedilir

3. **Video Düzenleme/Silme:**
   - Video kartındaki "Düzenle" veya "Sil" butonlarını kullanın

#### Ünite Yönetimi

1. **Ünite Ekleme:**
   - "Üniteler" sekmesine gidin
   - Sınıf seçin
   - "+ Yeni Ünite" butonuna tıklayın
   - Ünite adını girin (numara otomatik)
   - Kaydet

2. **Ünite Sıralama:**
   - Ünite kartının "⋮⋮" işaretini sürükleyin
   - Sıra numaraları otomatik güncellenir

---

## 📁 Proje Yapısı

```
Dinakademi/
├── public/
│   ├── images/           # Logo ve görseller
│   │   ├── DA-logo.png
│   │   └── dinakademi.png
│   └── CNAME            # Custom domain config
├── src/
│   ├── admin/           # Admin panel
│   │   ├── admin.ts     # Admin logic
│   │   └── admin.css    # Admin styles
│   ├── services/        # Firebase services
│   │   └── firebase.service.ts
│   ├── data.ts          # Data layer
│   ├── firebase.config.ts
│   ├── main.ts          # Main app logic
│   ├── style.css        # Global styles
│   └── types.ts         # TypeScript types
├── scripts/             # Utility scripts
│   ├── migrate-to-firebase.js
│   └── activate-grades.js
├── index.html           # Main entry point
├── admin.html           # Admin panel entry
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript config
└── package.json         # Dependencies

```

---

## 🔧 Yapılandırma

### Vite Config

```typescript
// vite.config.ts
export default defineConfig({
  base: '/',  // Custom domain için
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
    },
  },
})
```

### Firebase Collections Yapısı

```
firestore/
├── grades/                    # Sınıflar
│   └── {gradeId}/
│       ├── name: string
│       ├── displayName: string
│       ├── isActive: boolean
│       └── units/             # Üniteler (subcollection)
│           └── {unitId}/
│               ├── id: string
│               ├── name: string
│               ├── order: number
│               └── videos/    # Videolar (subcollection)
│                   └── {videoId}/
│                       ├── id: string
│                       ├── title: string
│                       ├── youtubeId: string
│                       ├── kahootLink?: string
│                       ├── wordwallKitaplik?: string
│                       ├── wordwallCarkifelek?: string
│                       ├── order: number
│                       ├── createdAt: timestamp
│                       └── updatedAt?: timestamp
```

---

## 🚢 Deployment

### GitHub Pages

Proje otomatik olarak GitHub Actions ile deploy edilir:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
```

### Custom Domain Setup

1. **DNS Kayıtları (Squarespace/Google Domains):**
   ```
   Type: A     | Host: @   | Value: 185.199.108.153
   Type: A     | Host: @   | Value: 185.199.109.153
   Type: A     | Host: @   | Value: 185.199.110.153
   Type: A     | Host: @   | Value: 185.199.111.153
   Type: CNAME | Host: www | Value: bemrestr.github.io
   ```

2. **GitHub Settings:**
   - Repository → Settings → Pages
   - Custom domain: `dinakademi.com`
   - Enforce HTTPS: ✅

3. **CNAME Dosyası:**
   ```
   public/CNAME
   ```

---

## 🧪 Testing

```bash
# Development
npm run dev

# Build
npm run build

# Preview production build
npm run preview

# Type check
npm run type-check
```

---

## 🎨 Özelleştirme

### Renk Teması

`src/style.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
  /* Sınıf renkleri */
  --grade-5-color: #14b8a6;
  --grade-6-color: #ec4899;
  --grade-7-color: #fde047;
  --grade-8-color: #a78bfa;
  
  /* Diğer renkler */
  --primary-color: #667eea;
  --secondary-color: #764ba2;
}
```

### Yeni Sınıf Ekleme

1. Firebase Console'da yeni grade dokümanı oluşturun
2. `isActive: true` olarak ayarlayın
3. İlgili CSS sınıfını ekleyin

---

## 📈 Performans

- ⚡ **Lighthouse Score**: 95+
- 🚀 **First Contentful Paint**: < 1s
- 📦 **Bundle Size**: ~350KB (gzipped: ~110KB)
- 🔄 **Firebase Cache**: Session-based caching
- 🖼️ **Image Optimization**: Lazy loading

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları izleyin:

1. **Fork** edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add: Amazing Feature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. **Pull Request** açın

### Commit Mesaj Formatı

```
Type: Short description

Types:
- Add: Yeni özellik
- Fix: Bug düzeltmesi
- Update: Mevcut özellik güncelleme
- Remove: Kod/özellik kaldırma
- Refactor: Kod iyileştirme
- Docs: Dokümantasyon
```

---

## 🐛 Bilinen Sorunlar

- [ ] DNS cache bazı ISP'lerde yavaş yayılabiliyor
- [ ] Safari'de bazı YouTube embed sorunları olabiliyor

---

## 📜 Lisans

Bu proje eğitim amaçlıdır ve açık kaynak olarak paylaşılmaktadır.

---

## 📞 İletişim

- **Website**: [dinakademi.com](https://dinakademi.com)
- **Email**: dinakademi@gmail.com
- **GitHub**: [okyanuskoleji](https://github.com/okyanuskoleji)

---

## 🙏 Teşekkürler

- [Vite](https://vitejs.dev/) - Blazing fast build tool
- [Firebase](https://firebase.google.com/) - Backend infrastructure
- [SortableJS](https://sortablejs.github.io/Sortable/) - Drag and drop
- [GitHub Pages](https://pages.github.com/) - Free hosting
- Tüm katkıda bulunan öğretmen ve öğrencilere ❤️

---

<div align="center">
  
  **⭐ Star vermeyi unutmayın! ⭐**
  
  Made with ❤️ for education
  
  © 2025 Din Akademi - Tüm hakları saklıdır
  
</div>
