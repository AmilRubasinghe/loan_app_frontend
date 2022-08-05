<template>
  <section class="section-container">
    <v-row class="signin">
      <v-col cols="8" class="left">
        <h1>Welcome Bank Loan Management System</h1>
      </v-col>
      <v-col cols="4" class="right">
        <h2>LOGIN</h2>

        <v-form ref="loginform" v-model="validLogin">
          <v-text-field
            v-model="email"
            label="Email"
            required
            color="white"
            outlined
            dark
            filled
            dense
          ></v-text-field>
          <br />

          <v-text-field
            v-model="password"
            label="Password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPass = !showPass"
            required
            outlined
            color="white"
            dense
            dark
            filled
            :type="showPass ? 'text' : 'password'"
          ></v-text-field>
          <br />
          <br />
          <div class="text-center">
            <v-btn
              class="signin-btn"
              @click="login()"
              rounded
              color="white"
              dark
            >
              Sign In
            </v-btn>
          </div>
          <br />
          <br />

          <p class="text-right">
            Don't have an account yet?
            <span class="text-right font-weight-black h6">
              <v-btn text @click="isAdd = true" dark>Sign Up</v-btn>
            </span>
          </p>
        </v-form>
      </v-col>
    </v-row>
    <v-dialog
      v-model="isAdd"
      max-width="550px"
      transition="dialog-transition"
      persistent
    >
      <v-card>
        <v-container class="">
          <v-row class="form-row-header">
            <span class="name-header"><h3>Sign Up</h3> </span>
            <v-spacer></v-spacer>

            <v-btn icon @click="isAdd = false">
              <v-icon dark class="close-btn">clear</v-icon>
            </v-btn>
          </v-row>

          <v-form ref="form" v-model="isFormValid">
            <v-row dense class="mt-10">
              <v-text-field
                outlined
                v-model="data.name"
                label="Name"
                :rules="[(v) => !!v || 'Name is required']"
                dense
                required
              ></v-text-field>
            </v-row>
            <v-row dense class="mt-1">
              <v-text-field
                outlined
                dense
                :rules="[
                  (v) => !!v || 'Email is required',
                  (v) =>
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(v) ||
                    'E-mail must be valid',
                ]"
                v-model="data.email"
                label="Email"
                required
              >
              </v-text-field>
            </v-row>
            <v-row dense class="mt-1">
              <v-text-field
                outlined
                dense
                v-model="data.contactNumber"
                label="Mobile Number"
                :rules="[
                  (v) => !!v || 'Mobile Number is required',
                  (v) => /^\d{5,11}$/.test(v) || 'Mobile must be valid ',
                ]"
                required
              >
              </v-text-field>
            </v-row>
            <v-row dense>
              <v-text-field
                v-model="registerPassword"
                label="Password"
                :append-icon="showPassReg ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassReg = !showPassReg"
                required
                outlined
                dense
                :type="showPassReg ? 'text' : 'password'"
              ></v-text-field>
            </v-row>

            <v-card-actions class="my-4">
              <v-row>
                <v-spacer></v-spacer>
                <v-btn @click="$refs.form.reset()" class="mr-4 reset-btn"
                  >Reset
                </v-btn>
                <v-btn @click="register()" class="mr-4 submit-btn"
                  >Register</v-btn
                >
              </v-row>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import jwt_decode from "jwt-decode";
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
export default {
  layout: "noLayout",
  data: () => ({
    email: "",
    isAdd: false,
    isFormValid: false,
    validLogin: false,
    data: {},
    password: null,
    registerPassword: null,
    showPass: false,
    showPassReg: false,
    encryptPassword:""
  }),
  methods: {
       ...mapMutations(["SET_USERID","SET_ALLOWED_ROLE"]),
      getData() {
      if (this.$auth.loggedIn) {
        var token = this.$auth.strategy.token.get().replace("Bearer ", "");
        console.log(token);
        const userData = jwt_decode(token);
        console.log(userData);
        this.SET_USERID(userData.name);
         this.SET_ALLOWED_ROLE(userData.role)
        if (userData.role == 'user') {
          this.$router.replace("loans");
        } else if(userData.role == 'admin') {
          this.$router.replace("users");
        }else{
           this.$router.replace("inspire");
        }
      } else {
        return;
      }
    },
    async register() {
      this.$refs.form.validate();
      if (!this.isFormValid) {
        return;
      }
      this.encryptPassword = bcrypt.hashSync(this.registerPassword, salt);
      this.data.password = this.encryptPassword;
      console.log(this.data.password);
      const res = await this.$axios.$post(`/user/signup`, this.data);

      if (res.status == 200) {
        this.$notifier.showMessage({
          content: "Register Successfully",
          color: "success",
        });
        this.isAdd = false;
      } else {
        this.$notifier.showMessage({
          content: res.message,
          color: "error",
        });
      }
    },
    async login() {
      if (!this.validLogin) return;
      try {
        let res = await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password,
          },
        });
        if (res.status == 200) {
          this.getData();
          this.email=null;
          this.password =null;
          this.$notifier.showMessage({
          content: "Login Successfully",
          color: "success",
        });
        }
      } catch (err) {}
    },
  },
};
</script>

<style></style>
