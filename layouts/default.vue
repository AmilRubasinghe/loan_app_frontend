<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
     color="#30ac7c"
      app
    >
      <v-list v-if="role == 'admin'">
        <v-list-item
          to="/users"
          router
          exact
          dark
        >
          <v-list-item-action>
            <v-icon >mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="item-title nav-title pl-n6">Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
       <v-list v-if="role == 'admin'">
        <v-list-item
          to="/loans-vew"
          router
          exact
          dark
        >
          <v-list-item-action>
            <v-icon >mdi-library</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="item-title nav-title pl-n6" >All Loans</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
       <v-list v-if="role == 'admin' ||role == 'user'">
        <v-list-item
          to="/Loans"
          router
          exact
          dark
        >
          <v-list-item-action>
            <v-icon >mdi-library</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="item-title nav-title pl-n6" >Loan Add</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
     
      <v-toolbar-title v-text="title" />
      <v-spacer />
     <v-btn color="#30ac7c" small dark  class="pa-6" @click="logout()">
        <v-icon dark color="#FFFFFF" class="menu-icon">mdi-logout</v-icon>
        Logout
      </v-btn>
      
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
   
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState} from "vuex";
export default {
  data () {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      title: 'Bank Loan Management System'
    }
  },
  computed: {
     ...mapState(["role"]),
  isAdmin () {
    return this.role == 'admin'
  },
  isUser () {
    return this.role == 'user'
  },
},
  methods:{
       logout(){
      this.$auth.logout();
      console.log(this.$auth.loggedIn);
      this.$router.replace("/");
      // window.location.reload(true);
    },
  }
}
</script>
