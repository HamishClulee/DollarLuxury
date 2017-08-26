<template>
  <div>
    <aside class="menu" v-if="isUserLoggedIn">
	  <p class="menu-label">
	    Account History
	  </p>
	  <ul class="menu-list">
	    <li><router-link as="a" to="/account">Bid History</router-link></li>
	    <li><router-link as="a" to="/account">Recent Auctions</router-link></li>
	  </ul>
	  <p class="menu-label">
	    Transactions
	  </p>
	  <ul class="menu-list">
	    <li><router-link as="a" to="/account">Payments</router-link></li>
	    <li><router-link as="a" to="/account">My Auctions</router-link></li>
	    <li><router-link as="a" to="/account">Balance</router-link></li>
	  </ul>
	</aside>
	<aside class="menu" v-if="!isUserLoggedIn">
	  <p class="menu-label">
	    Please Log In to your account!
	  </p>
	  <a v-if="!isUserLoggedIn"class="button is-large is-danger is-fullwidth">Login to start bidding</a>
	</aside>  
  </div>
</template>


<script>
import {mapGetters} from 'vuex'

export default {
  name: 'AuctionSideNav',
  data () {
    return {
      msg: ''
    }
  },
  computed: {
  	...mapGetters(['isUserLoggedIn'])
  },
  methods: {

  }
}

</script>

<style>

</style>