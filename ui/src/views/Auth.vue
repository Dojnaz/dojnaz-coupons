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
            <b-input type="username" />
          </b-field>
          <b-field label="Password">
            <b-input type="password" />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
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
            <b-input type="email" />
          </b-field>
          <b-field label="Password">
            <b-input type="password" />
          </b-field>
          <b-field label="Repeat Password">
            <b-input type="password" />
          </b-field>
          <button
            type="submit"
            class="button is-primary"
            :class="{ 'is-loading': isLoading }"
          >
            Submit
          </button>
        </card-component>
        <card-component
          title="Claim Account"
          icon="hand-right"
          class="tile is-child"
        >
          <b-field label="Phone Number">
            <p class="control">
              <span class="button is-static">+46</span>
            </p>
            <b-input type="tel" v-model="claimData.number" @blur="claimFormatNumber" />
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

import parsePhoneNumber from 'libphonenumber-js'

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
      loginData: {},
      registerData: {},
      claimData: {
        number: "",
      },
    };
  },
  methods: {
    claim() {
      axios('/auth/claim/+46' + this.claimData.number).then(({ data }) => {
        console.log(data)
      }).catch((err) => {

      })
    },
    claimFormatNumber() {
      this.claimData.number = parsePhoneNumber(this.claimData.number, 'SE').nationalNumber
    }
  },
  computed: {
    titleStack() {
      return ["Authentication"];
    },
    ...mapState(["userName", "userEmail"]),
  },
};
</script>
