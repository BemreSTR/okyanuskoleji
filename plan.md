# 🌊 Okyanus Koleji Rebranding Planı

Bu belge, "Din Akademi" projesinin tasarım ve mantık yapısını koruyarak "Okyanus Koleji" markasına dönüştürülmesi için gereken adımları içerir.

## 📋 Genel Durum
- **Eski İsim:** Din Akademi
- **Yeni İsim:** Okyanus Koleji
- **Durum:** Tasarım ve kod mimarisi korunacak, marka kimliği güncellenecek.

---

## 🛠️ Uygulama Adımları

### 1. Görsel ve Metinsel Markalama (Branding)
- [ ] **Site Başlığı:** `index.html` ve `admin.html` dosyalarındaki `<title>` etiketlerini "Okyanus Koleji" olarak güncelle.
- [ ] **Arayüz Metinleri:** `src/main.ts` ve `admin.ts` içindeki "DİN AKADEMİ" yazılarını "OKYANUS KOLEJİ" ile değiştir.
- [ ] **Logolar:** 
    - `public/images/dinakademi.png` yerine Okyanus Koleji logosu ekle.
    - `public/images/DA-logo.png` (favicon) güncelle.
- [ ] **Footer:** Telif hakkı metinlerini (`© 2025 Din Akademi`) güncelle.

### 2. Teknik Altyapı Güncellemeleri
- [ ] **Firebase:** Firestore ve Auth yapısı şu an "dinakademi-b7252" projesine bağlı. İsteğe bağlı olarak yeni bir Firebase projesine geçilebilir veya mevcut proje içindeki isimlendirmeler (e-posta vb.) güncellenebilir.
- [ ] **Local Storage / Session:** `dinakademi_visits` ve `alioflu_logged_in` gibi anahtarları daha genel veya Okyanus Koleji odaklı isimlerle (`okyanus_visits` vb.) değiştir.
- [ ] **Ziyaretçi Sayacı:** CounterAPI üzerindeki namespace'i güncelle.

### 3. İçerik Yönetimi (Gelecek Aşama)
- [ ] **Ders ve Üniteler:** Admin paneli üzerinden mevcut Din Kültürü verilerini temizle veya Okyanus Koleji müfredatına uygun yeni `grades`, `units` ve `videos` verilerini gir.
- [ ] **Giriş Bilgileri:** `alioflu@gmail.com` olan teknik giriş bilgilerini kurumsal bir e-posta ile güncelle.

### 4. Yayınlama ve Deployment
- [ ] **GitHub:** `https://github.com/BemreSTR/okyanuskoleji` reposuna son halini itele (push).
- [ ] **Domain:** `dinakademi.com` yönlendirmesini veya CNAME kaydını yeni duruma göre değerlendir.

---

## 📅 Takvim
1. **Aşama 1:** İsim ve logo değişikliklerinin tamamlanması.
2. **Aşama 2:** Teknik anahtarların ve giriş bilgilerinin güncellenmesi.
3. **Aşama 3:** Müfredat (veri) değişikliği.

---
*Hazırlayan: GitHub Copilot* | *Tarih: 30 Ocak 2026*
