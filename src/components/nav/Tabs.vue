<template>
<div class="tabs is-centered is-fullwidth is-boxed">
  <ul>
  	<router-link tag="li" to="/" exact><a>Home</a></router-link>
    <router-link tag="li" to="/auctions"><a>Auctions</a></router-link>
    <router-link tag="li" to="/account"><a>Account</a></router-link>
  </ul>
  
</div>

  
</template>


<script>

export default {
  name: 'Tabs',
  data () {
    return {
      msg: ''
    }
  }
}

</script>

<style>

</style>
