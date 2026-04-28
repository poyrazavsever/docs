# Tepkisellik API'si: Yardımcı Araçlar {#reactivity-api-utilities}

## isRef() {#isref}

Bir değerin ref nesnesi olup olmadığını kontrol eder.

- **Tür**

  ```ts
  function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
  ```

  Dönüş tipinin bir [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) olduğuna dikkat edin. Bu, `isRef`'in bir type guard olarak kullanılabileceği anlamına gelir:

  ```ts
  let foo: unknown
  if (isRef(foo)) {
    // foo'nun tipi Ref<unknown> olacak şekilde daraltılır
    foo.value
  }
  ```

## unref() {#unref}

Argüman bir ref ise iç değerini, değilse argümanın kendisini döndürür. Bu, `val = isRef(val) ? val.value : val` için kısayol sağlayan bir yardımcı fonksiyondur.

- **Tür**

  ```ts
  function unref<T>(ref: T | Ref<T>): T
  ```

- **Örnek**

  ```ts
  function useFoo(x: number | Ref<number>) {
    const unwrapped = unref(x)
    // unwrapped artık kesin olarak number'dır
  }
  ```

## toRef() {#toref}

Değerleri / ref'leri / getter'ları ref'lere normalleştirmek için kullanılabilir (3.3+).

Ayrıca kaynak tepkisel nesnedeki bir özellik için ref oluşturmak amacıyla da kullanılabilir. Oluşturulan ref, kaynak özelliği ile senkronize olur: kaynak özelliği değiştirilirse ref güncellenir ve bunun tersi de geçerlidir.

- **Tür**

  ```ts
  // normalleştirme imzası (3.3+)
  function toRef<T>(
    value: T
  ): T extends () => infer R
    ? Readonly<Ref<R>>
    : T extends Ref
      ? T
      : Ref<UnwrapRef<T>>

  // nesne özelliği imzası
  function toRef<T extends object, K extends keyof T>(
    object: T,
    key: K,
    defaultValue?: T[K]
  ): ToRef<T[K]>

  type ToRef<T> = T extends Ref ? T : Ref<T>
  ```

- **Örnek**

  Normalleştirme imzası (3.3+):

  ```js
  // mevcut ref'leri olduğu gibi döndürür
  toRef(existingRef)

  // .value erişiminde getter'ı çağıran salt okunur bir ref oluşturur
  toRef(() => props.foo)

  // fonksiyon olmayan değerlerden normal ref'ler oluşturur
  // ref(1) ile eşdeğerdir
  toRef(1)
  ```

  Nesne özelliği imzası:

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // orijinal özellik ile senkronize olan çift yönlü bir ref
  const fooRef = toRef(state, 'foo')

  // ref'i değiştirmek orijinali günceller
  fooRef.value++
  console.log(state.foo) // 2

  // orijinali değiştirmek de ref'i günceller
  state.foo++
  console.log(fooRef.value) // 3
  ```

  Bunun şu örnekten farklı olduğuna dikkat edin:

  ```js
  const fooRef = ref(state.foo)
  ```

  Yukarıdaki ref, `state.foo` ile **senkronize değildir**; çünkü `ref()` düz bir sayı değeri alır.

  `toRef()`, bir prop'un ref'ini bir Composable fonksiyona geçirmek istediğinizde kullanışlıdır:

  ```vue
  <script setup>
  import { toRef } from 'vue'

  const props = defineProps(/* ... */)

  // `props.foo` değerini bir ref'e dönüştür, ardından
  // bir Composable'a geçir
  useSomeFeature(toRef(props, 'foo'))

  // getter sözdizimi - 3.3+ için önerilir
  useSomeFeature(toRef(() => props.foo))
  </script>
  ```

  `toRef`, bileşen props'larıyla kullanıldığında props'ları değiştirmeye yönelik olağan kısıtlamalar geçerliliğini korur. Ref'e yeni bir değer atamaya çalışmak, prop'u doğrudan değiştirmeye çalışmakla eşdeğerdir ve buna izin verilmez. Böyle bir durumda bunun yerine `get` ve `set` ile [`computed`](./reactivity-core#computed) kullanmayı düşünebilirsiniz. Ayrıntılar için [bileşenlerle `v-model` kullanma](/guide/components/v-model) rehberine bakın.

  Nesne özelliği imzası kullanıldığında `toRef()`, kaynak özellik o anda mevcut olmasa bile kullanılabilir bir ref döndürür. Bu, [`toRefs`](#torefs) tarafından yakalanmayacak isteğe bağlı özelliklerle çalışmayı mümkün kılar.

## toValue() {#tovalue}

- Yalnızca 3.3+ sürümünde desteklenir

Değerleri / ref'leri / getter'ları değerlere normalleştirir. Bu, [unref()](#unref) ile benzerdir; ancak getter'ları da normalleştirir. Argüman bir getter ise çağrılır ve dönüş değeri döndürülür.

Bu, [Composable'larda](/guide/reusability/composables.html) değer, ref veya getter olabilen bir argümanı normalleştirmek için kullanılabilir.

- **Tür**

  ```ts
  function toValue<T>(source: T | Ref<T> | (() => T)): T
  ```

- **Örnek**

  ```js
  toValue(1) //       --> 1
  toValue(ref(1)) //  --> 1
  toValue(() => 1) // --> 1
  ```

  Composable'lardaki argümanları normalleştirme:

  ```ts
  import type { MaybeRefOrGetter } from 'vue'

  function useFeature(id: MaybeRefOrGetter<number>) {
    watch(
      () => toValue(id),
      (id) => {
        // id değişikliklerine tepki ver
      }
    )
  }

  // bu Composable aşağıdakilerin hepsini destekler:
  useFeature(1)
  useFeature(ref(1))
  useFeature(() => 1)
  ```

## toRefs() {#torefs}

Tepkisel bir nesneyi, ortaya çıkan nesnedeki her özelliğin orijinal nesnedeki karşılık gelen özelliğe işaret eden bir ref olduğu düz bir nesneye dönüştürür. Her bir ref, [`toRef()`](#toref) kullanılarak oluşturulur.

- **Tür**

  ```ts
  function toRefs<T extends object>(
    object: T
  ): {
    [K in keyof T]: ToRef<T[K]>
  }

  type ToRef = T extends Ref ? T : Ref<T>
  ```

- **Örnek**

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })

  const stateAsRefs = toRefs(state)
  /*
  stateAsRefs'in tipi: {
    foo: Ref<number>,
    bar: Ref<number>
  }
  */

  // Ref ile orijinal özellik birbirine "bağlıdır"
  state.foo++
  console.log(stateAsRefs.foo.value) // 2

  stateAsRefs.foo.value++
  console.log(state.foo) // 3
  ```

  `toRefs`, tepkisel bir nesneyi bir Composable fonksiyondan döndürürken kullanışlıdır; böylece bunu kullanan bileşen, dönen nesneyi destructure/spread ettiğinde tepkiselliği kaybetmez:

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })

    // ...state üzerinde çalışan mantık

    // döndürürken ref'lere dönüştür
    return toRefs(state)
  }

  // tepkiselliği kaybetmeden destructure edilebilir
  const { foo, bar } = useFeatureX()
  ```

  `toRefs`, yalnızca çağrı anında kaynak nesne üzerinde enumerable olan özellikler için ref üretir. Henüz mevcut olmayabilecek bir özellik için ref oluşturmak istiyorsanız bunun yerine [`toRef`](#toref) kullanın.

## isProxy() {#isproxy}

Bir nesnenin [`reactive()`](./reactivity-core#reactive), [`readonly()`](./reactivity-core#readonly), [`shallowReactive()`](./reactivity-advanced#shallowreactive) veya [`shallowReadonly()`](./reactivity-advanced#shallowreadonly) tarafından oluşturulmuş bir proxy olup olmadığını kontrol eder.

- **Tür**

  ```ts
  function isProxy(value: any): boolean
  ```

## isReactive() {#isreactive}

Bir nesnenin [`reactive()`](./reactivity-core#reactive) veya [`shallowReactive()`](./reactivity-advanced#shallowreactive) tarafından oluşturulmuş bir proxy olup olmadığını kontrol eder.

- **Tür**

  ```ts
  function isReactive(value: unknown): boolean
  ```

## isReadonly() {#isreadonly}

Verilen değerin salt okunur bir nesne olup olmadığını kontrol eder. Salt okunur bir nesnenin özellikleri değişebilir, ancak bu nesne üzerinden doğrudan atanamazlar.

[`readonly()`](./reactivity-core#readonly) ve [`shallowReadonly()`](./reactivity-advanced#shallowreadonly) tarafından oluşturulan proxy'lerin her ikisi de salt okunur kabul edilir. Aynı şekilde `set` fonksiyonu olmayan bir [`computed()`](./reactivity-core#computed) ref'i de salt okunur kabul edilir.

- **Tür**

  ```ts
  function isReadonly(value: unknown): boolean
  ```
