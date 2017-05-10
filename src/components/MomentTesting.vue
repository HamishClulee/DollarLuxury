<template>
  <h1 class="title is-1 is-info">The time is: {{ formattedDate }}, holy fucking shit!!!</h1>
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
    console.log('The time is ' + moment().format("HH:mm"))
    this.formattedDate = moment().format("HH:mm")
  }
}

</script>

<style>

</style>