# Durum Yönetimi {#state-management}

## Durum Yönetimi Nedir? {#what-is-state-management}

Teknik olarak her Vue bileşen örneği, kendi tepkisel durumunu "yönetir". Örnek olarak basit bir sayaç bileşenini ele alalım:

<div class="composition-api">

```vue
<script setup>
import { ref } from 'vue'

// state
const count = ref(0)

// actions
function increment() {
  count.value++
}
</script>

<!-- view -->
<template>{{ count }}</template>
```

</div>
<div class="options-api">

```vue
<script>
export default {
  // state
  data() {
    return {
      count: 0
    }
  },
  // actions
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- view -->
<template>{{ count }}</template>
```

</div>

Aşağıdaki parçalardan oluşan kendi kendine yeten bir birimdir:

- **Durum (state)**, uygulamamızı yöneten tek doğruluk kaynağıdır;
- **Görünüm (view)**, **durumun** bildirimsel bir yansımasıdır;
- **Eylemler (actions)**, **görünümden** gelen kullanıcı girdilerine tepki olarak durumun değişebileceği olası yollardır.

Bu, "tek yönlü veri akışı" kavramının basit bir temsilidir:

<p style="text-align: center">
  <img alt="durum akışı diyagramı" src="./images/state-flow.png" width="252px" style="margin: 40px auto">
</p>

Ancak **ortak bir durumu paylaşan birden fazla bileşen** olduğunda bu sadelik bozulmaya başlar:

1. Birden fazla görünüm aynı durum parçasına bağımlı olabilir.
2. Farklı görünümlerden gelen eylemler aynı durum parçasını değiştirmek zorunda kalabilir.

İlk durum için olası bir geçici çözüm, paylaşılan durumu ortak bir üst bileşene "yukarı taşımak" ve ardından props olarak aşağı aktarmaktır. Ancak bu, derin hiyerarşilere sahip bileşen ağaçlarında hızla zahmetli hâle gelir ve [Prop Drilling](/guide/components/provide-inject#prop-drilling) olarak bilinen başka bir soruna yol açar.

İkinci durum için ise sıklıkla şablon referansları (template refs) aracılığıyla doğrudan üst/alt bileşen örneklerine erişme veya yayılan olaylar (emit) ile durumun birden fazla kopyasını değiştirip senkronize etmeye çalışma gibi çözümlere başvurduğumuzu görürüz. Bu kalıpların ikisi de kırılgandır ve hızla bakımı zor bir koda yol açar.

Daha sade ve doğrudan bir çözüm, paylaşılan durumu bileşenlerin dışına çıkarıp global bir singleton içinde yönetmektir. Böylece bileşen ağacımız büyük bir "görünüm" hâline gelir ve ağaçta nerede olursa olsun herhangi bir bileşen duruma erişebilir veya eylemleri tetikleyebilir!

## Reactivity API ile Basit Durum Yönetimi {#simple-state-management-with-reactivity-api}

<div class="options-api">

Options API'de tepkisel veri, `data()` seçeneği kullanılarak tanımlanır. İçeride, `data()` tarafından döndürülen nesne, herkese açık API olarak da kullanılabilen [`reactive()`](/api/reactivity-core#reactive) fonksiyonu aracılığıyla tepkisel hâle getirilir.

</div>

Birden fazla örnek tarafından paylaşılması gereken bir durum parçanız varsa, tepkisel bir nesne oluşturmak için [`reactive()`](/api/reactivity-core#reactive) kullanabilir ve ardından bunu birden fazla bileşene içe aktarabilirsiniz:

```js [store.js]
import { reactive } from 'vue'

export const store = reactive({
  count: 0
})
```

<div class="composition-api">

```vue [ComponentA.vue]
<script setup>
import { store } from './store.js'
</script>

<template>From A: {{ store.count }}</template>
```

```vue [ComponentB.vue]
<script setup>
import { store } from './store.js'
</script>

<template>From B: {{ store.count }}</template>
```

</div>
<div class="options-api">

```vue [ComponentA.vue]
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>From A: {{ store.count }}</template>
```

```vue [ComponentB.vue]
<script>
import { store } from './store.js'

export default {
  data() {
    return {
      store
    }
  }
}
</script>

<template>From B: {{ store.count }}</template>
```

</div>

Artık `store` nesnesi her değiştirildiğinde hem `<ComponentA>` hem de `<ComponentB>` görünümlerini otomatik olarak günceller; artık tek bir doğruluk kaynağımız var.

Ancak bu aynı zamanda `store`'u içe aktaran herhangi bir bileşenin onu istediği gibi değiştirebileceği anlamına da gelir:

```vue-html{2}
<template>
  <button @click="store.count++">
    From B: {{ store.count }}
  </button>
</template>
```

Bu basit durumlarda işe yarasa da, herhangi bir bileşen tarafından gelişigüzel değiştirilebilen global durum uzun vadede çok sürdürülebilir olmayacaktır. Durumu değiştiren mantığın, durumun kendisi gibi merkezi olduğundan emin olmak için store üzerinde eylemlerin niyetini ifade eden adlara sahip metotlar tanımlanması önerilir:

```js{5-7} [store.js]
import { reactive } from 'vue'

export const store = reactive({
  count: 0,
  increment() {
    this.count++
  }
})
```

```vue-html{2}
<template>
  <button @click="store.increment()">
    From B: {{ store.count }}
  </button>
</template>
```

<div class="composition-api">

[Playground'da deneyin](https://play.vuejs.org/#eNrNkk1uwyAQha8yYpNEiUzXllPVrtRTeJNSqtLGgGBsVbK4ewdwnT9FWWSTFczwmPc+xMhqa4uhl6xklRdOWQQvsbfPrVadNQ7h1dCqpcYaPp3pYFHwQyteXVxKm0tpM0krnm3IgAqUnd3vUFIFUB1Z8bNOkzoVny+wDTuNcZ1gBI/GSQhzqlQX3/5Gng81pA1t33tEo+FF7JX42bYsT1BaONlRguWqZZMU4C261CWMk3EhTK8RQphm8Twse/BscoUsvdqDkTX3kP3nI6aZwcmdQDUcMPJPabX8TQphtCf0RLqd1csxuqQAJTxtYnEUGtIpAH4pn1Ou17FDScOKhT+QNAVM)

</div>
<div class="options-api">

[Playground'da deneyin](https://play.vuejs.org/#eNrdU8FqhDAU/JVHLruyi+lZ3FIt9Cu82JilaTWR5CkF8d8bE5O1u1so9FYQzAyTvJnRTKTo+3QcOMlIbpgWPT5WUnS90gjPyr4ll1jAWasOdim9UMum3a20vJWWqxSgkvzTyRt+rocWYVpYFoQm8wRsJh+viHLBcyXtk9No2ALkXd/WyC0CyDfW6RVTOiancQM5ku+x7nUxgUGlOcwxn8Ppu7HJ7udqaqz3SYikOQ5aBgT+OA9slt9kasToFnb5OiAqCU+sFezjVBHvRUimeWdT7JOKrFKAl8VvYatdI6RMDRJhdlPtWdQf5mdQP+SHdtyX/IftlH9pJyS1vcQ2NK8ZivFSiL8BsQmmpMG1s1NU79frYA1k8OD+/I3pUA6+CeNdHg6hmoTMX9pPSnk=)

</div>

:::tip
Tıklama işleyicisinin `store.increment()` çağrısını parantezlerle kullandığına dikkat edin; bu, metot bir bileşen metodu olmadığı için onu doğru `this` bağlamıyla çağırmak adına gereklidir.
:::

Burada store olarak tek bir tepkisel nesne kullanıyor olsak da, `ref()` veya `computed()` gibi diğer [Reactivity API'leri](/api/reactivity-core) ile oluşturulan tepkisel durumu da paylaşabilir, hatta global durumu bir [Composable](/guide/reusability/composables) içinden döndürebilirsiniz:

```js
import { ref } from 'vue'

// global state, created in module scope
const globalCount = ref(1)

export function useCount() {
  // local state, created per-component
  const localCount = ref(1)

  return {
    globalCount,
    localCount
  }
}
```

Vue'nun tepkisellik sisteminin bileşen modelinden ayrılmış olması onu son derece esnek kılar.

## SSR ile İlgili Dikkat Edilmesi Gerekenler {#ssr-considerations}

[Sunucu Tarafında Render (SSR)](./ssr) kullanan bir uygulama geliştiriyorsanız, yukarıdaki kalıp store'un birden fazla istek arasında paylaşılan bir singleton olması nedeniyle sorunlara yol açabilir. Bu konu SSR rehberinde [daha ayrıntılı](./ssr#cross-request-state-pollution) olarak ele alınır.

## Pinia {#pinia}

Kendi yazdığımız durum yönetimi çözümü basit senaryolarda yeterli olsa da, büyük ölçekli üretim uygulamalarında dikkate alınması gereken çok daha fazla şey vardır:

- Ekip iş birliği için daha güçlü kurallar
- Zaman çizelgesi, bileşen içi inceleme ve zamanda yolculuk hata ayıklaması dahil Vue DevTools ile entegrasyon
- Hot Module Replacement
- Sunucu Tarafında Render desteği

[Pinia](https://pinia.vuejs.org), yukarıdakilerin tümünü uygulayan bir durum yönetimi kütüphanesidir. Vue çekirdek ekibi tarafından sürdürülür ve hem Vue 2 hem de Vue 3 ile çalışır.

Mevcut kullanıcılar, Vue'nun önceki resmi durum yönetimi kütüphanesi olan [Vuex](https://vuex.vuejs.org/) ile aşina olabilir. Pinia ekosistemde aynı rolü üstlendiği için Vuex artık bakım modundadır. Hâlâ çalışır, ancak artık yeni özellikler almayacaktır. Yeni uygulamalar için Pinia kullanılması önerilir.

Pinia, Vuex'in bir sonraki yinelemesinin nasıl görünebileceğini araştıran bir çalışma olarak başladı ve Vuex 5 için çekirdek ekip tartışmalarındaki birçok fikri içine aldı. Sonunda Pinia'nın Vuex 5'te istediğimiz şeylerin çoğunu uyguladığını fark ettik ve bunun yerine onu yeni öneri hâline getirmeye karar verdik.

Vuex ile karşılaştırıldığında Pinia, daha az kod kalabalığına (boilerplate) sahip daha sade bir API sunar, Composition API tarzı API'ler sağlar ve en önemlisi TypeScript ile kullanıldığında güçlü tür çıkarımı desteğine sahiptir.
