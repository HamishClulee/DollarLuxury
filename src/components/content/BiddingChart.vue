<template>
    <div></div>
</template>
 
<script> 
import c3 from 'c3';
import moment from 'moment'

export default {
  name: 'BiddingChart',
  props: ['chartdata'],
  beforeDestroy: function() {
    this.chartInstance.destroy()
  },
  data () {
    return {

    }
  },
  mounted: function() {

    this.formattedChartData = []

    for (var i = 0; i < this.chartdata.length; i++) {
      var obj = {
        amount: this.chartdata[i].currentAmount,
        date: moment(this.chartdata[i].timeStamp).format("DD/MM/YYYY HH:mm:ss")
      }
      this.formattedChartData.push(obj)
    }

    var that = this

    this.chartInstance = c3.generate({
      bindto: that.$el,
      data: {
        json: this.formattedChartData,
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
        json: this.formattedChartData,
        keys: {
          x: 'date',
          value: ['amount']
        }
      })
    }
  },
  watch: {
    chartdata: function() {
      this.formattedChartData.push({
        amount: this.formattedChartData[this.formattedChartData.length - 1].amount + 1,
        date: moment().format("DD/MM/YYYY HH:mm:ss")
      })
      this.chartChanges()
    }
  }
}
</script>

<style scoped>
@import '../../../node_modules/c3/c3.min.css';
</style>