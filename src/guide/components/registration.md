# Bileşen Kaydı {#component-registration}

> Bu sayfa, [Bileşenlerin Temelleri](/guide/essentials/component-basics)'ni okuduğunuzu varsayar. Bileşenlere yeniyseniz, önce bunu okuyun.

<VueSchoolLink href="https://vueschool.io/lessons/vue-3-global-vs-local-vue-components" title="Ücretsiz Vue.js Bileşen Kaydı Dersi"/>

Bir Vue bileşeninin, bir şablonda kullanıldığında Vue’nün bileşeni nereden bulacağını bilmesi için "kaydedilmesi" gerekir. Bileşenleri kaydetmenin iki yolu vardır: küresel ve yerel.

## Küresel Kayıt {#global-registration}

`.component()` fonksiyonuyla bileşenleri mevcut [Vue uygulamasında](/guide/essentials/application) küresel olarak kullanılabilir hale getirebiliriz:

```js
import { createApp } from 'vue'

const app = createApp({})

app.component(
  // kayıtlı ad
  'MyComponent',
  // bileşen tanımı
  {
    /* ... */
  }
)
```

SFC’ler (Tek Dosyalı Bileşenler) kullanılıyorsa, içe aktarılan `.vue` dosyalarını kaydetmiş olursunuz:

```js
import MyComponent from './App.vue'

app.component('MyComponent', MyComponent)
```

`.component()` fonksiyonu art arda zincirlenebilir:

```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```

Küresel olarak kaydedilen bileşenler, bu uygulamadaki herhangi bir bileşenin şablonunda kullanılabilir:

```vue-html
<!-- bu, uygulama içindeki herhangi bir bileşende çalışır -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```

Bu durum tüm alt bileşenler için de geçerlidir; yani bu üç bileşenin tamamı _birbirlerinin içinde_ de kullanılabilir olacaktır.

## Yerel Kayıt {#local-registration}

Kullanışlı olmasına rağmen küresel kayıtlamanın birkaç dezavantajı vardır:

1. Küresel kayıt, build sistemlerinin kullanılmayan bileşenleri kaldırmasını (diğer adıyla “tree-shaking”) engeller. Bir bileşeni küresel olarak kaydedip uygulamanızın hiçbir yerinde kullanmasanız bile, bu bileşen final bundle'a (derleme çıktısına) dahil edilir.

2. Küresel kayıt, büyük uygulamalarda bağımlılık ilişkilerini daha az açık hale getirir. Bir üst bileşenin kullandığı alt bileşenin tanımını bulmayı zorlaştırır. Bu durum, çok fazla küresel değişken kullanmaya benzer şekilde uzun vadeli sürdürülebilirliği olumsuz etkileyebilir.

Yerel kayıt, kaydedilen bileşenlerin erişimini yalnızca mevcut bileşen ile sınırlar. Bu, bağımlılık ilişkisini daha açık hale getirir ve "tree-shaking" açısından daha uygundur.

<div class="composition-api">

`<script setup>` ile SFC (Tek Dosyalı Bileşen) kullanıldığında, içe aktarılan bileşenler ayrıca kayıt yapılmadan yerel olarak kullanılabilir:

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

`<script setup>` kullanılmadığında, `components` seçeneğini kullanmanız gerekir:

```js
import ComponentA from './ComponentA.js'

export default {
  components: {
    ComponentA
  },
  setup() {
    // ...
  }
}
```

</div>
<div class="options-api">

Yerel kayıt, `components` seçeneği kullanılarak yapılır:

```vue
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```

</div>

`components` nesnesindeki her bir özellik için anahtar, bileşenin kayıtlı adı olurken; değer bileşen tanımını içerir. Yukarıdaki örnek ES2015 özellik kısaltmasını kullanmaktadır ve şununla eşdeğerdir:

```js
export default {
  components: {
    ComponentA: ComponentA
  }
  // ...
}
```

Şunu unutmayın: **yerel olarak kaydedilen bileşenler, alt bileşenlerde _kullanılamaz_**. Bu durumda `ComponentA`, yalnızca mevcut bileşen içinde kullanılabilir; onun alt bileşenlerinde kullanılamaz.

## Bileşen İsimlendirme Stili {#component-name-casing}

Rehber boyunca bileşenleri kaydederken PascalCase isimler kullanıyoruz. Bunun nedeni:

1. PascalCase isimler geçerli JavaScript identifier’larıdır. Bu, bileşenleri JavaScript içinde import etmeyi ve kaydetmeyi kolaylaştırır. Ayrıca IDE’lerde auto-completion (otomatik tamamlama) desteğini geliştirir.

2. `<PascalCase />` kullanımı, bunun yerel bir HTML elementi değil bir Vue bileşeni olduğunu şablonlarda daha net hale getirir. Ayrıca Vue bileşenlerini custom element’lerden (web components) ayırt etmeyi sağlar.

Bu stil, SFC (Tek Dosyalı Bileşen) veya string şablonlar ile çalışırken önerilen yaklaşımdır. Ancak [DOM içi Şablon Ayrıştırma Kısıtlamaları](/guide/essentials/component-basics#in-dom-template-parsing-caveats) bölümünde açıklandığı gibi, PascalCase etiketler DOM içi şablonlarda kullanılamaz.

Neyse ki Vue, PascalCase kullanılarak kaydedilen bileşenleri kebab-case etiketlere çözümlemeyi destekler. Bu, `MyComponent` olarak kaydedilen bir bileşenin Vue şablonunda (veya Vue tarafından render edilen bir HTML elementinin içinde) hem `<MyComponent>` hem de `<my-component>` olarak kullanılabileceği anlamına gelir. Bu sayede şablon kaynağı ne olursa olsun aynı JavaScript bileşen kayıt kodunu kullanabiliriz.
