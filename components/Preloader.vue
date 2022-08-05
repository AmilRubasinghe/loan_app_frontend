<template>

  <div v-if="loading" class="preloader">
      <v-overlay opacity="0.1" :value="true">
      <div class="ma-5 pa-5 mt-10">
        <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <v-row justify="center">
                 <img  class="image" src="~static/loader.gif" alt="Preloader" />
             
            </v-row>
          
          </v-flex>
        </v-layout>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // loading: false,
      // text: ""
    };
  },
  computed: {
     ...mapState(["loading"]),
  },
  // methods: {
  //   start() {
  //       this.loading = true;
  //     // if (text) {
  //     //   this.text = text;
  //     //   this.loading = true;
  //     // } else {
  //     //   this.text = "";
  //     //   this.loading = true;
  //     // }
  //   },
  //   stop() {
  //     this.loading = false;
  //   }
  // }
};
</script>

<style scoped>
.preloader {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(22, 22, 22, 0.6);
  width: 100%;
  height: 100%;
}

.image {
  display: block;
  width: 40%;
  height: 40%;
}

@keyframes pulse {
  from {
    border-width: 0;
  }

  to {
    border-width: 0.25rem;
  }
}
</style>
