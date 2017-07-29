<template>
<div class="nav-right icon-nav" >
  <!-- NO USER IS LOGGED IN SHOW LOGIN BUTTON -->
  <template v-if="!userLoggedIn">
    <div class="nav-item" >
      <div class="field is-grouped">
        <p class="control">
          <a class="button" @click="showLoginModal = true">
            <span class="icon">
              <i class="fa fa-sign-in"></i>
            </span>
            <span>Log In</span>
          </a>
        </p>
      </div>
    </div>
    <login-modal v-if="showLoginModal" @closeLoginModal="showLoginModal = false"/>
  </template>
  <!-- USER IS LOGGED IN SHOW USER PANEL -->
  <template v-else>


    <a class="nav-item" v-popover:foo.bottom>
      <span class="icon">
        <i class="fa fa-envelope icon-grey badge"></i>
      </span>
      <popover name="foo">
        <template v-for="mail in messages">
          <message-summary :date="mail.date" :subject="mail.subject" :message="mail.message"></message-summary> 
        </template>
      </popover>
    </a>
     <router-link class="nav-item" to="/account" as="a">
      <span class="icon">
        <i class="fa fa-user"></i>
      </span>
    </router-link>
    <a class="nav-item" @click="logout">
      <span class="icon">
        <i class="fa fa-sign-out"></i>
      </span>
    </a>       
  </template>

</div> 

<!--   <div class="nav-right icon-nav" v-if="userLoggedIn">
    
  </div> -->
   




        <!-- <div class="nav-item" v-if="userLoggedIn">
          <p class="control navbar-item">
              Welcome {{ user.email }}
          </p>
          <div class="field is-grouped make-row item navbar-item">
          <span class="icon is-large item navbar-item">
            <i class="fa fa-envelope icon-grey badge"></i>
          </span>


            <a class="button is-danger item" @click="logout">
                <span class="icon">
                  <i class="fa fa-sign-out"></i>
                </span>
                <span>Logout</span>
              </a>
          </div>
        </div> -->

</template>


<script>
import LoginModal from '@/components/nav/LoginModal.vue'
import MessageSummary from '@/components/util/MessageSummary.vue'
import { mapState } from 'vuex'
import store from '@/store'
import moment from 'moment'

export default {
  name: 'LogInSignUp',
  components: {
  	'login-modal': LoginModal,
    'message-summary': MessageSummary
  },
  data () {
    return {
      showLoginModal: false,
      mailHoverShow: false,
      messages: [
        { date: moment().format("DD/MM"), subject: "You've won!", message: "Johns location is often unknown..."},
        { date: moment().format("DD/MM"), subject: "You've won!", message: "Johns location is often unknown..."},
        { date: moment().format("DD/MM"), subject: "You've won!", message: "Johns location is often unknown..."},
        { date: moment().format("DD/MM"), subject: "You've won!", message: "Johns location is often unknown..."}
      ]
    }
  },
  methods: {
    logout() {
      console.log("*******************************")
      this.$store.dispatch("logout")
      this.email = ''
      this.password = ''
    }
  },
  computed: mapState([
    'userLoggedIn',
    'user'
  ]),
  watch: {
    'userLoggedIn': function () {
      this.showLoginModal = false
    }
  }
}

</script>

<style scoped>
.mail-hover:hover {
  background-color: red;
}

.item {
  padding: 20px;
}

.make-row {
  display: inline-flex;
}

*.icon-blue {color: #0088cc}
*.icon-grey {color: grey}
i {   
    width: 20px;
    text-align:center;
    vertical-align:middle;
    position: relative;
}
.badge:after{
    content:"!";
    position: absolute;
    background: #ff3860;
    height:14px;
    width: 14px;
    bottom: 15px;
    left: 15px;
    text-align: center;
    line-height: 2rem;;
    font-size: 3px;
    border-radius: 50%;
    color:white;
    border:1px solid #ff3860;
}

div[data-popover="foo"] {
  border-radius: 0;
  background-color: #f5f5f5;
  border: 2px solid #3273dc;
  font-size: 12px;
  line-height: 1.5;
  width: 250px !important;
  top: 70px !important;

/*  left: 1190px !important;*/

}

.vue-popover {

}
</style>

