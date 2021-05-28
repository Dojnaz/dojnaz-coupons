<template>
  <div>
    <hero-bar :has-right-visible="false"> Authentication </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component
          title="Login"
          icon="login-variant"
          class="tile is-child"
        >
          <b-field label="Email/Phone Number">
            <b-input name="Username" v-model="loginData.username" />
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="loginData.password" />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
            @click="login"
          >
            Submit
          </button>
        </card-component>
        <card-component
          title="Register"
          icon="account-plus"
          class="tile is-child"
        >
          <b-field label="Email">
            <b-input type="email" v-model="registerData.email" />
          </b-field>
          <b-field label="Password">
            <b-input type="password" v-model="registerData.password" />
          </b-field>
          <b-field label="Repeat Password">
            <b-input type="password" v-model="registerData.repeatPassword" />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
            @click="register"
          >
            Submit
          </button>
        </card-component>
        <card-component
          title="Claim Account"
          icon="hand-right"
          class="tile is-child"
        >
          <b-message
            title="Error!"
            type="is-danger"
            aria-close-label="Close message"
            v-model="claimData.showError"
          >
            {{ claimData.errorMessage }}
          </b-message>
          <b-field label="Phone Number">
            <p class="control">
              <span class="button is-static">+46</span>
            </p>
            <b-input
              type="tel"
              v-model="claimData.number"
              @blur="claimFormatNumber"
            />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
            @click="claim"
          >
            Submit
          </button>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CardComponent from "@/components/CardComponent";
import TitleBar from "@/components/TitleBar";
import HeroBar from "@/components/HeroBar";
import Tiles from "@/components/Tiles";

import parsePhoneNumber from "libphonenumber-js";

export default {
  name: "Auth",
  components: {
    Tiles,
    HeroBar,
    TitleBar,
    CardComponent,
  },
  data() {
    return {
      isLoading: false,
      loginData: {
        isNumber: false,
        username: "",
        password: "",
        errorMessage: "",
        showError: false,
      },
      registerData: {
        email: "",
        password: "",
        repeatPassword: "",
        errorMessage: "",
        showError: false,
      },
      claimData: {
        number: "",
        errorMessage: "",
        showError: false,
      },
    };
  },
  methods: {
    login() {
      this.isLoading = true;
    },
    register() {
      this.isLoading = true;
    },
    claim() {
      this.isLoading = true;
      axios("/auth/claim/+46" + this.claimData.number)
        .then(({ data }) => {
          this.isLoading = false;
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },

    claimFormatNumber() {
      this.claimData.number = parsePhoneNumber(
        this.claimData.number,
        "SE"
      ).nationalNumber;
    },
    toggleUsernameType() {
      this.loginData.isNumber = !this.loginData.isNumber;
    },
  },
  computed: {
    titleStack() {
      return ["Authentication"];
    },
    ...mapState(["userName", "userEmail"]),
  },
};
</script>

<style scoped>
.toggleUsernameType {
  float: right;
  text-align: center;
}
</style>
