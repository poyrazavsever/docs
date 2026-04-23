---
sidebar: false
ads: false
editLink: false
sponsors: false
---

<script setup>
import SponsorsGroup from '@theme/components/SponsorsGroup.vue'
import { load, data } from '@theme/components/sponsors'
import { onMounted } from 'vue'

onMounted(load)
</script>

# Vue.js Sponsoru Olun {#become-a-vue-js-sponsor}

Vue.js, MIT lisanslı açık kaynaklı bir projedir ve kullanımı tamamen ücretsizdir.
Böylesine büyük bir ekosistemi ayakta tutmak ve proje için yeni özellikler geliştirmek adına harcanan muazzam çaba, ancak sponsorlarımızın cömert finansal destekleri sayesinde sürdürülebilir hale gelmektedir.

## Nasıl Sponsor Olunur {#how-to-sponsor}

Sponsorluk işlemleri [GitHub Sponsors](https://github.com/sponsors/yyx990803) veya [OpenCollective](https://opencollective.com/vuejs) üzerinden yapılabilir. Faturalar, GitHub'ın ödeme sistemi üzerinden temin edilebilir. Hem aylık yinelenen sponsorluklar hem de tek seferlik bağışlar kabul edilmektedir. Düzenli sponsorluklar, [Seviye Avantajları](#tier-benefits) bölümünde belirtildiği üzere logo yerleştirme hakkına sahiptir.

Seviyeler, ödeme lojistiği veya sponsor görünürlük verileri ile ilgili sorularınız varsa, lütfen [sponsor@vuejs.org](mailto:sponsor@vuejs.org?subject=Vue.js%20sponsorship%20inquiry) adresinden bizimle iletişime geçin.

## Bir İşletme Olarak Vue'ya Sponsor Olmak {#sponsoring-vue-as-a-business}

Vue'ya sponsor olmak, web sitemiz ve GitHub proje README'leri aracılığıyla dünya genelindeki **2 milyondan fazla** Vue geliştiricisine görünürlük sağlar. Bu, doğrudan potansiyel müşteri oluşturmanın yanı sıra açık kaynağa önem veren bir işletme olarak marka bilinirliğinizi de artırır. Bu görünürlük, geliştiricilere yönelik ürünler geliştiren şirketler için soyut ama son derece önemli bir değerdir; çünkü dönüşüm oranınızı artırır.

Gelir getiren bir ürün geliştirmek için Vue kullanıyorsanız, Vue'nun geliştirilmesine sponsor olmak iş açısından anlamlıdır: **ürününüzün dayandığı projenin sağlıklı kalmasını ve aktif olarak sürdürülmesini sağlar.** Vue topluluğundaki görünürlük ve olumlu marka imajı, Vue geliştiricilerini çekmeyi ve işe almayı da kolaylaştırır.

Hedef müşterileri geliştiriciler olan bir ürün geliştiriyorsanız, tüm ziyaretçilerimiz geliştirici olduğu için sponsorluk görünürlüğü sayesinde yüksek kaliteli trafik elde edersiniz. Sponsorluk ayrıca marka bilinirliği oluşturur ve dönüşümü artırır.

## Bireysel Olarak Vue'ya Sponsor Olmak {#sponsoring-vue-as-an-individual}

Bireysel bir kullanıcıysanız ve Vue kullanmanın sağladığı üretkenlikten memnun kaldıysanız, takdir göstergesi olarak bağış yapmayı düşünebilirsiniz; bunu arada bir bize kahve ısmarlamak gibi değerlendirebilirsiniz. Ekip üyelerimizin çoğu GitHub Sponsors üzerinden sponsorluk ve bağış kabul eder. [Ekip sayfamızda](/about/team) her ekip üyesinin profilindeki "Sponsor" düğmesini arayın.

İşvereninizi de Vue'ya bir işletme olarak sponsor olmaya ikna etmeyi deneyebilirsiniz. Bu kolay olmayabilir, ancak işletme sponsorlukları açık kaynak yazılım (OSS) projelerinin sürdürülebilirliği üzerinde bireysel bağışlardan genellikle çok daha büyük etki yaratır; bu nedenle başarılı olursanız bize çok daha fazla yardımcı olmuş olursunuz.

## Seviye Avantajları {#tier-benefits}

- **Küresel Özel Sponsor**:
  - Dünya genelinde **bir** sponsorla sınırlıdır. <span v-if="!data?.special">Şu anda boş. [İletişime geçin](mailto:sponsor@vuejs.org?subject=Vue.js%20special%20sponsor%20inquiry)!</span><span v-else>(Şu anda dolu)</span>
  - (Özel) [vuejs.org](/) ana sayfasının **kaydırmadan görünen bölümünde** logo yerleşimi.
  - (Özel) Önemli ürün lansmanları için [Vue'nun resmi X hesabı](https://x.com/vuejs) (320 bin takipçi) üzerinden özel duyuru ve düzenli yeniden paylaşım.
  - Daha alt seviyelerdeki tüm konumlarda en belirgin logo yerleşimi.
- **Platin (aylık 2.000 ABD doları)**:
  - [vuejs.org](/) ana sayfasında belirgin logo yerleşimi.
  - Tüm içerik sayfalarının kenar çubuğunda belirgin logo yerleşimi.
  - [`vuejs/core`](https://github.com/vuejs/core) ve [`vuejs/vue`](https://github.com/vuejs/core) README'lerinde belirgin logo yerleşimi.
- **Altın (aylık 500 ABD doları)**:
  - [vuejs.org](/) ana sayfasında büyük logo yerleşimi.
  - `vuejs/core` ve `vuejs/vue` README'lerinde büyük logo yerleşimi.
- **Gümüş (aylık 250 ABD doları)**:
  - `vuejs/core` ve `vuejs/vue` depolarındaki `BACKERS.md` dosyasında orta boy logo yerleşimi.
- **Bronz (aylık 100 ABD doları)**:
  - `vuejs/core` ve `vuejs/vue` depolarındaki `BACKERS.md` dosyasında küçük logo yerleşimi.
- **Cömert Destekçi (aylık 50 ABD doları)**:
  - Adınız, `vuejs/core` ve `vuejs/vue` depolarındaki `BACKERS.md` dosyasında diğer bireysel destekçilerin üstünde listelenir.
- **Bireysel Destekçi (aylık 5 ABD doları)**:
  - Adınız, `vuejs/core` ve `vuejs/vue` depolarındaki `BACKERS.md` dosyasında listelenir.

## Mevcut Sponsorlar {#current-sponsors}

### Küresel Özel Sponsor {#special-global-sponsor}

<SponsorsGroup tier="special" placement="page" />

### Platin {#platinum}

<SponsorsGroup tier="platinum" placement="page" />

### Platin (Çin) {#platinum-china}

<SponsorsGroup tier="platinum_china" placement="page" />

### Altın {#gold}

<SponsorsGroup tier="gold" placement="page" />

### Gümüş {#silver}

<SponsorsGroup tier="silver" placement="page" />
