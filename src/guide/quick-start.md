---
footer: false
---

<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# Hızlı Başlangıç {#quick-start}

## Vue'yu Çevrimiçi Deneyin {#try-vue-online}

- Vue'yu hızlıca tatmak için, doğrudan [Playground](https://play.vuejs.org/#eNo9jcEKwjAMhl/lt5fpQYfXUQfefAMvvRQbddC1pUuHUPrudg4HIcmXjyRZXEM4zYlEJ+T0iEPgXjn6BB8Zhp46WUZWDjCa9f6w9kAkTtH9CRinV4fmRtZ63H20Ztesqiylphqy3R5UYBqD1UyVAPk+9zkvV1CKbCv9poMLiTEfR2/IXpSoXomqZLtti/IFwVtA9A==) üzerinden deneyebilirsiniz.

- Herhangi bir derleme adımı olmadan düz bir HTML kurulumunu tercih ederseniz, başlangıç noktanız olarak bu [JSFiddle](https://jsfiddle.net/yyx990803/2ke1ab0z/)'ı kullanabilirsiniz.

- Node.js'e ve derleme araçları konseptine zaten aşinaysanız, doğrudan tarayıcınızın içinde, [StackBlitz](https://vite.new/vue) üzerinde eksiksiz bir derleme kurulumunu da deneyebilirsiniz.

- Önerilen kurulumun bir incelemesi için, size ilk Vue uygulamanızı nasıl çalıştıracağınızı, düzenleyeceğinizi ve dağıtacağınızı gösteren bu etkileşimli [Scrimba](http://scrimba.com/links/vue-quickstart) eğitimini izleyebilirsiniz.

## Bir Vue Uygulaması Oluşturmak {#creating-a-vue-application}

:::tip Ön Koşullar

- Komut satırı aşinalığı
- `^20.19.0 || >=22.12.0` sürümünde [Node.js](https://nodejs.org/) yükleyin
  :::

Bu bölümde, yerel makinenizde bir Vue [Tek Sayfalı Uygulama (Single Page Application)](/guide/extras/ways-of-using-vue#single-page-application-spa) taslağını nasıl oluşturacağınızı tanıtacağız. Oluşturulan proje, [Vite](https://vite.dev/) tabanlı bir derleme kurulumunu kullanacak ve Vue [Tek Dosyalı Bileşenler](/guide/scaling-up/sfc) (SFC'ler) (Single-File Components) kullanmamıza olanak tanıyacaktır.

Güncel bir [Node.js](https://nodejs.org/) sürümünün yüklü olduğundan ve mevcut çalışma dizininizin projeyi oluşturmak istediğiniz dizin olduğundan emin olun. Komut satırınızda aşağıdaki komutu (baştaki `$` işareti olmadan) çalıştırın:

::: code-group

```sh [npm]
$ npm create vue@latest
```

```sh [pnpm]
$ pnpm create vue@latest
```

```sh [yarn]
# Yarn (v1+) için
$ yarn create vue

# Modern Yarn (v2+) için
$ yarn create vue@latest

# Yarn ^v4.11 için
$ yarn dlx create-vue@latest
```

```sh [bun]
$ bun create vue@latest
```

:::

Bu komut, resmi Vue proje iskeleti oluşturma aracı olan [create-vue](https://github.com/vuejs/create-vue)'yu yükleyecek ve çalıştıracaktır. TypeScript ve test desteği gibi çeşitli isteğe bağlı özellikler için size birtakım sorular sunulacaktır:

<div class="language-sh"><pre><code><span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Project name: <span style="color:#888;">… <span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add TypeScript? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add JSX Support? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue Router for Single Page Application development? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Pinia for state management? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vitest for Unit testing? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add an End-to-End Testing Solution? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Cypress / Nightwatch / Playwright</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add ESLint for code quality? <span style="color:#888;">… No / <span style="color:#89DDFF;text-decoration:underline">Yes</span></span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Prettier for code formatting? <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span style="color:var(--vt-c-green);">✔</span> <span style="color:#A6ACCD;">Add Vue DevTools 7 extension for debugging? (experimental) <span style="color:#888;">… <span style="color:#89DDFF;text-decoration:underline">No</span> / Yes</span></span>
<span></span>
<span style="color:#A6ACCD;">Scaffolding project in ./<span style="color:#89DDFF;">&lt;</span><span style="color:#888;">your-project-name</span><span style="color:#89DDFF;">&gt;</span>...</span>
<span style="color:#A6ACCD;">Done.</span></code></pre></div>

Eğer bir seçenekten emin değilseniz, şimdilik enter tuşuna basarak `No` seçeneğini onaylayabilirsiniz. Proje oluşturulduktan sonra, bağımlılıkları yüklemek ve geliştirme sunucusunu (dev server) başlatmak için talimatları izleyin:

::: code-group

```sh-vue [npm]
$ cd {{'<your-project-name>'}}
$ npm install
$ npm run dev
```

```sh-vue [pnpm]
$ cd {{'<your-project-name>'}}
$ pnpm install
$ pnpm run dev
```

```sh-vue [yarn]
$ cd {{'<your-project-name>'}}
$ yarn
$ yarn dev
```

```sh-vue [bun]
$ cd {{'<your-project-name>'}}
$ bun install
$ bun run dev
```

:::

Artık ilk Vue projeniz çalışıyor olmalı! Oluşturulan projedeki örnek bileşenlerin, [Options API (Seçenekler API'si)](/guide/introduction#options-api) yerine [Composition API (Bileşim API'si)](/guide/introduction#composition-api) ve `<script setup>` kullanılarak yazıldığına dikkat edin. İşte bazı ek ipuçları:

- Önerilen IDE kurulumu [Visual Studio Code](https://code.visualstudio.com/) + [Vue - Official extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)'dır (Resmi Eklenti). Eğer diğer editörleri kullanıyorsanız, [IDE desteği bölümüne](/guide/scaling-up/tooling#ide-support) göz atın.
- Arka uç (backend) framework'leriyle entegrasyon da dahil olmak üzere araçlarla (tooling) ilgili daha fazla detay, [Araçlar Kılavuzu](/guide/scaling-up/tooling)'nda tartışılmıştır.
- Altta yatan derleme aracı Vite hakkında daha fazla bilgi edinmek için [Vite dokümanlarına](https://vite.dev/) göz atın.
- Eğer TypeScript kullanmayı seçerseniz, [TypeScript Kullanım Kılavuzu](typescript/overview)'na göz atın.

Uygulamanızı üretime (production) taşımaya hazır olduğunuzda, aşağıdakileri çalıştırın:

::: code-group

```sh [npm]
$ npm run build
```

```sh [pnpm]
$ pnpm run build
```

```sh [yarn]
$ yarn build
```

```sh [bun]
$ bun run build
```

:::

Bu, uygulamanızın projenin `./dist` dizininde üretime hazır bir derlemesini oluşturacaktır. Uygulamanızı üretime taşımakla ilgili daha fazla bilgi edinmek için [Üretim Dağıtım Kılavuzu](/guide/best-practices/production-deployment)'na göz atın.

[Sonraki Adımlar >](#next-steps)

## Vue'yu CDN'den Kullanmak {#using-vue-from-cdn}

Vue'yu doğrudan bir CDN üzerinden bir `script` etiketi aracılığıyla kullanabilirsiniz:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

Burada [unpkg](https://unpkg.com/) kullanıyoruz, ancak npm paketleri sunan herhangi bir CDN'yi (örneğin [jsdelivr](https://www.jsdelivr.com/package/npm/vue) veya [cdnjs](https://cdnjs.com/libraries/vue)) de kullanabilirsiniz. Elbette bu dosyayı indirip kendiniz de sunabilirsiniz.

Vue'yu bir CDN'den kullanırken işin içine bir "derleme adımı" girmez. Bu, kurulumu çok daha basit hale getirir ve statik HTML'yi geliştirmek veya bir arka uç framework'ü ile entegre olmak için uygundur. Ancak, Tek Dosyalı Bileşen (SFC) sözdizimini (syntax) kullanamazsınız.

### Global Derlemeyi Kullanmak {#using-the-global-build}

Yukarıdaki bağlantı, tüm üst düzey API'lerin global `Vue` nesnesi üzerinde özellikler (properties) olarak sunulduğu Vue _global derlemesini_ yükler. İşte global derlemeyi kullanan eksiksiz bir örnek:

<div class="options-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Merhaba Vue!'
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demosu >](https://codepen.io/vuejs-examples/pen/QWJwJLp)

</div>

<div class="composition-api">

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Merhaba Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demosu >](https://codepen.io/vuejs-examples/pen/eYQpQEG)

:::tip
Kılavuz boyunca Composition API'ye dair örneklerin çoğu, derleme araçları gerektiren `<script setup>` sözdizimini kullanacaktır. Eğer Composition API'yi bir derleme adımı olmadan kullanmayı planlıyorsanız, [`setup()` seçeneğinin](/api/composition-api-setup) kullanımını inceleyin.
:::

</div>

### ES Modülü Derlemesini Kullanmak {#using-the-es-module-build}

Dokümantasyonun geri kalanı boyunca, öncelikle [ES modülleri](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) sözdizimini kullanacağız. Çoğu modern tarayıcı artık ES modüllerini yerel (native) olarak desteklemektedir, bu nedenle Vue'yu bir CDN'den yerel ES modülleri aracılığıyla şu şekilde kullanabiliriz:

<div class="options-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    data() {
      return {
        message: 'Merhaba Vue!'
      }
    }
  }).mount('#app')
</script>
```

</div>

<div class="composition-api">

```html{3,4}
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  createApp({
    setup() {
      const message = ref('Merhaba Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

</div>

`<script type="module">` kullandığımıza ve içe aktarılan CDN URL'sinin bunun yerine Vue'nun **ES modülleri derlemesini** işaret ettiğine dikkat edin.

<div class="options-api">

[CodePen Demosu >](https://codepen.io/vuejs-examples/pen/VwVYVZO)

</div>
<div class="composition-api">

[CodePen Demosu >](https://codepen.io/vuejs-examples/pen/MWzazEv)

</div>

### Import Maps'i Etkinleştirmek {#enabling-import-maps}

Yukarıdaki örnekte tam CDN URL'sinden import yapıyoruz, ancak dokümantasyonun geri kalanında şuna benzer kodlar göreceksiniz:

```js
import { createApp } from 'vue'
```

[Import Maps (İçe Aktarma Haritaları)](https://caniuse.com/import-maps) kullanarak tarayıcıya `vue` içe aktarımını nerede bulacağını öğretebiliriz:

<div class="options-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp } from 'vue'

  createApp({
    data() {
      return {
        message: 'Merhaba Vue!'
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demosu >](https://codepen.io/vuejs-examples/pen/wvQKQyM)

</div>

<div class="composition-api">

```html{1-7,12}
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue'

  createApp({
    setup() {
      const message = ref('Merhaba Vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```

[CodePen Demosu >](https://codepen.io/vuejs-examples/pen/YzRyRYM)

</div>

Ayrıca içe aktarma haritasına diğer bağımlılıklar için kayıtlar da ekleyebilirsiniz - ancak bunların, kullanmayı planladığınız kütüphanenin ES modülleri sürümünü işaret ettiğinden emin olun.

:::tip Import Maps Tarayıcı Desteği
Import Maps, nispeten yeni bir tarayıcı özelliğidir. [Destek aralığındaki (support range)](https://caniuse.com/import-maps) bir tarayıcıyı kullandığınızdan emin olun. Özellikle, yalnızca Safari 16.4+ sürümlerinde desteklenmektedir.
:::

:::warning Üretimde Kullanım İle İlgili Notlar
Şu ana kadarki örneklerde Vue'nun geliştirme derlemesi (development build) kullanılmıştır - eğer Vue'yu üretimde bir CDN'den kullanmayı planlıyorsanız, [Üretim Dağıtım Kılavuzu](/guide/best-practices/production-deployment#without-build-tools)'na göz atmayı unutmayın.

Vue'yu bir derleme sistemi olmadan kullanmak mümkün olsa da, göz önünde bulundurulabilecek alternatif bir yaklaşım, (geçmişte) [`jquery/jquery`](https://github.com/jquery/jquery) veya (günümüzde) [`alpinejs/alpine`](https://github.com/alpinejs/alpine) kütüphanelerinin kullanılabileceği bağlamlara daha uygun olabilecek [`vuejs/petite-vue`](https://github.com/vuejs/petite-vue) kullanmaktır.
:::

### Modülleri Bölmek {#splitting-up-the-modules}

Kılavuzda derinleştikçe, kodumuzu yönetilmesi daha kolay olacak şekilde ayrı JavaScript dosyalarına bölmemiz gerekebilir. Örneğin:

```html [index.html]
<div id="app"></div>

<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'

  createApp(MyComponent).mount('#app')
</script>
```

<div class="options-api">

```js [my-component.js]
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>Sayı: {{ count }}</div>`
}
```

</div>
<div class="composition-api">

```js [my-component.js]
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(0)
    return { count }
  },
  template: `<div>Sayı: {{ count }}</div>`
}
```

</div>

Yukarıdaki `index.html` dosyasını doğrudan tarayıcınızda açarsanız, bir hata verdiğini göreceksiniz; çünkü ES modülleri `file://` protokolü üzerinden çalışamaz. Bu protokol, tarayıcının yerel bir dosyayı açtığında kullandığı protokoldür.

Güvenlik nedenleriyle, ES modülleri yalnızca `http://` protokolü üzerinden çalışabilir. Bu, tarayıcıların web'deki sayfaları açarken kullandığı protokoldür. ES modüllerinin yerel makinemizde çalışabilmesi için, `index.html` dosyasını `http://` protokolü üzerinden yerel bir HTTP sunucusu ile sunmamız (serve etmemiz) gerekir.

Yerel bir HTTP sunucusu başlatmak için öncelikle [Node.js](https://nodejs.org/en/)'in yüklü olduğundan emin olun, ardından HTML dosyanızla aynı dizinde komut satırından `npx serve` komutunu çalıştırın. Doğru MIME türlerine sahip statik dosyaları sunabilen başka herhangi bir HTTP sunucusu da kullanabilirsiniz.

İçe aktarılan bileşenin (component) şablonunun (template) satır içi (inlined) bir JavaScript dizesi (string) olarak bulunduğunu fark etmiş olabilirsiniz. Eğer VS Code kullanıyorsanız, [es6-string-html](https://marketplace.visualstudio.com/items?itemName=Tobermory.es6-string-html) eklentisini yükleyebilir ve bu dizeler için sözdizimi vurgulaması (syntax highlighting) almak üzere onların başına bir `/*html*/` yorumu ekleyebilirsiniz.

## Sonraki Adımlar {#next-steps}

Eğer [Giriş](/guide/introduction) bölümünü atladıysanız, dokümantasyonun geri kalanına geçmeden önce onu okumanızı şiddetle tavsiye ederiz.

<div class="vt-box-container next-steps">
  <a class="vt-box" href="/guide/essentials/application.html">
    <p class="next-steps-link">Kılavuza Devam Edin</p>
    <p class="next-steps-caption">Kılavuz, framework'ün her yönünü tüm ayrıntılarıyla anlatır.</p>
  </a>
  <a class="vt-box" href="/tutorial/">
    <p class="next-steps-link">Eğiticiyi Deneyin</p>
    <p class="next-steps-caption">Kavramları uygulamalı bir şekilde öğrenmeyi tercih edenler için.</p>
  </a>
  <a class="vt-box" href="/examples/">
    <p class="next-steps-link">Örneklere Göz Atın</p>
    <p class="next-steps-caption">Temel özellikleri ve yaygın arayüz görevlerine dair örnekleri keşfedin.</p>
  </a>
</div>
