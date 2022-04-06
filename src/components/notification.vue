<script>
export default {
  props: {
    notificationMsg: String,
  },
};
</script>

<template>
  <div class="notification is-danger">{{ notificationMsg }}</div>
</template>
