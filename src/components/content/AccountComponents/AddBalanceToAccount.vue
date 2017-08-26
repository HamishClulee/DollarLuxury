<template>
  <section class="is-fullwidth box section">
    <h1 class="title is-3 has-text-centered">
      Add Funds to Your Account
    </h1>
    <div class="field">
	  <div class="control">
	    <input class="input is-large" max="999" type="number" placeholder="Amount to add..." v-model="numDollarsToAdd">
	  </div>
	  <button class="button is-primary is-fullwidth is-outlined" @click="addFundsToAccount">Add Funds</button>
	</div>
  </section>
</template>


<script>
import { HTTP } from '@/axios'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'AddBalanceToAccount',
  data () {
    return {
      numDollarsToAdd: 0
    }
  },
  methods: {
    ...mapMutations(['ADD_FUNDS_TO_ACCOUNT', 'SET_HTTP_ERROR']),
    addFundsToAccount() {

      var payload = { add: this.numDollarsToAdd, email: this.getUserEmail };

      HTTP.post('addfunds', payload)
        .then(response => this.ADD_FUNDS_TO_ACCOUNT(response.data.updatedBalance))
        .catch(error => this.SET_HTTP_ERROR())

    }
  },
  computed: {
    ...mapGetters(['getUserEmail'])
  }
}

</script>

<style>

</style>