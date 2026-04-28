# Global API: Genel {#global-api-general}

## version {#version}

Vue'nun mevcut sürümünü sunar.

- **Tür:** `string`

- **Örnek**

  ```js
  import { version } from 'vue'

  console.log(version)
  ```

## nextTick() {#nexttick}

Bir sonraki DOM güncelleme akışının tamamlanmasını beklemek için kullanılan bir yardımcı işlevdir.

- **Tür**

  ```ts
  function nextTick(callback?: () => void): Promise<void>
  ```

- **Detaylar**

  Vue'da tepkisel durumu değiştirdiğinizde, ortaya çıkan DOM güncellemeleri eşzamanlı olarak uygulanmaz. Bunun yerine Vue, yaptığınız durum değişikliği sayısı ne olursa olsun her bileşenin yalnızca bir kez güncellenmesini sağlamak için bunları "next tick"e kadar arabelleğe alır.

  `nextTick()`, bir durum değişikliğinden hemen sonra DOM güncellemelerinin tamamlanmasını beklemek için kullanılabilir. Callback'i bir argüman olarak geçebilir veya döndürülen Promise'i `await` edebilirsiniz.

- **Örnek**

  <div class="composition-api">

  ```vue
  <script setup>
  import { ref, nextTick } from 'vue'

  const count = ref(0)

  async function increment() {
    count.value++

    // DOM henüz güncellenmedi
    console.log(document.getElementById('counter').textContent) // 0

    await nextTick()
    // DOM artık güncellendi
    console.log(document.getElementById('counter').textContent) // 1
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>
  <div class="options-api">

  ```vue
  <script>
  import { nextTick } from 'vue'

  export default {
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        this.count++

        // DOM henüz güncellenmedi
        console.log(document.getElementById('counter').textContent) // 0

        await nextTick()
        // DOM artık güncellendi
        console.log(document.getElementById('counter').textContent) // 1
      }
    }
  }
  </script>

  <template>
    <button id="counter" @click="increment">{{ count }}</button>
  </template>
  ```

  </div>

- **Ayrıca bkz.** [`this.$nextTick()`](/api/component-instance#nexttick)

## defineComponent() {#definecomponent}

Tür çıkarımıyla bir Vue bileşeni tanımlamak için kullanılan bir yardımcı türdür.

- **Tür**

  ```ts
  // seçenek sözdizimi
  function defineComponent(
    component: ComponentOptions
  ): ComponentConstructor

  // fonksiyon sözdizimi (3.3+ gerektirir)
  function defineComponent(
    setup: ComponentOptions['setup'],
    extraOptions?: ComponentOptions
  ): () => any
  ```

  > Tür, okunabilirlik için basitleştirilmiştir.

- **Detaylar**

  İlk argüman bir bileşen seçenek nesnesi bekler. Fonksiyon, yalnızca tür çıkarımı amacıyla kullanılan ve çalışma zamanında esasen etkisiz (no-op) olduğundan, dönüş değeri aynı seçenek nesnesi olur.

  Dönüş türünün biraz özel olduğunu unutmayın: Bu tür, örnek türü seçeneklere göre çıkarılan bileşen örnek türü olan bir yapıcı türü olacaktır. Bu, döndürülen tür TSX içinde etiket olarak kullanıldığında tür çıkarımı için kullanılır.

  Bir bileşenin örnek türünü (`this`'in seçenekler içindeki türüne eşdeğer) `defineComponent()` dönüş türünden şu şekilde çıkarabilirsiniz:

  ```ts
  const Foo = defineComponent(/* ... */)

  type FooInstance = InstanceType<typeof Foo>
  ```

  ### Fonksiyon İmzası {#function-signature}
  - Yalnızca 3.3+ sürümünde desteklenir

  `defineComponent()`, Composition API ve [render fonksiyonları veya JSX](/guide/extras/render-function.html) ile kullanılmak üzere tasarlanmış alternatif bir imzaya da sahiptir.

  Bir seçenek nesnesi geçirmek yerine bir fonksiyon beklenir. Bu fonksiyon, Composition API [`setup()`](/api/composition-api-setup.html#composition-api-setup) fonksiyonuyla aynı şekilde çalışır: Props'u ve setup bağlamını alır. Dönüş değeri bir render fonksiyonu olmalıdır; hem `h()` hem de JSX desteklenir:

  ```js
  import { ref, h } from 'vue'

  const Comp = defineComponent(
    (props) => {
      // Composition API'yi burada <script setup>'taki gibi kullanın
      const count = ref(0)

      return () => {
        // render fonksiyonu veya JSX
        return h('div', count.value)
      }
    },
    // ek seçenekler, ör. props ve emits'i bildirme
    {
      props: {
        /* ... */
      }
    }
  )
  ```

  Bu imzanın başlıca kullanım senaryosu, generics desteklediği için TypeScript (özellikle de TSX) ile kullanımdır:

  ```tsx
  const Comp = defineComponent(
    <T extends string | number>(props: { msg: T; list: T[] }) => {
      // Composition API'yi burada <script setup>'taki gibi kullanın
      const count = ref(0)

      return () => {
        // render fonksiyonu veya JSX
        return <div>{count.value}</div>
      }
    },
    // çalışma zamanında manuel props bildirimi şu anda hâlâ gereklidir.
    {
      props: ['msg', 'list']
    }
  )
  ```

  İleride, çalışma zamanı props'larını otomatik olarak çıkarıp ekleyen bir Babel eklentisi sunmayı planlıyoruz (`SFC`'lerdeki `defineProps` benzeri); böylece çalışma zamanı props bildirimi atlanabilecektir.

  ### webpack Treeshaking Hakkında {#note-on-webpack-treeshaking}

  `defineComponent()` bir fonksiyon çağrısı olduğu için, webpack gibi bazı build araçlarına yan etki üretiyormuş gibi görünebilir. Bu da, bileşen hiç kullanılmasa bile tree-shake edilmesini engeller.

  Bu fonksiyon çağrısının tree-shake edilmesinin güvenli olduğunu webpack'e belirtmek için, fonksiyon çağrısından önce `/*#__PURE__*/` yorum notasyonunu ekleyebilirsiniz:

  ```js
  export default /*#__PURE__*/ defineComponent(/* ... */)
  ```

  Vite kullanıyorsanız buna gerek yoktur; çünkü Vite'ın kullandığı temel production paketleyicisi olan Rollup, `defineComponent()` çağrısının manuel anotasyonlara gerek kalmadan gerçekte yan etkisiz olduğunu anlayacak kadar akıllıdır.

- **Ayrıca bkz.** [Kılavuz - Vue'yu TypeScript ile Kullanma](/guide/typescript/overview#general-usage-notes)

## defineAsyncComponent() {#defineasynccomponent}

Yalnızca render edildiğinde lazy load edilen bir asenkron bileşen tanımlar. Argüman, bir yükleyici fonksiyonu veya yükleme davranışını daha gelişmiş şekilde kontrol etmek için bir seçenek nesnesi olabilir.

- **Tür**

  ```ts
  function defineAsyncComponent(
    source: AsyncComponentLoader | AsyncComponentOptions
  ): Component

  type AsyncComponentLoader = () => Promise<Component>

  interface AsyncComponentOptions {
    loader: AsyncComponentLoader
    loadingComponent?: Component
    errorComponent?: Component
    delay?: number
    timeout?: number
    suspensible?: boolean
    onError?: (
      error: Error,
      retry: () => void,
      fail: () => void,
      attempts: number
    ) => any
  }
  ```

- **Ayrıca bkz.** [Kılavuz - Asenkron Bileşenler](/guide/components/async)
