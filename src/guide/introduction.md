---
footer: false
---

# Giriş {#introduction}

:::info Vue 3 dokümantasyonunu okuyorsunuz!

- Vue 2 desteği **31 Aralık 2023** itibarıyla sona ermiştir. [Vue 2 EOL](https://v2.vuejs.org/eol/) hakkında daha fazla bilgi edinin.
- Vue 2’den yükseltme mi yapıyorsunuz? [Geçiş Kılavuzu](https://v3-migration.vuejs.org/)'na göz atın.
  :::

<style src="@theme/styles/vue-mastery.css"></style>
<div class="vue-mastery-link">
  <a href="https://www.vuemastery.com/courses/" target="_blank">
    <div class="banner-wrapper">
      <img class="banner" alt="Vue Mastery banner" width="96px" height="56px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vuemastery-graphical-link-96x56.png" />
    </div>
    <p class="description"><span>VueMastery.com</span> üzerindeki video eğitimleriyle Vue'yu öğrenin</p>
    <div class="logo-wrapper">
        <img alt="Vue Mastery Logo" width="25px" src="https://storage.googleapis.com/vue-mastery.appspot.com/flamelink/media/vue-mastery-logo.png" />
    </div>
  </a>
</div>

## Vue Nedir? {#what-is-vue}

Vue (**/vjuː/** olarak okunur, **view** gibi), kullanıcı arayüzleri oluşturmak için kullanılan bir JavaScript framework'üdür. Standart HTML, CSS ve JavaScript üzerine inşa edilir ve her karmaşıklıkta kullanıcı arayüzlerini verimli bir şekilde geliştirmenize yardımcı olan bildirimsel (declarative), bileşen (component) tabanlı bir programlama modeli sunar.

İşte minimal bir örnek:

<div class="options-api">

```js
import { createApp } from 'vue'

createApp({
  data() {
    return {
      count: 0
    }
  }
}).mount('#app')
```

</div>
<div class="composition-api">

```js
import { createApp, ref } from 'vue'

createApp({
  setup() {
    return {
      count: ref(0)
    }
  }
}).mount('#app')
```

</div>

```vue-html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

**Sonuç**

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<div class="demo">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>

Yukarıdaki örnek Vue'nun iki temel özelliğini göstermektedir:

- **Bildirimsel Oluşturma (Declarative Rendering)**: Vue, HTML çıktısını JavaScript durumuna (state) dayalı olarak bildirimsel bir şekilde tanımlamamıza olanak tanıyan bir şablon (template) sözdizimi ile standart HTML'i genişletir.

- **Tepkisellik (Reactivity)**: Vue, JavaScript durum (state) değişikliklerini otomatik olarak izler ve değişiklikler gerçekleştiğinde DOM'u verimli bir şekilde günceller.

Şimdiden sorularınız olabilir - endişelenmeyin. Kılavuzun geri kalanında en küçük ayrıntısına kadar her şeyi ele alacağız. Şimdilik Vue'nun sunduklarına dair üst düzey bir anlayışa sahip olabilmeniz için lütfen okumaya devam edin.

:::tip Ön Koşullar
Dokümantasyonun geri kalanı temel düzeyde HTML, CSS ve JavaScript bilgisine sahip olduğunuzu varsayar. Frontend (önyüz) geliştirmede tamamen yeniyseniz, ilk adımınız olarak doğrudan bir framework'e atlamak çok iyi bir fikir olmayabilir - önce temelleri kavrayıp sonra geri dönün! İhtiyaç duyarsanız düzeyinizi bu [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript), [HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML) ve [CSS](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps) özetleriyle kontrol edebilirsiniz. Diğer framework'lerle olan önceki deneyiminiz yardımcı olur, ancak şart değildir.
:::

## Aşamalı Framework (The Progressive Framework) {#the-progressive-framework}

Vue, frontend geliştirmede ihtiyaç duyulan yaygın özelliklerin çoğunu kapsayan bir framework ve ekosistemdir. Ancak web son derece çeşitlidir; web üzerinde oluşturduğumuz şeyler form ve ölçek olarak büyük ölçüde değişebilir. Vue, bu durum göz önünde bulundurularak esnek ve kademeli olarak benimsenebilecek şekilde tasarlanmıştır. Kullanım durumunuza bağlı olarak Vue, farklı şekillerde kullanılabilir:

- Bir derleme adımı olmadan statik HTML'i zenginleştirmek
- Herhangi bir sayfaya Web Bileşenleri (Web Components) olarak gömmek
- Tek Sayfalı Uygulama (Single-Page Application - SPA)
- Fullstack / Sunucu Tarafı Oluşturma (Server-Side Rendering - SSR)
- Jamstack / Statik Site Üretimi (Static Site Generation - SSG)
- Masaüstü, mobil, WebGL ve hatta terminali hedeflemek

Bu kavramlar gözünüzü korkutuyorsa endişelenmeyin! Eğitim ve kılavuz yalnızca temel HTML ve JavaScript bilgisi gerektirir; bunlardan herhangi birinde uzman olmadan da anlatılanları takip edebilmelisiniz.

Eğer Vue'yu teknoloji yığınınızla (stack) en iyi nasıl entegre edebileceğinizle ilgilenen deneyimli bir geliştiriciyseniz veya bu terimlerin ne anlama geldiğini merak ediyorsanız, bunları [Vue'yu Kullanma Yolları](/guide/extras/ways-of-using-vue) bölümünde daha ayrıntılı olarak tartışıyoruz.

Esnekliğe rağmen, Vue'nun nasıl çalıştığına dair temel bilgi tüm bu kullanım durumlarında ortaktır. Şu an sadece bir başlangıç seviyesinde olsanız bile, bu yolda edindiğiniz bilgiler gelecekte daha iddialı hedeflerin üstesinden geldikçe faydalı olmaya devam edecektir. Eğer deneyimliyseniz, hedeflerinize ulaşmak için çözmeye çalıştığınız problemlere bağlı olarak Vue'dan faydalanmanın optimal yolunu aynı verimlilikle bulabilirsiniz. Vue'ya "Aşamalı Framework (The Progressive Framework)" dememizin nedeni de budur: O sizinle birlikte büyüyebilen ve ihtiyaçlarınıza uyum sağlayabilen bir framework'tür.

## Tek Dosyalı Bileşenler {#single-file-components}

Derleme aracı etkinleştirilmiş çoğu Vue projesinde, Vue bileşenlerini **Tek Dosyalı Bileşen (Single-File Component)** (SFC olarak kısaltılır veya `*.vue` dosyaları olarak da bilinir) adı verilen HTML benzeri bir dosya formatı kullanarak yazarız. Adından da anlaşıldığı gibi bir Vue SFC; bileşenin mantığını (JavaScript), şablonunu (template - HTML) ve stillerini (CSS) tek bir dosyada kapsüller. İşte SFC formatında yazılmış önceki örneğimiz:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>
<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

</div>

SFC, Vue'nun belirleyici bir özelliğidir ve kullanım durumunuz bunu gerektirecek bir derleme (build) kurulumunu haklı çıkarıyorsa Vue bileşenleri yazmanın **önerilen** yoludur. SFC'nin [nasıl ve neden](/guide/scaling-up/sfc) olduğuna dair bu kendi bölümünde daha fazlasını öğrenebilirsiniz - ancak şimdilik yalnızca Vue'nun sizin için tüm derleme araçları kurulumunu halledeceğini bilmeniz yeterlidir.

## API Stilleri {#api-styles}

Vue bileşenleri (components) iki farklı API stilinde yazılabilir: **Options API** ve **Composition API**.

### Options API {#options-api}

Options API ile bir bileşenin mantığını, `data`, `methods` ve `mounted` gibi seçeneklerin bulunduğu bir nesne (object) kullanarak tanımlarız. Seçenekler aracılığıyla tanımlanan özellikler, fonksiyonların içindeki bileşen örneğine (component instance) işaret eden `this` anahtar kelimesi üzerinde dışarıya sunulur:

```vue
<script>
export default {
  // data() içinden döndürülen özellikler tepkisel bir duruma (reactive state)
  // dönüşür ve `this` üzerinde erişilebilir hale gelir.
  data() {
    return {
      count: 0
    }
  },

  // methods (metotlar), durumu değiştiren ve güncellemeleri tetikleyen fonksiyonlardır.
  // Bunlar şablonlar (templates) içinde olay işleyicileri (event handlers) olarak bağlanabilirler.
  methods: {
    increment() {
      this.count++
    }
  },

  // Yaşam döngüsü kancaları (Lifecycle hooks), bileşenin yaşam
  // döngüsünün farklı aşamalarında çağrılır.
  // Bu fonksiyon bileşen bağlandığında (mounted) çağrılacaktır.
  mounted() {
    console.log(`Başlangıçtaki sayı ${this.count} idi.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Playground Üzerinde Deneyin](https://play.vuejs.org/#eNptkMFqxCAQhl9lkB522ZL0HNKlpa/Qo4e1ZpLIGhUdl5bgu9es2eSyIMio833zO7NP56pbRNawNkivHJ25wV9nPUGHvYiaYOYGoK7Bo5CkbgiBBOFy2AkSh2N5APmeojePCkDaaKiBt1KnZUuv3Ky0PppMsyYAjYJgigu0oEGYDsirYUAP0WULhqVrQhptF5qHQhnpcUJD+wyQaSpUd/Xp9NysVY/yT2qE0dprIS/vsds5Mg9mNVbaDofL94jZpUgJXUKBCvAy76ZUXY53CTd5tfX2k7kgnJzOCXIF0P5EImvgQ2olr++cbRE4O3+t6JxvXj0ptXVpye1tvbFY+ge/NJZt)

### Composition API {#composition-api}

Composition API ile bir bileşenin mantığını içe aktarılan API fonksiyonlarını kullanarak tanımlarız. SFC'lerde Composition API tipik olarak [`<script setup>`](/api/sfc-script-setup) ile birlikte kullanılır. `setup` özniteliği (attribute), Composition API'yi daha az basmakalıp kod (boilerplate) ile kullanmamıza olanak tanıyan derleme zamanı (compile-time) dönüşümlerini Vue'nun gerçekleştirmesini sağlayan bir ipucudur. Örneğin `<script setup>` içinde bildirilen içe aktarmalar ve en üst düzey değişkenler/fonksiyonlar doğrudan şablon (template) içinde kullanılabilir.

Aşağıda, sadece Composition API ve `<script setup>` kullanılmış tamamen aynı şablona sahip bir önceki bileşenin Composition API versiyonu bulunmaktadır:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// tepkisel durum (reactive state)
const count = ref(0)

// durumu (state) değiştiren ve güncellemeleri tetikleyen fonksiyonlar
function increment() {
  count.value++
}

// yaşam döngüsü kancaları (lifecycle hooks)
onMounted(() => {
  console.log(`Başlangıçtaki sayı ${count.value} idi.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

[Playground Üzerinde Deneyin](https://play.vuejs.org/#eNpNkMFqwzAQRH9lMYU4pNg9Bye09NxbjzrEVda2iLwS0spQjP69a+yYHnRYad7MaOfiw/tqSliciybqYDxDRE7+qsiM3gWGGQJ2r+DoyyVivEOGLrgRDkIdFCmqa1G0ms2EELllVKQdRQa9AHBZ+PLtuEm7RCKVd+ChZRjTQqwctHQHDqbvMUDyd7mKip4AGNIBRyQujzArgtW/mlqb8HRSlLcEazrUv9oiDM49xGGvXgp5uT5his5iZV1f3r4HFHvDprVbaxPhZf4XkKub/CDLaep1T7IhGRhHb6WoTADNT2KWpu/aGv24qGKvrIrr5+Z7hnneQnJu6hURvKl3ryL/ARrVkuI=)

### Hangisini Seçmeliyim? {#which-to-choose}

Her iki API stili de yaygın kullanım durumlarını karşılayabilecek kapasitededir. Onlar tamamen aynı çekirdek sisteme dayanan farklı arayüzlerdir. Hatta, Options API aslında Composition API'nin üzerine inşa edilmiştir! Vue hakkındaki temel kavramlar ve bilgiler bu iki stil arasında ortaktır.

Options API genel yapısı (örnekte `this` ile gösterildiği gibi) etrafında dönerken nesne yönelimli programlama (OOP) dillerinden gelen kullanıcılar için sınıf-tabanlı zihinsel modelle daha uyumlu olabilmektedir. Ayrıca, tepkisellik (reactivity) ile ilgili detayları soyutlaması ve ilgili kod parçalarını belirli seçenek grupları üzerinden yönetmeye zorlamasıyla başlangıç düzeyindekiler için daha uygundur.

Composition API ise doğrudan fonksiyon çerçevesine bağlı tepkisel (reactive) durum değişkenleri tanımlama ile karmaşıklığı yönetmek için durumu birden çok fonksiyondan bir araya getirme mantığı etrafında dönmektedir. Diğerine nazaran daha bağımsız formda olduğu için etkili bir biçimde kullanabilmek adına Vue'da tepkiselliğin çalışma sistemini anlamak şarttır. Bunun bir getirisi olarak da yapısıyla sağladığı özgürlük düzeyi, mantığı organize etmekte ve tekrar kullanabilmekte daha güçlü örüntülere imkan tanımasını beraberinde getirir.

Söz konusu bu iki stili karşılaştırmak ve Composition API stili kullanmanın potansiyel yararlarını geniş bağlamda anlamak isterseniz [Composition API SSS](/guide/extras/composition-api-faq) bölümünü daha yakından inceleyebilirsiniz.

Eğer Vue'da henüz yeniyseniz genel tavsiyemiz şudur:

- Öğrenmeye yönelik amaçlar için, size kavraması daha kolay gelen stili kullanarak ilerleyin. Aklınızda bulunsun; temel kavramların çoğu bu iki stil için de ortaktır. Her zaman sonradan geçişi sağlayarak diğer stili kullanmayı öğrenebilirsiniz.

- Üretim (production) kullanımında ise:
  - Herhangi bir derleme (build) aracı kullanmıyorsanız ya da Vue'yu düşük çaplı aşamalı geliştirmeler (progressive enhancement) yapacağınız başlangıç durumuna daha yakın basitleştirilmiş senaryolarda değerlendirmeyi planlıyorsanız Options API yolunu seçin.

  - Eğer Vue kullanarak tam kapsamlı uygulamalar derleme planınız var ise Single-File Components ve Composition API yolunu seçmelisiniz.

Öğrenme evresindeyken sadece tek bir stili kullanmak zorunda değilsiniz. Geriye kalan dokümantasyonlar, iki stil ile kullanılabilecek geçerli kod örnekleri sunacağından ötürü sol tarafta yukarıdaki kısımdan **API Stili (API Preference)** düğmenizi açık konuma getirerek bunlar arasında dilediğiniz vakit geçiş uygulayabilecek duruma geleceksiniz.

## Başka Sorularınız Mı Var? {#still-got-questions}

[SSS (Sıkça Sorulan Sorular)](/about/faq) sayfamızı inceleyin.

## Kendi Öğrenme Yolunuzu Seçin {#pick-your-learning-path}

Her geliştiricinin farklı bir öğrenme stili vardır. Tercihiniz her ne yöndeyse, size en uygun öğrenme yolunu seçme konusunda serbestsiniz - yine de, mümkün olduğu takdirde içerikte yer alan konularda önden giderek hepsine değinmiş olmanızı öneririz!

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Eğiticiyi Deneyin</p>
    <p class="next-steps-caption">Kavramları uygulamalı bir şekilde öğrenmeyi tercih edenler için.</p>
  </a>
  <a class="vt-box" href="/guide/quick-start.html">
    <p class="next-steps-link">Kılavuzu Okuyun</p>
    <p class="next-steps-caption">Kılavuz, framework'ün her yönünü tüm ayrıntılarıyla anlatır.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Örneklere Göz Atın</p>
    <p class="next-steps-caption">Temel özellikleri ve yaygın arayüz görevlerine dair örnekleri keşfedin.</p>
  </a>
</div>
