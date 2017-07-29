<template>
  <router-link to="/mailbox" as="div" class="message-container">
    <small>{{ date }}</small>
    <h6 class="message-subject">{{ subject }}</h6>
    <p class="message-body-local">{{ message }}</p>
  </router-link>
</template>


<script>
export default {
  name: 'MessageSummary',
  props: ['date', 'subject', 'message']
}

</script>

<style scoped>
.message-container {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ADADAD;
}

.message-container:last-child {
  border-bottom: none;
}

small {
  font-size: 10px;
  display: flex;
  text-align: right;
}

.message-subject {
  font-size: 12px;
}

.message-body-local{
  font-size: 14px;
}
</style>