# Props {#props}

> Bu sayfa, [Bileşenlerin Temelleri](/guide/essentials/component-basics)'ni okuduğunuzu varsayar. Bileşenlere yeniyseniz, önce bunu okuyun.

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-3-reusable-components-with-props" title="Ücretsiz Vue.js Props Dersi"/>
</div>

## Props Tanımlama {#props-declaration}

Vue bileşenleri, bileşene iletilen dış özelliklerden (props) hangilerinin aktarılacak öznitelikler (fallthrough attributes) olarak ele alınacağını Vue’nün bilmesi için açık bir props tanımlaması gerektirir (bu konu [kendi bölümünde](/guide/components/attrs) ele alınacaktır).

<div class="composition-api">

`<script setup>` kullanan SFC'lerde (Tek Dosyalı Bileşenlerde), props `defineProps()` makrosu kullanılarak tanımlanabilir:

```vue
<script setup>
const props = defineProps(['foo'])

console.log(props.foo)
</script>
```

`<script setup>` kullanılmayan bileşenlerde, props'lar [`props`](/api/options-state#props) seçeneği kullanılarak tanımlanır:

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() props'u ilk argüman olarak alır.
    console.log(props.foo)
  }
}
```

Dikkat edin, `defineProps()` fonksiyonuna geçirilen argüman, `props` seçeneğine verilen değerle aynıdır: her iki tanımlama stili de aynı props seçenekleri API’sini kullanır.

</div>

<div class="options-api">

Props'lar [`props`](/api/options-state#props) seçeneği kullanılarak tanımlanır:

```js
export default {
  props: ['foo'],
  created() {
    // props'lar `this` üzerinden erişilebilir
    console.log(this.foo)
  }
}
```

</div>

Söz dizisi kullanarak props tanımlamanın yanı sıra, nesne söz dizimini de kullanabiliriz:

<div class="options-api">

```js
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>
<div class="composition-api">

```js
// <script setup> içinde
defineProps({
  title: String,
  likes: Number
})
```

```js
// <script setup> kullanılmayan bileşenlerde
export default {
  props: {
    title: String,
    likes: Number
  }
}
```

</div>

Nesne tanımlama söz diziminde her bir özellik için anahtar, prop’un adıdır; değer ise beklenen tipin constructor fonksiyonu olmalıdır.

Bu yalnızca bileşeninizi dokümante etmekle kalmaz, aynı zamanda diğer geliştiriciler bileşeninizi kullanırken yanlış bir tip ile props geçerse tarayıcı konsolunda uyarı verilmesini de sağlar. [Prop doğrulama](#prop-validation) konusunu bu sayfanın ilerleyen bölümlerinde daha ayrıntılı ele alacağız.

<div class="options-api">

Ayrıca göz atın: [Bileşen Props’larının Tiplenmesi](/guide/typescript/options-api#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

Eğer `<script setup>` ile TypeScript kullanıyorsanız, props’ları yalnızca tip anotasyonları kullanarak da tanımlamak mümkündür:

```vue
<script setup lang="ts">
defineProps<{
  title?: string
  likes?: number
}>()
</script>
```

Daha fazla detay: [Bileşen Props’larının Tiplenmesi](/guide/typescript/composition-api#typing-component-props) <sup class="vt-badge ts" />

</div>

<div class="composition-api">

## Reaktif Props Parçalama <sup class="vt-badge" data-text="3.5+" /> \*\* {#reactive-props-destructure}

Vue’nün tepkisellik sistemi, durum kullanımını özellik erişimine göre izler. Örneğin, bir computed getter veya watcher içinde `props.foo` değerine eriştiğinizde, `foo` prop’u bir bağımlılık olarak izlenir.

Dolayısıyla, aşağıdaki kod göz önüne alındığında:

```js
const { foo } = defineProps(['foo'])

watchEffect(() => {
  // 3.5 öncesinde yalnızca bir kez çalışır
  // 3.5+ sürümünde "foo" prop’u değiştiğinde yeniden çalışır
  console.log(foo)
})
```

3.4 ve altı sürümlerde `foo` gerçek bir sabittir ve hiçbir zaman değişmez. 3.5 ve üzeri sürümlerde ise Vue’nün derleyicisi, aynı `<script setup>` bloğu içinde `defineProps` ile parçalanmış değişkenlere erişildiğinde otomatik olarak başa `props.` ekler. Bu nedenle yukarıdaki kod aşağıdakine eşdeğer hale gelir:

```js {5}
const props = defineProps(['foo'])

watchEffect(() => {
  // `foo`, derleyici tarafından `props.foo` olarak dönüştürülür
  console.log(props.foo)
})
```

Ayrıca, props’lar için varsayılan değerleri tanımlamak amacıyla JavaScript’in yerleşik varsayılan değer söz dizimini kullanabilirsiniz. Bu, özellikle tip tabanlı props tanımlaması kullanıldığında oldukça faydalıdır:

```ts
const { foo = 'hello' } = defineProps<{ foo?: string }>()
```

Eğer IDE’nizde parçalanmış props ile normal değişkenler arasında daha belirgin bir görsel ayrım tercih ediyorsanız, Vue’nün VSCode uzantısı, parçalanmış props için satır içi ipuçları özelliğini etkinleştiren bir ayar sunar.

### Parçalanmış Props’ları Fonksiyonlara Aktarma {#passing-destructured-props-into-functions}

Parçalanmış bir prop’u bir fonksiyona geçirdiğimizde, örneğin:

```js
const { foo } = defineProps(['foo'])

watch(foo, /* ... */)
```

Bu beklenen şekilde çalışmaz çünkü bu durum `watch(props.foo, ...)` ile eşdeğerdir — yani `watch` fonksiyonuna reaktif bir veri kaynağı yerine bir değer geçiriyoruz. Aslında Vue’nün derleyicisi bu tür durumları tespit eder ve bir uyarı verir.

Normal bir prop’u `watch(() => props.foo, ...)` şeklinde izleyebildiğimiz gibi, parçalanmış bir prop’u da bir getter içine alarak izleyebiliriz:

```js
watch(() => foo, /* ... */)
```

Buna ek olarak, reaktiviteyi koruyarak parçalanmış bir prop’u harici bir fonksiyona aktarmamız gerektiğinde önerilen yaklaşım budur:

```js
useComposable(() => foo)
```

Harici fonksiyon, sağlanan prop’taki değişiklikleri izlemesi gerektiğinde getter’ı çağırabilir (veya [toValue](/api/reactivity-utilities.html#tovalue) ile normalize edebilir); örneğin bir computed veya watcher getter içinde.

</div>

## Prop Aktarım Detayları {#prop-passing-details}

### Prop İsimlendirme Stili {#prop-name-casing}

Uzun prop isimlerini camelCase kullanarak tanımlarız çünkü bu, bunları nesne anahtarı olarak kullanırken tırnak işaretleri kullanma ihtiyacını ortadan kaldırır ve geçerli JavaScript tanımlayıcıları oldukları için şablon ifadelerinde doğrudan referans verilmesine olanak tanır:

<div class="composition-api">

```js
defineProps({
  greetingMessage: String
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    greetingMessage: String
  }
}
```

</div>

```vue-html
<span>{{ greetingMessage }}</span>
```

Teknik olarak, props’ları bir alt bileşene aktarırken camelCase de kullanabilirsiniz ([DOM içi şablonlar](/guide/essentials/component-basics#in-dom-template-parsing-caveats) hariç). Ancak yaygın kullanım, HTML öznitelikleriyle uyum sağlamak için tüm durumlarda kebab-case kullanılması yönündedir:

```vue-html
<MyComponent greeting-message="hello" />
```

Mümkün olduğunda [bileşen etiketleri için PascalCase](/guide/components/registration#component-name-casing) kullanırız çünkü bu, şablon okunabilirliğini artırarak Vue bileşenlerini yerleşik (native) HTML öğelerinden ayırmayı kolaylaştırır. Ancak props aktarırken camelCase kullanmanın aynı düzeyde pratik bir avantajı olmadığı için, her dilin kendi kullanım kurallarını takip etmeyi tercih ederiz.

### Statik ve Dinamik Props {#static-vs-dynamic-props}

Şu ana kadar props’ların statik değerler olarak iletildiğini gördünüz, örneğin:

```vue-html
<BlogPost title="My journey with Vue" />
```

Ayrıca props’ların `v-bind` ya da bunun kısayolu olan `:` kullanılarak dinamik olarak atandığını da gördünüz, örneğin:

```vue-html
<!-- Bir değişkenin değerini dinamik olarak ata -->
<BlogPost :title="post.title" />

<!-- Karmaşık bir ifadenin değerini dinamik olarak ata -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```

### Farklı Değer Türlerinin İletilmesi {#passing-different-value-types}

Yukarıdaki iki örnekte, string değerler ilettik; ancak bir prop’a _herhangi bir_ türde değer iletilebilir.

#### Sayı {#number}

```vue-html
<!-- `42` statik olsa bile, Vue'ye bunun bir string değil                   -->
<!-- JavaScript ifadesi olduğunu belirtmek için v-bind kullanmamız gerekir. -->
<BlogPost :likes="42" />

<!-- Bir değişkenin değerine dinamik olarak ata. -->
<BlogPost :likes="post.likes" />
```

#### Boolean {#boolean}

```vue-html
<!-- Prop'u değer vermeden eklemek, `true` anlamına gelir. -->
<BlogPost is-published />

<!-- `false` statik olsa bile, Vue'ye bunun bir string değil                -->
<!-- JavaScript ifadesi olduğunu belirtmek için v-bind kullanmamız gerekir. -->
<BlogPost :is-published="false" />

<!-- Bir değişkenin değerine dinamik olarak ata. -->
<BlogPost :is-published="post.isPublished" />
```

#### Dizi {#array}

```vue-html
<!-- Dizi statik olsa bile, Vue'ye bunun bir string değil                   -->
<!-- JavaScript ifadesi olduğunu belirtmek için v-bind kullanmamız gerekir. -->
<BlogPost :comment-ids="[234, 266, 273]" />

<!-- Bir değişkenin değerine dinamik olarak ata. -->
<BlogPost :comment-ids="post.commentIds" />
```

#### Nesne {#object}

```vue-html
<!-- Nesne statik olsa bile, Vue'ye bunun bir string değil                  -->
<!-- JavaScript ifadesi olduğunu belirtmek için v-bind kullanmamız gerekir. -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />

<!-- Bir değişkenin değerine dinamik olarak ata. -->
<BlogPost :author="post.author" />
```

### Bir Nesne Kullanarak Birden Fazla Özellik Bağlama {#binding-multiple-properties-using-an-object}

Bir nesnenin tüm özelliklerini props olarak iletmek istiyorsanız, [`v-bind`’ı argümansız olarak kullanabilirsiniz](/guide/essentials/template-syntax#dynamically-binding-multiple-attributes) (`:prop-name` yerine `v-bind`). Örneğin, bir `post` nesnesi verildiğinde:

<div class="options-api">

```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
```

</div>
<div class="composition-api">

```js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
```

</div>

Aşağıdaki şablon:

```vue-html
<BlogPost v-bind="post" />
```

Şuna eşdeğer olacaktır:

```vue-html
<BlogPost :id="post.id" :title="post.title" />
```

## Tek Yönlü Veri Akışı {#one-way-data-flow}

Tüm props’lar, alt özellik ile üst özellik arasında tek yönlü aşağı doğru bir bağ oluşturur: üst özellik güncellendiğinde bu değişiklik alt özelliğe yansır, ancak tersi mümkün değildir. Bu, alt bileşenlerin yanlışlıkla üst bileşenlerin durumunu değiştirmesini engeller ve uygulamanızdaki veri akışının anlaşılmasını zorlaştırabilecek durumların önüne geçer.

Ayrıca, her üst bileşen güncellendiğinde, alt bileşendeki tüm props’lar en güncel değerleriyle yeniden güncellenir. Bu, bir prop’u alt bileşen içinde değiştirmeye (mutate etmeye) çalışmamanız gerektiği anlamına gelir. Eğer bunu yaparsanız, Vue konsolda size bir uyarı gösterecektir:

<div class="composition-api">

```js
const props = defineProps(['foo'])

// ❌ uyarı, props salt okunurdur!
props.foo = 'bar'
```

</div>
<div class="options-api">

```js
export default {
  props: ['foo'],
  created() {
    // ❌ uyarı, props salt okunurdur!
    this.foo = 'bar'
  }
}
```

</div>

Bir prop’u değiştirmeye (mutate etmeye) yönelme eğiliminin genellikle iki durumu vardır:

1. **Prop başlangıç değeri olarak iletilir; alt bileşen ise bunu sonrasında yerel bir data özelliği olarak kullanmak ister.** Bu durumda, prop’u başlangıç değeri olarak kullanan yerel bir data özelliği tanımlamak en iyi yaklaşımdır:

   <div class="composition-api">

   ```js
   const props = defineProps(['initialCounter'])

   // counter, props.initialCounter değerini yalnızca başlangıç değeri olarak kullanır;
   // sonraki prop güncellemeleriyle bağlantılı değildir.
   const counter = ref(props.initialCounter)
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['initialCounter'],
     data() {
       return {
         // counter, this.initialCounter değerini yalnızca başlangıç değeri olarak kullanır;
         // sonraki prop güncellemeleriyle bağlantılı değildir.
         counter: this.initialCounter
       }
     }
   }
   ```

   </div>

2. **Prop, dönüştürülmesi gereken ham bir değer olarak iletilir.** Bu durumda, prop’un değerini kullanan bir computed özellik tanımlamak en iyi yaklaşımdır:

   <div class="composition-api">

   ```js
   const props = defineProps(['size'])

   // prop değiştiğinde otomatik olarak güncellenen computed özellik
   const normalizedSize = computed(() => props.size.trim().toLowerCase())
   ```

   </div>
   <div class="options-api">

   ```js
   export default {
     props: ['size'],
     computed: {
       // prop değiştiğinde otomatik olarak güncellenen computed özellik
       normalizedSize() {
         return this.size.trim().toLowerCase()
       }
     }
   }
   ```

   </div>

### Nesne / Dizi Props’larını Değiştirme {#mutating-object-array-props}

Nesneler ve diziler props olarak iletildiğinde, alt bileşen prop bağını değiştiremez; ancak nesne ya da dizinin iç içe özelliklerini **değiştirebilir**. Bunun nedeni, JavaScript’te nesnelerin ve dizilerin referansla aktarılmasıdır ve Vue’nün bu tür değişiklikleri engellemesi makul olmayan bir maliyet oluşturur.

Bu tür değişikliklerin temel sakıncası, alt bileşenin üst durumu üst bileşen açısından açık olmayan bir şekilde etkileyebilmesidir; bu da gelecekte veri akışını anlamayı zorlaştırabilir. En iyi uygulama olarak, üst ve alt tasarım gereği sıkı şekilde bağlı olmadıkça bu tür değişikliklerden kaçınmalısınız. Çoğu durumda alt bileşen, değişikliğin üst bileşen tarafından yapılmasını sağlamak için [bir olay tetiklemelidir](/guide/components/events).

## Prop Doğrulama {#prop-validation}

Bileşenler, daha önce gördüğünüz türler gibi props’ları için gereksinimler belirleyebilir. Eğer bu gereksinimlerden biri karşılanmazsa, Vue tarayıcının JavaScript konsolunda bir uyarı gösterir. Bu özellik, özellikle başkaları tarafından kullanılmak üzere geliştirilen bileşenlerde oldukça faydalıdır.

Prop doğrulamalarını belirtmek için, string dizisi yerine <span class="composition-api">`defineProps()` makrosuna</span><span class="options-api">`props` seçeneğine</span> doğrulama gereksinimlerini içeren bir nesne sağlayabilirsiniz. Örneğin:

<div class="composition-api">

```js
defineProps({
  // Temel tip kontrolü
  // (`null` ve `undefined` değerleri her türü kabul eder)
  propA: Number,
  // Birden fazla olası tip
  propB: [String, Number],
  // Zorunlu string
  propC: {
    type: String,
    required: true
  },
  // Zorunlu ama nullable string
  propD: {
    type: [String, null],
    required: true
  },
  // Varsayılan değeri olan sayı
  propE: {
    type: Number,
    default: 100
  },
  // Varsayılan değeri olan nesne
  propF: {
    type: Object,
    // Nesne veya dizi varsayılanları bir factory (fabrika) fonksiyonundan döndürülmelidir.
    // Bu fonksiyon, bileşenin aldığı ham props değerlerini argüman olarak alır.
    default(rawProps) {
      return { message: 'hello' }
    }
  },
  // Özel validator (doğrulama) fonksiyonu
  // 3.4+ sürümünde tüm props ikinci argüman olarak da iletilir
  propG: {
    validator(value, props) {
      // Değer şu string'lerden biri olmalıdır
      return ['success', 'warning', 'danger'].includes(value)
    }
  },
  // Varsayılan değeri olan fonksiyon
  propH: {
    type: Function,
    // Nesne veya dizi varsayılanlarından farklı olarak bu bir factory (fabrika) fonksiyonu değildir
    // bu, varsayılan değer olarak kullanılan bir fonksiyondur
    default() {
      return 'Default function'
    }
  }
})
```

:::tip İpucu
`defineProps()` argümanı içindeki kod, `<script setup>` içinde tanımlanan diğer değişkenlere **erişemez**, çünkü bu ifade derleme sırasında dış bir fonksiyon kapsamına taşınır.
:::

</div>
<div class="options-api">

```js
export default {
  props: {
    // Temel tip kontrolü
    // (`null` ve `undefined` değerleri her türü kabul eder)
    propA: Number,
    // Birden fazla olası tip
    propB: [String, Number],
    // Zorunlu string
    propC: {
      type: String,
      required: true
    },
    // Zorunlu ama nullable string
    propD: {
      type: [String, null],
      required: true
    },
    // Varsayılan değeri olan sayı
    propE: {
      type: Number,
      default: 100
    },
    // Varsayılan değeri olan nesne
    propF: {
      type: Object,
      // Nesne veya dizi varsayılanları bir factory (fabrika) fonksiyonundan döndürülmelidir.
      // Bu fonksiyon, bileşenin aldığı ham props değerlerini argüman olarak alır.
      default(rawProps) {
        return { message: 'hello' }
      }
    },
    // Özel validator (doğrulama) fonksiyonu
    // 3.4+ sürümünde tüm props ikinci argüman olarak da iletilir
    propG: {
      validator(value, props) {
        // Değer şu string'lerden biri olmalıdır
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // Varsayılan değeri olan fonksiyon
    propH: {
      type: Function,
      // Nesne veya dizi varsayılanlarından farklı olarak bu bir factory (fabrika) fonksiyonu değildir
      // bu, varsayılan değer olarak kullanılan bir fonksiyondur
      default() {
        return 'Default function'
      }
    }
  }
}
```

</div>

Ek detaylar:

- Tüm props’lar varsayılan olarak opsiyoneldir; `required: true` belirtilmediği sürece zorunlu değildir.

- `Boolean` dışında kalan opsiyonel bir prop sağlanmadığında, değeri `undefined` olur.

- `Boolean` türündeki ve gönderilmeyen props’lar `false` olarak değerlendirilir. Bunu değiştirmek için prop’a bir `default` değeri atayabilirsiniz — örneğin `default: undefined` kullanarak, Boolean olmayan bir prop gibi davranmasını sağlayabilirsiniz.

- Eğer bir `default` değeri belirtilmişse, çözümlenen prop değeri `undefined` olduğunda bu değer kullanılır — bu durum hem prop’un hiç gönderilmediği hem de açıkça `undefined` olarak iletildiği durumları kapsar.

Prop doğrulaması başarısız olduğunda, Vue (geliştirme sürümü kullanılıyorsa) konsolda bir uyarı üretir.

<div class="composition-api">

[Tip tabanlı props tanımlamaları](/api/sfc-script-setup#type-only-props-emit-declarations) <sup class="vt-badge ts" /> kullanılıyorsa, Vue tip anotasyonlarını karşılık gelen runtime prop tanımlarına dönüştürmek için elinden geleni yapar. Örneğin, `defineProps<{ msg: string }>` ifadesi `{ msg: { type: String, required: true }}` olarak derlenir.

</div>
<div class="options-api">

::: tip Not
Props’ların, bir bileşen örneği oluşturulmadan **önce** doğrulandığını unutmayın. Bu nedenle örnek (instance) özellikleri (örneğin `data`, `computed` vb.), `default` veya `validator` fonksiyonları içinde kullanılamaz.
:::

</div>

### Runtime Tip Kontrolleri {#runtime-type-checks}

`type` aşağıdaki yerleşik constructor’lardan biri olabilir:

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`
- `Error`

Buna ek olarak, `type` bir özel sınıf veya constructor fonksiyonu da olabilir ve doğrulama `instanceof` kontrolü ile yapılır. Örneğin, aşağıdaki sınıf verildiğinde:

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```

Bunu bir prop’un tipi olarak kullanabilirsiniz:

<div class="composition-api">

```js
defineProps({
  author: Person
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    author: Person
  }
}
```

</div>

Vue, `author` prop’unun değerinin gerçekten `Person` sınıfının bir örneği olup olmadığını doğrulamak için `instanceof Person` kontrolünü kullanır.

### Nullable Tip {#nullable-type}

Eğer tip zorunlu ancak null değeri alabiliyorsa, `null` içeren dizi söz dizimini kullanabilirsiniz:

<div class="composition-api">

```js
defineProps({
  id: {
    type: [String, null],
    required: true
  }
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    id: {
      type: [String, null],
      required: true
    }
  }
}
```

</div>

`type` yalnızca `null` olarak belirtilirse ve dizi söz dizimi kullanılmazsa, bu durumda her tür kabul edilir.

## Boolean Dönüştürme {#boolean-casting}

`Boolean` tipindeki props’lar, yerleşik boolean attribute’ların davranışını taklit etmek için özel dönüştürme kurallarına sahiptir. Aşağıdaki şekilde tanımlanmış bir `<MyComponent>` verildiğinde:

<div class="composition-api">

```js
defineProps({
  disabled: Boolean
})
```

</div>
<div class="options-api">

```js
export default {
  props: {
    disabled: Boolean
  }
}
```

</div>

Bileşen şu şekilde kullanılabilir:

```vue-html
<!-- :disabled="true" ile aynı anlama gelir -->
<MyComponent disabled />

<!-- :disabled="false" ile aynı anlama gelir -->
<MyComponent />
```

Bir prop birden fazla tip kabul edecek şekilde tanımlandığında, `Boolean` için geçerli olan dönüştürme kuralları da uygulanır. Ancak `String` ve `Boolean` birlikte kullanıldığında bir istisna vardır — Boolean dönüştürme kuralı yalnızca Boolean, String’den önce geliyorsa uygulanır:

<div class="composition-api">

```js
// disabled true olarak değerlendirilir
defineProps({
  disabled: [Boolean, Number]
})

// disabled true olarak değerlendirilir
defineProps({
  disabled: [Boolean, String]
})

// disabled true olarak değerlendirilir
defineProps({
  disabled: [Number, Boolean]
})

// disabled boş bir string olarak değerlendirilir (disabled="")
defineProps({
  disabled: [String, Boolean]
})
```

</div>
<div class="options-api">

```js
// disabled true olarak değerlendirilir
export default {
  props: {
    disabled: [Boolean, Number]
  }
}

// disabled true olarak değerlendirilir
export default {
  props: {
    disabled: [Boolean, String]
  }
}

// disabled true olarak değerlendirilir
export default {
  props: {
    disabled: [Number, Boolean]
  }
}

// disabled boş bir string olarak değerlendirilir (disabled="")
export default {
  props: {
    disabled: [String, Boolean]
  }
}
```

</div>
