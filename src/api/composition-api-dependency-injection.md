# Kompozisyon API’si: <br> Bağımlılık Enjeksiyonu {#composition-api-dependency-injection}

## provide() {#provide}

Alt bileşenler tarafından enjekte edilebilecek bir değer sağlar.

- **Tür**

  ```ts
  function provide<T>(key: InjectionKey<T> | string, value: T): void
  ```

- **Detaylar**

  `provide()` iki argüman alır: string veya symbol olabilen bir anahtar ve enjekte edilecek değer.

  TypeScript kullanırken, anahtar, `InjectionKey` olarak dönüştürülmüş bir sembol olabilir; bu, `Symbol` türünü genişleten ve `provide()` ile `inject()` arasında değer türünü senkronize etmek için kullanılabilen, Vue tarafından sağlanan bir yardımcı türdür.


  Yaşam döngüsü kancası kayıt API'lerine benzer şekilde, `provide()` işlevi bir bileşenin `setup()` aşamasında senkron olarak çağrılmalıdır.

- **Örnek**

  ```vue
  <script setup>
  import { ref, provide } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // statik değer sağlama
  provide('path', '/project/')

  // tepkisel değer sağlama
  const count = ref(0)
  provide('count', count)

  // Symbol anahtarlarıyla sağlama
  provide(countSymbol, count)
  </script>
  ```

- **Ayrıca bakınız**
  - [Kılavuz - Sağlamak / Enjekte Etmek](/guide/components/provide-inject)
  - [Kılavuz - Sağlamak / Enjekte Etmek İçin Tür Tanımlamaları](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## inject() {#inject}

Bir üst bileşen veya uygulama (`app.provide()` aracılığıyla) tarafından sağlanan bir değeri enjekte eder.

- **Tür**

  ```ts
  // varsayılan değer olmadan
  function inject<T>(key: InjectionKey<T> | string): T | undefined

  // varsayılan değer ile
  function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

  // fabrika fonksiyonu ile
  function inject<T>(
    key: InjectionKey<T> | string,
    defaultValue: () => T,
    treatDefaultAsFactory: true
  ): T
  ```

- **Detaylar**

  İlk argüman enjeksiyon anahtarıdır. Vue, eşleşen bir anahtarla sağlanan değeri bulmak için ebeveyn zincirinde yukarı doğru çıkar. Ebeveyn zincirindeki birden fazla bileşen aynı anahtarı sağlıyorsa, enjekte eden bileşene en yakın olanı, zincirde daha yukarıda olanları "gölgeler" ve onun değeri kullanılır. Eşleşen anahtara sahip hiçbir değer bulunamazsa ve varsayılan bir değer sağlanmamışsa, `inject()` işlevi `undefined` döndürür.

  İkinci argüman isteğe bağlıdır ve eşleşen bir değer bulunamadığında kullanılacak varsayılan değerdir.

  İkinci argüman ayrıca, oluşturulması maliyetli olan değerleri döndüren bir fabrika fonksiyon da olabilir. Bu durumda, fonksiyonun değerin kendisi yerine bir fabrika fonksiyonu olarak kullanılması gerektiğini belirtmek için üçüncü argüman olarak `true` geçilmelidir.

  Yaşam döngüsü kancası kayıt API'lerine benzer şekilde, `inject()` bir bileşenin `setup()` aşamasında senkron olarak çağrılmalıdır.

  TypeScript kullanırken anahtar, `InjectionKey` türünde olabilir. Bu, `provide()` ve `inject()` arasındaki değer türünü senkronize etmek için kullanılabilen, `Symbol` türünü genişleten ve Vue tarafından sağlanan bir yardımcı program türüdür.


- **Örnek**

  Bir ebeveyn bileşenin önceki `provide()` örneğinde gösterildiği gibi değerler sağladığını varsayarsak:

  ```vue
  <script setup>
  import { inject } from 'vue'
  import { countSymbol } from './injectionSymbols'

  // varsayılan olmadan statik değeri enjekte et
  const path = inject('path')

  // tepkisel değeri enjekte et
  const count = inject('count')

  // Symbol anahtarlarıyla enjekte et
  const count2 = inject(countSymbol)

  // varsayılan değerle enjekte et
  const bar = inject('path', '/default-path')

  // fonksiyon olan varsayılan değerle enjekte et
  const fn = inject('function', () => {})

  // fabrika fonksiyonu varsayılan değeriyle enjekte et
  const baz = inject('factory', () => new ExpensiveObject(), true)
  </script>
  ```
  
- **Ayrıca bakınız**
  - [Kılavuz - Sağlamak / Enjekte Etmek](/guide/components/provide-inject)
  - [Kılavuz - Sağlamak / Enjekte Etmek İçin Tür Tanımlamaları](/guide/typescript/composition-api#typing-provide-inject) <sup class="vt-badge ts" />

## hasInjectionContext() {#has-injection-context}

- 3.3+ sürümlerinde desteklenir

[inject()](#inject) işlevi yanlış bir yerde (örneğin `setup()` dışında) çağrıldığına dair bir uyarı vermeden kullanılabiliyorsa `true` döndürür. Bu metot, son kullanıcıya bir uyarı tetiklemeden dahili olarak `inject()` kullanmak isteyen kütüphaneler tarafından kullanılmak üzere tasarlanmıştır.

- **Tür**

  ```ts
  function hasInjectionContext(): boolean
  ```
