<template>
  <div>
    <section class="home-container">
      <div class="columns">
        <div class="column home-icon-box">
          <i class="fa fa-sign-in is-large one"></i>
          <h1 class="title is-2">Step 1</h1>
          <p>Sign up using your email address and a password, or log in with Google or Facebook.</p>
        </div>
        <div class="column home-icon-box">
          <i class="fa fa-play-circle-o is-large two"></i>
          <h1 class="title is-2">Step 2</h1>
          <p>Watch the video below, it explains the process and how everything works.</p>
        </div>
        <div class="column home-icon-box">
          <i class="fa fa-money is-large three"></i>
          <h1 class="title is-2">Step 3</h1>
          <p>Head over to the auction page and start bidding, maybe pick up a big screen for a dollar?</p>
        </div>
      </div>
      <div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/QB4oIxcVmlc" frameborder="0" allowfullscreen></iframe></div>
    </section>
  </div>
</template>


<script>
import AuctionList from '@/components/content/AuctionList.vue'
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.width-title {
  border-bottom: 1px solid #ADADAD;
  padding: 20px;
}

.home-container {
  margin-top: 20px;
  padding: 60px;
  max-width: none;
  background-color: #f5f5f5;
  text-align: center;
}

.home-icon-box {
  padding: 40px;
}

.is-large {
  font-size: 110px !important;
  border-radius: 50%;
}

.one {
  color: #00d1b2;
}

.two {
  color: #3273dc;
}

.three {
  color: #23d160;
}

.video-container {
position: relative;
padding-bottom: 56.25%;
padding-top: 30px; height: 0; overflow: hidden;
}
 
.video-container iframe,
.video-container object,
.video-container embed {
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
}

</style>
