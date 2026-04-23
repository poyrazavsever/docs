<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>
<style>
.lambdatest {
  background-color: var(--vt-c-bg-soft);
  border-radius: 8px;
  padding: 12px 16px 12px 12px;
  font-size: 13px;
  a {
    display: flex;
    color: var(--vt-c-text-2);
  }
  img {
    background-color: #fff;
    padding: 12px 16px;
    border-radius: 6px;
    margin-right: 24px;
  }
  .testing-partner {
    color: var(--vt-c-text-1);
    font-size: 15px;
    font-weight: 600;
  }
}
</style>

# Test {#testing}

## Neden Test Yazmalı? {#why-test}

Otomatik testler; regresyonları önleyerek ve uygulamanızı test edilebilir fonksiyonlara, modüllere, sınıflara ve bileşenlere bölmenizi teşvik ederek, siz ve ekibinizin karmaşık Vue uygulamalarını hızlı ve güvenle geliştirmenize yardımcı olur. Her uygulamada olduğu gibi yeni Vue uygulamanız da birçok farklı şekilde bozulabilir; bu sorunları yayına almadan önce yakalayıp düzeltebilmek önemlidir.

Bu rehberde temel terminolojiyi ele alacak ve Vue 3 uygulamanız için hangi araçları seçmenize ilişkin önerilerimizi sunacağız.

Composable'ları kapsayan Vue'ya özgü bir bölüm vardır. Ayrıntılar için aşağıdaki [Composable Testleri](#testing-composables) bölümüne bakın.

## Ne Zaman Test Yazmalı? {#when-to-test}

Test yazmaya erken başlayın! Mümkün olan en kısa sürede test yazmaya başlamanızı öneririz. Uygulamanıza test eklemeyi ne kadar geciktirirseniz, uygulamanın bağımlılıkları o kadar artar ve başlamak o kadar zorlaşır.

## Test Türleri {#testing-types}

Vue uygulamanızın test stratejisini tasarlarken aşağıdaki test türlerinden yararlanmalısınız:

- **Birim (Unit)**: Bir fonksiyona, sınıfa veya composable'a verilen girdilerin beklenen çıktıyı ya da yan etkileri üretip üretmediğini kontrol eder.
- **Bileşen (Component)**: Bileşeninizin mount olduğunu, render edildiğini, etkileşime açık olduğunu ve beklendiği gibi davrandığını kontrol eder. Bu testler birim testlerden daha fazla kod içerir, daha karmaşıktır ve çalışması daha uzun sürer.
- **Uçtan Uca (End-to-end)**: Birden fazla sayfayı kapsayan özellikleri kontrol eder ve üretim derlemeli (production-built) Vue uygulamanıza gerçek ağ istekleri gönderir. Bu testler genellikle bir veritabanı veya başka bir arka ucun ayağa kaldırılmasını gerektirir.

Her test türü, uygulamanızın test stratejisinde bir rol üstlenir ve her biri sizi farklı türdeki sorunlardan korur.

## Genel Bakış {#overview}

Bu türlerin her birinin ne olduğunu, Vue uygulamaları için nasıl uygulanabileceğini kısaca ele alacak ve genel önerilerde bulunacağız.

## Birim Test {#unit-testing}

Birim testler, küçük ve izole kod birimlerinin beklendiği gibi çalışıp çalışmadığını doğrulamak için yazılır. Bir birim test genellikle tek bir fonksiyonu, sınıfı, composable'ı veya modülü kapsar. Birim testler mantıksal doğruluğa odaklanır ve yalnızca uygulamanın genel işlevinin küçük bir kısmıyla ilgilenir. Uygulamanızın ortamının büyük bir bölümünü mock'layabilir (örn. başlangıç durumu, karmaşık sınıflar, üçüncü taraf modüller ve ağ istekleri).

Genel olarak birim testler, bir fonksiyonun iş mantığı ve mantıksal doğruluğuyla ilgili sorunları yakalar.

Örnek olarak şu `increment` fonksiyonunu ele alalım:

```js [helpers.js]
export function increment(current, max = 10) {
  if (current < max) {
    return current + 1
  }
  return current
}
```

Kendi kendine yeterli (self-contained) bir yapıda olduğu için, increment fonksiyonunu çağırıp beklendiği değeri döndürdüğünü doğrulamak kolaydır; bu yüzden bir Birim Test yazacağız.

Bu doğrulamalardan herhangi biri başarısız olursa, sorunun `increment` fonksiyonunun içinde olduğu açıkça görülür.

```js{3-15} [helpers.spec.js]
import { increment } from './helpers'

describe('increment', () => {
  test('increments the current number by 1', () => {
    expect(increment(0, 10)).toBe(1)
  })

  test('does not increment the current number over the max', () => {
    expect(increment(10, 10)).toBe(10)
  })

  test('has a default max of 10', () => {
    expect(increment(10)).toBe(10)
  })
})
```

Daha önce belirtildiği gibi, birim test genellikle UI render'ı, ağ istekleri veya diğer ortamsal unsurları içermeyen; kendi başına yeterli iş mantığı, bileşenler, sınıflar, modüller ya da fonksiyonlar için uygulanır.

Bunlar çoğunlukla Vue ile ilgisi olmayan düz JavaScript / TypeScript modülleridir. Genel olarak Vue uygulamalarındaki iş mantığı için birim test yazmak, başka framework'ler kullanan uygulamalardan önemli ölçüde farklı değildir.

Vue'ya özgü özelliklere birim test yazdığınız iki durum vardır:

1. Composable'lar
2. Bileşenler

### Composable'lar {#composables}

Vue uygulamalarına özgü fonksiyon kategorilerinden biri, testler sırasında özel işlem gerektirebilen [Composable'lar](/guide/reusability/composables)dır.
Ayrıntılar için aşağıdaki [Composable Testleri](#testing-composables) bölümüne bakın.

### Bileşenlere Birim Test Yazmak {#unit-testing-components}

Bir bileşen iki şekilde test edilebilir:

1. Beyaz Kutu (Whitebox): Birim Test

   "Beyaz Kutu" testler, bir bileşenin uygulama detaylarına ve bağımlılıklarına vakıftır. Test edilen bileşeni **izole etmeye** odaklanırlar. Bu testler genellikle bileşenin bazı (hatta tüm) alt bileşenlerini mock'lamayı ve eklenti durumu ile bağımlılıklarını (örn. Pinia) ayarlamayı içerir.

2. Kara Kutu (Blackbox): Bileşen Testi

   "Kara Kutu" testler, bir bileşenin uygulama detaylarından habersizdir. Bileşeninizin ve tüm sistemin entegrasyonunu test edebilmek için mümkün olduğunca az mock'larlar. Genellikle tüm alt bileşenleri render ederler ve daha çok "entegrasyon testi" olarak kabul edilirler. Aşağıdaki [Bileşen Test önerilerine](#component-testing) bakın.

### Öneri {#recommendation}

- [Vitest](https://vitest.dev/)

  `create-vue` tarafından oluşturulan resmi kurulum [Vite](https://vite.dev/) tabanlı olduğundan, aynı yapılandırma ve dönüşüm hattını doğrudan Vite'tan kullanabilen bir birim test framework'ünü önermekteyiz. [Vitest](https://vitest.dev/), tam olarak bu amaçla tasarlanmış, Vue / Vite ekibi üyeleri tarafından geliştirilip sürdürülen bir birim test framework'üdür. Vite tabanlı projelere minimum çabayla entegre olur ve son derece hızlıdır.

### Diğer Seçenekler {#other-options}

- [Jest](https://jestjs.io/) yaygın bir birim test framework'üdür. Ancak Jest'i yalnızca Vite tabanlı bir projeye taşınması gereken mevcut bir Jest test takımınız varsa öneririz; çünkü Vitest daha sorunsuz bir entegrasyon ve daha iyi performans sunar.

## Bileşen Testi {#component-testing}

Vue uygulamalarında bileşenler, kullanıcı arayüzünün ana yapı taşlarıdır. Bu nedenle uygulamanızın davranışını doğrulamak söz konusu olduğunda bileşenler doğal bir izolasyon birimidir. Granülerlik açısından bileşen testi, birim testin biraz üstünde yer alır ve bir tür entegrasyon testi olarak kabul edilebilir. Vue uygulamanızın büyük bir kısmı bileşen testiyle kapsanmalıdır; her Vue bileşeninin kendi spec dosyasının olmasını öneririz.

Bileşen testleri, bileşeninizin props'larıyla, olaylarıyla (events), sunduğu slot'larla, stilleriyle, sınıflarıyla, yaşam döngüsü kancalarıyla ve daha fazlasıyla ilgili sorunları yakalamalıdır.

Bileşen testleri alt bileşenleri mock'lamak yerine, bileşeninizle alt bileşenleri arasındaki etkileşimleri bir kullanıcı gibi davranarak test etmelidir. Örneğin bir bileşen testi, bileşenle programatik olarak etkileşime girmek yerine kullanıcının yapacağı gibi bir elemana tıklamalıdır.

Bileşen testleri, iç uygulama detayları yerine bileşenin dış (public) arayüzüne odaklanmalıdır. Çoğu bileşen için dış arayüz; emit edilen olaylar, props ve slot'larla sınırlıdır. Test yazarken şunu unutmayın: **bileşenin ne yaptığını test edin, bunu nasıl yaptığını değil**.

**Yapılması Gerekenler**

- **Görsel** mantık için: verilen props ve slot'lara göre render çıktısının doğruluğunu doğrulayın.
- **Davranışsal** mantık için: kullanıcı girdi olaylarına yanıt olarak render güncellemelerinin ya da emit edilen olayların doğruluğunu doğrulayın.

  Aşağıdaki örnekte, "increment" etiketli bir DOM elemanına sahip ve tıklanabilen bir Stepper bileşeni gösterilmektedir. `max` adlı bir prop geçiriyoruz; bu prop Stepper'ın `2`'nin üzerine çıkmasını engelliyor, bu nedenle düğmeye 3 kere tıklasak bile UI hâlâ `2` göstermelidir.

  Stepper'ın iç uygulamasını bilmiyoruz; yalnızca "girdi"nin `max` prop'u, "çıktı"nın ise kullanıcının göreceği DOM durumu olduğunu biliyoruz.

::: code-group

```js [Vue Test Utils]
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

const wrapper = mount(Stepper, {
  props: {
    max: 1
  }
})

expect(wrapper.find(valueSelector).text()).toContain('0')

await wrapper.find(buttonSelector).trigger('click')

expect(wrapper.find(valueSelector).text()).toContain('1')
```

```js [Cypress]
const valueSelector = '[data-testid=stepper-value]'
const buttonSelector = '[data-testid=increment]'

mount(Stepper, {
  props: {
    max: 1
  }
})

cy.get(valueSelector)
  .should('be.visible')
  .and('contain.text', '0')
  .get(buttonSelector)
  .click()
  .get(valueSelector)
  .should('contain.text', '1')
```

```js [Testing Library]
const { getByText } = render(Stepper, {
  props: {
    max: 1
  }
})

getByText('0') // "0"ın bileşen içinde olduğuna dair örtük doğrulama

const button = getByRole('button', { name: /increment/i })

// increment düğmemize bir tıklama olayı gönder.
await fireEvent.click(button)

getByText('1')

await fireEvent.click(button)
```

:::

**Yapılmaması Gerekenler**

- Bir bileşen örneğinin gizli (private) durumunu doğrulamayın veya bileşenin gizli metotlarını test etmeyin. Uygulama detaylarını test etmek testleri kırılgan hale getirir; çünkü uygulama değiştiğinde bu testlerin bozulma ve güncellenme ihtimali artar.

  Bileşenin nihai görevi doğru DOM çıktısını render etmektir; dolayısıyla DOM çıktısına odaklanan testler aynı düzeyde (belki de daha yüksek düzeyde) doğruluk güvencesi verir ve değişikliğe karşı daha dayanıklı, daha sağlam olur.

  Yalnızca snapshot testlerine güvenmeyin. HTML dizelerini doğrulamak doğruluğu garanti etmez. Testlerinizi bir amaçla yazın.

  Bir metot baştan sona test edilmeliyse, onu bağımsız bir yardımcı fonksiyona çıkarmayı ve ona özel bir birim test yazmayı değerlendirin. Temiz şekilde çıkarılamıyorsa, onu kapsayan bir bileşen, entegrasyon ya da uçtan uca testin parçası olarak test edilebilir.

### Öneri {#recommendation-1}

- Görsel arayüz olmadan çalışan (headless) bileşenler ya da composable'lar (örn. VueUse içindeki [`useFavicon`](https://vueuse.org/core/useFavicon/#usefavicon) fonksiyonu) için [Vitest](https://vitest.dev/). Bileşenler ve DOM, [`@vue/test-utils`](https://github.com/vuejs/test-utils) kullanılarak test edilebilir.

- Beklenen davranışı stillerin doğru render edilmesine ya da yerel DOM olaylarının tetiklenmesine bağlı bileşenler için [Cypress Component Testing](https://on.cypress.io/component). [@testing-library/cypress](https://testing-library.com/docs/cypress-testing-library/intro) aracılığıyla Testing Library ile birlikte de kullanılabilir.

Vitest ile tarayıcı tabanlı yürütücüler arasındaki temel farklar hız ve yürütme bağlamıdır. Kısacası Cypress gibi tarayıcı tabanlı yürütücüler, Vitest gibi Node.js tabanlı yürütücülerin yakalayamayacağı sorunları (örn. stil sorunları, gerçek yerel DOM olayları, çerezler, local storage ve ağ hataları) yakalayabilir; ancak tarayıcı tabanlı yürütücüler gerçek bir tarayıcı açtıkları, stil dosyalarınızı derledikleri vb. için _Vitest'ten kat kat yavaştır_. Cypress, bileşen testini destekleyen tarayıcı tabanlı bir yürütücüdür. Vitest ve Cypress'in karşılaştırıldığı güncel bilgi için lütfen [Vitest karşılaştırma sayfasına](https://vitest.dev/guide/comparisons.html#cypress) bakın.

### Mount Kütüphaneleri {#mounting-libraries}

Bileşen testi genellikle test edilen bileşeni izole şekilde mount etmeyi, simüle edilen kullanıcı girdi olaylarını tetiklemeyi ve render edilen DOM çıktısını doğrulamayı içerir. Bu görevleri kolaylaştıran özel yardımcı kütüphaneler vardır.

- [`@vue/test-utils`](https://github.com/vuejs/test-utils), kullanıcıların Vue'ya özgü API'lere erişebilmesi için yazılmış resmi, alt seviye bileşen test kütüphanesidir. `@testing-library/vue`'nun üzerine inşa edildiği alt seviye kütüphane de budur.

- [`@testing-library/vue`](https://github.com/testing-library/vue-testing-library), bileşenleri uygulama detaylarına dayanmadan test etmeye odaklanan bir Vue test kütüphanesidir. Yol gösterici ilkesi şudur: testler yazılımın kullanılış biçimine ne kadar benzerse, o kadar çok güven verir.

Uygulamalarda bileşenleri test etmek için `@vue/test-utils` kullanmanızı öneririz. `@testing-library/vue`, Suspense ile asenkron bileşen testinde sorunlar yaşıyor; bu nedenle dikkatli kullanılmalıdır.

### Diğer Seçenekler {#other-options-1}

- [Nightwatch](https://nightwatchjs.org/), Vue Bileşen Testi desteğine sahip bir uçtan uca (E2E) Test Yürütücüsüdür. ([Örnek Proje](https://github.com/nightwatchjs-community/todo-vue))

- [WebdriverIO](https://webdriver.io/docs/component-testing/vue), standart otomasyon temelli yerel kullanıcı etkileşimine dayanan, tarayıcılar arası bileşen testi içindir. Testing Library ile birlikte de kullanılabilir.

## Uçtan Uca (E2E) Test {#e2e-testing}

Birim testler geliştiricilere belirli bir güven düzeyi sağlasa da, birim ve bileşen testlerinin üretime dağıtılmış bir uygulamaya bütünsel bir kapsam sunma kabiliyeti sınırlıdır. Sonuç olarak uçtan uca (E2E) testler, uygulamanın en önemli yönü diyebileceğimiz şeyin kapsamını sağlar: kullanıcılar uygulamanızı gerçekten kullandığında ne olduğunun kapsamını.

Uçtan uca testler, üretim derlemeli Vue uygulamanıza ağ istekleri gönderen, birden fazla sayfayı kapsayan uygulama davranışlarına odaklanır. Genellikle bir veritabanı veya başka bir arka ucun ayağa kaldırılmasını gerektirir ve hatta canlı bir staging ortamına karşı bile çalıştırılabilir.

Uçtan uca testler sıklıkla router'ınız, durum yönetimi kütüphaneniz, üst seviye bileşenleriniz (örn. App veya Layout), public varlıklarınız ya da herhangi bir istek işlemesi ile ilgili sorunları yakalar. Yukarıda belirtildiği gibi, birim ya da bileşen testleriyle yakalanması imkânsız olabilecek kritik sorunları yakalarlar.

Uçtan uca testler Vue uygulamanızın kodundan hiçbirini içe aktarmaz; bunun yerine gerçek bir tarayıcıda tüm sayfalarda gezinerek uygulamanızı test etmeye tamamen güvenirler.

Uçtan uca testler uygulamanızdaki birçok katmanı doğrular. Yerelde derlenmiş uygulamanızı veya canlı bir Staging ortamını hedefleyebilirler. Staging ortamına karşı test etmek yalnızca ön yüz kodunuzu ve statik sunucunuzu değil; ilişkili tüm arka uç servislerini ve altyapıyı da kapsar.

> Testleriniz yazılımın kullanılış biçimine ne kadar benzerse, size o kadar çok güven verirler. - [Kent C. Dodds](https://x.com/kentcdodds/status/977018512689455106) - Testing Library'nin yazarı

Kullanıcı eylemlerinin uygulamanızı nasıl etkilediğini test ederek, E2E testler genellikle bir uygulamanın düzgün çalışıp çalışmadığına dair yüksek güvenin anahtarı olur.

### E2E Test Çözümü Seçmek {#choosing-an-e2e-testing-solution}

Web'de uçtan uca (E2E) test; güvenilmez (flaky) testler ve geliştirme süreçlerini yavaşlatma gibi olumsuz bir şöhret kazanmış olsa da, modern E2E araçları daha güvenilir, etkileşimli ve faydalı testler üretmek için büyük adımlar attı. Bir E2E test framework'ü seçerken, aşağıdaki bölümler uygulamanız için bir test framework'ü seçerken göz önünde bulundurulması gerekenler hakkında rehberlik sunar.

#### Tarayıcılar Arası Test (Cross-browser) {#cross-browser-testing}

Uçtan uca (E2E) testin bilinen başlıca faydalarından biri, uygulamanızı birden fazla tarayıcıda test edebilme yeteneğidir. %100 tarayıcılar arası kapsam sağlamak cazip görünse de, tarayıcılar arası testlerin tutarlı biçimde çalıştırılması için ek zaman ve makine gücü gerektirmesi nedeniyle ekibin kaynakları üzerinde azalan getirileri olduğunu belirtmek önemlidir. Bu nedenle uygulamanızın ne kadar tarayıcılar arası teste ihtiyacı olduğunu seçerken bu dengeyi göz önünde bulundurmak önemlidir.

#### Daha Hızlı Geri Bildirim Döngüleri {#faster-feedback-loops}

Uçtan uca (E2E) testlerin ve geliştirmenin başlıca sorunlarından biri, tüm test takımının çalıştırılmasının uzun sürmesidir. Bu genellikle yalnızca sürekli entegrasyon ve dağıtım (CI/CD) hatlarında yapılır. Modern E2E test framework'leri bunu çözmeye; CI/CD hatlarının öncesine kıyasla çok daha hızlı çalışmasına olanak tanıyan paralelleştirme gibi özellikler ekleyerek yardımcı oldu. Ayrıca yerel geliştirme sırasında, üzerinde çalıştığınız sayfa için seçici biçimde tek bir testi çalıştırabilme ve testlerin anlık yeniden yüklenmesi (hot reloading), geliştiricinin iş akışını ve verimliliğini artırmaya yardımcı olabilir.

#### Birinci Sınıf Hata Ayıklama Deneyimi {#first-class-debugging-experience}

Geliştiriciler geleneksel olarak bir testte neyin yanlış gittiğini anlamak için terminal penceresindeki logları tararken, modern uçtan uca (E2E) test framework'leri geliştiricilerin halihazırda aşina olduğu araçlardan (örn. tarayıcı geliştirici araçları) yararlanmalarına olanak tanır.

#### Başsız (Headless) Modda Görünürlük {#visibility-in-headless-mode}

Uçtan uca (E2E) testler sürekli entegrasyon / dağıtım hatlarında çalıştırıldığında, genellikle görsel arayüzü olmayan (headless) tarayıcıda çalışır. Modern E2E test framework'lerinin kritik bir özelliği, test sırasında uygulamanın snapshot'larını ve/veya videolarını görebilmektir; bu, hataların neden oluştuğuna dair içgörü sunar. Bu entegrasyonları sürdürmek tarihsel olarak zahmetliydi.

### Öneri {#recommendation-2}

- [Playwright](https://playwright.dev/); Chromium, WebKit ve Firefox'u destekleyen harika bir E2E test çözümüdür. Windows, Linux ve macOS üzerinde; yerelde ya da CI'da; başsız (headless) veya başlı (headed) olarak; Android için Google Chrome ve Mobile Safari'nin yerel mobil emülasyonuyla test yapmanızı sağlar. Bilgilendirici bir kullanıcı arayüzü, mükemmel hata ayıklanabilirlik, yerleşik doğrulamalar, paralelleştirme, trace'ler sunar ve kararsız (flaky) testleri azaltmak için tasarlanmıştır. [Bileşen Testi](https://playwright.dev/docs/test-components) desteği mevcut ancak deneysel olarak işaretlenmiştir. Playwright açık kaynaktır ve Microsoft tarafından sürdürülmektedir.

- [Cypress](https://www.cypress.io/); bilgilendirici bir grafik arayüze, mükemmel hata ayıklanabilirliğe, yerleşik doğrulamalara, stub'lara, flaky'e karşı dirence ve snapshot'lara sahiptir. Yukarıda belirtildiği gibi, [Bileşen Testi](https://docs.cypress.io/guides/component-testing/introduction) için sağlam bir destek sunar. Cypress; Chromium tabanlı tarayıcıları, Firefox'u ve Electron'u destekler. WebKit desteği mevcut ancak deneysel olarak işaretlenmiştir. Cypress MIT lisanslıdır, ancak paralelleştirme gibi bazı özellikler Cypress Cloud aboneliği gerektirir.

<div class="lambdatest">
  <a href="https://lambdatest.com" target="_blank">
    <img src="/images/lambdatest.svg">
    <div>
      <div class="testing-partner">Test Sponsoru</div>
      <div>Lambdatest, tüm büyük tarayıcılarda ve gerçek cihazlarda E2E, erişilebilirlik ve görsel regresyon testleri çalıştırmak için bir bulut platformudur; üstelik AI destekli test üretimiyle!</div>
    </div>
  </a>
</div>

### Diğer Seçenekler {#other-options-2}

- [Nightwatch](https://nightwatchjs.org/); [Selenium WebDriver](https://www.npmjs.com/package/selenium-webdriver) tabanlı bir E2E test çözümüdür. Bu ona yerel mobil testler dahil en geniş tarayıcı desteği aralığını verir. Selenium tabanlı çözümler Playwright veya Cypress'ten daha yavaş olacaktır.

- [WebdriverIO](https://webdriver.io/); WebDriver protokolü temelinde web ve mobil test için bir test otomasyon framework'üdür.

## Reçeteler {#recipes}

### Bir Projeye Vitest Eklemek {#adding-vitest-to-a-project}

Vite tabanlı bir Vue projesinde şunu çalıştırın:

```sh
> npm install -D vitest happy-dom @testing-library/vue
```

Ardından `test` seçenek bloğunu eklemek için Vite yapılandırmasını güncelleyin:

```js{5-11} [vite.config.js]
import { defineConfig } from 'vite'

export default defineConfig({
  // ...
  test: {
    // jest benzeri global test API'lerini etkinleştir
    globals: true,
    // DOM'u happy-dom ile simüle et
    // (happy-dom'u peer bağımlılık olarak yüklemek gerekir)
    environment: 'happy-dom'
  }
})
```

:::tip
TypeScript kullanıyorsanız, `tsconfig.json` dosyanızdaki `types` alanına `vitest/globals` ekleyin.

```json [tsconfig.json]
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

:::

Ardından projenizde `*.test.js` ile biten bir dosya oluşturun. Tüm test dosyalarını projenin kök dizinindeki bir test klasörüne ya da kaynak dosyalarınızın yanındaki test klasörlerine yerleştirebilirsiniz. Vitest, adlandırma kuralını kullanarak bunları otomatik olarak arar.

```js [MyComponent.test.js]
import { render } from '@testing-library/vue'
import MyComponent from './MyComponent.vue'

test('it should work', () => {
  const { getByText } = render(MyComponent, {
    props: {
      /* ... */
    }
  })

  // çıktıyı doğrula
  getByText('...')
})
```

Son olarak `package.json` dosyasını test script'i ekleyecek şekilde güncelleyin ve çalıştırın:

```json{4} [package.json]
{
  // ...
  "scripts": {
    "test": "vitest"
  }
}
```

```sh
> npm test
```

### Composable Testleri {#testing-composables}

> Bu bölüm, [Composable'lar](/guide/reusability/composables) bölümünü okuduğunuzu varsayar.

Composable test etmek söz konusu olduğunda, onları iki kategoriye ayırabiliriz: bir host bileşen örneğine bağımlı olmayan composable'lar ve bağımlı olanlar.

Bir composable aşağıdaki API'leri kullandığında bir host bileşen örneğine bağımlıdır:

- Yaşam döngüsü kancaları
- Provide / Inject

Bir composable yalnızca Tepkisellik API'lerini kullanıyorsa, doğrudan çağrılıp döndürdüğü durum/metotlar doğrulanarak test edilebilir:

```js [counter.js]
import { ref } from 'vue'

export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++

  return {
    count,
    increment
  }
}
```

```js [counter.test.js]
import { useCounter } from './counter.js'

test('useCounter', () => {
  const { count, increment } = useCounter()
  expect(count.value).toBe(0)

  increment()
  expect(count.value).toBe(1)
})
```

Yaşam döngüsü kancalarına ya da Provide / Inject'e bağımlı bir composable'ın test edilebilmesi için bir host bileşen içine sarmalanması gerekir. Aşağıdakine benzer bir yardımcı oluşturabiliriz:

```js [test-utils.js]
import { createApp } from 'vue'

export function withSetup(composable) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // eksik şablon uyarısını bastır
      return () => {}
    }
  })
  app.mount(document.createElement('div'))
  // provide/unmount testi için
  // sonuç ile uygulama örneğini döndür
  return [result, app]
}
```

```js [foo.test.js]
import { withSetup } from './test-utils'
import { useFoo } from './foo'

test('useFoo', () => {
  const [result, app] = withSetup(() => useFoo(123))
  // enjeksiyonları test etmek için provide'ı mock'la
  app.provide(...)
  // doğrulamaları çalıştır
  expect(result.foo.value).toBe(1)
  // gerekirse onUnmounted kancasını tetikle
  app.unmount()
})
```

Daha karmaşık composable'lar için, [Bileşen Testi](#component-testing) tekniklerini kullanarak sarmalayıcı bileşene karşı test yazmak da daha kolay olabilir.

<!--
TODO more testing recipes can be added in the future e.g.
- How to set up CI via GitHub actions
- How to do mocking in component testing
-->
