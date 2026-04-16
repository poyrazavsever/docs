# Vue Dokumantasyonu Turkce Ceviri Kurallari ve Isleyis

Bu dokuman, ceviriyi tek kisilik ama profesyonel bir akisla yurutmek icin hazirlanmistir.

## 1) Ana Prensipler

- Metni birebir degil, teknik anlama sadik kalacak sekilde cevir.
- Okuyucunun bilissel yukunu dusuk tut: kisa cumle, net paragraf, tek fikir.
- Basliklar problem odakli kalmali.
- Kod ornekleri cevrilmez; aciklama metni cevrilir.
- Terimler tum dosyalarda tutarli olmali.

Referans kaynaklar:

- README.md
- .github/contributing/writing-guide.md
- .github/pull_request_template.md
- .vitepress/config.ts

## 2) Teknik Kurallar (Mutlaka Uygula)

### 2.1 Link ve Path Kurali

- Dahili linklerin path kismini degistirme.
- Sadece gorunen metni cevir.
- Ornek: /guide/quick-start gibi pathler ayni kalmali.

### 2.2 Anchor ve Baslik Kurali

- Header sonundaki anchor etiketlerini koru.
- Ornek: {#creating-a-vue-application} gibi etiketleri degistirme.
- API sayfalarinda anchor bozulmasi nav ve header listelerini etkiler.

### 2.3 Frontmatter Kurali

- Frontmatter alanlarini (title, description, aside vb.) gereksiz degistirme.
- Yeni alan ekleme gerekiyorsa not dus ve ayri commit yap.

### 2.4 Kod Bloklari Kurali

- Kod bloklarindaki API isimlerini, degisken adlarini, import yollarini cevirme.
- Sadece yorum satiri cevrilebilir; o da anlami bozmayacaksa.

### 2.5 Tutorial Ozel Kurali

- Tutorial tarafinda sadece description.md dosyalarini cevir.
- App kodu ve teknik adim dosyalarinda metin degisikligi yapma.
- Not: .vitepress/config.ts icinde tutorial description dosyalari srcExclude ile ayrica ele aliniyor. Bu dosyalar tutorial data yukleyicisi ile kullaniliyor.

## 3) Terim Sozlugu Sistemi

Ceviriye baslamadan once bir sozluk dosyasi olustur ve tum cevirilerde onu kullan.

Onerilen baslangic terimleri:

- component -> bilesen
- root component -> kok bilesen
- application instance -> uygulama ornegi
- state -> durum
- props -> props
- slot -> slot
- composable -> composable
- directive -> direktif
- watcher -> izleyici (watcher)
- mount -> mount etmek
- render -> render etmek
- template -> sablon

Kural:

- Bir terim secildi mi degistirme.
- Eger yeni terim secersen sozlugu hemen guncelle.

## 4) Gorsel ve Fotograf Ceviri Kurallari

Bu kisim kritik. Cok sayida diyagram ve gorsel bulunuyor.

### 4.1 Gorselleri Siniflandir

1. Metin icermeyen gorseller (logo, ikon): ceviri gerekmez.
2. Metin iceren diyagram/sema: ceviri gerekir.
3. Ekran goruntusu: yalnizca metin anlamsal deger tasiyorsa cevir.

### 4.2 Gorsel Kaynaklari Nerede

- Cogu gorsel src/\*\*/images altinda.
- Partner ve sabit varliklar src/public/images altinda.
- Bazi markdown dosyalarinda Figma kaynak linki yorum satiri olarak var.

Ornek Figma referansi bulunan sayfalar:

- src/guide/essentials/template-syntax.md
- src/guide/essentials/lifecycle.md
- src/guide/essentials/component-basics.md
- src/guide/built-ins/transition.md
- src/guide/components/provide-inject.md
- src/guide/components/slots.md
- src/guide/extras/rendering-mechanism.md

### 4.3 Gorsel Ceviri Is Akisi

1. Ilgili markdown dosyasinda gorsel pathini bul.
2. Gorsel metin iceriyor mu kontrol et.
3. Figma kaynagi varsa once oradan ceviri yap:
   - frame kopyasi al
   - metinleri Turkceye cevir
   - ayni boyut ve oranla export et
4. Figma yoksa:
   - SVG ise vektor editor ile metni duzenle
   - PNG/JPG ise yeniden uretim ya da temiz overlay yontemi kullan
5. Dosya adi stratejisi:
   - Tercihen ayni dosya adini koru (link degisikliklerini azaltir)
   - Yeni ad kullanirsan markdown linkini ayni committe guncelle
6. Kalite kontrol:
   - Bulaniklik var mi
   - Metin okunabilir mi
   - Mobilde tasma var mi
   - Dosya boyutu asiri buyudu mu
7. Koyu tema acik tema varyanti varsa ikisini de guncelle.

### 4.4 Alt Metin ve Aciklama

- Gorsele ait alt metin varsa Turkceye cevir.
- Teknik terimlerin tutarliligini alt metinde de koru.

## 5) Commit ve PR Kurallari

### 5.1 Commit Stratejisi

- Kucuk ve odakli commit at.
- Oneri formati:
  - docs(tr): translate essentials application and template syntax
  - docs(tr): translate tutorial steps 1-4
  - docs(tr): update translated lifecycle diagram

### 5.2 PR Stratejisi

- Ilk PR hedefi: 35 dosya (Milestone 1).
- PR aciklamasinda su 3 bolum olsun:
  - Problem
  - Proposed Solution
  - Additional Information
- Cevrilen dosya listesini acikca ekle.
- Bilinen eksikleri yaz.

## 6) Gunluk Calisma Sistemi (Yogun)

### Gunluk Ritm

- Sabah 2.5 saat: yeni ceviri
- Oglen 2.5 saat: yeni ceviri
- Aksam 1.5 saat: dil ve terim duzeltme
- Gun sonu 30 dk: takip dosyasi guncelleme

### Gun Sonu Checklist

- O gunun tum hedef dosyalari bitti mi
- Link kontrolu yapildi mi
- Baslik yapisi bozuldu mu
- Terim tutarliligi korundu mu

## 7) Teknik Dogrulama Kapisi

Milestone veya buyuk batch sonunda mutlaka calistir:

- pnpm run type
- pnpm run build
- pnpm run preview

Hata varsa:

- Yeni dosyaya gecme
- Once mevcut batchi temizle

## 8) Ceviride Yapilmayacaklar

- Kod orneklerinin mantigini degistirme.
- Path, import, API adlarini Turkcelestirme.
- Anchor etiketlerini bozma.
- Tek committe cok farkli bolumleri birlestirme.

## 9) Ozel Notlar

- error-reference veri dosyasi kaynakli oldugu icin normal metin cevirisi mantigiyla ele alinmaz.
- public altindaki statik varliklarda gelisiguzel ad degisikligi yapma.
- JSON tabanli metinler (team, themes, partners) ayri bir batch olarak ele alinmali.

## 10) Uygulama Sirasi

- Dosya sirasi ve gunluk hedefler icin su dosyayi kullan:
  - translation/TR-CEVIRI-DOSYA-SIRASI.md

Bu dokumani tek gercek kaynak olarak kullan. Yeni bir kural eklersen once bu dosyayi guncelle, sonra ceviriye devam et.
