<template>
<div class="columns is-multiline">
	<div class="card column is-one-third" v-for="user in users">
	  <div class="card-image">
	    <figure class="image is-4by3">
	      <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
	    </figure>
	  </div>
	  <div class="card-content">
	    <div class="media">
	      <div class="media-content">
	        <p class="title is-4">{{user.firstName}} | {{user.role}}</p>
	        <p class="subtitle is-6">{{user.lastName}}</p>
	      </div>
	    </div>

	    <div class="content">
	      <small>{{ formatDate(user.dateCreated) }}</small>
	      <p><small>UserName: {{ user.email }}</small></p>
	      <p><small>Password: {{ user.password }}</small></p>
	    </div>
      </div>
	</div>
</div>
  
</template>


<script>
import moment from 'moment'
import axios from 'axios'

export default {
  name: 'ShowAllUsers',
  data () {
    return {
      users: []
    }
  },
  methods: {
    loadData () {
      axios.get('http://localhost:8080/users').then(response => this.users = response.data).catch(function (error) {
        console.log("Users axios errors: " + error);
      })
    },
    formatDate (d) {
      return moment(d).format("DD MMM YYYY HH:mm a")
    }
  },
  mounted () {
    this.loadData()
    setInterval(function () {
      this.loadData()
    }.bind(this), 3000000) 
  }
}

</script>

<style>

</style>