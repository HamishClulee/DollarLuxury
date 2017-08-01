<template>
<div class="container has-text-centered mail-box">
  <h1 class="title is-2">MailBox</h1>
  <template v-for="mail in userMessages">
    <div class="box">
      <h1 class="title is-3">{{ mail.mailSummary.subject }}</h1>
      <div>{{ mail.mailSummary.date }}</div>
      <p>{{ mail.longBody }}</p>
    </div>

  </template>
</div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'
import moment from 'moment'
import { HTTP } from '@/axios'

export default {
  name: 'MailBox',
  data() {
    return {
      userMessages: [] 
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    makeDateReadable(date) {
      return moment(date).format("DD/MM/YYYY")
    }
  },
  mounted() {
    HTTP.get("usermail/" + this.getUser.email)
      .then(response => this.userMessages = response.data)
      .catch( error => this.SET_HTTP_ERROR())
  }
}

</script>

<style scoped>
.mail-box {
  width: 100%;
  padding: 30px;
}
</style>