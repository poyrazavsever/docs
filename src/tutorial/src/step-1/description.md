# Başlangıç {#getting-started}

Vue eğitimine hoş geldiniz!

Bu eğitimin amacı, Vue ile doğrudan tarayıcı üzerinden çalışmayı size hızlıca deneyimletmektir. Bu bölüm kapsamlı bir rehber olma iddiası taşımaz, bu yüzden bir sonraki adıma geçmeden önce her detayı bütünüyle kavramış olmanıza gerek yoktur. Yine de bu eğitimi tamamladıktan sonra, her konuyu daha derinlemesine ele alan <a target="_blank" href="/guide/introduction.html">Rehber</a> bölümünü mutlaka okumanızı öneririz.

## Ön Gereksinimler {#prerequisites}

Bu eğitim, temel düzeyde HTML, CSS ve JavaScript bilginizin olduğunu varsayar. Eğer ön yüz (front-end) geliştirmede tamamen yeniyseniz, ilk adım olarak doğrudan bir framework ile çalışmaya başlamak iyi bir fikir olmayabilir. — Öncelikle temelleri kavrayıp ardından geri dönün! Daha önceden farklı framework'lerle çalışmış olmak öğrenme sürecini kolaylaştırsa da bir zorunluluk değildir.

## Eğitim Aracı Nasıl Kullanılır? {#how-to-use-this-tutorial}

Kodlarınızı <span class="wide">sağ tarafta bulunan alanda</span><span class="narrow">aşağıdaki alanda</span> düzenleyebilir ve sonucun eşzamanlı bir şekilde "Preview" alanında güncellendiğini görebilirsiniz. Her eğitim adımında Vue'nun temel bir özelliği tanıtılacak ve demoyu çalışır hale getirmek için kodu tamamlamanız beklenecektir. Eğer takılırsanız, çalışan kodu sizin için gösteren bir "Bana göster!" (Show me!) butonu olacaktır. Daha iyi bir öğrenme için bu butonu kullanmamaya çalışın.

Vue 2 veya diğer framework'lerden gelen deneyimli bir geliştiriciyseniz, bu eğitimden en iyi şekilde yararlanmak için değiştirebileceğiniz birkaç ayar bulunmaktadır. Yeni başlıyorsanız, varsayılan ayarlarla devam etmeniz önerilir.

<details>
<summary>Eğitim Ayar Detayları</summary>

- Vue iki API stili sunar: Options API ve Composition API. Bu eğitim her ikisi için de çalışacak şekilde tasarlanmıştır; üstteki **API Tercihi** (API Preference) anahtarlarını kullanarak tercih ettiğiniz stili seçebilirsiniz. <a target="_blank" href="/guide/introduction.html#api-styles">API stilleri hakkında daha fazla bilgi edinin</a>.

- Kod örneklerini SFC veya HTML modunda inceleme seçeneğiniz de var. SFC modu, Vue'yu bir derleme adımıyla (build step) geliştiren çoğu yazılımcının standart tercihi olan <a target="_blank" href="/guide/introduction.html#single-file-components">Tek Dosyalı Bileşen</a> (SFC) formatını baz alır. HTML modu ise hiçbir derleme aracına ihtiyaç duymadan kodun en yalın kullanım şeklini gösterir.

<div class="html">

:::tip İpucu
Kendi uygulamalarınızda bir derleme adımı olmadan HTML modunu kullanacaksanız, scriptlerinizin içindeki import'ları şu şekilde kullandığınızdan emin olun:

```js
import { ... } from 'vue/dist/vue.esm-bundler.js'
```

Veya **paketleyicinizi** (bundler) `vue` paketini buna göre çözümleyecek şekilde yapılandırın. [Vite](https://vite.dev/) için örnek yapılandırma:

```js [vite.config.js]
export default {
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
}
```

Daha fazla bilgi için [Araçlar içerisindeki ilgili bölüme](/guide/scaling-up/tooling.html#note-on-in-browser-template-compilation) bakın.
:::

</div>

</details>

Hazır mısınız? Başlamak için "Sonraki" (Next) butonuna tıklayın.