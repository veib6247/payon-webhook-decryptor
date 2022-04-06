<script>
import Notification from "./notification.vue";

export default {
  // register component(s)
  components: {
    Notification,
  },

  // all ze data
  data() {
    return {
      secret: "",
      authenticationTag: "",
      initializationVector: "",
      encryptedBody: "",
      decryptedBody: "",
      decryptionFailed: false,

      // paths
      serverDecryptorScriptPath: "../php/decryptor.php",

      // button states
      decryptButton: {
        isLoading: false,
      },
    };
  },

  // meth, lol
  methods: {
    async submit() {
      // clear previously stored decrypted body
      this.decryptedBody = "";
      this.decryptionFailed = false;

      try {
        this.decryptButton.isLoading = true;
        // fetch
        const rawResponse = await fetch(this.serverDecryptorScriptPath, {
          method: "POST",
          body: JSON.stringify({
            secret: this.secret,
            authenticationTag: this.authenticationTag,
            initializationVector: this.initializationVector,
            encryptedBody: this.encryptedBody,
          }),
        });

        // fullfill promise
        const response = await rawResponse.json();
        this.decryptedBody = response;
      } catch (error) {
        this.decryptionFailed = true;
        console.error(error);
      } finally {
        this.decryptButton.isLoading = false;
      }
    },
  },
};
</script>
<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
<template>
  <div class="field">
    <label class="label">BIP Secret</label>
    <div class="control">
      <input class="input" type="password" v-model="secret" />
    </div>
  </div>

  <div class="field">
    <div class="control">
      <label class="label">x-authentication-tag</label>
      <input type="password" class="input" v-model="authenticationTag" />
    </div>
  </div>

  <div class="field">
    <div class="control">
      <label class="label">x-initialization-vector</label>
      <input type="password" class="input" v-model="initializationVector" />
    </div>
  </div>

  <div class="field">
    <div class="control">
      <label class="label">Encrypted Body</label>
      <input type="password" class="input" v-model="encryptedBody" />
    </div>
  </div>

  <div class="field">
    <div class="control">
      <a
        class="button is-warning"
        :class="{ 'is-loading': decryptButton.isLoading }"
        @click="submit"
        >Decrypt</a
      >
    </div>
  </div>

  <Transition>
    <Notification
      notification-msg="The server failed to decrypt your data, please check your inputs and try again."
      v-show="decryptionFailed"
    />
  </Transition>

  <Transition>
    <div class="field" v-show="decryptedBody">
      <div class="control">
        <textarea
          cols="30"
          rows="35"
          class="textarea is-family-monospace"
          spellcheck="false"
          readonly
          >{{ decryptedBody }}</textarea
        >
      </div>
    </div>
  </Transition>
</template>