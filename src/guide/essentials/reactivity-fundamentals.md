---
outline: deep
---

# Tepkiselliğin Temelleri {#reactivity-fundamentals}

:::tip API Tercihi
Bu sayfa ve rehberin ilerleyen bölümlerinin birçoğu, Options API ve Composition API için farklı içerikler sunar. Mevcut tercihiniz <span class="options-api">Options API</span><span class="composition-api">Composition API</span>. Sol kenar çubuğunun üst kısmındaki "API Tercihi" anahtarlarını kullanarak API stilleri arasında geçiş yapabilirsiniz.
:::

<div class="options-api">

## Tepkisel Durumu Tanımlama \* {#declaring-reactive-state}

Options API ile bir bileşenin tepkisel durumunu tanımlamak için `data` seçeneğini kullanırız. Bu seçeneğin değeri, nesne döndüren bir fonksiyon olmalıdır. Vue, yeni bir bileşen örneği oluştururken bu fonksiyonu çağırır ve dönen nesneyi tepkisellik sistemiyle sarmalar. Bu nesnenin üst düzey özellikleri, bileşen örneği üzerinde proxy'lenir (yöntemlerde ve yaşam döngüsü kancalarında `this`):

```js{2-6}
export default {
  data() {
    return {
      count: 1
    }
  },

  // `mounted`, daha sonra açıklayacağımız bir yaşam döngüsü kancasıdır.
  mounted() {
    // `this`, bileşen örneğini ifade eder.
    console.log(this.count) // => 1

    // data aynı zamanda değiştirilebilir.
    this.count = 2
  }
}
```

[Playground'da Deneyin](https://play.vuejs.org/#eNpFUNFqhDAQ/JXBpzsoHu2j3B2U/oYPpnGtoetGkrW2iP/eRFsPApthd2Zndilex7H8mqioimu0wY16r4W+Rx8ULXVmYsVSC9AaNafz/gcC6RTkHwHWT6IVnne85rI+1ZLr5YJmyG1qG7gIA3Yd2R/LhN77T8y9sz1mwuyYkXazcQI2SiHz/7iP3VlQexeb5KKjEKEe2lPyMIxeSBROohqxVO4E6yV6ppL9xykTy83tOQvd7tnzoZtDwhrBO2GYNFloYWLyxrzPPOi44WWLWUt618txvASUhhRCKSHgbZt2scKy7HfCujGOqWL9BVfOgyI=)

Bileşen örneği özellikleri yalnızca örnek ilk kez oluşturulurken eklenir. Bu nedenle hepsinin `data` fonksiyonunun döndürdüğü nesnede yer aldığından emin olmalısınız. Gerektiğinde, henüz istenen değerin hazır olmadığı özellikler için `null`, `undefined` veya başka bir yer tutucu değer kullanın.

`data` içinde tanımlamadan doğrudan `this` üzerine yeni bir özellik eklemek mümkündür. Ancak bu şekilde eklenen özellikler tepkisel güncellemeleri tetikleyemez.

Vue, kendi yerleşik API'lerini bileşen örneği üzerinden sunarken `$` önekini kullanır. Dahili özellikler için de `_` önekini ayırır. Bu nedenle üst düzey `data` özelliklerinde bu karakterlerle başlayan adlar kullanmaktan kaçınmalısınız.

### Tepkisel Proxy ve Orijinali \* {#reactive-proxy-vs-original}

Vue 3'te veriler, [JavaScript Proxy'lerinden](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) yararlanılarak tepkisel hale getirilir. Vue 2'den gelen kullanıcılar aşağıdaki uç duruma dikkat etmelidir:

```js
export default {
  data() {
    return {
      someObject: {}
    }
  },
  mounted() {
    const newObject = {}
    this.someObject = newObject

    console.log(newObject === this.someObject) // false
  }
}
```

Atamadan sonra `this.someObject` değerine eriştiğinizde, elde ettiğiniz değer özgün `newObject` nesnesinin tepkisel proxy'sidir. **Vue 2'den farklı olarak özgün `newObject` olduğu gibi kalır ve tepkisel hale getirilmez: tepkisel duruma her zaman `this` üzerindeki özellikler üzerinden eriştiğinizden emin olun.**

</div>

<div class="composition-api">

## Tepkisel Durumu Tanımlama \*\* {#declaring-reactive-state-1}

### `ref()` \*\* {#ref}

Composition API'de tepkisel durumu tanımlamanın önerilen yolu [`ref()`](/api/reactivity-core#ref) fonksiyonunu kullanmaktır:

```js
import { ref } from 'vue'

const count = ref(0)
```

`ref()`, aldığı argümanı `.value` özelliğine sahip bir ref nesnesi içinde sararak döndürür:

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

> Ayrıca bkz.: [Ref Türleri](/guide/typescript/composition-api#typing-ref) <sup class="vt-badge ts" />

Bileşen şablonunda reflere erişmek için, bir bileşenin `setup()` fonksiyonunda bunları tanımlayıp döndürün:

```js{5,9-11}
import { ref } from 'vue'

export default {
  // `setup`, Composition API'ye özel bir kancadır.
  setup() {
    const count = ref(0)

    // ref'i şablona açın.
    return {
      count
    }
  }
}
```

```vue-html
<div>{{ count }}</div>
```

Ref'i şablonda kullanırken `.value` eklememize **gerek olmadığını** fark edin. Kullanım kolaylığı için ref'ler, şablonların içinde kullanıldığında otomatik olarak açılır (bazı [istisnalarla](#caveat-when-unwrapping-in-templates)).

Ref'i olay işleyicilerinde de doğrudan değiştirebilirsiniz:

```vue-html{1}
<button @click="count++">
  {{ count }}
</button>
```

Daha karmaşık bir mantık için, ref'leri değiştiren fonksiyonları aynı kapsamda tanımlayıp duruma ek olarak yöntem olarak dışa açabiliriz:

```js{7-10,15}
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    function increment() {
      // JavaScript'te .value gereklidir.
      count.value++
    }

    // fonksiyonu da dışa açmayı unutmayın.
    return {
      count,
      increment
    }
  }
}
```

Dışa açılan yöntemler daha sonra olay işleyici olarak kullanılabilir:

```vue-html{1}
<button @click="increment">
  {{ count }}
</button>
```

Bu örneğin canlı halini, herhangi bir build aracı kullanmadan [Codepen](https://codepen.io/vuejs-examples/pen/WNYbaqo) üzerinde görebilirsiniz.

### `&lt;script setup&gt;` \*\* {#script-setup}

`setup()` üzerinden durumu ve yöntemleri elle dışa açmak ayrıntılı olabilir. Neyse ki [Tek Dosyalı Bileşenler (SFC)](/guide/scaling-up/sfc) kullanıldığında bundan kaçınılabilir. `&lt;script setup&gt;` ile kullanımı sadeleştirebiliriz:

```vue{1}
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>

<template>
  <button @click="increment">
    {{ count }}
  </button>
</template>
```

[Playground'da Deneyin](https://play.vuejs.org/#eNo9jUEKgzAQRa8yZKMiaNcllvYe2dgwQqiZhDhxE3L3jrW4/DPvv1/UK8Zhz6juSm82uciwIef4MOR8DImhQMIFKiwpeGgEbQwZsoE2BhsyMUwH0d66475ksuwCgSOb0CNx20ExBCc77POase8NVUN6PBdlSwKjj+vMKAlAvzOzWJ52dfYzGXXpjPoBAKX856uopDGeFfnq8XKp+gWq4FAi)

`&lt;script setup&gt;` içinde tanımlanan üst düzey importlar, değişkenler ve fonksiyonlar, aynı bileşenin şablonunda otomatik olarak kullanılabilir. Şablonu, aynı kapsamda tanımlanmış bir JavaScript fonksiyonu gibi düşünebilirsiniz; doğal olarak aynı kapsamda tanımlanan her şeye erişebilir.

:::tip
Rehberin geri kalanında, Composition API kod örneklerinde öncelikli olarak SFC + `&lt;script setup&gt;` söz dizimini kullanacağız; çünkü Vue geliştiricileri arasında en yaygın kullanım biçimi budur.

SFC kullanmıyorsanız da Composition API'yi [`setup()`](/api/composition-api-setup) seçeneğiyle kullanabilirsiniz.
:::

### Neden Ref? \*\* {#why-refs}

Ref'leri, düz değişkenler yerine neden `.value` ile kullandığımızı merak ediyor olabilirsiniz. Bunu açıklamak için Vue'nun tepkisellik sisteminin nasıl çalıştığına kısaca bakalım.

Şablonda bir ref kullandığınızda ve sonrasında bu ref'in değerini değiştirdiğinizde Vue değişikliği otomatik olarak algılar ve DOM'u buna göre günceller. Bu, bağımlılık takibine dayalı tepkisellik sistemi sayesinde mümkündür. Bir bileşen ilk kez render edildiğinde Vue, render sırasında kullanılan her ref'i **izler**. Daha sonra bir ref değiştirildiğinde, onu izleyen bileşenler için yeniden render işlemini **tetikler**.

Standart JavaScript'te düz değişkenlere erişimi veya bunların değişimini doğrudan yakalamanın bir yolu yoktur. Ancak bir nesnenin özelliklerindeki get ve set işlemlerini getter ve setter yöntemleriyle yakalayabiliriz.

`.value` özelliği, bir ref'e ne zaman erişildiğini veya ne zaman değiştirildiğini algılama fırsatını Vue'ya verir. Arka planda Vue, getter içinde izleme yapar ve setter içinde tetikleme gerçekleştirir. Kavramsal olarak bir ref'i aşağıdaki gibi bir nesne olarak düşünebilirsiniz:

```js
// sözde kod, gerçek implementasyon değildir
const myRef = {
  _value: 0,
  get value() {
    track()
    return this._value
  },
  set value(newValue) {
    this._value = newValue
    trigger()
  }
}
```

Ref'lerin bir diğer güzel özelliği, düz değişkenlerin aksine ref'leri fonksiyonlara geçirirken en güncel değere erişimi ve tepkisellik bağlantısını koruyabilmenizdir. Bu özellik, karmaşık mantığı yeniden kullanılabilir koda dönüştürürken özellikle faydalıdır.

Tepkisellik sistemi, [Derinlemesine Tepkisellik](/guide/extras/reactivity-in-depth) bölümünde daha ayrıntılı ele alınır.

</div>

<div class="options-api">

## Yöntemleri Tanımlama \* {#declaring-methods}

<VueSchoolLink href="https://vueschool.io/lessons/methods-in-vue-3" title="Free Vue.js Methods Lesson"/>

Bir bileşen örneğine yöntem eklemek için `methods` seçeneğini kullanırız. Bu seçenek, istenen yöntemleri içeren bir nesne olmalıdır:

```js{7-11}
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  },
  mounted() {
    // yöntemler yaşam döngüsü kancalarında veya diğer yöntemlerde çağrılabilir!
    this.increment()
  }
}
```

Vue, `methods` içindeki `this` değerini otomatik olarak bağlar; böylece her zaman bileşen örneğini işaret eder. Bu sayede bir yöntem olay dinleyicisi veya callback olarak kullanıldığında doğru `this` değerini korur. `methods` tanımlarken ok fonksiyonları kullanmaktan kaçınmalısınız; çünkü bu, Vue'nun uygun `this` değerini bağlamasını engeller:

```js
export default {
  methods: {
    increment: () => {
      // KÖTÜ: burada `this` erişimi yok!
    }
  }
}
```

Bileşen örneğinin diğer tüm özellikleri gibi `methods` de bileşen şablonu içinden erişilebilir. Şablon içinde en yaygın olarak olay dinleyicisi olarak kullanılırlar:

```vue-html
<button @click="increment">{{ count }}</button>
```

[Playground'da Deneyin](https://play.vuejs.org/#eNplj9EKwyAMRX8l+LSx0e65uLL9hy+dZlTWqtg4BuK/z1baDgZicsPJgUR2d656B2QN45P02lErDH6c9QQKn10YCKIwAKqj7nAsPYBHCt6sCUDaYKiBS8lpLuk8/yNSb9XUrKg20uOIhnYXAPV6qhbF6fRvmOeodn6hfzwLKkx+vN5OyIFwdENHmBMAfwQia+AmBy1fV8E2gWBtjOUASInXBcxLvN4MLH0BCe1i4Q==)

Yukarıdaki örnekte `<button>` tıklandığında `increment` yöntemi çağrılır.

</div>

### Derin Tepkisellik {#deep-reactivity}

<div class="options-api">

Vue'da durum varsayılan olarak derin tepkiseldir. Bu, iç içe nesneleri veya dizileri değiştirdiğinizde bile değişikliklerin algılanacağı anlamına gelir:

```js
export default {
  data() {
    return {
      obj: {
        nested: { count: 0 },
        arr: ['foo', 'bar']
      }
    }
  },
  methods: {
    mutateDeeply() {
      // bunlar beklendiği gibi çalışır.
      this.obj.nested.count++
      this.obj.arr.push('baz')
    }
  }
}
```

</div>

<div class="composition-api">

Ref'ler, derin iç içe geçmiş nesneler, diziler veya `Map` gibi JavaScript'in yerleşik veri yapıları dahil olmak üzere her tür değeri tutabilir.

Bir ref, tuttuğu değeri derin tepkisel hale getirir. Bu, iç içe nesneleri veya dizileri değiştirdiğinizde bile değişikliklerin algılanacağı anlamına gelir:

```js
import { ref } from 'vue'

const obj = ref({
  nested: { count: 0 },
  arr: ['foo', 'bar']
})

function mutateDeeply() {
  // bunlar beklendiği gibi çalışır.
  obj.value.nested.count++
  obj.value.arr.push('baz')
}
```

İlkel olmayan değerler, aşağıda ele alınan [`reactive()`](#reactive) aracılığıyla tepkisel proxy'lere dönüştürülür.

[Sığ ref'ler](/api/reactivity-advanced#shallowref) ile derin tepkisellikten çıkmak da mümkündür. Sığ ref'lerde tepkisellik için yalnızca `.value` erişimi izlenir. Sığ ref'ler, büyük nesnelerin gözlemlenme maliyetinden kaçınarak performansı iyileştirmek veya iç durumun harici bir kütüphane tarafından yönetildiği durumlarda kullanılabilir.

Daha fazla bilgi:

- [Büyük Değiştirilemez Yapılar için Tepkisellik Yükünü Azaltma](/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures)
- [Harici Durum Sistemleri ile Entegrasyon](/guide/extras/reactivity-in-depth#integration-with-external-state-systems)

</div>

### DOM Güncelleme Zamanlaması {#dom-update-timing}

Tepkisel durumu değiştirdiğinizde DOM otomatik olarak güncellenir. Ancak DOM güncellemelerinin eşzamanlı uygulanmadığını unutmamak gerekir. Vue bunun yerine, yaptığınız durum değişikliği sayısı ne olursa olsun her bileşenin yalnızca bir kez güncellenmesini sağlamak için güncellemeleri güncelleme döngüsündeki "bir sonraki tik" anına kadar arabelleğe alır.

Bir durum değişikliğinden sonra DOM güncellemesinin tamamlanmasını beklemek için [nextTick()](/api/general#nexttick) global API'sini kullanabilirsiniz:

<div class="composition-api">

```js
import { nextTick } from 'vue'

async function increment() {
  count.value++
  await nextTick()
  // DOM artık güncellendi
}
```

</div>
<div class="options-api">

```js
import { nextTick } from 'vue'

export default {
  methods: {
    async increment() {
      this.count++
      await nextTick()
      // DOM artık güncellendi
    }
  }
}
```

</div>

<div class="composition-api">

## `reactive()` \*\* {#reactive}

Tepkisel durumu tanımlamanın bir başka yolu da `reactive()` API'sidir. İç değeri özel bir nesneyle saran ref'in aksine `reactive()`, nesnenin kendisini tepkisel hale getirir:

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

> Ayrıca bkz.: [Reactive Türleri](/guide/typescript/composition-api#typing-reactive) <sup class="vt-badge ts" />

Şablonda kullanım:

```vue-html
<button @click="state.count++">
  {{ state.count }}
</button>
```

[Tepkisel nesneler](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), normal nesneler gibi davranan JavaScript Proxy'leridir. Farkı, Vue'nun tepkiselliği izlemek ve tetiklemek için tepkisel bir nesnenin tüm özelliklerine erişim ve değişim işlemlerini yakalayabilmesidir.

`reactive()` nesneyi derinlemesine dönüştürür: iç içe nesneler de erişildiğinde `reactive()` ile sarılır. Ayrıca ref değeri bir nesne olduğunda `ref()` tarafından dahili olarak da çağrılır. Sığ ref'lere benzer şekilde, derin tepkisellikten çıkmak için [`shallowReactive()`](/api/reactivity-advanced#shallowreactive) API'si de vardır.

### Tepkisel Proxy ve Orijinali \*\* {#reactive-proxy-vs-original-1}

`reactive()` fonksiyonundan dönen değerin, özgün nesnenin bir [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) örneği olduğunu ve özgün nesneye eşit olmadığını bilmek önemlidir:

```js
const raw = {}
const proxy = reactive(raw)

// proxy, özgün nesneye eşit DEĞİLDİR.
console.log(proxy === raw) // false
```

Yalnızca proxy tepkiseldir; özgün nesneyi değiştirmeniz güncellemeleri tetiklemez. Bu nedenle Vue'nun tepkisellik sistemiyle çalışırken en iyi yaklaşım, **durumunuzun yalnızca proxy sürümlerini kullanmaktır**.

Proxy'ye tutarlı erişim sağlamak için, aynı nesnede `reactive()` çağrıldığında her zaman aynı proxy döner; mevcut bir proxy üzerinde `reactive()` çağrıldığında da yine aynı proxy döner:

```js
// aynı nesne üzerinde reactive() çağrısı aynı proxy'yi döndürür
console.log(reactive(raw) === proxy) // true

// bir proxy üzerinde reactive() çağrısı kendisini döndürür
console.log(reactive(proxy) === proxy) // true
```

Bu kural iç içe nesneler için de geçerlidir. Derin tepkisellik nedeniyle tepkisel bir nesnenin içindeki iç nesneler de proxy'dir:

```js
const proxy = reactive({})

const raw = {}
proxy.nested = raw

console.log(proxy.nested === raw) // false
```

### `reactive()` Sınırlamaları \*\* {#limitations-of-reactive}

`reactive()` API'sinin bazı sınırlamaları vardır:

1. **Sınırlı değer türleri:** yalnızca nesne türlerinde çalışır (nesneler, diziler ve `Map`, `Set` gibi [koleksiyon türleri](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections)). `string`, `number`, `boolean` gibi [ilkel türleri](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) tutamaz.

2. **Nesnenin tamamı değiştirilemez:** Vue'nun tepkisellik takibi özellik erişimi üzerinden çalıştığı için tepkisel nesne için aynı referansı korumamız gerekir. Bu, ilk referansla kurulan tepkisellik bağlantısı kaybolacağı için tepkisel bir nesneyi kolayca "değiştiremeyeceğimiz" anlamına gelir:

   ```js
   let state = reactive({ count: 0 })
   ```

// yukarıdaki referans ({ count: 0 }) artık izlenmez
// (tepkisellik bağlantısı kayboldu!)
state = reactive({ count: 1 })

````

3. **Yapı bozuma uygun değildir:** tepkisel bir nesnenin ilkel türdeki özelliğini yerel değişkenlere yapı bozumu ile ayırdığımızda veya bu özelliği bir fonksiyona geçirdiğimizde tepkisellik bağlantısını kaybederiz:

```js
const state = reactive({ count: 0 })

// yapı bozumu yapıldığında count, state.count ile bağlantısını kaybeder.
let { count } = state
// orijinal durumu etkilemez
count++

// fonksiyon düz bir sayı alır ve
// state.count üzerindeki değişiklikleri izleyemez
// tepkiselliği korumak için nesnenin tamamını geçmeliyiz
callSomeFunction(state.count)
````

Bu sınırlamalar nedeniyle tepkisel durum tanımlamak için birincil API olarak `ref()` kullanmanızı öneririz.

## Ref Açma Hakkında Ek Ayrıntılar \*\* {#additional-ref-unwrapping-details}

### Tepkisel Nesne Özelliği Olarak \*\* {#ref-unwrapping-as-reactive-object-property}

Bir ref, tepkisel bir nesnenin özelliği olarak erişildiğinde veya değiştirildiğinde otomatik olarak açılır. Başka bir deyişle normal bir özellik gibi davranır:

```js
const count = ref(0)
const state = reactive({
  count
})

console.log(state.count) // 0

state.count = 1
console.log(count.value) // 1
```

Mevcut bir ref'e bağlı özelliğe yeni bir ref atanırsa eskisinin yerini alır:

```js
const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2
// özgün ref artık state.count ile bağlantılı değil
console.log(count.value) // 1
```

Ref açma işlemi yalnızca derin tepkisel bir nesnenin içine gömülü olduğunda gerçekleşir. [Sığ tepkisel bir nesnenin](/api/reactivity-advanced#shallowreactive) özelliği olarak erişildiğinde uygulanmaz.

### Diziler ve Koleksiyonlarda Dikkat Edilecek Nokta \*\* {#caveat-in-arrays-and-collections}

Tepkisel nesnelerden farklı olarak ref, tepkisel bir dizinin elemanı veya `Map` gibi yerel bir koleksiyon türünün öğesi olarak erişildiğinde **açılmaz**:

```js
const books = reactive([ref('Vue 3 Guide')])
// burada .value gerekir
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// burada .value gerekir
console.log(map.get('count').value)
```

### Şablonlarda Açma Sırasında Dikkat Edilecek Nokta \*\* {#caveat-when-unwrapping-in-templates}

Şablonlarda ref açma yalnızca ref, şablon render bağlamında üst düzey bir özellikse uygulanır.

Aşağıdaki örnekte `count` ve `object` üst düzey özelliklerdir, ancak `object.id` üst düzey değildir:

```js
const count = ref(0)
const object = { id: ref(1) }
```

Bu nedenle aşağıdaki ifade beklendiği gibi çalışır:

```vue-html
{{ count + 1 }}
```

...ancak aşağıdaki ifade **çalışmaz**:

```vue-html
{{ object.id + 1 }}
```

Render sonucu `[object Object]1` olur; çünkü ifade değerlendirilirken `object.id` açılmaz ve ref nesnesi olarak kalır. Bunu düzeltmek için `id` değerini üst düzey bir özellik olacak şekilde yapı bozumu ile ayırabiliriz:

```js
const { id } = object
```

```vue-html
{{ id + 1 }}
```

Artık render sonucu `2` olacaktır.

Dikkat edilmesi gereken bir diğer nokta da şudur: Bir ref, metin enterpolasyonunda (yani <code v-pre>{{ }}</code> etiketinde) son değerlendirilen değer olduğunda gerçekten açılır. Bu yüzden aşağıdaki örnek `1` olarak render edilir:

```vue-html
{{ object.id }}
```

Bu yalnızca metin enterpolasyonunun sağladığı bir kullanım kolaylığıdır ve <code v-pre>{{ object.id.value }}</code> ile eşdeğerdir.

</div>

<div class="options-api">

### Durum Tutan Yöntemler \* {#stateful-methods}

Bazı durumlarda bir yöntemi dinamik olarak oluşturmamız gerekebilir. Örneğin debounce edilmiş bir olay işleyici oluşturmak gibi:

```js
import { debounce } from 'lodash-es'

export default {
  methods: {
    // Lodash ile debounce
    click: debounce(function () {
      // ... tıklamaya yanıt ver ...
    }, 500)
  }
}
```

Ancak bu yaklaşım, yeniden kullanılan bileşenlerde sorun çıkarabilir. Çünkü debounce edilmiş bir fonksiyon **durum tutar**: geçen zamana ilişkin bazı iç durum bilgilerini korur. Birden fazla bileşen örneği aynı debounce fonksiyonunu paylaşıyorsa birbirini olumsuz etkileyebilir.

Her bileşen örneğinin debounce fonksiyonunu diğerlerinden bağımsız tutmak için debounce edilmiş sürümünü `created` yaşam döngüsü kancasında oluşturabiliriz:

```js
export default {
  created() {
    // artık her örneğin kendine ait bir debounce işleyicisi var
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // bileşen kaldırıldığında zamanlayıcıyı
    // iptal etmek de iyi bir fikirdir
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... tıklamaya yanıt ver ...
    }
  }
}
```

</div>
