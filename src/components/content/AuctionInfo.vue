<template>
  <!-- Displays additional infor regarding a specific auction, this component is not gaurded and can be viewed if not logged in -->
  <div>
    <h1 class="title">{{ getCurrentAuction.name }}</h1>
    <h2 class="subtitle">{{ getCurrentAuction.longDescription }}</h2>
    <h2 class="subtitle"><a :href="getCurrentAuction.additionalInformationLink">More info...</a></h2>
    <h2 class="subtitle">Auction created {{ dateCreated }} days ago...</h2>
    <slot></slot>
    <div class="card-image">
      <div class="columns">
        <div class="column is-3">
          <figure class="image is-256x256">
            <img src="http://bulma.io/images/placeholders/256x256.png">
          </figure>
          </div>
        <div class="column is-3">
          <figure class="image is-256x256">
            <img src="http://bulma.io/images/placeholders/256x256.png">
          </figure>
          </div>
        <div class="column is-3">
          <figure class="image is-256x256">
            <img src="http://bulma.io/images/placeholders/256x256.png">
          </figure>
          </div>
        <div class="column is-3">
          <figure class="image is-256x256">
            <img src="http://bulma.io/images/placeholders/256x256.png">
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {HTTP} from '@/axios'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AuctionInfo',
  data () {
    return {
      auction: {}
    }
  },
  mounted () {
	   this.FETCH_CURRENT_AUCTION(this.$route.params.id)
  },
  computed:{
    // formate the creation date as X days ago...
  	dateCreated () {
  		return moment().diff(this.getCurrentAuction.dateCreated, 'days')
  	},
    ...mapGetters(['getCurrentAuction'])
  },
  methods: {
    ...mapActions(['FETCH_CURRENT_AUCTION'])
  }
}
</script>