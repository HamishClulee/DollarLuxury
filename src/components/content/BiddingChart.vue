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
      formattedChartData: []
    }
  },
  mounted: function() {

    for (var i = this.chartdata.length - 1; i >= 0; i--) {
      this.formattedChartData.push({
        "Current Amount": this.chartdata[i].currentAmount,
        "Date": moment(this.chartdata[i].timestamp).format("DD/MM/YYYY HH:mm:SS")
      })
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
          x: 'Date',
          value: ['Current Amount']
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
          x: 'Date',
          value: ['Current Amount']
        }
      })
    }
  },
  watch: {
    chartdata: function() {
      for (var i = this.chartdata.length - 1; i >= 0; i--) {
        this.formattedChartData.push({
          "Current Amount": this.chartdata[i].currentAmount,
          "Date": moment(this.chartdata[i].timestamp).format("DD/MM/YYYY HH:mm:ss")
        })
      }
      this.chartChanges()
    }
  }
}
</script>

<style scoped>
@import '../../../node_modules/c3/c3.min.css';
</style>