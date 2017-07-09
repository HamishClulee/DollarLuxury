<template>
  <div v-if="show" class="notification is-warning">
	  <button class="delete" @click="closeErrorWarning"></button>
	  <strong>Looks like your account is out of gas! </strong></br><a>top it up by clikcing here</a>
  </div>
</template>


<script>
export default {
  name: 'NoBalanceNotification',
  data () {
    return {
      show: true
    }
  },
  methods: {
  	closeErrorWarning() {
  		this.show = false
  	}
  }
}

</script>

<style>

</style>