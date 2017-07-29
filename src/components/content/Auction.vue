<template>
    <div class="columns pad">
      <div class="column is-2">
        <!-- auction side panel, only shown if user logged in-->
        <auction-side-nav></auction-side-nav>
      </div>
      <div class="column is-10">
        <!-- user can only access auction info if not logged -->
        <transition name="fade" mode="out-in">
          <auction-user-panel v-if="isUserLoggedIn"></auction-user-panel>
        </transition>
        <auction-page></auction-page>
      </div>
    </div>
		
</template>


<script>
import {mapGetters} from 'vuex'
import AuctionSideNav from '@/components/content/AuctionSideNav.vue'
import AuctionUserPanel from '@/components/content/AuctionUserPanel.vue'
import AuctionPage from '@/components/content/AuctionPage.vue'

export default {
  name: 'Auction',
  components: {
    'auction-side-nav': AuctionSideNav,
    'auction-user-panel': AuctionUserPanel,
    'auction-page': AuctionPage
  },
  computed: {
    ...mapGetters(['isUserLoggedIn'])
  }
}

</script>

<style scoped>
.pad {
	margin-top: 50px;
  margin-left: 50px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>