<template>
  <div>
    <LazyDeleteDialog
      :message="deleteMessage"
      :show="isConfirmNeeded"
      @confirm="onConfirm"
      @cancel="isConfirmNeeded = false"
    />
    <LazyApproveDialog
      :show="isAproval"
      @confirm="approveLoan"
      @cancel="isAproval = false"
    />
    <LazyRejectDialog
      :show="isReject"
      @confirm="rejectLoan"
      @cancel="isReject = false"
    />
    <v-row>
      <v-col cols="1" class="mt-10">
        <v-icon
          style="backgroundColor:rgba(238, 238, 238, 1; borderRadius:50%"
          size="60px"
          class="pa-2"
          color="#30ac7c"
        >
          mdi-badge-account
        </v-icon>
      </v-col>
      <v-col cols="10" class="mt-10">
        <h1>Users Details</h1>
        <p>View Users Details</p>
      </v-col>
    </v-row>
    <v-data-table :headers="headers" :items="users" class="elevation-1 mt-5">
      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :disabled="item.status == 'true'"
              class="mr-2"
              color="#30ac7c"
              @click="activateUser(item)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-account-check-outline
            </v-icon>
          </template>
          <span>For Activated the user</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :disabled="
                !(item.isAddLoan == 'true' && item.isLoanApprove == 'false')
              "
              class="mr-2"
              color="#30ac7c"
              @click="approveReject(item, 0)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-check-circle-outline
            </v-icon>
          </template>
          <span>For Conform the loan</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :disabled="
                !(item.isAddLoan == 'true' && item.isLoanApprove == 'false')
              "
              class="mr-2"
              color="#30ac7c"
              @click="approveReject(item, 1)"
              v-bind="attrs"
              v-on="on"
            >
              mdi-close-circle
            </v-icon>
          </template>
          <span>For Reject the loan</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      conformItem: {},
      dataItem: {},
      isAproval: false,
      isReject: false,
      conformLoanItem: {},
      isConfirm: false,
      deleteMessage: "Are you sure you want to active the user permanently?",
      isConfirmNeeded: false,
      headers: [
        { text: "Actions", value: "actions", sortable: false },
        { text: "Name", align: "start", value: "name" },
        { text: "Email", value: "email" },
        { text: "Mobile", value: "contactNumber" },
        { text: "Status", value: "status" },
         { text: "Amount",value: "amount" },
        { text: "Duration", value: "duration" },
        { text: "No of Installment", value: "installment" },
        { text: "Has A Loan", value: "isAddLoan" },
      ],
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    async getAllUsers() {
      const res = await this.$axios.$get(`/user`);
      if (res.status == 200) {
        this.users = res.data;
        console.log(this.users);
      } else {
        this.users = [];
      }
    },
    activateLoan(item) {
      this.isConfirm = true;
      this.conformLoanItem = Object.assign({}, item);
    },
    activateUser(item) {
      this.isConfirmNeeded = true;
      this.conformItem = Object.assign({}, item);
    },
    approveReject(item, num) {
      if (num == 0) {
        this.isAproval = true;
      } else {
        this.isReject = true;
      }
      this.dataItem = Object.assign({}, item);
    },
    async onConfirm() {
      const res = await this.$axios.$patch(
        `/user/` + this.conformItem.id + "/approve",
        {
          status: "true",
        }
      );
      if (res.status == '200') {
        this.$notifier.showMessage({
          content: res.message,
          color: "success",
        });
        this.isConfirmNeeded = false;
        this.getAllUsers();
      } else {
      }
    },
    async approveLoan() {
      const res = await this.$axios.$patch(
        `/user/` + this.dataItem.id + "/loanApprove",
        {
          isLoanApprove: "true",
        }
      );
      if (res.status == 200) {
        this.$notifier.showMessage({
          content: res.message,
          color: "success",
        });
        this.isAproval = false;
        this.getAllUsers();
      } else {
      }
    },
    async rejectLoan() {
      const res = await this.$axios.$patch(
        `/user/` + this.dataItem.id + "/loanReject",
        {
          isAddLoan: "false",
        }
      );
      if (res.status == 200) {
        this.$notifier.showMessage({
          content: res.message,
          color: "success",
        });
        this.isReject = false;
        this.getAllUsers();
      } else {
      }
    },
  },
};
</script>

<style></style>
