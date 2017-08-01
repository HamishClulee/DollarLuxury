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
    <!-- MAIL -->
    <!-- USES VuePopOver PLUGIN TO DISPLAY LIST OF MESSAGES https://github.com/euvl/vue-js-popover -->
    <a class="nav-item" v-popover:usermail.bottom>
      <span class="icon" @click="removeUnReadNotification">
        <!-- CSS CLASS 'badge' ADDS THE RED CIRCLE FOR NEW NOTIFICATIONS -->
        <i class="fa fa-envelope icon-grey" :class="{ 'badge' : unreadMessages }"></i>
      </span>
      <!-- THE POPOVER ELEMENT -->
      <popover name="usermail">
        <!-- loop message summaries -->
        <template v-for="mail in getUserMessageSummaries">
          <message-summary :date="mail.date" :subject="mail.subject" :message="mail.message" :read="mail.read"></message-summary> 
        </template>
        <!-- no messages exist -->
        <template v-if="getUserMessageSummaries.length === 0">
          No Messages To Display...
        </template>
      </popover>
    </a>
    <!-- PROFILE / ACCOUNT PAGE -->
    <router-link class="nav-item" to="/account" as="a">
      <span class="icon">
        <i class="fa fa-user"></i>
      </span>
    </router-link>
    <!-- LOGOUT -->
    <a class="nav-item" @click="logout">
      <span class="icon">
        <i class="fa fa-sign-out"></i>
      </span>
    </a>       
  </template>
</div> 
</template>


<script>
import LoginModal from '@/components/nav/LoginModal.vue'
import MessageSummary from '@/components/util/MessageSummary.vue'
import { mapState, mapMutations, mapGetters } from 'vuex'
import { DISCONNECT_SOCKET_EXPORT } from '@/store/index.js'
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
      unreadMessages: false
    }
  },
  methods: {
    ...mapMutations(['LOGOUT']),
    logout() {
      this.LOGOUT()
      DISCONNECT_SOCKET_EXPORT()
    },
    checkForUnReadMail () {
      for(var i = 0; i < this.getUserMessageSummaries.length; i++){
        if(this.getUserMessageSummaries[i].read === false){
          this.unreadMessages = true
        }
      }      
    },
    removeUnReadNotification() {
      this.unreadMessages = false;
    }
  },
  computed: {
    ...mapState(['userLoggedIn']),
    ...mapGetters(['getUserMessageSummaries', 'getUser'])
  },
  watch: {
    userLoggedIn: function () {
      this.showLoginModal = false
    },
    getUserMessageSummaries: function () {
      this.checkForUnReadMail()
    }
  }
}

</script>

<style scoped>
i {
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
    border:1px solid #ff3860;
}

div[data-popover="usermail"] {
  border-radius: 0;
  background-color: #f5f5f5;
  border: 2px solid #3273dc;
  font-size: 12px;
  line-height: 1.5;
  width: 250px !important;
  top: 70px !important;
}

.vue-popover {

}
</style>

