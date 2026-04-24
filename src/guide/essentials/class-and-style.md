# Sınıf ve Stil Bağlamaları (Bind) {#class-and-style-bindings}

Veri bağlamada (bind) yaygın bir ihtiyaç, bir öğenin sınıf listesini ve satır içi (inline) stillerini yönetmektir. Hem `class` hem de `style` birer öznitelik (attribute) olduğu için, tıpkı diğer özniteliklerde olduğu gibi bunlara da dinamik olarak karakter dizesi (string) değeri atamak için `v-bind` kullanabiliriz. Ancak, bu değerleri string birleştirme (string concatenation) kullanarak oluşturmaya çalışmak zahmetli ve hataya açık olabilir. Bu nedenle, Vue `class` ve `style` bağlamalarında `v-bind` kullanımını özel iyileştirmelerle destekler. Karakter dizelerine (string) ek olarak, bu ifadeler nesne (object) veya dizi (array) olarak da değerlendirilebilir.

## HTML Sınıflarını Bağlama {#binding-html-classes}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/dynamic-css-classes-with-vue-3" title="Ücretsiz Vue.js Dinamik CSS Sınıfları Dersi"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-dynamic-css-classes-with-vue" title="Ücretsiz Vue.js Dinamik CSS Sınıfları Dersi"/>
</div>

### Nesnelere (Object) Bağlama {#binding-to-objects}

Sınıfları dinamik olarak açıp kapatmak (toggle) için `:class`'a (`v-bind:class` kısaltması) bir nesne aktarabiliriz:

```vue-html
<div :class="{ active: isActive }"></div>
```

Yukarıdaki söz dizimi, `active` sınıfının varlığının `isActive` veri özelliğinin [doğruluk değerine (truthiness)](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) göre belirleneceği anlamına gelir.

Nesneye daha fazla alan ekleyerek birden fazla sınıfın açılıp kapanmasını (toggle) sağlayabilirsiniz. Ayrıca `:class` direktifi, düz `class` özniteliği ile bir arada bulunabilir. Aşağıdaki durum:

<div class="composition-api">

```js
const isActive = ref(true)
const hasError = ref(false)
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    hasError: false
  }
}
```

</div>

Ve aşağıdaki şablon göz önüne alındığında:

```vue-html
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Şu çıktıyı üretecektir:

```vue-html
<div class="static active"></div>
```

`isActive` veya `hasError` değiştiğinde, sınıf listesi buna göre güncellenecektir. Örneğin, `hasError` `true` olursa sınıf listesi `"static active text-danger"` olacaktır.

Bağlanan nesnenin satır içi (inline) olması gerekmez:

<div class="composition-api">

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

Yukarıdaki örnek, şu çıktıyı üretecektir:

```vue-html
<div class="active"></div>
```

Ayrıca bir nesne döndüren [hesaplanmış özelliğe (computed property)](./computed) de bağlama yapabiliriz. Bu yaygın ve güçlü bir kalıptır:

<div class="composition-api">

```js
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
```

</div>

<div class="options-api">

```js
data() {
  return {
    isActive: true,
    error: null
  }
},
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

</div>

```vue-html
<div :class="classObject"></div>
```

### Dizilere (Array) Bağlama {#binding-to-arrays}

Bir sınıf listesi uygulamak için `:class` özniteliğini bir diziye (array) bağlayabiliriz:

<div class="composition-api">

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeClass: 'active',
    errorClass: 'text-danger'
  }
}
```

</div>

```vue-html
<div :class="[activeClass, errorClass]"></div>
```

Yukarıdaki örnek, şu çıktıyı üretecektir:

```vue-html
<div class="active text-danger"></div>
```

Listedeki bir sınıfı koşullu olarak açıp kapatmak (toggle) isterseniz, bunu bir üçlü (ternary) ifadeyle yapabilirsiniz:

```vue-html
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

Bu `errorClass`'ı her zaman uygulayacak, ancak `activeClass` yalnızca `isActive` değeri doğru (truthy) olduğunda uygulanacaktır.

Ancak birden fazla koşullu sınıfınız olduğunda bu biraz karmaşık (verbose) hale gelebilir. Bu nedenle, dizi (array) söz dizimi içinde nesne (object) söz dizimi kullanmak da mümkündür:

```vue-html
<div :class="[{ [activeClass]: isActive }, errorClass]"></div>
```

### Bileşenlerle (Components) Kullanımı {#with-components}

> Bu bölüm [Bileşenler (Components)](/guide/essentials/component-basics) hakkında bilgi sahibi olduğunuzu varsayar. Dilerseniz bu bölümü atlayıp daha sonra geri dönebilirsiniz.

Bileşen tek bir kök öğeden (root element) oluşuyorsa, kullanılan `class` öznitelikleri bu kök öğeye aktarılır ve halihazırda var olan sınıflarla birleştirilir.

Örneğin, aşağıdaki şablona sahip `MyComponent` adında bir bileşenimiz olduğunu varsayalım:

```vue-html
<!-- alt bileşen şablonu -->
<p class="foo bar">Hi!</p>
```

Ardından bileşeni kullanırken bazı sınıflar ekleyelim:

```vue-html
<!-- bileşeni kullanırken -->
<MyComponent class="baz boo" />
```

HTML çıktısı şu şekilde olacaktır:

```vue-html
<p class="foo bar baz boo">Hi!</p>
```

Aynı durum sınıf bağlamaları için de geçerlidir:

```vue-html
<MyComponent :class="{ active: isActive }" />
```

`isActive` değeri doğru (truthy) olduğunda HTML çıktısı şu şekilde olacaktır:

```vue-html
<p class="foo bar active">Hi!</p>
```

Bileşeninizin birden fazla kök öğesi varsa, bu sınıfı hangi öğenin alacağını tanımlamanız gerekir. Bunu `$attrs` bileşen özelliğini kullanarak yapabilirsiniz:

```vue-html
<!-- MyComponent şablonu $attrs kullanıyor -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
```

```vue-html
<MyComponent class="baz" />
```

Şu çıktıyı üretecektir:

```html
<p class="baz">Hi!</p>
<span>This is a child component</span>
```

Bileşen öznitelik kalıtımı (attribute inheritance) hakkında daha fazla bilgiyi [Aktarılan Öznitelikler (Fallthrough Attributes)](/guide/components/attrs) bölümünde bulabilirsiniz.

## Satır İçi (Inline) Stilleri Bağlama {#binding-inline-styles}

### Nesnelere (Object) Bağlama {#binding-to-objects-1}

`:style` JavaScript nesne değerlerine bağlamayı destekler - bu, [HTML öğesinin `style` özelliğine](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) karşılık gelir:

<div class="composition-api">

```js
const activeColor = ref('red')
const fontSize = ref(30)
```

</div>

<div class="options-api">

```js
data() {
  return {
    activeColor: 'red',
    fontSize: 30
  }
}
```

</div>

```vue-html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

camelCase değerlerin kullanılması önerilse de `:style` aynı zamanda (gerçek CSS'deki kullanım şekillerine karşılık gelen) kebab-case CSS özellik değerlerini de destekler - örneğin:

```vue-html
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

Şablonun daha temiz olması için genellikle doğrudan bir stil nesnesine bağlamak iyi bir fikirdir:

<div class="composition-api">

```js
const styleObject = reactive({
  color: 'red',
  fontSize: '30px'
})
```

</div>

<div class="options-api">

```js
data() {
  return {
    styleObject: {
      color: 'red',
      fontSize: '13px'
    }
  }
}
```

</div>

```vue-html
<div :style="styleObject"></div>
```

Yine, nesne stil bağlaması genellikle nesne döndüren hesaplanmış özellikler (computed properties) ile birlikte kullanılır.

`:style` direktifleri, tıpkı `:class` gibi, düz stil öznitelikleriyle birlikte kullanılabilir.

Şablon:

```vue-html
<h1 style="color: red" :style="'font-size: 1em'">hello</h1>
```

Şu çıktıyı verir:

```vue-html
<h1 style="color: red; font-size: 1em;">hello</h1>
```

### Dizilere (Array) Bağlama {#binding-to-arrays-1}

`:style` özniteliğini birden fazla stil nesnesinden oluşan bir diziye (array) bağlayabiliriz. Bu nesneler birleştirilecek ve aynı öğeye uygulanacaktır.

```vue-html
<div :style="[baseStyles, overridingStyles]"></div>
```

### Otomatik Ön Ek Ekleme (Auto-prefixing) {#auto-prefixing}

`:style` içinde [tarayıcıya özgü ön ek](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) gerektiren bir CSS özelliği kullandığınızda, Vue uygun ön eki otomatik olarak ekler. Vue bunu, mevcut tarayıcıda hangi stil özelliklerinin desteklendiğini çalışma zamanında kontrol ederek yapar. Eğer tarayıcı belirli bir özelliği desteklemiyorsa, desteklenen bir tanesini bulmak için çeşitli ön ekli varyantlar test edilir.

### Çoklu Değerler {#multiple-values}

Bir stil özelliğine birden fazla (ön ekli) değerden oluşan bir dizi (array) sağlayabilirsiniz; örneğin:

```vue-html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

Bu, dizideki değerlerden yalnızca tarayıcının desteklediği son değeri işleyecektir. Bu örnekte flexbox'ın ön eksiz sürümünü destekleyen tarayıcılar için `display: flex` çıktısını üretecektir.
