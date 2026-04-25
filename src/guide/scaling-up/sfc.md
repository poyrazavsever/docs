# Tek Dosyalı Bileşenler {#single-file-components}

## Giriş {#introduction}

Vue Tek Dosyalı Bileşenleri (yani `*.vue` dosyaları, kısaltması **SFC**), bir Vue bileşeninin şablonunu, mantığını **ve** stillerini tek bir dosyada toplamamızı sağlayan özel bir dosya biçimidir. İşte bir SFC örneği:

<div class="options-api">

```vue
<script>
export default {
  data() {
    return {
      greeting: 'Hello World!'
    }
  }
}
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

</div>

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'
const greeting = ref('Hello World!')
</script>

<template>
  <p class="greeting">{{ greeting }}</p>
</template>

<style>
.greeting {
  color: red;
  font-weight: bold;
}
</style>
```

</div>

Görüldüğü gibi Vue SFC, klasik HTML, CSS ve JavaScript üçlüsünün doğal bir uzantısıdır. `<template>`, `<script>` ve `<style>` blokları; bir bileşenin görünümünü, mantığını ve stilini aynı dosyada bir arada tutar. Tüm söz dizimi, [SFC Söz Dizimi Şartnamesi](/api/sfc-spec) içinde tanımlanmıştır.

## Neden SFC? {#why-sfc}

SFC'ler bir derleme adımı (build step) gerektirse de karşılığında pek çok avantaj sunar:

- Bildiğiniz HTML, CSS ve JavaScript söz dizimiyle modüler bileşenler yazma
- [Doğası gereği bağlantılı ilgi alanlarının aynı yerde tutulması](#what-about-separation-of-concerns)
- Çalışma zamanı derleme maliyeti olmadan önceden derlenmiş şablonlar
- [Bileşen kapsamına alınmış CSS](/api/sfc-css-features)
- [Composition API ile çalışırken daha ergonomik söz dizimi](/api/sfc-script-setup)
- Şablon ile script'in çapraz analiziyle daha fazla derleme zamanı optimizasyonu
- Şablon ifadeleri için otomatik tamamlama ve tür denetimi içeren [IDE desteği](/guide/scaling-up/tooling#ide-support)
- Yerleşik Hot Module Replacement (HMR) desteği

SFC, Vue'yu bir framework olarak tanımlayan temel özelliklerden biridir ve aşağıdaki senaryolarda Vue'yu kullanmanın önerilen yoludur:

- Tek Sayfalık Uygulamalar (SPA)
- Statik Site Üretimi (SSG)
- Daha iyi bir geliştirici deneyimi (DX) için derleme adımının gerekçelendirilebildiği, basit olmayan her ön yüz uygulaması

Yine de SFC'lerin bazı durumlarda gereğinden fazla gelebileceğinin farkındayız. Bu yüzden Vue, bir derleme adımı olmadan düz JavaScript ile de kullanılabilir. Büyük ölçüde statik HTML sayfalarını hafif etkileşimlerle geliştirmek istiyorsanız, aşamalı geliştirme (progressive enhancement) için optimize edilmiş 6 kB'lık Vue alt kümesi [petite-vue](https://github.com/vuejs/petite-vue)'ya da göz atabilirsiniz.

## Nasıl Çalışır {#how-it-works}

Vue SFC, Vue'ya özgü bir dosya biçimidir ve [@vue/compiler-sfc](https://github.com/vuejs/core/tree/main/packages/compiler-sfc) tarafından standart JavaScript ve CSS'e önceden derlenmelidir. Derlenmiş bir SFC, standart bir JavaScript (ES) modülüdür; yani uygun bir derleme kurulumuyla bir SFC'yi modül gibi içe aktarabilirsiniz:

```js
import MyComponent from './MyComponent.vue'

export default {
  components: {
    MyComponent
  }
}
```

SFC'lerin içindeki `<style>` etiketleri, geliştirme sırasında anlık güncellemeleri (hot updates) desteklemek için genellikle yerel `<style>` etiketleri olarak enjekte edilir. Üretimde ise çıkarılıp tek bir CSS dosyasında birleştirilebilir.

SFC'lerle denemeler yapmak ve nasıl derlendiklerini görmek için [Vue SFC Playground](https://play.vuejs.org/) kullanabilirsiniz.

Gerçek projelerde SFC derleyicisini genellikle [Vite](https://vite.dev/) veya [Vue CLI](http://cli.vuejs.org/) ([webpack](https://webpack.js.org/) tabanlı) gibi bir derleme aracıyla entegre ederiz. Vue, SFC'lerle mümkün olan en hızlı şekilde başlamanız için resmi proje iskeleti oluşturma araçları sağlar. Daha fazla ayrıntı için [SFC Araçları](/guide/scaling-up/tooling) bölümüne bakın.

## Sorumlulukların Ayrılması? {#what-about-separation-of-concerns}

Geleneksel web geliştirme geçmişine sahip bazı kullanıcılar, SFC’lerin HTML, CSS ve JavaScript’in ayrı tutulması gereken sorumluluklarını aynı yerde birleştirdiği konusunda endişe duyabilir.

Bu soruyu yanıtlamak için önce şu konuda uzlaşmamız önemli: **İlgi ayrımı, dosya türü ayrımıyla aynı şey değildir.** Mühendislik ilkelerinin nihai amacı kod tabanının sürdürülebilirliğini artırmaktır. İlgi ayrımı, dosya türü ayrımı olarak dogmatik biçimde uygulandığında, giderek karmaşıklaşan ön yüz uygulamaları bağlamında bu amaca ulaşmamıza yardımcı olmaz.

Modern kullanıcı arayüzü geliştirmede, kod tabanını birbirine sıkı sıkıya bağlı üç büyük katmana bölmek yerine, gevşek bağlı bileşenlere ayırıp bunları bir araya getirmenin çok daha mantıklı olduğunu gördük. Bir bileşenin içinde şablon, mantık ve stiller doğası gereği birbirine bağlıdır; bunları aynı yerde tutmak bileşeni aslında daha uyumlu ve sürdürülebilir kılar.

Tek Dosyalı Bileşenler fikri hoşunuza gitmese bile, JavaScript ve CSS'inizi [Src Imports](/api/sfc-spec#src-imports) ile ayrı dosyalara ayırarak hâlâ anlık yeniden yükleme (hot-reload) ve önceden derleme özelliklerinden yararlanabilirsiniz.
