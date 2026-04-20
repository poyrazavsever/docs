# Şablon Söz Dizimi {#template-syntax}

<ScrimbaLink href="https://scrimba.com/links/vue-template-syntax" title="Ücretsiz Vue.js Şablon Söz Dizimi Dersi" type="scrimba">
  Scrimba'da etkileşimli bir video dersi izleyin
</ScrimbaLink>

Vue, render edilen DOM'u alttaki bileşen örneğinin verisine bildirimsel olarak bağlamanızı sağlayan HTML tabanlı bir şablon söz dizimi kullanır. Tüm Vue şablonları, standartlarla uyumlu tarayıcılar ve HTML ayrıştırıcıları tarafından ayrıştırılabilen, söz dizimi açısından geçerli HTML'dir.

Arka planda Vue, şablonları yüksek düzeyde optimize edilmiş JavaScript koduna derler. Tepkisellik sistemiyle birleştiğinde Vue, uygulama durumu değiştiğinde yeniden render edilmesi gereken en az bileşen sayısını akıllıca belirleyebilir ve DOM üzerinde gereken en az düzeyde işlemi uygular.

Sanal DOM kavramlarına aşinaysanız ve JavaScript'in ham gücünü tercih ediyorsanız, isteğe bağlı JSX desteğiyle şablonlar yerine [doğrudan render fonksiyonları yazabilirsiniz](/guide/extras/render-function). Ancak bunların, şablonlarla aynı düzeyde derleme zamanı optimizasyonlarından yararlanmadığını unutmayın.

## Metin Enterpolasyonu {#text-interpolation}

Veri bağlamanın en temel biçimi, "Mustache" söz dizimini (çift süslü parantez) kullanan metin enterpolasyonudur:

```vue-html
<span>Mesaj: {{ msg }}</span>
```

Mustache etiketi, [ilgili bileşen örneğindeki](/guide/essentials/reactivity-fundamentals#declaring-reactive-state) `msg` özelliğinin değeriyle değiştirilir. `msg` özelliği değiştiğinde de otomatik olarak güncellenir.

## Ham HTML {#raw-html}

Çift mustache, veriyi HTML olarak değil düz metin olarak yorumlar. Gerçek HTML çıktısı üretmek için [`v-html` direktifini](/api/built-in-directives#v-html) kullanmanız gerekir:

```vue-html
<p>Metin enterpolasyonu kullanımı: {{ rawHtml }}</p>
<p>v-html direktifi kullanımı: <span v-html="rawHtml"></span></p>
```

<script setup>
  const rawHtml = '<span style="color: red">Bu metin kırmızı olmalı.</span>'
</script>

<div class="demo">
  <p>Metin enterpolasyonu kullanımı: {{ rawHtml }}</p>
  <p>v-html direktifi kullanımı: <span v-html="rawHtml"></span></p>
</div>

Burada yeni bir şeyle karşılaşıyoruz. Gördüğünüz `v-html` özniteliğine **direktif** denir. Direktifler, Vue tarafından sağlanan özel öznitelikler olduklarını belirtmek için `v-` önekiyle yazılır ve tahmin edebileceğiniz gibi render edilen DOM'a özel tepkisel davranışlar uygularlar. Burada temelde "bu öğenin iç HTML'ini geçerli etkin örnekteki `rawHtml` özelliğiyle güncel tut" demiş oluyoruz.

`span` içeriği, `rawHtml` özelliğinin değeriyle değiştirilir ve düz HTML olarak yorumlanır; veri bağlamaları yok sayılır. Vue, string tabanlı bir şablon motoru olmadığı için şablon parçalarını birleştirmek amacıyla `v-html` kullanamayacağınızı unutmayın. Bunun yerine, kullanıcı arayüzünü yeniden kullanma ve bileştirme için temel birim olarak bileşenler tercih edilir.

:::warning Güvenlik Uyarısı
Web sitenizde rastgele HTML'i dinamik olarak render etmek oldukça tehlikeli olabilir; çünkü kolayca [XSS açıklarına](https://en.wikipedia.org/wiki/Cross-site_scripting) yol açabilir. `v-html` yalnızca güvenilir içerikte kullanılmalı ve kullanıcı tarafından sağlanan içerikte **asla** kullanılmamalıdır.
:::

## Öznitelik Bağlamaları {#attribute-bindings}

Mustache kullanımı HTML özniteliklerinin içinde yapılamaz. Bunun yerine [`v-bind` direktifini](/api/built-in-directives#v-bind) kullanın:

```vue-html
<div v-bind:id="dynamicId"></div>
```

`v-bind` direktifi, öğenin `id` özniteliğini bileşenin `dynamicId` özelliğiyle eşzamanlı tutması için Vue'ya talimat verir. Bağlanan değer `null` veya `undefined` ise öznitelik render edilen öğeden kaldırılır.

### Kısa Yazım {#shorthand}

`v-bind` çok yaygın kullanıldığı için özel bir kısa yazımı vardır:

```vue-html
<div :id="dynamicId"></div>
```

`:` ile başlayan öznitelikler normal HTML'den biraz farklı görünebilir, ancak öznitelik adları için geçerli bir karakterdir ve Vue'nun desteklediği tüm tarayıcılar bunu doğru biçimde ayrıştırabilir. Ayrıca, son render edilen işaretlemede görünmezler. Kısa yazım zorunlu değildir, ancak kullanımını ileride daha iyi öğrendiğinizde muhtemelen faydalı bulacaksınız.

> Rehberin geri kalanında, Vue geliştiricileri arasında en yaygın kullanım biçimi olduğu için kod örneklerinde kısa yazımı kullanacağız.

### Aynı İsimli Kısa Yazım {#same-name-shorthand}

- Yalnızca 3.4+ sürümlerinde desteklenir

Özniteliğin adı, bağlanan JavaScript değerinin değişken adıyla aynıysa söz dizimi öznitelik değerini atlayacak şekilde daha da kısaltılabilir:

```vue-html
<!-- :id="id" ile aynıdır -->
<div :id></div>

<!-- bu da çalışır -->
<div v-bind:id></div>
```

Bu, JavaScript'te nesne tanımlarken kullanılan özellik kısa yazımına benzer. Bunun yalnızca Vue 3.4 ve üzerindeki sürümlerde kullanılabilen bir özellik olduğunu unutmayın.

### Boolean Öznitelikler {#boolean-attributes}

[Boolean öznitelikler](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes), bir öğe üzerinde bulunup bulunmamalarıyla true / false değerlerini ifade edebilen özniteliklerdir. Örneğin [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled), en yaygın kullanılan boolean özniteliklerden biridir.

`v-bind` bu durumda biraz farklı çalışır:

```vue-html
<button :disabled="isButtonDisabled">Düğme</button>
```

`isButtonDisabled` değeri [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) ise `disabled` özniteliği eklenir. Değer boş bir string olduğunda da `<button disabled="">` ile tutarlılığı koruyacak şekilde öznitelik yine eklenir. Diğer [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) değerlerde ise öznitelik kaldırılır.

### Birden Fazla Özniteliği Dinamik Olarak Bağlama {#dynamically-binding-multiple-attributes}

Birden fazla özniteliği temsil eden ve aşağıdakine benzeyen bir JavaScript nesneniz varsa:

<div class="composition-api">

```js
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper',
  style: 'background-color:green'
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    objectOfAttrs: {
      id: 'container',
      class: 'wrapper'
    }
  }
}
```

</div>

Bu öznitelikleri, argüman vermeden `v-bind` kullanarak tek bir öğeye bağlayabilirsiniz:

```vue-html
<div v-bind="objectOfAttrs"></div>
```

## JavaScript İfadelerini Kullanma {#using-javascript-expressions}

Şimdiye kadar şablonlarımızda yalnızca basit özellik anahtarlarına bağlama yapıyorduk. Ancak Vue, tüm veri bağlamalarının içinde JavaScript ifadelerinin tüm gücünü destekler:

```vue-html
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>
```

Bu ifadeler, geçerli bileşen örneğinin veri kapsamı içinde JavaScript olarak değerlendirilir.

Vue şablonlarında JavaScript ifadeleri şu konumlarda kullanılabilir:

- Metin enterpolasyonlarının (mustache) içinde
- Herhangi bir Vue direktifinin öznitelik değerinde (`v-` ile başlayan özel öznitelikler)

### Yalnızca İfadeler {#expressions-only}

Her bağlama yalnızca **tek bir ifade** içerebilir. İfade, bir değere değerlendirilebilen kod parçasıdır. Basit bir kontrol yöntemi, ifadenin `return` sonrasında kullanılıp kullanılamayacağına bakmaktır.

Bu nedenle aşağıdakiler **ÇALIŞMAZ**:

```vue-html
<!-- bu bir ifade değil, bir deyimdir: -->
{{ var a = 1 }}

<!-- akış kontrolü de çalışmaz, ternary ifade kullanın -->
{{ if (ok) { return message } }}
```

### Fonksiyon Çağırma {#calling-functions}

Bir bağlama ifadesi içinde, bileşen tarafından dışa açılmış bir yöntemi çağırmak mümkündür:

```vue-html
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>
```

:::tip
Bağlama ifadeleri içinde çağrılan fonksiyonlar, bileşen her güncellendiğinde yeniden çağrılır. Bu nedenle veri değiştirmek veya asenkron işlemleri tetiklemek gibi herhangi bir yan etkiye **sahip olmamalıdırlar**.
:::

### Kısıtlı Global Erişimi {#restricted-globals-access}

Şablon ifadeleri sandbox içinde çalışır ve yalnızca [kısıtlı bir global listesine](https://github.com/vuejs/core/blob/main/packages/shared/src/globalsAllowList.ts#L3) erişebilir. Bu liste, `Math` ve `Date` gibi yaygın kullanılan yerleşik globalleri içerir.

Listede açıkça yer almayan globallere, örneğin `window` üzerine kullanıcı tarafından eklenmiş özelliklere, şablon ifadeleri içinde erişilemez. Ancak [`app.config.globalProperties`](/api/application#app-config-globalproperties) üzerinden ekleyerek tüm Vue ifadeleri için ek globalleri açıkça tanımlayabilirsiniz.

## Direktifler {#directives}

Direktifler, `v-` ön ekiyle yazılan özel özniteliklerdir. Vue, yukarıda tanıttığımız `v-html` ve `v-bind` dahil olmak üzere birçok [yerleşik direktif](/api/built-in-directives) sağlar.

Direktif öznitelik değerlerinin tek bir JavaScript ifadesi olması beklenir (`v-for`, `v-on` ve `v-slot` hariç; bunlar ilgili bölümlerde ayrıca ele alınacaktır). Bir direktifin görevi, ifadesinin değeri değiştiğinde DOM'a tepkisel güncellemeler uygulamaktır. Örnek olarak [`v-if`](/api/built-in-directives#v-if) direktifini ele alalım:

```vue-html
<p v-if="seen">Artık beni görüyorsun</p>
```

Burada `v-if` direktifi, `seen` ifadesinin değerinin truthy olup olmamasına göre `<p>` öğesini kaldırır veya ekler.

### Argümanlar {#arguments}

Bazı direktifler, direktif adından sonra iki nokta üst üste ile belirtilen bir "argüman" alabilir. Örneğin `v-bind` direktifi, bir HTML özniteliğini tepkisel olarak güncellemek için kullanılır:

```vue-html
<a v-bind:href="url"> ... </a>

<!-- kısa yazım -->
<a :href="url"> ... </a>
```

Burada `href` argümandır ve `v-bind` direktifine, öğenin `href` özniteliğini `url` ifadesinin değerine bağlamasını söyler. Kısa yazımda argümandan önceki her şey (yani `v-bind:`), tek bir karaktere, `:`, indirgenir.

Bir diğer örnek, DOM olaylarını dinleyen `v-on` direktifidir:

```vue-html
<a v-on:click="doSomething"> ... </a>

<!-- kısa yazım -->
<a @click="doSomething"> ... </a>
```

Burada argüman, dinlenecek olayın adıdır: `click`. `v-on` için karşılık gelen kısa yazım `@` karakteridir. Olay işleme konusunu birazdan daha ayrıntılı ele alacağız.

### Dinamik Argümanlar {#dynamic-arguments}

Bir direktif argümanı içinde, köşeli parantezle sararak bir JavaScript ifadesi kullanmak da mümkündür:

```vue-html
<!--
Argüman ifadesi için bazı kısıtlar bulunduğunu unutmayın;
bunlar aşağıdaki "Dinamik Argüman Değeri Kısıtları" ve "Dinamik Argüman Söz Dizimi Kısıtları" bölümlerinde açıklanmıştır.
-->
<a v-bind:[attributeName]="url"> ... </a>

<!-- kısa yazım -->
<a :[attributeName]="url"> ... </a>
```

Burada `attributeName`, bir JavaScript ifadesi olarak dinamik biçimde değerlendirilir ve ortaya çıkan değer argümanın nihai değeri olarak kullanılır. Örneğin bileşen örneğinizde değeri `"href"` olan bir `attributeName` veri özelliği varsa bu bağlama `v-bind:href` ile eşdeğerdir.

Aynı şekilde, dinamik bir olay adına bir işleyici bağlamak için de dinamik argümanları kullanabilirsiniz:

```vue-html
<a v-on:[eventName]="doSomething"> ... </a>

<!-- kısa yazım -->
<a @[eventName]="doSomething"> ... </a>
```

Bu örnekte `eventName` değeri `"focus"` olduğunda `v-on:[eventName]`, `v-on:focus` ile eşdeğer olur.

#### Dinamik Argüman Değeri Kısıtları {#dynamic-argument-value-constraints}

Dinamik argümanların, `null` istisnası dışında string bir değere değerlendirilmesi beklenir. Özel `null` değeri, bağlamayı açıkça kaldırmak için kullanılabilir. String dışındaki diğer değerler uyarı oluşturur.

#### Dinamik Argüman Söz Dizimi Kısıtları {#dynamic-argument-syntax-constraints}

Dinamik argüman ifadelerinin bazı söz dizimi kısıtları vardır; çünkü boşluk ve tırnak gibi bazı karakterler HTML öznitelik adlarının içinde geçersizdir. Örneğin, aşağıdaki kullanım geçersizdir:

```vue-html
<!-- Bu kullanım derleyici uyarısı üretir. -->
<a :['foo' + bar]="value"> ... </a>
```

Karmaşık bir dinamik argüman geçirmeniz gerekiyorsa, birazdan ele alacağımız [hesaplanmış özelliği](./computed) kullanmak genellikle daha iyi bir yaklaşımdır.

in-DOM şablonlar (doğrudan bir HTML dosyasına yazılan şablonlar) kullanırken anahtarları büyük harf içerecek şekilde adlandırmaktan da kaçınmalısınız; çünkü tarayıcılar öznitelik adlarını küçük harfe dönüştürür:

```vue-html
<a :[someAttr]="value"> ... </a>
```

Yukarıdaki ifade in-DOM şablonlarda `:[someattr]` biçimine dönüştürülür. Bileşeninizde `someattr` yerine `someAttr` özelliği varsa kodunuz çalışmaz. Tek Dosyalı Bileşenlerin içindeki şablonlar bu kısıta **tabi değildir**.

### Değiştiriciler {#modifiers}

Değiştiriciler, bir nokta ile belirtilen özel son eklerdir ve bir direktifin özel bir şekilde bağlanması gerektiğini ifade eder. Örneğin `.prevent` değiştiricisi, `v-on` direktifine tetiklenen olayda `event.preventDefault()` çağrısı yapmasını söyler:

```vue-html
<form @submit.prevent="onSubmit">...</form>
```

Bu özellikleri incelerken ileride [`v-on` için](./event-handling#event-modifiers) ve [`v-model` için](./forms#modifiers) değiştiricilere ait başka örnekler de göreceksiniz.

Son olarak, direktif söz diziminin tamamını görselleştirilmiş olarak aşağıda görebilirsiniz:

![direktif söz dizimi grafiği](./images/directive.png)

<!-- https://www.figma.com/file/BGWUknIrtY9HOmbmad0vFr/Directive -->
