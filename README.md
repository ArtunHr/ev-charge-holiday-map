# RouteCharge Turkey

Elektrikli araç sürücüleri için Türkiye içi rotalarda şarj istasyonu bulma uygulaması.
Bu uygulama React, Vite, Tailwind CSS ve Leaflet (OpenStreetMap) kullanılarak geliştirilmiş bir statik MVP'dir.

## Özellikler

- **Statik Rota:** Konya → Belek Innvista Hotels rotasını gösterir.
- **Şarj İstasyonu Keşfi:** Rota üzerindeki şarj istasyonları statik veriler üzerinden listelenir.
- **Filtreleme:** Soket tipi, DC hızlı şarj durumu ve rotadan maksimum sapma mesafesine göre sonuçları filtreleme.
- **Akıllı Harita Etkileşimi:** Listeden seçilen istasyona harita üzerinde odaklanma.

## Geliştirme Ortamı Kurulumu

Projeyi yerel bilgisayarınızda çalıştırmak için:

1. Depoyu klonlayın ve bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

## Önemli Notlar

- Bu sürüm (MVP) Google Maps API **kullanmaz**. Hiçbir API anahtarına veya faturalandırma kurulumuna ihtiyaç yoktur.
- Harita altyapısı olarak tamamen ücretsiz ve açık kaynaklı OpenStreetMap (Leaflet via react-leaflet) kullanılmıştır.
- İstasyon verileri `src/data/stations.ts` dosyasından okunmaktadır. Yeni istasyonları bu dosyaya ekleyerek güncelleyebilirsiniz.

## Vercel Üzerinde Yayınlama (Deployment)

Uygulamanızı Vercel üzerinde hızlıca yayınlayabilirsiniz:

1. GitHub deponuzu Vercel'e bağlayın.
2. Özel bir ortam değişkeni (API key) ayarlamanıza gerek yoktur.
3. "Deploy" butonuna basarak projeyi canlıya alın.

## Yapı (Mimari)

- `src/App.tsx`: Ana uygulama bileşeni.
- `src/components/MapView.tsx`: Leaflet entegrasyonu ve harita görünümü.
- `src/components/StationList.tsx`: İstasyon listesi paneli.
- `src/components/Filters.tsx`: İstasyon filtreleme kontrolleri.
- `src/data/stations.ts`: Düzenlenebilir statik şarj istasyonları verisi.
- `src/data/route.ts`: Statik rota (polyline) koordinatları.

