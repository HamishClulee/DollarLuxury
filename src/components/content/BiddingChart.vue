<template>
  <div></div>
</template>
 
<script> 
import c3 from 'c3';
import moment from 'moment'

export default {
  name: 'BiddingChart',
  props: ['chartdata', 'selectedTimeSpan'],
  beforeDestroy: function() {
    this.chartInstance.destroy()
  },
  data () {
    return {
      showNoBidsNote: false
    }
  },
  mounted: function() {

    var that = this

    this.chartInstance = c3.generate({
      bindto: that.$el,
      data: {
        json: this.chartdata,
        x: "Date",
        xFormat: "%d/%m/%Y %H:%M:%S",
        type: 'line',
        keys: {
          x: 'date',
          value: ['amount']
        }
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            fit: true,
            count: 4,
            format: function (d) { return d }
          } 
        }
      },
      empty: {
        label: {
          text: "No data"
        }
      }
    })
  },
  methods: {
    chartChanges () {


      this.chartInstance.load({
        unload: true,
        json: this.chartdata,
        keys: {
          x: 'date',
          value: ['amount']
        }
      })
    }
  },
  watch: {
    chartdata: function() {
      this.chartChanges()
    }
  }
}
</script>

<style scoped>
@import '../../../node_modules/c3/c3.min.css';
</style>