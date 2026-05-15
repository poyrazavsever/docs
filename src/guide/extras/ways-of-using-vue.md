# Vue Kullanım Yolları {#ways-of-using-vue}

Web için "herkese uyan tek bir beden" senaryosunun olmadığına inanıyoruz. Bu nedenle Vue, esnek ve kademeli olarak benimsenebilir şekilde tasarlanmıştır. Kullanım durumunuza bağlı olarak Vue, yığın karmaşıklığı, geliştirici deneyimi ve nihai performans arasında en uygun dengeyi kurmak için farklı şekillerde kullanılabilir.

## Bağımsız Betik {#standalone-script}

Vue, bağımsız bir betik dosyası olarak kullanılabilir - derleme adımına gerek yoktur! HTML'in büyük bir kısmını zaten render eden bir arka uç çerçeveniz varsa veya ön uç mantığınız bir derleme adımını gerektirecek kadar karmaşık değilse, bu Vue'yu yığınıza entegre etmenin en kolay yoludur. Bu tür durumlarda Vue'yu jQuery'nin daha bildirimsel bir alternatifi olarak düşünebilirsiniz.

Daha önce, mevcut HTML'i aşamalı olarak geliştirmek için özel olarak optimize edilmiş [petite-vue](https://github.com/vuejs/petite-vue) adında alternatif bir dağıtım sunuyorduk. Ancak, petite-vue artık aktif olarak sürdürülmemektedir ve yayınlanan son sürümü Vue 3.2.27'dir.

## Gömülü Web Bileşenleri {#embedded-web-components}

Vue'yu, nasıl render edildiklerine bakılmaksızın herhangi bir HTML sayfasına gömülebilen [standart Web Bileşenleri oluşturmak](/guide/extras/web-components) için kullanabilirsiniz. Bu seçenek, Vue'yu tamamen tüketiciden bağımsız bir şekilde kullanmanıza olanak tanır: ortaya çıkan web bileşenleri eski uygulamalara, statik HTML'e ve hatta diğer çerçevelerle oluşturulmuş uygulamalara gömülebilir.

## Tek Sayfalı Uygulama (SPA) {#single-page-application-spa}

Bazı uygulamalar ön uçta zengin etkileşim, derin oturum süresi ve önemsiz olmayan durum (state) mantığı gerektirir. Bu tür uygulamaları oluşturmanın en iyi yolu, Vue'nun yalnızca tüm sayfayı kontrol etmekle kalmayıp, aynı zamanda sayfayı yeniden yüklemeye gerek kalmadan veri güncellemelerini ve gezinmeyi de işlediği bir mimari kullanmaktır. Bu tür uygulamalar genellikle Tek Sayfalı Uygulama (Single-Page Application) olarak adlandırılır.

Vue, modern SPA'lar oluşturmak için harika bir geliştirici deneyimiyle birlikte çekirdek kütüphaneler ve [kapsamlı araç desteği](/guide/scaling-up/tooling) sunar, bunlara şunlar dahildir:

- İstemci tarafı yönlendirici
- İnanılmaz hızlı derleme araç zinciri
- IDE desteği
- Tarayıcı geliştirici araçları
- TypeScript entegrasyonları
- Test araçları

SPA'lar genellikle arka ucun API uç noktalarını sunmasını gerektirir; ancak sunucu merkezli bir geliştirme modelini korurken SPA avantajlarını elde etmek için Vue'yu [Inertia.js](https://inertiajs.com) gibi çözümlerle de eşleştirebilirsiniz.

## Fullstack / SSR {#fullstack-ssr}

Tamamen istemci tarafı olan SPA'lar, uygulamanın SEO'ya ve içeriğin yüklenme süresine duyarlı olduğu durumlarda sorunludur. Bunun nedeni, tarayıcının büyük ölçüde boş bir HTML sayfası alması ve herhangi bir şeyi render etmeden önce JavaScript'in yüklenmesini beklemek zorunda kalmasıdır.

Vue, bir Vue uygulamasını sunucuda HTML dizelerine "render etmek" için birinci sınıf API'ler sağlar. Bu, sunucunun önceden render edilmiş HTML'i geri göndermesine olanak tanıyarak son kullanıcıların JavaScript indirilirken içeriği anında görmelerini sağlar. Vue daha sonra uygulamayı etkileşimli hale getirmek için istemci tarafında "hydrate" eder. Buna [Sunucu Tarafı Render Etme (Server-Side Rendering)](/guide/scaling-up/ssr) denir ve [En Büyük Zengin İçerikli Boyama (LCP)](https://web.dev/lcp/) gibi Önemli Web Verileri metriklerini büyük ölçüde iyileştirir.

Bu paradigma üzerine inşa edilmiş, Vue ve JavaScript kullanarak fullstack bir uygulama geliştirmenize olanak tanıyan [Nuxt](https://nuxt.com/) gibi daha üst düzey Vue tabanlı çerçeveler bulunmaktadır.

## JAMStack / SSG {#jamstack-ssg}

Gerekli veriler statik ise, sunucu tarafı render işlemi önceden yapılabilir. Bu, tüm bir uygulamayı önceden (pre-render) HTML'e dönüştürüp bunları statik dosyalar olarak sunabileceğimiz anlamına gelir. Bu işlem, site performansını artırır ve artık her istekte sayfaları dinamik olarak render etmemize gerek kalmadığından dağıtımı çok daha basit hale getirir. Vue, istemcide zengin bir etkileşim sağlamak için bu tür uygulamaları hala hydrate edebilir. Bu teknik genellikle Statik Site Üretimi (SSG - Static-Site Generation) olarak adlandırılır ve aynı zamanda [JAMStack](https://jamstack.org/what-is-jamstack/) olarak da bilinir.

İki tür SSG vardır: tek sayfalı ve çok sayfalı. Her iki tür de siteyi statik HTML'e önceden render eder, fark şudur:

- İlk sayfa yüklendikten sonra, tek sayfalı bir SSG sayfayı hydrate ederek bir SPA'ya dönüştürür. Bu, başlangıçta daha fazla JS yükü ve hydration maliyeti gerektirir, ancak sayfayı tamamen yeniden yüklemek yerine yalnızca sayfa içeriğini kısmen güncellemesi gerektiğinden sonraki gezinmeler daha hızlı olacaktır.

- Çok sayfalı bir SSG, her gezinmede yeni bir sayfa yükler. Avantajı, sayfa herhangi bir etkileşim gerektirmiyorsa çok az JS gönderebilmesi veya hiç JS göndermemesidir! [Astro](https://astro.build/) gibi bazı çok sayfalı SSG çerçeveleri, statik HTML içinde etkileşimli "adalar" oluşturmak için Vue bileşenlerini kullanmanıza olanak tanıyan "kısmi hydration"ı (partial hydration) da destekler.

Önemsiz olmayan bir etkileşim, derin oturum süreleri veya gezinmeler arasında kalıcı öğeler / durum (state) bekliyorsanız, tek sayfalı SSG'ler daha uygundur. Aksi takdirde, çok sayfalı SSG daha iyi bir seçim olacaktır.

Vue ekibi aynı zamanda şu anda okuduğunuz bu web sitesine güç veren [VitePress](https://vitepress.dev/) adında bir statik site oluşturucu da sürdürmektedir! VitePress her iki SSG türünü de destekler. [Nuxt](https://nuxt.com/) da SSG'yi destekler. Hatta aynı Nuxt uygulamasında farklı rotalar için SSR ve SSG'yi karıştırarak birlikte bile kullanabilirsiniz.

## Web'in Ötesi {#beyond-the-web}

Vue, öncelikli olarak web uygulamaları oluşturmak için tasarlanmış olsa da, kesinlikle sadece tarayıcıyla sınırlı değildir. Şunları yapabilirsiniz:

- [Electron](https://www.electronjs.org/) veya [Wails](https://wails.io) ile masaüstü uygulamaları geliştirmek
- [Ionic Vue](https://ionicframework.com/docs/vue/overview) ile mobil uygulamalar geliştirmek
- Aynı kod tabanından [Quasar](https://quasar.dev/) veya [Tauri](https://tauri.app) ile masaüstü ve mobil uygulamalar geliştirmek
- [TresJS](https://tresjs.org/) ile 3 boyutlu WebGL deneyimleri oluşturmak
- [Terminal](https://github.com/vue-terminal/vue-termui) için olanlar gibi özel render ediciler oluşturmak için Vue'nun [Özel Render Edici API'sini (Custom Renderer API)](/api/custom-renderer) kullanmak!
