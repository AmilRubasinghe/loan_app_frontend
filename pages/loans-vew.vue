<template>
  <div>
       
    <v-row >
        <v-col cols="1" class="mt-10">
          <v-icon
            style="backgroundColor:rgba(238, 238, 238, 1; borderRadius:50%"
            size="60px"
            class="pa-2"
            color="#30ac7c"
          >
            mdi-city
          </v-icon>
        </v-col>
        <v-col cols="10" class="mt-10">
          <h1>Loans Details</h1>
          <p>View loans Details</p>
        </v-col>
        
      </v-row>
        <v-data-table
    :headers="headers"
    :items="loans"
    class="elevation-1 mt-5"
  >
    
       
  </v-data-table>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      loans: [],
    
       headers: [
        // { text: 'Actions', value: 'actions', sortable: false },
        {text: 'Name Of User',align: 'start', value: 'name',},
        { text: 'Amount', value: 'amount' },
        { text: 'File', value: 'file' },
        { text: 'Duration', value: 'duration' },
        { text: 'Installment', value: 'installment' },

      ],
    };
  },
  mounted() {
    this.getAllLoan();
  },
  methods: {
    async getAllLoan() {
      const res = await this.$axios.$get(`/loan/all`);
      if (res.status == 200) {
        this.loans = res.data;
        console.log(this.loans);
      } else {
        this.loans = [];
      }
    },
    
  },
};
</script>

<style></style>
