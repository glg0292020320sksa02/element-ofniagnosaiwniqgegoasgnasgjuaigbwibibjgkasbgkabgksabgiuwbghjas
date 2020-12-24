import Vue from 'vue'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

Vue.prototype.$timeout = timeout
