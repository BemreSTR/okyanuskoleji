# 🌊 Okyanus Koleji

<div align="center">
  <img src="public/images/dinakademi.png" alt="Okyanus Koleji Logo" width="400"/>
  
  ### Öğrenciler için Eğitici İnteraktif Platformu
  
  [![Live Demo](https://img.shields.io/badge/demo-live-success)](https://dinakademi.com)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.2-646CFF)](https://vitejs.dev/)
  
  [🌐 Canlı Demo](https://dinakademi.com) | [📖 Dokümantasyon](#özellikler) | [🐛 Sorun Bildir](https://github.com/BemreSTR/okyanuskoleji/issues)
</div>

---

## 📖 Hakkında

**Okyanus Koleji**, öğrencileri için modern bir eğitim platformudur. Öğrenciler, tema ve konu bazında organize edilmiş interaktif konu anlatımlarına kolayca erişebilirler.

### 🎯 Amacımız

- ✅ Kaliteli eğitim içeriğini erişilebilir kılmak
- ✅ Öğrencilerin ders çalışmasını eğlenceli hale getirmek
- ✅ İnteraktif öğrenme deneyimi sunmak

---

## ✨ Özellikler

### 🎓 Öğrenci Özellikleri

- **📁 İnteraktif Materyaller**: Konulara özel hazırlanmış HTML tabanlı interaktif içerikler
- **📱 Responsive Tasarım**: Mobil, tablet ve masaüstü uyumlu
- **🔍 Kolay Navigasyon**: Sezgisel ve kullanıcı dostu arayüz
- **⚡ Hızlı Performans**: Tamamen statik site (Static Site) yapısı sayesinde ışık hızında açılış

---

## 🛠️ Teknoloji Stack

### Frontend
- **[Vite](https://vitejs.dev/)** - Lightning fast build tool
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **Vanilla CSS** - Modern, responsive styling
- **ES Modules** - Modern JavaScript modules

### Architecture
- **Static Site** - Sunucu veya veritabanı gerektirmeyen yapı
- **Config-Based Data** - Müfredat ve konuların JSON/TS dosyaları üzerinden yönetimi

---

## 🚀 Kurulum

### Ön Gereksinimler

- **Node.js** >= 18.0.0
- **npm** veya **pnpm**
- **Git**

### Adımlar

1. **Repository'yi klonlayın:**
   ```bash
   git clone https://github.com/BemreSTR/okyanuskoleji.git
   cd okyanuskoleji
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   # veya
   pnpm install
   ```

3. **Development sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

4. **Tarayıcıda açın:**
   - Ana site: `http://localhost:5173`

---

## 📚 Kullanım

### Müfredat Yönetimi (Admin Yerine)

Site üzerindeki tüm sınıflar, temalar ve konular `src/data/curriculum.ts` dosyası üzerinden yönetilir.

**Yeni Bir Konu Eklemek İçin:**

1. `src/data/curriculum.ts` dosyasını açın.
2. İlgili sınıf ve temanın `videos` (Konular) dizisine yeni bir obje ekleyin:

```typescript
{
  id: 'yeni-konu-id',
  title: 'Konu Başlığı',
  youtubeId: '', 
  materialUrl: '/ders-materyal/KlasorAdi/index.html', // public/ders-materyal altındaki yol
  order: 99
},
```

3. Dosyayı kaydettiğinizde site otomatik olarak güncellenir.
