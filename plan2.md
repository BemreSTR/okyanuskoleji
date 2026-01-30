# Plan 2: Statik Site Dönüşümü (Config-Based)

Bu planın amacı, projeyi karmaşık veritabanı ve admin paneli yapısından kurtarıp, yönetimi kolay ve performansı yüksek bir statik site yapısına (Dosya tabanlı yönetim) çevirmektir.

## 1. Veri Yapısının Oluşturulması
- [ ] `src/data/curriculum.ts` dosyasının oluşturulması.
- [ ] Mevcut `firebase.service.ts` içindeki "yedek" verilerin (Geometrik Cisimler vb.) bu dosyaya temiz bir TS/JSON formatında aktarılması.
- [ ] 1., 3. ve 4. sınıflar için boş şablonların eklenmesi.

## 2. Veri Akışının Değiştirilmesi
- [ ] `src/data.ts` dosyasının güncellenmesi.
  - `firebase.service.ts` bağımlılığının kaldırılması.
  - Verilerin doğrudan `curriculum.ts` üzerinden çekilmesi.
- [ ] `src/services/firebase.service.ts` dosyasının silinmesi (veya arşivlenmesi).

## 3. Gereksiz Dosyaların Temizlenmesi
- [ ] Admin panelinin silinmesi (`admin.html`, `src/admin/` klasörü).
- [ ] `main.ts` içindeki gereksiz login/auth kodlarının temizlenmesi.
- [ ] `vite.config.ts` içerisinden admin giriş noktasının (entry point) temizlenmesi (eğer varsa).
- [ ] `firebase.config.ts` dosyasının silinmesi (Firebase tamamen kaldırılacaksa).

## 4. Test ve Doğrulama
- [ ] Sitenin açılış hızının kontrolü.
- [ ] Tema ve Konu sayfalarının doğru çalıştığının teyidi.
- [ ] "İnteraktif Konu Anlatımını Başlat" butonunun çalıştığının teyidi.
