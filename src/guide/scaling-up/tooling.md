<script setup>
import { VTCodeGroup, VTCodeGroupTab } from '@vue/theme'
</script>

# Araçlar {#tooling}

## Çevrimiçi Deneyin {#try-it-online}

Vue Tek Dosyalı Bileşenleri (SFC) denemek için bilgisayarınıza bir şey kurmanız gerekmez — doğrudan tarayıcı üzerinde çalışan çevrimiçi oyun alanları (playground) mevcuttur:

- [Vue SFC Playground](https://play.vuejs.org)
  - Her zaman en güncel commit'ten dağıtılır
  - Bileşen derleme sonuçlarını incelemek için tasarlanmıştır
- [StackBlitz üzerinde Vue + Vite](https://vite.new/vue)
  - Tarayıcıda gerçek bir Vite geliştirme sunucusu çalıştıran, IDE benzeri bir ortam
  - Yerel kuruluma en yakın seçenek

Hata raporlarken yeniden üretilebilir örnekler sağlamak için de bu çevrimiçi oyun alanlarını kullanmanız tavsiye edilir.

## Proje İskeleti Oluşturma {#project-scaffolding}

### Vite {#vite}

[Vite](https://vite.dev/), birinci sınıf Vue SFC desteği sunan hafif ve hızlı bir derleme aracıdır (build tool). Vue'nun da yazarı olan Evan You tarafından oluşturulmuştur!

Vite + Vue ile başlamak için şu komutu çalıştırmanız yeterli:

::: code-group

```sh [npm]
$ npm create vue@latest
```

```sh [pnpm]
$ pnpm create vue@latest
```
  
```sh [yarn]
# Yarn Modern (v2+) için
$ yarn create vue@latest
  
# Yarn ^v4.11 için
$ yarn dlx create-vue@latest
```
  
```sh [bun]
$ bun create vue@latest
```

:::

Bu komut, Vue'nun resmi proje iskeleti aracı olan [create-vue](https://github.com/vuejs/create-vue)'yu yükleyip çalıştırır.

- Vite hakkında daha fazla bilgi için [Vite belgelerine](https://vite.dev/) göz atın.
- Bir Vite projesinde Vue'ya özgü davranışları yapılandırmak (örneğin Vue derleyicisine seçenek geçirmek) için [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#readme) belgelerine bakın.

Yukarıda bahsi geçen iki çevrimiçi oyun alanı da dosyaları Vite projesi olarak indirmeyi destekler.

### Vue CLI {#vue-cli}

[Vue CLI](https://cli.vuejs.org/), Vue için resmi webpack tabanlı araç zinciridir. Artık bakım modundadır; yalnızca webpack'e özgü özelliklere bağlı değilseniz yeni projelere Vite ile başlamanızı öneririz. Vite çoğu durumda çok daha iyi bir geliştirici deneyimi sağlayacaktır.

Vue CLI'dan Vite'a geçişe ilişkin bilgiler:

- [VueSchool.io'dan Vue CLI -> Vite Geçiş Rehberi](https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/)
- [Otomatik geçişe yardımcı araçlar / eklentiler](https://github.com/vitejs/awesome-vite#vue-cli)

### Tarayıcı İçi Şablon Derlemesi Hakkında Not {#note-on-in-browser-template-compilation}

Vue'yu bir derleme adımı (build step) olmadan kullandığınızda, bileşen şablonları ya doğrudan sayfanın HTML'sine ya da satır içi (inlined) JavaScript dizeleri olarak yazılır. Bu tür durumlarda Vue'nun, şablonları anlık olarak derleyebilmek için şablon derleyicisini tarayıcıya göndermesi gerekir. Öte yandan şablonları bir derleme adımıyla önceden derlerseniz derleyiciye ihtiyaç kalmaz. İstemci paket boyutunu küçük tutmak için Vue, farklı kullanım senaryolarına göre optimize edilmiş [farklı "derlemeler"](https://unpkg.com/browse/vue@3/dist/) sağlar.

- Adı `vue.runtime.*` ile başlayan dosyalar **yalnızca çalışma zamanı derlemeleridir (runtime-only builds)**: derleyiciyi içermezler. Bu derlemeleri kullanırken tüm şablonların bir derleme adımı aracılığıyla önceden derlenmiş olması gerekir.

- Adında `.runtime` geçmeyen dosyalar **tam derlemelerdir (full builds)**: derleyiciyi içerirler ve şablonları doğrudan tarayıcıda derlemeyi destekler. Ancak bu, paket boyutunu ~14kb artırır.

Varsayılan araç kurulumlarımız, tüm SFC şablonları önceden derlendiği için yalnızca çalışma zamanı derlemesini kullanır. Herhangi bir nedenle, bir derleme adımı olsa bile tarayıcı içi şablon derlemesine ihtiyaç duyarsanız, derleme aracını `vue` modülünü `vue/dist/vue.esm-bundler.js` ile eşleyecek şekilde (alias) yapılandırarak bunu sağlayabilirsiniz.

Derleme adımı olmadan kullanım için daha hafif bir alternatif arıyorsanız [petite-vue](https://github.com/vuejs/petite-vue)'ya göz atın.

## IDE Desteği {#ide-support}

- Önerilen IDE kurulumu, [VS Code](https://code.visualstudio.com/) ile birlikte [Vue - Official eklentisidir](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (önceki adıyla Volar). Eklenti; söz dizimi vurgulama, TypeScript desteği ve şablon ifadeleri ile bileşen props'ları için akıllı tamamlama (intellisense) sağlar.

  :::tip
  Vue - Official, Vue 2 için önceki resmi VS Code eklentimiz olan [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)'un yerini alır. Eğer Vetur halen kuruluysa Vue 3 projelerinde devre dışı bıraktığınızdan emin olun.
  :::

- [WebStorm](https://www.jetbrains.com/webstorm/) da Vue SFC'ler için güçlü yerleşik destek sunar.

- [Language Service Protocol](https://microsoft.github.io/language-server-protocol/) (LSP) destekleyen diğer IDE'ler de Volar'ın çekirdek işlevlerinden LSP üzerinden yararlanabilir:

  - Sublime Text desteği [LSP-Volar](https://github.com/sublimelsp/LSP-volar) üzerinden.

  - vim / Neovim desteği [coc-volar](https://github.com/yaegassy/coc-volar) üzerinden.

  - emacs desteği [lsp-mode](https://emacs-lsp.github.io/lsp-mode/page/lsp-volar/) üzerinden.

## Tarayıcı Geliştirici Araçları {#browser-devtools}

Vue tarayıcı geliştirici araçları (devtools) eklentisi; bir Vue uygulamasının bileşen ağacını keşfetmenizi, tek tek bileşenlerin durumunu incelemenizi, durum yönetimi olaylarını izlemenizi ve performansı profillemenizi sağlar.

![devtools ekran görüntüsü](./images/devtools.png)

- [Belgeler](https://devtools.vuejs.org/)
- [Chrome Eklentisi](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Vite Eklentisi](https://devtools.vuejs.org/guide/vite-plugin)
- [Bağımsız Electron uygulaması](https://devtools.vuejs.org/guide/standalone)

## TypeScript {#typescript}

Ana konu: [Vue'yu TypeScript ile Kullanma](/guide/typescript/overview).

- [Vue - Official eklentisi](https://github.com/vuejs/language-tools); `<script lang="ts">` blokları içeren SFC'ler için şablon ifadeleri ve bileşenler arası props doğrulaması dahil tür denetimi sağlar.

- Aynı tür denetimini komut satırından gerçekleştirmek ya da SFC'ler için `d.ts` dosyaları üretmek için [`vue-tsc`](https://github.com/vuejs/language-tools/tree/master/packages/tsc) kullanın.

## Testler {#testing}

Ana konu: [Test Rehberi](/guide/scaling-up/testing).

- [Cypress](https://www.cypress.io/) uçtan uca (E2E) testler için önerilir. Ayrıca [Cypress Component Test Runner](https://docs.cypress.io/guides/component-testing/introduction) aracılığıyla Vue SFC'leri için bileşen testlerinde de kullanılabilir.

- [Vitest](https://vitest.dev/), Vue / Vite ekibi üyeleri tarafından oluşturulmuş, hıza odaklanan bir test sürücüsüdür (test runner). Özellikle Vite tabanlı uygulamalarda birim / bileşen testleri için aynı anlık geri bildirim döngüsünü sağlayacak şekilde tasarlanmıştır.

- [Jest](https://jestjs.io/), [vite-jest](https://github.com/sodatea/vite-jest) üzerinden Vite ile çalışacak şekilde uyarlanabilir. Ancak bu yalnızca Vite tabanlı bir kuruluma taşımanız gereken mevcut Jest tabanlı test süitleriniz varsa önerilir; aksi halde Vitest, çok daha verimli bir entegrasyonla benzer işlevler sağlar.

## Linting {#linting}

Vue ekibi, SFC'ye özgü linting kurallarını destekleyen bir [ESLint](https://eslint.org/) eklentisi olan [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)'u sürdürmektedir.

Daha önce Vue CLI kullananlar linter'ları webpack loader'ları üzerinden yapılandırmaya alışkın olabilir. Ancak Vite tabanlı bir derleme kurulumunda genel önerimiz şudur:

1. `npm install -D eslint eslint-plugin-vue` komutunu çalıştırın ve ardından `eslint-plugin-vue`'nun [yapılandırma rehberini](https://eslint.vuejs.org/user-guide/#usage) izleyin.

2. [VS Code için ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) gibi ESLint IDE eklentilerini kurun; böylece geliştirme sırasında doğrudan editörünüzde linter geri bildirimi alırsınız. Bu aynı zamanda geliştirme sunucusu başlatılırken gereksiz linting maliyetini de önler.

3. ESLint'i üretim derleme komutunuzun bir parçası olarak çalıştırın; böylece ürünü üretime göndermeden önce tam linter geri bildirimi almış olursunuz.

4. (İsteğe bağlı) git commit anında değişen dosyaları otomatik olarak lint'ten geçirmek için [lint-staged](https://github.com/okonet/lint-staged) gibi araçları kurun.

## Biçimlendirme {#formatting}

- [Vue - Official](https://github.com/vuejs/language-tools) VS Code eklentisi, Vue SFC'leri için kutudan çıkar çıkmaz biçimlendirme (formatting) sağlar.

- Alternatif olarak [Prettier](https://prettier.io/) da yerleşik Vue SFC biçimlendirme desteği sunar.

## SFC Özel Blok Entegrasyonları {#sfc-custom-block-integrations}

Özel bloklar (custom blocks), farklı sorgu parametreleriyle aynı Vue dosyasına yapılan import’lara derlenir. Bu import’ların nasıl ele alınacağı, kullanılan derleme aracına bağlıdır.

- Vite kullanıyorsanız, eşleşen özel blokları çalıştırılabilir JavaScript'e dönüştürmek için özel bir Vite eklentisi kullanılmalıdır. [Örnek](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue#example-for-transforming-custom-blocks)

- Vue CLI veya düz webpack kullanıyorsanız, eşleşen blokları dönüştürmek için bir webpack loader yapılandırılmalıdır. [Örnek](https://vue-loader.vuejs.org/guide/custom-blocks.html)

## Alt Seviye Paketler {#lower-level-packages}

### `@vue/compiler-sfc` {#vue-compiler-sfc}

- [Belgeler](https://github.com/vuejs/core/tree/main/packages/compiler-sfc)

Bu paket, Vue çekirdek monorepo'sunun bir parçasıdır ve her zaman ana `vue` paketiyle aynı sürümde yayımlanır. Ana `vue` paketine bağımlılık olarak dahil edilir ve `vue/compiler-sfc` altında proxy olarak sunulur; bu nedenle ayrıca yüklemenize gerek yoktur.

Paketin kendisi, Vue SFC’leri işlemek için alt seviye yardımcı araçlar sağlar ve yalnızca kendi araçlarında Vue SFC desteği sunması gereken geliştiricilere yöneliktir.

:::tip
Bu paketi, sürümünün Vue çalışma zamanıyla eşzamanlı olmasını garanti altına almak için her zaman `vue/compiler-sfc` derin içe aktarımı (deep import) üzerinden kullanmayı tercih edin.
:::

### `@vitejs/plugin-vue` {#vitejs-plugin-vue}

- [Belgeler](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue)

Vite içinde Vue SFC desteği sağlayan resmi eklenti.

### `vue-loader` {#vue-loader}

- [Belgeler](https://vue-loader.vuejs.org/)

webpack içinde Vue SFC desteği sağlayan resmi loader. Vue CLI kullanıyorsanız ayrıca [Vue CLI'da `vue-loader` seçeneklerini değiştirmeye ilişkin belgelere](https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader) göz atın.

## Diğer Çevrimiçi Oyun Alanları {#other-online-playgrounds}

- [VueUse Playground](https://play.vueuse.org)
- [Repl.it üzerinde Vue + Vite](https://replit.com/@templates/VueJS-with-Vite)
- [CodeSandbox üzerinde Vue](https://codesandbox.io/p/devbox/github/codesandbox/sandbox-templates/tree/main/vue-vite)
- [Codepen üzerinde Vue](https://codepen.io/pen/editor/vue)
- [WebComponents.dev üzerinde Vue](https://webcomponents.dev/create/cevue)

<!-- TODO ## Backend Framework Integrations -->
