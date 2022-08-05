<template>
  <div>
    <v-row>
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
        <h1>Loans Request Form</h1>
        <p>Loan added Details</p>
      </v-col>
    </v-row>
    <v-form ref="form" v-model="isValid">
      <v-row dense class="pt-4">
        <v-col cols="12">
          <v-text-field
            dense
            outlined
            label="Name*"
            disabled
            v-model="name"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            dense
            outlined
            :rules="[(v) => !!v || 'Amount is required']"
            label="Amount*"
            type="number"
            min="1"
            v-model="data.amount"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            dense
            outlined
            :rules="[(v) => !!v || 'Duration is required']"
            type="number"
            min="1"
            label="Duration (per month)*"
            v-model="data.duration"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-file-input
            label="Bank File "
            outlined
            dense
            :rules="[(v) => !!v || 'Bank File is required']"
            show-size
            :error-messages="errorMessage"
            accept=".csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain,.pdf"
            @change="Preview_image"
            v-model="file"
          >
            <!-- <template v-slot:selection>
              <v-img
                v-if="imgUrl != null"
                contain
                aspect-ratio="1:1"
                class="img"
                width="200"
                height="180"
                :src="imgUrl"
              ></v-img>
            </template> -->
          </v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-flex class="d-flex justify-end">
            <v-btn elevation="0" color="#30ac7c" dark @click="addLoan()">
              <v-icon>mdi-plus-thick</v-icon>Add
            </v-btn>

            <!-- <v-btn
                  v-if="isUpdate"
                  elevation="0"
                  :disabled="!isValid"
                  color="blue"
                  dark
                  @click="UpdateLoanDetails()"
                >
                  <v-icon>mdi-plus-thick</v-icon>Update
                </v-btn> -->
          </v-flex>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
export default {
  data() {
    return {
      data: {},
      name: null,
      file: null,
      isValid: false,
      errorMessage: "",
      imgUrl: null,
    };
  },
  mounted() {
    this.getLoan();
  },
  methods: {
    Preview_image() {
      if (this.file == "" || this.file == null) return;
      if (this.file.size > 10097152) {
        this.errorMessage =
          "Sorry! You are not permitted to upload images above 10mb.";
        return;
      }
      this.errorMessage = [];

      if (
        !(
          this.file.type == "text/csv" ||
          this.file.type == "text/plain" ||
          this.file.type == "application/pdf"
        )
      ) {
        this.errorMessage = [
          "Sorry!, Please upload a CSV, PDF, TXT file inorder to set as the Bank File",
        ];
        this.file = null;
        this.imgUrl = null;
        setTimeout(() => {
          this.errorMessage = [];
        }, 4000);
        return;
      }
      this.errorMessage = [];
      // this.imgUrl = URL.createObjectURL(this.file);
    },
    async addLoan() {
      this.$refs.form.validate();
      if (!this.isValid) {
        return;
      }
      var filedata = await convertBase64(this.file);
      this.data.file = filedata;
      const res = await this.$axios.$post(`/loan`, this.data);
      if (res.status == 200) {
        this.$notifier.showMessage({
          content: res.message,
          color: "success",
        });
         this.getLoan();
      } else {
      }
    },
      getUrl(path) {
      if (path) {
        const baseUrl = "http://localhost:8022/";
        return baseUrl.concat("", path);
      } else {
        return;
      }
    },
    async getLoan() {
      const userData = jwt_decode(this.$auth.strategy.token.get());
      const res = await this.$axios.$get(`/loan`, {
        params: { userId: userData.id },
      });
      if (res.status == 200) {
      this.data = Object.assign({}, res.data[0]);
       this.name = userData.name;
      this.data.userId = userData.id;
      this.file = this.getUrl(this.data.file);
        console.log(this.data);
      } else {
        this.data = {};
      }
    },
  },
};
</script>

<style scoped>
img {
  width: auto;
  height: auto;
  margin: 0 auto;
  display: block;
  float: none;

  max-width: 100%;
}
</style>
