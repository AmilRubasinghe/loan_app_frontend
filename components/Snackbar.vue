<template>
  <v-snackbar
    :timeout="timeout"
    right
    v-model="show"
    color="white"
    elevation="18"
    light
  >
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-avatar  :color="color" size="42">
          <v-icon v-if="color == 'error'" dark>warning</v-icon>
          <v-icon v-else dark>check_circle_outline</v-icon>
        </v-avatar>
      </v-col>
      <v-col>
        <span  class="snackbar-text black--text">{{ message }}</span>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: "",
      timeout: 3000,
      color: "",
    };
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/showMessage") {
        this.message = state.snackbar.content;
        this.color = state.snackbar.color;
        this.show = true;
      }
    });
  },
};
</script>