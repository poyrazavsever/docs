# Şablon Referansları {#template-refs}

Vue’nun bildirimsel render modeli, doğrudan DOM işlemlerinin büyük kısmını sizin için soyutlar. Ancak bazı durumlarda alttaki DOM öğelerine doğrudan erişmemiz gerekebilir. Bunu sağlamak için özel `ref` niteliğini kullanabiliriz:

```vue-html
<input ref="input">
```

`ref`, `v-for` bölümünde ele alınan `key` niteliğine benzer özel bir niteliktir. Belirli bir DOM öğesine veya alt bileşen örneğine, mount edildikten sonra doğrudan referans almamızı sağlar. Bu özellik, örneğin bir bileşen mount edildiğinde bir input öğesine programatik olarak odaklanmak veya bir öğe üzerinde üçüncü taraf bir kütüphaneyi başlatmak istediğiniz durumlarda faydalı olabilir.

## Referanslara Erişim {#accessing-the-refs}

<div class="composition-api">

Composition API ile referansı elde etmek için [`useTemplateRef()`](/api/composition-api-helpers#usetemplateref) <sup class="vt-badge" data-text="3.5+" /> yardımcı fonksiyonunu kullanabiliriz:

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'

// ilk argüman, şablondaki ref değeriyle eşleşmelidir
const input = useTemplateRef('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```

TypeScript kullanırken Vue'nun IDE desteği ve `vue-tsc`, eşleşen `ref` niteliğinin hangi öğe veya bileşen üzerinde kullanıldığına bağlı olarak `input.value` türünü otomatik olarak çıkarır.

<details>
<summary>3.5 öncesi kullanım</summary>

`useTemplateRef()` fonksiyonunun henüz sunulmadığı 3.5 öncesi sürümlerde, adı şablondaki ref niteliğinin değeriyle eşleşen bir ref tanımlamamız gerekir:

```vue
<script setup>
import { ref, onMounted } from 'vue'

// öğe referansını tutacak bir ref tanımlayın
// ad, şablondaki ref değeriyle eşleşmelidir
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

`<script setup>` kullanmıyorsanız, ref'i `setup()` içinden de döndürdüğünüzden emin olun:

```js{6}
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
```

</details>

</div>
<div class="options-api">

Elde edilen ref, `this.$refs` üzerinden erişilebilir olur:

```vue
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>

<template>
  <input ref="input" />
</template>
```

</div>

Ref'e yalnızca **bileşen mount edildikten sonra** erişebileceğinizi unutmayın. <span class="options-api">`$refs.input`</span><span class="composition-api">`input`</span> değerine bir şablon ifadesi içinde erişmeye çalışırsanız, ilk render sırasında <span class="options-api">`undefined`</span><span class="composition-api">`null`</span> olur. Bunun nedeni, öğenin ilk render tamamlanana kadar var olmamasıdır.

<div class="composition-api">

Bir şablon ref'inin değişimlerini izlemeye çalışıyorsanız, ref'in `null` olduğu durumu da hesaba kattığınızdan emin olun:

```js
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // henüz mount edilmedi veya öğe unmount edildi (ör. v-if nedeniyle)
  }
})
```

Ayrıca bkz.: [Şablon Referanslarını Türleme](/guide/typescript/composition-api#typing-template-refs) <sup class="vt-badge ts" />

</div>

## Bileşen Üzerinde Ref {#ref-on-component}

> Bu bölüm, [Bileşenler](/guide/essentials/component-basics) hakkında bilgi sahibi olduğunuzu varsayar. İsterseniz bu bölümü şimdilik atlayıp daha sonra geri dönebilirsiniz.

`ref`, bir alt bileşen üzerinde de kullanılabilir. Bu durumda referans, bileşen örneğine ait olur:

<div class="composition-api">

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'
import Child from './Child.vue'

const childRef = useTemplateRef('child')

onMounted(() => {
  // childRef.value, <Child /> örneğini tutacaktır
})
</script>

<template>
  <Child ref="child" />
</template>
```

<details>
<summary>3.5 öncesi kullanım</summary>

```vue
<script setup>
import { ref, onMounted } from 'vue'
import Child from './Child.vue'

const child = ref(null)

onMounted(() => {
  // child.value, <Child /> örneğini tutacaktır
})
</script>

<template>
  <Child ref="child" />
</template>
```

</details>

</div>
<div class="options-api">

```vue
<script>
import Child from './Child.vue'

export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child, <Child /> örneğini tutacaktır
  }
}
</script>

<template>
  <Child ref="child" />
</template>
```

</div>

<span class="composition-api">Alt bileşen Options API kullanıyorsa veya `<script setup>` kullanmıyorsa, referans verilen örnek</span><span class="options-api">Referans verilen örnek</span> alt bileşenin `this` değeriyle aynı olacaktır. Bu da üst bileşenin, alt bileşenin tüm özellik ve metodlarına tam erişimi olacağı anlamına gelir. Bu durum, üst ve alt bileşenin uygulama ayrıntıları arasında sıkı bağlantılar oluşturabilir. Bu nedenle bileşen ref'leri yalnızca gerçekten gerektiğinde kullanılmalıdır. Çoğu durumda önce standart props ve emit arayüzleriyle üst / alt bileşen etkileşimlerini kurmayı denemelisiniz.

<div class="composition-api">

Buradaki istisna, `<script setup>` kullanan bileşenlerin varsayılan olarak **gizli** olmasıdır: `<script setup>` kullanan bir alt bileşene referans veren üst bileşen, alt bileşen `defineExpose` makrosunu kullanarak genel bir arayüz sunmayı seçmediği sürece hiçbir şeye erişemez:

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

// defineExpose gibi derleyici makrolarının import edilmesi gerekmez
defineExpose({
  a,
  b
})
</script>
```

Üst bileşen, şablon referansları aracılığıyla bu bileşenin bir örneğini aldığında elde edilen örnek `{ a: number, b: number }` biçiminde olur (`ref`'ler, normal örneklerde olduğu gibi otomatik olarak açılır).

`defineExpose`, herhangi bir `await` işleminden önce çağrılmalıdır. Aksi takdirde `await` işleminden sonra dışarıya açılan özellikler ve metodlara erişilemez.

Ayrıca bkz.: [Bileşen Şablon Referanslarını Türleme](/guide/typescript/composition-api#typing-component-template-refs) <sup class="vt-badge ts" />

</div>
<div class="options-api">

`expose` seçeneği, bir alt bileşen örneğine erişimi sınırlandırmak için kullanılabilir:

```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```

Yukarıdaki örnekte, bu bileşene şablon ref'i ile referans veren bir üst bileşen yalnızca `publicData` ve `publicMethod` alanlarına erişebilir.

</div>

## `v-for` İçindeki Ref'ler {#refs-inside-v-for}

> v3.5 veya üzerini gerektirir

<div class="composition-api">

`ref`, `v-for` içinde kullanıldığında ilgili ref bir dizi değeri içermelidir. Bu dizi, mount işleminden sonra ilgili öğelerle doldurulur:

```vue
<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = useTemplateRef('items')

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Playground'da deneyin](https://play.vuejs.org/#eNp9UsluwjAQ/ZWRLwQpDepyQoDUIg6t1EWUW91DFAZq6tiWF4oU5d87dtgqVRyyzLw3b+aN3bB7Y4ptQDZkI1dZYTw49MFMuBK10dZDAxZXOQSHC6yNLD3OY6zVsw7K4xJaWFldQ49UelxxVWnlPEhBr3GszT6uc7jJ4fazf4KFx5p0HFH+Kme9CLle4h6bZFkfxhNouAIoJVqfHQSKbSkDFnVpMhEpovC481NNVcr3SaWlZzTovJErCqgydaMIYBRk+tKfFLC9Wmk75iyqg1DJBWfRxT7pONvTAZom2YC23QsMpOg0B0l0NDh2YjnzjpyvxLrYOK1o3ckLZ5WujSBHr8YL2gxnw85lxEop9c9TynkbMD/kqy+svv/Jb9wu5jh7s+jQbpGzI+ZLu0byEuHZ+wvt6Ays9TJIYl8A5+i0DHHGjvYQ1JLGPuOlaR/TpRFqvXCzHR2BO5iKg0Zmm/ic0W2ZXrB+Gve2uEt1dJKs/QXbwePE)

<details>
<summary>3.5 öncesi kullanım</summary>

`useTemplateRef()` fonksiyonunun henüz sunulmadığı 3.5 öncesi sürümlerde, adı şablondaki ref niteliğinin değeriyle eşleşen bir ref tanımlamamız gerekir. Bu ref ayrıca bir dizi değeri de içermelidir:

```vue
<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
  /* ... */
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
```

</details>

</div>
<div class="options-api">

`ref`, `v-for` içinde kullanıldığında, elde edilen ref değeri ilgili öğeleri içeren bir dizi olur:

```vue
<script>
export default {
  data() {
    return {
      list: [
        /* ... */
      ]
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>

<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```

[Playground'da deneyin](https://play.vuejs.org/#eNpFjk0KwjAQha/yCC4Uaou6kyp4DuOi2KkGYhKSiQildzdNa4WQmTc/37xeXJwr35HEUdTh7pXjszT0cdYzWuqaqBm9NEDbcLPeTDngiaM3PwVoFfiI667AvsDhNpWHMQzF+L9sNEztH3C3JlhNpbaPNT9VKFeeulAqplfY5D1p0qurxVQSqel0w5QUUEedY8q0wnvbWX+SYgRAmWxIiuSzm4tBinkc6HvkuSE7TIBKq4lZZWhdLZfE8AWp4l3T)

</div>

Ref dizisinin, kaynak diziyle **aynı sırayı garanti etmediğini** unutmayın.

## Fonksiyon Ref'leri {#function-refs}

Bir string anahtar yerine `ref` niteliği bir fonksiyona da bağlanabilir. Bu fonksiyon her bileşen güncellemesinde çağrılır ve referansı nasıl saklayacağınız konusunda tam esneklik sağlar. Fonksiyon, ilk argüman olarak öğe referansını alır:

```vue-html
<input :ref="(el) => { /* assign el to a property or ref */ }">
```

Burada, ref adı olarak bir string yerine fonksiyon geçirebilmek için dinamik `:ref` bağlaması kullandığımıza dikkat edin. Öğe unmount edildiğinde argüman `null` olur. Elbette satır içi bir fonksiyon yerine bir metot da kullanabilirsiniz.
