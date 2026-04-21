import { ref } from 'vue'

export default {
  setup() {
    /* Bir "ref", bir değeri saklayan tepkisel (reactive) bir veri kaynağıdır.
    Teknik olarak, string'i ekranda görüntüleyebilmek için ref() içine
    sarmalamamıza gerek yoktur, ancak değeri ileride değiştirmeyi niyet
    edersek bunun neden gerekli olduğunu bir sonraki örnekte göreceğiz. */

    const message = ref('Hello World!')

    return {
      message
    }
  }
}
