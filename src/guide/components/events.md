<script setup>
import { onMounted } from 'vue'

if (typeof window !== 'undefined') {
  const hash = window.location.hash

  // The docs for v-model used to be part of this page. Attempt to redirect outdated links.
  if ([
    '#usage-with-v-model',
    '#v-model-arguments',
    '#multiple-v-model-bindings',
    '#handling-v-model-modifiers'
  ].includes(hash)) {
    onMounted(() => {
      window.location = './v-model.html' + hash
    })
  }
}
</script>

# Bileşen Olayları {#component-events}

> Bu sayfa, [Bileşenlerin Temelleri](/guide/essentials/component-basics)'ni okuduğunuzu varsayar. Bileşenlere yeniyseniz, önce bunu okuyun.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/defining-custom-events-emits" title="Ücretsiz Vue.js Özel Olay Tanımlama Dersi"/>
</div>

## Olayları Tetikleme ve Dinleme {#emitting-and-listening-to-events}

Bir bileşen, yerleşik `$emit` fonksiyonunu kullanarak özel olayları doğrudan template (şablon) ifadeleri içinde (örneğin bir `v-on` işleyicisinde) tetikleyebilir:

```vue-html
<!-- MyComponent -->
<button @click="$emit('someEvent')">Click Me</button>
```

<div class="options-api">

`$emit()` fonksiyonu, bileşen örneğinde `this.$emit()` olarak da kullanılabilir:

```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```

</div>

Üst bileşen daha sonra bunu `v-on` kullanarak dinleyebilir:

```vue-html
<MyComponent @some-event="callback" />
```

`.once` değiştiricisi, bileşen olay dinleyicilerinde de desteklenir:

```vue-html
<MyComponent @some-event.once="callback" />
```

Bileşenlerde ve props’larda olduğu gibi, olay adları da otomatik bir büyük/küçük harf dönüşümü sağlar. Dikkat ederseniz, camelCase ile yazılmış bir olay tetikledik; ancak üst bileşende bunu kebab-case ile yazılmış bir dinleyici ile dinleyebiliyoruz. [Props İsimlendirme Stili](/guide/components/props#prop-name-casing)'nde olduğu gibi, template’lerde (şablonlarda) kebab-case olay dinleyicileri kullanmanızı öneririz.

:::tip İpucu
Yerleşik DOM olaylarının aksine, bileşen tarafından tetiklenen olaylar **yukarı doğru yayılmaz (bubble olmaz)**. Yalnızca doğrudan alt bileşen tarafından tetiklenen olayları dinleyebilirsiniz. Aynı seviyedeki veya derin şekilde iç içe geçmiş bileşenler arasında iletişim gerekiyorsa, harici bir event bus ya da [küresel durum yönetimi çözümü](/guide/scaling-up/state-management) kullanın.
:::

## Olay Argümanları {#event-arguments}

Bazen bir olayla birlikte belirli bir değeri iletmek faydalı olabilir. Örneğin, `<BlogPost>` bileşeninin metni ne kadar büyüteceğini kendisinin belirlemesini isteyebiliriz. Bu gibi durumlarda, bu değeri iletmek için `$emit` fonksiyonuna ek argümanlar ekleyebiliriz:

```vue-html
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```

Ardından, üst bileşende olayı dinlerken, dinleyici olarak satır içi bir ok fonksiyonu kullanabiliriz; bu sayede olay argümanına erişebiliriz:

```vue-html
<MyButton @increase-by="(n) => count += n" />
```

Ya da olay işleyicisi bir fonksiyonsa:

```vue-html
<MyButton @increase-by="increaseCount" />
```

Bu durumda değer, ilgili fonksiyonun ilk parametresi olarak iletilir:

<div class="options-api">

```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```

</div>
<div class="composition-api">

```js
function increaseCount(n) {
  count.value += n
}
```

</div>

:::tip İpucu
Olay adından sonra `$emit()` fonksiyonuna eklenen tüm ek argümanlar dinleyiciye iletilir. Örneğin, `$emit('foo', 1, 2, 3)` kullanıldığında dinleyici fonksiyonu üç argüman alır.
:::

## Tetiklenen Olayların Bildirilmesi {#declaring-emitted-events}

Bir bileşen, tetikleyeceği olayları açıkça <span class="composition-api">[`defineEmits()`](/api/sfc-script-setup#defineprops-defineemits) makrosunu</span><span class="options-api">[`emits`](/api/options-state#emits) seçeneğini</span> kullanarak bildirebilir:

<div class="composition-api">

```vue
<script setup>
defineEmits(['inFocus', 'submit'])
</script>
```

`<template>` içinde kullandığımız `$emit` fonksiyonu, bir bileşenin `<script setup>` bölümünde doğrudan erişilebilir değildir; ancak `defineEmits()` bunun yerine kullanabileceğimiz eşdeğer bir fonksiyon döndürür:

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

`defineEmits()` makrosu bir fonksiyon içinde **kullanılamaz**; yukarıdaki örnekte olduğu gibi doğrudan `<script setup>` içinde yer almalıdır.

Eğer `<script setup>` yerine açık bir `setup` fonksiyonu kullanıyorsanız, olaylar [`emits`](/api/options-state#emits) seçeneği ile bildirilmelidir ve `emit` fonksiyonu `setup()` bağlamı üzerinden erişilebilir:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

`setup()` bağlamındaki diğer özelliklerde olduğu gibi, `emit` güvenli bir şekilde ayrıştırılabilir:

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

</div>
<div class="options-api">

```js
export default {
  emits: ['inFocus', 'submit']
}
```

</div>

`emits` seçeneği ve `defineEmits()` makrosu ayrıca nesne söz dizimini de destekler. TypeScript kullanıyorsanız, argümanlara tip atayabilirsiniz; bu da tetiklenen olayların payload’ı için çalışma zamanında doğrulama yapmamıza olanak tanır:

<div class="composition-api">

```vue
<script setup lang="ts">
const emit = defineEmits({
  submit(payload: { email: string, password: string }) {
    // doğrulamanın başarılı / başarısız olduğunu
    // belirtmek için `true` veya `false` döndürülür
  }
})
</script>
```

Eğer `<script setup>` ile TypeScript kullanıyorsanız, tetiklenen olayları yalnızca tip tanımlamaları kullanarak da bildirebilirsiniz:

```vue
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

Daha fazla detay: [Bileşen Emit’lerinin Tiplenmesi](/guide/typescript/composition-api#typing-component-emits) <sup class="vt-badge ts" />

</div>
<div class="options-api">

```js
export default {
  emits: {
    submit(payload: { email: string, password: string }) {
      // doğrulamanın başarılı / başarısız olduğunu
      // belirtmek için `true` veya `false` döndürülür
    }
  }
}
```

Ayrıca göz atın: [Bileşen Emit’lerinin Tiplenmesi](/guide/typescript/options-api#typing-component-emits) <sup class="vt-badge ts" />

</div>

Her ne kadar zorunlu olmasa da, bir bileşenin nasıl çalışması gerektiğini daha iyi belgelemek için tüm tetiklenen olayların tanımlanması önerilir. Ayrıca Vue’nün, bilinen dinleyicileri [aktarılacak öznitelikler (fallthrough attributes)](/guide/components/attrs#v-on-listener-inheritance) kapsamından hariç tutmasını sağlar ve böylece üçüncü parti kodlar tarafından manuel olarak tetiklenen DOM olaylarının neden olabileceği uç durumları önler.

:::tip İpucu
Eğer `emits` seçeneğinde yerleşik bir olay (örneğin `click`) tanımlanmışsa, dinleyici artık yalnızca bileşen tarafından tetiklenen `click` olaylarını dinler ve yerleşik `click` olaylarına yanıt vermez.
:::

## Olay Doğrulama {#events-validation}

Prop tip doğrulamasında olduğu gibi, bir tetiklenen olay da dizi söz dizimi yerine nesne söz dizimi ile tanımlandığında doğrulanabilir.

Doğrulama eklemek için olaya, <span class="options-api">`this.$emit`</span><span class="composition-api">`emit`</span> çağrısına eklenen argümanları alan ve olayın geçerli olup olmadığını belirtmek için bir boolean değer döndüren bir fonksiyon atanır.

<div class="composition-api">

```vue
<script setup>
const emit = defineEmits({
  // Doğrulama yok
  click: null,

  // submit olayının doğrulanması
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

</div>
<div class="options-api">

```js
export default {
  emits: {
    // Doğrulama yok
    click: null,

    // submit olayının doğrulanması
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```

</div>
