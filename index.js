const mainInstance = {
  data() {
    return {
      message: 'Hello Vue!',
    }
  },
}

Vue.createApp(mainInstance).mount('#app')
