# Seçenekler: Kompozisyon {#options-composition}

## provide {#provide}

Alt bileşenler tarafından enjekte edilebilecek değerler sağlayın.

- **Tür**

  ```ts
  interface ComponentOptions {
    provide?: object | ((this: ComponentPublicInstance) => object)
  }
  ```

- **Detaylar**

  `provide` ve [`inject`](#inject) birlikte kullanıldığında, bir üst bileşenin, bileşen hiyerarşisinin ne kadar derin olduğuna bakılmaksızın, aynı üst zincirde oldukları sürece tüm alt bileşenleri için bağımlılık enjektörü görevi görmesini sağlar.

  `provide` seçeneği ya bir nesne ya da bir nesne döndüren bir fonksiyon olmalıdır. Bu nesne, alt bileşenlerine enjekte edilebilecek özellikleri içerir. Bu nesnede semboller anahtar olarak kullanılabilir.

- **Örnek**

  Temel kullanım:

  ```js
  const s = Symbol()

  export default {
    provide: {
      foo: 'foo',
      [s]: 'bar'
    }
  }
  ```

  Bileşen bazında durum bilgisi sağlamak için bir fonksiyon kullanma:

  ```js
  export default {
    data() {
      return {
        msg: 'foo'
      }
    }
    provide() {
      return {
        msg: this.msg
      }
    }
  }
  ```

  Yukarıdaki örnekte, sağlanan `msg`'nin tepkisel OLMADIĞINI unutmayın. Daha fazla bilgi için [Tepkisellikle Çalışmak](/guide/components/provide-inject#working-with-reactivity) bölümüne bakın.

- **Ayrıca bakın:** [Provide / Inject](/guide/components/provide-inject)

## inject {#inject}

Ata sağlayıcılardan alınarak mevcut bileşene enjekte edilecek özellikleri tanımlayın.

- **Tür**

  ```ts
  interface ComponentOptions {
    inject?: ArrayInjectOptions | ObjectInjectOptions
  }

  type ArrayInjectOptions = string[]

  type ObjectInjectOptions = {
    [key: string | symbol]:
      | string
      | symbol
      | { from?: string | symbol; default?: any }
  }
  ```

- **Detaylar**

  `inject` seçeneği şunlardan biri olmalıdır:

  - String'lerden oluşan bir dizi (array), veya
  - Anahtarların yerel bağlama (local binding) adı olduğu ve değerin şunlardan biri olduğu bir nesne:
    - Mevcut enjeksiyonlarda aranacak anahtar (string veya Symbol), veya
    - Aşağıdakileri içeren bir nesne:
      - `from` özelliği, mevcut enjeksiyonlarda aranacak anahtar (string veya Symbol), ve
      - `default` özelliği, geri dönüş (fallback) değeri olarak kullanılır. Props varsayılan değerlerine benzer şekilde, birden fazla Bileşen Örneği (Component Instance) arasında değer paylaşımını önlemek için nesne türlerinde bir üretici fonksiyon (factory function) kullanılması gerekir.

  Eğer ne eşleşen bir özellik ne de varsayılan bir değer sağlanmamışsa, enjekte edilen özellik `undefined` olacaktır.

  Enjekte edilen bağlamaların (bindings) tepkisel (reactive) OLMADIĞINA dikkat edin. Bu bilinçli bir tasarımdır. Ancak, enjekte edilen değer tepkisel bir nesne ise, o nesne üzerindeki özellikler tepkisel kalmaya devam eder. Daha fazla detay için [Tepkisellikle Çalışmak](/guide/components/provide-inject#working-with-reactivity) bölümüne bakınız.
- **Örnek**

  Temel kullanım:

  ```js
  export default {
    inject: ['foo'],
    created() {
      console.log(this.foo)
    }
  }
  ```

  Enjekte edilen bir değeri bir prop için varsayılan değer olarak kullanma:

  ```js
  const Child = {
    inject: ['foo'],
    props: {
      bar: {
        default() {
          return this.foo
        }
      }
    }
  }
  ```

  Veri girişi olarak enjekte edilen bir değer kullanma:

  ```js
  const Child = {
    inject: ['foo'],
    data() {
      return {
        bar: this.foo
      }
    }
  }
  ```

  Enjeksiyonlar isteğe bağlı olabilir ve varsayılan bir değere sahip olabilir:

  ```js
  const Child = {
    inject: {
      foo: { default: 'foo' }
    }
  }
  ```
  Eğer farklı bir ada sahip bir özellikten enjekte edilmesi gerekiyorsa, kaynak özelliği belirtmek için `from` ifadesini kullanın:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: 'foo'
      }
    }
  }
  ```

  Varsayılan değerlerde olduğu gibi, ilkel olmayan değerler için de bir fabrika fonksiyonu kullanmanız gerekir:

  ```js
  const Child = {
    inject: {
      foo: {
        from: 'bar',
        default: () => [1, 2, 3]
      }
    }
  }
  ```

- **Ayrıca bakın:** [Provide / Inject](/guide/components/provide-inject)

## mixins {#mixins}

Mevcut bileşene eklenecek seçenek nesnelerinin bir dizisi.

- **Tür**

  ```ts
  interface ComponentOptions {
    mixins?: ComponentOptions[]
  }
  ```

- **Detaylar**

 `mixins` seçeneği, mixin nesnelerinden oluşan bir dizi kabul eder. Bu mixin nesneleri, normal örnek nesneler gibi örnek seçenekler içerebilir ve belirli seçenek birleştirme mantığı kullanılarak nihai seçeneklerle birleştirilirler. Örneğin, mixin'iniz bir `created` kancası içeriyorsa ve bileşenin kendisi de bir tane içeriyorsa, her iki işlev de çağrılır.

Mixin kancaları, sağlandıkları sırayla ve bileşenin kendi kancalarından önce çağrılır.

:::warning Artık Önerilmiyor
Vue 2'de mixin'ler, bileşen mantığının yeniden kullanılabilir parçalarını oluşturmanın birincil mekanizmasıydı. Mixin'ler Vue 3'te desteklenmeye devam etse de, bileşenler arasında kod yeniden kullanımı için tercih edilen yaklaşım artık [Composition API kullanan Composable fonksiyonlar](/guide/reusability/composables)'dır.
:::

  

- **Örnek**

  ```js
  const mixin = {
    created() {
      console.log(1)
    }
  }

  createApp({
    created() {
      console.log(2)
    },
    mixins: [mixin]
  })

  // => 1
  // => 2
  ```

## extends {#extends}

Genişletilecek bir "temel sınıf" (base class) bileşeni.

- **Tür**

  ```ts
  interface ComponentOptions {
    extends?: ComponentOptions
  }
  ```

- **Detaylar**

  Bir bileşenin, diğer bir bileşenin seçeneklerini miras alarak onu genişletmesine olanak tanır.

  Uygulama açısından, `extends` neredeyse `mixins` ile aynıdır. `extends` ile belirtilen bileşen, ilk mixinmiş gibi ele alınacaktır.

  Ancak, `extends` ve `mixins` farklı amaçları ifade eder. `mixins` seçeneği öncelikle işlevsellik parçalarını bir araya getirmek için kullanılırken, `extends` öncelikle miras alma ile ilgilidir.

  `mixins`'te olduğu gibi, `setup()` hariç tüm seçenekler ilgili birleştirme stratejisi kullanılarak birleştirilecektir.

- **Örnek**

  ```js
  const CompA = { ... }

  const CompB = {
    extends: CompA,
    ...
  }
  ```

  :::warning Composition API İçin Önerilmiyor
  `extends`, Options API için tasarlanmıştır ve `setup()` kancasının birleştirilmesini işlemez.

  Composition API'de mantığın yeniden kullanımı için tercih edilen zihinsel model, "kalıtım" (inheritance) yerine "kompozisyon"dur (compose). Bir bileşenden gelen ve başka bir bileşende yeniden kullanılması gereken mantığınız varsa, ilgili mantığı bir [Composable](/guide/reusability/composables#composables) içine çıkarmayı düşünün.

  Yine de Composition API kullanarak bir bileşeni "genişletmeyi" (extend) düşünüyorsanız, genişleten bileşenin `setup()` işlevinde temel bileşenin `setup()` işlevini çağırabilirsiniz:

  ```js
  import Base from './Base.js'
  export default {
    extends: Base,
    setup(props, ctx) {
      return {
        ...Base.setup(props, ctx),
        // yerel bağlamalar
      }
    }
  }
  ```
  :::
