<template>

<div>
  <h1 class="title is-6 is-info">The time is: {{ formattedDate }}</h1>
</div>

</template>


<script>
import moment from 'moment'

export default {
  name: 'MomentTesting',
  data () {
    return {
      formattedDate: ''
    }
  },
  mounted () {
    this.formattedDate = moment().format("HH:mm")
  }
}

</script>

<style>

</style>