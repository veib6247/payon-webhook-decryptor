<script>
export default {
  data() {
    return {
      secret: "",
      authenticationTag: "",
      initializationVector: "",
      encryptedBody: "",
      decryptedBody: "",
    };
  },

  methods: {
    async submit() {
      try {
        // fetch
        const rawResponse = await fetch("./decryptor.php", {
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
        console.error(error);
      }
    },
  },
};
</script>

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
      <a class="button is-warning" @click="submit">Decrypt</a>
    </div>
  </div>

  <div class="field" v-show="decryptedBody">
    <div class="control">
      <textarea
        cols="30"
        rows="20"
        class="textarea is-family-monospace"
        v-model="decryptedBody"
      ></textarea>
    </div>
  </div>
</template>