<template>
  <section class="hero is-primary is-medium drop-shadow-bottom">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">Hi...</h1>
      <h2 class="subtitle">Welcome to Dollar Luxury!</h2>
    </div>
  </div>
  <div class="hero-foot">
    <tabs/>
  </div>
  </section>
</template>

<script scoped>
import Tabs from '@/components/nav/Tabs.vue'

export default {
  name: 'Hero',
  components: {
    'tabs': Tabs
  }
}
</script>

<style scoped>

.drop-shadow-bottom {
  box-shadow: 0 4px 10px -2px rgba(0,0,0,0.30);
}

.hero{
  padding-top: 80px;
}
</style>
