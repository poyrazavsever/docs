# Olay İşleme {#event-handling}

<div class="options-api">
  <VueSchoolLink href="https://vueschool.io/lessons/user-events-in-vue-3" title="Ücretsiz Vue.js Olaylar Dersi"/>
</div>

<div class="composition-api">
  <VueSchoolLink href="https://vueschool.io/lessons/vue-fundamentals-capi-user-events-in-vue-3" title="Ücretsiz Vue.js Olaylar Dersi"/>
</div>

## Olayları Dinleme {#listening-to-events}

`v-on` direktifini (genellikle `@` sembolüyle kısaltılır) DOM olaylarını dinlemek ve tetiklendiğinde JavaScript çalıştırmak için kullanabiliriz. Kullanımı `v-on:click="handler"` ya da kısaca `@click="handler"` şeklindedir.
Handler değeri aşağıdakilerden biri olabilir:

Handler değeri aşağıdakilerden biri olabilir:

1. **Inline handler’lar (işleyiciler):** Olay tetiklendiğinde çalıştırılan inline JavaScript (native `onclick` attribute’una benzer).

2. **Metot handler’ları (işleyiciler):** Component üzerinde tanımlı bir metoda işaret eden property adı veya path.

## Inline Handlers {#inline-handlers}

Inline handler’lar genellikle basit durumlarda kullanılır. Örneğin:

<div class="composition-api">

```js
const count = ref(0)
```

</div>
<div class="options-api">

```js
data() {
  return {
    count: 0
  }
}
```

</div>

```vue-html
<button @click="count++">1 Arttır</button>
<p>Sayaç: {{ count }}</p>
```

<div class="composition-api">

[Playground'da İncele](https://play.vuejs.org/#eNo9jssKgzAURH/lko0tgrbbEqX+Q5fZaLxiqHmQ3LgJ+fdqFZcD58xMYp1z1RqRvRgP0itHEJCia4VR2llPkMDjBBkmbzUUG1oII4y0JhBIGw2hh2Znbo+7MLw+WjZ/C4TaLT3hnogPkcgaeMtFyW8j2GmXpWBtN47w5PWBHLhrPzPCKfWDXRHmPsCAaOBfgSOkdH3IGUhpDBWv9/e8vsZZ/gFFhFJN)

</div>
<div class="options-api">

[Playground'da İncele](https://play.vuejs.org/#eNo9jcEKgzAQRH9lyKlF0PYqqdR/6DGXaLYo1RjiRgrivzepIizLzu7sm1XUzuVLIFEKObe+d1wpS183eYahtw4DY1UWMJr15ZpmxYAnDt7uF0BxOwXL5Evc0kbxlmyxxZLFyY2CaXSDZkqKZROYJ4tnO/Tt56HEgckyJaraGNxlsVt2u6teHeF40s20EDo9oyGy+CPIYF1xULBt4H6kOZeFiwBZnOFi+wH0B1hk)

</div>

## Method Handlers {#method-handlers}

Ancak birçok olay handler’ının mantığı daha karmaşık olacaktır ve bu tür durumlar inline handler’lar ile genellikle uygun değildir. Bu nedenle `v-on`, çağırmak istediğiniz bir component metodunun adını veya yolunu da kabul eder.

Örneğin:

<div class="composition-api">

```js
const name = ref('Vue.js')

function greet(event) {
  alert(`Merhaba ${name.value}!`)
  // `event`, native DOM event nesnesidir
  if (event) {
    alert(event.target.tagName)
  }
}
```

</div>
<div class="options-api">

```js
data() {
  return {
    name: 'Vue.js'
  }
},
methods: {
  greet(event) {
    // metotlar içindeki `this`, mevcut aktif instance’ı işaret eder
    alert(`Merhaba ${this.name}!`)
    // `event`, native DOM event nesnesidir
    if (event) {
      alert(event.target.tagName)
    }
  }
}
```

</div>

```vue-html
<!-- `greet`, yukarıda tanımlanan metodun adıdır -->
<button @click="greet">Selamla</button>
```

<div class="composition-api">

[Playground'da İncele](https://play.vuejs.org/#eNpVj0FLxDAQhf/KMwjtXtq7dBcFQS/qzVMOrWFao2kSkkkvpf/dJIuCEBgm771vZnbx4H23JRJ3YogqaM+IxMlfpNWrd4GxI9CMA3NwK5psbaSVVjkbGXZaCediaJv3RN1XbE5FnZNVrJ3FEoi4pY0sn7BLC0yGArfjMxnjcLsXQrdNJtFxM+Ys0PcYa2CEjuBPylNYb4THtxdUobj0jH/YX3D963gKC5WyvGZ+xR7S5jf01yPzeblhWr2ZmErHw0dizivfK6PV91mKursUl6dSh/4qZ+vQ/+XE8QODonDi)

</div>
<div class="options-api">

[Playground'da İncele](https://play.vuejs.org/#eNplUE1LxDAQ/StjEbYL0t5LXRQEvag3Tz00prNtNE1CMilC6X83SUkRhJDJfLz3Jm8tHo2pFo9FU7SOW2Ho0in8MdoSDHhlXhKsnQIYGLHyvL8BLJK3KmcAis3YwOnDY/XlTnt1i2G7i/eMNOnBNRkwWkQqcUFFByVAXUNPk3A9COXEgBkGRgtFDkgDTQjcWxuAwDiJBeMsMcUxszCJlsr+BaXUcLtGwiqut930579KST1IBd5Aqlgie3p/hdTIk+IK//bMGqleEbMjxjC+BZVDIv0+m9CpcNr6MDgkhLORjDBm1H56Iq3ggUvBv++7IhnUFZfnGNt6b4fRtj5wxfYL9p+Sjw==)

</div>

Bir metot handler’ı, kendisini tetikleyen native DOM Event nesnesini otomatik olarak alır — yukarıdaki örnekte, `event.target` aracılığıyla olayı tetikleyen elemente erişebiliyoruz.

<div class="composition-api">

Ayrıca bakınız: [Event Handler’ların Tiplemesi](/guide/typescript/composition-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>
<div class="options-api">

Ayrıca bakınız: [Event Handler’ların Tiplemesi](/guide/typescript/options-api#typing-event-handlers) <sup class="vt-badge ts" />

</div>

### Metot vs Inline Tespiti {#method-vs-inline-detection}

Template compiler, `v-on` değerinin geçerli bir JavaScript tanımlayıcısı (identifier) veya özellik erişim yolu (property access path) olup olmadığını kontrol ederek metot handler’larını tespit eder. Örneğin `foo`, `foo.bar` ve `foo['bar']` metot handler olarak değerlendirilirken, `foo()` ve `count++` inline handler olarak değerlendirilir.

## Inline Handler’larda Metot Çağırma {#calling-methods-in-inline-handlers}

Doğrudan bir metot adına bağlamak yerine, inline handler içinde metotları da çağırabiliriz. Bu, native event yerine metoda özel argümanlar geçmemize olanak sağlar:

<div class="composition-api">

```js
function say(message) {
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  say(message) {
    alert(message)
  }
}
```

</div>

```vue-html
<button @click="say('hello')">Merhaba de</button>
<button @click="say('bye')">Güle güle de</button>
```

<div class="composition-api">

[Playground'da İncele](https://play.vuejs.org/#eNp9jTEOwjAMRa8SeSld6I5CBWdg9ZJGBiJSN2ocpKjq3UmpFDGx+Vn//b/ANYTjOxGcQEc7uyAqkqTQI98TW3ETq2jyYaQYzYNatSArZTzNUn/IK7Ludr2IBYTG4I3QRqKHJFJ6LtY7+zojbIXNk7yfmhahv5msvqS7PfnHGjJVp9w/hu7qKKwfEd1NSg==)

</div>
<div class="options-api">

[Playground'da İncele](https://play.vuejs.org/#eNptjUEKwjAQRa8yZFO7sfsSi57B7WzGdjTBtA3NVC2ldzehEFwIw8D7vM9f1cX742tmVSsd2sl6aXDgjx8ngY7vNDuBFQeAnsWMXagToQAEWg49h0APLncDAIUcT5LzlKJsqRBfPF3ljQjCvXcknEj0bRYZBzi3zrbPE6o0UBhblKiaKy1grK52J/oA//23IcmNBD8dXeVBtX0BF0pXsg==)

</div>

## Inline Handler’larda Event Argümanına Erişim {#accessing-event-argument-in-inline-handlers}

Bazen inline handler içinde orijinal DOM event’e de erişmemiz gerekir. Bunu, özel `$event` değişkenini kullanarak metoda geçirebilir veya inline arrow function kullanabiliriz:

```vue-html
<!-- özel `$event` değişkeni kullanılarak -->
<button @click="warn('Form henüz gönderilemez.', $event)">
  Gönder
</button>

<!-- inline arrow function kullanılarak -->
<button @click="(event) => warn('Form henüz gönderilemez.', event)">
  Gönder
</button>
```

<div class="composition-api">

```js
function warn(message, event) {
  // artık native event’e erişimimiz var
  if (event) {
    event.preventDefault()
  }
  alert(message)
}
```

</div>
<div class="options-api">

```js
methods: {
  warn(message, event) {
    // artık native event nesnesine erişimimiz var
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```

</div>

## Olay Değiştiricileri {#event-modifiers}

Olay işleyicileri içinde `event.preventDefault()` veya `event.stopPropagation()` çağırmak oldukça yaygın bir ihtiyaçtır. Bunu metotlar içinde kolayca yapabilsek de, metotların DOM event detaylarıyla uğraşmak yerine yalnızca veri mantığına odaklanması daha iyi olur.

Bu sorunu çözmek için Vue, `v-on` için **event değiştiricileri** sağlar. Hatırlarsanız, değiştiriciler nokta ile belirtilen direktif ekleridir.

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue-html
<!-- tıklama olayının yayılması durdurulur -->
<a @click.stop="doThis"></a>

<!-- form gönderme olayı artık sayfayı yeniden yüklemez -->
<form @submit.prevent="onSubmit"></form>

<!-- değiştiriciler zincirlenebilir -->
<a @click.stop.prevent="doThat"></a>

<!-- sadece değiştirici -->
<form @submit.prevent></form>

<!-- işleyiciler yalnızca event.target elementin kendisi olduğunda tetiklenir -->
<!-- yani bir alt elementten gelmez -->
<div @click.self="doThat">...</div>
```

::: tip
Değiştiriciler kullanılırken sıralama önemlidir, çünkü ilgili kod aynı sırayla oluşturulur. Bu nedenle `@click.prevent.self` kullanımı, **click’in varsayılan davranışını hem elementin kendisi hem de alt elementleri için engeller**, `@click.self.prevent` ise yalnızca elementin kendisi için click’in varsayılan davranışını engeller.
:::

`.capture`, `.once` ve `.passive` değiştiricileri, [native `addEventListener` metodunun seçeneklerini](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) yansıtır:

```vue-html
<!-- olay dinleyicisi eklenirken capture modu kullanılır -->
<!-- yani içteki bir elemana hedeflenen olay -->
<!-- önce burada işlenir, sonra o elemana geçer -->
<div @click.capture="doThis">...</div>

<!-- click olayı en fazla bir kez tetiklenir -->
<a @click.once="doThis"></a>

<!-- scroll olayının varsayılan davranışı (kaydırma) hemen gerçekleşir -->
<!-- onScroll tamamlanmasını beklemez -->
<!-- içinde event.preventDefault() olsa bile -->
<div @scroll.passive="onScroll">...</div>
```

`.passive` değiştiricisi genellikle mobil cihazlarda performansı artırmak için [touch event dinleyicileriyle birlikte](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#improving_scroll_performance_using_passive_listeners) kullanılır.

::: tip
`.passive` ve `.prevent` birlikte kullanılmamalıdır, çünkü `.passive` zaten tarayıcıya olayın varsayılan davranışını engellemeyi düşünmediğinizi bildirir ve bunu yaparsanız büyük olasılıkla tarayıcıdan bir uyarı alırsınız.
:::

## Tuş Değiştiricileri {#key-modifiers}

Klavye olaylarını dinlerken, genellikle belirli tuşları kontrol etmemiz gerekir. Vue, tuş olaylarını dinlerken `v-on` veya `@` için tuş değiştiricileri eklememize olanak tanır:

```vue-html
<!-- yalnızca `key` değeri `Enter` olduğunda `submit` çağrılır -->
<input @keyup.enter="submit" />
```

[`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values) üzerinden sağlanan geçerli tuş adlarını kebab-case’e dönüştürerek doğrudan değiştirici olarak kullanabilirsiniz.

```vue-html
<input @keyup.page-down="onPageDown" />
```

Yukarıdaki örnekte, handler yalnızca `$event.key` değeri `'PageDown'` olduğunda çağrılır.+

### Tuş Takma Adları {#key-aliases}

Vue, en sık kullanılan tuşlar için takma adlar sağlar:

- `.enter`
- `.tab`
- `.delete` ("Delete" ve "Backspace" tuşlarının her ikisini de kapsar)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

### Sistem Değiştirici Tuşlar {#system-modifier-keys}

Aşağıdaki değiştiricileri, mouse veya klavye olay dinleyicilerini yalnızca ilgili değiştirici tuş basılıyken tetiklemek için kullanabilirsiniz:

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

::: tip Note
Macintosh klavyelerde meta, command tuşudur (⌘). Windows klavyelerde meta, Windows tuşudur (⊞). Sun Microsystems klavyelerinde meta, dolu elmas (◆) ile gösterilir. MIT ve Lisp machine klavyeleri ile bunların devamı olan Knight keyboard ve space-cadet keyboard gibi bazı klavyelerde meta tuşu “META” olarak etiketlenir. Symbolics klavyelerinde ise meta “META” veya “Meta” olarak etiketlenir.
:::

Örneğin:

```vue-html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Bir şey yap</div>
```

::: tip
Modifier tuşlarının normal tuşlardan farklı olduğunu unutmayın ve `keyup` olaylarıyla kullanıldığında, olay tetiklendiği anda basılı olmaları gerekir. Başka bir deyişle, `keyup.ctrl` yalnızca Ctrl tuşuna basılı tutarken bir tuşu bıraktığınızda tetiklenir. Ctrl tuşunu tek başına bıraktığınızda tetiklenmez.
:::

### `.exact` Değiştiricisi {#exact-modifier}

`.exact` değiştiricisi, bir olayın tetiklenmesi için gereken sistem değiştiricilerinin tam kombinasyonunu kontrol etmenizi sağlar.

```vue-html
<!-- Alt veya Shift basılı olsa bile tetiklenir -->
<button @click.ctrl="onClick">A</button>

<!-- yalnızca Ctrl basılıyken ve başka hiçbir tuş basılı değilken tetiklenir -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- yalnızca hiçbir sistem değiştirici tuş basılı değilken tetiklenir -->
<button @click.exact="onClick">A</button>
```

## Mouse Düğmesi Değiştiricileri {#mouse-button-modifiers}

- `.left`
- `.right`
- `.middle`

Bu değiştiriciler, handler’ın yalnızca belirli bir mouse düğmesi tarafından tetiklenen olaylara tepki vermesini sağlar.

Ancak `.left,` `.right` ve `.middle` değiştirici adları fiziksel mouse tuşlarını birebir ifade etmez; yaygın sağ el düzenine göre tanımlanan “ana”, “ikincil” ve “yardımcı” işaretçi olaylarını temsil eder. Bu nedenle solak bir düzende ana düğme fiziksel olarak sağ tarafta olsa bile .left değiştiricisini tetikler. Benzer şekilde trackpad gibi farklı giriş aygıtlarında tek parmak dokunuş .left, iki parmak dokunuş .right, üç parmak dokunuş ise .middle olarak yorumlanabilir. Genel olarak bu olaylar, kullanılan cihazdan bağımsız şekilde sol/sağ gibi fiziksel konumlara değil, işlevsel rollere dayanır.
