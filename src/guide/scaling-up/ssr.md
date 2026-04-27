---
outline: deep
---

# Sunucu Tarafında Render (SSR) {#server-side-rendering-ssr}

## Genel Bakış {#overview}

### SSR Nedir? {#what-is-ssr}

Vue.js, istemci tarafı uygulamalar geliştirmek için bir framework'tür. Varsayılan olarak Vue bileşenleri tarayıcıda DOM üretir ve manipüle eder. Ancak aynı bileşenleri sunucuda HTML dizelerine render edip doğrudan tarayıcıya göndermek ve sonrasında bu statik işaretlemeyi istemcide tam etkileşimli bir uygulamaya "hydrate" etmek de mümkündür.

Sunucuda render edilen bir Vue.js uygulaması, kodun büyük kısmı hem sunucuda **hem de** istemcide çalıştığı için "izomorfik" veya "evrensel" olarak da adlandırılabilir.

### Neden SSR? {#why-ssr}

İstemci tarafı Tek Sayfalık Uygulamaya (SPA) kıyasla SSR'nin başlıca avantajları şunlardır:

- **Daha kısa içeriğe erişim süresi (time-to-content)**: Bu avantaj, yavaş internet bağlantısı veya yavaş cihazlarda daha belirgin hale gelir. Sunucuda render edilen işaretlemenin gösterilmesi için tüm JavaScript'in indirilip çalıştırılmasını beklemek gerekmez; kullanıcı tam render edilmiş sayfayı daha erken görür. Ayrıca ilk ziyaret için veri çekme işlemi sunucu tarafında yapılır; sunucunun veritabanına bağlantısı genellikle istemciden daha hızlıdır. Bu durum [Core Web Vitals](https://web.dev/vitals/) metriklerini iyileştirir, kullanıcı deneyimini artırır ve içeriğe erişim süresinin dönüşüm oranıyla doğrudan ilişkili olduğu uygulamalar için kritik olabilir.

- **Birleşik zihinsel model**: Bir arka uç şablon sistemi ile bir ön yüz framework'ü arasında gidip gelmek yerine, tüm uygulamanızı geliştirirken aynı dili ve aynı bildirimsel, bileşen odaklı zihinsel modeli kullanırsınız.

- **Daha iyi SEO**: Arama motoru tarayıcıları (crawler) doğrudan tam render edilmiş sayfayı görür.

  :::tip
  Günümüzde Google ve Bing, senkron JavaScript uygulamalarını sorunsuz şekilde indeksleyebiliyor. Buradaki anahtar kelime senkron. Uygulamanız bir yükleme animasyonuyla (spinner) başlıyor ve sonrasında Ajax ile içerik çekiyorsa, tarayıcı sizi beklemez. Bu nedenle SEO'nun önemli olduğu sayfalarda içeriği asenkron olarak çekiyorsanız SSR gerekli olabilir.
  :::

SSR kullanırken göz önünde bulundurulması gereken bazı dengeler de vardır:

- Geliştirme kısıtları. Tarayıcıya özgü kodlar yalnızca belirli yaşam döngüsü kancalarında kullanılabilir; bazı harici kütüphaneler sunucu tarafında render edilen bir uygulamada çalışabilmek için özel işlem gerektirebilir.

- Daha karmaşık derleme kurulumu ve dağıtım gereksinimleri. Herhangi bir statik dosya sunucusuna dağıtılabilen tamamen statik bir SPA'nın aksine, sunucuda render edilen bir uygulama Node.js sunucusunun çalışabileceği bir ortam gerektirir.

- Daha fazla sunucu yükü. Tam bir uygulamayı Node.js üzerinde render etmek, yalnızca statik dosya sunmaktan daha fazla CPU gerektirecektir; yüksek trafik bekliyorsanız buna uygun sunucu yüküne hazırlıklı olun ve önbellek (caching) stratejilerini akıllıca kullanın.

Uygulamanız için SSR'yi kullanmadan önce sormanız gereken ilk soru, gerçekten ihtiyacınız olup olmadığıdır. Bu büyük ölçüde içeriğe erişim süresinin uygulamanız için ne kadar önemli olduğuna bağlıdır. Örneğin, ilk yüklemede birkaç yüz milisaniye ekstra sürenin önemli olmadığı dahili bir panel geliştiriyorsanız SSR fazladan bir maliyet olur. Ancak içeriğe erişim süresinin kesinlikle kritik olduğu durumlarda SSR, en iyi ilk yükleme performansını elde etmenize yardımcı olabilir.

### SSR ile SSG Karşılaştırması {#ssr-vs-ssg}

**Statik Site Üretimi (SSG)**, ön render (pre-rendering) olarak da bilinir ve hızlı web siteleri oluşturmak için sıkça kullanılan bir başka tekniktir. Bir sayfayı sunucuda render etmek için gereken veri her kullanıcı için aynıysa, sayfayı her istek geldiğinde yeniden render etmek yerine, derleme (build) sürecinde bir kere ve önceden render edebiliriz. Ön render edilen sayfalar statik HTML dosyaları olarak üretilir ve sunulur.

SSG, SSR uygulamalarıyla aynı performans özelliklerini korur: mükemmel bir içeriğe erişim süresi sağlar. Aynı zamanda çıktı statik HTML ve statik dosyalardan oluştuğu için SSR uygulamalarına kıyasla daha ucuz ve daha kolay dağıtılır. Buradaki anahtar kelime **statik**: SSG yalnızca statik veri sağlayan sayfalara uygulanabilir; yani derleme zamanında bilinen ve istekler arasında değişmeyen veriler. Veri her değiştiğinde yeni bir dağıtım yapmak gerekir.

SSR'yi yalnızca birkaç pazarlama sayfasının (örn. `/`, `/about`, `/contact` vb.) SEO'sunu iyileştirmek için araştırıyorsanız, büyük ihtimalle SSR yerine SSG istiyorsunuzdur. SSG; dokümantasyon siteleri veya bloglar gibi içerik odaklı web siteleri için de oldukça uygundur. Nitekim şu an okuduğunuz bu site, Vue tabanlı bir statik site üreticisi olan [VitePress](https://vitepress.dev/) kullanılarak statik olarak üretilmiştir.

## Temel Eğitim {#basic-tutorial}

### Uygulama Render Etmek {#rendering-an-app}

Vue SSR'nin en sade örneğine bakalım.

1. Yeni bir dizin oluşturun ve içine `cd` yapın
2. `npm init -y` komutunu çalıştırın
3. Node.js'in [ES modül modunda](https://nodejs.org/api/esm.html#modules-ecmascript-modules) çalışması için `package.json` dosyasına `"type": "module"` ekleyin.
4. `npm install vue` komutunu çalıştırın
5. Bir `example.js` dosyası oluşturun:

```js
// bu kod sunucuda Node.js üzerinde çalışır.
import { createSSRApp } from 'vue'
// Vue'nun sunucu tarafında render API'si `vue/server-renderer` altından sağlanır.
import { renderToString } from 'vue/server-renderer'

const app = createSSRApp({
  data: () => ({ count: 1 }),
  template: `<button @click="count++">{{ count }}</button>`
})

renderToString(app).then((html) => {
  console.log(html)
})
```

Ardından şunu çalıştırın:

```sh
> node example.js
```

Komut satırına şu çıktı yazdırılmalıdır:

```
<button>1</button>
```

[`renderToString()`](/api/ssr#rendertostring) fonksiyonu bir Vue uygulama örneği alır ve uygulamanın render edilmiş HTML'ine çözümlenen bir Promise döner. [Node.js Stream API'si](https://nodejs.org/api/stream.html) veya [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API) ile akış (stream) şeklinde render etmek de mümkündür. Tüm ayrıntılar için [SSR API Referansına](/api/ssr) bakın.

Vue SSR kodunu daha sonra bir sunucu istek işleyicisine taşıyabilir ve uygulamanın işaretlemesini tam sayfa HTML'i ile sarmalayabiliriz. Sonraki adımlarda [`express`](https://expressjs.com/) kullanacağız:

- `npm install express` komutunu çalıştırın
- Aşağıdaki `server.js` dosyasını oluşturun:

```js
import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

const server = express()

server.get('/', (req, res) => {
  const app = createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

server.listen(3000, () => {
  console.log('ready')
})
```

Son olarak `node server.js` komutunu çalıştırın ve `http://localhost:3000` adresini ziyaret edin. Sayfanın düğme ile birlikte çalıştığını görmelisiniz.

[StackBlitz üzerinde deneyin](https://stackblitz.com/fork/vue-ssr-example-basic?file=index.js)

### İstemci Tarafı Hydration {#client-hydration}

Düğmeye tıkladığınızda sayının değişmediğini fark edeceksiniz. Tarayıcıda Vue'yu yüklemediğimiz için HTML istemcide tamamen statiktir.

İstemci tarafı uygulamasını etkileşimli hale getirmek için Vue'nun **hydration** adımını gerçekleştirmesi gerekir. Hydration sırasında Vue, sunucuda çalıştırılan uygulamanın aynısını oluşturur, her bileşeni kontrol etmesi gereken DOM düğümleriyle eşler ve DOM olay dinleyicilerini ekler.

Bir uygulamayı hydration modunda mount etmek için `createApp()` yerine [`createSSRApp()`](/api/application#createssrapp) kullanmamız gerekir:

```js{2}
// bu kod tarayıcıda çalışır.
import { createSSRApp } from 'vue'

const app = createSSRApp({
  // ...sunucudakiyle aynı uygulama
})

// bir SSR uygulamasını istemcide mount etmek,
// HTML'in önceden render edildiğini varsayar ve
// yeni DOM düğümleri oluşturmak yerine hydration gerçekleştirir.
app.mount('#app')
```

### Kod Yapısı {#code-structure}

Sunucudakiyle aynı uygulama kodunu nasıl yeniden kullandığımıza dikkat edin. İşte SSR uygulamalarında kod yapısını düşünmeye başlamamız gereken yer burası — aynı uygulama kodunu sunucu ve istemci arasında nasıl paylaşırız?

Burada en sade kurulumu göstereceğiz. Önce uygulama oluşturma mantığını `app.js` adlı ayrı bir dosyaya taşıyalım:

```js [app.js]
// (sunucu ve istemci arasında paylaşılır)
import { createSSRApp } from 'vue'

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
}
```

Bu dosya ve bağımlılıkları sunucu ile istemci arasında paylaşılır — bunlara **evrensel kod (universal code)** diyoruz. Evrensel kod yazarken dikkat etmeniz gereken bazı noktalar vardır; bunları [aşağıda](#writing-ssr-friendly-code) ele alacağız.

İstemci giriş dosyamız evrensel kodu içe aktarır, uygulamayı oluşturur ve mount işlemini gerçekleştirir:

```js [client.js]
import { createApp } from './app.js'

createApp().mount('#app')
```

Sunucu ise istek işleyicisi içinde aynı uygulama oluşturma mantığını kullanır:

```js{2,5} [server.js]
// (ilgisiz kod çıkarılmıştır)
import { createApp } from './app.js'

server.get('/', (req, res) => {
  const app = createApp()
  renderToString(app).then(html => {
    // ...
  })
})
```

Ayrıca istemci dosyalarını tarayıcıda yükleyebilmek için şunları da yapmamız gerekir:

1. `server.js` içine `server.use(express.static('.'))` ekleyerek istemci dosyalarını sunun.
2. HTML iskeletine `<script type="module" src="/client.js"></script>` ekleyerek istemci giriş dosyasını yükleyin.
3. Tarayıcıda `import * from 'vue'` gibi kullanımları destekleyebilmek için HTML iskeletine bir [Import Map](https://github.com/WICG/import-maps) ekleyin.

[Tamamlanmış örneği StackBlitz üzerinde deneyin](https://stackblitz.com/fork/vue-ssr-example?file=index.js). Düğme artık etkileşimli!

## Daha Üst Seviye Çözümler {#higher-level-solutions}

Örnekten üretime hazır bir SSR uygulamasına geçmek çok daha fazlasını içerir. Şunları yapmamız gerekir:

- Vue Tek Dosyalı Bileşenleri (Single File Components - SFC) ve diğer derleme adımı gereksinimlerini desteklemek. Aslında aynı uygulama için iki derlemeyi koordine etmemiz gerekir: biri istemci için, diğeri sunucu için.

  :::tip
  Vue bileşenleri SSR için kullanıldığında farklı şekilde derlenir — daha verimli render performansı için şablonlar, Sanal DOM render fonksiyonları yerine dize birleştirmelerine (string concatenation) derlenir.
  :::

- Sunucu istek işleyicisinde HTML'i doğru istemci tarafı varlık linkleri ve en uygun kaynak ipuçlarıyla (resource hints) render etmek. SSR ve SSG modu arasında geçiş yapmamız veya hatta aynı uygulamada ikisini bir arada kullanmamız da gerekebilir.

- Yönlendirme (routing), veri çekme ve durum yönetimi (state management) store'larını evrensel bir şekilde yönetmek.

Tam bir uygulama oldukça karmaşık olabilir ve seçtiğiniz derleme araç zincirine bağlıdır. Bu nedenle karmaşıklığı sizin için soyutlayan, daha üst seviye ve belirli tercihler sunan bir çözümle ilerlemenizi şiddetle öneririz. Aşağıda Vue ekosisteminde önerilen birkaç SSR çözümünü tanıtacağız.

### Nuxt {#nuxt}

[Nuxt](https://nuxt.com/), evrensel Vue uygulamaları yazmak için akıcı bir geliştirme deneyimi sunan, Vue ekosisteminin üzerine inşa edilmiş daha üst seviye bir framework'tür. Dahası, onu bir statik site üreticisi olarak da kullanabilirsiniz! Denemenizi şiddetle öneririz.

### Quasar {#quasar}

[Quasar](https://quasar.dev), tek bir kod tabanı kullanarak SPA, SSR, PWA, mobil uygulama, masaüstü uygulaması ve tarayıcı eklentisi gibi birçok hedefe yönelik çalışmanıza olanak tanıyan, Vue tabanlı eksiksiz bir çözümdür. Yalnızca derleme kurulumunu değil, aynı zamanda Material Design ile uyumlu eksiksiz bir UI bileşen koleksiyonunu da sunar.

### Vite SSR {#vite-ssr}

Vite, [Vue sunucu tarafı render desteğini](https://vite.dev/guide/ssr.html) yerleşik olarak sunar ancak bilinçli şekilde alt seviyedir. Doğrudan Vite ile ilerlemek istiyorsanız, birçok zorlu ayrıntıyı sizin için soyutlayan topluluk eklentisi [vite-plugin-ssr](https://vite-plugin-ssr.com/)'ye göz atın.

Manuel kurulum kullanılan bir Vue + Vite SSR örnek projesini [burada](https://github.com/vitejs/vite-plugin-vue/tree/main/playground/ssr-vue) da bulabilir ve üzerine inşa edebileceğiniz bir temel olarak kullanabilirsiniz. Bunun yalnızca SSR / derleme araçlarında deneyimliyseniz ve üst seviye mimari üzerinde tam kontrol sahibi olmak istiyorsanız önerildiğini unutmayın.

## SSR Uyumlu Kod Yazmak {#writing-ssr-friendly-code}

Derleme kurulumunuz veya üst seviye framework seçiminiz ne olursa olsun, tüm Vue SSR uygulamalarında geçerli bazı ilkeler vardır.

### Sunucuda Tepkisellik {#reactivity-on-the-server}

SSR sırasında her istek URL'si uygulamamızın arzu edilen bir durumuna eşlenir. Kullanıcı etkileşimi ve DOM güncellemeleri olmadığı için sunucuda tepkisellik gereksizdir. Daha iyi performans için tepkisellik SSR sırasında varsayılan olarak devre dışıdır.

### Bileşen Yaşam Döngüsü Kancaları {#component-lifecycle-hooks}

Dinamik güncellemeler olmadığı için <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> veya <span class="options-api">`updated`</span><span class="composition-api">`onUpdated`</span> gibi yaşam döngüsü kancaları SSR sırasında **çağrılmaz**; yalnızca istemcide çalıştırılır.<span class="options-api"> SSR sırasında çağrılan tek kancalar `beforeCreate` ve `created`'dir.</span>

<span class="options-api">`beforeCreate` ve `created`</span><span class="composition-api">`setup()` veya `<script setup>` kök kapsamında</span> temizlik gerektiren yan etkiler üreten kodlardan kaçınmalısınız. Bu tür yan etkilerin bir örneği, `setInterval` ile zamanlayıcı kurmaktır. Yalnızca istemci tarafı kodunda bir zamanlayıcı kurup ardından <span class="options-api">`beforeUnmount`</span><span class="composition-api">`onBeforeUnmount`</span> veya <span class="options-api">`unmounted`</span><span class="composition-api">`onUnmounted`</span> içinde sonlandırabiliriz. Ancak unmount kancaları SSR sırasında asla çağrılmayacağı için zamanlayıcılar sonsuza kadar kalır. Bundan kaçınmak için yan etki kodunuzu <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> içine taşıyın.

### Platforma Özel API'lere Erişim {#access-to-platform-specific-apis}

Evrensel kod, platforma özel API'lere erişimi varsayamaz; bu nedenle kodunuz doğrudan `window` veya `document` gibi yalnızca tarayıcıya ait globalleri kullanıyorsa, Node.js'te çalıştırıldığında hata verir; tersi de geçerlidir.

Sunucu ve istemci arasında paylaşılan ancak farklı platform API'leri olan görevler için, platforma özel uygulamaları evrensel bir API içinde sarmalamanız veya bunu sizin için yapan kütüphaneleri kullanmanız önerilir. Örneğin, hem sunucuda hem istemcide aynı fetch API'sini kullanmak için [`node-fetch`](https://github.com/node-fetch/node-fetch) kullanabilirsiniz.

Yalnızca tarayıcıya özgü API'ler için yaygın yaklaşım, onları <span class="options-api">`mounted`</span><span class="composition-api">`onMounted`</span> gibi yalnızca istemci tarafında çalışan yaşam döngüsü kancaları içinde tembel (lazy) olarak kullanmaktır.

Üçüncü taraf bir kütüphane evrensel kullanımı düşünülerek yazılmamışsa, onu sunucuda render edilen bir uygulamaya entegre etmek zor olabilir. Bazı globalleri taklit ederek (mock) çalışmasını sağlayabilirsiniz _belki_ ama bu çözüm hacklemeye yakın olur ve diğer kütüphanelerin ortam tespit kodlarıyla çakışabilir.

### İstekler Arası Durum Kirlenmesi {#cross-request-state-pollution}

Durum Yönetimi bölümünde [Tepkisellik API'leri ile basit bir durum yönetimi deseni](state-management#simple-state-management-with-reactivity-api) tanıtmıştık. SSR bağlamında bu desen bazı ek düzenlemeler gerektirir.

Bu desen, paylaşılan durumu bir JavaScript modülünün kök kapsamında tanımlar. Bu da onları **singleton** yapar; yani uygulamamızın tüm yaşam döngüsü boyunca tepkisel nesnenin yalnızca bir örneği bulunur. Uygulamamızdaki modüller her tarayıcı sayfa ziyaretinde baştan başlatıldığı için bu, saf bir istemci tarafı Vue uygulamasında beklendiği gibi çalışır.

Ancak SSR bağlamında uygulama modülleri genellikle sunucu açılışında yalnızca bir kez başlatılır. Aynı modül örnekleri birden fazla sunucu isteği arasında yeniden kullanılır; singleton durum nesneleri de öyle. Paylaşılan singleton durumunu bir kullanıcıya özgü verilerle değiştirirsek, bu yanlışlıkla başka bir kullanıcının isteğine sızabilir. Buna **istekler arası durum kirlenmesi (cross-request state pollution)** diyoruz.

Teknik olarak, tarayıcılarda olduğu gibi her istekte tüm JavaScript modüllerini yeniden başlatabiliriz. Ancak JavaScript modüllerini başlatmak maliyetli olabilir, bu da sunucu performansını önemli ölçüde etkiler.

Önerilen çözüm, her istekte router ve global store'lar dahil tüm uygulamanın yeni bir örneğini oluşturmaktır. Ardından paylaşılan durumu bileşenlerde doğrudan içe aktarmak yerine [uygulama düzeyinde provide](/guide/components/provide-inject#app-level-provide) ile sağlarız ve ihtiyaç duyan bileşenlere inject ederiz:

```js [app.js]
// (sunucu ve istemci arasında paylaşılır)
import { createSSRApp } from 'vue'
import { createStore } from './store.js'

// her istekte çağrılır
export function createApp() {
  const app = createSSRApp(/* ... */)
  // her istek için store'un yeni örneğini oluştur
  const store = createStore(/* ... */)
  // store'u uygulama düzeyinde provide et
  app.provide('store', store)
  // store'u hydration için de dışa aç
  return { app, store }
}
```

Pinia gibi Durum Yönetimi kütüphaneleri bu göz önünde bulundurularak tasarlanmıştır. Ayrıntılar için [Pinia'nın SSR rehberine](https://pinia.vuejs.org/ssr/) bakın.

### Hydration Uyuşmazlığı {#hydration-mismatch}

Önceden render edilmiş HTML'in DOM yapısı istemci tarafı uygulamasının beklenen çıktısıyla eşleşmezse, hydration uyuşmazlığı (mismatch) hatası oluşur. Hydration uyuşmazlığı en yaygın olarak şu nedenlerden kaynaklanır:

1. Şablon geçersiz bir HTML iç içe yapısı içeriyor ve render edilen HTML tarayıcının yerel HTML ayrıştırma davranışı tarafından "düzeltildi". Örneğin yaygın bir tuzak, [`<div>`'in `<p>` içine yerleştirilememesidir](https://stackoverflow.com/questions/8397852/why-cant-the-p-tag-contain-a-div-tag-inside-it):

   ```html
   <p><div>hi</div></p>
   ```

   Bunu sunucuda render ettiğimiz HTML'de üretirsek, tarayıcı `<div>` ile karşılaştığında ilk `<p>`'yi sonlandırır ve şöyle bir DOM yapısına ayrıştırır:

   ```html
   <p></p>
   <div>hi</div>
   <p></p>
   ```

2. Render sırasında kullanılan veri rastgele üretilmiş değerler içeriyor. Aynı uygulama iki kez çalıştırılacağı için — biri sunucuda, biri istemcide — rastgele değerlerin iki çalıştırma arasında aynı olacağının garantisi yoktur. Rastgele değerlerin neden olduğu uyuşmazlıklardan kaçınmanın iki yolu vardır:

   1. Rastgele değerlere bağlı kısmı yalnızca istemcide render etmek için `v-if` + `onMounted` kullanın. Framework'ünüz de bunu kolaylaştıracak yerleşik özellikler sunabilir; örneğin VitePress'teki `<ClientOnly>` bileşeni.

   2. Tohum (seed) ile üretmeyi destekleyen bir rastgele sayı üreteci kütüphanesi kullanın ve sunucu ile istemci çalıştırmalarının aynı tohumu kullandığından emin olun (örn. tohumu serileştirilmiş durumda dahil edip istemcide geri okuyarak).

3. Sunucu ile istemci farklı zaman dilimlerinde. Bazen bir zaman damgasını kullanıcının yerel saatine çevirmek isteyebiliriz. Ancak sunucu çalıştırma sırasındaki zaman dilimi ile istemci çalıştırma sırasındaki zaman dilimi her zaman aynı olmayabilir ve sunucu çalıştırma sırasında kullanıcının zaman dilimini güvenilir biçimde bilemeyebiliriz. Bu gibi durumlarda yerel saat dönüşümü de yalnızca istemcide yapılacak bir işlem olarak gerçekleştirilmelidir.

Vue bir hydration uyuşmazlığıyla karşılaştığında otomatik olarak kurtarmaya ve önceden render edilen DOM'u istemci tarafı durumuyla eşleşecek şekilde ayarlamaya çalışır. Yanlış düğümlerin atılıp yeni düğümlerin mount edilmesi nedeniyle bir miktar render performansı kaybı yaşanır ama çoğu durumda uygulama beklendiği gibi çalışmaya devam eder. Yine de hydration uyuşmazlıklarını geliştirme aşamasında ortadan kaldırmak en iyisidir.

#### Hydration Uyuşmazlıklarını Bastırma <sup class="vt-badge" data-text="3.5+" /> {#suppressing-hydration-mismatches}

Vue 3.5+ sürümünde, kaçınılmaz hydration uyuşmazlıklarını [`data-allow-mismatch`](/api/ssr#data-allow-mismatch) özniteliğini kullanarak seçici biçimde bastırmak mümkündür.

### Özel Yönerge {#custom-directives}

Çoğu özel direktif doğrudan DOM manipülasyonu içerdiği için SSR sırasında yok sayılır. Ancak özel bir direktifin nasıl render edileceğini (yani render edilen elemana hangi öznitelikleri eklemesi gerektiğini) belirtmek istiyorsanız, `getSSRProps` direktif kancasını kullanabilirsiniz:

```js
const myDirective = {
  mounted(el, binding) {
    // istemci tarafı uygulama:
    // DOM'u doğrudan güncelle
    el.id = binding.value
  },
  getSSRProps(binding) {
    // sunucu tarafı uygulama:
    // render edilecek props'ları döndür.
    // getSSRProps yalnızca direktif binding'ini alır.
    return {
      id: binding.value
    }
  }
}
```

### Teleport'lar {#teleports}

Teleport'lar SSR sırasında özel işlem gerektirir. Render edilen uygulama Teleport içeriyorsa, ışınlanan içerik render edilen dizenin bir parçası olmaz. Daha kolay bir çözüm, Teleport'u mount sırasında koşullu olarak render etmektir.

Işınlanan içeriği hydrate (etkileşimli hale getirme) etmeniz gerekiyorsa, bunlar ssr bağlam nesnesinin `teleports` özelliği altında sunulur:

```js
const ctx = {}
const html = await renderToString(app, ctx)

console.log(ctx.teleports) // { '#teleported': 'teleported content' }
```

Teleport işaretlemesini, ana uygulama işaretlemesini enjekte etmeniz gerektiği gibi, son sayfa HTML'inizde doğru konuma enjekte etmeniz gerekir.

:::tip
Teleport'ları SSR ile birlikte kullanırken `body`'yi hedeflemekten kaçının — genellikle `<body>` sunucuda render edilen başka içerikler de barındırır; bu da Teleport'ların hydration için doğru başlangıç konumunu belirlemesini imkânsız hale getirir.

Bunun yerine yalnızca ışınlanan içeriği barındıran özel bir kapsayıcıyı, örneğin `<div id="teleported"></div>`, tercih edin.
:::
