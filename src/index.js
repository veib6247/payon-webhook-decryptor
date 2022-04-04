import 'bulma'

const mainInstance = {
  data() {
    return {
      secret: '',
      authenticationTag: '',
      initializationVector: '',
      encryptedBody: '',
      decryptedBody: '',
    }
  },

  methods: {
    async submit() {
      try {
        // fetch
        const rawResponse = await fetch('./decryptor.php', {
          method: 'POST',
          body: JSON.stringify({
            secret: this.secret,
            authenticationTag: this.authenticationTag,
            initializationVector: this.initializationVector,
            encryptedBody: this.encryptedBody,
          }),
        })

        // fullfill promise
        const response = await rawResponse.json()

        this.decryptedBody = response
      } catch (error) {
        console.error(error)
      }
    },
  },
}

Vue.createApp(mainInstance).mount('#app')
