<template>
	<div v-if="show" class="notification is-success winner-g-funk">
	  <button class="delete" @click="closeWinNotification"></button>
	  <strong>Holy Shit bro! You might have won!! Our servers are just calculating the final result!! Good news is, if youre seeing this message trhen you have at least won an account updgrade!!!! </strong><a>keep an eye on your email!!</a>
	</div>
</template>


<script>
export default {
  name: 'AuctionWonNotification',
  data () {
    return {
      show: true
    }
  },
  methods: {
  	closeWinNotification() {
  		this.show = false
  	}
  }
}

</script>

<style scoped>
.notification {
	
}

.winner-g-funk {
	font-size: 28px;
	height: 400px;
	align-items: center;
	justify-content: center;
	display: flex;
}

</style>