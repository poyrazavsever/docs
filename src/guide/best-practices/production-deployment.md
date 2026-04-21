# Üretim Ortamına Dağıtım {#production-deployment}

## Geliştirme ve Üretim Karşılaştırması {#development-vs-production}

Geliştirme aşamasında Vue, geliştirme deneyimini iyileştirmek için çeşitli özellikler sunar:

- Sık karşılaşılan hatalar ve tuzaklar için uyarılar
- Props / olay (event) doğrulaması
- [Tepkisellik hata ayıklama kancaları (hooks)](/guide/extras/reactivity-in-depth#reactivity-debugging)
- Geliştirici araçları (Devtools) entegrasyonu

Ancak, bu özellikler üretim ortamında (production) gereksizleşir. Bazı uyarı kontrolleri az da olsa performans yükü oluşturabilir. Üretim ortamına dağıtım yaparken, daha küçük dosya boyutu ve daha iyi performans elde etmek için kullanılmayan, yalnızca geliştirmeye yönelik kod dallarını (code branches) kaldırmalıyız.

## Derleme Araçları Olmadan {#without-build-tools}

Eğer Vue'yu bir CDN veya kendi barındırdığınız (self-hosted) bir betik dosyası üzerinden yükleyerek yapı aracı (build tool) olmadan kullanıyorsanız, üretime dağıtırken üretim derlemesini (`.prod.js` ile biten dist dosyaları) kullandığınızdan emin olun. Üretim derlemeleri (production builds), geliştirme odaklı tüm kod dalları kaldırılarak önceden küçültülmüş (minified) haldedir.

- Eğer global derleme kullanıyorsanız (`Vue` global değişkeni üzerinden erişim): `vue.global.prod.js` dosyasını kullanın.
- Eğer ESM derlemesi kullanıyorsanız (yerel ESM içe aktarımları ile erişim): `vue.esm-browser.prod.js` dosyasını kullanın.

Daha fazla detay için [dist dosyası kılavuzuna](https://github.com/vuejs/core/tree/main/packages/vue#which-dist-file-to-use) göz atın.

## Derleme Araçlarıyla {#with-build-tools}

`create-vue` (Vite tabanlı) veya Vue CLI (webpack tabanlı) aracılığıyla oluşturulan projeler, üretim derlemeleri için önceden yapılandırılmıştır.

Eğer özel bir kurulum (custom setup) kullanıyorsanız şunlardan emin olun:

1. `vue` referansının `vue.runtime.esm-bundler.js` dosyasını işaret ettiğinden.
2. [Derleme zamanı özellik bayraklarının](/api/compile-time-flags) uygun şekilde yapılandırıldığından.
3. <code>process.env<wbr>.NODE_ENV</code> değerinin derleme işlemi sırasında `"production"` ile değiştirildiğinden.

Ek referanslar:

- [Vite üretim derleme kılavuzu](https://vite.dev/guide/build.html)
- [Vite dağıtım kılavuzu](https://vite.dev/guide/static-deploy.html)
- [Vue CLI dağıtım kılavuzu](https://cli.vuejs.org/guide/deployment.html)

## Çalışma Zamanı Hatalarını İzleme {#tracking-runtime-errors}

[Uygulama düzeyindeki hata işleyici](/api/application#app-config-errorhandler), hataları izleme servislerine (tracking services) bildirmek için kullanılabilir:

```js
import { createApp } from 'vue'

const app = createApp(...)

app.config.errorHandler = (err, instance, info) => {
  // hataları izleme servislerine bildirin
}
```

[Sentry](https://docs.sentry.io/platforms/javascript/guides/vue/) ve [Bugsnag](https://docs.bugsnag.com/platforms/javascript/vue/) gibi servisler aynı zamanda Vue için resmi entegrasyonlar sağlamaktadır.
