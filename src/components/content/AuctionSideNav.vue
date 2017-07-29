<template>
  <div>
    <aside class="menu" v-if="isUserLoggedIn">
	  <p class="menu-label">
	    Account History
	  </p>
	  <ul class="menu-list">
	    <li><a>Bid History</a></li>
	    <li><a>Recent Auctions</a></li>
	  </ul>
	  <p class="menu-label">
	    Admin
	  </p>
	  <ul class="menu-list">
	    <li><a>Update Details</a></li>
	    <li><a>Suggestions</a></li>
	    <li><a>Get Help</a></li>
	  </ul>
	  <p class="menu-label">
	    Transactions
	  </p>
	  <ul class="menu-list">
	    <li><a>Payments</a></li>
	    <li><a>My Auctions</a></li>
	    <li><a>Balance</a></li>
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