<template>
  <div></div>
</template>
 
<script> 
import c3 from 'c3';
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'BiddingChart',
  props: ['chartdata', 'timespan'],
  beforeDestroy: function() {
    this.chartInstance.destroy()
  },
  data () {
    return {
      showNoBidsNote: false,
    }
  },
  mounted: function() {

    this.timespan = {number: 100, duration: "years"}

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
            format: function (d) {
              return d.getFullYear()
            }
          } 
        },
        y :{
          max: this.getCurrentAuction.reserve
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
      var that = this
      this.chartInstance.load({
        unload: true,
        json: this.chartdata,
        keys: {
          x: 'date',
          value: ['amount']
        }
      })

      this.chartInstance.axis.range({
        min: {
          x: moment().subtract(that.timespan.number, that.timespan.duration),
        },
        max: {
          x: moment()
        }
      });
    }
  },
  watch: {
    chartdata: function() {
      this.chartChanges()
    },
    timespan: function() {
      this.chartChanges()
    }
  },
  computed: {
    ...mapGetters(['getCurrentAuction'])
  }
}
</script>

<style scoped>
@import '../../../node_modules/c3/c3.min.css';
</style>