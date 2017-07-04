<template>
  <div>
    <!-- <dollar-spinner-small v-if="pending"></dollar-spinner-small> -->
    <div class="bidding-container"></div>
    <a class="button" @click="tryConnect">Button</a>
  </div>
</template>


<script>
import DollarSpinnerSmall from '@/components/util/DollarSpinnerSmall.vue'
import SockJS from 'sockjs-client'

export default {
  name: 'AuctionBidding',
  components: {
  	'dollar-spinner-small': DollarSpinnerSmall
  },
  data () {
    return {
      msg: '',
      pending: true,
      ready: false,
      invokeIdCnt: 0
    }
  },
  methods: {
    tryConnect() {
      var sock = new SockJS('http://localhost:8080/bid');
      console.log(sock)

      sock.onopen = function() {
        console.log('open');
        sock.send({id: "1212"});
      };

    } 
  }
}

</script>

<style>
.bidding-container {
	height: 800px;
	background-color: white;
}

</style>