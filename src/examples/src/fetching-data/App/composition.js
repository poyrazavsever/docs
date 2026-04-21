import { ref, watchEffect } from 'vue'

const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`
const branches = ['main', 'minor']

export default {
  setup() {
    const currentBranch = ref(branches[0])
    const commits = ref([])

    watchEffect(async () => {
      // bu efekt (watchEffect) anında ilk çalışmasını yapar ve sonrasında
      // currentBranch.value verisi her değiştiğinde yeniden tetiklenir
      const url = `${API_URL}${currentBranch.value}`
      commits.value = await (await fetch(url)).json()
    })

    function truncate(v) {
      const newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    }

    function formatDate(v) {
      return v.replace(/T|Z/g, ' ')
    }

    return {
      branches,
      currentBranch,
      commits,
      truncate,
      formatDate
    }
  }
}
