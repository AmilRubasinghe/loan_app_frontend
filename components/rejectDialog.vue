<template>
  <div class="text-center">
    <v-dialog
      v-model="show"
      max-width="650px"
      transition="dialog-transition"
      persistent
    >
      <v-card class="py-5">
        <v-container>
          <v-row justify="center">
            <v-card-title class="headline text-center">
              <span class="delete-head">Reject Item</span>
            </v-card-title>
          </v-row>
          <v-row justify="center" class="delete-row">
            <v-card-text class="text-center">
              <span class="delete-body"
                > Are you sure you want to Reject this Loan? </span
              >
            </v-card-text>
          </v-row>
          <v-card-actions class="mt-8">
            <v-row>
              <v-spacer></v-spacer>

              <v-btn @click="$emit('cancel')" class="mr-4 reset-btn"
                >Cancel</v-btn
              >
              <v-btn @click="confirm" class="mr-4 submit-btn">Reject</v-btn>
            </v-row>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["show"],
  methods: {
    confirm() {
      this.$emit("confirm");
    },
  },
};
</script>

<style>
</style>