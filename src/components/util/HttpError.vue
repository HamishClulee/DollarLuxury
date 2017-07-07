<template>
	<div v-if="show" class="notification is-warning">
	  <button class="delete" @click="closeErrorWarning"></button>
	  <strong>HTTP error - enter the error message here - wooooo yipee kai yay motherfucker! </strong><a>visit the support section for some helpy helps</a>
	</div>
</template>

<script>
export default {
  name: 'HttpError',
  data () {
    return {
      show: true
    }
  },
  methods: {
  	closeErrorWarning () {
  		this.show = false
  	}
  }
}
</script>

<style>

</style>